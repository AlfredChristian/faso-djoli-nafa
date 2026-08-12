import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Lock, Download, UserCog, ChevronRight } from 'lucide-react'
import TopBar from '../components/TopBar'
import { getMyProfile, getMyBadges } from '../services/api'
import { generateCertificate } from '../utils/certificate'

function joursDepuis(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24))
}

function estEligible(dateStr) {
  return joursDepuis(dateStr) >= 90
}

function Profile() {
  const [profil, setProfil] = useState(null)
  const [badges, setBadges] = useState([])
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    getMyProfile().then(setProfil)
    getMyBadges().then(setBadges)
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
  const earnedCount = badges.filter((b) => b.earned).length

  const handleDownload = async () => {
    setGenerating(true)
    await generateCertificate(profil, badges)
    setGenerating(false)
  }

  return (
    <div className="max-w-md md:max-w-2xl mx-auto px-6 md:px-8 pt-2 md:pt-10 pb-6">
      <TopBar />

      <div className="flex items-center justify-between mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blood text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-blood/20">
            {profil.groupe}
          </div>
          <div>
            <h1 className="text-xl font-bold text-ink">{profil.nom}</h1>
            <p className="text-sm text-gray-500">{profil.ville}</p>
          </div>
        </div>
        <Link to="/profil/modifier" className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
          <UserCog size={17} />
        </Link>
      </div>

      <div className={`rounded-xl p-4 mb-6 ${eligible ? "bg-hope/10 text-hope" : "bg-gray-100 text-gray-500"}`}>
        <p className="font-semibold text-sm">
          {eligible ? "Tu es éligible pour donner à nouveau !" : `Prochain don possible dans ${90 - joursDepuis(profil.dernierDon)} jours`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8 md:max-w-sm">
        <Link to="/profil/dons" className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center active:scale-95 transition">
          <p className="text-2xl font-extrabold text-blood">{profil.nombreDons}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-0.5">
            Dons effectués <ChevronRight size={12} />
          </p>
        </Link>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-extrabold text-hope">{profil.viesAidees}</p>
          <p className="text-xs text-gray-500 mt-1">Vies aidées</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-ink flex items-center gap-2">
          <Award size={18} className="text-gold-dark" /> Mes badges
        </h2>
        <span className="text-xs text-gray-400">{earnedCount}/{badges.length}</span>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-xl border p-3 flex flex-col items-center text-center gap-1.5
              ${badge.earned ? "bg-white border-gray-100 shadow-sm" : "bg-gray-50 border-gray-100 opacity-60"}`}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center
              ${badge.earned ? "bg-gold/15 text-gold-dark" : "bg-gray-200 text-gray-400"}`}>
              {badge.earned ? <Award size={20} /> : <Lock size={16} />}
            </div>
            <p className="text-[11px] font-semibold text-ink leading-tight">{badge.label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleDownload}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-ink text-white active:scale-95 transition mb-6 disabled:opacity-60"
      >
        <Download size={16} /> {generating ? "Génération..." : "Télécharger mon attestation"}
      </button>

      <p className="text-xs text-gray-400">
        Dernier don : {new Date(profil.dernierDon).toLocaleDateString("fr-FR")}
      </p>
    </div>
  )
}

export default Profile