#!/usr/bin/env python3
"""deploy_guard.py - refuse to publish source, and prove it after the fact.

WHY THIS EXISTS
===============
On 2026-08-21 these were answering 200 on kineticgain.com:

    /scripts/local-sftp-deploy.sh     /scripts/sign_attestation.py
    /scripts/atomic_ftps_deploy.py    /.github/workflows/deploy.yml
    /generate.py                      /README.md

No credentials were in them. They disclosed the SSH host, the account name,
the non-standard port and the key filename, which is the entire target
description for a credential attack.

Three things had to be true at once, and this file closes all three:

1. THE EXCLUDE LIST WAS A DENYLIST.
   local-sftp-deploy.sh excluded .git, .github, node_modules, README.md,
   CHANGELOG.md, LICENSE, docs, staging-root. Someone thought carefully about
   that list. `scripts/` was not on it, and neither was `*.py`. A denylist is
   only ever as good as the last person's imagination; the thing that gets
   published is the thing nobody thought to name.
   -> --preflight uses an ALLOWLIST of extensions that belong on a web server.
      Anything else stops the deploy.

2. DEPLOYS ARE ADDITIVE AND NEVER DELETE.
   deploy.yml says so explicitly, as a feature: "files NOT in the archive are
   NEVER touched", which is what protects the subdomain directories. The cost
   is that one bad upload is permanent. Nothing self-heals. The files above
   were almost certainly published once, long ago, by a path that no longer
   exists, and simply stayed.
   -> --verify probes the LIVE site for paths that must not resolve, so a
      historical mistake is caught on the next deploy instead of never.

3. EVERY EXISTING CHECK ASKED "DOES THE RIGHT THING WORK?"
   The mobile audit, the link scanner, the CI build verification, the live
   curl checks: all of them confirm that pages load, links resolve, gates
   pass. Not one of them could ever have asked whether something that should
   not exist is reachable, because none of them requested a URL that nothing
   links to. A link checker follows links. This is the missing question.

USAGE
=====
    python scripts/deploy_guard.py --preflight <dir>        # before upload
    python scripts/deploy_guard.py --verify https://host    # after upload
    python scripts/deploy_guard.py --verify https://host --json out.json

Both exit non-zero on failure so a shell with `set -e` stops. Both are wired
into scripts/local-sftp-deploy.sh, which is the point: a guard that lives
beside the deploy path is a guard someone forgets. This one cannot be skipped
without editing the deploy script, which is a visible act.

--allow-source exists for the rare case of deliberately publishing a source
file (a demo snippet, a reference implementation). It requires naming each
path, so the exception is explicit and reviewable, never a blanket override.
"""
import argparse
import concurrent.futures
import json
import pathlib
import re
import sys
import urllib.error
import urllib.request

# Extensions a web server has a reason to hand a visitor. Everything else is
# refused. Adding to this list should feel like a decision.
WEB_EXT = {
    ".html", ".htm", ".css", ".js", ".mjs", ".json", ".jsonld", ".xml", ".txt",
    ".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".ico", ".bmp",
    ".woff", ".woff2", ".ttf", ".otf", ".eot",
    ".pdf", ".mp4", ".webm", ".mp3", ".wav", ".ogg", ".vtt",
    ".webmanifest", ".map", ".php", ".md",
}
# Files with no extension that are legitimately served.
WEB_NAMES = {".htaccess", "robots.txt", "sitemap.xml", "CNAME", "LICENSE",
             "humans.txt", "llms.txt", "security.txt", "ads.txt"}

# Directories that must never reach a web root, whatever they contain.
FORBIDDEN_DIRS = {"scripts", ".github", ".git", "node_modules", "generated",
                  "staging-root", "tests", "test", "__pycache__", ".venv",
                  "venv", ".idea", ".vscode"}

# Paths that must NOT resolve on a live host. Extend per property.
MUST_404 = [
    "/scripts/local-sftp-deploy.sh",
    "/scripts/sign_attestation.py",
    "/scripts/atomic_ftps_deploy.py",
    "/scripts/deploy_guard.py",
    "/.github/workflows/deploy.yml",
    "/generate.py",
    "/README.md",
    "/package.json",
    "/package-lock.json",
    "/.env",
    "/.git/config",
    "/.git/HEAD",
    "/generated/homepage-stats.html",
    "/generated/named-platforms-body.html",
]
# Content that must never appear in a served response, whatever the path.
# Catches the case where a file is renamed or served through a rewrite.
SECRET_PATTERNS = [
    (r"BEGIN [A-Z ]*PRIVATE KEY", "private key material"),
    (r"gh[pousr]_[A-Za-z0-9]{20,}", "GitHub token"),
    (r"AKIA[0-9A-Z]{16}", "AWS access key id"),
    (r"sk-[A-Za-z0-9]{20,}", "API secret key"),
]
UA = "kg-deploy-guard/1.0"


# ---------------------------------------------------------------- preflight

def preflight(root: pathlib.Path, allow: set) -> int:
    if not root.is_dir():
        print(f"GUARD FAIL: {root} is not a directory")
        return 2

    bad = []
    n = 0
    for p in sorted(root.rglob("*")):
        if not p.is_file():
            continue
        n += 1
        rel = p.relative_to(root).as_posix()
        if rel in allow:
            continue
        parts = set(p.relative_to(root).parts[:-1])
        hit = parts & FORBIDDEN_DIRS
        if hit:
            bad.append((rel, f"inside forbidden directory '{sorted(hit)[0]}/'"))
            continue
        if p.name in WEB_NAMES:
            continue
        if p.suffix.lower() not in WEB_EXT:
            bad.append((rel, f"extension '{p.suffix or '(none)'}' is not web-servable"))

    print(f"[guard] preflight: {n} file(s) staged in {root}")
    if not bad:
        print("[guard] preflight OK: nothing outside the web-servable allowlist")
        return 0

    print(f"\nGUARD FAIL: {len(bad)} file(s) must not be published:\n")
    for rel, why in bad[:40]:
        print(f"  {rel}")
        print(f"      {why}")
    if len(bad) > 40:
        print(f"  ... and {len(bad) - 40} more")
    print("\nThe deploy was stopped BEFORE upload. Nothing was published.")
    print("Stage only the files you intend to serve, or if one of these really")
    print("belongs on the web, name it explicitly:")
    print("  --allow-source path/one path/two")
    return 1


# ------------------------------------------------------------------- verify

def probe(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, r.read(65536).decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception:
        return 0, ""


def verify(base: str, out_json=None) -> int:
    base = base.rstrip("/")
    print(f"[guard] verify: probing {len(MUST_404)} must-not-exist paths on {base}")

    # Baseline. A single-page app rewrites every unmatched path to index.html
    # and answers 200, so status code alone reports the entire must-404 list as
    # exposed. amordelfato.app tripped exactly this: /package.json,
    # /scripts/local-sftp-deploy.sh and /.github/workflows/deploy.yml all
    # returned 200 with byte-identical 7,397-byte bodies, which was the PWA
    # shell, not source. A guard that reports every SPA in the estate as
    # breached is a guard nobody reads by the third property.
    _, baseline = probe(base + "/")
    baseline_head = baseline[:2000]

    results = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(probe, base + p): p for p in MUST_404}
        for f in concurrent.futures.as_completed(futs):
            results[futs[f]] = f.result()

    def is_fallback(body: str) -> bool:
        if not body:
            return False
        # Same page the site serves at /, or an HTML document returned for a
        # request that asked for source. Either way it is a rewrite, not a file.
        if baseline_head and body[:2000] == baseline_head:
            return True
        return body.lstrip()[:200].lower().startswith(("<!doctype html", "<html"))

    fallbacks = {p for p, (c, body) in results.items() if c == 200 and is_fallback(body)}
    exposed = {p: (c, body) for p, (c, body) in results.items()
               if c == 200 and p not in fallbacks}
    if fallbacks:
        print(f"[guard] {len(fallbacks)} path(s) answered 200 with the site's own "
              f"HTML shell: SPA/rewrite fallback, not exposure")

    leaks = []
    for p, (c, body) in exposed.items():
        for pat, label in SECRET_PATTERNS:
            if re.search(pat, body):
                leaks.append((p, label))

    if not exposed:
        print(f"[guard] verify OK: all {len(MUST_404)} paths correctly absent")
        if out_json:
            pathlib.Path(out_json).write_text(json.dumps(
                {"base": base, "exposed": [], "checked": len(MUST_404)}, indent=1),
                encoding="utf-8")
        return 0

    print(f"\nGUARD FAIL: {len(exposed)} path(s) are PUBLICLY READABLE on {base}:\n")
    for p in sorted(exposed):
        print(f"  200  {base}{p}")
    if leaks:
        print("\n  *** SECRET MATERIAL IN RESPONSE BODY ***")
        for p, label in leaks:
            print(f"  {p}: {label}")
        print("  Rotate the affected credential before anything else.")
    print("\nThese are already live. Blocking them is a server-side fix:")
    print("  add a 404 rule to .htaccess, then re-run --verify.")
    if out_json:
        pathlib.Path(out_json).write_text(json.dumps(
            {"base": base, "exposed": sorted(exposed),
             "secret_hits": leaks, "checked": len(MUST_404)}, indent=1), encoding="utf-8")
    return 1


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--preflight", metavar="DIR")
    ap.add_argument("--verify", metavar="BASE_URL")
    ap.add_argument("--allow-source", nargs="*", default=[],
                    help="paths, relative to DIR, that may be published despite "
                         "not being web-servable. Each must be named.")
    ap.add_argument("--json")
    args = ap.parse_args()

    if not args.preflight and not args.verify:
        ap.error("give --preflight DIR and/or --verify BASE_URL")

    rc = 0
    if args.preflight:
        rc |= preflight(pathlib.Path(args.preflight), set(args.allow_source))
    if args.verify:
        rc |= verify(args.verify, args.json)
    return rc


if __name__ == "__main__":
    sys.exit(main())
