export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm font-medium text-blue-600 mb-4 tracking-widest uppercase">Available for work</p>
        <h1 className="text-6xl font-bold tracking-tight leading-none mb-6">
          Hi, I'm Aldi. <br />
          <span className="text-gray-400">I build for the web.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-xl mb-10">
          Frontend developer specializing in React, TypeScript, and crafting clean, performant user experiences.
        </p>
        <div className="flex gap-4">
          <a href="#projects" className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">View Projects</a>
          <a href="#contact" className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium hover:border-gray-500 transition-colors">Get in Touch</a>
        </div>
      </div>
    </section>
  )
}
