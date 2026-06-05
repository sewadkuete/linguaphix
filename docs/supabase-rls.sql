-- LINGUAPHIX testimonials — run in Supabase SQL Editor
-- Use the anon key only in the browser (never service_role).

-- ── New project: create table ─────────────────────────────────────────────
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  role text,
  service text not null,
  rating int not null check (rating between 1 and 5),
  message text not null,
  location text,
  approved boolean not null default false
);

-- ── Existing project: add role column (safe to run again) ───────────────
alter table public.testimonials
  add column if not exists role text;

comment on column public.testimonials.role is 'Job title, status, or context (e.g. TCF candidate, entrepreneur)';

-- ── Row Level Security ────────────────────────────────────────────────────
alter table public.testimonials enable row level security;

drop policy if exists "Public read approved testimonials" on public.testimonials;
create policy "Public read approved testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (approved = true);

drop policy if exists "Anon insert pending testimonials" on public.testimonials;
create policy "Anon insert pending testimonials"
  on public.testimonials for insert
  to anon
  with check (approved = false);
