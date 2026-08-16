import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import Input from '../components/Input'
import Button from '../components/Button'
import { registerHospital } from '../services/api'

function HospitalRegister() {
  const [form, setForm] = useState({ nom: "", ville: "", telephone: "", email: "", password: "" })
  const [envoye, setEnvoye] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await registerHospital(form)
    setLoading(false)
    if (res.success) {
      setEnvoye(true)
    } else {
      setError("Impossible de créer le compte. Vérifie les informations saisies.")
    }
  }

  if (envoye) {
    return (
      <div className="max-w-md mx-auto px-6 pt-2 pb-6 flex flex-col items-center justify-center min-h-[70vh] text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-hope/10 flex items-center justify-center text-hope text-3xl">✓</div>
        <h1 className="text-xl font-bold text-ink">Demande envoyée</h1>
        <p className="text-gray-500 max-w-xs">
          Ton compte hôpital sera activé après validation par notre équipe. Tu recevras un accès dès que c'est fait.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-6 pt-2 pb-6">
      <TopBar />
      <PageHeader icon={Building2} title="Inscrire mon hôpital" subtitle="Ton compte sera validé par l'équipe avant activation." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Nom de l'hôpital / centre" value={form.nom} onChange={updateField("nom")} placeholder="Ex: CHU Yalgado Ouédraogo" required />
        <Input label="Ville / quartier" value={form.ville} onChange={updateField("ville")} placeholder="Ex: Ouagadougou" required />
        <Input label="Téléphone" type="tel" value={form.telephone} onChange={updateField("telephone")} placeholder="Ex: 25 30 12 34" />
        <Input label="Email" type="email" value={form.email} onChange={updateField("email")} placeholder="contact@hopital.bf" required />
        <Input label="Mot de passe" type="password" value={form.password} onChange={updateField("password")} placeholder="••••••••" required />

        {error && <p className="text-blood text-xs font-medium">{error}</p>}

        <Button type="submit" variant="primary" className="mt-2" disabled={loading}>
          {loading ? "Envoi..." : "Créer le compte"}
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Déjà un compte ? <Link to="/hopital/connexion" className="text-blood font-semibold">Se connecter</Link>
      </p>
    </div>
  )
}

export default HospitalRegister