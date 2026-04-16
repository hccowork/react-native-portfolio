import { ExperienceList } from "@/components/experience-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillGroups } from "@/components/skill-groups";
import { getPortfolioData, getSkillGroups } from "@/lib/data";

export default async function AboutPage() {
  const data = await getPortfolioData();
  const skillGroups = await getSkillGroups();

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="inner-page">
        <div className="section-heading">
          <p className="eyebrow">About Me</p>
          <h1>{data.profile.title}</h1>
          <p>{data.profile.long_bio}</p>
        </div>
        {data.profile.avatar_url ? (
          <section className="content-section">
            <article className="surface-card profile-showcase">
              <img src={data.profile.avatar_url} alt={data.profile.full_name} className="profile-avatar profile-avatar-large" />
              <div>
                <p className="eyebrow">Profile</p>
                <h2>{data.profile.full_name}</h2>
                <p>{data.profile.location}</p>
              </div>
            </article>
          </section>
        ) : null}
        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Career Journey</p>
            <h2>Timeline</h2>
          </div>
          <ExperienceList items={data.experiences} />
        </section>
        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Tech Stack</p>
            <h2>Skills</h2>
          </div>
          <SkillGroups groups={skillGroups} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
