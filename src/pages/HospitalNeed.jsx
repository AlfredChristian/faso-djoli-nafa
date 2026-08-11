import { useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input'
import BloodGroupPicker from '../components/BloodGroupPicker'
import UrgencyPicker from '../components/UrgencyPicker'
import Button from '../components/Button'
import { publishNeed } from '../services/api'

function HospitalNeed() {
  const [form, setForm] = useState({
    hopital: "",
    groupe: "",
    quantite: "",
    urgence: "",
    lieu: "",
  })
  const [publie, setPublie] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await publishNeed(form)
    setLoading(false)
    setPublie(true)
  }

  if (publie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-hope/10 flex items-center justify-center text-hope text-3xl">✓</div>
        <h1 className="text-xl font-bold text-ink">Besoin publié</h1>
        <p className="text-gray-500 max-w-xs">
          Les donneurs {form.groupe} compatibles à {form.lieu} viennent d'être alertés.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <Header />
        <h1 className="text-2xl font-bold text-ink mt-6 mb-1">Publier un besoin</h1>
        <p className="text-gray-500 text-sm mb-6">Les donneurs compatibles seront alertés immédiatement.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nom de l'hôpital / centre"
            name="hopital"
            value={form.hopital}
            onChange={updateField("hopital")}
            placeholder="Ex: CHU Yalgado Ouédraogo"
            required
          />
          <BloodGroupPicker
            value={form.groupe}
            onChange={(g) => setForm({ ...form, groupe: g })}
          />
          <Input
            label="Quantité (poches)"
            type="number"
            name="quantite"
            value={form.quantite}
            onChange={updateField("quantite")}
            placeholder="Ex: 5"
            required
          />
          <UrgencyPicker
            value={form.urgence}
            onChange={(u) => setForm({ ...form, urgence: u })}
          />
          <Input
            label="Ville / quartier"
            name="lieu"
            value={form.lieu}
            onChange={updateField("lieu")}
            placeholder="Ex: Ouagadougou"
            required
          />

          <Button type="submit" variant="primary" className="mt-2" disabled={loading}>
            {loading ? "Envoi..." : "Publier le besoin"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default HospitalNeed