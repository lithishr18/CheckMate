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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4 pb-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Move History</p>
          <h3 className="text-xl font-semibold text-white">Notation Log</h3>
        </div>
        <span className="rounded-3xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-300">
          Latest
        </span>
      </div>

      <div className="space-y-3 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-3">
        <div className="grid grid-cols-[56px_1fr_1fr] gap-3 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-500">
          <span>Move</span>
          <span>White</span>
          <span>Black</span>
        </div>
        <div className="max-h-72 space-y-2 overflow-y-auto pr-2">
          {moves.map((entry) => (
            <div key={entry.move} className="grid grid-cols-[56px_1fr_1fr] gap-3 rounded-3xl bg-white/5 px-3 py-3 text-sm text-slate-200 transition hover:bg-white/10">
              <span className="font-semibold text-gold">{entry.move}.</span>
              <span>{entry.white}</span>
              <span>{entry.black}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
