import { useEffect, useRef, useState } from 'react';
import { TbMenu2, TbX } from 'react-icons/tb';
import GooeyNav from './GooeyNav';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const items = sections.map((s) => ({ label: s.label, href: `#${s.id}` }));

export default function Nav() {
  const [active, setActive] = useState('about');
  const [open, setOpen] = useState(false);
  // While a clicked link is smooth-scrolling, ignore the scroll observer so the
  // pill doesn't hop through every section on the way.
  const lockRef = useRef(false);
  const lockTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(
    () => () => {
      window.clearTimeout(lockTimer.current);
      window.clearTimeout(closeTimer.current);
    },
    [],
  );

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === active),
  );

  const handleItemClick = (index: number, closeMenu: boolean) => {
    setActive(sections[index].id);
    lockRef.current = true;
    window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => {
      lockRef.current = false;
    }, 1200);

    if (closeMenu) {
      // let the gooey burst play before the panel unmounts
      window.clearTimeout(closeTimer.current);
      closeTimer.current = window.setTimeout(() => setOpen(false), 450);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg/85 backdrop-blur-sm border-b border-border">
      <nav
        className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3"
        aria-label="Site"
      >
        <a
          href="#about"
          onClick={() => handleItemClick(0, false)}
          className="font-display text-lg text-ink tracking-tight"
        >
          Aldi Putra
        </a>

        {/* Desktop */}
        <div className="hidden md:block">
          <GooeyNav
            items={items}
            activeIndex={activeIndex}
            onItemClick={(i) => handleItemClick(i, false)}
            ariaLabel="Sections"
          />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden -mr-2 p-2 text-ink"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <TbX size={22} /> : <TbMenu2 size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border bg-bg/95 backdrop-blur-sm"
        >
          <div className="max-w-5xl mx-auto px-6 py-3">
            <GooeyNav
              vertical
              items={items}
              activeIndex={activeIndex}
              onItemClick={(i) => handleItemClick(i, true)}
              ariaLabel="Sections"
              particleCount={10}
              particleDistances={[60, 8]}
            />
          </div>
        </div>
      )}
    </header>
  );
}
