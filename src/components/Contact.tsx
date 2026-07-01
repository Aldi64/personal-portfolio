import { motion } from 'framer-motion';
import { useState } from 'react';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { HiMail, HiUser, HiChatAlt2, HiLocationMarker } from 'react-icons/hi';
import { IoCopyOutline, IoOpenOutline } from 'react-icons/io5';

const EMAIL = 'aldiputradjojo64@gmail.com';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqgjypl';

const contactInfo = [
  {
    Icon: HiMail,
    label: EMAIL,
    href: `mailto:${EMAIL}`,
    color: '#22d3ee',
    action: 'copy' as const,
  },
  {
    Icon: FaLinkedin,
    label: 'linkedin.com/in/aldi-putra',
    href: 'www.linkedin.com/in/aldi-putra-bb5aaa252',
    color: '#00e5ff',
    action: 'view' as const,
  },
  {
    Icon: SiGithub,
    label: 'github.com/Aldi64',
    href: 'https://github.com/Aldi64',
    color: '#ff5cad',
    action: 'view' as const,
  },
  {
    Icon: HiLocationMarker,
    label: 'Indonesia',
    href: null,
    color: '#f43f5e',
    action: 'tz' as const,
  },
];

const socials = [
  { Icon: SiGithub, label: 'GitHub', href: 'https://github.com/Aldi64' },
  {
    Icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'www.linkedin.com/in/aldi-putra-bb5aaa252',
  },
  // { Icon: FaXTwitter, label: 'X (Twitter)', href: 'https://x.com' },
  {
    Icon: SiInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/aldi_djojo64',
  },
  // { Icon: SiYoutube, label: 'YouTube', href: 'https://youtube.com' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* ── Header row ── */}
      <motion.div
        variants={item}
        className="flex items-start justify-between gap-6 flex-wrap"
      >
        <div>
          <div
            className="font-mono-rpg text-xs tracking-widest mb-2"
            style={{ color: 'var(--accent-cyan)' }}
          >
            // CONTACT TERMINAL
          </div>
          <h1
            className="font-display text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Let's Connect
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Open to opportunities, collaborations, and interesting
            conversations.
          </p>
        </div>

        {/* Availability banner */}
        <div
          className="glass-card rounded-xl px-5 py-3 flex items-center gap-4"
          style={{ border: '1px solid rgba(34,197,94,0.3)' }}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="w-1.5 h-1.5 rounded-full pulse-glow"
                style={{ background: '#22c55e', display: 'inline-block' }}
              />
              <span
                className="font-mono-rpg text-xs"
                style={{ color: '#22c55e', letterSpacing: '0.06em' }}
              >
                AVAILABLE FOR WORK
              </span>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Open to roles, freelance projects,
              <br />
              and exciting collaborations!
            </div>
          </div>
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px dashed rgba(124,58,237,0.5)',
            }}
          >
            <HiMail size={20} color="var(--accent-purple)" />
          </div>
        </div>
      </motion.div>

      {/* ── Two column layout ── */}
      <div className="grid md:grid-cols-2 gap-5 items-start">
        {/* ── Left: Send a message form ── */}
        <motion.div
          variants={item}
          className="glass-card rounded-2xl p-6 relative"
          style={{ border: '1px solid rgba(124,58,237,0.3)' }}
        >
          <div className="corner-decoration corner-tl" />
          <div className="corner-decoration corner-tr" />
          <div className="corner-decoration corner-bl" />
          <div className="corner-decoration corner-br" />

          {/* Terminal header dots */}
          <div
            className="flex items-center justify-between mb-4 pb-3"
            style={{ borderBottom: '1px solid rgba(124,58,237,0.15)' }}
          >
            <div
              className="flex items-center gap-2 font-mono-rpg text-xs"
              style={{ color: 'var(--accent-purple)' }}
            >
              <span>{'>'}_</span>
              <span style={{ letterSpacing: '0.08em' }}>SEND A MESSAGE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: '#ef4444' }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: '#f59e0b' }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: '#22c55e' }}
              />
            </div>
          </div>

          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
            Fill out the form below or send me an email directly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div className="relative">
              <HiUser
                size={16}
                color="var(--text-muted)"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <input
                type="text"
                placeholder="Your name"
                required
                disabled={status === 'sending'}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none transition-colors disabled:opacity-50"
                style={{
                  background: 'rgba(6,9,18,0.6)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <HiMail
                size={16}
                color="var(--text-muted)"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <input
                type="email"
                placeholder="Your email address"
                required
                disabled={status === 'sending'}
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none transition-colors disabled:opacity-50"
                style={{
                  background: 'rgba(6,9,18,0.6)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <HiChatAlt2
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: 12, top: 12 }}
              />
              <textarea
                placeholder="Tell me about your project, opportunity, or just say hello!"
                required
                disabled={status === 'sending'}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    message: e.target.value.slice(0, 500),
                  }))
                }
                rows={5}
                maxLength={500}
                className="w-full rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none resize-none transition-colors disabled:opacity-50"
                style={{
                  background: 'rgba(6,9,18,0.6)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  color: 'var(--text-primary)',
                }}
              />
              <div
                className="font-mono-rpg text-right mt-1"
                style={{ fontSize: 10, color: 'var(--text-muted)' }}
              >
                {form.message.length} / 500
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-lg py-3 font-display text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              style={{
                background:
                  status === 'success'
                    ? 'linear-gradient(90deg, #16a34a, #22c55e)'
                    : status === 'error'
                      ? 'linear-gradient(90deg, #dc2626, #ef4444)'
                      : 'linear-gradient(90deg, #ff2d8a, #00e5ff)',
                color: '#fff',
                boxShadow: '0 0 20px rgba(124,58,237,0.3)',
              }}
            >
              {status === 'sending' && <>⟳ Sending...</>}
              {status === 'success' && <>✓ Message Sent!</>}
              {status === 'error' && <>✕ Failed — try again</>}
              {status === 'idle' && (
                <>
                  <span>✈</span> Send Message
                </>
              )}
            </button>

            {status === 'error' && (
              <div className="text-xs text-center" style={{ color: '#f87171' }}>
                Something went wrong. You can also email me directly at {EMAIL}.
              </div>
            )}

            <div
              className="flex items-center justify-center gap-1.5 text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>🔒</span> Your information is safe with me. No spam,
              promise.
            </div>
          </form>
        </motion.div>

        {/* ── Right column ── */}
        <div className="space-y-5">
          {/* Contact info */}
          <motion.div
            variants={item}
            className="glass-card rounded-2xl p-6 relative"
            style={{ border: '1px solid rgba(124,58,237,0.3)' }}
          >
            <div className="corner-decoration corner-tl" />
            <div className="corner-decoration corner-tr" />

            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: 'var(--accent-cyan)' }}>ⓘ</span>
              <span
                className="font-mono-rpg text-xs tracking-widest"
                style={{ color: 'var(--accent-cyan)' }}
              >
                CONTACT INFO
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {'>'}_ Prefer direct contact? Reach me here.
            </p>

            <div className="space-y-2">
              {contactInfo.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5"
                  style={{
                    background: 'rgba(124,58,237,0.06)',
                    border: '1px solid rgba(124,58,237,0.15)',
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <c.Icon
                      size={16}
                      color={c.color}
                      style={{ flexShrink: 0 }}
                    />
                    <span
                      className="text-xs font-medium truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {c.label}
                    </span>
                  </div>
                  {c.action === 'copy' && (
                    <button
                      onClick={copyEmail}
                      className="font-mono-rpg text-xs flex items-center gap-1 flex-shrink-0 transition-colors"
                      style={{
                        color: copied ? '#22c55e' : 'var(--text-muted)',
                      }}
                    >
                      {copied ? 'Copied!' : 'Copy'} <IoCopyOutline size={12} />
                    </button>
                  )}
                  {c.action === 'view' && c.href && (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-rpg text-xs flex items-center gap-1 flex-shrink-0 transition-colors"
                      style={{
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                      }}
                    >
                      View <IoOpenOutline size={12} />
                    </a>
                  )}
                  {c.action === 'tz' && (
                    <span
                      className="font-mono-rpg text-xs flex-shrink-0"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      GMT+7
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Connect elsewhere */}
          <motion.div
            variants={item}
            className="glass-card rounded-2xl p-6 relative"
            style={{ border: '1px solid rgba(124,58,237,0.3)' }}
          >
            <div className="corner-decoration corner-bl" />
            <div className="corner-decoration corner-br" />

            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: 'var(--accent-purple)' }}>⇄</span>
              <span
                className="font-mono-rpg text-xs tracking-widest"
                style={{ color: 'var(--accent-purple)' }}
              >
                CONNECT ELSEWHERE
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {'>'}_ Follow my journey and see what I'm building.
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 transition-all"
                  style={{
                    background: 'rgba(124,58,237,0.06)',
                    border: '1px solid rgba(124,58,237,0.2)',
                    textDecoration: 'none',
                  }}
                >
                  <s.Icon size={18} color="var(--text-primary)" />
                  <span
                    className="font-mono-rpg text-center"
                    style={{ fontSize: 9, color: 'var(--text-muted)' }}
                  >
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer line ── */}
      <motion.div
        variants={item}
        className="glass-card rounded-xl px-5 py-3 flex items-center justify-between"
        style={{ border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <div
          className="font-mono-rpg text-xs flex items-center gap-2"
          style={{ color: 'var(--accent-purple)' }}
        >
          <span>{'>'}_</span>
          <span style={{ color: 'var(--text-muted)' }}>
            Looking forward to hearing from you!
          </span>
        </div>
        <span style={{ color: 'var(--accent-purple)' }}>♥</span>
      </motion.div>
    </motion.div>
  );
}
