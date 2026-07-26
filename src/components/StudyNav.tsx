import { NavLink } from 'react-router-dom'
import { BookText, Library } from 'lucide-react'

const LINKS = [
  { to: '/glossary', label: 'Glossary', icon: BookText },
  { to: '/readings', label: 'Readings', icon: Library },
] as const

/** Shared segmented sub-nav for the two-page Study section. */
export default function StudyNav() {
  return (
    <div
      role="tablist"
      aria-label="Study section"
      className="flex gap-2 rounded-full border border-line bg-panel-2 p-1"
    >
      {LINKS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          role="tab"
          className={({ isActive }) =>
            [
              'flex flex-1 items-center justify-center gap-2 rounded-full py-2 text-sm font-500 transition-colors',
              isActive ? 'bg-brand text-white shadow-sm' : 'text-mute hover:text-ink',
            ].join(' ')
          }
        >
          <Icon size={16} /> {label}
        </NavLink>
      ))}
    </div>
  )
}
