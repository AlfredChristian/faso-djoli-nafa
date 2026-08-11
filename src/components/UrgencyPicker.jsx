const LEVELS = [
  { value: "normal", label: "Normal", selectedClass: "bg-hope text-white border-hope" },
  { value: "urgent", label: "Urgent", selectedClass: "bg-gold text-white border-gold" },
  { value: "critique", label: "Critique", selectedClass: "bg-blood text-white border-blood" },
]

function UrgencyPicker({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-medium text-ink">
        Niveau d'urgence <span className="text-blood">*</span>
      </span>
      <div className="grid grid-cols-3 gap-2">
        {LEVELS.map((level) => {
          const isSelected = value === level.value
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value)}
              className={`py-3 rounded-xl font-semibold text-sm border-2 transition
                ${isSelected ? level.selectedClass : "bg-white text-ink border-gray-300 hover:border-gray-400"}`}
            >
              {level.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default UrgencyPicker