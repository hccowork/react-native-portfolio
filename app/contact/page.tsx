import { ContactForm } from "@/components/contact-form";
import { DirectContactCard } from "@/components/direct-contact-card";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioData } from "@/lib/data";

export default async function ContactPage() {
  const { profile, socialLinks } = await getPortfolioData();

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="inner-page">
        <Reveal as="div" className="section-heading">
          <p className="eyebrow">Contact</p>
          <h1>Let’s build an excellent mobile experience together.</h1>
        </Reveal>
        <div className="contact-grid">
          <DirectContactCard profile={profile} socialLinks={socialLinks} />
          <article className="surface-card">
            <ContactForm />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
