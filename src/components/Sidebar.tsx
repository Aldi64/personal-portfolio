import type { Section } from '../App';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
}

// Mini pixel avatar for sidebar
function MiniAvatar() {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', width: '100%', height: '100%' }}
    >
      <rect width="40" height="40" fill="#1a0a22" />
      <ellipse cx="20" cy="16" rx="9" ry="10" fill="#3a2050" />
      <path
        d="M11 14 Q11 6 20 5 Q29 6 29 14 Q29 10 26 9 Q24 7 20 7 Q16 7 14 9 Q11 10 11 14Z"
        fill="#0d0810"
      />
      <ellipse cx="16.5" cy="16" rx="2" ry="2.5" fill="#050208" />
      <ellipse cx="23.5" cy="16" rx="2" ry="2.5" fill="#050208" />
      <circle cx="17.2" cy="15" r="0.7" fill="#00e5ff" opacity="0.9" />
      <circle cx="24.2" cy="15" r="0.7" fill="#00e5ff" opacity="0.9" />
      <path
        d="M17 22 Q20 24 23 22"
        stroke="#1c0f2e"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M11 18 Q9 26 14 32"
        stroke="#ff2d8a"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M29 18 Q31 26 26 32"
        stroke="#00e5ff"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M14 30 Q10 36 8 40 L32 40 Q30 36 26 30 Q23 27 20 27 Q17 27 14 30Z"
        fill="#1c0f2e"
      />
    </svg>
  );
}

const navItems: { id: Section; label: string; icon: string; desc: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡', desc: 'Home' },
  { id: 'profile', label: 'Profile', icon: '◈', desc: 'Character' },
  { id: 'projects', label: 'Projects', icon: '⚔', desc: 'Quest Log' },
  { id: 'skills', label: 'Skills', icon: '◆', desc: 'Skill Tree' },
  { id: 'hobbies', label: 'Hobbies', icon: '✦', desc: 'Interests' },
  { id: 'contact', label: 'Contact', icon: '⬟', desc: 'Connect' },
];

export default function Sidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 flex flex-col z-40"
      style={{
        background: 'rgba(5,2,8,0.95)',
        borderRight: '1px solid rgba(255,45,138,0.2)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo */}
      <div
        className="p-6 border-b"
        style={{ borderColor: 'rgba(255,45,138,0.2)' }}
      >
        <div
          className="font-display text-xs tracking-widest mb-1"
          style={{ color: 'var(--accent-cyan)' }}
        >
          SYSTEM
        </div>
        <div
          className="font-display font-bold text-lg"
          style={{ color: 'var(--text-primary)' }}
        >
          ALDI.DEV
        </div>
        <div
          className="font-mono-rpg text-xs mt-1"
          style={{ color: 'var(--text-muted)' }}
        >
          v2.0.26 // ONLINE
        </div>
      </div>

      {/* Character quick-stats */}
      <div
        className="px-6 py-4 border-b"
        style={{ borderColor: 'rgba(255,45,138,0.15)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 neon-border"
            style={{ background: 'rgba(255,45,138,0.1)' }}
          >
            <MiniAvatar />
          </div>
          <div>
            <div
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Aldi
            </div>
            <div
              className="font-mono-rpg text-xs"
              style={{ color: 'var(--accent-purple)' }}
            >
              LVL 22 Developer
            </div>
          </div>
        </div>
        {/* XP Bar */}
        <div className="mt-3">
          <div
            className="flex justify-between text-xs mb-1 font-mono-rpg"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>EXP</span>
            <span>2024 / 9999</span>
          </div>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: '20%' }} />
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
              activeSection === item.id ? 'active' : ''
            }`}
            style={{
              background:
                activeSection === item.id
                  ? 'rgba(255,45,138,0.15)'
                  : 'transparent',
              color:
                activeSection === item.id
                  ? 'var(--text-primary)'
                  : 'var(--text-muted)',
              paddingLeft: activeSection === item.id ? '1.25rem' : '0.75rem',
            }}
          >
            <span
              className="text-base w-5 text-center"
              style={{
                color:
                  activeSection === item.id
                    ? 'var(--accent-purple)'
                    : 'inherit',
              }}
            >
              {item.icon}
            </span>
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div
                className="font-mono-rpg"
                style={{ fontSize: '10px', color: 'var(--text-muted)' }}
              >
                {item.desc}
              </div>
            </div>
            {activeSection === item.id && (
              <span
                className="ml-auto text-xs"
                style={{ color: 'var(--accent-cyan)' }}
              >
                ▶
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="p-4 border-t"
        style={{ borderColor: 'rgba(255,45,138,0.15)' }}
      >
        <div
          className="font-mono-rpg text-center"
          style={{ fontSize: '10px', color: 'var(--text-muted)' }}
        >
          STATUS: <span style={{ color: '#22c55e' }}>● ACTIVE</span>
        </div>
      </div>
    </aside>
  );
}
