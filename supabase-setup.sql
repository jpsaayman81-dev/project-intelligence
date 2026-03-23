-- Run this in your Supabase SQL Editor before launching the survey

create table if not exists public.market_survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_version text not null default 'Q2-2026',

  company_type text not null,
  role_title text not null,
  company_size text not null,
  region text not null,
  project_types text[] not null default '{}',
  typical_project_size text not null,
  active_projects text not null,

  site_report_tools text[] not null default '{}',
  site_report_software_other text,
  issue_tracking_tools text[] not null default '{}',
  issue_tracking_software_other text,
  vo_tracking_tools text[] not null default '{}',
  vo_tracking_other text,

  biggest_frustration text not null,
  second_biggest_frustration text not null,
  issues_lost_frequency text not null,
  documentation_failure_cost_money text not null,
  urgency_level text not null,

  admin_time_per_week text not null,
  dispute_frequency text not null,
  better_tracking_reduce_disputes text not null,

  valuable_features text[] not null default '{}',
  replace_stack_likelihood text not null,
  stop_using_new_system text,
  used_site_tool_before text not null,
  stopped_tool_reasons text[] not null default '{}',

  adoption_likelihood text not null,
  decision_maker text not null,

  price_cheap numeric,
  price_reasonable numeric,
  price_expensive numeric,
  price_too_expensive numeric,

  must_have_text text,

  early_access boolean not null default false,
  email text,
  whatsapp text,

  source text not null default 'website',
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_market_survey_responses_created_at
  on public.market_survey_responses(created_at desc);

alter table public.market_survey_responses enable row level security;

drop policy if exists "public_can_insert_market_survey_responses" on public.market_survey_responses;
create policy "public_can_insert_market_survey_responses"
on public.market_survey_responses
for insert
to anon, authenticated
with check (true);
