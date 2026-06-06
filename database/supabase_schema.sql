-- Muhammad Haider Abbas Portfolio
-- Supabase PostgreSQL database schema
-- Run this first in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  );
$$;

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  hero_image text,
  about_image text,
  home_about_image text,
  page_hero_media text,
  cta_media text,
  hero_badge text,
  about_title text,
  about_content text,
  about_highlight text,
  page_hero_overlay numeric default 0.50,
  cta_overlay numeric default 0.50,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  summary text,
  image text,
  status text,
  role text,
  year text,
  tools text,
  tags jsonb not null default '[]'::jsonb,
  content jsonb not null default '{}'::jsonb,
  is_featured boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  summary text,
  image text,
  publish_date date,
  author text default 'Muhammad Haider Abbas',
  content text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  issuer text,
  completion_date text,
  summary text,
  icon text,
  image text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  image text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  place text,
  start_year text,
  end_year text,
  period text,
  summary text,
  type text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  place text,
  start_year text,
  end_year text,
  period text,
  summary text,
  type text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.design_skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  percent int not null default 0 check (percent >= 0 and percent <= 100),
  sort_order int not null default 0
);

create table if not exists public.coding_skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  percent int not null default 0 check (percent >= 0 and percent <= 100),
  sort_order int not null default 0
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.blogs enable row level security;
alter table public.certifications enable row level security;
alter table public.skills enable row level security;
alter table public.experience enable row level security;
alter table public.education enable row level security;
alter table public.design_skills enable row level security;
alter table public.coding_skills enable row level security;
alter table public.messages enable row level security;

-- Public read policies
drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings" on public.site_settings for select to anon, authenticated using (true);

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects" on public.projects for select to anon, authenticated using (true);

drop policy if exists "Public can read published blogs" on public.blogs;
create policy "Public can read published blogs" on public.blogs for select to anon, authenticated using (is_published = true or public.is_portfolio_admin());

drop policy if exists "Public can read certifications" on public.certifications;
create policy "Public can read certifications" on public.certifications for select to anon, authenticated using (true);

drop policy if exists "Public can read skills" on public.skills;
create policy "Public can read skills" on public.skills for select to anon, authenticated using (true);

drop policy if exists "Public can read experience" on public.experience;
create policy "Public can read experience" on public.experience for select to anon, authenticated using (true);

drop policy if exists "Public can read education" on public.education;
create policy "Public can read education" on public.education for select to anon, authenticated using (true);

drop policy if exists "Public can read design skills" on public.design_skills;
create policy "Public can read design skills" on public.design_skills for select to anon, authenticated using (true);

drop policy if exists "Public can read coding skills" on public.coding_skills;
create policy "Public can read coding skills" on public.coding_skills for select to anon, authenticated using (true);

-- Anyone can submit a contact form message.
drop policy if exists "Anyone can submit messages" on public.messages;
create policy "Anyone can submit messages" on public.messages for insert to anon, authenticated with check (true);

-- Admin access
drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users" on public.admin_users for select to authenticated using (public.is_portfolio_admin());

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings" on public.site_settings for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects" on public.projects for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can manage blogs" on public.blogs;
create policy "Admins can manage blogs" on public.blogs for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can manage certifications" on public.certifications;
create policy "Admins can manage certifications" on public.certifications for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can manage skills" on public.skills;
create policy "Admins can manage skills" on public.skills for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can manage experience" on public.experience;
create policy "Admins can manage experience" on public.experience for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can manage education" on public.education;
create policy "Admins can manage education" on public.education for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can manage design skills" on public.design_skills;
create policy "Admins can manage design skills" on public.design_skills for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can manage coding skills" on public.coding_skills;
create policy "Admins can manage coding skills" on public.coding_skills for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can read messages" on public.messages;
create policy "Admins can read messages" on public.messages for select to authenticated using (public.is_portfolio_admin());

drop policy if exists "Admins can update messages" on public.messages;
create policy "Admins can update messages" on public.messages for update to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Admins can delete messages" on public.messages;
create policy "Admins can delete messages" on public.messages for delete to authenticated using (public.is_portfolio_admin());

grant usage on schema public to anon, authenticated;
grant select on public.site_settings, public.projects, public.blogs, public.certifications, public.skills, public.experience, public.education, public.design_skills, public.coding_skills to anon, authenticated;
grant insert on public.messages to anon, authenticated;
grant all on public.site_settings, public.projects, public.blogs, public.certifications, public.skills, public.experience, public.education, public.design_skills, public.coding_skills, public.messages to authenticated;

-- Public storage bucket for images/videos.
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read portfolio media" on storage.objects;
create policy "Public can read portfolio media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'portfolio-media');

drop policy if exists "Admins can upload portfolio media" on storage.objects;
create policy "Admins can upload portfolio media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());

drop policy if exists "Admins can update portfolio media" on storage.objects;
create policy "Admins can update portfolio media"
on storage.objects for update
to authenticated
using (bucket_id = 'portfolio-media' and public.is_portfolio_admin())
with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());

drop policy if exists "Admins can delete portfolio media" on storage.objects;
create policy "Admins can delete portfolio media"
on storage.objects for delete
to authenticated
using (bucket_id = 'portfolio-media' and public.is_portfolio_admin());
