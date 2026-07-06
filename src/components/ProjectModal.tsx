import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbBrandGithub } from 'react-icons/tb';
import { useEffect } from 'react';
import { project } from '../data/content';

export default function ProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-border relative"
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/90 border border-border flex items-center justify-center text-ink-soft hover:text-ink hover:border-border-strong transition-colors z-10"
            >
              <TbX className="text-lg" />
            </button>

            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover rounded-t-2xl"
            />

            <div className="p-6">
              <h3 className="font-display text-xl text-ink mb-3">
                {project.title}
              </h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-5">
                {project.narrative}
              </p>

              <p className="text-ink-muted text-xs mb-2">Key features</p>
              <ul className="mb-5 space-y-1.5">
                {project.features.map((f) => (
                  <li key={f} className="text-ink-soft text-sm flex gap-2">
                    <span className="text-accent">—</span>
                    {f}
                  </li>
                ))}
              </ul>

              <p className="text-ink-muted text-xs mb-2">Built with</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.builtWith.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-ink-muted border border-border rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-card text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                <TbBrandGithub className="text-base" />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
