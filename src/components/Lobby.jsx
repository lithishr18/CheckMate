import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Lobby({ connected, room, onCreateRoom, onJoinRoom, onLeaveRoom, error, addNotification }) {
  const [joinInput, setJoinInput] = useState('')
  const [showJoin, setShowJoin] = useState(false)
  const [copied, setCopied] = useState(false)

  const waiting = room && room.players?.length < 2

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(room.code)
      setCopied(true)
      addNotification?.({ type: 'success', message: 'Room code copied!' })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleJoin = () => {
    if (joinInput.trim()) {
      onJoinRoom(joinInput.trim())
      setJoinInput('')
      setShowJoin(false)
    }
  }

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center pt-32">
        <p className="font-sans text-sm text-espresso-400">Connecting to server...</p>
      </div>
    )
  }

  if (waiting) {
    return (
      <div className="flex flex-col items-center justify-center px-4 pt-20 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-md flex-col items-center gap-8"
        >
          <div className="space-y-2 text-center">
            <span className="section-label">Room Created</span>
            <h2 className="font-display text-3xl font-medium italic text-espresso-500 sm:text-4xl">
              Waiting for opponent
            </h2>
            <p className="font-sans text-sm text-espresso-400">
              Share the room code below to start playing
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full items-center justify-center gap-4">
              <span className="font-mono text-2xl tracking-[0.25em] text-gold-500 sm:text-3xl sm:tracking-[0.3em]">
                {room.code}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="border border-gold-300 bg-gold-50 px-4 py-2 font-sans text-xs font-medium tracking-wide text-gold-500 transition hover:bg-gold-100"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="flex items-center gap-2 font-sans text-sm text-espresso-400">
              <span className="flex h-2 w-2 rounded-full bg-gold-300" />
              {room.players?.length ?? 1}/2 players
            </div>

            <div className="mt-4 flex items-center gap-3 font-sans text-sm text-espresso-400">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold-400" />
              Waiting for opponent to join...
            </div>

            {room.color && (
              <p className="font-sans text-xs uppercase tracking-[0.15em] text-espresso-300">
                You play as{' '}
                <span className="font-semibold text-espresso-500">
                  {room.color === 'w' ? 'White' : 'Black'}
                </span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onLeaveRoom}
            className="border-b border-espresso-200 pb-0.5 font-sans text-sm text-espresso-400 transition hover:border-espresso-500 hover:text-espresso-500"
          >
            Cancel room
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 pt-20 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-md flex-col items-center gap-10"
      >
        <div className="space-y-2 text-center">
          <h2 className="font-display text-3xl font-medium italic text-espresso-500 sm:text-4xl">
            Play Online
          </h2>
          <p className="font-sans text-sm text-espresso-400">
            Create a room and invite a friend, or join an existing one
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <button
            type="button"
            onClick={onCreateRoom}
            className="w-full border border-gold-300 bg-gold-50 px-8 py-3 font-sans text-sm font-medium tracking-wide text-gold-500 transition hover:bg-gold-100 sm:w-auto"
          >
            Create Room
          </button>

          <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
            {showJoin ? (
              <>
                <input
                  type="text"
                  value={joinInput}
                  onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                  placeholder="ROOM CODE"
                  maxLength={6}
                  className="w-full border border-cream-300 bg-cream-50 px-3 py-3 font-mono text-sm uppercase tracking-wider text-espresso-500 outline-none placeholder:text-espresso-300 focus:border-gold-400 sm:w-32"
                />
                <button
                  type="button"
                  onClick={handleJoin}
                  className="border border-gold-300 bg-gold-50 px-5 py-3 font-sans text-sm font-medium text-gold-500 transition hover:bg-gold-100"
                >
                  Join
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoin(false)}
                  className="font-sans text-sm text-espresso-400 hover:text-espresso-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setShowJoin(true)}
                className="border-b border-espresso-200 pb-0.5 font-sans text-sm font-medium text-espresso-400 transition hover:border-espresso-500 hover:text-espresso-500"
              >
                Join Room
              </button>
            )}
          </div>
        </div>

        {error && (
          <p className="font-sans text-sm text-red-500">{error}</p>
        )}
      </motion.div>
    </div>
  )
}
