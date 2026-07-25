import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" makes Framer honor the OS setting and jump to end
        state instantly, so animation-gated transitions can never leave the UI
        stuck for reduced-motion users. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)

// Register the offline service worker in production builds only (avoids caching
// the dev server). Fails silently where service workers are unavailable.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
  // When a new SW takes control (deploy with a bumped VERSION), reload once so
  // a returning device on a stale/broken cache self-heals to the fresh build.
  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    refreshing = true
    window.location.reload()
  })
}
