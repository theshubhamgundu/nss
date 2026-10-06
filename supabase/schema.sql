-- Parliament 2K26 registration setup

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_number text not null,
  email text not null,
  branch text not null,
  section text not null,
  year text not null,
  payment_screenshot_path text not null,
  payment_amount integer not null default 100 check (payment_amount = 100),
  payment_status text not null default 'submitted'
    check (payment_status in ('submitted', 'verified', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists registrations_created_at_idx
  on public.registrations (created_at desc);

alter table public.registrations enable row level security;

drop policy if exists "Anyone can submit registrations" on public.registrations;
create policy "Anyone can submit registrations"
  on public.registrations
  for insert
  to anon, authenticated
  with check (
    payment_amount = 100
    and payment_status = 'submitted'
  );

drop policy if exists "Authenticated admins can view registrations" on public.registrations;
create policy "Authenticated admins can view registrations"
  on public.registrations
  for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'vgnt@nss.in');

insert into storage.buckets (id, name, public)
values ('payment-screenshots', 'payment-screenshots', false)
on conflict (id) do nothing;

drop policy if exists "Anyone can upload payment screenshots" on storage.objects;
create policy "Anyone can upload payment screenshots"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'payment-screenshots');

drop policy if exists "Authenticated admins can view payment screenshots" on storage.objects;
create policy "Authenticated admins can view payment screenshots"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'payment-screenshots'
    and (auth.jwt() ->> 'email') = 'vgnt@nss.in'
  );
