import logo from '../assets/logo.png'

function Header() {
  return (
    <header className="flex items-center gap-2 py-4">
      <img src={logo} alt="Faso Djoli Nafa" className="h-9 w-auto" />
    </header>
  )
}

export default Header