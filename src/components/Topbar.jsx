import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'Play', href: '#' },
  { label: 'History', href: '#' },
  { label: 'Leaderboard', href: '#' },
  { label: 'Settings', href: '#' },
]

export default function Topbar({ roomId, connected, room, onLeaveRoom }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(roomId)
      setCopied(true)
    }
  }

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(t)
    }
  }, [copied])

  const playerCount = room?.players?.length ?? 0

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-cream-200 bg-cream-50/80 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex items-center gap-6 sm:gap-10">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-gold-300 bg-gold-50 font-display text-sm text-gold-500">
              ♟
            </span>
            <span className="hidden font-display text-lg font-medium tracking-tight text-espresso-500 sm:inline">
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

        <div className="flex items-center gap-3 sm:gap-4">
          {room && (
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-espresso-300 sm:text-xs">
                  Room
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 font-sans text-sm text-espresso-400 transition hover:text-espresso-500"
                >
                  <span className="font-mono text-xs tracking-widest text-gold-400 sm:text-sm">
                    {roomId}
                  </span>
                  <span className="min-w-[3rem] text-[10px] uppercase tracking-[0.15em]">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2 font-sans text-xs text-espresso-400">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    playerCount === 2 ? 'bg-emerald-400' : 'bg-gold-300'
                  }`}
                />
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

          <div className="flex items-center gap-2 border-l border-cream-300 pl-3 sm:gap-3 sm:pl-6">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                connected ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            />
            <span className="hidden font-sans text-[11px] font-medium text-espresso-400 sm:inline">
              {connected ? 'Connected' : 'Disconnected'}
            </span>
            <span className="flex h-7 w-7 items-center justify-center border border-cream-300 bg-cream-100 font-sans text-[11px] font-medium text-espresso-400">
              SK
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
