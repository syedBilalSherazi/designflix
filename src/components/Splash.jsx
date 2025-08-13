import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function Splash({ onDone }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false)
      onDone?.()
    }, 1800) // length of splash
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo bar sweep */}
          <motion.div
            className="relative"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mx-auto flex items-center gap-3">
              <div className="h-10 w-10 rounded-sm bg-red-600 shadow-[0_0_30px_#ff0033]" />
              <span className="text-3xl md:text-4xl font-black tracking-widest">DESIGNFLIX</span>
            </div>

            {/* sweeping light */}
            <motion.div
              className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-2xl"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
