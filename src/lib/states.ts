// The arrive/leave check-in model. Five words on one axis of equanimity,
// never shown as a number to the user. The value 1..5 exists only for
// positioning and trend math.

export interface CheckState {
  value: number // 1..5, internal only
  label: string
}

export const CHECK_STATES: CheckState[] = [
  { value: 1, label: 'Rattled' },
  { value: 2, label: 'Uneasy' },
  { value: 3, label: 'Steady' },
  { value: 4, label: 'Clear' },
  { value: 5, label: 'Grounded' },
]

export function stateLabel(value: number | null): string {
  if (value == null) return ''
  return CHECK_STATES.find((s) => s.value === value)?.label ?? ''
}
