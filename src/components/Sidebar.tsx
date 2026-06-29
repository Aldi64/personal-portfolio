import type { Section } from '../App'

interface SidebarProps {
  activeSection: Section
  setActiveSection: (s: Section) => void
}

const navItems: { id: Section; label: string; icon: string; desc: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡', desc: 'Home' },
  { id: 'profile',   label: 'Profile',   icon: '◈', desc: 'Character' },
  { id: 'skills',    label: 'Skills',    icon: '◆', desc: 'Skill Tree' },
  { id: 'quests',    label: 'Quest Log', icon: '◎', desc: 'Projects' },
  { id: 'roadmap',   label: 'Roadmap',   icon: '◉', desc: 'Timeline' },
  { id: 'hobbies',   label: 'Hobbies',   icon: '✦', desc: 'Interests' },
  { id: 'contact',   label: 'Contact',   icon: '⬟', desc: 'Connect' },
]

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col z-40"
      style={{ background: 'rgba(6,9,18,0.95)', borderRight: '1px solid rgba(124,58,237,0.2)', backdropFilter: 'blur(12px)' }}>

      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(124,58,237,0.2)' }}>
        <div className="font-display text-xs tracking-widest mb-1" style={{ color: 'var(--accent-cyan)' }}>SYSTEM</div>
        <div className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>ALDI.DEV</div>
        <div className="font-mono-rpg text-xs mt-1" style={{ color: 'var(--text-muted)' }}>v2.0.26 // ONLINE</div>
      </div>

      {/* Character quick-stats */}
      <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(124,58,237,0.15)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg neon-border"
            style={{ background: 'rgba(124,58,237,0.1)' }}>⚔</div>
          <div>
            <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Aldi</div>
            <div className="font-mono-rpg text-xs" style={{ color: 'var(--accent-purple)' }}>LVL 22 Developer</div>
          </div>
        </div>
        {/* XP Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1 font-mono-rpg" style={{ color: 'var(--text-muted)' }}>
            <span>EXP</span><span>2024 / 9999</span>
          </div>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: '20%' }} />
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
              activeSection === item.id ? 'active' : ''
            }`}
            style={{
              background: activeSection === item.id ? 'rgba(124,58,237,0.15)' : 'transparent',
              color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-muted)',
              paddingLeft: activeSection === item.id ? '1.25rem' : '0.75rem',
            }}
          >
            <span className="text-base w-5 text-center" style={{ color: activeSection === item.id ? 'var(--accent-purple)' : 'inherit' }}>
              {item.icon}
            </span>
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="font-mono-rpg" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
            {activeSection === item.id && (
              <span className="ml-auto text-xs" style={{ color: 'var(--accent-cyan)' }}>▶</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(124,58,237,0.15)' }}>
        <div className="font-mono-rpg text-center" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
          STATUS: <span style={{ color: '#22c55e' }}>● ACTIVE</span>
        </div>
      </div>
    </aside>
  )
}
