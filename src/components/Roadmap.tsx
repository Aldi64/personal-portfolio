import { motion } from 'framer-motion'

const milestones = [
  { year: '2025', title: 'Graduate',                  desc: 'Complete Bachelor of IT and close the student arc.',             icon: '🎓', done: false, active: true  },
  { year: '2026', title: 'First Dev Role',             desc: 'Land the first software developer position.',                    icon: '💼', done: false, active: false },
  { year: '2027', title: 'Build First Indie Game',     desc: 'Design and ship a playable indie game using Unity.',             icon: '🎮', done: false, active: false },
  { year: '2028', title: "Master's Degree",            desc: "Enroll in a Master's program, ideally in Japan.",               icon: '🎌', done: false, active: false },
  { year: '2030', title: 'Release Commercial Game',    desc: 'Publish a commercially released game as indie or studio dev.',   icon: '🚀', done: false, active: false },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export default function Roadmap() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-8">
      <motion.div variants={item}>
        <div className="font-mono-rpg text-xs tracking-widest mb-2" style={{ color: 'var(--accent-cyan)' }}>// ROADMAP</div>
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Journey Ahead</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Objectives plotted. Route calculated. Executing.</p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #7c3aed, #3b82f6, transparent)' }} />

        <div className="space-y-6">
          {milestones.map((m, i) => (
            <motion.div key={m.title} variants={item} className="relative flex gap-6">
              {/* Node */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl neon-border"
                  style={{
                    background: m.active ? 'rgba(124,58,237,0.3)' : 'rgba(13,17,35,0.8)',
                    boxShadow: m.active ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
                  }}
                  animate={m.active ? { boxShadow: ['0 0 10px rgba(124,58,237,0.4)', '0 0 25px rgba(124,58,237,0.7)', '0 0 10px rgba(124,58,237,0.4)'] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}>
                  {m.icon}
                </motion.div>
              </div>

              {/* Content */}
              <div className="glass-card rounded-xl p-5 flex-1 relative">
                <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-br" />
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{m.title}</h3>
                  <div className="flex items-center gap-2">
                    {m.active && (
                      <span className="font-mono-rpg text-xs px-2 py-0.5 rounded pulse-glow"
                        style={{ background: 'rgba(6,182,212,0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(6,182,212,0.4)' }}>
                        CURRENT
                      </span>
                    )}
                    <span className="font-display text-xs font-bold" style={{ color: 'var(--accent-purple)' }}>{m.year}</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{m.desc}</p>

                {/* Progress indicator */}
                <div className="mt-3 stat-bar">
                  <motion.div className="stat-fill"
                    initial={{ width: 0 }}
                    animate={{ width: m.done ? '100%' : m.active ? '35%' : '0%' }}
                    transition={{ delay: i * 0.15 + 0.4, duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
