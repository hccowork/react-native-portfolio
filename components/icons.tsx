import type { PropsWithChildren } from "react";

type IconProps = {
  className?: string;
};

function IconWrapper({ className, children }: PropsWithChildren<IconProps>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </IconWrapper>
  );
}

export function FolderIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
    </IconWrapper>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6" />
      <rect x="3" y="6" width="18" height="14" rx="2.5" />
      <path d="M3 11h18" />
    </IconWrapper>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m5 7 7 5 7-5" />
    </IconWrapper>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M12 3c2.7 1.7 5.7 2.5 9 2.5v5.8c0 5.2-3.3 8.8-9 9.7-5.7-.9-9-4.5-9-9.7V5.5C6.3 5.5 9.3 4.7 12 3Z" />
    </IconWrapper>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconWrapper>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M9 18c-4 1.2-4-2-6-2" />
      <path d="M15 22v-3.1a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.6 6.8-7.2A5.6 5.6 0 0 0 19.2 5a5.2 5.2 0 0 0-.1-3.9S17.8.7 15 2.6a13.2 13.2 0 0 0-6 0C6.2.7 4.9 1.1 4.9 1.1A5.2 5.2 0 0 0 4.8 5a5.6 5.6 0 0 0-1.6 4.1c0 5.6 3.5 6.8 6.8 7.2a3.4 3.4 0 0 0-1 2.6V22" />
    </IconWrapper>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M7 9v8" />
      <path d="M7 6.5v.1" />
      <path d="M12 17V9" />
      <path d="M12 12a3 3 0 0 1 6 0v5" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </IconWrapper>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" />
      <path d="M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11" />
    </IconWrapper>
  );
}
