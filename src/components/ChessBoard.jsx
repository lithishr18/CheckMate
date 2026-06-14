import { motion } from 'framer-motion'

const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]

export default function ChessBoard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <span className="section-label">Board</span>
        <h2 className="font-display text-4xl font-medium leading-tight text-espresso-500">
          Grandmaster Arena
        </h2>
      </div>

      <div className="rounded-sm border border-cream-300 bg-cream-50 p-5 shadow-frame">
        <div className="overflow-hidden rounded-[2px]">
          <div className="grid">
            <div className="grid grid-cols-[28px_repeat(8,minmax(0,1fr))_28px] items-center">
              <div />
              {files.map((f) => (
                <div key={f} className="pb-2 text-center font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-espresso-300">
                  {f}
                </div>
              ))}
              <div />
            </div>
            {ranks.map((rank, rowIndex) => (
              <div key={rank} className="grid grid-cols-[28px_repeat(8,minmax(0,1fr))_28px] items-center">
                <div className="pr-2 text-right font-sans text-[11px] font-medium text-espresso-300">
                  {rank}
                </div>
                {files.map((file, fileIndex) => {
                  const dark = (rowIndex + fileIndex) % 2 === 0
                  return (
                    <div
                      key={`${file}${rank}`}
                      className={`aspect-square transition-colors ${
                        dark ? 'bg-board-light' : 'bg-board-dark'
                      }`}
                    />
                  )
                })}
                <div className="pl-2 text-left font-sans text-[11px] font-medium text-espresso-300">
                  {rank}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[28px_repeat(8,minmax(0,1fr))_28px] items-center">
              <div />
              {files.map((f) => (
                <div key={f} className="pt-2 text-center font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-espresso-300">
                  {f}
                </div>
              ))}
              <div />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <button
          type="button"
          className="group inline-flex items-center gap-2 border-b border-espresso-200 pb-0.5 font-sans text-sm font-medium text-espresso-500 transition hover:border-espresso-500"
        >
          <span className="inline-block h-0.5 w-4 bg-espresso-300 transition group-hover:w-6 group-hover:bg-espresso-500" />
          Resign
        </button>
        <button
          type="button"
          className="group inline-flex items-center gap-2 border-b border-espresso-200 pb-0.5 font-sans text-sm font-medium text-espresso-400 transition hover:border-espresso-500 hover:text-espresso-500"
        >
          Offer Draw
        </button>
        <button
          type="button"
          className="ml-auto inline-flex items-center gap-2 rounded-none border border-gold-300 bg-gold-50 px-6 py-2.5 font-sans text-sm font-medium tracking-wide text-gold-500 transition hover:bg-gold-100 hover:text-espresso-500"
        >
          New Game
          <span className="text-espresso-300">→</span>
        </button>
      </div>
    </motion.section>
  )
}
