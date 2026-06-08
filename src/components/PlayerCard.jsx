import { motion } from 'framer-motion'

export default function PlayerCard({ color, username, rating, timer, status }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{color} Player</p>
          <h3 className="text-xl font-semibold text-white">{username}</h3>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#d4af37]/20 to-[#ffffff]/10 text-2xl font-semibold text-gold">
          {username.charAt(0)}
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span>Rating</span>
          <span className="font-semibold text-white">{rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Timer</span>
          <span className="font-semibold text-white">{timer}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Status</span>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            {status}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
