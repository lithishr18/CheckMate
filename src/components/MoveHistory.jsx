import { motion } from 'framer-motion'

export default function MoveHistory({ history }) {
  const pairs = []
  for (let i = 0; i < history.length; i += 2) {
    pairs.push({
      number: Math.floor(i / 2) + 1,
      white: history[i]?.san ?? '',
      black: history[i + 1]?.san ?? '',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="section-label">Moves</span>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-espresso-300">
          {history.length} move{history.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="max-h-56 space-y-0.5 overflow-y-auto">
        {pairs.length === 0 && (
          <p className="font-sans text-sm italic text-espresso-300">No moves yet</p>
        )}
        {pairs.map((pair) => (
          <div
            key={pair.number}
            className="grid grid-cols-[2rem_1fr_1fr] gap-2 border-b border-cream-200 py-1.5 font-mono text-sm transition hover:bg-cream-50"
          >
            <span className="text-right font-sans text-xs font-medium text-gold-400">
              {pair.number}.
            </span>
            <span className="font-medium text-espresso-500">{pair.white}</span>
            <span className="text-espresso-400">{pair.black}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
