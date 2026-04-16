import type { Route } from "next";
import Link from "next/link";
import { getCurrentAdminUser } from "@/lib/auth";
import { getPortfolioData } from "@/lib/data";
import { BriefcaseIcon, FolderIcon, MailIcon, ShieldIcon, UserIcon } from "@/components/icons";

export async function SiteHeader() {
  const { profile } = await getPortfolioData();
  const adminUser = await getCurrentAdminUser();

  const navItems: Array<{ href: Route; label: string; icon: typeof UserIcon }> = [
    { href: "/#about", label: "About", icon: UserIcon },
    { href: "/#projects", label: "Projects", icon: FolderIcon },
    { href: "/#experience", label: "Experience", icon: BriefcaseIcon },
    { href: "/#contact", label: "Contact", icon: MailIcon },
  ];

  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup">
        <span className="brand-mark">
          {profile.full_name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
        <span className="brand-copy">
          <strong>{profile.full_name}</strong>
          <span>{profile.title}</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="nav-icon-link" aria-label={item.label} title={item.label}>
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {adminUser ? (
          <Link href="/admin" className="nav-pill nav-icon-link" aria-label="Admin" title="Admin">
            <ShieldIcon className="nav-icon" />
            <span>Admin</span>
          </Link>
        ) : null}
      </nav>
    </header>
  );
}
