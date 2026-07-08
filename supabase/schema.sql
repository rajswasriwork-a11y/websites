create extension if not exists pgcrypto;

create table if not exists authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  avatar_url text,
  bio text,
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  parent_id uuid references categories(id) on delete set null,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role text not null default 'admin',
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image text,
  category_id uuid references categories(id) on delete set null,
  author_id uuid references authors(id) on delete set null,
  status text not null default 'draft',
  featured boolean default false,
  seo_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  twitter_card text,
  reading_time text,
  publish_date timestamptz,
  last_updated timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists post_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  original_name text not null,
  url text not null,
  alt text,
  caption text,
  created_at timestamptz default now()
);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  site_name text default 'Rajswa Blog',
  tagline text default 'Production-ready publishing workflow',
  default_author text default 'Admin',
  ga_id text,
  clarity_id text,
  updated_at timestamptz default now()
);

create index if not exists idx_posts_status on posts(status);
create index if not exists idx_posts_created_at on posts(created_at desc);
create index if not exists idx_posts_slug on posts(slug);
create index if not exists idx_categories_slug on categories(slug);
create index if not exists idx_tags_slug on tags(slug);

insert into settings(site_name, tagline, default_author)
values ('Rajswa Blog', 'Production-ready publishing workflow', 'Admin')
on conflict do nothing;
