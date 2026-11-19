import type { ComponentType } from "react";
import { ArrowRightIcon, GithubIcon, LinkIcon, LinkedinIcon, MailIcon, PhoneIcon } from "@/components/icons";
import type { Profile, SocialLink } from "@/lib/types";
import { normalizeSocialLinkUrl, normalizeWhatsAppNumber } from "@/lib/utils";

type DirectContactCardProps = {
  profile: Profile;
  socialLinks: SocialLink[];
};

const socialIconByLabel: Record<string, ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
};

export function DirectContactCard({ profile, socialLinks }: DirectContactCardProps) {
  const whatsappNumber = normalizeWhatsAppNumber(profile.whatsapp_number);
  const validSocialLinks = socialLinks
    .map((link) => ({ ...link, href: normalizeSocialLinkUrl(link.href) }))
    .filter((link) => Boolean(link.href));

  return (
    <article className="surface-card direct-contact-card">
      <div className="direct-contact-heading">
        <p className="eyebrow">Direct contact</p>
        <h3>Let&apos;s start a conversation.</h3>
        <p>Choose the contact method that works best for you.</p>
      </div>

      <div className="direct-contact-actions">
        {profile.email ? (
          <a className="direct-contact-action direct-contact-email" href={`mailto:${profile.email}`}>
            <span className="direct-contact-icon">
              <MailIcon />
            </span>
            <span className="direct-contact-copy">
              <small>Email</small>
              <strong>{profile.email}</strong>
            </span>
            <ArrowRightIcon className="direct-contact-arrow" />
          </a>
        ) : null}

        {whatsappNumber ? (
          <a
            className="direct-contact-action direct-contact-whatsapp"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'd like to connect with you regarding your projects.")}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="direct-contact-icon">
              <PhoneIcon />
            </span>
            <span className="direct-contact-copy">
              <small>Message on</small>
              <strong>WhatsApp: +{whatsappNumber}</strong>
            </span>
            <ArrowRightIcon className="direct-contact-arrow" />
          </a>
        ) : null}

        {validSocialLinks.length > 0 ? (
          <div className="direct-contact-socials">
            {validSocialLinks.map((link) => {
              const SocialIcon = socialIconByLabel[link.label.toLowerCase()] ?? LinkIcon;

              return (
                <a
                  key={link.id}
                  className="direct-contact-action"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="direct-contact-icon">
                    <SocialIcon />
                  </span>
                  <span className="direct-contact-copy">
                    <small>Connect on</small>
                    <strong>{link.label}</strong>
                  </span>
                  <ArrowRightIcon className="direct-contact-arrow" />
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}
