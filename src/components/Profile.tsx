import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const languages = [
  { name: 'Indonesian', level: 'Native', value: 100, color: '#22d3ee' },
  { name: 'English', level: 'Proficient', value: 80, color: '#22d3ee' },
  { name: 'Japanese', level: 'Learning', value: 30, color: '#22d3ee' },
];

const goals = [
  { num: '01', text: 'Land a software developer role in 2026' },
  { num: '02', text: 'Build and ship an indie game' },
  { num: '03', text: "Pursue Master's degree in Japan" },
  { num: '04', text: 'Work in an international tech team' },
];

const infoItems = [
  { icon: '📍', label: 'LOCATION', value: 'Indonesia' },
  { icon: '🎂', label: 'BIRTHDAY', value: 'March 10, 2003' },
  { icon: '🌐', label: 'LANGUAGES', value: 'ID / EN' },
  { icon: '✉️', label: 'CONTACT', value: "Let's connect!" },
];

export default function Profile() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* ── Page header ── */}
      <motion.div
        variants={item}
        className="flex items-start justify-between gap-6"
      >
        <div>
          <div
            className="font-mono-rpg text-xs tracking-widest mb-2"
            style={{ color: 'var(--accent-cyan)' }}
          >
            // CHARACTER PROFILE
          </div>
          <h1
            className="font-display text-4xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Profile Screen
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Get to know the developer behind the code.
          </p>
          {/* Purple underline accent */}
          <div
            className="mt-3 h-0.5 w-16 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #ff2d8a, transparent)',
            }}
          />
        </div>

        {/* Quote card — top right */}
        <motion.div
          variants={item}
          className="flex-shrink-0 glass-card rounded-xl p-4 max-w-xs relative flex gap-3"
          style={{ border: '1px solid rgba(124,58,237,0.3)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-tr" />
          <div
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.3)',
            }}
          >
            <span
              style={{
                color: 'var(--accent-purple)',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'serif',
              }}
            >
              "
            </span>
          </div>
          <div>
            <p
              className="text-xs leading-relaxed mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Code is my weapon, creativity is my skill, and impact is my
              mission.
            </p>
            <div
              className="text-xs font-mono-rpg"
              style={{ color: 'var(--accent-purple)' }}
            >
              — Aldi Putra
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Hero card ── */}
      <motion.div
        variants={item}
        className="glass-card rounded-2xl overflow-hidden relative"
        style={{
          border: '1px solid rgba(124,58,237,0.4)',
          boxShadow: '0 0 30px rgba(124,58,237,0.1)',
        }}
      >
        <div className="corner-decoration corner-tl" />
        <div className="corner-decoration corner-tr" />
        <div className="corner-decoration corner-bl" />
        <div className="corner-decoration corner-br" />

        <div className="flex flex-col md:flex-row">
          {/* Photo */}
          <div
            className="relative flex-shrink-0 m-3"
            style={{ width: 190, minHeight: 280 }}
          >
            <div
              className="relative w-full h-full rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(124,58,237,0.5)',
                boxShadow: '0 0 24px rgba(124,58,237,0.25)',
              }}
            >
              <img
                src="src\assets\profile-photo.jpeg"
                alt="Aldi Putra"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                }}
              />
              {/* Level badge at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 py-2 flex items-center justify-center gap-2 font-mono-rpg text-xs"
                style={{
                  background: 'rgba(6,9,18,0.9)',
                  color: 'var(--accent-purple)',
                  borderTop: '1px solid rgba(124,58,237,0.3)',
                  letterSpacing: '0.12em',
                }}
              >
                <span style={{ fontSize: 8 }}>◆</span> LVL 22{' '}
                <span style={{ fontSize: 8 }}>◆</span>
              </div>
            </div>
            {/* Hexagonal corner accents */}
            <span
              className="absolute -top-1.5 -left-1.5 text-xs"
              style={{ color: 'var(--accent-purple)' }}
            >
              ◆
            </span>
            <span
              className="absolute -top-1.5 -right-1.5 text-xs"
              style={{ color: 'var(--accent-purple)' }}
            >
              ◆
            </span>
            <span
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs"
              style={{ color: 'var(--accent-purple)', opacity: 0 }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 p-7 flex flex-col justify-between gap-5">
            {/* Name + role */}
            <div>
              <h2
                className="font-display text-3xl font-black mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                ALDI PUTRA
              </h2>
              <div
                className="font-mono-rpg text-xs tracking-widest mb-4"
                style={{ color: 'var(--accent-cyan)' }}
              >
                SOFTWARE DEVELOPER · IT GRADUATE · FUTURE GAME DEVELOPER
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)', maxWidth: 500 }}
              >
                A detail-oriented developer who loves building clean, efficient,
                and impactful software. Passionate about solving problems and
                bringing ideas to life through code.
              </p>
            </div>

            {/* Info pills row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {infoItems.map((info) => (
                <div
                  key={info.label}
                  className="rounded-lg px-3 py-2.5"
                  style={{
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px solid rgba(124,58,237,0.2)',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span style={{ fontSize: 12 }}>{info.icon}</span>
                    <span
                      className="font-mono-rpg"
                      style={{
                        fontSize: '9px',
                        color: 'var(--accent-purple)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {info.label}
                    </span>
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {info.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Current objective */}
            <div
              className="rounded-lg px-4 py-3 flex items-center gap-3"
              style={{
                background: 'rgba(6,182,212,0.06)',
                border: '1px solid rgba(6,182,212,0.2)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 pulse-glow"
                style={{
                  background: 'var(--accent-cyan)',
                  display: 'inline-block',
                }}
              />
              <div>
                <div
                  className="font-mono-rpg mb-0.5"
                  style={{
                    fontSize: '9px',
                    color: 'var(--accent-cyan)',
                    letterSpacing: '0.1em',
                  }}
                >
                  CURRENT OBJECTIVE
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  🎯 Land first software developer role &amp; begin Unity
                  journey
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2×2 grid ── */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Education */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-6 relative overflow-hidden"
          style={{ border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-br" />

          {/* faint building silhouette bg */}
          <div
            className="absolute right-0 bottom-0 opacity-5 pointer-events-none"
            style={{
              width: 140,
              height: 140,
              fontSize: 120,
              lineHeight: 1,
              textAlign: 'right',
              overflow: 'hidden',
            }}
          >
            🏛
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: 'var(--accent-purple)', fontSize: 14 }}>
                🎓
              </span>
              <span
                className="font-mono-rpg text-xs tracking-widest"
                style={{ color: 'var(--accent-purple)' }}
              >
                EDUCATION
              </span>
            </div>
            <div
              className="font-display text-base font-bold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Bachelor of Information Technology
            </div>
            <div
              className="font-mono-rpg text-xs mb-3"
              style={{ color: 'var(--accent-cyan)' }}
            >
              Swiss German University · 2022 – 2026
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              Specialized in software engineering.
              <br />
              Thesis focused on game development.
            </p>
          </div>
        </motion.div>

        {/* Background */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-6 relative overflow-hidden"
          style={{ border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-br" />

          {/* faint city bg */}
          <div
            className="absolute right-0 bottom-0 opacity-5 pointer-events-none"
            style={{
              width: 140,
              height: 140,
              fontSize: 110,
              lineHeight: 1,
              textAlign: 'right',
              overflow: 'hidden',
            }}
          >
            🌆
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: 'var(--accent-purple)', fontSize: 14 }}>
                👤
              </span>
              <span
                className="font-mono-rpg text-xs tracking-widest"
                style={{ color: 'var(--accent-purple)' }}
              >
                BACKGROUND
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Based in Indonesia, I'm a fresh IT graduate with a passion for
              building clean web applications and a growing obsession with game
              development.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Problem Solver', 'Self-Taught', 'Open Source Enthusiast'].map(
                (t) => (
                  <span
                    key={t}
                    className="font-mono-rpg text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(124,58,237,0.12)',
                      color: 'var(--accent-purple)',
                      border: '1px solid rgba(124,58,237,0.3)',
                    }}
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-6 relative"
          style={{ border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-br" />

          <div className="flex items-center gap-2 mb-5">
            <span style={{ color: 'var(--accent-purple)', fontSize: 14 }}>
              🌐
            </span>
            <span
              className="font-mono-rpg text-xs tracking-widest"
              style={{ color: 'var(--accent-purple)' }}
            >
              LANGUAGES
            </span>
          </div>
          <div className="space-y-5">
            {languages.map((lang, i) => (
              <div key={lang.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {lang.name}
                  </span>
                  <span
                    className="font-mono-rpg text-xs"
                    style={{ color: 'var(--accent-cyan)' }}
                  >
                    {lang.level}
                  </span>
                </div>
                <div className="stat-bar">
                  <motion.div
                    className="stat-fill"
                    style={{
                      background: 'linear-gradient(90deg, #ff2d8a, #22d3ee)',
                      boxShadow: '0 0 8px rgba(6,182,212,0.5)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.value}%` }}
                    transition={{
                      delay: i * 0.15 + 0.4,
                      duration: 0.9,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career Goals */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-6 relative overflow-hidden"
          style={{ border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-br" />

          {/* faint compass bg */}
          <div
            className="absolute right-4 bottom-4 opacity-5 pointer-events-none"
            style={{ fontSize: 100, lineHeight: 1 }}
          >
            🧭
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-5">
              <span style={{ color: 'var(--accent-purple)', fontSize: 14 }}>
                🚩
              </span>
              <span
                className="font-mono-rpg text-xs tracking-widest"
                style={{ color: 'var(--accent-purple)' }}
              >
                CAREER GOALS
              </span>
            </div>
            <div className="space-y-3.5">
              {goals.map((goal) => (
                <div key={goal.num} className="flex items-start gap-3">
                  <span
                    className="font-mono-rpg text-xs flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--accent-purple)', minWidth: 20 }}
                  >
                    {goal.num}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
