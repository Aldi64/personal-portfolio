import { motion } from 'framer-motion';
import {
  PiWrenchDuotone,
  PiFilmStripDuotone,
  PiMusicNotesDuotone,
  PiCpuDuotone,
} from 'react-icons/pi';
import {
  GiChessKnight,
  GiLightBulb,
  GiBroadsword,
  GiCompass,
} from 'react-icons/gi';

// ─── Custom atmospheric illustrations (no external photos / IP) ────────────

function GamingArt() {
  return (
    <svg
      viewBox="0 0 400 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="g-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1040" />
          <stop offset="100%" stopColor="#06091a" />
        </linearGradient>
        <radialGradient id="g-glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="180" fill="url(#g-bg)" />
      {/* desk */}
      <rect x="0" y="150" width="400" height="30" fill="#0d0820" />
      {/* monitor */}
      <rect
        x="120"
        y="35"
        width="160"
        height="100"
        rx="4"
        fill="#0a0e1a"
        stroke="#7c3aed"
        strokeWidth="1"
        opacity="0.8"
      />
      <rect x="128" y="42" width="144" height="86" fill="#0d1117" />
      {/* screen content glow */}
      <rect x="128" y="42" width="144" height="86" fill="url(#g-glow1)" />
      <rect x="138" y="55" width="60" height="6" fill="#7c3aed" opacity="0.7" />
      <rect
        x="138"
        y="68"
        width="100"
        height="6"
        fill="#06b6d4"
        opacity="0.6"
      />
      <rect x="138" y="81" width="80" height="6" fill="#a855f7" opacity="0.6" />
      <rect
        x="138"
        y="100"
        width="124"
        height="20"
        fill="#7c3aed"
        opacity="0.15"
        rx="2"
      />
      {/* monitor stand */}
      <rect x="190" y="135" width="20" height="10" fill="#1e1b4b" />
      <rect x="170" y="145" width="60" height="4" fill="#1e1b4b" />
      {/* keyboard */}
      <rect
        x="130"
        y="155"
        width="100"
        height="18"
        rx="2"
        fill="#1e1b4b"
        stroke="#7c3aed"
        strokeWidth="0.5"
        opacity="0.7"
      />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect
          key={i}
          x={135 + i * 9}
          y="159"
          width="6"
          height="6"
          fill="#312e81"
          rx="1"
        />
      ))}
      {/* mouse */}
      <ellipse
        cx="250"
        cy="163"
        rx="8"
        ry="12"
        fill="#1e1b4b"
        stroke="#06b6d4"
        strokeWidth="0.5"
        opacity="0.8"
      />
      {/* headphones hanging left */}
      <path
        d="M60 60 Q60 30 90 30 Q120 30 120 60"
        stroke="#7c3aed"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
      <rect x="52" y="55" width="14" height="22" rx="6" fill="#312e81" />
      <rect x="114" y="55" width="14" height="22" rx="6" fill="#312e81" />
      {/* ambient glow orbs */}
      <circle cx="330" cy="50" r="40" fill="url(#g-glow1)" />
      <circle cx="50" cy="120" r="30" fill="#a855f7" opacity="0.08" />
    </svg>
  );
}

function ModelKitArt() {
  return (
    <svg
      viewBox="0 0 400 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="m-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1410" />
          <stop offset="100%" stopColor="#0a0805" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#m-bg)" />
      {/* workbench surface */}
      <rect x="0" y="140" width="400" height="40" fill="#120e0a" />
      <line
        x1="0"
        y1="140"
        x2="400"
        y2="140"
        stroke="#7c3aed"
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* model figure (abstract robot silhouette, generic — not branded) */}
      <g transform="translate(190, 30)">
        {/* head */}
        <rect
          x="10"
          y="0"
          width="20"
          height="18"
          rx="3"
          fill="#3f3a52"
          stroke="#7c3aed"
          strokeWidth="0.5"
        />
        <rect x="14" y="6" width="5" height="3" fill="#06b6d4" opacity="0.8" />
        <rect x="21" y="6" width="5" height="3" fill="#06b6d4" opacity="0.8" />
        {/* torso */}
        <path
          d="M0 18 L40 18 L36 65 L4 65 Z"
          fill="#4b4566"
          stroke="#7c3aed"
          strokeWidth="0.5"
        />
        <rect
          x="14"
          y="28"
          width="12"
          height="14"
          fill="#312e81"
          opacity="0.6"
        />
        {/* shoulders */}
        <rect
          x="-12"
          y="16"
          width="14"
          height="16"
          rx="3"
          fill="#3f3a52"
          stroke="#7c3aed"
          strokeWidth="0.5"
        />
        <rect
          x="38"
          y="16"
          width="14"
          height="16"
          rx="3"
          fill="#3f3a52"
          stroke="#7c3aed"
          strokeWidth="0.5"
        />
        {/* arms */}
        <rect
          x="-10"
          y="32"
          width="9"
          height="28"
          fill="#4b4566"
          stroke="#7c3aed"
          strokeWidth="0.4"
        />
        <rect
          x="41"
          y="32"
          width="9"
          height="28"
          fill="#4b4566"
          stroke="#7c3aed"
          strokeWidth="0.4"
        />
        {/* legs */}
        <rect
          x="6"
          y="65"
          width="12"
          height="34"
          fill="#3f3a52"
          stroke="#7c3aed"
          strokeWidth="0.4"
        />
        <rect
          x="22"
          y="65"
          width="12"
          height="34"
          fill="#3f3a52"
          stroke="#7c3aed"
          strokeWidth="0.4"
        />
        {/* feet */}
        <rect x="3" y="99" width="18" height="7" rx="1" fill="#2d2a3d" />
        <rect x="19" y="99" width="18" height="7" rx="1" fill="#2d2a3d" />
      </g>

      {/* tool: knife */}
      <g transform="translate(60, 110) rotate(-20)">
        <rect x="0" y="0" width="50" height="4" fill="#94a3b8" />
        <rect x="-18" y="-3" width="20" height="10" rx="2" fill="#1e1b4b" />
      </g>
      {/* paint bottles */}
      <rect
        x="320"
        y="105"
        width="14"
        height="22"
        rx="2"
        fill="#7c3aed"
        opacity="0.7"
      />
      <rect x="324" y="100" width="6" height="6" fill="#a855f7" />
      <rect
        x="345"
        y="100"
        width="14"
        height="27"
        rx="2"
        fill="#06b6d4"
        opacity="0.7"
      />
      <rect x="349" y="95" width="6" height="6" fill="#22d3ee" />

      {/* sprue / parts tray */}
      <rect
        x="80"
        y="118"
        width="70"
        height="18"
        rx="2"
        fill="#1e1b4b"
        opacity="0.5"
        stroke="#7c3aed"
        strokeWidth="0.4"
      />
      <circle cx="92" cy="127" r="3" fill="#94a3b8" opacity="0.6" />
      <circle cx="105" cy="127" r="3" fill="#94a3b8" opacity="0.6" />
      <circle cx="118" cy="127" r="3" fill="#94a3b8" opacity="0.6" />

      {/* warm spotlight */}
      <ellipse
        cx="210"
        cy="50"
        rx="120"
        ry="80"
        fill="#f59e0b"
        opacity="0.04"
      />
    </svg>
  );
}

function AnimeArt() {
  return (
    <svg
      viewBox="0 0 400 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="a-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="60%" stopColor="#3730a3" />
          <stop offset="100%" stopColor="#0c0a1f" />
        </linearGradient>
        <radialGradient id="a-moon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <rect width="400" height="180" fill="url(#a-sky)" />
      {/* stars */}
      {Array.from({ length: 25 }).map((_, i) => (
        <circle
          key={i}
          cx={(i * 37) % 400}
          cy={(i * 53) % 100}
          r={i % 3 === 0 ? 1.4 : 0.7}
          fill="#fff"
          opacity={0.3 + (i % 5) * 0.12}
        />
      ))}
      {/* moon */}
      <circle cx="320" cy="40" r="22" fill="url(#a-moon)" />
      {/* clouds */}
      <ellipse cx="100" cy="55" rx="60" ry="14" fill="#a855f7" opacity="0.15" />
      <ellipse cx="250" cy="75" rx="80" ry="16" fill="#06b6d4" opacity="0.1" />

      {/* city skyline silhouette */}
      <rect x="0" y="120" width="40" height="60" fill="#0c0a1f" />
      <rect x="40" y="100" width="30" height="80" fill="#0c0a1f" />
      <rect x="70" y="130" width="25" height="50" fill="#0c0a1f" />
      <rect x="290" y="110" width="35" height="70" fill="#0c0a1f" />
      <rect x="325" y="95" width="28" height="85" fill="#0c0a1f" />
      <rect x="353" y="125" width="47" height="55" fill="#0c0a1f" />
      {/* lit windows */}
      <rect x="48" y="115" width="4" height="6" fill="#06b6d4" opacity="0.6" />
      <rect x="58" y="130" width="4" height="6" fill="#a855f7" opacity="0.6" />
      <rect x="300" y="125" width="4" height="6" fill="#06b6d4" opacity="0.5" />
      <rect x="335" y="115" width="4" height="6" fill="#fbbf24" opacity="0.5" />

      {/* lone figure silhouette, looking up at sky */}
      <g transform="translate(175, 130)">
        <ellipse cx="15" cy="8" rx="8" ry="9" fill="#06091a" />
        <path d="M5 16 Q5 40 0 50 L30 50 Q25 40 25 16 Z" fill="#06091a" />
        <rect x="2" y="48" width="9" height="2" fill="#06091a" />
        <rect x="19" y="48" width="9" height="2" fill="#06091a" />
      </g>

      {/* ambient glow */}
      <ellipse
        cx="200"
        cy="90"
        rx="180"
        ry="50"
        fill="#7c3aed"
        opacity="0.05"
      />
    </svg>
  );
}

function MusicArt() {
  return (
    <svg
      viewBox="0 0 700 130"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="mu-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1040" />
          <stop offset="100%" stopColor="#06091a" />
        </linearGradient>
      </defs>
      <rect width="700" height="130" fill="url(#mu-bg)" />

      {/* waveform */}
      <g opacity="0.8">
        {Array.from({ length: 60 }).map((_, i) => {
          const h = 8 + Math.abs(Math.sin(i * 0.4)) * 50 + (i % 7) * 4;
          const colors = ['#7c3aed', '#06b6d4', '#a855f7'];
          return (
            <rect
              key={i}
              x={20 + i * 11}
              y={65 - h / 2}
              width="5"
              height={h}
              rx="2"
              fill={colors[i % 3]}
              opacity={0.5 + (i % 4) * 0.1}
            />
          );
        })}
      </g>

      {/* keyboard at bottom */}
      <rect x="0" y="100" width="700" height="30" fill="#0d0820" />
      {Array.from({ length: 40 }).map((_, i) => (
        <rect
          key={i}
          x={i * 17.5}
          y="100"
          width="16"
          height="28"
          fill={
            i % 7 === 2 || i % 7 === 4 || i % 7 === 6 ? '#1e1b4b' : '#e2e8f0'
          }
          opacity={i % 7 === 2 || i % 7 === 4 || i % 7 === 6 ? 1 : 0.85}
          stroke="#06091a"
          strokeWidth="0.5"
        />
      ))}

      {/* headphones top right */}
      <g transform="translate(600, 15)">
        <path
          d="M0 30 Q0 0 35 0 Q70 0 70 30"
          stroke="#a855f7"
          strokeWidth="3"
          fill="none"
          opacity="0.7"
        />
        <rect x="-8" y="25" width="16" height="24" rx="7" fill="#312e81" />
        <rect x="62" y="25" width="16" height="24" rx="7" fill="#312e81" />
      </g>
    </svg>
  );
}

function TechArt() {
  return (
    <svg
      viewBox="0 0 700 130"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="t-bg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0c0a1f" />
          <stop offset="100%" stopColor="#1e1040" />
        </linearGradient>
      </defs>
      <rect width="700" height="130" fill="url(#t-bg)" />

      {/* circuit-like grid lines */}
      <g opacity="0.15" stroke="#7c3aed" strokeWidth="1">
        <line x1="0" y1="30" x2="700" y2="30" />
        <line x1="0" y1="65" x2="700" y2="65" />
        <line x1="0" y1="100" x2="700" y2="100" />
        <line x1="120" y1="0" x2="120" y2="130" />
        <line x1="350" y1="0" x2="350" y2="130" />
        <line x1="560" y1="0" x2="560" y2="130" />
      </g>
      {/* circuit nodes */}
      {[
        [120, 30],
        [350, 65],
        [560, 100],
        [120, 100],
        [350, 30],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          fill={i % 2 === 0 ? '#06b6d4' : '#a855f7'}
          opacity="0.8"
        />
      ))}

      {/* dual monitors */}
      <g transform="translate(180, 25)">
        <rect
          x="0"
          y="0"
          width="140"
          height="80"
          rx="3"
          fill="#0a0e1a"
          stroke="#7c3aed"
          strokeWidth="1"
        />
        <rect x="6" y="6" width="128" height="68" fill="#0d1117" />
        <rect
          x="14"
          y="14"
          width="50"
          height="5"
          fill="#06b6d4"
          opacity="0.7"
        />
        <rect
          x="14"
          y="24"
          width="90"
          height="5"
          fill="#a855f7"
          opacity="0.6"
        />
        <rect
          x="14"
          y="34"
          width="70"
          height="5"
          fill="#7c3aed"
          opacity="0.6"
        />
        <rect
          x="14"
          y="50"
          width="112"
          height="18"
          fill="#06b6d4"
          opacity="0.12"
          rx="2"
        />
      </g>
      <g transform="translate(330, 35)">
        <rect
          x="0"
          y="0"
          width="120"
          height="68"
          rx="3"
          fill="#0a0e1a"
          stroke="#a855f7"
          strokeWidth="1"
        />
        <rect x="6" y="6" width="108" height="56" fill="#0d1117" />
        <rect
          x="12"
          y="13"
          width="40"
          height="4"
          fill="#a855f7"
          opacity="0.7"
        />
        <rect
          x="12"
          y="22"
          width="80"
          height="4"
          fill="#06b6d4"
          opacity="0.6"
        />
        <rect
          x="12"
          y="31"
          width="60"
          height="4"
          fill="#7c3aed"
          opacity="0.6"
        />
      </g>

      {/* monitor stand bases */}
      <rect x="240" y="105" width="20" height="6" fill="#1e1b4b" />
      <rect x="375" y="103" width="16" height="5" fill="#1e1b4b" />
    </svg>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────
interface Hobby {
  num: string;
  title: string;
  desc: string;
  traits: string[];
  color: string;
  Art: React.ComponentType;
  Badge: React.ComponentType<{ size?: number; color?: string }>;
  size: 'half' | 'full';
}

const hobbies: Hobby[] = [
  {
    num: '01',
    title: 'Gaming',
    desc: 'From JRPGs to strategy games. Gaming improves my problem-solving, decision-making, and perseverance.',
    traits: ['Strategy', 'RPG', 'Problem-Solving', 'Focus'],
    color: '#06b6d4',
    Art: GamingArt,
    Badge: GiCompass,
    size: 'half',
  },
  {
    num: '02',
    title: 'Gunpla & Model Kits',
    desc: 'Building model kits teaches me patience, precision, and attention to detail — the same mindset I apply when coding.',
    traits: ['Precision', 'Patience', 'Detail-Oriented'],
    color: '#a855f7',
    Art: ModelKitArt,
    Badge: PiWrenchDuotone,
    size: 'half',
  },
  {
    num: '03',
    title: 'Anime & Movies',
    desc: 'Stories and characters inspire me. I enjoy narratives that challenge perspectives and spark creativity.',
    traits: ['Storytelling', 'Creativity', 'Inspiration', 'Emotion'],
    color: '#3b82f6',
    Art: AnimeArt,
    Badge: PiFilmStripDuotone,
    size: 'half',
  },
  {
    num: '04',
    title: 'Music',
    desc: 'I listen, analyze, and create. Music helps me understand rhythm, structure, and flow — useful in UI/UX and animation timing.',
    traits: ['Rhythm', 'Flow', 'Emotional Intelligence'],
    color: '#a855f7',
    Art: MusicArt,
    Badge: PiMusicNotesDuotone,
    size: 'full',
  },
  {
    num: '05',
    title: 'Tech Exploration',
    desc: 'Always curious about new tools, frameworks, and technologies. I love learning and building side projects to explore ideas.',
    traits: ['Curiosity', 'Learning', 'Adaptability', 'Innovation'],
    color: '#06b6d4',
    Art: TechArt,
    Badge: PiCpuDuotone,
    size: 'full',
  },
];

const lessons = [
  {
    Icon: GiChessKnight,
    title: 'Discipline',
    desc: 'Consistency and dedication lead to growth.',
  },
  {
    Icon: GiLightBulb,
    title: 'Creativity',
    desc: 'Thinking differently to build unique solutions.',
  },
  {
    Icon: GiBroadsword,
    title: 'Problem Solving',
    desc: 'Every challenge is a new level to beat.',
  },
  {
    Icon: GiCompass,
    title: 'Perspective',
    desc: 'Stories, games, and music shape how I see the world.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Hobbies() {
  const halfCards = hobbies.filter((h) => h.size === 'half');
  const fullCards = hobbies.filter((h) => h.size === 'full');

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* ── Header row ── */}
      <motion.div
        variants={item}
        className="flex items-start justify-between gap-6 flex-wrap"
      >
        <div>
          <div
            className="font-mono-rpg text-xs tracking-widest mb-2"
            style={{ color: 'var(--accent-cyan)' }}
          >
            // INTERESTS &amp; HOBBIES
          </div>
          <h1
            className="font-display text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Beyond the Code
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            The skills I build outside of work make me a better developer inside
            of it.
          </p>
        </div>

        {/* Quote card */}
        <div
          className="glass-card rounded-xl px-5 py-4 max-w-xs relative"
          style={{ border: '1px dashed rgba(124,58,237,0.4)' }}
        >
          <div
            className="text-xl leading-none mb-1.5"
            style={{ color: 'var(--accent-purple)', fontFamily: 'serif' }}
          >
            "
          </div>
          <p
            className="font-mono-rpg text-xs leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {'>'} Life is a game.
            <br />
            Keep playing, keep building.
          </p>
          <div
            className="text-xs text-right mt-2"
            style={{ color: 'var(--accent-purple)' }}
          >
            — Aldi Putra
          </div>
        </div>
      </motion.div>

      {/* ── 3-col half cards ── */}
      <div className="grid md:grid-cols-3 gap-5">
        {halfCards.map((hobby) => (
          <motion.div
            key={hobby.title}
            variants={item}
            className="glass-card rounded-2xl overflow-hidden relative group"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ border: '1px solid rgba(124,58,237,0.2)' }}
          >
            {/* Art header */}
            <div className="relative" style={{ height: 130 }}>
              <hobby.Art />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(6,9,18,0.95) 100%)',
                }}
              />
              {/* badge icon, bottom right */}
              <div
                className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(6,9,18,0.7)',
                  border: `1px solid ${hobby.color}60`,
                }}
              >
                <hobby.Badge size={16} color={hobby.color} />
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono-rpg text-xs"
                  style={{ color: hobby.color }}
                >
                  {hobby.num}
                </span>
                <h3
                  className="font-mono-rpg text-xs font-bold tracking-widest"
                  style={{ color: hobby.color }}
                >
                  {hobby.title.toUpperCase()}
                </h3>
              </div>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                {hobby.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {hobby.traits.map((trait) => (
                  <span
                    key={trait}
                    className="font-mono-rpg text-xs px-2 py-0.5 rounded"
                    style={{
                      background: `${hobby.color}15`,
                      color: hobby.color,
                      border: `1px solid ${hobby.color}30`,
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── 2-col full-width cards ── */}
      <div className="grid md:grid-cols-2 gap-5">
        {fullCards.map((hobby) => (
          <motion.div
            key={hobby.title}
            variants={item}
            className="glass-card rounded-2xl overflow-hidden relative group"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ border: '1px solid rgba(124,58,237,0.2)' }}
          >
            <div className="relative" style={{ height: 100 }}>
              <hobby.Art />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(6,9,18,0.95) 100%)',
                }}
              />
              <div
                className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(6,9,18,0.7)',
                  border: `1px solid ${hobby.color}60`,
                }}
              >
                <hobby.Badge size={16} color={hobby.color} />
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono-rpg text-xs"
                  style={{ color: hobby.color }}
                >
                  {hobby.num}
                </span>
                <h3
                  className="font-mono-rpg text-xs font-bold tracking-widest"
                  style={{ color: hobby.color }}
                >
                  {hobby.title.toUpperCase()}
                </h3>
              </div>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                {hobby.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {hobby.traits.map((trait) => (
                  <span
                    key={trait}
                    className="font-mono-rpg text-xs px-2 py-0.5 rounded"
                    style={{
                      background: `${hobby.color}15`,
                      color: hobby.color,
                      border: `1px solid ${hobby.color}30`,
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── What these hobbies teach me ── */}
      <motion.div
        variants={item}
        className="glass-card rounded-2xl p-6 relative"
        style={{ border: '1px dashed rgba(124,58,237,0.3)' }}
      >
        <div className="flex items-center gap-2 mb-5">
          <span style={{ color: 'var(--accent-purple)' }}>★</span>
          <span
            className="font-mono-rpg text-xs tracking-widest"
            style={{ color: 'var(--accent-purple)' }}
          >
            WHAT THESE HOBBIES TEACH ME
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {lessons.map((l) => (
            <div key={l.title} className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.3)',
                }}
              >
                <l.Icon size={18} color="var(--accent-purple)" />
              </div>
              <div>
                <div
                  className="text-sm font-semibold mb-0.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {l.title}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {l.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
