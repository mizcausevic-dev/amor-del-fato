import { useState } from 'react'
import { Sun, Moon, Monitor, Download, Trash2, Shield } from 'lucide-react'
import { useStore } from '../store/AppStore'
import { exportState } from '../lib/storage'
import type { ThemePref } from '../lib/types'

const THEMES: Array<{ key: ThemePref; label: string; icon: typeof Sun }> = [
  { key: 'light', label: 'Light', icon: Sun },
  { key: 'dark', label: 'Dark', icon: Moon },
  { key: 'system', label: 'System', icon: Monitor },
]

export default function Settings() {
  const { state, setTheme, resetAll } = useStore()
  const [confirmReset, setConfirmReset] = useState(false)

  const download = () => {
    const blob = new Blob([exportState(state)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hey-there-warrior-backup-${state.streak.lastCompletedDateLocal ?? 'export'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-head text-2xl font-700 tracking-tight text-ink">Settings</h1>
        <p className="mt-1 text-mute">Everything stays on this device.</p>
      </div>

      {/* Appearance */}
      <section className="rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Appearance</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
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
      </section>

      {/* Data */}
      <section className="rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Your data</p>
        <p className="mt-2 text-sm text-mute">
          Hey There Warrior is local-first. Your streak, sessions, and journal live only
          in this browser. No account, no server, no tracking.
        </p>
        <button
          onClick={download}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-line py-3 font-500 text-ink transition-colors hover:bg-panel-2"
        >
          <Download size={17} /> Export a backup
        </button>

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

      <p className="text-center text-xs text-mute">Hey There Warrior · v1.0</p>
    </div>
  )
}
