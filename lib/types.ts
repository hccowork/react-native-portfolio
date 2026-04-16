export type Profile = {
  id: string;
  full_name: string;
  title: string;
  intro: string;
  long_bio: string;
  location: string;
  email: string;
  resume_url: string;
  avatar_url: string;
  years_experience: number;
  projects_shipped: number;
  companies_worked: number;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  tech_stack: string[];
  image_url: string;
  live_url: string;
  github_url: string;
  platform: string;
  featured: boolean;
  sort_order: number;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  start_label: string;
  end_label: string;
  summary: string;
  achievements: string[];
  sort_order: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  sort_order: number;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  sort_order: number;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type PortfolioData = {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  socialLinks: SocialLink[];
  messages: ContactMessage[];
};
