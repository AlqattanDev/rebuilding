/* Portfolio Content Types */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioContent {
  name: string;
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
  experience: Experience[];
  contact: ContactInfo;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  proficiency?: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  website?: string;
}

/* Appearance/Theme Types */
export interface ThemeColors {
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
}

export interface Typography {
  fontFamily: string;
  headingFont: string;
  bodySize: number;
  headingSize: number;
  lineHeight: number;
}

export interface ThemePreset {
  name: string;
  id: string;
  colors: ThemeColors;
  description: string;
}

export interface Appearance {
  theme: ThemePreset;
  typography: Typography;
  darkMode: boolean;
  spacing: number;
  borderRadius: number;
  customCSS?: string;
}

/* Section Configuration */
export interface SectionConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  visible: boolean;
  order: number;
  layout: 'grid' | 'list' | 'carousel' | 'timeline';
  backgroundColor?: string;
  paddingTop: number;
  paddingBottom: number;
  showAnimation: boolean;
  animation?: 'fade-in' | 'slide-up' | 'zoom-in' | 'none';
}

/* Portfolio Configuration */
export interface PortfolioConfig {
  id: string;
  name: string;
  slug: string;
  template: 'professional' | 'creative' | 'minimal' | 'custom';
  content: PortfolioContent;
  appearance: Appearance;
  sections: SectionConfig[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
}

/* Dashboard State */
export interface DashboardState {
  currentPortfolio: PortfolioConfig | null;
  currentPage: 'dashboard' | 'content' | 'appearance' | 'sections' | 'analytics';
  isLoading: boolean;
  error: string | null;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

/* API Response Types */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
