import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getMyProfile } from '../services/api'

function joursDepuis(dateStr) {
  const jours = Math.floor((Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24))
  return jours
}

function estEligible(dateStr) {
  return joursDepuis(dateStr) >= 90
}

function Profile() {
  const [profil, setProfil] = useState(null)

  useEffect(() => {
    getMyProfile().then(setProfil)
  }, [])

  if (!profil) {
    return (
      <div className="min-h-screen bg-white p-6 flex flex-col items-center">
        <div className="w-full max-w-sm">
          <Header />
          <p className="text-gray-400 text-sm mt-6">Chargement...</p>
        </div>
      </div>
    )
  }

  const eligible = estEligible(profil.dernierDon)

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <Header />

        <div className="flex items-center gap-4 mt-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-blood text-white flex items-center justify-center text-xl font-bold">
            {profil.groupe}
          </div>
          <div>
            <h1 className="text-xl font-bold text-ink">{profil.nom}</h1>
            <p className="text-sm text-gray-500">{profil.ville}</p>
          </div>
        </div>

        <div
          className={`rounded-xl p-4 mb-6 ${eligible ? "bg-hope/10 text-hope" : "bg-gray-100 text-gray-500"}`}
        >
          <p className="font-semibold text-sm">
            {eligible ? "Tu es éligible pour donner à nouveau !" : `Prochain don possible dans ${90 - joursDepuis(profil.dernierDon)} jours`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-blood">{profil.nombreDons}</p>
            <p className="text-xs text-gray-500 mt-1">Dons effectués</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-hope">{profil.viesAidees}</p>
            <p className="text-xs text-gray-500 mt-1">Vies aidées</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Dernier don : {new Date(profil.dernierDon).toLocaleDateString("fr-FR")}
        </p>
      </div>
    </div>
  )
}

export default Profile