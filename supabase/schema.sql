-- Enable UUID extension
create extension
if not exists "uuid-ossp";

-- Products Table (Re-creating to ensure new columns exist)
DROP TABLE IF EXISTS products
CASCADE;

create table products
(
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  price decimal
(10,2),
  product_url text,
  -- Direct link to product page
  product_type text,
  -- 'Cleanser', 'Moisturizer', 'Treatment', 'Sunscreen'
  skin_types text
  [], -- ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
  concerns text[], -- ['Acne', 'Aging', 'Pigmentation', 'Redness', 'Texture', 'Dehydration']
  ingredients text[],
  is_active boolean default true,
  created_at timestamp
  with time zone default timezone
  ('utc'::text, now
  ()) not null,
  updated_at timestamp
  with time zone default timezone
  ('utc'::text, now
  ()) not null
);

  -- Skin Analyses Table
  create table
  if not exists skin_analyses
  (
  id uuid default uuid_generate_v4
  () primary key,
  user_id uuid references auth.users
  (id),
  image_url text,
  age_group text,
  skin_type_detected text,
  concerns_detected text[],
  analysis_summary text,
  raw_ai_response jsonb,
  created_at timestamp
  with time zone default timezone
  ('utc'::text, now
  ()) not null
);

  -- Routines Table
  create table
  if not exists routines
  (
  id uuid default uuid_generate_v4
  () primary key,
  analysis_id uuid references skin_analyses
  (id) not null,
  title text,
  morning_routine jsonb,
  evening_routine jsonb,
  created_at timestamp
  with time zone default timezone
  ('utc'::text, now
  ()) not null
);

  -- RLS Policies
  alter table products enable row level security;
  create policy "Public products are viewable by everyone" on products for
  select using (true);

  alter table skin_analyses enable row level security;
  create policy "Users can view their own analyses" on skin_analyses for
  select using (auth.uid() = user_id);
  create policy "Anyone can insert analysis" on skin_analyses for
  insert with check
    (true)
  ;

  alter table routines enable row level security;
  create policy "Users can view their own routines" on routines for
  select using (auth.uid() = (select user_id
    from skin_analyses
    where id = analysis_id));
  create policy "Read access for guest routines" on routines for
  select using (true);
