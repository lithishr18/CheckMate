import { motion } from 'framer-motion'

const games = [
  { opponent: 'NinjaKnight', result: 'Win', date: 'Jun 7' },
  { opponent: 'RookMaster', result: 'Loss', date: 'Jun 5' },
  { opponent: 'BishopQueen', result: 'Win', date: 'Jun 4' },
  { opponent: 'BlitzRaven', result: 'Draw', date: 'Jun 2' },
]

export default function RecentGames() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4 pb-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Recent Games</p>
          <h3 className="text-xl font-semibold text-white">Opponent Results</h3>
        </div>
        <span className="rounded-3xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-300">
          4 Matches
        </span>
      </div>

      <div className="space-y-3">
        {games.map((game) => (
          <div key={game.opponent} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 transition hover:border-gold/30 hover:bg-white/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{game.opponent}</p>
                <p className="text-slate-400">vs opponent</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">{game.date}</p>
                <p className="text-slate-400 text-xs">Finished</p>
              </div>
            </div>
            <div className="mt-4 inline-flex rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              {game.result}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
