import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Home() {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full text-center">
        <h1 className="text-3xl font-extrabold text-ink leading-tight mb-2">
          Chaque don <span className="text-blood">compte</span>
        </h1>
        <p className="text-gray-500 mb-10">
          Les hôpitaux publient leurs besoins, les donneurs compatibles sont alertés en quelques secondes.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/inscription"
            className="py-4 rounded-xl font-semibold bg-blood text-white active:scale-95 transition"
          >
            Je suis donneur
          </Link>
          <Link
            to="/hopital"
            className="py-4 rounded-xl font-semibold bg-white text-blood border-2 border-blood active:scale-95 transition"
          >
            Je suis un hôpital
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home