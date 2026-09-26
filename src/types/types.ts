export type ProjectCategory = 'Thesis' | 'School Project' | 'Personal Project';

export interface PreviewMediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface Project {
  title: string;
  tagline: string;
  image: string; // resolved URL, not the raw Sanity image object
  previewMedia: PreviewMediaItem[]; // images, GIFs, and/or video clips, in order
  tags: string[];
  category: ProjectCategory;
  narrative: string;
  features: string[];
  builtWith: string[];
  github?: string; // optional — hide the GitHub button when empty
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  image: string; // resolved URL
}

export interface Work {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string; // undefined/empty means "Present"
  summary?: string;
  highlights: string[];
  companyLogo?: string; // resolved URL
  companyUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  location?: string;
  startDate: string;
  endDate?: string; // undefined/empty means "Present"
  description?: string;
  logo?: string; // resolved URL
  url?: string;
}