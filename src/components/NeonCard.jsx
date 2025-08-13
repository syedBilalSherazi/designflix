import { motion } from "framer-motion"
import { useState } from "react"

export default function NeonCard({ item, onOpen }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden bg-neutral-900/60 ring-2 
        ${hover ? "ring-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.9)]" : "ring-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"}
        transition-all duration-300 min-w-[62vw] sm:min-w-[46vw] md:min-w-[32vw] lg:min-w-[26vw] xl:min-w-[22vw] cursor-pointer`}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(item)}
    >
      <div className="relative aspect-[16/9]">
        <img
          src={hover ? item.preview : item.cover}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <span>{item.year}</span> <span>•</span> <span>{item.tags.join(" • ")}</span>
          </div>
          <div className="text-lg font-semibold">{item.title}</div>
        </div>
      </div>
    </motion.div>
  )
}
