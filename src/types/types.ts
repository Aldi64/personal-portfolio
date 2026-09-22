export type ProjectCategory = 'Thesis' | 'School Project' | 'Personal Project';

export interface PreviewMediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface Project {
  title: string;
  tagline: string;
  image: string;
  previewMedia: PreviewMediaItem[]; // images, GIFs, and/or video clips, in order
  tags: string[];
  category: ProjectCategory;
  narrative: string;
  features: string[];
  builtWith: string[];
  github?: string;
}