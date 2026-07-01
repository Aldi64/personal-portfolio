import { motion } from 'framer-motion';

// ─── Photo placeholder (pixel-toned portrait, not a generic sprite) ────────
function PhotoPortrait() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="dp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0a22" />
          <stop offset="100%" stopColor="#050208" />
        </linearGradient>
        <radialGradient id="dp-glow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ff2d8a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff2d8a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="120" height="120" fill="url(#dp-bg)" />
      <rect width="120" height="120" fill="url(#dp-glow)" />
      {/* shoulders */}
      <path
        d="M14 120 Q14 90 35 82 Q60 74 85 82 Q106 90 106 120Z"
        fill="#1c0f2e"
      />
      {/* neck */}
      <rect x="50" y="68" width="20" height="18" rx="3" fill="#3a2050" />
      {/* head */}
      <ellipse cx="60" cy="50" rx="26" ry="28" fill="#3a2050" />
      {/* hair */}
      <path
        d="M34 46 Q30 18 60 16 Q90 18 86 46 Q86 36 78 34 Q76 28 60 28 Q44 28 42 34 Q34 36 34 46Z"
        fill="#0d0810"
      />
      {/* eyes */}
      <ellipse cx="50" cy="50" rx="3.2" ry="3.6" fill="#050208" />
      <ellipse cx="70" cy="50" rx="3.2" ry="3.6" fill="#050208" />
      <circle cx="51.2" cy="48.8" r="1" fill="#00e5ff" opacity="0.8" />
      <circle cx="71.2" cy="48.8" r="1" fill="#00e5ff" opacity="0.8" />
      {/* brow */}
      <path
        d="M45 43 Q50 40 55 43"
        stroke="#0d0810"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M65 43 Q70 40 75 43"
        stroke="#0d0810"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* mouth */}
      <path
        d="M52 62 Q60 67 68 62"
        stroke="#1c0f2e"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* rim light */}
      <path
        d="M34 46 Q30 70 40 86"
        stroke="#ff2d8a"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M86 46 Q90 70 80 86"
        stroke="#00e5ff"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

// ─── Stat bar (filled progress, matches reference image) ───────────────────
interface StatBarProps {
  label: string;
  value: number; // 0-100
  color: string;
}

function StatBar({ label, value, color }: StatBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs flex-shrink-0"
        style={{ color: 'var(--text-primary)', minWidth: 130 }}
      >
        {label}
      </span>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{
          height: 8,
          background: 'rgba(255,45,138,0.12)',
          border: '1px solid rgba(255,45,138,0.2)',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, #00e5ff)`,
            boxShadow: `0 0 8px ${color}90`,
          }}
        />
      </div>
    </div>
  );
}

const stats: StatBarProps[] = [
  { label: 'Problem Solving', value: 85, color: '#ff2d8a' },
  { label: 'Frontend Dev', value: 80, color: '#ff5cad' },
  { label: 'Backend Dev', value: 65, color: '#ff2d8a' },
  { label: 'Programming', value: 78, color: '#ff4f9e' },
  { label: 'Game Development', value: 25, color: '#ff5cad' },
  { label: 'UI / UX Design', value: 60, color: '#ff2d8a' },
];

const ticker = [
  'Defeated Final Year Thesis Boss!',
  'Shipped First Indie Game Prototype!',
  'Learned New Skill: ASP.NET Core!',
  'Leveled Up to Level 22!',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-5"
    >
      {/* ── Terminal window ── */}
      <motion.div
        variants={item}
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,45,138,0.4)',
          boxShadow: '0 0 40px rgba(255,45,138,0.15)',
          background: 'rgba(10,5,15,0.92)',
        }}
      >
        {/* Faint scanline grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,45,138,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Title bar */}
        <div
          className="relative flex items-center justify-between px-4 py-2.5"
          style={{
            background: 'rgba(255,45,138,0.08)',
            borderBottom: '1px solid rgba(255,45,138,0.3)',
          }}
        >
          <div
            className="flex items-center gap-2 font-mono-rpg text-xs"
            style={{ color: 'var(--accent-purple)', letterSpacing: '0.1em' }}
          >
            <span>▣</span> TERMINAL
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm flex items-center justify-center"
              style={{
                border: '1px solid rgba(0,229,255,0.5)',
                fontSize: 8,
                color: 'var(--accent-cyan)',
              }}
            >
              —
            </span>
            <span
              className="w-3 h-3 rounded-sm"
              style={{ border: '1px solid rgba(0,229,255,0.5)' }}
            />
            <span
              className="w-3 h-3 rounded-sm flex items-center justify-center"
              style={{
                background: 'rgba(255,45,138,0.8)',
                fontSize: 8,
                color: '#fff',
              }}
            >
              ✕
            </span>
          </div>
        </div>

        <div className="relative p-7">
          <div className="grid md:grid-cols-[auto_1fr_auto] gap-7">
            {/* ── Photo + name + bio ── */}
            <div className="flex gap-5" style={{ gridColumn: 'span 2' }}>
              {/* Photo */}
              <div
                className="flex-shrink-0 rounded-xl overflow-hidden"
                style={{
                  width: 110,
                  height: 110,
                  border: '2px solid rgba(255,45,138,0.5)',
                  boxShadow: '0 0 20px rgba(255,45,138,0.3)',
                }}
              >
                <PhotoPortrait />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="font-mono-rpg text-xs tracking-widest mb-1"
                  style={{ color: 'var(--accent-cyan)' }}
                >
                  PLAYER ONE
                </div>
                <h1
                  className="font-display font-black leading-none mb-3"
                  style={{ fontSize: '1.9rem', color: 'var(--text-primary)' }}
                >
                  ALDI
                  <br />
                  PUTRA
                </h1>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  I build software by day and games by night. Fresh IT graduate
                  from Indonesia, passionate about building clean, full-stack
                  web applications. On a side quest to ship my first indie game.
                </p>
              </div>
            </div>

            {/* ── Character sheet panel ── */}
            <div
              className="rounded-xl px-4 py-3 flex-shrink-0"
              style={{
                background: 'rgba(255,45,138,0.06)',
                border: '1px solid rgba(255,45,138,0.25)',
                minWidth: 170,
              }}
            >
              {[
                { label: 'CLASS', value: 'Full-Stack Dev' },
                { label: 'ORIGIN', value: 'Indonesia' },
                { label: 'STATUS', value: 'Seeking Role' },
                { label: 'LANG', value: 'ID / EN' },
                { label: 'XP', value: '4 yrs coding' },
              ].map((s, i, arr) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between py-1.5"
                  style={{
                    borderBottom:
                      i < arr.length - 1
                        ? '1px solid rgba(255,45,138,0.12)'
                        : 'none',
                  }}
                >
                  <span
                    className="font-mono-rpg"
                    style={{ fontSize: 10, color: 'var(--text-muted)' }}
                  >
                    {s.label}:
                  </span>
                  <span
                    className="text-xs font-semibold text-right"
                    style={{ color: 'var(--accent-cyan)' }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Current objective bar ── */}
          <div className="mt-6">
            <div
              className="font-mono-rpg text-xs tracking-widest mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              CURRENT OBJECTIVE
            </div>
            <div
              className="text-xs mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Land first software developer role &amp; begin Unity journey
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex-1 rounded-full overflow-hidden"
                style={{
                  height: 10,
                  background: 'rgba(255,45,138,0.1)',
                  border: '1px solid rgba(255,45,138,0.25)',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #ff2d8a, #00e5ff)',
                    boxShadow: '0 0 10px rgba(255,45,138,0.6)',
                  }}
                />
              </div>
              <span
                className="font-mono-rpg text-xs flex-shrink-0"
                style={{ color: 'var(--accent-purple)' }}
              >
                60%
              </span>
            </div>
          </div>

          {/* ── Character stats panel ── */}
          <div
            className="mt-6 rounded-xl p-5"
            style={{
              background: 'rgba(0,229,255,0.04)',
              border: '1px solid rgba(0,229,255,0.2)',
            }}
          >
            <div
              className="font-mono-rpg text-xs tracking-widest mb-4"
              style={{ color: 'var(--accent-cyan)' }}
            >
              CHARACTER STATS
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              {stats.map((stat) => (
                <StatBar key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* ── Quick info cards ── */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: 'EDUCATION', value: 'B.IT Graduate', icon: '🎓' },
              { label: 'EXPERIENCE', value: 'Fresh Graduate', icon: '📋' },
              { label: 'SIDE QUEST', value: 'Unity Dev', icon: '◆' },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-xl px-4 py-3.5 flex items-center gap-3"
                style={{
                  background: 'rgba(255,45,138,0.05)',
                  border: '1px solid rgba(255,45,138,0.2)',
                }}
              >
                <span
                  className="text-lg flex-shrink-0"
                  style={{ color: 'var(--accent-purple)' }}
                >
                  {card.icon}
                </span>
                <div>
                  <div
                    className="font-mono-rpg"
                    style={{
                      fontSize: 9,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {card.label}
                  </div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {card.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scrolling ticker footer ── */}
        <div
          className="relative overflow-hidden py-2.5"
          style={{
            background: 'rgba(255,45,138,0.1)',
            borderTop: '1px solid rgba(255,45,138,0.3)',
          }}
        >
          <motion.div
            className="flex gap-10 whitespace-nowrap font-mono-rpg text-xs"
            style={{ color: 'var(--accent-purple)' }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <span style={{ color: 'var(--accent-cyan)' }}>{'>>>'}</span> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
