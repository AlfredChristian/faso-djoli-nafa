import { useState } from 'react'
import Input from '../components/Input'
import BloodGroupPicker from '../components/BloodGroupPicker'
import Button from '../components/Button'
import Header from '../components/Header'

function DonorRegister() {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    groupe: "",
    ville: "",
    dernierDon: "",
  })
  const [envoye, setEnvoye] = useState(false)

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulaire envoyé :", form)
    setEnvoye(true)
  }

  if (envoye) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-hope/10 flex items-center justify-center text-hope text-3xl">✓</div>
        <h1 className="text-xl font-bold text-ink">Merci {form.nom.split(" ")[0]} !</h1>
        <p className="text-gray-500 max-w-xs">Tu es inscrit comme donneur {form.groupe}. On t'alertera dès qu'on aura besoin de toi.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <Header />
        <h1 className="text-2xl font-bold text-ink mt-6 mb-1">Deviens donneur</h1>
        <p className="text-gray-500 text-sm mb-6">Chaque don compte. Deux minutes suffisent.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nom complet"
            name="nom"
            value={form.nom}
            onChange={updateField("nom")}
            placeholder="Ex: Awa Ouédraogo"
            required
          />
          <Input
            label="Téléphone"
            type="tel"
            name="telephone"
            value={form.telephone}
            onChange={updateField("telephone")}
            placeholder="Ex: 70 12 34 56"
            required
          />
          <BloodGroupPicker
            value={form.groupe}
            onChange={(g) => setForm({ ...form, groupe: g })}
          />
          <Input
            label="Ville / quartier"
            name="ville"
            value={form.ville}
            onChange={updateField("ville")}
            placeholder="Ex: Ouagadougou, Tanghin"
            required
          />
          <Input
            label="Date de ton dernier don (si tu en as fait un)"
            type="date"
            name="dernierDon"
            value={form.dernierDon}
            onChange={updateField("dernierDon")}
          />

          <Button type="submit" variant="primary" className="mt-2">
            Je m'inscris
          </Button>
        </form>
      </div>
    </div>
  )
}

export default DonorRegister