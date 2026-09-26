import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../lib/sanity';
import type { SkillCategory } from '../types/types';
import { skillIcons } from '../data/skillIcons';
import Certifications from './Certifications';

const QUERY = `*[_type == "skills"] | order(coalesce(order, 999) asc, _createdAt asc) {
  label,
  skills
}`;

export default function Skills() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch(QUERY)
      .then((docs: SkillCategory[]) => {
        if (!cancelled) setCategories(docs);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="font-display text-2xl text-ink mb-10"
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {loading
          ? [0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 animate-pulse"
              >
                <div className="h-4 w-24 bg-border/40 rounded mb-5" />
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((j) => (
                    <div key={j} className="h-16 bg-border/40 rounded-lg" />
                  ))}
                </div>
              </div>
            ))
          : categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span className="font-display text-base text-ink">
                    {cat.label}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {cat.skills.map((skill) => {
                    const def = skillIcons[skill];
                    return (
                      <div
                        key={skill}
                        className="flex flex-col items-center gap-2 p-3 border border-border rounded-lg text-center"
                      >
                        {def ? (
                          <span
                            className="text-2xl leading-none"
                            style={{ color: def.color }}
                          >
                            {def.icon}
                          </span>
                        ) : (
                          <span className="text-2xl leading-none text-ink-muted">
                            •
                          </span>
                        )}
                        <span className="text-xs text-ink-soft leading-tight">
                          {skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
      </div>

      <div className="h-px bg-border mb-10" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
      >
        <Certifications />
      </motion.div>
    </section>
  );
}
