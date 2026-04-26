import type { Experience } from "@/lib/types";
import { Reveal } from "@/components/reveal";

type ExperienceListProps = {
  items: Experience[];
};

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <Reveal key={item.id} as="article" className="timeline-item" delay={index * 90}>
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
        </Reveal>
      ))}
    </div>
  );
}
