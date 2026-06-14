import { motion } from 'framer-motion'

const navItems = [
  { label: 'Play', href: '#' },
  { label: 'History', href: '#' },
  { label: 'Leaderboard', href: '#' },
  { label: 'Settings', href: '#' },
]

export default function Topbar({ roomId }) {
  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(roomId)
    }
  }

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

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 font-sans text-sm text-espresso-400 transition hover:text-espresso-500"
          >
            <span className="font-mono text-xs tracking-widest text-gold-400">{roomId}</span>
            <span className="text-[10px] uppercase tracking-[0.15em]">Copy</span>
          </button>
          <div className="flex items-center gap-3 border-l border-cream-300 pl-6">
            <span className="font-sans text-sm font-medium text-espresso-500">SK</span>
            <span className="flex h-7 w-7 items-center justify-center border border-cream-300 bg-cream-100 font-sans text-[11px] font-medium text-espresso-400">
              SK
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
