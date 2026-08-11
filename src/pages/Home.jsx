import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'

function Home() {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-sm flex flex-col items-center text-center mt-10">
        <Header />
        <h1 className="text-2xl font-bold text-ink mt-8 mb-2">Chaque don compte</h1>
        <p className="text-gray-500 mb-8">
          Connecte-toi aux hôpitaux qui ont besoin de toi, exactement quand ils en ont besoin.
        </p>
        <Link to="/inscription" className="w-full">
          <Button variant="primary" className="w-full">Je deviens donneur</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home