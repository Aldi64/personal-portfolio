import { motion } from 'framer-motion'
import { useState } from 'react'

const links = [
  { icon: '⌥', label: 'GitHub',   value: 'github.com/Aldi64',   href: 'https://github.com/Aldi64',  color: '#7c3aed' },
  { icon: '◈', label: 'LinkedIn', value: 'linkedin.com/in/aldi', href: 'https://linkedin.com',       color: '#3b82f6' },
  { icon: '✉', label: 'Email',    value: 'aldi@email.com',       href: 'mailto:aldi@email.com',      color: '#06b6d4' },
]

const terminalLines = [
  { prompt: '> ', text: 'whoami', delay: 0.2 },
  { prompt: '  ', text: 'Aldi — Software Developer & Future Game Dev', delay: 0.6 },
  { prompt: '> ', text: 'status', delay: 1.0 },
  { prompt: '  ', text: 'open_to_work: true | available: immediately', delay: 1.4 },
  { prompt: '> ', text: 'contact --send', delay: 1.8 },
  { prompt: '  ', text: '✓ Channels open. Awaiting transmission...', delay: 2.2, highlight: true },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('aldi@email.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-8">
      <motion.div variants={item}>
        <div className="font-mono-rpg text-xs tracking-widest mb-2" style={{ color: 'var(--accent-cyan)' }}>// CONTACT TERMINAL</div>
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Send a Message</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Open to roles, collaborations, and interesting conversations.</p>
      </motion.div>

      {/* Terminal block */}
      <motion.div variants={item} className="glass-card rounded-2xl p-6 font-mono-rpg relative overflow-hidden"
        style={{ background: 'rgba(6,9,18,0.9)', border: '1px solid rgba(124,58,237,0.3)' }}>
        <div className="corner-decoration corner-tl" /><div className="corner-decoration corner-tr" />
        <div className="corner-decoration corner-bl" /><div className="corner-decoration corner-br" />

        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
          <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
          <span className="ml-3 text-xs" style={{ color: 'var(--text-muted)' }}>bash — contact@aldi.dev</span>
        </div>

        <div className="space-y-1 text-sm">
          {terminalLines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: line.delay }}
              className="flex gap-2">
              <span style={{ color: 'var(--accent-purple)' }}>{line.prompt}</span>
              <span style={{ color: line.highlight ? '#22c55e' : line.prompt === '> ' ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                {line.text}
              </span>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2.6, duration: 1, repeat: Infinity }} className="flex gap-2">
            <span style={{ color: 'var(--accent-purple)' }}>{'> '}</span>
            <span style={{ color: 'var(--accent-cyan)' }}>█</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact links */}
      <div className="space-y-3">
        {links.map(link => (
          <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            variants={item}
            className="glass-card rounded-xl p-5 flex items-center gap-4 group transition-all block"
            whileHover={{ x: 6 }}
            style={{ textDecoration: 'none' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl neon-border flex-shrink-0"
              style={{ background: `${link.color}15`, color: link.color }}>
              {link.icon}
            </div>
            <div className="flex-1">
              <div className="font-mono-rpg text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{link.label}</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{link.value}</div>
            </div>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: link.color }}>
              OPEN →
            </span>
          </motion.a>
        ))}
      </div>

      {/* Resume + copy */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4">
        <button className="neon-border rounded-xl py-4 font-display text-sm font-bold transition-all hover:glow-purple"
          style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--text-primary)' }}>
          ↓ Download Resume
        </button>
        <button onClick={copyEmail}
          className="glass-card rounded-xl py-4 font-display text-sm font-bold transition-all"
          style={{ color: copied ? '#22c55e' : 'var(--text-muted)' }}>
          {copied ? '✓ Copied!' : '⎘ Copy Email'}
        </button>
      </motion.div>
    </motion.div>
  )
}
