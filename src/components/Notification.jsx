import { motion, AnimatePresence } from 'framer-motion'

const typeStyles = {
  success: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  error: 'border-red-300 bg-red-50 text-red-600',
  info: 'border-gold-300 bg-gold-50 text-gold-700',
}

export default function Notification({ notifications, onRemove }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex max-w-md flex-col items-center gap-2 px-4 sm:right-4 sm:left-auto sm:mx-0 sm:items-end">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto flex items-center gap-3 border px-4 py-3 font-sans text-sm shadow-sm ${
              typeStyles[n.type] || typeStyles.info
            }`}
          >
            <span className="flex-1">{n.message}</span>
            <button
              type="button"
              onClick={() => onRemove(n.id)}
              className="leading-none opacity-50 transition hover:opacity-100"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
