import type { Experience } from "@/lib/types";

type ExperienceListProps = {
  items: Experience[];
};

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article key={item.id} className="timeline-item">
          <div className="timeline-period">
            <span>{item.start_label}</span>
            <span>{item.end_label}</span>
          </div>
          <div className="timeline-content">
            <p className="timeline-company">{item.company}</p>
            <h3>{item.role}</h3>
            <p>{item.summary}</p>
            <ul>
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
