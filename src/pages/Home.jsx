import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Droplet, Bell, HeartPulse, ArrowRight, MapPin } from 'lucide-react'
import TopBar from '../components/TopBar'
import { getNeeds } from '../services/api'

const URGENCY_BADGE = {
  critique: "bg-blood text-white",
  urgent: "bg-gold text-white",
  normal: "bg-hope text-white",
}
const URGENCY_LABEL = { critique: "Critique", urgent: "Urgent", normal: "Normal" }

function Home() {
  const [needs, setNeeds] = useState([])

  useEffect(() => {
    getNeeds().then((data) => {
      const tri = [...data].sort((a, b) => {
        const ordre = { critique: 0, urgent: 1, normal: 2 }
        return ordre[a.urgence] - ordre[b.urgence]
      })
      setNeeds(tri.slice(0, 2))
    })
  }, [])

  return (
    <div className="max-w-md md:max-w-4xl mx-auto px-6 md:px-8 pt-2 md:pt-10 pb-6">
      <TopBar />

      <div className="md:grid md:grid-cols-5 md:gap-8">
        <div className="md:col-span-3">
          <div className="bg-gradient-to-br from-blood to-blood-dark rounded-3xl px-6 py-8 md:py-10 text-white shadow-xl shadow-blood/20 mt-2 relative overflow-hidden">
            <Droplet className="absolute -right-4 -bottom-4 opacity-10" size={140} strokeWidth={1} />
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight relative">
              Chaque don<br />sauve une vie
            </h1>
            <p className="text-white/80 text-sm mt-3 relative max-w-[85%]">
              Les hôpitaux publient leurs besoins, les donneurs compatibles sont alertés en quelques secondes.
            </p>
            <div className="flex gap-2 mt-5 relative max-w-sm">
              <Link to="/inscription" className="flex-1 bg-white text-blood font-semibold text-sm text-center py-3 rounded-xl active:scale-95 transition">
                Je suis donneur
              </Link>
              <Link to="/hopital" className="flex-1 bg-white/15 text-white font-semibold text-sm text-center py-3 rounded-xl border border-white/30 active:scale-95 transition">
                Je suis un hôpital
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-3 text-center">
              <p className="text-lg font-extrabold text-blood">300+</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Donneurs</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-3 text-center">
              <p className="text-lg font-extrabold text-hope">12</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Centres</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-3 text-center">
              <p className="text-lg font-extrabold text-gold-dark">24h</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Délai moyen</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-ink mb-3">Comment ça marche</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-blood/10 text-blood flex items-center justify-center shrink-0">
                  <Bell size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Un hôpital publie un besoin</p>
                  <p className="text-xs text-gray-500 mt-0.5">Groupe sanguin, quantité et niveau d'urgence, en 2 minutes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center shrink-0">
                  <Droplet size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Les donneurs compatibles sont alertés</p>
                  <p className="text-xs text-gray-500 mt-0.5">Par notification ou SMS, même sans connexion internet.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-hope/10 text-hope flex items-center justify-center shrink-0">
                  <HeartPulse size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Une vie est sauvée</p>
                  <p className="text-xs text-gray-500 mt-0.5">Le donneur suit son impact réel dans son profil.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 mt-8 md:mt-2">
          {needs.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-ink">Besoins urgents</h2>
                <Link to="/besoins" className="text-xs font-semibold text-blood flex items-center gap-1">
                  Voir tout <ArrowRight size={13} />
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {needs.map((need) => (
                  <div key={need.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blood/10 text-blood font-bold text-sm flex items-center justify-center shrink-0">
                      {need.groupe}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink truncate">{need.hopital}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={11} /> {need.lieu}
                      </p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${URGENCY_BADGE[need.urgence]}`}>
                      {URGENCY_LABEL[need.urgence]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home