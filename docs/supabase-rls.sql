-- LINGUAPHIX testimonials — run in Supabase SQL Editor
-- Dashboard: Project → SQL Editor → New query → paste → Run
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

-- Drop legacy policy names if present
drop policy if exists "Public read approved testimonials" on public.testimonials;
drop policy if exists "Anon insert pending testimonials" on public.testimonials;
drop policy if exists "Deny anon update testimonials" on public.testimonials;
drop policy if exists "Deny anon delete testimonials" on public.testimonials;
drop policy if exists "Deny authenticated update testimonials" on public.testimonials;
drop policy if exists "Deny authenticated delete testimonials" on public.testimonials;

-- SELECT: only approved rows are visible to the public
create policy "Public read approved testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (approved = true);

-- INSERT: public may submit pending reviews only (approved must stay false)
create policy "Anon insert pending testimonials"
  on public.testimonials for insert
  to anon
  with check (approved = false);

-- UPDATE / DELETE: no policies for anon/authenticated → denied by default
-- Explicit deny policies (belt-and-suspenders if other policies are added later)
create policy "Deny anon update testimonials"
  on public.testimonials for update
  to anon
  using (false)
  with check (false);

create policy "Deny anon delete testimonials"
  on public.testimonials for delete
  to anon
  using (false);

create policy "Deny authenticated update testimonials"
  on public.testimonials for update
  to authenticated
  using (false)
  with check (false);

create policy "Deny authenticated delete testimonials"
  on public.testimonials for delete
  to authenticated
  using (false);

-- ── Grants (table access still gated by RLS above) ───────────────────────
revoke all on public.testimonials from anon, authenticated;
grant select, insert on public.testimonials to anon;
grant select on public.testimonials to authenticated;

-- ── Verify in dashboard ───────────────────────────────────────────────────
-- Table Editor → testimonials → RLS should show "Enabled"
-- Authentication → Policies → 6 policies on public.testimonials
-- After deploy, run: node scripts/verify-supabase-rls.mjs
