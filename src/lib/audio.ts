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

// Soft ambient bed for the silent timer: looped brown noise through a lowpass
// with a slow LFO, so it breathes like distant rain or wind. Synthesized, no
// audio files, works offline.
let ambient: { src: AudioBufferSourceNode; lfo: OscillatorNode; gain: GainNode } | null =
  null

export function startAmbient(): void {
  const c = getCtx()
  if (!c || ambient) return
  if (c.state === 'suspended') void c.resume()

  const len = Math.floor(c.sampleRate * 2)
  const buf = c.createBuffer(1, len, c.sampleRate)
  const data = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02 // brown-ish integration
    data[i] = last * 3.2
  }

  const src = c.createBufferSource()
  src.buffer = buf
  src.loop = true

  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 480

  const lfo = c.createOscillator()
  lfo.frequency.value = 0.06
  const lfoGain = c.createGain()
  lfoGain.gain.value = 180
  lfo.connect(lfoGain)
  lfoGain.connect(lp.frequency)

  const gain = c.createGain()
  gain.gain.value = 0.0001

  src.connect(lp)
  lp.connect(gain)
  gain.connect(c.destination)
  src.start()
  lfo.start()
  gain.gain.exponentialRampToValueAtTime(0.11, c.currentTime + 1.5)

  ambient = { src, lfo, gain }
}

export function stopAmbient(): void {
  const c = getCtx()
  if (!c || !ambient) return
  const { src, lfo, gain } = ambient
  ambient = null
  try {
    gain.gain.cancelScheduledValues(c.currentTime)
    gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.8)
  } catch {
    /* ignore */
  }
  setTimeout(() => {
    try {
      src.stop()
      lfo.stop()
    } catch {
      /* already stopped */
    }
  }, 900)
}
