import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'

export default function useChessGame() {
  const [game] = useState(() => new Chess())

  const [fen, setFen] = useState(() => game.fen())
  const [turn, setTurn] = useState(() => game.turn())
  const [history, setHistory] = useState([])
  const [status, setStatus] = useState({ type: 'playing' })
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [legalDestinations, setLegalDestinations] = useState([])
  const [lastMove, setLastMove] = useState(null)

  const updateGameState = useCallback(() => {
    setFen(game.fen())
    setTurn(game.turn())
    setHistory(game.history({ verbose: true }))

    if (game.isCheckmate()) {
      setStatus({ type: 'checkmate', winner: game.turn() === 'w' ? 'b' : 'w' })
    } else if (game.isStalemate()) {
      setStatus({ type: 'stalemate' })
    } else if (game.isDraw()) {
      setStatus({ type: 'draw' })
    } else if (game.isCheck()) {
      setStatus({ type: 'check' })
    } else {
      setStatus({ type: 'playing' })
    }
  }, [game])

  const selectSquare = useCallback((sq) => {
    if (game.isGameOver()) return
    if (status.type === 'checkmate' || status.type === 'stalemate' || status.type === 'draw') return

    if (selectedSquare === sq) {
      setSelectedSquare(null)
      setLegalDestinations([])
      return
    }

    const piece = game.get(sq)

    if (selectedSquare && legalDestinations.includes(sq)) {
      const move = game.move({
        from: selectedSquare,
        to: sq,
        promotion: 'q',
      })
      if (move) {
        setLastMove({ from: move.from, to: move.to })
        setSelectedSquare(null)
        setLegalDestinations([])
        updateGameState()
      }
      return
    }

    if (piece && piece.color === game.turn()) {
      setSelectedSquare(sq)
      const moves = game.moves({ square: sq, verbose: true })
      setLegalDestinations(moves.map((m) => m.to))
      return
    }

    setSelectedSquare(null)
    setLegalDestinations([])
  }, [game, selectedSquare, legalDestinations, updateGameState, status])

  const resetGame = useCallback(() => {
    game.reset()
    setSelectedSquare(null)
    setLegalDestinations([])
    setLastMove(null)
    updateGameState()
  }, [game, updateGameState])

  const resign = useCallback(() => {
    if (game.isGameOver()) return
    if (status.type === 'checkmate' || status.type === 'stalemate' || status.type === 'draw') return
    setStatus({ type: 'checkmate', winner: game.turn() === 'w' ? 'b' : 'w' })
  }, [game, status])

  return {
    game,
    fen,
    turn,
    history,
    status,
    selectedSquare,
    legalDestinations,
    lastMove,
    selectSquare,
    resetGame,
    resign,
  }
}
