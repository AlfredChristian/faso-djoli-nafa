import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import Input from '../components/Input'
import Button from '../components/Button'
import { loginHospital } from '../services/api'

function HospitalLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await loginHospital(email, password)
    setLoading(false)
    if (res.success) {
      navigate("/hopital")
    } else {
      setError(res.error || "Connexion impossible")
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 pt-2 pb-6">
      <TopBar />
      <PageHeader icon={Building2} title="Connexion hôpital" subtitle="Accède à ton espace pour publier un besoin." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@hopital.bf" required />
        <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />

        {error && <p className="text-blood text-xs font-medium">{error}</p>}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Pas encore de compte ? <Link to="/hopital/inscription" className="text-blood font-semibold">Inscrire mon hôpital</Link>
      </p>
    </div>
  )
}

export default HospitalLogin