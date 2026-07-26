import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider, useStore } from './store/AppStore'
import Layout from './components/Layout'

// Route-level code-splitting: each screen is its own chunk, so the first paint
// only pays for the shell + the landing route, not the whole app. Layout stays
// eager because it is the shell every route renders inside.
const Today = lazy(() => import('./routes/Today'))
const Paths = lazy(() => import('./routes/Paths'))
const Journal = lazy(() => import('./routes/Journal'))
const Progress = lazy(() => import('./routes/Progress'))
const Settings = lazy(() => import('./routes/Settings'))
const Session = lazy(() => import('./routes/Session'))
const Breathe = lazy(() => import('./routes/Breathe'))
const Onboarding = lazy(() => import('./routes/Onboarding'))
const Terms = lazy(() => import('./routes/Terms'))
const Glossary = lazy(() => import('./routes/Glossary'))
const Readings = lazy(() => import('./routes/Readings'))

/** Quiet fallback while a route chunk loads. The shell/background already paint,
    so this is only ever a brief flash on a cold navigation. */
function RouteFallback() {
  return <div className="min-h-svh" aria-hidden />
}

function OnboardingGate() {
  const { state } = useStore()
  if (state.onboarded) return null
  return (
    <Suspense fallback={<RouteFallback />}>
      <Onboarding />
    </Suspense>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <OnboardingGate />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Full-screen surfaces, outside the app chrome */}
            <Route path="/session/:id" element={<Session />} />
            <Route path="/breathe" element={<Breathe />} />

            {/* Everything else inside the nav shell */}
            <Route element={<Layout />}>
              <Route path="/" element={<Today />} />
              <Route path="/paths" element={<Paths />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/readings" element={<Readings />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/terms" element={<Terms />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  )
}
