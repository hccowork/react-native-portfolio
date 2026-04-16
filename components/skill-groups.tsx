import type { Skill } from "@/lib/types";

type SkillGroupsProps = {
  groups: Record<string, Skill[]>;
};

export function SkillGroups({ groups }: SkillGroupsProps) {
  return (
    <div className="skill-groups">
      {Object.entries(groups).map(([category, skills]) => (
        <article key={category} className="skill-group-card">
          <p className="eyebrow">{category}</p>
          <div className="skill-chip-wrap">
            {skills.map((skill) => (
              <span key={skill.id} className="skill-chip">
                {skill.name}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
