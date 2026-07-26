// Shared option sets for the onboarding flow and the Settings profile editor,
// so both stay in sync from one source.
import { paths, type ThemeKey } from './content'
import type { PracticeTime, SessionLength } from '../lib/types'

export const FOCUS: Array<{ key: ThemeKey; label: string }> = [
  { key: 'control', label: 'What I can control' },
  { key: 'fear', label: 'Fear & anxiety' },
  { key: 'anger', label: 'Anger' },
  { key: 'adversity', label: 'Hard times' },
  { key: 'resilience', label: 'Resilience' },
  { key: 'mortality', label: 'Mortality' },
  { key: 'discipline', label: 'Discipline' },
  { key: 'gratitude', label: 'Gratitude' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'relationships', label: 'Relationships' },
]

export const TIMES: Array<{ key: PracticeTime; label: string }> = [
  { key: 'morning', label: 'Morning' },
  { key: 'evening', label: 'Evening' },
  { key: 'both', label: 'Both' },
]

export const LENGTHS: Array<{ key: SessionLength; label: string; hint: string }> = [
  { key: 'short', label: 'Short', hint: '~5 min' },
  { key: 'standard', label: 'Standard', hint: '~10 min' },
  { key: 'deep', label: 'Deep', hint: '~15 min' },
]

/** Recommend a path from the primary focus, falling back to the first path. */
export function recommendPath(focus: ThemeKey[]): string {
  const primary = focus[0]
  const match = paths.find((p) => p.theme === primary)
  return (match ?? paths[0]).id
}
