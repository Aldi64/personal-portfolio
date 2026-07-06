import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbCheck } from 'react-icons/tb';

// TODO: replace with your real Formspree endpoint once you've signed up at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqgjypl';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="font-display text-2xl text-ink mb-10"
      >
        Contact
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12"
      >
        <div className="flex-1 flex items-center">
          <p className="font-display text-xl md:text-2xl text-ink leading-snug">
            Got a project in mind, or just want to say hi? I'd love to hear from
            you.
          </p>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center gap-2 py-10 text-center"
              >
                <span className="w-10 h-10 rounded-full bg-accent-soft text-accent-dark flex items-center justify-center text-xl">
                  <TbCheck />
                </span>
                <p className="text-ink font-medium text-sm">Message sent</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs text-ink-muted block mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-ink bg-card focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs text-ink-muted block mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-ink bg-card focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-xs text-ink-muted block mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-ink bg-card focus:border-accent outline-none transition-colors resize-none"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-xs text-red-600">
                    Something went wrong — please try again, or email me
                    directly.
                  </p>
                )}
                <div className="flex justify-end mt-1">
                  <button
                    type="submit"
                    className="bg-accent text-card text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-accent-dark transition-colors"
                  >
                    Send message
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
