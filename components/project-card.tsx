import type { Project } from "@/lib/types";
import { Reveal } from "@/components/reveal";

type ProjectCardProps = {
  project: Project;
};

function isExternalUrl(value: string | undefined) {
  try {
    const url = new URL(value ?? "");
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.7 12.8c0-2.1 1.7-3.2 1.8-3.3a3.9 3.9 0 0 0-3.1-1.7c-1.3-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.4 1 8.4.7 1 1.5 2.1 2.6 2.1 1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.6-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.8-2.2-3.4Zm-2.1-6.4c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.7 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2-.5 2.8-1.2Z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4.2 3.6 8.6 8.4-8.6 8.4A2 2 0 0 1 3 18.6V5.4a2 2 0 0 1 1.2-1.8Z" />
      <path d="m12.8 12 2.7 2.6-8.9 5.2a2 2 0 0 1-2.4-.3l8.6-8.4Z" opacity=".72" />
      <path d="m12.8 12 2.7-2.6-8.9-5.2A2 2 0 0 0 4.2 4l8.6 8Z" opacity=".9" />
      <path d="m15.5 9.4 4 2.3a.4.4 0 0 1 0 .6l-4 2.3-2.7-2.6 2.7-2.6Z" />
    </svg>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasLinks = [
    project.live_url,
    project.github_url,
    project.app_store_url,
    project.play_store_url,
  ].some(isExternalUrl);

  return (
    <Reveal as="article" className="project-card" delay={80}>
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
        {hasLinks ? (
          <div className="project-links">
            {isExternalUrl(project.live_url) ? (
              <a href={project.live_url} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            ) : null}
            {isExternalUrl(project.github_url) ? (
              <a href={project.github_url} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
            {isExternalUrl(project.app_store_url) ? (
              <a
                className="store-link"
                href={project.app_store_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} on the Apple App Store`}
                title="Apple App Store"
              >
                <AppleIcon />
                <span>App Store</span>
              </a>
            ) : null}
            {isExternalUrl(project.play_store_url) ? (
              <a
                className="store-link"
                href={project.play_store_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} on the Google Play Store`}
                title="Google Play Store"
              >
                <PlayStoreIcon />
                <span>Google Play</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
