import { motion } from "framer-motion"

export default function Card({ item }) {
  return (
    <motion.a
      href={item.caseLink}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative block w-[68vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw] rounded-lg overflow-hidden bg-neutral-900"
    >
      <div className="relative h-[38vw] sm:h-[28vw] md:h-[22vw] lg:h-[18vw] xl:h-[15vw]">
        <img src={item.cover} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:opacity-0" loading="lazy" />
        <img src={item.preview} alt={`${item.title} preview`} className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-300 group-hover:opacity-100" loading="lazy" />
        <div className="absolute inset-0 card-gradient opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition">
          <p className="text-sm text-neutral-300">{item.tags.join(" • ")}</p>
          <p className="text-lg font-semibold">{item.title}</p>
        </div>
      </div>
    </motion.a>
  )
}
