import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/lib/data";

export default async function ProjectsPage() {
  const { projects } = await getPortfolioData();

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="inner-page">
        <div className="section-heading">
          <p className="eyebrow">All Projects</p>
          <h1>A full collection of projects, case studies, and mobile product work.</h1>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
