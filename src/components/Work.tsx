import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import type { Work as WorkType } from '../types/types';

const QUERY = `*[_type == "work"] | order(coalesce(order, 999) asc, _createdAt desc) {
  company,
  role,
  location,
  startDate,
  endDate,
  summary,
  highlights,
  companyLogo,
  companyUrl
}`;

export default function Work() {
  const [entries, setEntries] = useState<WorkType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch(QUERY)
      .then((docs: any[]) => {
        if (cancelled) return;
        const mapped: WorkType[] = docs.map((d) => ({
          company: d.company,
          role: d.role,
          location: d.location || undefined,
          startDate: d.startDate,
          endDate: d.endDate || undefined,
          summary: d.summary || undefined,
          highlights: d.highlights ?? [],
          companyLogo: d.companyLogo
            ? urlFor(d.companyLogo).width(96).height(96).fit('crop').url()
            : undefined,
          companyUrl: d.companyUrl || undefined,
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
    <section id="work" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="font-display text-2xl text-ink mb-10"
      >
        Work Experience
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
              <div className="h-3 w-full bg-border/40 rounded mb-2" />
              <div className="h-3 w-5/6 bg-border/40 rounded" />
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <p className="text-ink-soft text-sm">No work experience added yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {entries.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                {exp.companyLogo && (
                  <img
                    src={exp.companyLogo}
                    alt={exp.company}
                    className="w-12 h-12 rounded-lg object-cover border border-border shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg text-ink">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-ink-muted whitespace-nowrap">
                      {exp.startDate} — {exp.endDate ?? 'Present'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-2 mb-3">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-accent hover:opacity-80 transition-opacity"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className="text-sm text-accent">{exp.company}</span>
                    )}
                    {exp.location && (
                      <span className="text-xs text-ink-muted">
                        · {exp.location}
                      </span>
                    )}
                  </div>

                  {exp.summary && (
                    <p className="text-ink-soft text-sm leading-relaxed mb-3">
                      {exp.summary}
                    </p>
                  )}

                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-ink-soft text-sm flex gap-2"
                        >
                          <span className="text-accent">—</span>
                          {h}
                        </li>
                      ))}
                    </ul>
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
