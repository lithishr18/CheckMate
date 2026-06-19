import { useState } from 'react'
import Topbar from './components/Topbar.jsx'
import ChessBoard from './components/ChessBoard.jsx'
import PlayerCard from './components/PlayerCard.jsx'
import MoveHistory from './components/MoveHistory.jsx'
import GameStatus from './components/GameStatus.jsx'
import RecentGames from './components/RecentGames.jsx'
import useChessGame from './hooks/useChessGame.js'
import useSocket from './hooks/useSocket.js'

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
  const {
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
  } = useChessGame()

  const { connected, room, error, createRoom, joinRoom, leaveRoom } = useSocket()

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-500">
      <Topbar
        roomId={room?.code || roomId}
        connected={connected}
        room={room}
        onCreateRoom={createRoom}
        onJoinRoom={joinRoom}
        onLeaveRoom={leaveRoom}
        error={error}
      />

      <main className="mx-auto max-w-[1600px] px-8 pb-16 pt-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
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

          <div className="space-y-10">
            <PlayerCard
              color="White"
              {...whitePlayer}
              isActiveTurn={turn === 'w'}
            />
            <PlayerCard
              color="Black"
              {...blackPlayer}
              isActiveTurn={turn === 'b'}
            />
            <GameStatus status={status} turn={turn} room={room?.code || roomId} />
            <MoveHistory history={history} />
            <RecentGames />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
