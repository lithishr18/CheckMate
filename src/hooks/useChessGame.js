import { useState, useCallback, useEffect } from 'react'
import { Chess } from 'chess.js'

export default function useChessGame({ socket, playerColor } = {}) {
  const [game] = useState(() => new Chess())
  const isOnline = Boolean(socket && playerColor)

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

  const syncFromServer = useCallback((data) => {
    game.load(data.fen)
    setFen(data.fen)
    setTurn(data.turn)
    setHistory(data.history || [])
    setSelectedSquare(null)
    setLegalDestinations([])

    if (data.isCheckmate) {
      setStatus({ type: 'checkmate', winner: data.turn === 'w' ? 'b' : 'w' })
    } else if (data.isStalemate) {
      setStatus({ type: 'stalemate' })
    } else if (data.isDraw) {
      setStatus({ type: 'draw' })
    } else if (data.isCheck) {
      setStatus({ type: 'check' })
    } else {
      setStatus({ type: 'playing' })
    }
  }, [game])

  useEffect(() => {
    if (!socket) return

    const handleMoveMade = (data) => {
      game.load(data.fen)
      setFen(data.fen)
      setTurn(data.turn)
      setHistory(data.history || [])
      if (data.move) {
        setLastMove({ from: data.move.from, to: data.move.to })
      }
      setSelectedSquare(null)
      setLegalDestinations([])

      if (data.isCheckmate) {
        setStatus({ type: 'checkmate', winner: data.turn === 'w' ? 'b' : 'w' })
      } else if (data.isStalemate) {
        setStatus({ type: 'stalemate' })
      } else if (data.isDraw) {
        setStatus({ type: 'draw' })
      } else if (data.isCheck) {
        setStatus({ type: 'check' })
      } else {
        setStatus({ type: 'playing' })
      }
    }

    const handleGameSync = (data) => {
      syncFromServer(data)
    }

    const handleGameEnded = (data) => {
      if (data.reason === 'resign') {
        setStatus({ type: 'checkmate', winner: data.winner })
        setSelectedSquare(null)
        setLegalDestinations([])
      }
    }

    socket.on('move-made', handleMoveMade)
    socket.on('game-sync', handleGameSync)
    socket.on('game-ended', handleGameEnded)

    return () => {
      socket.off('move-made', handleMoveMade)
      socket.off('game-sync', handleGameSync)
      socket.off('game-ended', handleGameEnded)
    }
  }, [socket, game, syncFromServer])

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
      if (isOnline) {
        socket.emit('make-move', { from: selectedSquare, to: sq })
        setSelectedSquare(null)
        setLegalDestinations([])
      } else {
        const move = game.move({ from: selectedSquare, to: sq, promotion: 'q' })
        if (move) {
          setLastMove({ from: move.from, to: move.to })
          setSelectedSquare(null)
          setLegalDestinations([])
          updateGameState()
        }
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
  }, [game, selectedSquare, legalDestinations, updateGameState, status, isOnline, socket])

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

    if (isOnline) {
      socket.emit('resign')
    } else {
      setStatus({ type: 'checkmate', winner: game.turn() === 'w' ? 'b' : 'w' })
    }
  }, [game, status, isOnline, socket])

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
