import { useEffect, useState, useMemo } from 'react'
import { Shield, Building2, CheckCircle2, XCircle, Search, Droplet, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { setAdminLoggedIn } from '../services/api'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import PageHeader from '../components/PageHeader'
import {
  getAdminStats, getPendingHospitals, validateHospital, rejectHospital,
  getNeeds, getAllDonors, getBloodGroupDistribution,
} from '../services/api'

const TABS = [
  { id: "overview", label: "Vue d'ensemble" },
  { id: "donors", label: "Donneurs" },
  { id: "hospitals", label: "Hôpitaux à valider" },
  { id: "needs", label: "Besoins actifs" },
]

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  )
}

function eligible(dateStr) {
  const jours = Math.floor((Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24))
  return jours >= 90
}

function Admin() {
  const navigate = useNavigate()
  const handleLogout = () => {
    setAdminLoggedIn(false)
    navigate("/admin/connexion")
  }
  const [tab, setTab] = useState("overview")
  const [stats, setStats] = useState(null)
  const [pending, setPending] = useState([])
  const [needs, setNeeds] = useState([])
  const [donors, setDonors] = useState([])
  const [distribution, setDistribution] = useState([])
  const [processing, setProcessing] = useState(null)
  const [search, setSearch] = useState("")
  const [groupFilter, setGroupFilter] = useState("Tous")

  useEffect(() => {
    getAdminStats().then(setStats)
    getPendingHospitals().then(setPending)
    getNeeds().then(setNeeds)
    getAllDonors().then(setDonors)
    getBloodGroupDistribution().then(setDistribution)
  }, [])

  const handleValidate = async (id) => {
    setProcessing(id)
    await validateHospital(id)
    setPending((prev) => prev.filter((h) => h.id !== id))
    setProcessing(null)
  }

  const handleReject = async (id) => {
    setProcessing(id)
    await rejectHospital(id)
    setPending((prev) => prev.filter((h) => h.id !== id))
    setProcessing(null)
  }

  const groupes = ["Tous", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

  const filteredDonors = useMemo(() => {
    return donors.filter((d) => {
      const matchSearch = d.nom.toLowerCase().includes(search.toLowerCase()) || d.ville.toLowerCase().includes(search.toLowerCase())
      const matchGroup = groupFilter === "Tous" || d.groupe === groupFilter
      return matchSearch && matchGroup
    })
  }, [donors, search, groupFilter])

  return (
    <div className="max-w-md md:max-w-5xl mx-auto px-6 md:px-8 pt-6 pb-6">
        <div className="flex items-start justify-between">
        <PageHeader icon={Shield} title="Administration" subtitle="Vue d'ensemble et gestion de la plateforme." />
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blood mt-1">
            <LogOut size={15} /> Déconnexion
        </button>
        </div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition
              ${tab === t.id ? "bg-blood text-white" : "bg-gray-100 text-gray-500"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && stats && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard label="Donneurs inscrits" value={stats.donneurs} color="text-blood" />
            <StatCard label="Hôpitaux partenaires" value={stats.hopitaux} color="text-hope" />
            <StatCard label="Besoins actifs" value={stats.besoinsActifs} color="text-gold-dark" />
            <StatCard label="Besoins résolus" value={stats.besoinsResolus} color="text-ink" />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6">
            <h2 className="font-bold text-ink text-sm mb-4">Répartition des donneurs par groupe sanguin</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={distribution}>
                <XAxis dataKey="groupe" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip cursor={{ fill: "#FCFBF9" }} contentStyle={{ borderRadius: 12, border: "1px solid #F3F4F6", fontSize: 13 }} />
                <Bar dataKey="total" fill="#C0392B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "donors" && (
        <div>
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un nom ou une ville..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blood focus:border-transparent"
              />
            </div>
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blood"
            >
              {groupes.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <p className="text-xs text-gray-400 mb-3">{filteredDonors.length} donneur(s)</p>

          <div className="flex flex-col gap-2">
            {filteredDonors.map((d) => {
              const ok = eligible(d.dernierDon)
              return (
                <div key={d.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blood/10 text-blood font-bold text-xs flex items-center justify-center shrink-0">
                    {d.groupe}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{d.nom}</p>
                    <p className="text-xs text-gray-500">{d.ville} · {d.dons} don(s)</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${ok ? "bg-hope/10 text-hope" : "bg-gray-100 text-gray-400"}`}>
                    {ok ? "Éligible" : "Pas encore"}
                  </span>
                </div>
              )
            })}
            {filteredDonors.length === 0 && (
              <p className="text-sm text-gray-400">Aucun donneur ne correspond à cette recherche.</p>
            )}
          </div>
        </div>
      )}

      {tab === "hospitals" && (
        <div className="flex flex-col gap-3">
          {pending.length === 0 && (
            <p className="text-sm text-gray-400">Aucun hôpital en attente de validation.</p>
          )}
          {pending.map((h) => (
            <div key={h.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-hope/10 text-hope flex items-center justify-center shrink-0">
                  <Building2 size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">{h.nom}</p>
                  <p className="text-xs text-gray-500">{h.ville} · demande du {new Date(h.date).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleValidate(h.id)}
                  disabled={processing === h.id}
                  className="w-9 h-9 rounded-full bg-hope/10 text-hope flex items-center justify-center disabled:opacity-50"
                >
                  <CheckCircle2 size={18} />
                </button>
                <button
                  onClick={() => handleReject(h.id)}
                  disabled={processing === h.id}
                  className="w-9 h-9 rounded-full bg-blood/10 text-blood flex items-center justify-center disabled:opacity-50"
                >
                  <XCircle size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "needs" && (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
          {needs.map((need) => (
            <div key={need.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-ink text-sm">{need.hopital}</span>
                <Droplet size={14} className="text-gray-300" />
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-blood">{need.groupe}</span> · {need.quantite} poches · {need.lieu}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin