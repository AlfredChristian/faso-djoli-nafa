import { useEffect, useState } from 'react'
import { Radio } from 'lucide-react'
import { getStockLevels } from '../services/api'

const ETAT_COLOR = {
  critique: "#C0392B",
  urgent: "#F1C40F",
  stable: "#1E8449",
}
const ETAT_LABEL = {
  critique: "Critique",
  urgent: "Urgent",
  stable: "Stable",
}

function StockMap() {
  const [points, setPoints] = useState([])
  const [selected, setSelected] = useState(null)
  const [secondsAgo, setSecondsAgo] = useState(0)

  useEffect(() => {
    getStockLevels().then(setPoints)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setSecondsAgo((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-ink font-extrabold text-lg">
          Stocks en direct
        </h2>
      </div>
      <p className="text-gray-400 text-xs flex items-center gap-1.5 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hope opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-hope"></span>
        </span>
        Mise à jour il y a {secondsAgo}s
      </p>

      <div className="relative w-full" style={{ aspectRatio: "1000 / 736" }}>
        <img src="/burkina-faso-map.svg" alt="Carte du Burkina Faso" className="absolute inset-0 w-full h-full object-contain" />

        {points.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(selected?.id === p.id ? null : p)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.xPct}%`, top: `${p.yPct}%` }}
          >
            <span className="relative flex h-4 w-4">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: ETAT_COLOR[p.etat] }}
              />
              <span
                className="relative inline-flex rounded-full h-4 w-4 border-2 border-white shadow"
                style={{ backgroundColor: ETAT_COLOR[p.etat] }}
              />
            </span>
          </button>
        ))}

        {selected && (
          <div
            className="absolute bg-white border border-gray-100 rounded-xl p-3 shadow-lg text-left w-44 pointer-events-none z-10"
            style={{
              left: `${selected.xPct}%`,
              top: `${selected.yPct}%`,
              transform: "translate(-50%, -125%)",
            }}
          >
            <p className="text-ink text-xs font-bold leading-tight">{selected.centre}</p>
            <p className="text-gray-500 text-[11px] mt-1">
              Stock : <span className="font-semibold" style={{ color: ETAT_COLOR[selected.etat] }}>{selected.stock}%</span>
            </p>
            <p className="text-[11px] mt-0.5 font-medium" style={{ color: ETAT_COLOR[selected.etat] }}>
              État : {ETAT_LABEL[selected.etat]}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-3">
        {Object.entries(ETAT_LABEL).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ETAT_COLOR[key] }} />
            <span className="text-gray-500 text-[11px]">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-[10px] mt-3 flex items-center gap-1">
        <Radio size={10} /> Touchez un point pour voir le détail du centre
      </p>
    </div>
  )
}

export default StockMap