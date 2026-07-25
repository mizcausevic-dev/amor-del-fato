// Meditation bell synthesized with the Web Audio API. No audio asset to bundle,
// no network request, works offline. A struck-bell timbre: a couple of detuned
// partials with a fast attack and a long exponential decay.

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      if (!Ctor) return null
      ctx = new Ctor()
    }
    return ctx
  } catch {
    return null
  }
}

/** Call once from a user gesture (e.g. pressing Start) to satisfy autoplay policy. */
export function primeAudio(): void {
  const c = getCtx()
  if (c && c.state === 'suspended') void c.resume()
}

/** A single soft bell strike. `when` is an offset in seconds from now. */
export function playBell(when = 0): void {
  const c = getCtx()
  if (!c) return
  if (c.state === 'suspended') void c.resume()

  const t0 = c.currentTime + when
  const master = c.createGain()
  master.gain.value = 0.0001
  master.connect(c.destination)

  // Bell partials (Hz) with relative gains. Slightly inharmonic for a metal feel.
  const partials: Array<[freq: number, gain: number]> = [
    [523.25, 1.0], // C5 fundamental
    [1046.5, 0.5], // octave
    [1567.98, 0.25], // ~fifth above
    [2093.0, 0.12],
  ]

  for (const [freq, gain] of partials) {
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    g.gain.value = gain
    osc.connect(g)
    g.connect(master)
    osc.start(t0)
    osc.stop(t0 + 4.5)
  }

  // Envelope: fast attack, long exponential tail.
  master.gain.setValueAtTime(0.0001, t0)
  master.gain.exponentialRampToValueAtTime(0.6, t0 + 0.02)
  master.gain.exponentialRampToValueAtTime(0.0001, t0 + 4.4)
}
