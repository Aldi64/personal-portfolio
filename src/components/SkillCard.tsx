import type { ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TbCode } from 'react-icons/tb';

interface SkillCardProps {
  label: string;
  skills: string[];
  iconFor: (name: string) => ReactNode;
  index?: number; // stagger the scroll-in
}

export default function SkillCard({
  label,
  skills,
  iconFor,
  index = 0,
}: SkillCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 100);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    // Outer wrapper handles scroll-in so it doesn't fight the tilt transform
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 800,
          transformStyle: 'preserve-3d',
        }}
        className="h-full rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent shrink-0 leading-tight wrap-break-word" />
          <h3 className="font-display text-base text-ink">{label}</h3>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {skills.map((name) => (
            <div
              key={name}
              className="group flex flex-col items-center gap-2 rounded-lg min-w-0 border border-border/60 bg-bg/60 p-3 transition-colors duration-300 hover:border-border-strong"
            >
              <div className="flex h-8 w-8 items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110">
                {iconFor(name) ?? <TbCode className="text-ink-muted" />}
              </div>
              <span className="text-center text-xs font-medium text-ink-soft group-hover:text-ink transition-colors leading-tight WRAP-break-word">
                {name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
