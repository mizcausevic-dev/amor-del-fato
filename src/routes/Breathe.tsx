import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import BreathBox from '../components/BreathBox'

export default function Breathe() {
  const navigate = useNavigate()
  const [done, setDone] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-canvas">
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          onClick={() => navigate(-1)}
          className="grid h-9 w-9 place-items-center rounded-full text-mute transition-colors hover:bg-panel-2 hover:text-ink"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Box breathing</p>
        <span className="h-9 w-9" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {!done ? (
          <BreathBox cycles={4} onDone={() => setDone(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="font-head text-2xl font-600 text-ink">Settled.</p>
            <p className="mt-2 text-mute">Carry that breath with you.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 rounded-full bg-brand px-8 py-3 font-600 text-white"
            >
              Done
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
