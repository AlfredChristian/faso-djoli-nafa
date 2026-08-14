import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Input from '../components/Input'
import Button from '../components/Button'
import { adminLogin, setAdminLoggedIn } from '../services/api'

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await adminLogin(email, password)
    setLoading(false)
    if (res.success) {
      setAdminLoggedIn(true)
      navigate("/admin")
    } else {
      setError(res.error || "Connexion impossible")
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-ink text-white flex items-center justify-center mb-3">
            <ShieldCheck size={26} />
          </div>
          <h1 className="text-xl font-bold text-ink">Espace administration</h1>
          <p className="text-gray-500 text-sm mt-1">Réservé à l'équipe Faso Djoli Nafa.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@fasodjolinafa.bf"
            required
          />
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && <p className="text-blood text-xs font-medium">{error}</p>}

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin