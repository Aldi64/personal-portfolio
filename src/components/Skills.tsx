import { motion } from 'framer-motion'

interface Skill { name: string; level: number; unlocked: boolean }
interface Category { label: string; color: string; icon: string; skills: Skill[] }

const categories: Category[] = [
  {
    label: 'Frontend', color: '#06b6d4', icon: '◈',
    skills: [
      { name: 'React', level: 80, unlocked: true },
      { name: 'Tailwind CSS', level: 78, unlocked: true },
      { name: 'TypeScript', level: 70, unlocked: true },
      { name: 'React Native', level: 45, unlocked: true },
    ],
  },
  {
    label: 'Backend', color: '#7c3aed', icon: '⬡',
    skills: [
      { name: 'ASP.NET Core', level: 65, unlocked: true },
      { name: 'REST API', level: 70, unlocked: true },
      { name: 'SQL', level: 68, unlocked: true },
    ],
  },
  {
    label: 'Programming', color: '#3b82f6', icon: '◆',
    skills: [
      { name: 'C#', level: 72, unlocked: true },
      { name: 'JavaScript', level: 78, unlocked: true },
      { name: 'TypeScript', level: 70, unlocked: true },
    ],
  },
  {
    label: 'Tools', color: '#a855f7', icon: '✦',
    skills: [
      { name: 'Git', level: 75, unlocked: true },
      { name: 'Docker', level: 50, unlocked: true },
      { name: 'Unity', level: 10, unlocked: false },
    ],
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Skills() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={item}>
        <div className="font-mono-rpg text-xs tracking-widest mb-2" style={{ color: 'var(--accent-cyan)' }}>// SKILL TREE</div>
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Abilities &amp; Skills</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Unlocked through quests, projects, and late-night grinding sessions.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat, ci) => (
          <motion.div key={cat.label} variants={item} className="glass-card rounded-2xl p-6 relative">
            <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />
            <div className="corner-decoration corner-bl" /><div className="corner-decoration corner-br" />

            <div className="flex items-center gap-2 mb-5">
              <span style={{ color: cat.color, fontSize: '18px' }}>{cat.icon}</span>
              <span className="font-display text-sm font-bold" style={{ color: cat.color }}>{cat.label}</span>
              <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(90deg, ${cat.color}40, transparent)` }} />
            </div>

            <div className="space-y-4">
              {cat.skills.map((skill, si) => (
                <div key={skill.name} className={`skill-node ${!skill.unlocked ? 'opacity-40' : ''}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: skill.unlocked ? cat.color : 'var(--text-muted)' }}>
                        {skill.unlocked ? '●' : '○'}
                      </span>
                      <span className="text-sm" style={{ color: skill.unlocked ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {skill.name}
                      </span>
                      {!skill.unlocked && (
                        <span className="font-mono-rpg px-1.5 py-0.5 rounded text-xs"
                          style={{ background: 'rgba(168,85,247,0.1)', color: 'var(--text-muted)', fontSize: '9px' }}>
                          LOCKED
                        </span>
                      )}
                    </div>
                    <span className="font-mono-rpg text-xs" style={{ color: cat.color }}>{skill.level}</span>
                  </div>
                  <div className="stat-bar">
                    <motion.div className="stat-fill"
                      style={{ background: `linear-gradient(90deg, ${cat.color}, #06b6d4)`, boxShadow: `0 0 8px ${cat.color}60` }}
                      initial={{ width: 0 }}
                      animate={{ width: skill.unlocked ? `${skill.level}%` : '5%' }}
                      transition={{ delay: ci * 0.1 + si * 0.08 + 0.2, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
