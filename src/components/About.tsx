const skills = ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'REST APIs']

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              I'm a frontend developer passionate about building intuitive and performant web applications.
              I care about clean code, thoughtful UI, and great user experiences.
            </p>
            <p className="text-gray-600 leading-relaxed">
              When I'm not coding, you'll find me exploring new tech, contributing to open source, or leveling up my design skills.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Tech I work with</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
