import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import type { Education as EducationType } from '../types/types';

const QUERY = `*[_type == "education"] | order(coalesce(order, 999) asc, _createdAt desc) {
  institution,
  degree,
  location,
  startDate,
  endDate,
  description,
  logo,
  url
}`;

export default function Education() {
  const [entries, setEntries] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch(QUERY)
      .then((docs: any[]) => {
        if (cancelled) return;
        const mapped: EducationType[] = docs.map((d) => ({
          institution: d.institution,
          degree: d.degree,
          location: d.location || undefined,
          startDate: d.startDate,
          endDate: d.endDate || undefined,
          description: d.description || undefined,
          logo: d.logo
            ? urlFor(d.logo).width(96).height(96).fit('crop').url()
            : undefined,
          url: d.url || undefined,
        }));
        setEntries(mapped);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="education" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="font-display text-2xl text-ink mb-10"
      >
        Education
      </motion.h2>

      {loading ? (
        <div className="flex flex-col gap-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 animate-pulse"
            >
              <div className="h-4 w-1/3 bg-border/40 rounded mb-3" />
              <div className="h-3 w-1/4 bg-border/40 rounded mb-6" />
              <div className="h-3 w-full bg-border/40 rounded" />
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <p className="text-ink-soft text-sm">No education added yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {entries.map((edu, i) => (
            <motion.div
              key={`${edu.institution}-${edu.degree}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                {edu.logo && (
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-12 h-12 rounded-lg object-cover border border-border shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg text-ink">
                      {edu.institution}
                    </h3>
                    <span className="text-xs text-ink-muted whitespace-nowrap">
                      {edu.startDate} — {edu.endDate ?? 'Present'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-2 mb-3">
                    {edu.url ? (
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-accent hover:opacity-80 transition-opacity"
                      >
                        {edu.degree}
                      </a>
                    ) : (
                      <span className="text-sm text-accent">{edu.degree}</span>
                    )}
                    {edu.location && (
                      <span className="text-xs text-ink-muted">
                        · {edu.location}
                      </span>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-ink-soft text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
