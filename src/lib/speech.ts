// Optional spoken guidance via the Web Speech API (SpeechSynthesis). Fully
// on-device, no network, no bundled audio. Degrades silently where unsupported.

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Speak text at a calm, slightly slow pace. Cancels anything already speaking. */
export function speak(text: string, onEnd?: () => void): void {
  if (!speechSupported()) {
    onEnd?.()
    return
  }
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.9
    u.pitch = 1
    u.volume = 1
    if (onEnd) u.onend = () => onEnd()
    window.speechSynthesis.speak(u)
  } catch {
    onEnd?.()
  }
}

export function stopSpeaking(): void {
  if (speechSupported()) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      /* ignore */
    }
  }
}
