const GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

function BloodGroupPicker({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-medium text-ink">
        Groupe sanguin <span className="text-blood">*</span>
      </span>
      <div className="grid grid-cols-4 gap-2">
        {GROUPS.map((group) => {
          const isSelected = value === group
          return (
            <button
              key={group}
              type="button"
              onClick={() => onChange(group)}
              className={`py-3 rounded-xl font-bold text-sm border-2 transition
                ${isSelected
                  ? "bg-blood text-white border-blood"
                  : "bg-white text-ink border-gray-300 hover:border-blood/50"}`}
            >
              {group}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BloodGroupPicker