import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function TopBar() {
  return (
    <Link to="/" className="md:hidden inline-block pt-5 pb-2">
      <img src={logo} alt="Faso Djoli Nafa" className="h-8 w-auto" />
    </Link>
  )
}

export default TopBar