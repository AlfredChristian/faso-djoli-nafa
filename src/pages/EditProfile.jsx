import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, UserCog } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import Input from '../components/Input'
import Button from '../components/Button'
import { getMyProfile, updateProfile } from '../services/api'

function EditProfile() {
  const [form, setForm] = useState({ nom: "", telephone: "", ville: "" })
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getMyProfile().then((p) => {
      setForm({ nom: p.nom, telephone: p.telephone || "", ville: p.ville })
      setReady(true)
    })
  }, [])

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await updateProfile(form)
    setLoading(false)
    navigate("/profil")
  }

  if (!ready) {
    return (
      <div className="max-w-md mx-auto px-6 pt-2 pb-6">
        <TopBar />
        <p className="text-gray-400 text-sm mt-6">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="max-w-md md:max-w-lg mx-auto px-6 md:px-8 pt-2 md:pt-10 pb-6">
      <TopBar />
      <Link to="/profil" className="inline-flex items-center gap-1.5 text-sm text-gray-500 mb-4 mt-2 md:mt-0">
        <ArrowLeft size={15} /> Retour au profil
      </Link>
      <PageHeader icon={UserCog} title="Modifier mes informations" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nom complet"
          value={form.nom}
          onChange={updateField("nom")}
          required
        />
        <Input
          label="Téléphone"
          type="tel"
          value={form.telephone}
          onChange={updateField("telephone")}
          required
        />
        <Input
          label="Ville / quartier"
          value={form.ville}
          onChange={updateField("ville")}
          required
        />
        <Button type="submit" variant="primary" className="mt-2" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </div>
  )
}

export default EditProfile