import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/lib/data";

export default async function ContactPage() {
  const { profile, socialLinks } = await getPortfolioData();

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="inner-page">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h1>Let’s build an excellent mobile experience together.</h1>
        </div>
        <div className="contact-grid">
          <article className="surface-card contact-card">
            <h2>Reach out directly</h2>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {socialLinks.map((link) => (
              <a key={link.id} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </article>
          <article className="surface-card">
            <ContactForm />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
