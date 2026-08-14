import { Link, useLocation } from 'react-router-dom'
import { Home, List, User, LogIn } from 'lucide-react'
import logo from '../assets/logo.png'

const LINKS = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/besoins", label: "Besoins", icon: List },
  { to: "/profil", label: "Profil", icon: User },
  { to: "/connexion", label: "Connexion", icon: LogIn },
]

function SideNav() {
  const location = useLocation()

  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 border-r border-gray-100 min-h-screen px-6 py-8 sticky top-0">
      <Link to="/">
        <img src={logo} alt="Faso Djoli Nafa" className="h-9 w-auto mb-10" />
      </Link>
      <nav className="flex flex-col gap-1">
        {LINKS.map((link) => {
          const Icon = link.icon
          const active = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition
                ${active ? "bg-blood text-white" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default SideNav