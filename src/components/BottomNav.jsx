import { Link, useLocation } from 'react-router-dom'
import { Home, List, User, LogIn } from 'lucide-react'

const TABS = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/besoins", label: "Besoins", icon: List },
  { to: "/profil", label: "Profil", icon: User },
  { to: "/connexion", label: "Connexion", icon: LogIn },
]

function BottomNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-10">
      <div className="max-w-md mx-auto flex justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const active = location.pathname === tab.to
          return (
            <Link key={tab.to} to={tab.to} className="flex flex-col items-center gap-1 px-3 py-1">
              <Icon size={20} color={active ? "#C0392B" : "#9CA3AF"} strokeWidth={1.8} />
              <span className={`text-[11px] font-medium ${active ? "text-blood" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav