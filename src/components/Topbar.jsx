import { useState } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'Play', href: '#' },
  { label: 'History', href: '#' },
  { label: 'Leaderboard', href: '#' },
  { label: 'Settings', href: '#' },
]

export default function Topbar({ roomId, connected, room, onCreateRoom, onJoinRoom, onLeaveRoom, error }) {
  const [joinInput, setJoinInput] = useState('')
  const [showJoin, setShowJoin] = useState(false)

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(roomId)
    }
  }

  const handleJoin = () => {
    if (joinInput.trim()) {
      onJoinRoom(joinInput.trim())
      setJoinInput('')
      setShowJoin(false)
    }
  }

  const playerCount = room?.players?.length ?? 0

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-cream-200 bg-cream-50/80 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-4">
        <div className="flex items-center gap-10">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-gold-300 bg-gold-50 font-display text-sm text-gold-500">
              ♟
            </span>
            <span className="font-display text-lg font-medium tracking-tight text-espresso-500">
              CheckMate
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="border-b border-transparent pb-0.5 font-sans text-sm font-medium text-espresso-400 transition hover:border-espresso-400 hover:text-espresso-500"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {connected && !room && (
            <div className="flex items-center gap-3">
              {showJoin ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={joinInput}
                    onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                    placeholder="ROOM CODE"
                    maxLength={6}
                    className="w-28 border border-cream-300 bg-cream-50 px-3 py-1.5 font-mono text-sm uppercase tracking-wider text-espresso-500 outline-none placeholder:text-espresso-300 focus:border-gold-400"
                  />
                  <button
                    type="button"
                    onClick={handleJoin}
                    className="border border-gold-300 bg-gold-50 px-3 py-1.5 font-sans text-xs font-medium text-gold-500 transition hover:bg-gold-100"
                  >
                    Join
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowJoin(false)}
                    className="font-sans text-xs text-espresso-400 hover:text-espresso-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onCreateRoom}
                    className="border border-gold-300 bg-gold-50 px-4 py-1.5 font-sans text-xs font-medium tracking-wide text-gold-500 transition hover:bg-gold-100"
                  >
                    Create Room
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowJoin(true)}
                    className="border-b border-espresso-200 pb-0.5 font-sans text-xs font-medium text-espresso-400 transition hover:border-espresso-500 hover:text-espresso-500"
                  >
                    Join Room
                  </button>
                </>
              )}
            </div>
          )}

          {room && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-espresso-300">Room</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 font-sans text-sm text-espresso-400 transition hover:text-espresso-500"
                >
                  <span className="font-mono text-xs tracking-widest text-gold-400">{roomId}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em]">Copy</span>
                </button>
              </div>
              <div className="flex items-center gap-2 font-sans text-xs text-espresso-400">
                <span className={`inline-block h-2 w-2 rounded-full ${playerCount === 2 ? 'bg-emerald-400' : 'bg-gold-300'}`} />
                {playerCount}/2
              </div>
              <button
                type="button"
                onClick={onLeaveRoom}
                className="border-b border-espresso-200 pb-0.5 font-sans text-xs text-espresso-400 transition hover:border-espresso-500 hover:text-espresso-500"
              >
                Leave
              </button>
            </div>
          )}

          <div className="flex items-center gap-3 border-l border-cream-300 pl-6">
            <span className={`inline-block h-2 w-2 rounded-full ${connected ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span className="font-sans text-sm font-medium text-espresso-500">SK</span>
            <span className="flex h-7 w-7 items-center justify-center border border-cream-300 bg-cream-100 font-sans text-[11px] font-medium text-espresso-400">
              SK
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="border-t border-cream-200 bg-red-50 px-8 py-2">
          <p className="font-sans text-xs text-red-500">{error}</p>
        </div>
      )}
    </motion.header>
  )
}
