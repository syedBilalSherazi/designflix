export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-sm bg-red-600" />
          <span className="text-xl font-extrabold tracking-wide">DesignFlix</span>
        </div>
        <nav className="ml-auto flex gap-6 text-sm text-neutral-300">
          <a className="hover:text-white" href="#work">Work</a>
          <a className="hover:text-white" href="#about">About</a>
          <a className="hover:text-white" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
