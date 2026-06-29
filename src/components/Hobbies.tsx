import { motion } from 'framer-motion'

const hobbies = [
  {
    icon: '🎮', title: 'Gaming',
    desc: 'From JRPGs to strategy games. Gaming sharpens pattern recognition, problem-solving, and persistence under pressure.',
    traits: ['Pattern Recognition', 'Persistence', 'Systems Thinking'],
    color: '#7c3aed',
  },
  {
    icon: '🤖', title: 'Gunpla & Model Kits',
    desc: 'Building Gundam model kits requires precision, patience, and attention to detail — the same skills that make a great developer.',
    traits: ['Precision', 'Patience', 'Detail-Oriented'],
    color: '#06b6d4',
  },
  {
    icon: '🎌', title: 'Anime & Movies',
    desc: 'Storytelling fuels creativity. Great narratives inspire UI flows, user journeys, and the emotional impact of design.',
    traits: ['Creativity', 'Narrative Thinking', 'Visual Taste'],
    color: '#3b82f6',
  },
  {
    icon: '🎵', title: 'Music',
    desc: 'Music is structure and flow. Understanding rhythm translates into better timing in animations and UI feedback.',
    traits: ['Rhythm', 'Emotional Intelligence', 'Focus'],
    color: '#a855f7',
  },
  {
    icon: '🔬', title: 'Tech Exploration',
    desc: 'Staying curious about emerging tools, frameworks, and concepts. The next skill is always one tutorial away.',
    traits: ['Self-Learning', 'Adaptability', 'Curiosity'],
    color: '#6366f1',
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }

export default function Hobbies() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8">
      <motion.div variants={item}>
        <div className="font-mono-rpg text-xs tracking-widest mb-2" style={{ color: 'var(--accent-cyan)' }}>// INTERESTS & HOBBIES</div>
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Beyond the Code</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          The skills I build outside of work make me a better developer inside of it.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {hobbies.map(hobby => (
          <motion.div key={hobby.title} variants={item}
            className="glass-card rounded-2xl p-6 relative group"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}>
            <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-br" />

            {/* Subtle color accent on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle at top left, ${hobby.color}10, transparent 60%)` }} />

            <div className="relative">
              <div className="text-4xl mb-3">{hobby.icon}</div>
              <h3 className="font-display text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{hobby.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{hobby.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {hobby.traits.map(trait => (
                  <span key={trait} className="font-mono-rpg text-xs px-2 py-0.5 rounded"
                    style={{ background: `${hobby.color}15`, color: hobby.color, border: `1px solid ${hobby.color}30` }}>
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
