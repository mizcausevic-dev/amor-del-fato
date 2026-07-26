// Generate a branded quote card on a canvas (client-side, no server) and share
// it via the Web Share API, falling back to a download. Uses the app's fonts,
// which are already loaded on the page.

const SIZE = 1080
const BG = '#1A1815'
const INK = '#EDE7DB'
const MUTE = '#9B9484'
const BRAND = '#D97848'
const CREAM = '#F5F1EA'

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

function drawShield(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  // Path is authored on a 0..100 box centered at (50,50); map to (cx,cy) at scale s/100.
  const px = (x: number) => cx + (x - 50) * (s / 100)
  const py = (y: number) => cy + (y - 50) * (s / 100)
  ctx.beginPath()
  ctx.moveTo(px(50), py(14))
  ctx.lineTo(px(80), py(25))
  ctx.lineTo(px(80), py(52))
  ctx.bezierCurveTo(px(80), py(73), px(67), py(85), px(50), py(91))
  ctx.bezierCurveTo(px(33), py(85), px(20), py(73), px(20), py(52))
  ctx.lineTo(px(20), py(25))
  ctx.closePath()
  ctx.fillStyle = BRAND
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx, cy, (17 * s) / 100, 0, Math.PI * 2)
  ctx.lineWidth = (4 * s) / 100
  ctx.strokeStyle = CREAM
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx, cy, (4 * s) / 100, 0, Math.PI * 2)
  ctx.fillStyle = CREAM
  ctx.fill()
}

/** Render a quote card and return a PNG Blob. */
export async function createQuoteCard(text: string, author: string): Promise<Blob | null> {
  try {
    if (document.fonts?.ready) await document.fonts.ready
  } catch {
    /* fonts may still be usable */
  }
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // Background + soft brand glow
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, SIZE, SIZE)
  const glow = ctx.createRadialGradient(240, 220, 40, 240, 220, 620)
  glow.addColorStop(0, 'rgba(217,120,72,0.20)')
  glow.addColorStop(1, 'rgba(217,120,72,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, SIZE, SIZE)

  drawShield(ctx, SIZE / 2, 190, 130)

  // Quote (serif), wrapped and vertically centered around the middle.
  ctx.textAlign = 'center'
  ctx.fillStyle = INK
  const quoteSize = 58
  ctx.font = `italic ${quoteSize}px 'Libre Baskerville', Georgia, serif`
  const maxW = SIZE - 200
  const lines = wrapLines(ctx, `“${text}”`, maxW)
  const lineH = quoteSize * 1.4
  let y = SIZE / 2 - ((lines.length - 1) * lineH) / 2
  for (const l of lines) {
    ctx.fillText(l, SIZE / 2, y)
    y += lineH
  }

  // Attribution
  ctx.fillStyle = MUTE
  ctx.font = `600 26px 'Inter', system-ui, sans-serif`
  ctx.fillText(author.toUpperCase(), SIZE / 2, y + 40)

  // Footer wordmark
  ctx.fillStyle = MUTE
  ctx.font = `500 26px 'Inter', system-ui, sans-serif`
  ctx.fillText('AMOR DEL FATO  ·  amordelfato.app', SIZE / 2, SIZE - 70)

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'))
}

/** Share the card via the Web Share API if possible, else download it. */
export async function shareOrDownload(blob: Blob, filename: string): Promise<void> {
  const file = new File([blob], filename, { type: 'image/png' })
  const nav = navigator as Navigator & {
    canShare?: (data: { files: File[] }) => boolean
    share?: (data: { files: File[]; title?: string }) => Promise<void>
  }
  if (nav.canShare?.({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title: 'Amor del Fato' })
      return
    } catch {
      /* user cancelled or share failed; fall through to download */
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
