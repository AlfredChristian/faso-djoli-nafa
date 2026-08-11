function Button({ children, variant = "primary", type = "button", onClick, className = "" }) {
  const base = "px-6 py-3 rounded-xl font-semibold text-sm transition-transform active:scale-95 disabled:opacity-50"

  const variants = {
    primary: "bg-blood text-white hover:bg-blood-dark",
    secondary: "bg-white text-blood border-2 border-blood hover:bg-blood/5",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button