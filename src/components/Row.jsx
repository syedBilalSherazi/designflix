import { useRef } from "react"
import Card from "./Card"

export default function Row({ title, items }) {
  const scroller = useRef(null)
  const scrollBy = (dir) => {
    const el = scroller.current
    if (!el) return
    const amount = Math.min(1200, el.clientWidth * 0.9)
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-3 text-xl md:text-2xl font-bold">{title}</h2>
      </div>

      <div className="relative">
        <button aria-label="Scroll left" onClick={() => scrollBy(-1)}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/80">
          ‹
        </button>
        <button aria-label="Scroll right" onClick={() => scrollBy(1)}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/80">
          ›
        </button>

        <div ref={scroller} className="scrollbar-hide overflow-x-auto pl-6 pr-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-4 md:gap-6 py-2">
              {items.map((p) => <Card key={p.id} item={p} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
