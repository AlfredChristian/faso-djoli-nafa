import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { getMyProfile } from '../services/api'

function joursDepuis(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24))
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
      <div className="max-w-md mx-auto px-6 pt-2 pb-6">
        <TopBar />
        <p className="text-gray-400 text-sm mt-6">Chargement...</p>
      </div>
    )
  }

  const eligible = estEligible(profil.dernierDon)

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 md:px-8 pt-2 md:pt-10 pb-6">
      <TopBar />

      <div className="flex items-center gap-4 mt-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-blood text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-blood/20">
          {profil.groupe}
        </div>
        <div>
          <h1 className="text-xl font-bold text-ink">{profil.nom}</h1>
          <p className="text-sm text-gray-500">{profil.ville}</p>
        </div>
      </div>

      <div className={`rounded-xl p-4 mb-6 ${eligible ? "bg-hope/10 text-hope" : "bg-gray-100 text-gray-500"}`}>
        <p className="font-semibold text-sm">
          {eligible ? "Tu es éligible pour donner à nouveau !" : `Prochain don possible dans ${90 - joursDepuis(profil.dernierDon)} jours`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 md:max-w-sm">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-extrabold text-blood">{profil.nombreDons}</p>
          <p className="text-xs text-gray-500 mt-1">Dons effectués</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-extrabold text-hope">{profil.viesAidees}</p>
          <p className="text-xs text-gray-500 mt-1">Vies aidées</p>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Dernier don : {new Date(profil.dernierDon).toLocaleDateString("fr-FR")}
      </p>
    </div>
  )
}

export default Profile