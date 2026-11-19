import type { Route } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { getPortfolioData } from "@/lib/data";
import { normalizeSocialLinkUrl, normalizeWhatsAppNumber } from "@/lib/utils";
import { ArrowRightIcon, GithubIcon, LinkIcon, LinkedinIcon, MailIcon, WhatsappIcon } from "@/components/icons";

export async function SiteFooter() {
  const { profile, socialLinks } = await getPortfolioData();
  const whatsappNumber = normalizeWhatsAppNumber(profile.whatsapp_number);
  const whatsappMessage = encodeURIComponent("Hello, I'd like to connect with you regarding your projects.");

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
        <p>Explore the portfolio, review case studies, and get a quick feel for the work and background.</p>
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
            const href = normalizeSocialLinkUrl(link.href);

            if (!href) {
              return null;
            }

            return (
              <a
                key={link.id}
                href={href}
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
          {whatsappNumber ? (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="social-icon-link social-icon-link-whatsapp"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <WhatsappIcon className="social-icon" />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
