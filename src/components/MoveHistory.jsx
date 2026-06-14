import { motion } from 'framer-motion'

const moves = [
  { move: '1', white: 'e4', black: 'c5' },
  { move: '2', white: 'Nf3', black: 'd6' },
  { move: '3', white: 'd4', black: 'cxd4' },
  { move: '4', white: 'Nxd4', black: 'Nf6' },
  { move: '5', white: 'Nc3', black: 'a6' },
  { move: '6', white: 'Be3', black: 'e6' },
  { move: '7', white: 'f3', black: 'Nc6' },
  { move: '8', white: 'Qd2', black: 'Be7' },
  { move: '9', white: 'O-O-O', black: 'Bd7' },
  { move: '10', white: 'g4', black: 'Nxd4' },
]

export default function MoveHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="section-label">Moves</span>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-espresso-300">
          10 moves
        </span>
      </div>

      <div className="max-h-56 space-y-1 overflow-y-auto">
        {moves.map((entry) => (
          <div
            key={entry.move}
            className="grid grid-cols-[2rem_1fr_1fr] gap-2 border-b border-cream-200 py-1.5 font-mono text-sm transition hover:bg-cream-50"
          >
            <span className="text-right font-sans text-xs font-medium text-gold-400">
              {entry.move}.
            </span>
            <span className="font-medium text-espresso-500">{entry.white}</span>
            <span className="text-espresso-400">{entry.black}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
