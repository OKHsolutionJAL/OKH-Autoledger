-- OKH AutoLedger - Schema inicial PostgreSQL/Supabase
-- Foco: MVP multi-tenant com store_id, auditoria financeira e paineis OKH.

create extension if not exists pgcrypto;
create schema if not exists private;

create type store_plan as enum (
  'starter',
  'pro',
  'premium_operational'
);

create type store_status as enum (
  'active',
  'overdue',
  'blocked',
  'free_trial',
  'cancelled'
);

create type user_role as enum (
  'okh_admin_master',
  'okh_operator',
  'store_owner',
  'store_employee',
  'read_only'
);

create type user_status as enum (
  'active',
  'blocked',
  'invited',
  'inactive'
);

create type vehicle_status as enum (
  'entry',
  'in_preparation',
  'waiting_parts',
  'waiting_shaken',
  'ready_for_sale',
  'listed',
  'reserved',
  'sold',
  'archived',
  'loss'
);

create type vehicle_origin as enum (
  'auction',
  'direct_purchase',
  'trade_in',
  'consignment',
  'internal_resale',
  'other'
);

create type checklist_status as enum (
  'pending',
  'in_progress',
  'completed',
  'cancelled'
);

create type premium_request_status as enum (
  'received',
  'in_review',
  'missing_information',
  'registering',
  'published',
  'cancelled'
);

create type premium_priority as enum (
  'low',
  'normal',
  'high'
);

create table stores (
  id uuid primary key default gen_random_uuid(),
  store_code text not null unique,
  name text not null,
  owner_name text not null,
  email text not null,
  phone text,
  address text,
  plan store_plan not null default 'starter',
  status store_status not null default 'free_trial',
  car_limit integer,
  premium_entry_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table profiles (
  id uuid primary key,
  store_id uuid references stores(id),
  name text not null,
  email text not null unique,
  role user_role not null,
  status user_status not null default 'invited',
  can_edit_financials boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  brand text not null,
  model text not null,
  year integer not null,
  plate text not null,
  chassis text not null,
  mileage integer not null default 0,
  color text,
  origin vehicle_origin not null,
  purchase_price integer not null default 0,
  entry_date date not null,
  status vehicle_status not null default 'entry',
  advertised_price integer,
  minimum_price integer,
  sold_price integer,
  sold_date date,
  notes text,
  intake_mode text not null default 'complete' check (intake_mode in ('complete', 'photo_minimal')),
  verification_status text not null default 'verified' check (verification_status in ('draft', 'pending_review', 'verified', 'rejected')),
  verified_at timestamptz,
  verified_by uuid references profiles(id),
  signed_at timestamptz,
  signed_by uuid references profiles(id),
  completion_notes text,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (store_id, plate)
);

create table vehicle_costs (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  vehicle_id uuid not null references vehicles(id),
  category text not null,
  description text not null,
  estimated_value integer not null default 0,
  actual_value integer not null default 0,
  cost_date date not null default current_date,
  receipt_url text,
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table cost_presets (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  name text not null,
  category text not null,
  average_value integer not null default 0,
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table tire_presets (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  size text not null,
  brand text not null,
  type text not null,
  average_value integer not null default 0,
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table checklist_templates (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  name text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table checklist_template_items (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references checklist_templates(id) on delete cascade,
  name text not null,
  category text not null,
  default_cost_item_id uuid references cost_presets(id),
  estimated_value integer not null default 0,
  sort_order integer not null default 0
);

create table vehicle_checklist_items (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  vehicle_id uuid not null references vehicles(id),
  name text not null,
  category text not null,
  status checklist_status not null default 'pending',
  estimated_value integer not null default 0,
  actual_value integer not null default 0,
  responsible_user_id uuid references profiles(id),
  due_date date,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table premium_requests (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  vehicle_name text not null,
  brand text,
  model text,
  year integer,
  mileage integer,
  purchase_price integer,
  origin vehicle_origin,
  shaken_info text,
  notes text,
  status premium_request_status not null default 'received',
  priority premium_priority not null default 'normal',
  created_by uuid references profiles(id),
  assigned_to uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table files (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  vehicle_id uuid references vehicles(id),
  premium_request_id uuid references premium_requests(id),
  file_type text not null,
  file_url text not null,
  description text,
  uploaded_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  archived_at timestamptz,
  check (
    vehicle_id is not null or premium_request_id is not null
  )
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('vehicle-photos', 'vehicle-photos', false, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('vehicle-documents', 'vehicle-documents', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types,
  updated_at = now();

create table payments (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id),
  plan store_plan not null,
  amount integer not null,
  extra_vehicle_count integer not null default 0,
  extra_vehicle_unit_price integer not null default 0,
  period_start date not null,
  period_end date not null,
  due_date date not null,
  paid_at timestamptz,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

create table activity_logs (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id),
  user_id uuid references profiles(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  old_value jsonb,
  new_value jsonb,
  notes text,
  created_at timestamptz not null default now()
);

create index idx_profiles_store_id on profiles(store_id);
create index idx_vehicles_store_id on vehicles(store_id);
create index idx_vehicles_status on vehicles(status);
create index idx_vehicles_created_by on vehicles(created_by);
create index idx_vehicle_costs_store_vehicle on vehicle_costs(store_id, vehicle_id);
create index idx_vehicle_costs_vehicle_id on vehicle_costs(vehicle_id);
create index idx_vehicle_costs_created_by on vehicle_costs(created_by);
create index idx_cost_presets_store_id on cost_presets(store_id);
create index idx_tire_presets_store_id on tire_presets(store_id);
create index idx_checklist_templates_store_id on checklist_templates(store_id);
create index idx_checklist_template_items_template_id on checklist_template_items(template_id);
create index idx_checklist_template_items_default_cost_item_id on checklist_template_items(default_cost_item_id);
create index idx_vehicle_checklist_store_vehicle on vehicle_checklist_items(store_id, vehicle_id);
create index idx_vehicle_checklist_vehicle_id on vehicle_checklist_items(vehicle_id);
create index idx_vehicle_checklist_responsible_user_id on vehicle_checklist_items(responsible_user_id);
create index idx_premium_requests_store_status on premium_requests(store_id, status);
create index idx_premium_requests_created_by on premium_requests(created_by);
create index idx_premium_requests_assigned_to on premium_requests(assigned_to);
create index idx_files_store_vehicle on files(store_id, vehicle_id);
create index idx_files_vehicle_id on files(vehicle_id);
create index idx_files_premium_request_id on files(premium_request_id);
create index idx_files_uploaded_by on files(uploaded_by);
create index idx_payments_store_id on payments(store_id);
create index idx_activity_logs_store_created on activity_logs(store_id, created_at desc);
create index idx_activity_logs_user_id on activity_logs(user_id);

create or replace view vehicle_financial_summary
with (security_invoker = true) as
select
  v.id as vehicle_id,
  v.store_id,
  v.purchase_price,
  coalesce(sum(vc.estimated_value), 0)::integer as total_estimated_costs,
  coalesce(sum(vc.actual_value), 0)::integer as total_actual_costs,
  (v.purchase_price + coalesce(sum(vc.estimated_value), 0))::integer as estimated_total_investment,
  (v.purchase_price + coalesce(sum(vc.actual_value), 0))::integer as actual_total_investment,
  (coalesce(v.advertised_price, 0) - (v.purchase_price + coalesce(sum(vc.estimated_value), 0)))::integer as estimated_profit,
  case
    when v.sold_price is null then null
    else (v.sold_price - (v.purchase_price + coalesce(sum(vc.actual_value), 0)))::integer
  end as actual_profit,
  case
    when v.sold_price is null or v.sold_price = 0 then null
    else round(((v.sold_price - (v.purchase_price + coalesce(sum(vc.actual_value), 0)))::numeric / v.sold_price::numeric) * 100, 2)
  end as margin_percentage,
  (current_date - v.entry_date)::integer as days_in_stock
from vehicles v
left join vehicle_costs vc on vc.vehicle_id = v.id and vc.archived_at is null
where v.archived_at is null
group by v.id;

-- RLS base
alter table stores enable row level security;
alter table profiles enable row level security;
alter table vehicles enable row level security;
alter table vehicle_costs enable row level security;
alter table cost_presets enable row level security;
alter table tire_presets enable row level security;
alter table checklist_templates enable row level security;
alter table checklist_template_items enable row level security;
alter table vehicle_checklist_items enable row level security;
alter table premium_requests enable row level security;
alter table files enable row level security;
alter table payments enable row level security;
alter table activity_logs enable row level security;

-- Helper: role e store do usuario logado.
-- Ajustar conforme integracao com Supabase Auth.
create or replace function current_profile_role()
returns user_role
language sql
stable
set search_path = public, auth
as $$
  select role from profiles where id = (select auth.uid())
$$;

create or replace function current_profile_store_id()
returns uuid
language sql
stable
set search_path = public, auth
as $$
  select store_id from profiles where id = (select auth.uid())
$$;

create or replace function is_okh_admin()
returns boolean
language sql
stable
set search_path = public, auth
as $$
  select current_profile_role() in ('okh_admin_master', 'okh_operator')
$$;

create or replace function is_okh_master()
returns boolean
language sql
stable
set search_path = public, auth
as $$
  select current_profile_role() = 'okh_admin_master'
$$;

create or replace function can_write_store_data(target_store_id uuid)
returns boolean
language sql
stable
set search_path = public, auth
as $$
  select
    current_profile_role() in ('okh_admin_master', 'okh_operator')
    or (
      current_profile_store_id() = target_store_id
      and current_profile_role() in ('store_owner', 'store_employee')
    )
$$;

create or replace function can_read_store_data(target_store_id uuid)
returns boolean
language sql
stable
set search_path = public, auth
as $$
  select
    current_profile_role() in ('okh_admin_master', 'okh_operator')
    or current_profile_store_id() = target_store_id
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  metadata jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  new_store_id uuid;
  owner_name text := coalesce(nullif(btrim(metadata->>'name'), ''), split_part(coalesce(new.email, ''), '@', 1), 'Novo usuario');
  store_name text := coalesce(nullif(btrim(metadata->>'store_name'), ''), owner_name || ' Auto');
  user_email text := coalesce(new.email, '');
begin
  insert into public.stores (
    store_code,
    name,
    owner_name,
    email,
    phone,
    address,
    plan,
    status,
    car_limit,
    premium_entry_enabled
  )
  values (
    'OKH-' || upper(substr(replace(new.id::text, '-', ''), 1, 8)),
    store_name,
    owner_name,
    user_email,
    nullif(btrim(metadata->>'phone'), ''),
    nullif(btrim(metadata->>'address'), ''),
    'starter',
    'free_trial',
    20,
    false
  )
  returning id into new_store_id;

  insert into public.profiles (
    id,
    store_id,
    name,
    email,
    role,
    status,
    can_edit_financials
  )
  values (
    new.id,
    new_store_id,
    owner_name,
    user_email,
    'store_owner',
    'active',
    true
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function private.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create policy stores_read on stores
  for select to authenticated
  using (is_okh_admin() or id = current_profile_store_id());

create policy stores_insert on stores
  for insert to authenticated
  with check (is_okh_master());

create policy stores_update on stores
  for update to authenticated
  using (is_okh_master())
  with check (is_okh_master());

create policy stores_delete on stores
  for delete to authenticated
  using (is_okh_master());

create policy profiles_read on profiles
  for select to authenticated
  using (is_okh_admin() or store_id = current_profile_store_id() or id = (select auth.uid()));

create policy profiles_insert on profiles
  for insert to authenticated
  with check (is_okh_master());

create policy profiles_update on profiles
  for update to authenticated
  using (is_okh_master() or id = (select auth.uid()))
  with check (is_okh_master() or id = (select auth.uid()));

create policy profiles_delete on profiles
  for delete to authenticated
  using (is_okh_master());

revoke update on profiles from anon, authenticated;
grant update (name, updated_at) on profiles to authenticated;

create policy vehicles_read on vehicles
  for select to authenticated
  using (can_read_store_data(store_id));

create policy vehicles_insert on vehicles
  for insert to authenticated
  with check (can_write_store_data(store_id));

create policy vehicles_update on vehicles
  for update to authenticated
  using (can_write_store_data(store_id))
  with check (can_write_store_data(store_id));

create policy vehicles_delete on vehicles
  for delete to authenticated
  using (can_write_store_data(store_id));

create policy vehicle_costs_read on vehicle_costs
  for select to authenticated
  using (can_read_store_data(store_id));

create policy vehicle_costs_insert on vehicle_costs
  for insert to authenticated
  with check (can_write_store_data(store_id));

create policy vehicle_costs_update on vehicle_costs
  for update to authenticated
  using (can_write_store_data(store_id))
  with check (can_write_store_data(store_id));

create policy vehicle_costs_delete on vehicle_costs
  for delete to authenticated
  using (can_write_store_data(store_id));

create policy cost_presets_read on cost_presets
  for select to authenticated
  using (can_read_store_data(store_id));

create policy cost_presets_insert on cost_presets
  for insert to authenticated
  with check (can_write_store_data(store_id));

create policy cost_presets_update on cost_presets
  for update to authenticated
  using (can_write_store_data(store_id))
  with check (can_write_store_data(store_id));

create policy cost_presets_delete on cost_presets
  for delete to authenticated
  using (can_write_store_data(store_id));

create policy tire_presets_read on tire_presets
  for select to authenticated
  using (can_read_store_data(store_id));

create policy tire_presets_insert on tire_presets
  for insert to authenticated
  with check (can_write_store_data(store_id));

create policy tire_presets_update on tire_presets
  for update to authenticated
  using (can_write_store_data(store_id))
  with check (can_write_store_data(store_id));

create policy tire_presets_delete on tire_presets
  for delete to authenticated
  using (can_write_store_data(store_id));

create policy checklist_templates_read on checklist_templates
  for select to authenticated
  using (can_read_store_data(store_id));

create policy checklist_templates_insert on checklist_templates
  for insert to authenticated
  with check (can_write_store_data(store_id));

create policy checklist_templates_update on checklist_templates
  for update to authenticated
  using (can_write_store_data(store_id))
  with check (can_write_store_data(store_id));

create policy checklist_templates_delete on checklist_templates
  for delete to authenticated
  using (can_write_store_data(store_id));

create policy checklist_template_items_read on checklist_template_items
  for select to authenticated
  using (
    exists (
      select 1 from checklist_templates ct
      where ct.id = checklist_template_items.template_id
        and can_read_store_data(ct.store_id)
    )
  );

create policy checklist_template_items_insert on checklist_template_items
  for insert to authenticated
  with check (
    exists (
      select 1 from checklist_templates ct
      where ct.id = checklist_template_items.template_id
        and can_write_store_data(ct.store_id)
    )
  );

create policy checklist_template_items_update on checklist_template_items
  for update to authenticated
  using (
    exists (
      select 1 from checklist_templates ct
      where ct.id = checklist_template_items.template_id
        and can_write_store_data(ct.store_id)
    )
  )
  with check (
    exists (
      select 1 from checklist_templates ct
      where ct.id = checklist_template_items.template_id
        and can_write_store_data(ct.store_id)
    )
  );

create policy checklist_template_items_delete on checklist_template_items
  for delete to authenticated
  using (
    exists (
      select 1 from checklist_templates ct
      where ct.id = checklist_template_items.template_id
        and can_write_store_data(ct.store_id)
    )
  );

create policy vehicle_checklist_read on vehicle_checklist_items
  for select to authenticated
  using (can_read_store_data(store_id));

create policy vehicle_checklist_insert on vehicle_checklist_items
  for insert to authenticated
  with check (can_write_store_data(store_id));

create policy vehicle_checklist_update on vehicle_checklist_items
  for update to authenticated
  using (can_write_store_data(store_id))
  with check (can_write_store_data(store_id));

create policy vehicle_checklist_delete on vehicle_checklist_items
  for delete to authenticated
  using (can_write_store_data(store_id));

create policy premium_requests_read on premium_requests
  for select to authenticated
  using (can_read_store_data(store_id));

create policy premium_requests_insert on premium_requests
  for insert to authenticated
  with check (can_write_store_data(store_id));

create policy premium_requests_update on premium_requests
  for update to authenticated
  using (can_write_store_data(store_id))
  with check (can_write_store_data(store_id));

create policy premium_requests_delete on premium_requests
  for delete to authenticated
  using (can_write_store_data(store_id));

create policy files_read on files
  for select to authenticated
  using (can_read_store_data(store_id));

create policy files_insert on files
  for insert to authenticated
  with check (can_write_store_data(store_id));

create policy files_update on files
  for update to authenticated
  using (can_write_store_data(store_id))
  with check (can_write_store_data(store_id));

create policy files_delete on files
  for delete to authenticated
  using (can_write_store_data(store_id));

create policy okh_vehicle_files_read on storage.objects
  for select to authenticated
  using (
    bucket_id in ('vehicle-photos', 'vehicle-documents')
    and coalesce((storage.foldername(name))[1], '') = 'stores'
    and coalesce((storage.foldername(name))[2], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    and can_read_store_data(((storage.foldername(name))[2])::uuid)
  );

create policy okh_vehicle_files_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id in ('vehicle-photos', 'vehicle-documents')
    and coalesce((storage.foldername(name))[1], '') = 'stores'
    and coalesce((storage.foldername(name))[2], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    and can_write_store_data(((storage.foldername(name))[2])::uuid)
  );

create policy okh_vehicle_files_update on storage.objects
  for update to authenticated
  using (
    bucket_id in ('vehicle-photos', 'vehicle-documents')
    and coalesce((storage.foldername(name))[1], '') = 'stores'
    and coalesce((storage.foldername(name))[2], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    and can_write_store_data(((storage.foldername(name))[2])::uuid)
  )
  with check (
    bucket_id in ('vehicle-photos', 'vehicle-documents')
    and coalesce((storage.foldername(name))[1], '') = 'stores'
    and coalesce((storage.foldername(name))[2], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    and can_write_store_data(((storage.foldername(name))[2])::uuid)
  );

create policy okh_vehicle_files_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id in ('vehicle-photos', 'vehicle-documents')
    and coalesce((storage.foldername(name))[1], '') = 'stores'
    and coalesce((storage.foldername(name))[2], '') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    and can_write_store_data(((storage.foldername(name))[2])::uuid)
  );

create policy payments_read on payments
  for select to authenticated
  using (is_okh_master() or store_id = current_profile_store_id());

create policy payments_insert on payments
  for insert to authenticated
  with check (is_okh_master());

create policy payments_update on payments
  for update to authenticated
  using (is_okh_master())
  with check (is_okh_master());

create policy payments_delete on payments
  for delete to authenticated
  using (is_okh_master());

create policy activity_logs_read on activity_logs
  for select to authenticated
  using (is_okh_admin() or store_id = current_profile_store_id());

create policy activity_logs_insert on activity_logs
  for insert to authenticated
  with check (is_okh_admin() or store_id = current_profile_store_id());
