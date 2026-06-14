import { motion } from 'framer-motion'

export default function GameStatus({ turn, status, room }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-label">Match</span>

      <div className="space-y-3 font-sans text-sm text-espresso-400">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2 w-2 rounded-full bg-gold-300" />
          <span className="font-medium text-espresso-500">{status}</span>
        </div>
        <div className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1">
          <span className="text-espresso-300">Room</span>
          <span className="font-medium text-espresso-500">{room}</span>
          <span className="text-espresso-300">Time</span>
          <span className="font-medium text-espresso-500">10 + 5</span>
          <span className="text-espresso-300">Turn</span>
          <span className="font-medium text-espresso-500">{turn}</span>
        </div>
      </div>

      <div className="mt-5 hairline" />
    </motion.div>
  )
}
