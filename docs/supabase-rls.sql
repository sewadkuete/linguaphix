-- LINGUAPHIX testimonials — run in Supabase SQL editor after creating the table.
-- Use the anon key only in js/site-config.js (never the service_role key in the browser).

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  service text not null,
  rating int not null check (rating between 1 and 5),
  message text not null,
  location text,
  approved boolean not null default false
);

alter table public.testimonials enable row level security;

-- Public read: approved testimonials only
drop policy if exists "Public read approved testimonials" on public.testimonials;
create policy "Public read approved testimonials"
  on public.testimonials for select
  using (approved = true);

-- Anonymous insert: pending approval (no direct publish)
drop policy if exists "Anon insert pending testimonials" on public.testimonials;
create policy "Anon insert pending testimonials"
  on public.testimonials for insert
  to anon
  with check (approved = false);

-- No update/delete for anon (manage via Supabase dashboard or service role server-side)
