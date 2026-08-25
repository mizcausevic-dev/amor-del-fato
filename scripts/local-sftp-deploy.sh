#!/usr/bin/env bash
#
# Local SFTP deploy for amordelfato.app — connects via SSH key auth to
# Hostinger and uploads a directory tree using `tar | ssh` for speed and
# atomicity. Adapted from the kineticgain-com-apex / portfolio-constellation
# guarded deploy pattern (see scripts/deploy_guard.py in this repo).
#
# Prerequisites (one-time):
#   1. Hostinger SSH enabled in hPanel → Advanced → SSH Access
#   2. SSH keypair at ~/.ssh/kineticgain_ed25519 (private) +
#      kineticgain_ed25519.pub registered in hPanel → SSH Keys
#   3. ssh-keyscan -p 65002 -H 82.25.89.47 >> ~/.ssh/known_hosts (one-time)
#
# Usage:
#   npm run build   # produces dist/
#   scripts/local-sftp-deploy.sh dist ''
#
# Exit codes:
#   0  success (DEPLOY_EXTRACTED echoed by remote)
#   1  bad args
#   2  SSH key missing
#   3  upload failed
#   4  preflight guard failed — nothing was uploaded
#   5  post-deploy verify failed — upload succeeded but live host is serving
#      something it shouldn't; fix .htaccess and re-run --verify
#
set -euo pipefail

SSH_KEY="${HOME}/.ssh/kineticgain_ed25519"
SSH_USER="${HOSTINGER_FTP_USER:-u815783393}"
SSH_HOST="${HOSTINGER_FTP_HOST:-82.25.89.47}"
SSH_PORT="${HOSTINGER_FTP_PORT:-65002}"
REMOTE_BASE="${HOSTINGER_REMOTE_BASE:-domains/amordelfato.app/public_html}"

usage() {
  cat <<EOF
Usage: $0 <local-dir> <remote-subdir>
  local-dir      Local directory whose CONTENTS will be uploaded (usually dist)
  remote-subdir  Subdirectory under \$HOME/$REMOTE_BASE/ (use '' for root)

Env overrides:
  HOSTINGER_FTP_USER     (default: $SSH_USER)
  HOSTINGER_FTP_HOST     (default: $SSH_HOST)
  HOSTINGER_FTP_PORT     (default: $SSH_PORT)
  HOSTINGER_REMOTE_BASE  (default: $REMOTE_BASE)
  DEPLOY_VERIFY_BASE     (default: https://amordelfato.app)

Example:
  $0 dist ''
EOF
  exit 1
}

[ $# -eq 2 ] || usage
LOCAL_DIR="$1"
REMOTE_SUBDIR="$2"

[ -d "$LOCAL_DIR" ] || { echo "FAIL: $LOCAL_DIR is not a directory"; exit 1; }
[ -f "$SSH_KEY" ]  || { echo "FAIL: SSH key not found at $SSH_KEY"; exit 2; }

REMOTE_PATH="$REMOTE_BASE"
[ -n "$REMOTE_SUBDIR" ] && REMOTE_PATH="$REMOTE_BASE/$REMOTE_SUBDIR"

echo "=========================================================="
echo "Local SFTP deploy — amordelfato.app"
echo "  src : $LOCAL_DIR ($(du -sh "$LOCAL_DIR" | cut -f1))"
echo "  dest: $SSH_USER@$SSH_HOST:$REMOTE_PATH/"
echo "  port: $SSH_PORT (SSH key auth)"
echo "=========================================================="

# ── GUARD 1 of 2: nothing but web-servable files leaves this machine ──
# See scripts/deploy_guard.py for the full history (this estate found
# deploy scripts, CI config and a generator script served at HTTP 200 on
# kineticgain.com, and amordelfato.app itself had the same class of exposure
# — see kg-incident-runbooks Runbook 04). ABSOLUTE path, resolved before the
# `cd "$LOCAL_DIR"` below — a relative path here breaks silently after cd.
GUARD="$(cd "$(dirname "$0")" && pwd)/deploy_guard.py"
if [ -f "$GUARD" ]; then
  python "$GUARD" --preflight "$LOCAL_DIR" || {
    echo ""
    echo "DEPLOY ABORTED. Nothing was uploaded."
    exit 4
  }
else
  echo "FAIL: $GUARD is missing. Refusing to deploy unguarded."
  echo "      Restore scripts/deploy_guard.py or deploy deliberately by hand."
  exit 4
fi

cd "$LOCAL_DIR"

tar -czf - . | \
ssh -i "$SSH_KEY" \
    -o StrictHostKeyChecking=accept-new \
    -o ConnectTimeout=30 \
    -o ServerAliveInterval=15 \
    -p "$SSH_PORT" \
    "$SSH_USER@$SSH_HOST" \
    "cd $REMOTE_PATH/ && tar --overwrite -xzf - && echo DEPLOY_EXTRACTED && ls -la index.html 2>&1 | head -1"

# ── GUARD 2 of 2: prove the live host is not serving source ──
# Non-fatal on purpose: the upload already succeeded, so failing hard here
# would leave a half-reported deploy. It prints loudly and sets the exit code.
GUARD_BASE="${DEPLOY_VERIFY_BASE:-https://amordelfato.app}"
if [ ! -f "$GUARD" ]; then
  echo "FAIL: $GUARD vanished between preflight and verify. Not reporting success."
  exit 5
fi
echo ""
python "$GUARD" --verify "$GUARD_BASE" || {
  echo ""
  echo "!!! The upload succeeded but the host is serving files it should not."
  echo "!!! Fix .htaccess and re-run: python $GUARD --verify $GUARD_BASE"
  exit 5
}

echo "OK: deploy complete"
