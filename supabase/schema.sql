create extension if not exists "pgcrypto";

create table if not exists public.profile (
  id text primary key default 'profile-1',
  full_name text not null,
  title text not null,
  intro text not null,
  long_bio text not null,
  location text default '',
  email text default '',
  resume_url text default '',
  avatar_url text default '',
  years_experience integer default 0,
  projects_shipped integer default 0,
  companies_worked integer default 0
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text not null,
  description text not null,
  tech_stack text[] default '{}',
  image_url text default '',
  live_url text default '',
  github_url text default '',
  platform text default '',
  featured boolean default false,
  sort_order integer default 99
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  start_label text not null,
  end_label text not null,
  summary text not null,
  achievements text[] default '{}',
  sort_order integer default 99
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  sort_order integer default 99
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  sort_order integer default 99
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;
alter table public.social_links enable row level security;
alter table public.messages enable row level security;

drop policy if exists "Public can read profile" on public.profile;
create policy "Public can read profile"
on public.profile for select
to anon, authenticated
using (true);

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
on public.projects for select
to anon, authenticated
using (true);

drop policy if exists "Public can read experiences" on public.experiences;
create policy "Public can read experiences"
on public.experiences for select
to anon, authenticated
using (true);

drop policy if exists "Public can read skills" on public.skills;
create policy "Public can read skills"
on public.skills for select
to anon, authenticated
using (true);

drop policy if exists "Public can read social links" on public.social_links;
create policy "Public can read social links"
on public.social_links for select
to anon, authenticated
using (true);

drop policy if exists "Anyone can insert messages" on public.messages;
create policy "Anyone can insert messages"
on public.messages for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated can read messages" on public.messages;
create policy "Authenticated can read messages"
on public.messages for select
to authenticated
using (true);

insert into public.profile (
  id,
  full_name,
  title,
  intro,
  long_bio,
  location,
  email,
  resume_url,
  avatar_url,
  years_experience,
  projects_shipped,
  companies_worked
)
values (
  'profile-1',
  'Prem Mehta',
  'React Native Developer',
  'I build polished mobile experiences with React Native, thoughtful UX, and production-ready frontend architecture.',
  'I''m a React Native developer focused on fast, reliable mobile apps with clean UI systems, scalable state management, and strong collaboration with backend and product teams.',
  'India',
  'prem@example.com',
  '#',
  '',
  3,
  12,
  4
)
on conflict (id) do nothing;

insert into public.projects (title, slug, summary, description, tech_stack, live_url, github_url, platform, featured, sort_order)
values
  ('Fintech Wallet App', 'fintech-wallet-app', 'A secure mobile wallet with onboarding, transfers, and transaction insights.', 'Built a React Native wallet app with biometric authentication, real-time transaction updates, and modular UI components for rapid feature delivery.', array['React Native', 'TypeScript', 'Redux Toolkit', 'Supabase'], 'https://example.com', 'https://github.com/', 'iOS / Android', true, 1),
  ('Healthcare Booking App', 'healthcare-booking-app', 'Appointment booking with doctor search, reminders, and secure profile flows.', 'Created reusable booking flows, push notification hooks, and offline-friendly appointment states for a healthcare platform.', array['React Native', 'Expo', 'Firebase', 'REST API'], 'https://example.com', 'https://github.com/', 'Mobile', true, 2),
  ('Logistics Driver App', 'logistics-driver-app', 'Delivery workflow app with route status updates and proof-of-delivery uploads.', 'Implemented role-based navigation, live order states, image uploads, and performance optimizations for large delivery lists.', array['React Native', 'TypeScript', 'React Query', 'Maps'], 'https://example.com', 'https://github.com/', 'Android', false, 3)
on conflict (slug) do nothing;

insert into public.experiences (company, role, start_label, end_label, summary, achievements, sort_order)
values
  ('Freelance', 'React Native Developer', '2024', 'Present', 'Delivered mobile apps and frontend features with a focus on quality, maintainability, and release confidence.', array['Built reusable cross-platform component patterns', 'Integrated auth, APIs, push notifications, and analytics', 'Improved mobile performance and release workflows'], 1),
  ('Product Team', 'Frontend Developer', '2023', '2024', 'Worked on user-facing mobile experiences, collaborating with designers and backend engineers on feature delivery.', array['Owned high-traffic onboarding and profile flows', 'Reduced regressions with better component structure', 'Helped define scalable frontend practices'], 2);

insert into public.skills (name, category, sort_order)
values
  ('React Native', 'Mobile', 1),
  ('Expo', 'Mobile', 2),
  ('TypeScript', 'Frontend', 3),
  ('Next.js', 'Frontend', 4),
  ('Supabase', 'Backend', 5),
  ('Firebase', 'Backend', 6),
  ('Redux Toolkit', 'State', 7),
  ('React Query', 'State', 8),
  ('REST APIs', 'Backend', 9),
  ('Git', 'Tools', 10);

insert into public.social_links (label, href, sort_order)
values
  ('GitHub', 'https://github.com/', 1),
  ('LinkedIn', 'https://www.linkedin.com/', 2),
  ('Email', 'mailto:prem@example.com', 3);
