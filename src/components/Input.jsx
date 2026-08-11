function Input({ label, type = "text", value, onChange, placeholder, required = false, name }) {
  return (
    <label className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-medium text-ink">
        {label} {required && <span className="text-blood">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-ink placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blood focus:border-transparent transition"
      />
    </label>
  )
}

export default Input