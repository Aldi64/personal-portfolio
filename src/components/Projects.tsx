import { motion } from 'framer-motion';
import { useState } from 'react';

type Status = 'completed' | 'in-progress';
type Difficulty = 1 | 2 | 3 | 4 | 5;

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  outcome: string;
  difficulty: Difficulty;
  status: Status;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  badge?: string;
}

const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'ALDI.DEV Portfolio',
    subtitle: 'This very website',
    description:
      'A personal portfolio built with a Professional RPG Dashboard theme. Designed to stand out while remaining recruiter-friendly, featuring animated stat bars, a quest log, and a pixel-art aesthetic.',
    outcome:
      'Shipped a unique, memorable portfolio that reflects both my dev skills and personality.',
    difficulty: 3,
    status: 'in-progress',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/Aldi64/personal-portfolio',
    liveUrl: '#',
    featured: true,
    badge: '⚔ Active Quest',
  },
  {
    id: 'thesis',
    title: 'EduVerse',
    subtitle: 'Undergraduate Thesis · Swiss German University',
    description:
      'A Roblox-based Learning Management System that improves student engagement through game-based learning. Features course management, lesson delivery, automated assessment, progress tracking, XP levelling, and a turn-based Battle Quiz System where correct answers deal damage to enemies.',
    outcome:
      'Successfully defended thesis and graduated with Bachelor of Information Technology.',
    difficulty: 4,
    status: 'completed',
    tags: ['Roblox Studio', 'Lua', 'Game-Based Learning', 'LMS', 'Research'],
    badge: '👑 Final Boss',
  },
];

const difficultyLabel: Record<Difficulty, string> = {
  1: 'Novice',
  2: 'Apprentice',
  3: 'Journeyman',
  4: 'Expert',
  5: 'Legendary',
};

const difficultyColor: Record<Difficulty, string> = {
  1: '#22c55e',
  2: '#22d3ee',
  3: '#00e5ff',
  4: '#ff5cad',
  5: '#f59e0b',
};

function DifficultyStars({ level }: { level: Difficulty }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            color: i < level ? difficultyColor[level] : 'rgba(255,255,255,0.1)',
            fontSize: '10px',
          }}
        >
          ★
        </span>
      ))}
      <span
        className="font-mono-rpg ml-1"
        style={{ fontSize: '10px', color: difficultyColor[level] }}
      >
        {difficultyLabel[level]}
      </span>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Projects() {
  const [filter, setFilter] = useState<Status | 'all'>('all');

  const featured = projects.find((p) => p.featured);
  const rest = projects
    .filter((p) => !p.featured)
    .filter((p) => filter === 'all' || p.status === filter);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={item}>
        <div
          className="font-mono-rpg text-xs tracking-widest mb-2"
          style={{ color: 'var(--accent-cyan)' }}
        >
          // QUEST LOG — PROJECTS
        </div>
        <h1
          className="font-display text-3xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Completed &amp; Active Quests
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          Each project is a quest — some finished, some still in progress.
        </p>
      </motion.div>

      {/* Featured project */}
      {featured && (
        <motion.div
          variants={item}
          className="relative glass-card rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(124,58,237,0.5)',
            boxShadow: '0 0 30px rgba(124,58,237,0.15)',
          }}
        >
          {/* Top accent line */}
          <div
            className="h-0.5 w-full"
            style={{
              background:
                'linear-gradient(90deg, #ff2d8a, #22d3ee, transparent)',
            }}
          />

          <div className="p-8">
            <div className="corner-decoration corner-tl" />
            <div className="corner-decoration corner-tr" />
            <div className="corner-decoration corner-bl" />
            <div className="corner-decoration corner-br" />

            {/* Badge + difficulty row */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono-rpg text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(6,182,212,0.15)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(6,182,212,0.3)',
                  }}
                >
                  ✦ FEATURED QUEST
                </span>
                {featured.badge && (
                  <span
                    className="font-mono-rpg text-xs px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(124,58,237,0.15)',
                      color: 'var(--accent-purple)',
                      border: '1px solid rgba(124,58,237,0.3)',
                    }}
                  >
                    {featured.badge}
                  </span>
                )}
              </div>
              <DifficultyStars level={featured.difficulty} />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Left: main info */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h2
                    className="font-display text-2xl font-bold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {featured.title}
                  </h2>
                  <div
                    className="font-mono-rpg text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {featured.subtitle}
                  </div>
                </div>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {featured.description}
                </p>

                {/* Outcome */}
                <div
                  className="rounded-lg px-4 py-3"
                  style={{
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.2)',
                  }}
                >
                  <div
                    className="font-mono-rpg text-xs mb-1"
                    style={{ color: '#22c55e' }}
                  >
                    QUEST OUTCOME
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {featured.outcome}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-rpg text-xs px-2.5 py-1 rounded"
                      style={{
                        background: 'rgba(59,130,246,0.1)',
                        color: 'var(--accent-blue)',
                        border: '1px solid rgba(59,130,246,0.2)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: links + status */}
              <div className="space-y-3">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <div>
                    <div
                      className="font-mono-rpg text-xs mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      STATUS
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full pulse-glow"
                        style={{ background: '#22d3ee' }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--accent-cyan)' }}
                      >
                        IN PROGRESS
                      </span>
                    </div>
                  </div>

                  <div
                    className="h-px"
                    style={{ background: 'rgba(124,58,237,0.2)' }}
                  />

                  {featured.githubUrl && (
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm py-1 transition-colors group"
                      style={{
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                      }}
                    >
                      <span>GitHub</span>
                      <span
                        className="group-hover:translate-x-1 transition-transform"
                        style={{ color: 'var(--accent-purple)' }}
                      >
                        →
                      </span>
                    </a>
                  )}
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm py-1 transition-colors group"
                      style={{
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                      }}
                    >
                      <span>Live Site</span>
                      <span
                        className="group-hover:translate-x-1 transition-transform"
                        style={{ color: 'var(--accent-cyan)' }}
                      >
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter tabs */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div
          className="font-mono-rpg text-xs tracking-widest"
          style={{ color: 'var(--accent-cyan)' }}
        >
          // OTHER QUESTS
        </div>
        <div className="flex gap-2">
          {(['all', 'completed', 'in-progress'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-mono-rpg text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{
                background:
                  filter === f ? 'rgba(124,58,237,0.25)' : 'transparent',
                color:
                  filter === f ? 'var(--text-primary)' : 'var(--text-muted)',
                border: `1px solid ${filter === f ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.15)'}`,
              }}
            >
              {f === 'all'
                ? 'All'
                : f === 'completed'
                  ? 'Completed'
                  : 'In Progress'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Project cards grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {rest.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            className="glass-card rounded-2xl p-6 relative flex flex-col group"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="corner-decoration corner-tl" />
            <div className="corner-decoration corner-br" />

            {/* Header */}
            <div className="flex items-start justify-between mb-3 gap-3">
              <div>
                {project.badge && (
                  <div
                    className="font-mono-rpg text-xs mb-2 inline-block px-2 py-0.5 rounded"
                    style={{
                      background: 'rgba(168,85,247,0.1)',
                      color: '#ff5cad',
                      border: '1px solid rgba(168,85,247,0.25)',
                    }}
                  >
                    {project.badge}
                  </div>
                )}
                <h3
                  className="font-display text-base font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <div
                  className="font-mono-rpg text-xs mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {project.subtitle}
                </div>
              </div>
              <div className="flex-shrink-0">
                <span
                  className="font-mono-rpg text-xs px-2 py-0.5 rounded"
                  style={{
                    background:
                      project.status === 'completed'
                        ? 'rgba(34,197,94,0.1)'
                        : 'rgba(6,182,212,0.1)',
                    color:
                      project.status === 'completed'
                        ? '#22c55e'
                        : 'var(--accent-cyan)',
                    border: `1px solid ${project.status === 'completed' ? 'rgba(34,197,94,0.25)' : 'rgba(6,182,212,0.25)'}`,
                  }}
                >
                  {project.status === 'completed' ? '✓ Done' : '◉ Active'}
                </span>
              </div>
            </div>

            <DifficultyStars level={project.difficulty} />

            <p
              className="text-xs leading-relaxed mt-3 flex-1"
              style={{ color: 'var(--text-muted)' }}
            >
              {project.description}
            </p>

            {/* Outcome */}
            <div
              className="mt-3 text-xs py-2 px-3 rounded"
              style={{
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >
              <span style={{ color: '#22c55e' }}>↳ </span>
              <span style={{ color: 'var(--text-muted)' }}>
                {project.outcome}
              </span>
            </div>

            {/* Tags + links */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono-rpg text-xs px-2 py-0.5 rounded"
                    style={{
                      background: 'rgba(59,130,246,0.08)',
                      color: 'var(--accent-blue)',
                      border: '1px solid rgba(59,130,246,0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span
                    className="font-mono-rpg text-xs px-2 py-0.5 rounded"
                    style={{
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-3 flex-shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-rpg text-xs transition-colors"
                    style={{
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--accent-purple)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--text-muted)')
                    }
                  >
                    GitHub →
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-rpg text-xs transition-colors"
                    style={{
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--accent-cyan)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--text-muted)')
                    }
                  >
                    Live →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add project placeholder */}
        <motion.div
          variants={item}
          className="rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-48"
          style={{
            border: '1px dashed rgba(124,58,237,0.25)',
            background: 'rgba(124,58,237,0.03)',
          }}
        >
          <div className="text-2xl mb-3 opacity-40">＋</div>
          <div
            className="font-display text-sm font-bold mb-1"
            style={{ color: 'var(--text-muted)' }}
          >
            New Quest Loading...
          </div>
          <div
            className="font-mono-rpg text-xs"
            style={{ color: 'var(--text-muted)', opacity: 0.6 }}
          >
            More projects incoming
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
