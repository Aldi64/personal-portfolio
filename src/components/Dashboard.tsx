import { motion } from 'framer-motion'

const stats = [
  { label: 'Problem Solving',      value: 85, color: '#7c3aed' },
  { label: 'Programming',          value: 78, color: '#3b82f6' },
  { label: 'Frontend Dev',         value: 80, color: '#06b6d4' },
  { label: 'Backend Dev',          value: 65, color: '#8b5cf6' },
  { label: 'Game Development',     value: 30, color: '#a855f7' },
  { label: 'UI / UX Design',       value: 60, color: '#6366f1' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <motion.div variants={item}>
        <div className="font-mono-rpg text-xs tracking-widest mb-2" style={{ color: 'var(--accent-cyan)' }}>
          // DASHBOARD — MAIN TERMINAL
        </div>
        <h1 className="font-display text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Welcome, <span style={{ color: 'var(--accent-purple)', textShadow: '0 0 20px rgba(124,58,237,0.6)' }}>Aldi</span>
        </h1>
      </motion.div>

      {/* Hero card */}
      <motion.div variants={item} className="relative glass-card glow-purple rounded-2xl p-8 overflow-hidden">
        <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />
        <div className="corner-decoration corner-bl" /><div className="corner-decoration corner-br" />

        {/* Background grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative flex flex-col md:flex-row gap-8 items-center">
          {/* Avatar */}
          <div className="float flex-shrink-0">
            <div className="w-32 h-32 rounded-2xl neon-border flex items-center justify-center text-6xl"
              style={{ background: 'rgba(124,58,237,0.1)' }}>
              ⚔️
            </div>
            <div className="text-center mt-2 font-mono-rpg text-xs" style={{ color: 'var(--accent-purple)' }}>
              LVL 22
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="font-display text-3xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>ALDI</div>
            <div className="font-mono-rpg text-sm mb-4" style={{ color: 'var(--accent-cyan)' }}>
              SOFTWARE DEVELOPER · IT GRADUATE · FUTURE GAME DEVELOPER
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)', maxWidth: '480px' }}>
              A developer on a quest to bridge the world of enterprise software and game development.
              Currently leveling up backend skills while exploring the frontier of indie game creation.
            </p>
            <div className="glass-card rounded-lg px-4 py-3 inline-block neon-border">
              <div className="font-mono-rpg text-xs mb-1" style={{ color: 'var(--text-muted)' }}>CURRENT OBJECTIVE</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                🎯 Land first software developer role &amp; begin Unity journey
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex-shrink-0 space-y-3 min-w-40">
            {[
              { label: 'CLASS',    value: 'Full-Stack Dev' },
              { label: 'ORIGIN',  value: 'Indonesia' },
              { label: 'STATUS',  value: 'Seeking Role' },
              { label: 'LANG',    value: 'ID / EN / JP' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-mono-rpg" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{s.label}</div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={item}>
        <div className="font-mono-rpg text-xs tracking-widest mb-4" style={{ color: 'var(--accent-cyan)' }}>
          // CHARACTER STATS
        </div>
        <div className="glass-card rounded-2xl p-6 relative">
          <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />
          <div className="corner-decoration corner-bl" /><div className="corner-decoration corner-br" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{stat.label}</span>
                  <span className="font-mono-rpg text-xs" style={{ color: stat.color }}>{stat.value}</span>
                </div>
                <div className="stat-bar">
                  <motion.div
                    className="stat-fill"
                    style={{ background: `linear-gradient(90deg, ${stat.color}, #06b6d4)`, boxShadow: `0 0 8px ${stat.color}80` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick info row */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        {[
          { icon: '🎓', label: 'Education', value: 'B.IT Graduate' },
          { icon: '💼', label: 'Experience', value: 'Fresh Graduate' },
          { icon: '🎮', label: 'Side Quest', value: 'Unity Dev' },
        ].map(card => (
          <div key={card.label} className="glass-card rounded-xl p-5 text-center hover:glow-purple transition-all">
            <div className="text-3xl mb-2">{card.icon}</div>
            <div className="font-mono-rpg text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{card.label}</div>
            <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{card.value}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
