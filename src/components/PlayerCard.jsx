import { motion } from 'framer-motion'

export default function PlayerCard({ color, username, rating, timer, isActiveTurn, opponentConnected }) {
  const isOpponentCard = opponentConnected !== null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group transition-opacity ${isActiveTurn ? '' : 'opacity-60'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                color === 'White'
                  ? 'border border-espresso-200 bg-cream-50'
                  : 'bg-espresso-500'
              }`}
            />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-espresso-300">
              {color}
            </span>
          </div>
          <h3 className="font-display text-2xl font-medium italic leading-none text-espresso-500">
            {username}
          </h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center border border-cream-300 bg-cream-100 font-display text-sm text-espresso-400">
          {username.charAt(0)}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-sans text-sm text-espresso-400">
        <span>
          Rating <strong className="font-semibold text-espresso-500">{rating}</strong>
        </span>
        <span>
          Timer <strong className="font-semibold text-espresso-500">{timer}</strong>
        </span>
        <span className={isActiveTurn ? 'text-gold-400 font-medium' : 'text-espresso-300'}>
          {isOpponentCard && opponentConnected === false
            ? 'Disconnected'
            : isActiveTurn
              ? 'To move'
              : 'Waiting'}
        </span>
      </div>
      {isOpponentCard && opponentConnected === false && (
        <div className="mt-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-red-400">Opponent disconnected</span>
        </div>
      )}
      <div className="mt-4 hairline" />
    </motion.div>
  )
}
