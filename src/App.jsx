import Topbar from './components/Topbar.jsx'
import ChessBoard from './components/ChessBoard.jsx'
import PlayerCard from './components/PlayerCard.jsx'
import MoveHistory from './components/MoveHistory.jsx'
import GameStatus from './components/GameStatus.jsx'
import RecentGames from './components/RecentGames.jsx'

const whitePlayer = {
  color: 'White',
  username: 'SashaKnight',
  rating: 2480,
  timer: '09:32',
  status: 'Thinking',
}

const blackPlayer = {
  color: 'Black',
  username: 'NovaBlade',
  rating: 2442,
  timer: '08:50',
  status: 'Waiting',
}

function App() {
  const roomId = 'HC7Q9B'

  return (
    <div className="min-h-screen bg-cream-100 text-espresso-500">
      <Topbar roomId={roomId} />

      <main className="mx-auto max-w-[1600px] px-8 pb-16 pt-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ChessBoard />

          <div className="space-y-10">
            <PlayerCard {...whitePlayer} />
            <PlayerCard {...blackPlayer} />
            <GameStatus turn="White" status="Live Match" room={roomId} />
            <MoveHistory />
            <RecentGames />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
