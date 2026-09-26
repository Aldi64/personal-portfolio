import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { client, urlFor } from '../lib/sanity';
import type { Certification } from '../types/types';

const QUERY = `*[_type == "certification"] | order(coalesce(order, 999) asc, _createdAt asc) {
  name,
  issuer,
  image
}`;

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch(QUERY)
      .then((docs: any[]) => {
        if (cancelled) return;
        const mapped: Certification[] = docs.map((d) => ({
          name: d.name,
          issuer: d.issuer,
          image: urlFor(d.image).width(1200).fit('max').url(),
        }));
        setCertifications(mapped);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function go(newIndex: number, dir: number) {
    setDirection(dir);
    setIndex((newIndex + certifications.length) % certifications.length);
  }

  function onDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x < -50) go(index + 1, 1);
    else if (info.offset.x > 50) go(index - 1, -1);
  }

  if (loading) {
    return (
      <div>
        <p className="text-ink text-sm font-medium mb-5">Certifications</p>
        <div className="w-full max-w-[600px] mx-auto aspect-[3/2] bg-surface rounded-lg animate-pulse" />
      </div>
    );
  }

  if (certifications.length === 0) {
    return (
      <div>
        <p className="text-ink text-sm font-medium mb-5">Certifications</p>
        <p className="text-ink-soft text-sm">No certifications added yet.</p>
      </div>
    );
  }

  const current = certifications[index];

  return (
    <div>
      <p className="text-ink text-sm font-medium mb-5">Certifications</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => go(index - 1, -1)}
          aria-label="Previous certificate"
          className="hidden md:flex w-8 h-8 rounded-full border border-border items-center justify-center text-ink-muted hover:text-ink hover:border-border-strong transition-colors shrink-0"
        >
          <TbChevronLeft />
        </button>

        <div className="flex-1 flex flex-col items-center gap-3 overflow-hidden">
          <div className="w-full max-w-[600px] aspect-[3/2] relative bg-surface rounded-lg">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={index}
                src={current.image}
                alt={current.name}
                custom={direction}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full h-full object-contain rounded-lg cursor-grab active:cursor-grabbing"
              />
            </AnimatePresence>
          </div>
          <div className="text-center">
            <p className="text-ink text-sm font-medium">{current.name}</p>
            <p className="text-ink-muted text-xs">{current.issuer}</p>
          </div>
          <div className="flex gap-1.5 mt-1">
            {certifications.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to certificate ${i + 1}`}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === index ? 'bg-accent' : 'bg-border-strong'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => go(index + 1, 1)}
          aria-label="Next certificate"
          className="hidden md:flex w-8 h-8 rounded-full border border-border items-center justify-center text-ink-muted hover:text-ink hover:border-border-strong transition-colors shrink-0"
        >
          <TbChevronRight />
        </button>
      </div>
    </div>
  );
}
