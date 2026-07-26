import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { APP_NAME } from '../config/brand'
import { useDocMeta } from '../lib/useDocMeta'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <h2 className="font-head text-lg font-600 text-ink">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed text-mute">
        {children}
      </div>
    </section>
  )
}

export default function Terms() {
  useDocMeta(
    'Terms & Privacy — Amor del Fato',
    'How Amor del Fato handles your data: local-first, no account, no server, no tracking. Plain-language terms and privacy.',
  )
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <button
        onClick={() => navigate(-1)}
        className="flex w-fit items-center gap-2 text-sm font-500 text-mute transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div>
        <h1 className="font-head text-2xl font-700 tracking-tight text-ink">
          Terms &amp; Privacy
        </h1>
        <p className="mt-1 text-mute">Plain language, no fine-print tricks.</p>
      </div>

      <Section title="What this is">
        <p>
          {APP_NAME} is a self-guided reflection and journaling tool inspired by Stoic
          philosophy. It is not therapy, not medical or mental-health treatment, and not a
          substitute for professional advice. If you are in crisis or need support beyond
          what a self-guided app can offer, please contact a licensed professional or your
          local emergency services.
        </p>
      </Section>

      <Section title="Your data">
        <p>
          Everything you do here, sessions completed, streaks, journal entries, your
          onboarding preferences, is stored only in this browser&rsquo;s local storage. It
          is never sent to a server, because there is no server. Nothing is sold, shared,
          or analyzed. There are no cookies and no third-party trackers of any kind.
        </p>
        <p>
          Because nothing leaves your device, there is nothing for us to access, retain,
          or delete on your behalf, there is only what is already in your own browser.
          You control it directly, at any time, from Settings:
        </p>
        <ul className="ml-5 list-disc">
          <li>
            <strong className="text-ink">Export a backup</strong> downloads everything as
            a JSON file you keep.
          </li>
          <li>
            <strong className="text-ink">Reset all data</strong> permanently erases it from
            this browser. This cannot be undone by us, because we never had a copy.
          </li>
        </ul>
        <p>
          Clearing your browser&rsquo;s site data, uninstalling the app if you installed it
          as a PWA, or switching browsers/devices will also remove your local data, since
          nothing is synced elsewhere. Export a backup first if you want to keep it.
        </p>
      </Section>

      <Section title="Content and attribution">
        <p>
          Quotes attributed to named Stoic philosophers are drawn from public-domain
          translations. Guided practices, reflections, and philosopher summaries are
          original writing and are not attributed to the ancient Stoics. See Settings for
          the full provenance note.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>
          Use {APP_NAME} for your own personal reflection. Don&rsquo;t attempt to disrupt,
          reverse-engineer for malicious purposes, or misuse the service. The app is
          provided &ldquo;as is,&rdquo; without warranty of any kind, and to the fullest
          extent permitted by law we are not liable for any damages arising from its use.
        </p>
      </Section>

      <Section title="Who this is for">
        <p>
          {APP_NAME} is not directed at children under 13 and should not be used by them.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          These terms may be updated as the app changes. Continued use after an update
          means you accept the current version. Material changes will be reflected here
          with an updated date.
        </p>
        <p className="text-xs text-mute">Last updated: July 2026.</p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms or the app itself: reach out via the{' '}
          <a
            href="https://github.com/mizcausevic-dev/amor-del-fato"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline-offset-2 hover:underline"
          >
            GitHub repository
          </a>
          .
        </p>
      </Section>
    </div>
  )
}
