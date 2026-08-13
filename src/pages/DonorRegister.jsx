import { useState } from 'react'
import { Droplet } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import Input from '../components/Input'
import BloodGroupPicker from '../components/BloodGroupPicker'
import Button from '../components/Button'
import { registerDonor } from '../services/api'

function DonorRegister() {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    groupe: "",
    ville: "",
    dernierDon: "",
  })
  const [consent, setConsent] = useState(false)
  const [envoye, setEnvoye] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!consent) return
    setLoading(true)
    await registerDonor({ ...form, consentAt: new Date().toISOString() })
    setLoading(false)
    setEnvoye(true)
  }

  if (envoye) {
    return (
      <div className="max-w-md mx-auto px-6 pt-24 flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-hope/10 flex items-center justify-center text-hope text-3xl">✓</div>
        <h1 className="text-xl font-bold text-ink">Merci {form.nom.split(" ")[0]} !</h1>
        <p className="text-gray-500 max-w-xs">Tu es inscrit comme donneur {form.groupe}. On t'alertera dès qu'on aura besoin de toi.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 md:px-8 pt-2 pb-6">
      <TopBar />
      <PageHeader icon={Droplet} title="Deviens donneur" subtitle="Chaque don compte. Deux minutes suffisent." />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:max-w-lg">
        <div className="md:grid md:grid-cols-2 md:gap-4 flex flex-col gap-4">
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
        </div>
        <BloodGroupPicker
          value={form.groupe}
          onChange={(g) => setForm({ ...form, groupe: g })}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4 flex flex-col gap-4">
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
        </div>

        <label className="flex items-start gap-2.5 mt-1 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 w-4 h-4 accent-blood shrink-0"
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            J'accepte que mon groupe sanguin, ma ville et mon statut d'éligibilité soient partagés
            avec les hôpitaux partenaires en cas de besoin compatible, et que mon téléphone soit
            utilisé pour recevoir des alertes.{" "}
            <a href="/confidentialite" target="_blank" rel="noopener noreferrer" className="text-blood font-semibold underline">
              Voir la politique de confidentialité
            </a>
          </span>
        </label>

        <Button type="submit" variant="primary" className="mt-1 md:w-fit" disabled={loading || !consent}>
          {loading ? "Envoi..." : "Je m'inscris"}
        </Button>
      </form>
    </div>
  )
}

export default DonorRegister