-- COMPLETE TESTED SUPABASE SCHEMA FOR HAIDER ABBAS PERSONAL PORTFOLIO CMS
-- Run this full file in Supabase SQL Editor before using the live admin panel.
-- It creates/repairs every required table in public schema and reloads PostgREST schema cache.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email',''))
  );
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text,
  status text,
  year text,
  role text,
  image text,
  summary text,
  tags text[] default '{}'::text[],
  tools text,
  content jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text,
  date date,
  image text,
  summary text,
  content text,
  created_at timestamptz default now()
);

create table if not exists public.certs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  summary text,
  icon text,
  image text,
  completion_date text,
  created_at timestamptz default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  image text,
  created_at timestamptz default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  slug text,
  title text not null,
  place text,
  period text,
  summary text,
  type text,
  start_year text,
  end_year text,
  created_at timestamptz default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  slug text,
  title text not null,
  place text,
  period text,
  summary text,
  type text,
  start_year text,
  end_year text,
  created_at timestamptz default now()
);

create table if not exists public.design_skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  percent int default 0,
  created_at timestamptz default now()
);

create table if not exists public.coding_skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  percent int default 0,
  created_at timestamptz default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  hero_name text,
  hero_badge text,
  hero_role text,
  hero_image text,
  about_title text,
  about_content text,
  about_highlight text,
  about_image text,
  page_hero_media text,
  cta_media text,
  page_hero_overlay text,
  cta_overlay text,
  home_about_image text,
  created_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

-- Safe migrations for databases that already ran an older package.
alter table if exists public.projects add column if not exists title text;
alter table if exists public.projects add column if not exists slug text;
alter table if exists public.projects add column if not exists category text;
alter table if exists public.projects add column if not exists status text;
alter table if exists public.projects add column if not exists year text;
alter table if exists public.projects add column if not exists role text;
alter table if exists public.projects add column if not exists image text;
alter table if exists public.projects add column if not exists summary text;
alter table if exists public.projects add column if not exists tags text[] default '{}'::text[];
alter table if exists public.projects add column if not exists tools text;
alter table if exists public.projects add column if not exists content jsonb default '{}'::jsonb;
alter table if exists public.projects add column if not exists created_at timestamptz default now();

alter table if exists public.blogs add column if not exists title text;
alter table if exists public.blogs add column if not exists slug text;
alter table if exists public.blogs add column if not exists category text;
alter table if exists public.blogs add column if not exists date date;
alter table if exists public.blogs add column if not exists image text;
alter table if exists public.blogs add column if not exists summary text;
alter table if exists public.blogs add column if not exists content text;
alter table if exists public.blogs add column if not exists created_at timestamptz default now();

alter table if exists public.certs add column if not exists title text;
alter table if exists public.certs add column if not exists issuer text;
alter table if exists public.certs add column if not exists summary text;
alter table if exists public.certs add column if not exists icon text;
alter table if exists public.certs add column if not exists image text;
alter table if exists public.certs add column if not exists completion_date text;
alter table if exists public.certs add column if not exists created_at timestamptz default now();

alter table if exists public.skills add column if not exists title text;
alter table if exists public.skills add column if not exists summary text;
alter table if exists public.skills add column if not exists image text;
alter table if exists public.skills add column if not exists created_at timestamptz default now();

alter table if exists public.experience add column if not exists slug text;
alter table if exists public.experience add column if not exists title text;
alter table if exists public.experience add column if not exists place text;
alter table if exists public.experience add column if not exists period text;
alter table if exists public.experience add column if not exists summary text;
alter table if exists public.experience add column if not exists type text;
alter table if exists public.experience add column if not exists start_year text;
alter table if exists public.experience add column if not exists end_year text;
alter table if exists public.experience add column if not exists created_at timestamptz default now();

alter table if exists public.education add column if not exists slug text;
alter table if exists public.education add column if not exists title text;
alter table if exists public.education add column if not exists place text;
alter table if exists public.education add column if not exists period text;
alter table if exists public.education add column if not exists summary text;
alter table if exists public.education add column if not exists type text;
alter table if exists public.education add column if not exists start_year text;
alter table if exists public.education add column if not exists end_year text;
alter table if exists public.education add column if not exists created_at timestamptz default now();

alter table if exists public.design_skills add column if not exists title text;
alter table if exists public.design_skills add column if not exists percent int default 0;
alter table if exists public.design_skills add column if not exists created_at timestamptz default now();

alter table if exists public.coding_skills add column if not exists title text;
alter table if exists public.coding_skills add column if not exists percent int default 0;
alter table if exists public.coding_skills add column if not exists created_at timestamptz default now();

alter table if exists public.settings add column if not exists hero_name text;
alter table if exists public.settings add column if not exists hero_badge text;
alter table if exists public.settings add column if not exists hero_role text;
alter table if exists public.settings add column if not exists hero_image text;
alter table if exists public.settings add column if not exists about_title text;
alter table if exists public.settings add column if not exists about_content text;
alter table if exists public.settings add column if not exists about_highlight text;
alter table if exists public.settings add column if not exists about_image text;
alter table if exists public.settings add column if not exists page_hero_media text;
alter table if exists public.settings add column if not exists cta_media text;
alter table if exists public.settings add column if not exists page_hero_overlay text;
alter table if exists public.settings add column if not exists cta_overlay text;
alter table if exists public.settings add column if not exists home_about_image text;
alter table if exists public.settings add column if not exists created_at timestamptz default now();

alter table if exists public.messages add column if not exists name text;
alter table if exists public.messages add column if not exists email text;
alter table if exists public.messages add column if not exists subject text;
alter table if exists public.messages add column if not exists message text;
alter table if exists public.messages add column if not exists status text default 'new';
alter table if exists public.messages add column if not exists created_at timestamptz default now();

-- RLS
alter table public.projects enable row level security;
alter table public.blogs enable row level security;
alter table public.certs enable row level security;
alter table public.skills enable row level security;
alter table public.experience enable row level security;
alter table public.education enable row level security;
alter table public.design_skills enable row level security;
alter table public.coding_skills enable row level security;
alter table public.settings enable row level security;
alter table public.messages enable row level security;
alter table public.admin_users enable row level security;

-- Policies, recreated safely.
drop policy if exists "Public read projects" on public.projects;
drop policy if exists "Public read blogs" on public.blogs;
drop policy if exists "Public read certs" on public.certs;
drop policy if exists "Public read skills" on public.skills;
drop policy if exists "Public read experience" on public.experience;
drop policy if exists "Public read education" on public.education;
drop policy if exists "Public read design skills" on public.design_skills;
drop policy if exists "Public read coding skills" on public.coding_skills;
drop policy if exists "Public read settings" on public.settings;
drop policy if exists "Public insert messages" on public.messages;
drop policy if exists "Admin manage messages" on public.messages;
drop policy if exists "Admin manage projects" on public.projects;
drop policy if exists "Admin manage blogs" on public.blogs;
drop policy if exists "Admin manage certs" on public.certs;
drop policy if exists "Admin manage skills" on public.skills;
drop policy if exists "Admin manage experience" on public.experience;
drop policy if exists "Admin manage education" on public.education;
drop policy if exists "Admin manage design skills" on public.design_skills;
drop policy if exists "Admin manage coding skills" on public.coding_skills;
drop policy if exists "Admin manage settings" on public.settings;
drop policy if exists "Admin read admin users" on public.admin_users;

create policy "Public read projects" on public.projects for select using (true);
create policy "Public read blogs" on public.blogs for select using (true);
create policy "Public read certs" on public.certs for select using (true);
create policy "Public read skills" on public.skills for select using (true);
create policy "Public read experience" on public.experience for select using (true);
create policy "Public read education" on public.education for select using (true);
create policy "Public read design skills" on public.design_skills for select using (true);
create policy "Public read coding skills" on public.coding_skills for select using (true);
create policy "Public read settings" on public.settings for select using (true);
create policy "Public insert messages" on public.messages for insert with check (true);
create policy "Admin manage messages" on public.messages for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage projects" on public.projects for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage blogs" on public.blogs for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage certs" on public.certs for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage skills" on public.skills for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage experience" on public.experience for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage education" on public.education for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage design skills" on public.design_skills for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage coding skills" on public.coding_skills for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin manage settings" on public.settings for all using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
create policy "Admin read admin users" on public.admin_users for select using (public.is_portfolio_admin());

-- Required default settings row: prevents public.settings empty/missing-content issues.
insert into public.settings (
  hero_name, hero_badge, hero_role, hero_image, about_title, about_content, about_highlight,
  about_image, page_hero_media, cta_media, page_hero_overlay, cta_overlay, home_about_image
)
select
  'Muhammad Haider Abbas',
  'Available for AI, web, game, VFX and cybersecurity projects',
  'Game Developer • 2D/3D Animator • VFX Artist • Web & AI Systems Builder',
  'assets/svg/hero-avatar.svg',
  'A multidisciplinary creator shaping technology with design, security and real-world purpose.',
  'I am Muhammad Haider Abbas, a UK-based MSc Computer Science & Technology student and multidisciplinary creator working across AI, cybersecurity, web systems, game development, 3D animation and VFX. My work combines academic research, practical software engineering, operational discipline and visual storytelling. I like building systems that are clean, scalable, secure-thinking and visually strong, so every project feels ready for real users, employers, clients and academic presentation.',
  'My portfolio is designed to show one clear identity: a technical problem-solver who can also design, present and build polished digital experiences.',
  'assets/svg/about-portrait.svg',
  'assets/videos/hero-background.mp4',
  'assets/videos/cta-background.mp4',
  '0.50',
  '0.50',
  'assets/svg/home-about-visual.svg'
where not exists (select 1 from public.settings);

-- Replace this email after creating the Supabase Auth user, or run the insert manually.
-- insert into public.admin_users(email) values ('your-email@example.com') on conflict (email) do nothing;

notify pgrst, 'reload schema';
