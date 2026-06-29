export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-gray-500">
        <span>© {new Date().getFullYear()} Aldi64</span>
        <div className="flex gap-6">
          <a href="https://github.com/Aldi64" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
