function PageHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="mb-6 flex items-start gap-3 md:pt-8">
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-blood/10 text-blood flex items-center justify-center shrink-0 mt-0.5">
          <Icon size={20} />
        </div>
      )}
      <div>
        <h1 className="text-2xl font-extrabold text-ink">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

export default PageHeader