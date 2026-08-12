import { useState } from 'react'
import { Bell } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
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
      <div className="max-w-md mx-auto px-6 pt-24 flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-hope/10 flex items-center justify-center text-hope text-3xl">✓</div>
        <h1 className="text-xl font-bold text-ink">Besoin publié</h1>
        <p className="text-gray-500 max-w-xs">
          Les donneurs {form.groupe} compatibles à {form.lieu} viennent d'être alertés.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 md:px-8 pt-2 pb-6">
      <TopBar />
      <PageHeader icon={Bell} title="Publier un besoin" subtitle="Les donneurs compatibles seront alertés immédiatement." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:max-w-lg">
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
        <div className="md:grid md:grid-cols-2 md:gap-4 flex flex-col gap-4">
          <Input
            label="Quantité (poches)"
            type="number"
            name="quantite"
            value={form.quantite}
            onChange={updateField("quantite")}
            placeholder="Ex: 5"
            required
          />
          <Input
            label="Ville / quartier"
            name="lieu"
            value={form.lieu}
            onChange={updateField("lieu")}
            placeholder="Ex: Ouagadougou"
            required
          />
        </div>
        <UrgencyPicker
          value={form.urgence}
          onChange={(u) => setForm({ ...form, urgence: u })}
        />

        <Button type="submit" variant="primary" className="mt-2 md:w-fit" disabled={loading}>
          {loading ? "Envoi..." : "Publier le besoin"}
        </Button>
      </form>
    </div>
  )
}

export default HospitalNeed