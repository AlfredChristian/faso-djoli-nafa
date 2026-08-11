import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getNeeds } from '../services/api'

const URGENCY_STYLE = {
  critique: "bg-blood text-white",
  urgent: "bg-gold text-white",
  normal: "bg-hope text-white",
}

const URGENCY_LABEL = {
  critique: "Critique",
  urgent: "Urgent",
  normal: "Normal",
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
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <Header />
        <h1 className="text-2xl font-bold text-ink mt-6 mb-1">Besoins actifs</h1>
        <p className="text-gray-500 text-sm mb-6">Voici ce que les hôpitaux recherchent en ce moment.</p>

        {loading && <p className="text-gray-400 text-sm">Chargement...</p>}

        <div className="flex flex-col gap-3">
          {needs.map((need) => (
            <div key={need.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-ink">{need.hopital}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${URGENCY_STYLE[need.urgence]}`}>
                  {URGENCY_LABEL[need.urgence]}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-blood">{need.groupe}</span> · {need.quantite} poches · {need.lieu}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NeedsList