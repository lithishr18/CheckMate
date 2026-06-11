import { motion } from 'framer-motion'
import { Copy, Signal, UserCircle2 } from 'lucide-react'

export default function Topbar({ roomId }) {
  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(roomId)
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-slate-950/70 p-5 shadow-glow backdrop-blur-xl md:flex-row md:items-center md:justify-between"
    >
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Current Room</p>
        <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-inner">
          <span className="text-gold">{roomId}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-300 transition hover:bg-white/10"
          >
            <Copy className="h-4 w-4" />
            Copy Room
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 shadow-inner">
          <span className="inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400" />
          Online
        </div>

        <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner">
          <UserCircle2 className="h-5 w-5 text-gold" />
          <div>
            <p className="text-sm font-semibold text-white">Sasha Knight</p>
            <p className="text-xs text-slate-400">Premium Member</p>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
