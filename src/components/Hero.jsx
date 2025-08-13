export default function Hero({ item }) {
  return (
    <section className="relative h-[75vh] w-full">
      <img src={item.cover} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 brand-gradient" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 h-full flex items-end">
        <div className="pb-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-300">
            <span className="rounded bg-red-600 px-2 py-0.5 font-semibold">Featured</span>
            <span>{item.year}</span>
            <span>•</span>
            <span>{item.tags.join(" • ")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">{item.title}</h1>
          <p className="mt-4 text-neutral-300">{item.description}</p>
          <div className="mt-6 flex gap-3">
            <a href={item.caseLink} className="rounded-md bg-white px-4 py-2 text-black font-semibold hover:bg-neutral-200 transition">
              View Case Study
            </a>
            <a href="#showcase" className="rounded-md bg-neutral-800/70 px-4 py-2 text-white font-semibold hover:bg-neutral-700 transition">
              Browse More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
