import { AdminHeader } from "@/components/admin-header";
import { AdminPanelSection, AdminShell } from "@/components/admin-shell";
import { AdminActionForm } from "@/components/admin-action-form";
import { FileInputPreview } from "@/components/file-input-preview";
import { getCurrentAdminUser } from "@/lib/auth";
import { getPortfolioData } from "@/lib/data";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import {
  deleteExperienceAction,
  deleteMessageAction,
  deleteProjectAction,
  deleteSkillAction,
  deleteSocialLinkAction,
  upsertExperienceAction,
  upsertProfileAction,
  upsertProjectAction,
  upsertSkillAction,
  upsertSocialLinkAction,
} from "@/app/admin/actions";

export default async function AdminPage() {
  const data = await getPortfolioData();
  const adminUser = await getCurrentAdminUser();
  const adminSections = [
    {
      id: "overview",
      label: "Overview",
      description: "Setup status, signed-in account, and update guide.",
    },
    {
      id: "profile",
      label: "Profile",
      description: "Identity, hero copy, avatar, and resume.",
    },
    {
      id: "projects",
      label: "Projects",
      description: "Create and update portfolio case studies.",
      count: data.projects.length,
    },
    {
      id: "skills",
      label: "Skills",
      description: "Maintain skill names, groups, and order.",
      count: data.skills.length,
    },
    {
      id: "experience",
      label: "Experience",
      description: "Keep your work timeline current.",
      count: data.experiences.length,
    },
    {
      id: "social-links",
      label: "Social links",
      description: "Edit footer and contact destinations.",
      count: data.socialLinks.length,
    },
    {
      id: "messages",
      label: "Messages",
      description: "Review and archive contact form submissions.",
      count: data.messages.length,
    },
  ];

  return (
    <main className="admin-page">
      <AdminShell sections={adminSections}>
        <AdminHeader />

        <AdminPanelSection id="overview" className="admin-section-stack admin-section-anchor">
          {!hasSupabaseEnv() ? (
            <section className="notice-card">
              <h2>Supabase setup pending</h2>
              <p>
                Add your environment variables, run the schema, and create your admin user to unlock
                live content management and file uploads.
              </p>
            </section>
          ) : (
            <section className="notice-card">
              <h2>Admin panel is fully wired</h2>
              <p>
                Profile changes, uploaded assets, and CRUD edits revalidate the public pages so your
                portfolio reflects the latest content right away.
              </p>
            </section>
          )}

          <section className="admin-card">
            <p className="eyebrow">Update Guide</p>
            <h2>How to keep the portfolio updated</h2>
            {adminUser ? <p className="muted-text">Signed in as {adminUser.email}</p> : null}
            <div className="admin-guide-grid">
              <article className="guide-card">
                <strong>Profile</strong>
                <p>Update your name, title, intro, bio, avatar, resume, location, and contact email here.</p>
              </article>
              <article className="guide-card">
                <strong>Projects</strong>
                <p>Add or edit case studies, change the featured flag, and replace screenshots or links.</p>
              </article>
              <article className="guide-card">
                <strong>Experience</strong>
                <p>Keep your timeline current with companies, roles, dates, summary text, and achievements.</p>
              </article>
              <article className="guide-card">
                <strong>Skills and links</strong>
                <p>Refresh your tools, social links, and contact points so the public site stays accurate.</p>
              </article>
            </div>
          </section>
        </AdminPanelSection>

        <AdminPanelSection id="profile" className="admin-card admin-section-anchor">
          <p className="eyebrow">Profile</p>
          <h2>Identity, hero copy, avatar, and resume</h2>
          <AdminActionForm
            action={upsertProfileAction}
            className="admin-form"
            submitLabel="Save profile"
            pendingLabel="Saving profile..."
          >
            <input type="hidden" name="id" value={data.profile.id} />
            <label>
              Full name
              <input name="full_name" defaultValue={data.profile.full_name} required />
            </label>
            <label>
              Title
              <input name="title" defaultValue={data.profile.title} required />
            </label>
            <label>
              Intro
              <textarea name="intro" rows={3} defaultValue={data.profile.intro} required />
            </label>
            <label>
              Long bio
              <textarea name="long_bio" rows={5} defaultValue={data.profile.long_bio} required />
            </label>
            <label>
              Location
              <input name="location" defaultValue={data.profile.location} />
            </label>
            <label>
              Email
              <input name="email" type="email" defaultValue={data.profile.email} />
            </label>
            <label>
              Avatar URL
              <input name="avatar_url" defaultValue={data.profile.avatar_url} />
            </label>
            <FileInputPreview
              name="avatar_file"
              label="Upload avatar"
              accept="image/*"
              kind="image"
              currentUrl={data.profile.avatar_url}
            />
            <label>
              Resume URL
              <input name="resume_url" defaultValue={data.profile.resume_url} />
            </label>
            <FileInputPreview
              name="resume_file"
              label="Upload resume"
              accept=".pdf,.doc,.docx"
              kind="file"
              currentUrl={data.profile.resume_url}
            />
            <label>
              Years of experience
              <input name="years_experience" type="number" defaultValue={data.profile.years_experience} />
            </label>
            <label>
              Projects shipped
              <input name="projects_shipped" type="number" defaultValue={data.profile.projects_shipped} />
            </label>
            <label>
              Companies worked
              <input name="companies_worked" type="number" defaultValue={data.profile.companies_worked} />
            </label>
          </AdminActionForm>
        </AdminPanelSection>

        <AdminPanelSection id="projects" className="admin-section-stack admin-section-anchor">
          <article className="admin-card">
            <p className="eyebrow">Projects</p>
            <h2>Add or update project case studies</h2>
            <AdminActionForm
              action={upsertProjectAction}
              className="admin-form"
              submitLabel="Save project"
              pendingLabel="Saving project..."
            >
              <label>
                Title
                <input name="title" required />
              </label>
              <label>
                Slug
                <input name="slug" placeholder="auto-generated-from-title" />
              </label>
              <label>
                Summary
                <input name="summary" required />
              </label>
              <label>
                Platform
                <input name="platform" placeholder="iOS / Android" />
              </label>
              <label>
                Description
                <textarea name="description" rows={4} required />
              </label>
              <label>
                Tech stack
                <input name="tech_stack" placeholder="React Native, TypeScript, Supabase" />
              </label>
              <label>
                Live URL
                <input name="live_url" />
              </label>
              <label>
                GitHub URL
                <input name="github_url" />
              </label>
              <label>
                Image URL
                <input name="image_url" />
              </label>
              <FileInputPreview
                name="image_file"
                label="Upload project image"
                accept="image/*"
                kind="image"
              />
              <label>
                Sort order
                <input name="sort_order" type="number" defaultValue={99} />
              </label>
              <label className="checkbox-row">
                <input name="featured" type="checkbox" />
                Featured project
              </label>
            </AdminActionForm>
          </article>

          <article className="admin-card">
            <div className="admin-section-heading">
              <div>
                <p className="eyebrow">Existing entries</p>
                <h2>Manage saved projects</h2>
              </div>
              <span className="admin-summary-pill">{data.projects.length} total</span>
            </div>
            <div className="entity-stack">
              {data.projects.map((project) => (
                <section key={project.id} className="entity-card">
                  <div className="entity-card-header">
                    <div>
                      <strong>{project.title}</strong>
                      <p>{project.platform || "Platform not set"}</p>
                    </div>
                    <AdminActionForm
                      action={deleteProjectAction}
                      className="inline-action-form"
                      submitLabel="Delete"
                      pendingLabel="Deleting..."
                      submitClassName="button button-secondary"
                    >
                      <input type="hidden" name="id" value={project.id} />
                    </AdminActionForm>
                  </div>
                  <AdminActionForm
                    action={upsertProjectAction}
                    className="admin-form"
                    submitLabel="Update project"
                    pendingLabel="Updating project..."
                  >
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="slug" value={project.slug} />
                    <label>
                      Title
                      <input name="title" defaultValue={project.title} required />
                    </label>
                    <label>
                      Summary
                      <input name="summary" defaultValue={project.summary} required />
                    </label>
                    <label>
                      Description
                      <textarea name="description" rows={4} defaultValue={project.description} required />
                    </label>
                    <label>
                      Tech stack
                      <input name="tech_stack" defaultValue={project.tech_stack.join(", ")} />
                    </label>
                    <label>
                      Platform
                      <input name="platform" defaultValue={project.platform} />
                    </label>
                    <label>
                      Live URL
                      <input name="live_url" defaultValue={project.live_url} />
                    </label>
                    <label>
                      GitHub URL
                      <input name="github_url" defaultValue={project.github_url} />
                    </label>
                    <label>
                      Image URL
                      <input name="image_url" defaultValue={project.image_url} />
                    </label>
                    <FileInputPreview
                      name="image_file"
                      label="Replace image"
                      accept="image/*"
                      kind="image"
                      currentUrl={project.image_url}
                    />
                    <label>
                      Sort order
                      <input name="sort_order" type="number" defaultValue={project.sort_order} />
                    </label>
                    <label className="checkbox-row">
                      <input name="featured" type="checkbox" defaultChecked={project.featured} />
                      Featured project
                    </label>
                  </AdminActionForm>
                </section>
              ))}
            </div>
          </article>
        </AdminPanelSection>

        <AdminPanelSection id="skills" className="admin-section-stack admin-section-anchor">
          <div className="admin-split-layout">
            <article className="admin-card admin-sticky-panel">
              <div className="admin-section-heading">
                <div>
                  <p className="eyebrow">Skills</p>
                  <h2>Create a new skill</h2>
                </div>
                <span className="admin-summary-pill">{data.skills.length} total</span>
              </div>
              <p className="muted-text">
                Add one skill at a time with a category and display order so your public portfolio stays tidy.
              </p>
              <AdminActionForm
                action={upsertSkillAction}
                className="admin-form admin-form-single"
                submitLabel="Save skill"
                pendingLabel="Saving skill..."
              >
                <label>
                  Skill name
                  <input name="name" placeholder="React Native" required />
                </label>
                <label>
                  Category
                  <input name="category" placeholder="Mobile" required />
                </label>
                <label>
                  Sort order
                  <input name="sort_order" type="number" defaultValue={99} />
                </label>
              </AdminActionForm>
            </article>

            <article className="admin-card">
              <div className="admin-section-heading">
                <div>
                  <p className="eyebrow">Manage skills</p>
                  <h2>Update existing skills</h2>
                </div>
              </div>
              <div className="entity-stack compact-stack">
                {data.skills.map((skill) => (
                  <section key={skill.id} className="entity-card">
                    <div className="entity-card-header">
                      <div>
                        <strong>{skill.name}</strong>
                        <p>{skill.category}</p>
                      </div>
                      <AdminActionForm
                        action={deleteSkillAction}
                        className="inline-action-form"
                        submitLabel="Delete"
                        pendingLabel="Deleting..."
                        submitClassName="button button-secondary"
                      >
                        <input type="hidden" name="id" value={skill.id} />
                      </AdminActionForm>
                    </div>
                    <AdminActionForm
                      action={upsertSkillAction}
                      className="admin-form admin-form-single"
                      submitLabel="Update skill"
                      pendingLabel="Updating skill..."
                    >
                      <input type="hidden" name="id" value={skill.id} />
                      <label>
                        Skill name
                        <input name="name" defaultValue={skill.name} required />
                      </label>
                      <label>
                        Category
                        <input name="category" defaultValue={skill.category} required />
                      </label>
                      <label>
                        Sort order
                        <input name="sort_order" type="number" defaultValue={skill.sort_order} />
                      </label>
                    </AdminActionForm>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </AdminPanelSection>

        <AdminPanelSection id="experience" className="admin-section-stack admin-section-anchor">
          <div className="admin-split-layout">
            <article className="admin-card admin-sticky-panel">
              <div className="admin-section-heading">
                <div>
                  <p className="eyebrow">Experience</p>
                  <h2>Add timeline entry</h2>
                </div>
                <span className="admin-summary-pill">{data.experiences.length} total</span>
              </div>
              <p className="muted-text">
                Create a concise timeline entry with company, role, dates, summary, and achievements.
              </p>
              <AdminActionForm
                action={upsertExperienceAction}
                className="admin-form admin-form-single"
                submitLabel="Save experience"
                pendingLabel="Saving experience..."
              >
                <label>
                  Company
                  <input name="company" required />
                </label>
                <label>
                  Role
                  <input name="role" required />
                </label>
                <label>
                  Start label
                  <input name="start_label" placeholder="2024" required />
                </label>
                <label>
                  End label
                  <input name="end_label" placeholder="Present" required />
                </label>
                <label>
                  Summary
                  <textarea name="summary" rows={4} required />
                </label>
                <label>
                  Achievements
                  <input name="achievements" placeholder="Built X, Improved Y, Shipped Z" />
                </label>
                <label>
                  Sort order
                  <input name="sort_order" type="number" defaultValue={99} />
                </label>
              </AdminActionForm>
            </article>

            <article className="admin-card">
              <div className="admin-section-heading">
                <div>
                  <p className="eyebrow">Manage timeline</p>
                  <h2>Update existing experience</h2>
                </div>
              </div>
              <div className="entity-stack compact-stack">
                {data.experiences.map((item) => (
                  <section key={item.id} className="entity-card">
                    <div className="entity-card-header">
                      <div>
                        <strong>{item.role}</strong>
                        <p>
                          {item.company} · {item.start_label} - {item.end_label}
                        </p>
                      </div>
                      <AdminActionForm
                        action={deleteExperienceAction}
                        className="inline-action-form"
                        submitLabel="Delete"
                        pendingLabel="Deleting..."
                        submitClassName="button button-secondary"
                      >
                        <input type="hidden" name="id" value={item.id} />
                      </AdminActionForm>
                    </div>
                    <AdminActionForm
                      action={upsertExperienceAction}
                      className="admin-form admin-form-single"
                      submitLabel="Update experience"
                      pendingLabel="Updating experience..."
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <label>
                        Company
                        <input name="company" defaultValue={item.company} required />
                      </label>
                      <label>
                        Role
                        <input name="role" defaultValue={item.role} required />
                      </label>
                      <label>
                        Start label
                        <input name="start_label" defaultValue={item.start_label} required />
                      </label>
                      <label>
                        End label
                        <input name="end_label" defaultValue={item.end_label} required />
                      </label>
                      <label>
                        Summary
                        <textarea name="summary" rows={4} defaultValue={item.summary} required />
                      </label>
                      <label>
                        Achievements
                        <input name="achievements" defaultValue={item.achievements.join(", ")} />
                      </label>
                      <label>
                        Sort order
                        <input name="sort_order" type="number" defaultValue={item.sort_order} />
                      </label>
                    </AdminActionForm>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </AdminPanelSection>

        <AdminPanelSection id="social-links" className="admin-section-stack admin-section-anchor">
          <article className="admin-card">
            <p className="eyebrow">Social Links</p>
            <h2>Manage footer and contact links</h2>
            <AdminActionForm
              action={upsertSocialLinkAction}
              className="admin-form"
              submitLabel="Save link"
              pendingLabel="Saving link..."
            >
              <label>
                Label
                <input name="label" placeholder="GitHub" required />
              </label>
              <label>
                URL
                <input name="href" placeholder="https://github.com/yourname" required />
              </label>
              <label>
                Sort order
                <input name="sort_order" type="number" defaultValue={99} />
              </label>
            </AdminActionForm>
          </article>

          <article className="admin-card">
            <div className="admin-section-heading">
              <div>
                <p className="eyebrow">Existing links</p>
                <h2>Update saved social links</h2>
              </div>
              <span className="admin-summary-pill">{data.socialLinks.length} total</span>
            </div>
            <div className="entity-stack compact-stack">
              {data.socialLinks.map((link) => (
                <section key={link.id} className="entity-card">
                  <div className="entity-card-header">
                    <div>
                      <strong>{link.label}</strong>
                      <p>{link.href}</p>
                    </div>
                    <AdminActionForm
                      action={deleteSocialLinkAction}
                      className="inline-action-form"
                      submitLabel="Delete"
                      pendingLabel="Deleting..."
                      submitClassName="button button-secondary"
                    >
                      <input type="hidden" name="id" value={link.id} />
                    </AdminActionForm>
                  </div>
                  <AdminActionForm
                    action={upsertSocialLinkAction}
                    className="admin-form"
                    submitLabel="Update link"
                    pendingLabel="Updating link..."
                  >
                    <input type="hidden" name="id" value={link.id} />
                    <label>
                      Label
                      <input name="label" defaultValue={link.label} required />
                    </label>
                    <label>
                      URL
                      <input name="href" defaultValue={link.href} required />
                    </label>
                    <label>
                      Sort order
                      <input name="sort_order" type="number" defaultValue={link.sort_order} />
                    </label>
                  </AdminActionForm>
                </section>
              ))}
            </div>
          </article>
        </AdminPanelSection>

        <AdminPanelSection id="messages" className="admin-card admin-section-anchor">
          <div className="admin-section-heading">
            <div>
              <p className="eyebrow">Contact messages</p>
              <h2>Inbox</h2>
            </div>
            <span className="admin-summary-pill">{data.messages.length} total</span>
          </div>
          {data.messages.length === 0 ? (
            <p className="muted-text">Messages submitted from the contact form will appear here.</p>
          ) : (
            <div className="message-list">
              {data.messages.map((message) => (
                <article key={message.id} className="message-card">
                  <div>
                    <strong>{message.name}</strong>
                    <p>{message.email}</p>
                  </div>
                  <p>{message.message}</p>
                  <AdminActionForm
                    action={deleteMessageAction}
                    className="inline-action-form"
                    submitLabel="Archive"
                    pendingLabel="Archiving..."
                    submitClassName="button button-secondary"
                  >
                    <input type="hidden" name="id" value={message.id} />
                  </AdminActionForm>
                </article>
              ))}
            </div>
          )}
        </AdminPanelSection>
      </AdminShell>
    </main>
  );
}
