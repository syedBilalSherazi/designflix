import { motion, useMotionValue, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import NeonCard from "./NeonCard"

export default function RowDraggable({ title, items, onOpen }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const [maxDrag, setMaxDrag] = useState(0)
  const [viewportW, setViewportW] = useState(0)

  // Measure how far we can drag (content width - container width)
  useEffect(() => {
    const update = () => {
      const cont = containerRef.current
      const track = trackRef.current
      if (!cont || !track) return
      const contentW = track.scrollWidth
      const contW = cont.clientWidth
      setViewportW(contW)
      const overflow = Math.max(0, contentW - contW)
      setMaxDrag(overflow)
      // clamp current x so it never exceeds new bounds
      const current = x.get()
      const clamped = Math.min(0, Math.max(-overflow, current))
      if (clamped !== current) x.set(clamped)
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [items, x])

  // Helper to slide programmatically (arrows / wheel)
  const slideBy = (amount) => {
    if (maxDrag <= 0) return
    const next = clamp(x.get() - amount, -maxDrag, 0) // negative x moves left
    animate(x, next, { type: "spring", stiffness: 260, damping: 28 })
  }

  // Wheel: translate vertical scroll to horizontal glide
  const onWheel = (e) => {
    // prefer deltaY (vertical) but fall back to deltaX
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
    if (delta !== 0) {
      e.preventDefault()
      slideBy(delta * 1.2) // feel free to tune multiplier
    }
  }

  const page = Math.max(320, viewportW * 0.85) // one “page” for arrow navigation

  return (
    <section className="mt-6 select-none">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-3 text-xl md:text-2xl font-bold">{title}</h2>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Arrows */}
        {maxDrag > 0 && (
          <>
            <button
              aria-label="Scroll left"
              onClick={() => slideBy(-page)}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/80"
            >
              ‹
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => slideBy(page)}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/80"
            >
              ›
            </button>
          </>
        )}

        {/* Viewport */}
        <div
          ref={containerRef}
          className="mx-auto max-w-7xl px-6 overflow-hidden"
          onWheel={onWheel}
        >
          {/* Track (drag-powered) */}
          <motion.div
            ref={trackRef}
            className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragMomentum
            dragElastic={0.04}
            dragConstraints={{ left: -maxDrag, right: 0 }}
          >
            {items.map((p) => (
              <div key={p.id} className="shrink-0">
                <NeonCard item={p} onOpen={onOpen} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* utils */
function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val))
}
