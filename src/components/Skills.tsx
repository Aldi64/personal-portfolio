import { motion } from "framer-motion"
import { skillCategories } from "../data/content"
import { skillIcons } from "../data/skillIcons"
import Certifications from "./Certifications"

export default function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="font-display text-2xl text-ink mb-10"
      >
        Skills
      </motion.h2>

      <div className="flex flex-col gap-8 mb-10">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col md:flex-row gap-3 md:gap-6 md:items-baseline"
          >
            <div className="md:w-36 shrink-0 font-display text-lg md:text-xl text-accent tracking-tight">
              {cat.label}
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 items-center">
              {cat.skills.map((skill) => {
                const def = skillIcons[skill]
                return (
                  <div key={skill} className="flex items-center gap-2">
                    {def && (
                      <span
                        className="text-[22px] leading-none"
                        style={{ color: def.color }}
                      >
                        {def.icon}
                      </span>
                    )}
                    <span className="text-sm text-ink">{skill}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-px bg-border mb-10" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
      >
        <Certifications />
      </motion.div>
    </section>
  )
}
