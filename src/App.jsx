import Sidebar from './components/Sidebar.jsx'
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
    <div className="relative min-h-screen overflow-hidden bg-[#05050a] text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_25%)]" />
      <div className="relative mx-auto max-w-[1700px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
          <Sidebar />

          <div className="space-y-6">
            <Topbar roomId={roomId} />
            <ChessBoard />
          </div>

          <div className="space-y-6">
            <PlayerCard {...whitePlayer} />
            <PlayerCard {...blackPlayer} />
            <GameStatus turn="White" status="Live Match" room={roomId} />
            <MoveHistory />
            <RecentGames />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
