import { motion } from 'framer-motion';
import { useState } from 'react';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSharp,
  SiJavascript,
  SiDotnet,
  SiMysql,
  SiGit,
  SiDocker,
  SiPostman,
  SiFigma,
  SiUnity,
} from 'react-icons/si';
import { VscVscode, VscLock } from 'react-icons/vsc';
import { TbApi, TbBrandFramerMotion } from 'react-icons/tb';

// ─── Types ─────────────────────────────────────────────────────────────────
type SkillStatus = 'mastered' | 'proficient' | 'learning' | 'locked';

interface SkillNode {
  name: string;
  Icon: IconType;
  level: number; // 1-10, shown as "Lv. X"
  stars: number; // 1-5 filled stars
  status: SkillStatus;
  color: string;
  children?: SkillNode[];
}

interface SkillCategory {
  label: string;
  Icon: IconType;
  color: string;
  nodes: SkillNode[];
}

// ─── Data ──────────────────────────────────────────────────────────────────
const categories: SkillCategory[] = [
  {
    label: 'FRONTEND',
    Icon: SiReact,
    color: '#22d3ee',
    nodes: [
      {
        name: 'React',
        Icon: SiReact,
        level: 8,
        stars: 4,
        status: 'proficient',
        color: '#22d3ee',
        children: [
          {
            name: 'TypeScript',
            Icon: SiTypescript,
            level: 7,
            stars: 4,
            status: 'proficient',
            color: '#22d3ee',
          },
        ],
      },
      {
        name: 'Tailwind CSS',
        Icon: SiTailwindcss,
        level: 7,
        stars: 5,
        status: 'mastered',
        color: '#22d3ee',
        children: [
          {
            name: 'Framer Motion',
            Icon: TbBrandFramerMotion,
            level: 4,
            stars: 3,
            status: 'learning',
            color: '#ff5cad',
          },
        ],
      },
    ],
  },
  {
    label: 'PROGRAMMING',
    Icon: SiSharp,
    color: '#00e5ff',
    nodes: [
      {
        name: 'C#',
        Icon: SiSharp,
        level: 7,
        stars: 4,
        status: 'proficient',
        color: '#00e5ff',
      },
      {
        name: 'JavaScript',
        Icon: SiJavascript,
        level: 7,
        stars: 4,
        status: 'proficient',
        color: '#00e5ff',
        children: [
          {
            name: 'TypeScript',
            Icon: SiTypescript,
            level: 7,
            stars: 4,
            status: 'proficient',
            color: '#00e5ff',
          },
        ],
      },
    ],
  },
  {
    label: 'BACKEND',
    Icon: SiDotnet,
    color: '#ff2d8a',
    nodes: [
      {
        name: 'ASP.NET Core',
        Icon: SiDotnet,
        level: 6,
        stars: 4,
        status: 'proficient',
        color: '#ff2d8a',
        children: [
          {
            name: 'SQL',
            Icon: SiMysql,
            level: 6,
            stars: 4,
            status: 'proficient',
            color: '#ff2d8a',
          },
        ],
      },
      {
        name: 'REST API',
        Icon: TbApi,
        level: 6,
        stars: 4,
        status: 'proficient',
        color: '#ff2d8a',
        children: [
          {
            name: 'CI/CD',
            Icon: VscLock,
            level: 1,
            stars: 0,
            status: 'locked',
            color: '#ff2d8a',
          },
        ],
      },
    ],
  },
  {
    label: 'TOOLS',
    Icon: SiGit,
    color: '#ff5cad',
    nodes: [
      {
        name: 'Git',
        Icon: SiGit,
        level: 7,
        stars: 5,
        status: 'mastered',
        color: '#ff5cad',
      },
      {
        name: 'Docker',
        Icon: SiDocker,
        level: 4,
        stars: 3,
        status: 'learning',
        color: '#ff5cad',
      },
    ],
  },
];

const statusColors: Record<SkillStatus, string> = {
  mastered: '#22c55e',
  proficient: '#22d3ee',
  learning: '#f59e0b',
  locked: '#64748b',
};

const statusLabels: Record<SkillStatus, string> = {
  mastered: 'Mastered',
  proficient: 'Proficient',
  learning: 'Learning',
  locked: 'Locked',
};

const achievements = [
  {
    icon: '🎓',
    title: "Bachelor's Degree",
    desc: 'Completed BIT Program',
    date: 'Jun 2025',
  },
  {
    icon: '📜',
    title: 'Thesis Completed',
    desc: 'Applied Web Systems',
    date: 'May 2025',
  },
  {
    icon: '🏨',
    title: 'Built Room Booking System',
    desc: 'ASP.NET Core + React',
    date: 'Apr 2024',
  },
  {
    icon: '📱',
    title: 'Published Mobile App',
    desc: 'React Native Application',
    date: 'Jan 2024',
  },
];

const learning = [
  {
    icon: '🎮',
    title: 'Unity',
    desc: 'Game development journey',
    progress: 42,
    color: '#ff5cad',
  },
  {
    icon: '🇯🇵',
    title: 'Japanese Language',
    desc: 'N5 Level Progress',
    progress: 30,
    color: '#22d3ee',
  },
  {
    icon: '🎲',
    title: 'Unreal Engine',
    desc: 'Game engine fundamentals',
    progress: 20,
    color: '#f59e0b',
  },
];

const techInventory: { name: string; Icon: IconType; color: string }[] = [
  { name: 'C#', Icon: SiSharp, color: '#9b4f96' },
  { name: 'React', Icon: SiReact, color: '#61dafb' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { name: 'ASP.NET', Icon: SiDotnet, color: '#512bd4' },
  { name: 'SQL', Icon: SiMysql, color: '#4479a1' },
  { name: 'Git', Icon: SiGit, color: '#f05032' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ed' },
  { name: 'Postman', Icon: SiPostman, color: '#ff6c37' },
  { name: 'VS Code', Icon: VscVscode, color: '#007acc' },
  { name: 'Figma', Icon: SiFigma, color: '#a259ff' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#22d3ee' },
  { name: 'Unity', Icon: SiUnity, color: '#cccccc' },
];

const stats = [
  { icon: '🧩', label: 'Skills Unlocked', value: '18' },
  { icon: '📁', label: 'Projects Built', value: '3' },
  { icon: '⚙', label: 'Technologies', value: '15+' },
  { icon: '🔥', label: 'Learning Streak', value: '47 days' },
  { icon: '⭐', label: 'Total XP Earned', value: '24,680' },
];

// ─── Sub-components ───────────────────────────────────────────────────────
function StarRow({ stars, locked }: { stars: number; locked?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: 9,
            color: locked
              ? 'rgba(255,255,255,0.15)'
              : i < stars
                ? '#fbbf24'
                : 'rgba(255,255,255,0.15)',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function SkillCard({ node }: { node: SkillNode }) {
  const isLocked = node.status === 'locked';
  const sc = statusColors[node.status];
  const Icon = node.Icon;
  return (
    <motion.div
      whileHover={!isLocked ? { y: -3 } : {}}
      className="skill-node rounded-xl px-3 py-2.5 relative"
      style={{
        background: isLocked ? 'rgba(100,116,139,0.06)' : `${node.color}0f`,
        border: `1px solid ${isLocked ? 'rgba(100,116,139,0.25)' : node.color + '55'}`,
        minWidth: 116,
        opacity: isLocked ? 0.6 : 1,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={14} color={isLocked ? 'var(--text-muted)' : node.color} />
        <span
          className="text-xs font-medium truncate"
          style={{
            color: isLocked ? 'var(--text-muted)' : 'var(--text-primary)',
          }}
        >
          {node.name}
        </span>
      </div>
      {isLocked ? (
        <div
          className="font-mono-rpg"
          style={{ fontSize: 9, color: 'var(--text-muted)' }}
        >
          Locked
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span
            className="font-mono-rpg"
            style={{ fontSize: 9, color: 'var(--text-muted)' }}
          >
            Lv. {node.level}
          </span>
          <StarRow stars={node.stars} />
        </div>
      )}
      {/* status dot */}
      {!isLocked && (
        <span
          className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
          style={{ background: sc, boxShadow: `0 0 4px ${sc}` }}
        />
      )}
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Skills() {
  const [view, setView] = useState<'tree' | 'list'>('tree');

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* ── Header ── */}
      <motion.div
        variants={item}
        className="flex items-start justify-between gap-6 flex-wrap"
      >
        <div>
          <div
            className="font-mono-rpg text-xs tracking-widest mb-2"
            style={{ color: 'var(--accent-cyan)' }}
          >
            // SKILL TREE
          </div>
          <h1
            className="font-display text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Abilities &amp; Skills
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Unlock new abilities. Master technologies. Level up your developer
            journey.
          </p>
        </div>

        {/* Total level / XP card */}
        <div
          className="glass-card rounded-xl px-5 py-3 flex items-center gap-6"
          style={{ border: '1px solid rgba(124,58,237,0.3)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center neon-border"
              style={{ background: 'rgba(124,58,237,0.15)' }}
            >
              <span style={{ fontSize: 16 }}>💠</span>
            </div>
            <div>
              <div
                className="font-mono-rpg"
                style={{ fontSize: 9, color: 'var(--text-muted)' }}
              >
                TOTAL LEVEL
              </div>
              <div
                className="font-display text-xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                22
              </div>
            </div>
          </div>
          <div
            className="h-8 w-px"
            style={{ background: 'rgba(124,58,237,0.25)' }}
          />
          <div>
            <div
              className="font-mono-rpg"
              style={{ fontSize: 9, color: 'var(--text-muted)' }}
            >
              TOTAL XP
            </div>
            <div
              className="font-display text-xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              24,680
            </div>
            <div className="stat-bar mt-1" style={{ width: 110 }}>
              <div className="stat-fill" style={{ width: '68%' }} />
            </div>
            <div
              className="font-mono-rpg mt-0.5"
              style={{ fontSize: 8, color: 'var(--text-muted)' }}
            >
              To next level: 5,320 XP
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Class progression bar ── */}
      <motion.div
        variants={item}
        className="glass-card rounded-2xl p-6 relative"
        style={{ border: '1px solid rgba(124,58,237,0.25)' }}
      >
        <div className="corner-decoration corner-tl" />
        <div className="corner-decoration corner-tr" />
        <div className="corner-decoration corner-bl" />
        <div className="corner-decoration corner-br" />

        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Current class */}
          <div className="flex items-center gap-3 flex-1 min-w-48">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 neon-border"
              style={{ background: 'rgba(124,58,237,0.15)' }}
            >
              <span style={{ fontSize: 24 }}>🛡️</span>
            </div>
            <div>
              <div
                className="font-mono-rpg"
                style={{
                  fontSize: 9,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                }}
              >
                DEVELOPER CLASS
              </div>
              <div
                className="font-display text-base font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Full-Stack Developer
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Specializing in modern web &amp; mobile applications.
              </div>
            </div>
          </div>

          <span
            className="text-xl opacity-30 flex-shrink-0"
            style={{ color: 'var(--accent-purple)' }}
          >
            »
          </span>

          {/* Current path */}
          <div className="flex-1 min-w-48">
            <div
              className="font-mono-rpg"
              style={{
                fontSize: 9,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
              }}
            >
              CURRENT PATH
            </div>
            <div
              className="font-display text-base font-bold mb-1"
              style={{ color: 'var(--accent-cyan)' }}
            >
              Software Engineer
            </div>
            <div
              className="text-xs mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Focus: Clean Code · Scalable Systems · Problem Solving
            </div>
            <div className="flex items-center gap-2">
              <div className="stat-bar flex-1">
                <motion.div
                  className="stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ delay: 0.4, duration: 1 }}
                />
              </div>
              <span
                className="font-mono-rpg text-xs flex-shrink-0"
                style={{ color: 'var(--accent-cyan)' }}
              >
                78%
              </span>
            </div>
            <button
              className="font-mono-rpg text-xs mt-2 px-3 py-1 rounded-lg transition-all"
              style={{
                background: 'rgba(124,58,237,0.15)',
                color: 'var(--accent-purple)',
                border: '1px solid rgba(124,58,237,0.3)',
              }}
            >
              Change Class
            </button>
          </div>

          <span
            className="text-xl opacity-30 flex-shrink-0"
            style={{ color: 'var(--accent-purple)' }}
          >
            »
          </span>

          {/* Next evolution */}
          <div className="flex items-center gap-3 flex-1 min-w-48">
            <div>
              <div
                className="font-mono-rpg"
                style={{
                  fontSize: 9,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                }}
              >
                NEXT EVOLUTION
              </div>
              <div
                className="font-display text-base font-bold"
                style={{ color: 'var(--text-primary)', opacity: 0.7 }}
              >
                Game Developer
              </div>
              <div
                className="text-xs mt-0.5 mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Continue your journey and unlock new possibilities.
              </div>
              <div className="flex items-center gap-2">
                <div className="stat-bar flex-1" style={{ width: 90 }}>
                  <motion.div
                    className="stat-fill"
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{
                      background: 'linear-gradient(90deg, #ff5cad, #ec4899)',
                    }}
                  />
                </div>
                <span
                  className="font-mono-rpg text-xs flex-shrink-0"
                  style={{ color: '#ff5cad' }}
                >
                  42%
                </span>
              </div>
            </div>
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 opacity-50"
              style={{
                background: 'rgba(168,85,247,0.1)',
                border: '1px dashed rgba(168,85,247,0.4)',
              }}
            >
              <span style={{ fontSize: 24 }}>🎮</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Skill tree ── */}
      <motion.div
        variants={item}
        className="glass-card rounded-2xl p-6 relative"
        style={{ border: '1px solid rgba(124,58,237,0.25)' }}
      >
        <div className="corner-decoration corner-tl" />
        <div className="corner-decoration corner-tr" />
        <div className="corner-decoration corner-bl" />
        <div className="corner-decoration corner-br" />

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <span
            className="font-mono-rpg text-xs tracking-widest"
            style={{ color: 'var(--text-primary)' }}
          >
            SKILL TREE
          </span>
          <div className="flex items-center gap-4 flex-wrap">
            {(
              ['mastered', 'proficient', 'learning', 'locked'] as SkillStatus[]
            ).map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: statusColors[s] }}
                />
                <span
                  className="font-mono-rpg"
                  style={{ fontSize: 9, color: 'var(--text-muted)' }}
                >
                  {statusLabels[s]}
                </span>
              </div>
            ))}
            <button
              onClick={() => setView((v) => (v === 'tree' ? 'list' : 'tree'))}
              className="font-mono-rpg text-xs px-3 py-1 rounded-lg flex items-center gap-1.5"
              style={{
                background: 'rgba(124,58,237,0.12)',
                color: 'var(--accent-purple)',
                border: '1px solid rgba(124,58,237,0.25)',
              }}
            >
              ☰ View as {view === 'tree' ? 'List' : 'Tree'}
            </button>
          </div>
        </div>

        {/* Category columns */}
        <div className="grid md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.label} className="space-y-3">
              {/* Category header */}
              <div
                className="rounded-lg px-3 py-2 flex items-center gap-2"
                style={{
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}40`,
                }}
              >
                <cat.Icon size={14} color={cat.color} />
                <span
                  className="font-mono-rpg text-xs font-bold"
                  style={{ color: cat.color, letterSpacing: '0.05em' }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Tree nodes with connecting lines */}
              <div className="relative pl-2">
                {cat.nodes.map((node, ni) => (
                  <div key={node.name} className="relative">
                    {/* vertical connector */}
                    {ni > 0 && (
                      <div
                        className="absolute left-0 top-0 w-px"
                        style={{
                          height: 12,
                          background: `${cat.color}40`,
                          marginTop: -12,
                        }}
                      />
                    )}
                    <SkillCard node={node} />

                    {/* children */}
                    {node.children && node.children.length > 0 && (
                      <div className="relative pl-4 mt-2 mb-2">
                        <div
                          className="absolute left-1.5 top-0 bottom-3 w-px"
                          style={{ background: `${cat.color}30` }}
                        />
                        {node.children.map((child) => (
                          <div
                            key={child.name}
                            className="relative mb-2 last:mb-0"
                          >
                            <div
                              className="absolute -left-2.5 top-1/2 w-2.5 h-px"
                              style={{ background: `${cat.color}30` }}
                            />
                            <SkillCard node={child} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom 4-column grid ── */}
      <div className="grid md:grid-cols-4 gap-5">
        {/* Tech inventory */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-5 relative"
          style={{ border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-br" />
          <div
            className="font-mono-rpg text-xs tracking-widest mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            TECH INVENTORY
          </div>
          <div className="grid grid-cols-3 gap-2">
            {techInventory.map((tech) => (
              <div
                key={tech.name}
                className="aspect-square rounded-lg flex flex-col items-center justify-center gap-1"
                style={{
                  background: `${tech.color}10`,
                  border: `1px solid ${tech.color}30`,
                }}
              >
                <tech.Icon size={18} color={tech.color} />
                <span
                  className="font-mono-rpg text-center px-1"
                  style={{ fontSize: 8, color: 'var(--text-muted)' }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          <div
            className="font-mono-rpg text-xs mt-3"
            style={{ color: 'var(--text-muted)', opacity: 0.6 }}
          >
            + More coming soon...
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-5 relative"
          style={{ border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-br" />
          <div
            className="font-mono-rpg text-xs tracking-widest mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            ACHIEVEMENTS
          </div>
          <div className="space-y-3">
            {achievements.map((ach) => (
              <div key={ach.title} className="flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">{ach.icon}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-medium truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {ach.title}
                  </div>
                  <div
                    className="text-xs truncate"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {ach.desc}
                  </div>
                </div>
                <span
                  className="font-mono-rpg flex-shrink-0"
                  style={{ fontSize: 9, color: 'var(--text-muted)' }}
                >
                  {ach.date}
                </span>
              </div>
            ))}
          </div>
          <button
            className="font-mono-rpg text-xs mt-4 w-full text-center py-1.5 rounded-lg"
            style={{
              color: 'var(--accent-purple)',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            View All Achievements
          </button>
        </motion.div>

        {/* Currently learning */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-5 relative"
          style={{ border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-br" />
          <div
            className="font-mono-rpg text-xs tracking-widest mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            CURRENTLY LEARNING
          </div>
          <div className="space-y-4">
            {learning.map((l) => (
              <div key={l.title}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base flex-shrink-0">{l.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {l.title}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {l.desc}
                    </div>
                  </div>
                  <span
                    className="font-mono-rpg flex-shrink-0"
                    style={{ fontSize: 10, color: l.color }}
                  >
                    {l.progress}%
                  </span>
                </div>
                <div className="stat-bar">
                  <motion.div
                    className="stat-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${l.progress}%` }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                      background: `linear-gradient(90deg, ${l.color}, ${l.color}aa)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="font-mono-rpg text-xs mt-4 w-full text-center py-1.5 rounded-lg"
            style={{
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(6,182,212,0.25)',
            }}
          >
            View Learning Journey
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-5 relative flex flex-col"
          style={{ border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-br" />
          <div
            className="font-mono-rpg text-xs tracking-widest mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            STATS
          </div>
          <div className="space-y-3 flex-1">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 13 }}>{s.icon}</span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {s.label}
                  </span>
                </div>
                <span
                  className="font-mono-rpg text-xs font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
          <div
            className="mt-4 pt-3 flex items-center gap-2"
            style={{ borderTop: '1px solid rgba(124,58,237,0.15)' }}
          >
            <span style={{ fontSize: 20 }}>🎁</span>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Keep building.
              <br />
              Keep leveling up.
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
