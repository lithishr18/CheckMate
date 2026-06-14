import { motion } from 'framer-motion'

const games = [
  { opponent: 'NinjaKnight', result: 'Win', date: 'Jun 7' },
  { opponent: 'RookMaster', result: 'Loss', date: 'Jun 5' },
  { opponent: 'BishopQueen', result: 'Win', date: 'Jun 4' },
  { opponent: 'BlitzRaven', result: 'Draw', date: 'Jun 2' },
]

const resultStyles = {
  Win: 'text-emerald-600',
  Loss: 'text-red-500',
  Draw: 'text-gold-500',
}

export default function RecentGames() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-label">Recent Games</span>

      <div className="space-y-1">
        {games.map((game) => (
          <div
            key={game.opponent}
            className="grid grid-cols-[1fr_3.5rem_4.5rem] items-center gap-4 border-b border-cream-200 py-3 font-sans text-sm transition hover:bg-cream-50"
          >
            <span className="font-medium text-espresso-500">{game.opponent}</span>
            <span className={`text-xs font-semibold uppercase tracking-wider ${resultStyles[game.result]}`}>
              {game.result}
            </span>
            <span className="text-right text-espresso-300">{game.date}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
