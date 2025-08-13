import { motion, AnimatePresence } from "framer-motion"

export default function Modal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            aria-modal="true" role="dialog"
          >
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-neutral-950 ring-1 ring-white/10">
              <div className="relative aspect-[16/9] bg-black">
                <img
                  src={item.preview || item.cover}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-contain object-center"
                  loading="lazy"
                />
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white text-xl"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="p-5">
                <div className="text-sm text-neutral-400">
                  {item.year} • {item.tags.join(" • ")}
                </div>
                <h3 className="text-2xl font-bold mt-1">{item.title}</h3>
                <p className="text-neutral-300 mt-2">{item.description}</p>
                {/* Removed "View Case Study" section */}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
