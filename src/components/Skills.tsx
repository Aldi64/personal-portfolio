import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../lib/sanity';
import type { SkillCategory } from '../types/types';
import { skillIcons } from '../data/skillIcons';
import Certifications from './Certifications';
import SkillCard from './SkillCard';

const QUERY = `*[_type == "skills"] | order(coalesce(order, 999) asc, _createdAt asc) {
  label,
  skills
}`;

const iconFor = (name: string) => {
  const def = skillIcons[name];
  return def ? (
    <span style={{ color: def.color }}>{def.icon}</span>
  ) : (
    <span className="text-ink-muted">•</span>
  );
};

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
              <SkillCard
                key={cat.label}
                index={i}
                label={cat.label}
                skills={cat.skills}
                iconFor={iconFor}
              />
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
