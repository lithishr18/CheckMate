import { motion } from 'framer-motion'

export default function PlayerCard({
  color,
  username,
  rating,
  timer,
  isActiveTurn,
  opponentConnected,
  isCurrentPlayer,
}) {
  const isOpponentCard = opponentConnected !== null
  const isWhite = color === 'White'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group transition-opacity ${isActiveTurn ? '' : 'opacity-60'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-3 w-3 rounded-full border-2 ${
                  isWhite
                    ? 'border-espresso-300 bg-cream-50'
                    : 'border-espresso-600 bg-espresso-500'
                }`}
              />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-espresso-300">
                {color}
              </span>
            </div>
            {isCurrentPlayer && (
              <span className="rounded border border-gold-200 bg-gold-50 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-gold-500">
                You
              </span>
            )}
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
          Rating{' '}
          <strong className="font-semibold text-espresso-500">{rating}</strong>
        </span>
        <span>
          Timer{' '}
          <strong className="font-semibold text-espresso-500">{timer}</strong>
        </span>
        <span
          className={
            isActiveTurn ? 'font-medium text-gold-400' : 'text-espresso-300'
          }
        >
          {isOpponentCard && opponentConnected === false
            ? 'Disconnected'
            : isActiveTurn
              ? 'To move'
              : 'Waiting'}
        </span>
      </div>
      {isOpponentCard && opponentConnected === false && (
        <div className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500">
            Opponent disconnected
          </span>
        </div>
      )}
      <div className="mt-4 hairline" />
    </motion.div>
  )
}
