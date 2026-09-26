import { useEffect, useState } from 'react';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg/85 backdrop-blur-sm border-b border-border">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#about"
          className="font-display text-lg text-ink tracking-tight"
        >
          Aldi Putra
        </a>
        <ul className="flex gap-6">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`text-sm transition-colors ${
                  active === s.id
                    ? 'text-accent font-medium'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
