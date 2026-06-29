interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
}

const projects: Project[] = [
  { title: 'Project One', description: 'A short description of what this project does and the problem it solves.', tags: ['React', 'TypeScript', 'Tailwind'], githubUrl: '#', liveUrl: '#' },
  { title: 'Project Two', description: 'A short description of what this project does and the problem it solves.', tags: ['Node.js', 'REST API', 'MongoDB'], githubUrl: '#' },
  { title: 'Project Three', description: 'A short description of what this project does and the problem it solves.', tags: ['Next.js', 'Vercel', 'Prisma'], githubUrl: '#', liveUrl: '#' },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.title} className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors flex flex-col">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <a href={project.githubUrl} className="text-gray-600 hover:text-gray-900 transition-colors">GitHub →</a>
                {project.liveUrl && <a href={project.liveUrl} className="text-gray-600 hover:text-gray-900 transition-colors">Live →</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
