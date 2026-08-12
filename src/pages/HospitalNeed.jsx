import { useState, useEffect } from 'react'
import { Bell, CheckCircle2 } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import Input from '../components/Input'
import BloodGroupPicker from '../components/BloodGroupPicker'
import UrgencyPicker from '../components/UrgencyPicker'
import Button from '../components/Button'
import { publishNeed, findMatchingDonors } from '../services/api'

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
  const [donorsFound, setDonorsFound] = useState([])
  const [alerting, setAlerting] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await publishNeed(form)
    setLoading(false)
    setPublie(true)
    setAlerting(true)
    const matches = await findMatchingDonors(form.groupe, form.lieu)
    setDonorsFound(matches)
  }

  // Fait apparaître les donneurs un par un, comme des alertes qui arrivent en direct
  useEffect(() => {
    if (donorsFound.length === 0) return
    setVisibleCount(0)
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= donorsFound.length) {
          clearInterval(interval)
          setAlerting(false)
          return prev
        }
        return prev + 1
      })
    }, 500)
    return () => clearInterval(interval)
  }, [donorsFound])

  if (publie) {
    return (
      <div className="max-w-md mx-auto px-6 pt-16 flex flex-col items-center text-center gap-1">
        <div className="w-16 h-16 rounded-full bg-hope/10 flex items-center justify-center text-hope text-3xl mb-2">✓</div>
        <h1 className="text-xl font-bold text-ink">Besoin publié</h1>
        <p className="text-gray-500 max-w-xs mb-6">
          Recherche de donneurs {form.groupe} compatibles à {form.lieu}...
        </p>

        <div className="w-full flex flex-col gap-2">
          {donorsFound.slice(0, visibleCount).map((d, i) => (
            <div
              key={d.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center gap-3 text-left animate-[fadeIn_0.4s_ease-out]"
            >
              <div className="w-9 h-9 rounded-full bg-hope/10 text-hope flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink">{d.prenom} a été alerté(e)</p>
                <p className="text-xs text-gray-500">à {d.distance} km · groupe {form.groupe}</p>
              </div>
            </div>
          ))}
        </div>

        {alerting && (
          <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
            <Bell size={13} className="animate-pulse" /> Envoi des alertes en cours...
          </p>
        )}
        {!alerting && donorsFound.length > 0 && (
          <p className="text-sm font-semibold text-hope mt-4">
            {donorsFound.length} donneur(s) compatible(s) alerté(s) au total
          </p>
        )}
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