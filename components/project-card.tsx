import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div
        className="project-surface"
        style={
          project.image_url
            ? {
                backgroundImage: `linear-gradient(145deg, rgba(8, 17, 31, 0.22), rgba(8, 17, 31, 0.78)), url(${project.image_url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : undefined
        }
      >
        <p className="project-platform">{project.platform}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="project-body">
        <p>{project.description}</p>
        <div className="tag-list">
          {project.tech_stack.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.live_url} target="_blank" rel="noreferrer">
            Live Demo
          </a>
          <a href={project.github_url} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
