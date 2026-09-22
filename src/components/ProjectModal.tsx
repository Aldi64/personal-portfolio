import { motion, AnimatePresence } from 'framer-motion';
import {
  TbX,
  TbBrandGithub,
  TbChevronLeft,
  TbChevronRight,
} from 'react-icons/tb';
import { useEffect, useState } from 'react';
import type { Project } from '../types/types';

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const open = project !== null;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Reset the lightbox whenever a different project is opened/closed
  useEffect(() => {
    setLightboxIndex(null);
  }, [project]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') stepLightbox(1);
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        return;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, lightboxIndex, project]);

  function stepLightbox(delta: number) {
    if (!project || lightboxIndex === null) return;
    const total = project.previewMedia.length;
    setLightboxIndex((lightboxIndex + delta + total) % total);
  }

  return (
    <AnimatePresence>
      {open && project && (
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
            className="bg-card rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-border relative"
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

            <div className="p-6 md:p-8">
              <span className="inline-block text-xs font-medium text-ink-muted border border-border rounded-full px-3 py-1 mb-3">
                {project.category}
              </span>
              <h3 className="font-display text-xl text-ink mb-3">
                {project.title}
              </h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-5">
                {project.narrative}
              </p>

              {project.previewMedia.length > 0 && (
                <div className="mb-5">
                  <p className="text-ink-muted text-xs mb-2">Preview</p>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {project.previewMedia.map((item, i) =>
                      item.type === 'video' ? (
                        <button
                          key={item.url}
                          type="button"
                          onClick={() => setLightboxIndex(i)}
                          className="w-64 shrink-0 aspect-video rounded-lg border border-border overflow-hidden cursor-zoom-in"
                        >
                          <video
                            src={item.url}
                            muted
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </button>
                      ) : (
                        <button
                          key={item.url}
                          type="button"
                          onClick={() => setLightboxIndex(i)}
                          className="w-64 shrink-0 aspect-video rounded-lg border border-border overflow-hidden cursor-zoom-in"
                        >
                          <img
                            src={item.url}
                            alt={`${project.title} preview ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                          />
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

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

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-ink text-card text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <TbBrandGithub className="text-base" />
                  View on GitHub
                </a>
              )}
            </div>
          </motion.div>

          {/* Fullscreen lightbox for preview media */}
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(null);
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(null);
                  }}
                  aria-label="Close preview"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/10 border border-card/30 flex items-center justify-center text-card hover:bg-card/20 transition-colors"
                >
                  <TbX className="text-xl" />
                </button>

                {project.previewMedia.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        stepLightbox(-1);
                      }}
                      aria-label="Previous preview"
                      className="absolute left-3 md:left-6 w-10 h-10 rounded-full bg-card/10 border border-card/30 flex items-center justify-center text-card hover:bg-card/20 transition-colors"
                    >
                      <TbChevronLeft className="text-xl" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        stepLightbox(1);
                      }}
                      aria-label="Next preview"
                      className="absolute right-3 md:right-6 w-10 h-10 rounded-full bg-card/10 border border-card/30 flex items-center justify-center text-card hover:bg-card/20 transition-colors"
                    >
                      <TbChevronRight className="text-xl" />
                    </button>
                  </>
                )}

                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-[90vw] max-h-[85vh]"
                >
                  {project.previewMedia[lightboxIndex].type === 'video' ? (
                    <video
                      src={project.previewMedia[lightboxIndex].url}
                      controls
                      autoPlay
                      className="max-w-[90vw] max-h-[85vh] rounded-lg"
                    />
                  ) : (
                    <img
                      src={project.previewMedia[lightboxIndex].url}
                      alt={`${project.title} preview ${lightboxIndex + 1}`}
                      className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
