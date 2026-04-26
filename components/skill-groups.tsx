import type { Skill } from "@/lib/types";
import { Reveal } from "@/components/reveal";

type SkillGroupsProps = {
  groups: Record<string, Skill[]>;
};

export function SkillGroups({ groups }: SkillGroupsProps) {
  return (
    <div className="skill-groups">
      {Object.entries(groups).map(([category, skills], index) => (
        <Reveal key={category} as="article" className="skill-group-card" delay={index * 80}>
          <p className="eyebrow">{category}</p>
          <div className="skill-chip-wrap">
            {skills.map((skill) => (
              <span key={skill.id} className="skill-chip">
                {skill.name}
              </span>
              ))}
            </div>
        </Reveal>
      ))}
    </div>
  );
}
