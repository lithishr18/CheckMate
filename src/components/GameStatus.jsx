import { motion } from 'framer-motion'

export default function GameStatus({ turn, status, room }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Match Status</p>
          <h3 className="text-xl font-semibold text-white">{status}</h3>
        </div>
        <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 shadow-inner">
          {turn} Turn
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span>Room Code</span>
          <span className="font-semibold text-white">{room}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Time Control</span>
          <span className="font-semibold text-white">10 + 5</span>
        </div>
      </div>
    </motion.div>
  )
}
