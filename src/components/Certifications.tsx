import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { certifications } from '../data/content';

export default function Certifications() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function go(newIndex: number, dir: number) {
    setDirection(dir);
    setIndex((newIndex + certifications.length) % certifications.length);
  }

  function onDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x < -50) go(index + 1, 1);
    else if (info.offset.x > 50) go(index - 1, -1);
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
          <div className="w-full max-w-[440px] aspect-[3/2] relative bg-surface rounded-lg">
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
