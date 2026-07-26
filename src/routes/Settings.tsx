import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sun,
  Moon,
  Monitor,
  Leaf,
  Download,
  Upload,
  FileText,
  Trash2,
  Shield,
  ScrollText,
  Check,
  Smartphone,
  Volume2,
  Waves,
} from 'lucide-react'
import { useStore } from '../store/AppStore'
import { exportState, journalToMarkdown } from '../lib/storage'
import { useDocMeta } from '../lib/useDocMeta'
import { useInstallPrompt } from '../lib/useInstallPrompt'
import { speechSupported } from '../lib/speech'

function Toggle({
  label,
  hint,
  icon: Icon,
  on,
  onChange,
}: {
  label: string
  hint?: string
  icon: typeof Volume2
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className="flex w-full items-center justify-between gap-4 py-2.5 text-left"
    >
      <span className="flex items-center gap-3">
        <Icon size={18} className={on ? 'text-brand' : 'text-mute'} />
        <span>
          <span className="block text-sm font-500 text-ink">{label}</span>
          {hint && <span className="block text-xs text-mute">{hint}</span>}
        </span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-brand' : 'bg-line'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${on ? 'left-[22px]' : 'left-0.5'}`}
        />
      </span>
    </button>
  )
}
import type { ThemePref, TextScale } from '../lib/types'
import { TEXT_SCALE_PX } from '../lib/types'
import type { ThemeKey } from '../data/content'
import { FOCUS, TIMES, LENGTHS } from '../data/profileOptions'
import { APP_NAME } from '../config/brand'

const BACKUP_SLUG = APP_NAME.toLowerCase().replace(/\s+/g, '-')

const THEMES: Array<{ key: ThemePref; label: string; icon: typeof Sun }> = [
  { key: 'light', label: 'Light', icon: Sun },
  { key: 'serene', label: 'Serene', icon: Leaf },
  { key: 'dark', label: 'Dark', icon: Moon },
  { key: 'system', label: 'System', icon: Monitor },
]

const TEXT_SIZES: Array<{ key: TextScale; label: string; px: string }> = [
  { key: 'small', label: 'Small', px: TEXT_SCALE_PX.small },
  { key: 'normal', label: 'Normal', px: TEXT_SCALE_PX.normal },
  { key: 'large', label: 'Large', px: TEXT_SCALE_PX.large },
]

function downloadFile(text: string, filename: string, mime: string) {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function Settings() {
  useDocMeta('Settings — Amor del Fato')
  const { state, setTheme, setPref, setTextScale, resetAll, updateProfile, importState } =
    useStore()
  const { canInstall, installed, promptInstall, isIOS } = useInstallPrompt()
  const [confirmReset, setConfirmReset] = useState(false)
  const [confirmRestore, setConfirmRestore] = useState(false)
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const profile = state.profile
  const focus = profile?.focusAreas ?? []
  const time = profile?.practiceTime ?? 'both'
  const length = profile?.sessionLength ?? 'standard'
  const name = profile?.name ?? ''

  const toggleFocus = (k: ThemeKey) => {
    if (focus.includes(k)) updateProfile({ focusAreas: focus.filter((x) => x !== k) })
    else if (focus.length < 3) updateProfile({ focusAreas: [...focus, k] })
  }

  const flash = (ok: boolean, text: string) => {
    setNotice({ ok, text })
    setTimeout(() => setNotice(null), 4000)
  }

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-selecting the same file
    if (!file) return
    try {
      const text = await file.text()
      if (importState(text)) {
        setConfirmRestore(false)
        flash(true, 'Backup restored.')
      } else {
        flash(false, 'That file is not a valid backup.')
      }
    } catch {
      flash(false, 'Could not read that file.')
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-head text-2xl font-700 tracking-tight text-ink">Settings</h1>
        <p className="mt-1 text-mute">Everything stays on this device.</p>
      </div>

      {/* Appearance */}
      <section className="rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Appearance</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {THEMES.map(({ key, label, icon: Icon }) => {
            const active = state.theme === key
            return (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-sm font-500 transition-colors ${
                  active
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-line text-mute hover:text-ink'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            )
          })}
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs font-600 uppercase tracking-widest text-mute">Text size</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {TEXT_SIZES.map(({ key, label, px }) => {
              const active = state.prefs.textScale === key
              return (
                <button
                  key={key}
                  onClick={() => setTextScale(key)}
                  aria-pressed={active}
                  className={`flex items-center justify-center rounded-xl border py-3 font-500 transition-colors ${
                    active
                      ? 'border-brand bg-brand-soft text-brand'
                      : 'border-line text-mute hover:text-ink'
                  }`}
                  style={{ fontSize: px }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Install */}
      {!installed && (
        <section className="rounded-2xl border border-line bg-panel p-5">
          <p className="text-xs font-600 uppercase tracking-widest text-mute">Install</p>
          <p className="mt-2 text-sm text-mute">
            Add {APP_NAME} to your home screen for a full-screen, offline practice. No app
            store, no account.
          </p>
          {canInstall ? (
            <button
              onClick={promptInstall}
              className="btn-conic mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 font-600 text-white"
            >
              <Smartphone size={17} /> Add to home screen
            </button>
          ) : isIOS ? (
            <p className="mt-3 text-sm text-ink">
              Tap the Share icon in Safari, then <strong>Add to Home Screen</strong>.
            </p>
          ) : (
            <p className="mt-3 text-sm text-mute">
              Open your browser menu and choose Install or Add to Home Screen.
            </p>
          )}
        </section>
      )}

      {/* Your practice */}
      <section className="rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Your practice</p>

        <p className="mt-4 text-sm font-500 text-ink">What you are working on</p>
        <p className="text-xs text-mute">Up to three. Shapes what today opens with.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {FOCUS.map((f) => {
            const active = focus.includes(f.key)
            const order = focus.indexOf(f.key) + 1
            return (
              <button
                key={f.key}
                onClick={() => toggleFocus(f.key)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-500 transition-colors ${
                  active
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-line text-mute hover:text-ink'
                }`}
              >
                {active && <span className="mr-1 text-xs">{order}.</span>}
                {f.label}
              </button>
            )
          })}
        </div>

        <p className="mt-5 text-sm font-500 text-ink">Time of day</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {TIMES.map((t) => (
            <button
              key={t.key}
              onClick={() => updateProfile({ practiceTime: t.key })}
              className={`rounded-xl border px-3 py-2.5 text-sm font-500 transition-colors ${
                time === t.key
                  ? 'border-brand bg-brand-soft text-brand'
                  : 'border-line text-mute hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm font-500 text-ink">Session length</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {LENGTHS.map((l) => (
            <button
              key={l.key}
              onClick={() => updateProfile({ sessionLength: l.key })}
              className={`flex flex-col items-center gap-0.5 rounded-xl border px-3 py-2.5 transition-colors ${
                length === l.key
                  ? 'border-brand bg-brand-soft text-brand'
                  : 'border-line text-mute hover:text-ink'
              }`}
            >
              <span className="text-sm font-500">{l.label}</span>
              <span className="text-xs opacity-70">{l.hint}</span>
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm font-500 text-ink">Your name</p>
        <input
          value={name}
          onChange={(e) => updateProfile({ name: e.target.value.trim() || null })}
          maxLength={40}
          name="display-name"
          autoComplete="off"
          placeholder="Optional"
          aria-label="Your name"
          className="mt-2 w-full rounded-xl border border-line bg-panel-2 px-4 py-2.5 text-[15px] text-ink outline-none placeholder:text-mute focus:border-brand"
        />
      </section>

      {/* Sound */}
      <section className="rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Sound</p>
        <div className="mt-2 divide-y divide-line">
          {speechSupported() && (
            <Toggle
              label="Voice guidance"
              hint="Read the guided script aloud during sessions"
              icon={Volume2}
              on={state.prefs.voiceGuidance}
              onChange={(v) => setPref('voiceGuidance', v)}
            />
          )}
          <Toggle
            label="Ambient sound"
            hint="A soft bed of sound during the silent timer"
            icon={Waves}
            on={state.prefs.ambientSound}
            onChange={(v) => setPref('ambientSound', v)}
          />
        </div>
      </section>

      {/* Data */}
      <section className="rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Your data</p>
        <p className="mt-2 text-sm text-mute">
          {APP_NAME} is local-first. Your streak, sessions, and journal live only in this
          browser. No account, no server, no tracking. Back it up to move to another
          device, since nothing syncs on its own.
        </p>

        {notice && (
          <p
            className={`mt-3 inline-flex items-center gap-2 text-sm font-500 ${
              notice.ok ? 'text-brand-2' : 'text-brand'
            }`}
          >
            {notice.ok && <Check size={16} />} {notice.text}
          </p>
        )}

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            onClick={() =>
              downloadFile(
                exportState(state),
                `${BACKUP_SLUG}-backup-${state.streak.lastCompletedDateLocal ?? 'export'}.json`,
                'application/json',
              )
            }
            className="flex items-center justify-center gap-2 rounded-full border border-line py-3 font-500 text-ink transition-colors hover:bg-panel-2"
          >
            <Download size={17} /> Export a backup
          </button>
          <button
            onClick={() => setConfirmRestore(true)}
            className="flex items-center justify-center gap-2 rounded-full border border-line py-3 font-500 text-ink transition-colors hover:bg-panel-2"
          >
            <Upload size={17} /> Restore a backup
          </button>
        </div>

        <button
          onClick={() =>
            downloadFile(
              journalToMarkdown(state),
              `${BACKUP_SLUG}-journal.md`,
              'text/markdown',
            )
          }
          disabled={state.journalEntries.length === 0}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-line py-3 font-500 text-ink transition-colors hover:bg-panel-2 disabled:opacity-40"
        >
          <FileText size={17} /> Export journal as Markdown
        </button>

        {/* Hidden file input for restore */}
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          onChange={onFile}
          className="hidden"
        />

        {confirmRestore && (
          <div className="mt-3 rounded-xl border border-brand/40 bg-brand-soft p-3 text-center">
            <p className="text-sm font-500 text-ink">
              Restoring a backup replaces everything currently on this device. Continue?
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex-1 rounded-full bg-brand py-2.5 text-sm font-600 text-white"
              >
                Choose backup file
              </button>
              <button
                onClick={() => setConfirmRestore(false)}
                className="flex-1 rounded-full border border-line py-2.5 text-sm font-500 text-mute"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {confirmReset ? (
          <div className="mt-3 rounded-xl border border-brand/40 bg-brand-soft p-3 text-center">
            <p className="text-sm font-500 text-ink">
              Erase all streaks, sessions, and journal entries? This cannot be undone.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  resetAll()
                  setConfirmReset(false)
                }}
                className="flex-1 rounded-full bg-brand py-2.5 text-sm font-600 text-white"
              >
                Erase everything
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 rounded-full border border-line py-2.5 text-sm font-500 text-mute"
              >
                Keep my data
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-500 text-mute transition-colors hover:text-brand"
          >
            <Trash2 size={16} /> Reset all data
          </button>
        )}
      </section>

      {/* About / provenance */}
      <section className="rounded-2xl border border-line bg-panel-2 p-5">
        <div className="flex items-center gap-2 text-ink">
          <Shield size={18} className="text-brand" />
          <p className="font-600">On the source of the words</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          Quotes attributed to Marcus Aurelius, Epictetus, and Seneca are drawn from
          public-domain translations (George Long, Elizabeth Carter, Richard Gummere).
          The guided practices and reflections are original writing, not attributed to
          the ancient Stoics. Where a well-known modern phrasing is under copyright, it is
          not put in a Stoic&rsquo;s mouth.
        </p>
      </section>

      <Link
        to="/terms"
        className="flex items-center justify-center gap-2 rounded-full border border-line bg-panel py-3 text-sm font-500 text-ink transition-colors hover:bg-panel-2"
      >
        <ScrollText size={16} /> Terms &amp; Privacy
      </Link>

      <p className="text-center text-xs text-mute">{APP_NAME} · v1.3</p>
    </div>
  )
}
