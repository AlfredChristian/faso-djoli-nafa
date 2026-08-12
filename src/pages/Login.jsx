import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import Input from '../components/Input'
import Button from '../components/Button'

function Login() {
  const [telephone, setTelephone] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setLoading(false)
    navigate("/")
  }

  return (
    <div className="max-w-md mx-auto md:mt-10 px-6 pt-2 pb-6">
      <TopBar />
      <PageHeader icon={LogIn} title="Connexion" subtitle="Entre ton numéro pour recevoir un code de connexion." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Téléphone"
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Ex: 70 12 34 56"
          required
        />
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Envoi..." : "Recevoir le code"}
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Pas encore inscrit ? <Link to="/inscription" className="text-blood font-semibold">Devenir donneur</Link>
      </p>
    </div>
  )
}

export default Login