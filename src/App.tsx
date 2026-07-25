import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './store/AppStore'
import Layout from './components/Layout'
import Today from './routes/Today'
import Paths from './routes/Paths'
import Journal from './routes/Journal'
import Progress from './routes/Progress'
import Settings from './routes/Settings'
import Session from './routes/Session'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Full-screen player, outside the app chrome */}
          <Route path="/session/:id" element={<Session />} />

          {/* Everything else inside the nav shell */}
          <Route element={<Layout />}>
            <Route path="/" element={<Today />} />
            <Route path="/paths" element={<Paths />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
