import { motion } from 'framer-motion'
import { formatGameStatus } from '../utils/chessHelpers.js'

export default function GameStatus({ status, turn, room, opponentConnected, playerColor, roomPlayers }) {
  const label = formatGameStatus(status)
  const isOver = status.type === 'checkmate' || status.type === 'stalemate' || status.type === 'draw'
  const isWaiting = playerColor && roomPlayers < 2
  const isOpponentDisconnected = playerColor && roomPlayers >= 2 && opponentConnected === false

  const statusText = isWaiting
    ? 'Waiting for opponent'
    : isOpponentDisconnected
      ? 'Opponent disconnected'
      : isOver
        ? 'Game over'
        : status.type === 'check'
          ? 'Check!'
          : 'In progress'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-label">Match</span>

      <div className="space-y-3 font-sans text-sm text-espresso-400">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-2 w-2 rounded-full ${
              isOpponentDisconnected
                ? 'bg-red-400'
                : isOver
                  ? 'bg-red-400'
                  : status.type === 'check'
                    ? 'bg-gold-400'
                    : 'bg-gold-300'
            }`}
          />
          <span className="font-medium text-espresso-500">{statusText}</span>
        </div>

        {!isWaiting && playerColor && (
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full border-2 ${
                playerColor === 'w'
                  ? 'border-espresso-300 bg-cream-50'
                  : 'border-espresso-600 bg-espresso-500'
              }`}
            />
            <span className="font-sans text-xs text-espresso-400">
              You are{' '}
              <span className="font-semibold text-espresso-500">
                {playerColor === 'w' ? 'White' : 'Black'}
              </span>
            </span>
          </div>
        )}

        {isOver && (
          <p className="font-sans text-sm font-medium text-espresso-500">
            {label}
          </p>
        )}

        <div className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1">
          <span className="text-espresso-300">Room</span>
          <span className="font-medium text-espresso-500">{room}</span>
          <span className="text-espresso-300">Time</span>
          <span className="font-medium text-espresso-500">10 + 5</span>
          <span className="text-espresso-300">Turn</span>
          <span className="font-medium text-espresso-500">
            {turn === 'w' ? 'White' : 'Black'}
          </span>
        </div>
      </div>

      <div className="mt-5 hairline" />
    </motion.div>
  )
}
