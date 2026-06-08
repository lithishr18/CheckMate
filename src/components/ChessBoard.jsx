import { motion } from 'framer-motion'

const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]
export default function ChessBoard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 pb-5 text-slate-300">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Live Match</p>
            <h2 className="text-2xl font-semibold text-white">Grandmaster Arena</h2>
          </div>
          <p className="text-sm text-slate-400">Premium dark board · 10 min | 5 sec</p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 p-4 shadow-inner">
          <div className="grid gap-2">
            <div className="grid grid-cols-[24px_repeat(8,minmax(0,1fr))_24px] items-center text-center text-xs uppercase tracking-[0.35em] text-slate-500">
              <div />
              {files.map((file) => (
                <div key={file}>{file}</div>
              ))}
              <div />
            </div>
            {ranks.map((rank, rowIndex) => (
              <div key={rank} className="grid grid-cols-[24px_repeat(8,minmax(0,1fr))_24px] items-center gap-2">
                <div className="text-sm font-semibold text-slate-400">{rank}</div>
                {files.map((file, fileIndex) => {
                  const dark = (rowIndex + fileIndex) % 2 === 0
                  return (
                    <div
                      key={`${file}${rank}`}
                      className={`aspect-square rounded-2xl border border-white/5 transition ${
                        dark ? 'bg-slate-900/90' : 'bg-slate-700/80'
                      }`}
                    />
                  )
                })}
                <div className="text-sm font-semibold text-slate-400">{rank}</div>
              </div>
            ))}
            <div className="grid grid-cols-[24px_repeat(8,minmax(0,1fr))_24px] items-center text-center text-xs uppercase tracking-[0.35em] text-slate-500">
              <div />
              {files.map((file) => (
                <div key={file}>{file}</div>
              ))}
              <div />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <button className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:bg-white/5">
            Resign
          </button>
          <button className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:bg-white/10">
            Offer Draw
          </button>
          <button className="rounded-3xl bg-gradient-to-r from-[#d4af37] to-[#e5ce75] px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-glow transition hover:from-[#f0d76d] hover:to-[#f8e190]">
            New Game
          </button>
        </div>
      </div>
    </motion.section>
  )
}
