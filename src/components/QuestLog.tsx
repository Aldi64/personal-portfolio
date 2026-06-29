import { motion } from 'framer-motion'
import { useState } from 'react'

type QuestStatus = 'active' | 'completed' | 'planned'

interface Quest {
  title: string
  description: string
  status: QuestStatus
  reward: string
  tags: string[]
}

const quests: Quest[] = [
  {
    title: 'Build Personal Portfolio',
    description: 'Design and develop a personal RPG-themed portfolio website using React, TypeScript, and Tailwind CSS.',
    status: 'active',
    reward: '+200 EXP, Unlocks: Career Opportunities',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Learn Unity & Game Development',
    description: 'Master the Unity game engine, learn C# scripting, and create a playable game prototype.',
    status: 'active',
    reward: '+500 EXP, Unlocks: Game Developer Title',
    tags: ['Unity', 'C#', 'Game Dev'],
  },
  {
    title: 'Improve Japanese Language Skills',
    description: 'Reach JLPT N3 level. Study kanji, grammar, and conversational Japanese for daily use.',
    status: 'active',
    reward: '+150 EXP, Unlocks: Japan Arc',
    tags: ['JLPT', 'Japanese', 'Language'],
  },
  {
    title: 'Explore Graduate Schools in Japan',
    description: 'Research and apply to graduate programs in Japan for a Master\'s in Computer Science or Game Design.',
    status: 'planned',
    reward: '+300 EXP, Unlocks: Master\'s Degree Arc',
    tags: ['Graduate', 'Japan', 'Research'],
  },
  {
    title: 'Bachelor of Information Technology',
    description: 'Complete a four-year IT degree, including coursework in software engineering, databases, and networking.',
    status: 'completed',
    reward: '+1000 EXP, Unlocked: Developer Class',
    tags: ['Degree', 'University', 'IT'],
  },
  {
    title: 'Final Year Thesis',
    description: 'Researched and developed a web-based system as the primary thesis requirement for graduation.',
    status: 'completed',
    reward: '+400 EXP, Academic Achievement',
    tags: ['Research', 'Web Dev', 'Academic'],
  },
  {
    title: 'University Milestones',
    description: 'Completed labs, assignments, exams, and internship placements across 4 years of study.',
    status: 'completed',
    reward: '+600 EXP, Accumulated Wisdom',
    tags: ['Study', 'Internship', 'Milestones'],
  },
]

const statusConfig: Record<QuestStatus, { label: string; color: string; bg: string }> = {
  active:    { label: 'IN PROGRESS', color: '#06b6d4',  bg: 'rgba(6,182,212,0.1)' },
  completed: { label: 'COMPLETED',   color: '#22c55e',  bg: 'rgba(34,197,94,0.1)' },
  planned:   { label: 'PLANNED',     color: '#f59e0b',  bg: 'rgba(245,158,11,0.1)' },
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }

export default function QuestLog() {
  const [filter, setFilter] = useState<QuestStatus | 'all'>('all')

  const filtered = filter === 'all' ? quests : quests.filter(q => q.status === filter)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={item}>
        <div className="font-mono-rpg text-xs tracking-widest mb-2" style={{ color: 'var(--accent-cyan)' }}>// QUEST LOG</div>
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Active &amp; Completed Quests</h1>
      </motion.div>

      {/* Filter tabs */}
      <motion.div variants={item} className="flex gap-2">
        {(['all', 'active', 'completed', 'planned'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="font-mono-rpg text-xs px-4 py-2 rounded-lg transition-all"
            style={{
              background: filter === f ? 'rgba(124,58,237,0.3)' : 'rgba(124,58,237,0.05)',
              color: filter === f ? 'var(--text-primary)' : 'var(--text-muted)',
              border: `1px solid ${filter === f ? 'rgba(124,58,237,0.6)' : 'rgba(124,58,237,0.2)'}`,
            }}>
            {f.toUpperCase()}
          </button>
        ))}
      </motion.div>

      {/* Quest list */}
      <div className="space-y-4">
        {filtered.map((quest) => {
          const cfg = statusConfig[quest.status]
          return (
            <motion.div key={quest.title} variants={item}
              className="glass-card rounded-xl p-5 relative hover:border-purple-500 transition-all group"
              whileHover={{ x: 4 }}>
              <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{quest.status === 'completed' ? '✅' : quest.status === 'active' ? '⚔️' : '📋'}</span>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{quest.title}</h3>
                    <span className="font-mono-rpg text-xs px-2 py-0.5 rounded"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>{quest.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-wrap gap-1">
                      {quest.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono-rpg"
                          style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(59,130,246,0.2)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="font-mono-rpg text-xs mb-1" style={{ color: 'var(--text-muted)' }}>REWARD</div>
                  <div className="text-xs" style={{ color: '#f59e0b' }}>{quest.reward}</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
