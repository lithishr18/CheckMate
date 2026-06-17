import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FILES, RANKS, getPieceSymbol, isLightSquare } from '../utils/chessHelpers.js'

export default function ChessBoard({
  turn,
  status,
  selectedSquare,
  legalDestinations,
  lastMove,
  onSquareClick,
  onReset,
  onResign,
  onDraw,
  game,
}) {
  const squares = useMemo(() => {
    const kingSq = findKingSquare(game, turn)

    return RANKS.flatMap((rank) =>
      FILES.map((file) => {
        const sq = `${file}${rank}`
        const piece = game.get(sq)
        const light = isLightSquare(file, rank)
        const isSelected = sq === selectedSquare
        const isLegalTarget = legalDestinations.includes(sq)
        const isLastFrom = lastMove?.from === sq
        const isLastTo = lastMove?.to === sq
        const isKingInCheck = status.type === 'check' && sq === kingSq

        return { sq, piece, light, isSelected, isLegalTarget, isLastFrom, isLastTo, isKingInCheck }
      })
    )
  }, [game, selectedSquare, legalDestinations, lastMove, turn, status])

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
              {FILES.map((f) => (
                <div
                  key={f}
                  className="pb-2 text-center font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-espresso-300"
                >
                  {f}
                </div>
              ))}
              <div />
            </div>
            {RANKS.map((rank) => (
              <div key={rank} className="grid grid-cols-[28px_repeat(8,minmax(0,1fr))_28px] items-center">
                <div className="pr-2 text-right font-sans text-[11px] font-medium text-espresso-300">
                  {rank}
                </div>
                {FILES.map((file, fileIndex) => {
                  const entry = squares[RANKS.indexOf(rank) * 8 + fileIndex]
                  return <Square key={`${file}${rank}`} entry={entry} onClick={() => onSquareClick(entry.sq)} />
                })}
                <div className="pl-2 text-left font-sans text-[11px] font-medium text-espresso-300">
                  {rank}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[28px_repeat(8,minmax(0,1fr))_28px] items-center">
              <div />
              {FILES.map((f) => (
                <div
                  key={f}
                  className="pt-2 text-center font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-espresso-300"
                >
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
          onClick={onResign}
          className="group inline-flex items-center gap-2 border-b border-espresso-200 pb-0.5 font-sans text-sm font-medium text-espresso-500 transition hover:border-espresso-500"
        >
          <span className="inline-block h-0.5 w-4 bg-espresso-300 transition group-hover:w-6 group-hover:bg-espresso-500" />
          Resign
        </button>
        <button
          type="button"
          onClick={onDraw}
          className="group inline-flex items-center gap-2 border-b border-espresso-200 pb-0.5 font-sans text-sm font-medium text-espresso-400 transition hover:border-espresso-500 hover:text-espresso-500"
        >
          Offer Draw
        </button>
        <button
          type="button"
          onClick={onReset}
          className="ml-auto inline-flex items-center gap-2 rounded-none border border-gold-300 bg-gold-50 px-6 py-2.5 font-sans text-sm font-medium tracking-wide text-gold-500 transition hover:bg-gold-100 hover:text-espresso-500"
        >
          New Game
          <span className="text-espresso-300">→</span>
        </button>
      </div>
    </motion.section>
  )
}

function Square({ entry, onClick }) {
  const { sq, piece, light, isSelected, isLegalTarget, isLastFrom, isLastTo, isKingInCheck } = entry
  const symbol = getPieceSymbol(piece)

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative aspect-square flex items-center justify-center transition-colors outline-none
        ${light ? 'bg-board-light' : 'bg-board-dark'}
        ${isSelected ? 'ring-2 ring-inset ring-gold-400 z-10' : ''}
        ${isLastFrom || isLastTo ? 'brightness-110' : ''}
        ${isKingInCheck ? 'ring-2 ring-inset ring-red-500' : ''}
      `}
    >
      {isLegalTarget && !piece && (
        <span className="absolute h-3 w-3 rounded-full bg-gold-400/50" />
      )}
      {isLegalTarget && piece && (
        <span className="absolute inset-0 rounded-none border-2 border-gold-400/60" />
      )}
      <AnimatePresence>
        {symbol && (
          <motion.span
            key={`${sq}-${piece?.color}${piece?.type}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`relative z-20 cursor-grab select-none text-4xl leading-none
              ${piece?.color === 'w' ? 'text-cream-50 drop-shadow-[0_1px_2px_rgba(44,24,16,0.4)]' : ''}
              ${piece?.color === 'b' ? 'text-espresso-600' : ''}
            `}
          >
            {symbol}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function findKingSquare(game, turn) {
  for (const f of FILES) {
    for (let r = 1; r <= 8; r++) {
      const sq = `${f}${r}`
      const p = game.get(sq)
      if (p && p.type === 'k' && p.color === turn) return sq
    }
  }
  return null
}
