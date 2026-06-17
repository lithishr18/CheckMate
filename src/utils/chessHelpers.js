export const PIECE_SYMBOLS = {
  w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
  b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
}

export function getPieceSymbol(piece) {
  if (!piece) return null
  return PIECE_SYMBOLS[piece.color]?.[piece.type] ?? null
}

export function isLightSquare(file, rank) {
  const f = file.charCodeAt(0) - 97
  const r = rank - 1
  return (f + r) % 2 === 0
}

export function formatGameStatus(status) {
  switch (status.type) {
    case 'playing':
      return 'In Progress'
    case 'check':
      return 'Check!'
    case 'checkmate':
      return `Checkmate — ${status.winner === 'w' ? 'White' : 'Black'} wins`
    case 'stalemate':
      return 'Stalemate — Draw'
    case 'draw':
      return 'Draw'
    default:
      return 'In Progress'
  }
}

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1]
