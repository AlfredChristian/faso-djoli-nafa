import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import TopBar from '../components/TopBar'
import PageHeader from '../components/PageHeader'
import { getNeeds } from '../services/api'

const URGENCY = {
  critique: { label: "Critique", badge: "bg-blood text-white", border: "border-l-blood" },
  urgent: { label: "Urgent", badge: "bg-gold text-white", border: "border-l-gold" },
  normal: { label: "Normal", badge: "bg-hope text-white", border: "border-l-hope" },
}

function NeedsList() {
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNeeds().then((data) => {
      setNeeds(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-6 md:px-8 pt-2 pb-6">
      <TopBar />
      <PageHeader icon={List} title="Besoins actifs" subtitle="Voici ce que les hôpitaux recherchent en ce moment." />

      {loading && <p className="text-gray-400 text-sm">Chargement...</p>}

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
        {needs.map((need) => {
          const u = URGENCY[need.urgence]
          return (
            <div key={need.id} className={`bg-white rounded-xl border border-gray-100 border-l-4 ${u.border} shadow-sm p-4`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-ink text-sm leading-snug">{need.hopital}</span>
                <span className={`text-[11px] font-semibold px-2 py-1 rounded-full shrink-0 ${u.badge}`}>
                  {u.label}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-blood">{need.groupe}</span> · {need.quantite} poches · {need.lieu}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NeedsList