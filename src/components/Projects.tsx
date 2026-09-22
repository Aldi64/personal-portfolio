import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import type { Project, ProjectCategory } from '../types/types';
import ProjectModal from './ProjectModal';

const FILTERS: { label: string; value: 'All' | ProjectCategory }[] = [
  { label: 'All', value: 'All' },
  { label: 'Thesis', value: 'Thesis' },
  { label: 'School Projects', value: 'School Project' },
  { label: 'Personal Projects', value: 'Personal Project' },
];

const QUERY = `*[_type == "project"] | order(coalesce(order, 999) asc, _createdAt desc) {
  title,
  tagline,
  image,
  previewImages[]{ _type, asset->{url} },
  tags,
  category,
  narrative,
  features,
  builtWith,
  github
}`;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All');

  useEffect(() => {
    let cancelled = false;
    client
      .fetch(QUERY)
      .then((docs: any[]) => {
        if (cancelled) return;
        const mapped: Project[] = docs.map((d) => ({
          title: d.title,
          tagline: d.tagline,
          image: urlFor(d.image).width(1200).height(675).fit('crop').url(),
          previewMedia: (d.previewImages ?? []).map((m: any) => {
            const isVideo = m._type === 'previewVideo';
            return {
              type: isVideo ? ('video' as const) : ('image' as const),
              // images: append CDN resize params directly to the asset URL
              // (keeps GIF animation intact — no image-url builder transform involved)
              url: isVideo
                ? m.asset.url
                : `${m.asset.url}?w=1000&h=625&fit=crop`,
            };
          }),
          tags: d.tags ?? [],
          category: d.category,
          narrative: d.narrative,
          features: d.features ?? [],
          builtWith: d.builtWith ?? [],
          github: d.github || undefined,
        }));
        setProjects(mapped);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

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

      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
              filter === f.value
                ? 'bg-ink text-card border-ink'
                : 'text-ink-soft border-border hover:border-border-strong'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-border/40" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-1/2 bg-border/40 rounded" />
                <div className="h-3 w-3/4 bg-border/40 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-ink-soft text-sm">
          No projects in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <motion.button
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelected(p)}
              className="text-left w-full bg-card border border-border rounded-2xl overflow-hidden hover:border-border-strong transition-colors group"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-xs font-medium bg-card/90 text-ink-soft border border-border rounded-full px-3 py-1 backdrop-blur-sm">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-ink mb-2">
                  {p.title}
                </h3>
                <p className="text-ink-soft text-sm mb-4">{p.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
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
          ))}
        </div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
