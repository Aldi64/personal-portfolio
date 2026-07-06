import type { JSX } from "react"
import {
  SiTypescript,
  SiJavascript,
  SiSharp,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
} from "react-icons/si"
import { TbPalette, TbVectorTriangle } from "react-icons/tb"

type IconDef = { icon: JSX.Element; color: string }

export const skillIcons: Record<string, IconDef> = {
  TypeScript: { icon: <SiTypescript />, color: "#3178C6" },
  JavaScript: { icon: <SiJavascript />, color: "#D8B32B" },
  "C#": { icon: <SiSharp />, color: "#684D9E" },
  React: { icon: <SiReact />, color: "#149ECA" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#38BDF8" },
  "Framer Motion": { icon: <SiFramer />, color: "#EF4B7C" },
  Git: { icon: <SiGit />, color: "#F1502F" },
  GitHub: { icon: <SiGithub />, color: "#24292F" },
  Vercel: { icon: <SiVercel />, color: "#000000" },
  Figma: { icon: <SiFigma />, color: "#F24E1E" },
  "UI/UX": { icon: <TbPalette />, color: "#EC4899" },
  "Graphic Design": { icon: <TbVectorTriangle />, color: "#8B5CF6" },
}
