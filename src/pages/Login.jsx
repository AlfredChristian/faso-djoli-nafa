import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
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
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <Header />
        <h1 className="text-2xl font-bold text-ink mt-6 mb-1">Connexion</h1>
        <p className="text-gray-500 text-sm mb-6">Entre ton numéro pour recevoir un code de connexion.</p>

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
    </div>
  )
}

export default Login