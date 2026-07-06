import { FaLinkedin } from "react-icons/fa6"
import { SiGithub, SiInstagram } from "react-icons/si"
import { social } from "../data/content"

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-ink-muted text-xs">
          © {new Date().getFullYear()} Aldi Putra
        </p>
        <div className="flex gap-4">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <SiGithub />
          </a>
          <a
            href={social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <SiInstagram />
          </a>
        </div>
      </div>
    </footer>
  )
}
