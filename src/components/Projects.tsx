import { useState } from 'react';
import { motion } from 'framer-motion';
import { project } from '../data/content';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [open, setOpen] = useState(false);

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="font-display text-2xl text-ink mb-8"
      >
        Projects
      </motion.h2>

      <motion.button
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        onClick={() => setOpen(true)}
        className="text-left w-full bg-card border border-border rounded-2xl overflow-hidden hover:border-border-strong transition-colors group"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg text-ink mb-2">
            {project.title}
          </h3>
          <p className="text-ink-soft text-sm mb-4">{project.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-xs text-ink-muted border border-border rounded-full px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.button>

      <ProjectModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
