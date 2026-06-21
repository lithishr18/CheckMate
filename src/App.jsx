import { useState, useEffect } from 'react'
import Topbar from './components/Topbar.jsx'
import ChessBoard from './components/ChessBoard.jsx'
import PlayerCard from './components/PlayerCard.jsx'
import MoveHistory from './components/MoveHistory.jsx'
import GameStatus from './components/GameStatus.jsx'
import RecentGames from './components/RecentGames.jsx'
import Lobby from './components/Lobby.jsx'
import Notification from './components/Notification.jsx'
import useChessGame from './hooks/useChessGame.js'
import useSocket from './hooks/useSocket.js'
import useNotifications from './hooks/useNotifications.js'

const whitePlayer = {
  username: 'SashaKnight',
  rating: 2480,
  timer: '09:32',
}

const blackPlayer = {
  username: 'NovaBlade',
  rating: 2442,
  timer: '08:50',
}

function App() {
  const [roomId] = useState('HC7Q9B')
  const { connected, room, error, opponentConnected, playerColor, createRoom, joinRoom, leaveRoom, socket } =
    useSocket()
  const { notifications, addNotification, removeNotification } = useNotifications()

  const { game, fen, turn, history, status, selectedSquare, legalDestinations, lastMove, selectSquare, resetGame, resign } =
    useChessGame({ socket, playerColor })

  const inGame = room && room.players?.length >= 2

  useEffect(() => {
    if (!socket) return

    const onPlayerJoined = () => {
      addNotification({ type: 'success', message: 'Opponent joined! Match started.' })
    }

    const onGameEnded = (data) => {
      const winnerName = data.winner === 'w' ? 'White' : 'Black'
      const reason = data.reason === 'resign' ? ' by resignation' : ''
      addNotification({ type: 'info', message: `Game over — ${winnerName} wins${reason}!` })
    }

    const onOpponentDisconnected = () => {
      addNotification({ type: 'error', message: 'Opponent disconnected' })
    }

    const onRoomJoined = () => {
      addNotification({ type: 'success', message: 'Joined room! Match started.' })
    }

    const onError = (data) => {
      addNotification({ type: 'error', message: data.message })
    }

    socket.on('player-joined', onPlayerJoined)
    socket.on('game-ended', onGameEnded)
    socket.on('opponent-disconnected', onOpponentDisconnected)
    socket.on('room-joined', onRoomJoined)
    socket.on('error', onError)

    return () => {
      socket.off('player-joined', onPlayerJoined)
      socket.off('game-ended', onGameEnded)
      socket.off('opponent-disconnected', onOpponentDisconnected)
      socket.off('room-joined', onRoomJoined)
      socket.off('error', onError)
    }
  }, [socket, addNotification])

  useEffect(() => {
    if (!socket) return
    let wasDisconnected = false

    const onDisconnect = () => {
      wasDisconnected = true
    }

    const onReconnect = () => {
      if (wasDisconnected) {
        addNotification({ type: 'info', message: 'Reconnected to server' })
        wasDisconnected = false
      }
    }

    socket.on('disconnect', onDisconnect)
    socket.on('connect', onReconnect)

    return () => {
      socket.off('disconnect', onDisconnect)
      socket.off('connect', onReconnect)
    }
  }, [socket, addNotification])

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-500">
      <Topbar
        roomId={room?.code || roomId}
        connected={connected}
        room={room}
        onLeaveRoom={leaveRoom}
      />

      <Notification notifications={notifications} onRemove={removeNotification} />

      <main className="mx-auto max-w-[1600px] px-4 pb-16 pt-6 sm:px-8 sm:pt-10">
        {!inGame ? (
          <Lobby
            connected={connected}
            room={room}
            onCreateRoom={createRoom}
            onJoinRoom={joinRoom}
            onLeaveRoom={leaveRoom}
            error={error}
            addNotification={addNotification}
          />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <ChessBoard
              game={game}
              fen={fen}
              turn={turn}
              history={history}
              status={status}
              selectedSquare={selectedSquare}
              legalDestinations={legalDestinations}
              lastMove={lastMove}
              onSquareClick={selectSquare}
              onReset={resetGame}
              onResign={resign}
              onDraw={() => {}}
            />

            <div className="space-y-8 sm:space-y-10">
              <PlayerCard
                color="White"
                {...whitePlayer}
                isActiveTurn={turn === 'w'}
                opponentConnected={playerColor === 'b' ? opponentConnected : null}
                isCurrentPlayer={playerColor === 'w'}
              />
              <PlayerCard
                color="Black"
                {...blackPlayer}
                isActiveTurn={turn === 'b'}
                opponentConnected={playerColor === 'w' ? opponentConnected : null}
                isCurrentPlayer={playerColor === 'b'}
              />
              <GameStatus
                status={status}
                turn={turn}
                room={room?.code || roomId}
                opponentConnected={opponentConnected}
                playerColor={playerColor}
                roomPlayers={room?.players?.length ?? 0}
              />
              <MoveHistory history={history} />
              <RecentGames />
            </div>
          </div>
        )}
      </main>

      {/* Mobile room code indicator when in game */}
      {inGame && (
        <div className="fixed bottom-0 inset-x-0 border-t border-cream-200 bg-cream-50/90 backdrop-blur-sm sm:hidden">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2 font-sans text-xs text-espresso-400">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  connected ? 'bg-emerald-400' : 'bg-red-400'
                }`}
              />
              {connected ? 'Connected' : 'Disconnected'}
            </div>
            <button
              type="button"
              onClick={() => {
                if (navigator?.clipboard) {
                  navigator.clipboard.writeText(room?.code || roomId)
                  addNotification({ type: 'success', message: 'Room code copied!' })
                }
              }}
              className="font-mono text-xs tracking-widest text-gold-400"
            >
              {room?.code || roomId}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
