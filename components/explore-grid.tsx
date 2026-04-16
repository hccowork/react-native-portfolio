import type { Route } from "next";
import Link from "next/link";
import { ArrowRightIcon, BriefcaseIcon, FolderIcon, MailIcon, ShieldIcon, UserIcon } from "@/components/icons";

const items: Array<{
  href: Route;
  title: string;
  description: string;
  Icon: typeof UserIcon;
}> = [
  {
    href: "/#about",
    title: "About & story",
    description: "Quickly understand your background, focus area, and what kind of mobile work you do.",
    Icon: UserIcon,
  },
  {
    href: "/#projects",
    title: "Featured projects",
    description: "Jump into app case studies, stacks, and the strongest work you want people to notice first.",
    Icon: FolderIcon,
  },
  {
    href: "/#experience",
    title: "Experience timeline",
    description: "See your delivery history, product impact, and the kind of teams you support best.",
    Icon: BriefcaseIcon,
  },
  {
    href: "/admin/login",
    title: "Admin access",
    description: "Manage portfolio content from one place once Supabase auth is connected.",
    Icon: ShieldIcon,
  },
  {
    href: "/contact",
    title: "Contact flow",
    description: "Review the public contact experience and the lead capture path for new opportunities.",
    Icon: MailIcon,
  },
];

export function ExploreGrid() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Explore</p>
        <h2>Everything important is one click away.</h2>
      </div>
      <div className="explore-grid">
        {items.map(({ href, title, description, Icon }) => (
          <Link key={href} href={href} className="explore-card">
            <div className="explore-icon-shell">
              <Icon className="explore-icon" />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <ArrowRightIcon className="explore-arrow" />
          </Link>
        ))}
      </div>
    </section>
  );
}
