import { motion } from 'framer-motion'
import { Home, Globe, Cpu, Clock3, Award, Settings2, UserCircle2 } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: Home },
  { label: 'Play Online', icon: Globe },
  { label: 'Play Bot', icon: Cpu },
  { label: 'Match History', icon: Clock3 },
  { label: 'Leaderboard', icon: Award },
  { label: 'Settings', icon: Settings2 },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex min-h-[calc(100vh-3rem)] flex-col rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl"
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-3 text-lg font-semibold tracking-[0.18em] text-white shadow-inner">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-[#d4af37]/30 to-[#ffffff]/10 text-gold ring-1 ring-white/10">
              ♟
            </span>
            CheckMate
          </div>
          <p className="text-sm text-slate-400">
            Elite dashboard for premium chess competition, matches, and analytics.
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href="#"
                className="group flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-gold/30 hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-5 w-5 text-slate-300 transition group-hover:text-gold" />
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#d4af37]/20 to-[#ffffff]/10 text-2xl font-semibold text-gold">
            SK
          </div>
          <div>
            <p className="font-semibold text-white">Sasha Knight</p>
            <p className="text-sm text-slate-400">Grandmaster • Online</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 rounded-3xl bg-slate-950/70 p-4 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <span>ELO</span>
            <span className="font-semibold text-white">2,346</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Win Rate</span>
            <span className="font-semibold text-white">78%</span>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
