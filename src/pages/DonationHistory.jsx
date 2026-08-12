import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Droplet, Building2, Calendar } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import { getDonationHistory } from '../services/api'

function DonationHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDonationHistory().then((data) => {
      setHistory(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 md:px-8 pt-2 md:pt-10 pb-6">
      <TopBar />
      <Link to="/profil" className="inline-flex items-center gap-1.5 text-sm text-gray-500 mb-4 mt-2 md:mt-0">
        <ArrowLeft size={15} /> Retour au profil
      </Link>
      <PageHeader icon={Droplet} title="Historique de mes dons" subtitle={`${history.length} don(s) enregistré(s)`} />

      {loading && <p className="text-gray-400 text-sm">Chargement...</p>}

      <div className="flex flex-col gap-3">
        {history.map((don) => (
          <div key={don.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blood/10 text-blood flex items-center justify-center shrink-0">
              <Droplet size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink flex items-center gap-1.5">
                <Building2 size={13} className="text-gray-400" /> {don.centre}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <Calendar size={12} className="text-gray-400" />
                {new Date(don.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                {" · "}{don.ville}
              </p>
            </div>
          </div>
        ))}
        {!loading && history.length === 0 && (
          <p className="text-sm text-gray-400">Aucun don enregistré pour l'instant.</p>
        )}
      </div>
    </div>
  )
}

export default DonationHistory