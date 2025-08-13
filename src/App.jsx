import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./components/Header"
import Splash from "./components/Splash"
import RowDraggable from "./components/RowDraggable"
import Modal from "./components/Modal"
import useParallax from "./hooks/useParallax"
import { projects } from "./data/projects"

export default function App() {
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(null)
  const [heroIndex, setHeroIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const offset = useParallax(0.25)

  // HERO: auto-rotate every 4s
  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setHeroIndex(i => (i + 1) % projects.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  // ROWS: STATIC (do not change with hero)
  const latest = useMemo(() => projects, [])
  const topRated = useMemo(() => [...projects].reverse(), [])
  const directorsCut = useMemo(() => projects.slice(1), [])

  const featured = projects[heroIndex]

  const slide = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center:       { x: 0, opacity: 1 },
    exit:  (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }
  const trans = { type: "spring", stiffness: 120, damping: 18 }

  return (
    <div className="noise glow-bg min-h-screen">
      {!ready && <Splash onDone={() => setReady(true)} />}
      <Header />

      {/* HERO: animated slides */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-black">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={featured.id}
            className="absolute inset-0"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={trans}
          >
            <motion.img
              src={featured.cover}
              alt={featured.title}
              style={{ transform: `translateY(${offset * 0.6}px)` }}
              className="absolute inset-0 h-full w-full object-contain object-center bg-black"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Text slides in sync */}
        <div className="relative z-10 mx-auto max-w-7xl h-full flex items-end px-6 pb-10">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`txt-${featured.id}`}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={trans}
              style={{ transform: `translateY(${offset * -0.15}px)` }}
            >
              <div className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-300">
                <span className="rounded bg-red-600 px-2 py-0.5 font-semibold">Featured</span>
                <span>{featured.year}</span>
                <span>•</span>
                <span>{featured.tags.join(" • ")}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow">
                {featured.title}
              </h1>
              <p className="mt-3 text-neutral-300 max-w-xl">{featured.description}</p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setActive(featured)}
                  className="rounded-md bg-neutral-900/70 px-4 py-2 font-semibold hover:bg-neutral-800 transition ring-1 ring-white/10"
                >
                  More Info
                </button>
                {/* No "View Case Study" here */}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* STATIC ROWS */}
      <div id="work" className="space-y-10 md:space-y-14 py-10">
        <RowDraggable title="Latest Releases" items={latest} onOpen={setActive} />
        <RowDraggable title="Top Rated" items={topRated} onOpen={setActive} />
        <RowDraggable title="Director’s Cut" items={directorsCut} onOpen={setActive} />
      </div>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 p-8 md:p-10">
          <h3 className="text-2xl font-bold">About</h3>
          <p className="text-neutral-300 mt-2 max-w-3xl">
           I’m a creative designer who blends aesthetics with functionality to craft designs that not only look good but work beautifully. My process is rooted in understanding people their needs, emotions, and interactions  and transforming that into visually compelling experiences.

From clean, minimal layouts to bold, experimental visuals, I adapt my style to fit the story I’m telling. I’m skilled in creating responsive, user-focused designs that balance clarity, creativity, and brand identity. Whether it’s a sleek interface, an engaging landing page, or a full brand refresh, my goal is to make every pixel count.

For me, design is more than colors and shapes  it’s about solving problems, guiding users, and leaving a lasting impression.

          </p>
        </div>
      </section>
{/* CONTACT */}
<section id="contact" className="mx-auto max-w-7xl px-6 pb-24">
  <div className="rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 md:p-10">
    <h3 className="text-2xl font-bold">Let’s build something insane</h3>
    <p className="text-neutral-300 mt-2">Freelance • Collabs • Contract</p>

    <div className="mt-5 flex flex-wrap gap-3">
      {/* Email */}
      <a
        href="mailto:syedbilalsherazi1004@gmail.com"
        className="rounded-md bg-white px-4 py-2 text-black font-semibold hover:bg-neutral-200 transition"
      >
        Email Me
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/923002244653"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-green-600/90 px-4 py-2 font-semibold hover:bg-green-600 transition"
      >
        WhatsApp
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/syed-bilal-sherazi-7b302a242/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-neutral-700 px-4 py-2 font-semibold hover:bg-neutral-600 transition"
      >
        LinkedIn
      </a>

      {/* Fiverr */}
      <a
        href="https://www.fiverr.com/users/syed430"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-neutral-700 px-4 py-2 font-semibold hover:bg-neutral-600 transition"
      >
        Fiverr
      </a>
    </div>
  </div>
</section>


      <footer className="py-10 text-center text-neutral-500 text-sm">
        © {new Date().getFullYear()} DesignFlix • React + Vite • Tailwind • Framer Motion
      </footer>

      <Modal item={active} onClose={() => setActive(null)} />
    </div>
  )
}
