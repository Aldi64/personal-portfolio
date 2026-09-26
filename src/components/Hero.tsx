import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa6';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { TbDownload } from 'react-icons/tb';
import { social } from '../data/content';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Hero() {
  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 pt-32 pb-24 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 w-full"
      >
        <motion.p
          variants={item}
          className="text-accent text-sm font-medium mb-3"
        >
          Hi, I'm
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display text-4xl md:text-5xl text-ink mb-5 leading-tight"
        >
          Aldi Putra
        </motion.h1>
        <motion.p
          variants={item}
          className="text-ink-soft text-base leading-relaxed mb-5 max-w-md"
        >
          I'm a web developer who's happiest when a project lets me poke at the
          edges of my usual toolkit — lately that's meant pulling in game
          development and UI/UX design alongside the core web work. When I'm not
          building things, I'm probably deep in a game or a Netflix queue.
        </motion.p>
        <motion.p variants={item} className="text-ink-muted text-sm mb-4">
          Information Technology bachelor from Swiss German University
        </motion.p>
        <motion.div variants={item} className="flex gap-4 mb-7">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-ink-soft hover:text-accent transition-colors text-lg"
          >
            <FaLinkedin />
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-ink-soft hover:text-accent transition-colors text-lg"
          >
            <SiGithub />
          </a>
          <a
            href={social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-ink-soft hover:text-accent transition-colors text-lg"
          >
            <SiInstagram />
          </a>
        </motion.div>
        <motion.div variants={item} className="flex gap-3">
          <a
            href="documents/aldi-putra-cv.pdf"
            download="Aldi-Putra-CV.pdf"
            className="inline-flex items-center gap-2 bg-accent text-card text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-accent-dark transition-colors"
          >
            <TbDownload className="text-base" />
            Download CV
          </a>
          <a
            href="#contact"
            className="border border-border-strong text-ink text-sm font-medium px-5 py-2.5 rounded-lg hover:border-ink-soft transition-colors"
          >
            Contact me
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex-1 flex justify-center w-full"
      >
        <img
          src="images/profile-photo.jpeg"
          alt="Aldi Putra"
          className="w-full max-w-96 aspect-4/5 object-cover rounded-2xl"
        />
      </motion.div>
    </section>
  );
}
