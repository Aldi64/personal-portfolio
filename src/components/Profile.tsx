import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }

const languages = [
  { name: 'Indonesian', level: 'Native', value: 100 },
  { name: 'English',    level: 'Proficient', value: 80 },
  { name: 'Japanese',   level: 'Learning', value: 30 },
]

export default function Profile() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={item}>
        <div className="font-mono-rpg text-xs tracking-widest mb-2" style={{ color: 'var(--accent-cyan)' }}>// CHARACTER PROFILE</div>
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Profile Screen</h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Education */}
        <motion.div variants={item} className="glass-card rounded-2xl p-6 relative">
          <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />
          <div className="corner-decoration corner-bl" /><div className="corner-decoration corner-br" />
          <div className="font-mono-rpg text-xs tracking-widest mb-4" style={{ color: 'var(--accent-purple)' }}>◆ EDUCATION</div>
          <div className="space-y-4">
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Bachelor of Information Technology</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>University · 2021 – 2025</div>
              <div className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Specialized in software engineering. Thesis focused on applied web systems.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background */}
        <motion.div variants={item} className="glass-card rounded-2xl p-6 relative">
          <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />
          <div className="corner-decoration corner-bl" /><div className="corner-decoration corner-br" />
          <div className="font-mono-rpg text-xs tracking-widest mb-4" style={{ color: 'var(--accent-purple)' }}>◆ BACKGROUND</div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Based in Indonesia, I'm a fresh IT graduate with a passion for building clean web applications
            and a growing obsession with game development. I believe great software is equal parts logic and craft.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Problem Solver', 'Self-Taught', 'Open Source Enthusiast'].map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded-full font-mono-rpg"
                style={{ background: 'rgba(124,58,237,0.15)', color: 'var(--accent-purple)', border: '1px solid rgba(124,58,237,0.3)' }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div variants={item} className="glass-card rounded-2xl p-6 relative">
          <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />
          <div className="corner-decoration corner-bl" /><div className="corner-decoration corner-br" />
          <div className="font-mono-rpg text-xs tracking-widest mb-4" style={{ color: 'var(--accent-purple)' }}>◆ LANGUAGES</div>
          <div className="space-y-4">
            {languages.map((lang, i) => (
              <div key={lang.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{lang.name}</span>
                  <span className="font-mono-rpg text-xs" style={{ color: 'var(--accent-cyan)' }}>{lang.level}</span>
                </div>
                <div className="stat-bar">
                  <motion.div className="stat-fill"
                    initial={{ width: 0 }} animate={{ width: `${lang.value}%` }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career Goals */}
        <motion.div variants={item} className="glass-card rounded-2xl p-6 relative">
          <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />
          <div className="corner-decoration corner-bl" /><div className="corner-decoration corner-br" />
          <div className="font-mono-rpg text-xs tracking-widest mb-4" style={{ color: 'var(--accent-purple)' }}>◆ CAREER GOALS</div>
          <div className="space-y-3">
            {[
              { icon: '💼', text: 'Land a software developer role in 2026' },
              { icon: '🎮', text: 'Build and ship an indie game' },
              { icon: '🎓', text: "Pursue Master's degree in Japan" },
              { icon: '🌏', text: 'Work in an international tech team' },
            ].map(goal => (
              <div key={goal.text} className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">{goal.icon}</span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{goal.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
