export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  slug: string;
  template: 'professional' | 'creative' | 'minimal' | 'terminal' | 'custom';
  title: string;
  bio: string;
  email: string;
  location?: string;
  phone?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  sections: SectionConfig[];
  theme: Theme;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  portfolioId: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  githubLink?: string;
  status: 'published' | 'draft';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  portfolioId: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  proficiency?: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  portfolioId: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SectionConfig {
  id: string;
  name: string;
  title: string;
  description?: string;
  visible: boolean;
  order: number;
  layout: 'grid' | 'list' | 'carousel' | 'timeline';
  backgroundColor?: string;
  paddingTop: number;
  paddingBottom: number;
  showAnimation: boolean;
  animation?: 'fade-in' | 'slide-up' | 'zoom-in' | 'none';
}

export interface Theme {
  id: string;
  name: string;
  slug: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    danger: string;
    warning: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    bodySize: number;
    headingSize: number;
    lineHeight: number;
  };
  darkMode: boolean;
  spacing: number;
  borderRadius: number;
  customCSS?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}
