import type { Experience, PortfolioData, Profile, Project, Skill, SocialLink } from "@/lib/types";

export const demoProfile: Profile = {
  id: "profile-1",
  full_name: "Prem Mehta",
  title: "React Native Developer",
  intro:
    "I build polished mobile experiences with React Native, thoughtful UX, and production-ready frontend architecture.",
  long_bio:
    "I'm a React Native developer focused on fast, reliable mobile apps with clean UI systems, scalable state management, and strong collaboration with backend and product teams. This starter portfolio is designed for a developer who wants a modern public site plus a private admin dashboard to update projects, experience, and skills without touching code every time.",
  location: "India",
  email: "prem@example.com",
  resume_url: "#",
  avatar_url: "",
  years_experience: 3,
  projects_shipped: 12,
  companies_worked: 4,
};

export const demoProjects: Project[] = [
  {
    id: "project-1",
    title: "Fintech Wallet App",
    slug: "fintech-wallet-app",
    summary: "A secure mobile wallet with onboarding, transfers, and transaction insights.",
    description:
      "Built a React Native wallet app with biometric authentication, real-time transaction updates, and modular UI components for rapid feature delivery.",
    tech_stack: ["React Native", "TypeScript", "Redux Toolkit", "Supabase"],
    image_url: "",
    live_url: "https://example.com",
    github_url: "https://github.com/",
    platform: "iOS / Android",
    featured: true,
    sort_order: 1,
  },
  {
    id: "project-2",
    title: "Healthcare Booking App",
    slug: "healthcare-booking-app",
    summary: "Appointment booking with doctor search, reminders, and secure profile flows.",
    description:
      "Created reusable booking flows, push notification hooks, and offline-friendly appointment states for a healthcare platform.",
    tech_stack: ["React Native", "Expo", "Firebase", "REST API"],
    image_url: "",
    live_url: "https://example.com",
    github_url: "https://github.com/",
    platform: "Mobile",
    featured: true,
    sort_order: 2,
  },
  {
    id: "project-3",
    title: "Logistics Driver App",
    slug: "logistics-driver-app",
    summary: "Delivery workflow app with route status updates and proof-of-delivery uploads.",
    description:
      "Implemented role-based navigation, live order states, image uploads, and performance optimizations for large delivery lists.",
    tech_stack: ["React Native", "TypeScript", "React Query", "Maps"],
    image_url: "",
    live_url: "https://example.com",
    github_url: "https://github.com/",
    platform: "Android",
    featured: false,
    sort_order: 3,
  },
];

export const demoExperiences: Experience[] = [
  {
    id: "experience-1",
    company: "Freelance",
    role: "React Native Developer",
    start_label: "2024",
    end_label: "Present",
    summary:
      "Delivered mobile apps and frontend features with a focus on quality, maintainability, and release confidence.",
    achievements: [
      "Built reusable cross-platform component patterns",
      "Integrated auth, APIs, push notifications, and analytics",
      "Improved mobile performance and release workflows",
    ],
    sort_order: 1,
  },
  {
    id: "experience-2",
    company: "Product Team",
    role: "Frontend Developer",
    start_label: "2023",
    end_label: "2024",
    summary:
      "Worked on user-facing mobile experiences, collaborating with designers and backend engineers on feature delivery.",
    achievements: [
      "Owned high-traffic onboarding and profile flows",
      "Reduced regressions with better component structure",
      "Helped define scalable frontend practices",
    ],
    sort_order: 2,
  },
];

export const demoSkills: Skill[] = [
  { id: "skill-1", name: "React Native", category: "Mobile", sort_order: 1 },
  { id: "skill-2", name: "Expo", category: "Mobile", sort_order: 2 },
  { id: "skill-3", name: "TypeScript", category: "Frontend", sort_order: 3 },
  { id: "skill-4", name: "Next.js", category: "Frontend", sort_order: 4 },
  { id: "skill-5", name: "Supabase", category: "Backend", sort_order: 5 },
  { id: "skill-6", name: "Firebase", category: "Backend", sort_order: 6 },
  { id: "skill-7", name: "Redux Toolkit", category: "State", sort_order: 7 },
  { id: "skill-8", name: "React Query", category: "State", sort_order: 8 },
  { id: "skill-9", name: "REST APIs", category: "Backend", sort_order: 9 },
  { id: "skill-10", name: "Git", category: "Tools", sort_order: 10 },
];

export const demoSocialLinks: SocialLink[] = [
  { id: "social-1", label: "GitHub", href: "https://github.com/", sort_order: 1 },
  { id: "social-2", label: "LinkedIn", href: "https://www.linkedin.com/", sort_order: 2 },
  { id: "social-3", label: "Email", href: "mailto:prem@example.com", sort_order: 3 },
];

export const demoPortfolioData: PortfolioData = {
  profile: demoProfile,
  projects: demoProjects,
  experiences: demoExperiences,
  skills: demoSkills,
  socialLinks: demoSocialLinks,
  messages: [],
};
