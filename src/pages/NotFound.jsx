import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Button from '../components/Button'

function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 pt-2 pb-6 text-center">
      <TopBar />
      <p className="text-6xl mt-10 mb-4">🩸</p>
      <h1 className="text-xl font-bold text-ink mb-2">Page introuvable</h1>
      <p className="text-gray-500 mb-8">Cette page n'existe pas ou plus.</p>
      <Link to="/">
        <Button variant="primary">Retour à l'accueil</Button>
      </Link>
    </div>
  )
}

export default NotFound