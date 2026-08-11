import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/besoins", label: "Besoins" },
  { to: "/inscription", label: "Donneur" },
  { to: "/hopital", label: "Hôpital" },
  { to: "/profil", label: "Profil" },
  { to: "/connexion", label: "Connexion" },
]

function Header() {
  const location = useLocation()

  return (
    <header className="flex flex-col gap-3 py-4">
      <Link to="/">
        <img src={logo} alt="Faso Djoli Nafa" className="h-9 w-auto" />
      </Link>
      <nav className="flex gap-2 overflow-x-auto pb-1">
        {LINKS.map((link) => {
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition
                ${isActive ? "bg-blood text-white" : "bg-gray-100 text-gray-500"}`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

export default Header