import { motion } from 'framer-motion'
import {
  Globe,
  Users,
  Clock,
  TrendingUp,
  Eye,
  Cpu,
  ChessQueen,
  Crown,
} from 'lucide-react'

const navLinks = ['Home', 'Play', 'Leaderboard', 'Login', 'Sign Up']

const features = [
  {
    title: 'Real-Time Multiplayer',
    description: 'Jump into live matches with players around the world.',
    icon: Globe,
  },
  {
    title: 'Global Leaderboards',
    description: 'Track ranking progress and rise to the top.',
    icon: TrendingUp,
  },
  {
    title: 'Match History',
    description: 'Review every game with clean match summaries.',
    icon: Clock,
  },
  {
    title: 'ELO Rating System',
    description: 'Measure your skill with dynamic rating updates.',
    icon: Crown,
  },
  {
    title: 'Live Spectator Mode',
    description: 'Watch championship games in real time.',
    icon: Eye,
  },
  {
    title: 'AI Game Analysis',
    description: 'Receive instant insights to improve every move.',
    icon: Cpu,
  },
]

function App() {
  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3 text-2xl font-semibold tracking-[0.18em] text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#f8e6a0]/15 text-gold shadow-glow">
              ♟
            </span>
            CheckMate
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 sm:justify-end">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {link}
              </a>
            ))}
          </nav>
        </motion.header>

        <main className="grid gap-12 py-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <motion.section
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d4af37]/20 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-glow">
              <span className="h-2.5 w-2.5 rounded-full bg-gold" />
              Premium chess platform for ambitious players
            </div>

            <div className="space-y-6">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Play Chess Online. Challenge Anyone. Improve Every Move.
              </h1>
              <p className="max-w-xl text-base text-slate-300 sm:text-lg">
                CheckMate brings elite-level competition to your browser with seamless multiplayer, live spectator rooms, and smart post-game analysis.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e2c45a]"
              >
                Play Now
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm text-slate-200 transition hover:border-gold/50 hover:text-white"
              >
                Watch Live Games
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Fast matchmaking</p>
                <p className="mt-3 text-lg font-semibold text-white">Find opponents in seconds.</p>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Secure profile</p>
                <p className="mt-3 text-lg font-semibold text-white">Your stats, rating, and history protected.</p>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 via-transparent to-[#ffffff]/5 blur-3xl" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 p-6 shadow-glow backdrop-blur-xl">
              <div className="grid grid-cols-8 gap-2 rounded-3xl border border-white/10 bg-slate-950/10 p-4 shadow-inner">
                {Array.from({ length: 64 }).map((_, index) => {
                  const row = Math.floor(index / 8)
                  const col = index % 8
                  const dark = (row + col) % 2 === 0
                  return (
                    <div
                      key={index}
                      className={`h-10 w-10 rounded transition ${
                        dark ? 'bg-slate-900/80' : 'bg-slate-700/70'
                      }`}
                    />
                  )
                })}
              </div>

              <div className="absolute left-6 top-6 rounded-3xl border border-white/10 bg-slate-950/90 p-4 shadow-lg shadow-black/25">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
                  Live game room
                </div>
                <div className="mt-3 text-3xl font-semibold text-white">Queen&apos;s Gambit</div>
              </div>

              <div className="absolute -right-10 top-24 flex items-center justify-center rounded-full border border-gold/20 bg-[#ffecb6]/10 p-4 shadow-glow">
                <ChessQueen className="h-12 w-12 text-gold" />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-slate-200 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Players online</p>
                  <p className="mt-2 text-2xl font-semibold text-white">1,284</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-slate-200 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Top streak</p>
                  <p className="mt-2 text-2xl font-semibold text-white">12 wins</p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <section className="space-y-8 py-12">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Platform features</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Everything you need to dominate the board</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#d4af37]/20 to-[#ffffff]/10 text-gold shadow-inner">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
                </motion.article>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
