import { useEffect, useId, useRef, type MouseEvent } from 'react';
import './GooeyNav.css';

export interface GooeyNavItem {
  label: string;
  href: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  /** Controlled: which item is active (driven by scroll position in Nav). */
  activeIndex: number;
  onItemClick?: (index: number, e: MouseEvent<HTMLAnchorElement>) => void;
  vertical?: boolean;
  className?: string;
  ariaLabel?: string;
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
}

const noise = (n = 1) => n / 2 - Math.random() * n;

const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
};

export default function GooeyNav({
  items,
  activeIndex,
  onItemClick,
  vertical = false,
  className = '',
  ariaLabel = 'Primary',
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const prevIndexRef = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const filterId = 'gooey-' + useId().replace(/[^a-zA-Z0-9]/g, '');

  const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number,
  ) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, particleDistances, particleR);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty(
          '--color',
          `var(--gooey-${p.color}, var(--gooey-1))`,
        );
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          particle.remove();
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    const container = containerRef.current;
    const filter = filterRef.current;
    const text = textRef.current;
    if (!container || !filter || !text) return;

    const c = container.getBoundingClientRect();
    const p = element.getBoundingClientRect();
    const styles = {
      left: `${p.x - c.x}px`,
      top: `${p.y - c.y}px`,
      width: `${p.width}px`,
      height: `${p.height}px`,
    };
    Object.assign(filter.style, styles);
    Object.assign(text.style, styles);
    text.innerText = element.innerText;
  };

  // Move the effect to the active item; play the burst when the index changes.
  useEffect(() => {
    activeIndexRef.current = activeIndex;
    const container = containerRef.current;
    const filter = filterRef.current;
    const text = textRef.current;
    const li = navRef.current?.querySelectorAll('li')[activeIndex] as
      | HTMLElement
      | undefined;
    if (!container || !filter || !text || !li) return;

    updateEffectPosition(li);

    const isFirstRun = prevIndexRef.current === null;
    const changed = prevIndexRef.current !== activeIndex;
    prevIndexRef.current = activeIndex;

    if (isFirstRun || !changed) {
      text.classList.add('active');
      return;
    }

    // Skip when hidden (display: none) or when the user prefers less motion.
    if (container.offsetWidth === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    filter.querySelectorAll('.particle').forEach((el) => el.remove());

    text.classList.remove('active');
    void text.offsetWidth;
    text.classList.add('active');

    makeParticles(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Keep the effect aligned when the container resizes (fonts, breakpoints).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      const li = navRef.current?.querySelectorAll('li')[
        activeIndexRef.current
      ] as HTMLElement | undefined;
      if (li) updateEffectPosition(li);
    });
    ro.observe(container);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`gooey-nav-container${vertical ? ' vertical' : ''} ${className}`}
      ref={containerRef}
    >
      {/* Alpha-threshold "gooey" filter: keeps the real colors on any background */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute' }}
      >
        <defs>
          <filter
            id={filterId}
            filterUnits="userSpaceOnUse"
            x="-200"
            y="-200"
            width="900"
            height="600"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>

      <nav aria-label={ariaLabel}>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={item.href}
              className={activeIndex === index ? 'active' : ''}
            >
              <a
                href={item.href}
                aria-current={activeIndex === index ? 'location' : undefined}
                onClick={(e) => onItemClick?.(index, e)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span
        className="effect filter"
        ref={filterRef}
        style={{ filter: `url(#${filterId})` }}
      />
      <span className="effect text" ref={textRef} aria-hidden="true" />
    </div>
  );
}
