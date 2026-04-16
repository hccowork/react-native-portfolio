import { cache } from "react";
import { demoPortfolioData } from "@/lib/demo-content";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import type { ContactMessage, Experience, PortfolioData, Profile, Project, Skill, SocialLink } from "@/lib/types";

async function fetchTable<T>(table: string, orderBy = "sort_order") {
  const client = createAdminSupabaseClient();

  if (!client) {
    return null;
  }

  const query = client.from(table).select("*");
  const { data, error } = await query.order(orderBy, { ascending: true });

  if (error) {
    console.error(`Failed to fetch ${table}`, error);
    return null;
  }

  return data as T[];
}

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  if (!hasSupabaseEnv()) {
    return demoPortfolioData;
  }

  const [profiles, projects, experiences, skills, socialLinks, messages] = await Promise.all([
    fetchTable<Profile>("profile", "full_name"),
    fetchTable<Project>("projects"),
    fetchTable<Experience>("experiences"),
    fetchTable<Skill>("skills"),
    fetchTable<SocialLink>("social_links"),
    fetchTable<ContactMessage>("messages", "created_at"),
  ]);

  return {
    profile: profiles?.[0] ?? demoPortfolioData.profile,
    projects: projects ?? demoPortfolioData.projects,
    experiences: experiences ?? demoPortfolioData.experiences,
    skills: skills ?? demoPortfolioData.skills,
    socialLinks: socialLinks ?? demoPortfolioData.socialLinks,
    messages: messages ?? [],
  };
});

export async function getFeaturedProjects() {
  const data = await getPortfolioData();
  return data.projects.filter((project) => project.featured).slice(0, 3);
}

export async function getSkillGroups() {
  const data = await getPortfolioData();
  return data.skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }

    acc[skill.category].push(skill);
    return acc;
  }, {});
}
