import { NavLink, Outlet } from 'react-router-dom'
import {
  Home,
  Compass,
  GraduationCap,
  NotebookPen,
  Flame,
  Settings,
  Shield,
} from 'lucide-react'
import { APP_NAME_LINES } from '../config/brand'

const NAV = [
  { to: '/', label: 'Today', icon: Home, end: true },
  { to: '/paths', label: 'Paths', icon: Compass, end: false },
  { to: '/glossary', label: 'Study', icon: GraduationCap, end: false },
  { to: '/journal', label: 'Journal', icon: NotebookPen, end: false },
  { to: '/progress', label: 'Progress', icon: Flame, end: false },
] as const

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand">
        <Shield size={20} strokeWidth={2.2} />
      </span>
      <span className="font-head text-[15px] font-600 leading-tight tracking-tight text-ink">
        {APP_NAME_LINES[0]}
        <br />
        {APP_NAME_LINES[1]}
      </span>
    </div>
  )
}

export default function Layout() {
  return (
    <div className="min-h-svh">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Desktop left rail */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[220px] flex-col border-r border-line bg-panel/60 px-4 py-6 backdrop-blur md:flex">
        <div className="mb-8">
          <Wordmark />
        </div>
        <nav aria-label="Primary" className="flex flex-1 flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-500 transition-colors',
                  isActive
                    ? 'bg-brand-soft text-brand'
                    : 'text-mute hover:bg-panel-2 hover:text-ink',
                ].join(' ')
              }
            >
              <Icon size={20} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            [
              'mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-500 transition-colors',
              isActive ? 'bg-brand-soft text-brand' : 'text-mute hover:bg-panel-2 hover:text-ink',
            ].join(' ')
          }
        >
          <Settings size={20} strokeWidth={2} />
          Settings
        </NavLink>
      </aside>

      {/* Main content. Wider on large screens so Today's two-column layout can
          breathe; reading-heavy pages cap their own inner width. */}
      <main id="main-content" tabIndex={-1} className="outline-none md:pl-[220px]">
        <div className="mx-auto w-full max-w-2xl px-5 pb-28 pt-6 md:px-8 md:pb-12 md:pt-10 lg:max-w-4xl">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom tab bar: fixed 4 items, equal width, no scroll */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-panel/90 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-500 transition-colors',
                isActive ? 'text-brand' : 'text-mute',
              ].join(' ')
            }
          >
            <Icon size={22} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
