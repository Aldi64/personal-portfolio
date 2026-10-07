import { useEffect, useRef, useState } from 'react';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { client, urlFor } from '../lib/sanity';
import type { Certification } from '../types/types';

const QUERY = `*[_type == "certification"] | order(coalesce(order, 999) asc, _createdAt asc) {
  name,
  issuer,
  image
}`;

// Slide width drives the whole carousel (container, slides, translate step)
const SLIDE = 'w-[min(88vw,760px)] aspect-[3/2]';

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

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

  function go(newIndex: number) {
    setIndex((newIndex + certifications.length) % certifications.length);
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx < -50) go(index + 1);
    else if (dx > 50) go(index - 1);
  }

  if (loading) {
    return (
      <div>
        <h3 className="text-ink text-sm font-medium mb-5">Certifications</h3>
        <div
          className={`${SLIDE} mx-auto bg-surface rounded-lg animate-pulse`}
        />
      </div>
    );
  }

  if (certifications.length === 0) {
    return (
      <div>
        <h3 className="text-ink text-sm font-medium mb-5">Certifications</h3>
        <p className="text-ink-soft text-sm">No certifications added yet.</p>
      </div>
    );
  }

  const current = certifications[index];

  return (
    <div>
      <h3 className="text-ink text-sm font-medium mb-5">Certifications</h3>

      <div
        className="overflow-hidden py-4"
        role="region"
        aria-roledescription="carousel"
        aria-label="Certifications"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <div className={`relative mx-auto ${SLIDE}`}>
          <ul
            className="absolute top-0 left-0 flex -mx-3 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * (100 / certifications.length)}%)`,
            }}
          >
            {certifications.map((c, i) => (
              <li
                key={c.name}
                aria-label={c.name}
                onClick={() => i !== index && go(i)}
                className={`shrink-0 mx-3 ${SLIDE} [perspective:1200px] ${
                  i === index ? '' : 'cursor-pointer'
                }`}
              >
                <div
                  className="h-full w-full overflow-hidden rounded-lg border border-border bg-surface"
                  style={{
                    transform:
                      i === index
                        ? 'scale(1) rotateX(0deg)'
                        : 'scale(0.98) rotateX(8deg)',
                    transformOrigin: 'bottom',
                    opacity: i === index ? 1 : 0.5,
                    transition:
                      'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s',
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    draggable={false}
                    className="h-full w-full object-contain select-none"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-2">
        <div className="text-center">
          <p className="text-ink text-sm font-medium">{current.name}</p>
          <p className="text-ink-muted text-xs">{current.issuer}</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous certificate"
            className="hidden md:flex w-10 h-10 rounded-full border border-border items-center justify-center text-ink-muted hover:text-ink hover:border-border-strong transition-colors shrink-0"
          >
            <TbChevronLeft />
          </button>

          <div className="flex gap-1.5">
            {certifications.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to certificate ${i + 1}`}
                onClick={() => go(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? 'bg-accent' : 'bg-border-strong'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(index + 1)}
            aria-label="Next certificate"
            className="hidden md:flex w-10 h-10 rounded-full border border-border items-center justify-center text-ink-muted hover:text-ink hover:border-border-strong transition-colors shrink-0"
          >
            <TbChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
