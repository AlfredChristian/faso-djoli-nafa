import { useRef } from 'react'

function OtpInput({ value, onChange, length = 4 }) {
  const refs = useRef([])

  const handleChange = (index, digit) => {
    const clean = digit.replace(/\D/g, "").slice(-1)
    const chars = value.split("")
    chars[index] = clean
    const next = chars.join("").slice(0, length)
    onChange(next)
    if (clean && index < length - 1) {
      refs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-14 h-14 text-center text-xl font-bold rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blood focus:border-transparent"
        />
      ))}
    </div>
  )
}

export default OtpInput