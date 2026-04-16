import type { Route } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { getPortfolioData } from "@/lib/data";
import { ArrowRightIcon, GithubIcon, LinkIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export async function SiteFooter() {
  const { profile, socialLinks } = await getPortfolioData();

  const socialIconByLabel: Record<string, ComponentType<{ className?: string }>> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    email: MailIcon,
  };

  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <p className="eyebrow">Ready for mobile-first product work</p>
        <h2>{profile.full_name}</h2>
        <p>Explore the portfolio, review case studies, or jump into the admin area to manage the content.</p>
      </div>
      <div className="footer-clusters">
        <div className="footer-links">
          <Link href={"/#about" as Route} className="footer-shortcut">
            <span>About</span>
            <ArrowRightIcon className="footer-arrow" />
          </Link>
          <Link href={"/#projects" as Route} className="footer-shortcut">
            <span>Projects</span>
            <ArrowRightIcon className="footer-arrow" />
          </Link>
          <Link href={"/#contact" as Route} className="footer-shortcut">
            <span>Contact</span>
            <ArrowRightIcon className="footer-arrow" />
          </Link>
        </div>
        <div className="footer-socials">
          {socialLinks.map((link) => {
            const SocialIcon = socialIconByLabel[link.label.toLowerCase()] ?? LinkIcon;

            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                aria-label={link.label}
                title={link.label}
              >
                <SocialIcon className="social-icon" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
