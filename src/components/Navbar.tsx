const navLinks = ['About', 'Projects', 'Contact']

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-lg tracking-tight">Aldi64</a>
        <ul className="flex gap-8">
          {navLinks.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
