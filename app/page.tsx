import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ExperienceList } from "@/components/experience-list";
import { ExploreGrid } from "@/components/explore-grid";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillGroups } from "@/components/skill-groups";
import { getFeaturedProjects, getPortfolioData, getSkillGroups } from "@/lib/data";

export default async function HomePage() {
  const data = await getPortfolioData();
  const featuredProjects = await getFeaturedProjects();
  const skillGroups = await getSkillGroups();

  return (
    <div className="page-shell">
      <SiteHeader />

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">React Native Portfolio</p>
            <h1>{data.profile.title} building premium mobile products with clean frontend systems.</h1>
            <p className="hero-text">{data.profile.intro}</p>
            <div className="hero-actions">
              <Link href="/#projects" className="button button-primary">
                Explore projects
              </Link>
              <a href={data.profile.resume_url} className="button button-secondary">
                View resume
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-top">
              <div>
                <p className="panel-label">Highlights</p>
                <h2 className="hero-panel-title">{data.profile.full_name}</h2>
                <p className="hero-panel-subtitle">{data.profile.location}</p>
              </div>
              {data.profile.avatar_url ? (
                <img src={data.profile.avatar_url} alt={data.profile.full_name} className="profile-avatar" />
              ) : null}
            </div>
            <div className="stats-grid">
              <article>
                <strong>{data.profile.years_experience}+</strong>
                <span>Years shipping apps</span>
              </article>
              <article>
                <strong>{data.profile.projects_shipped}+</strong>
                <span>Projects delivered</span>
              </article>
              <article>
                <strong>{data.profile.companies_worked}+</strong>
                <span>Teams supported</span>
              </article>
            </div>
            <div className="hero-note">
              <p>Cross-platform delivery</p>
              <span>React Native, Expo, TypeScript, APIs, performance, release confidence</span>
            </div>
          </div>
        </section>

        <section className="content-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Built for the same kind of polished portfolio feel you referenced, but tailored to mobile product work.</h2>
          </div>
          <div className="about-grid">
            <article className="surface-card">
              {data.profile.avatar_url ? (
                <img src={data.profile.avatar_url} alt={data.profile.full_name} className="about-avatar" />
              ) : null}
              <h3>{data.profile.full_name}</h3>
              <p>{data.profile.long_bio}</p>
            </article>
            <article className="surface-card">
              <p className="eyebrow">Based in</p>
              <h3>{data.profile.location}</h3>
              <p>
                Available for freelance, product teams, and startups that need reliable React
                Native execution.
              </p>
            </article>
          </div>
        </section>

        <ExploreGrid />

        <section className="content-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Featured Work</p>
            <h2>Mobile-first case studies with clean layouts, strong hierarchy, and polished storytelling.</h2>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <Link href="/projects" className="text-link">
            View all projects
          </Link>
        </section>

        <section className="content-section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Delivery across mobile products, UI systems, and real-world release workflows.</h2>
          </div>
          <ExperienceList items={data.experiences} />
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Your tech stack is grouped so recruiters and clients can scan it quickly.</h2>
          </div>
          <SkillGroups groups={skillGroups} />
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Use the form or the social links below to start a conversation about your next mobile product.</h2>
          </div>
          <div className="contact-grid">
            <article className="surface-card contact-card">
              <h3>Direct contact</h3>
              <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
              {data.socialLinks.map((link) => (
                <a key={link.id} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </article>
            <article className="surface-card">
              <ContactForm />
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
