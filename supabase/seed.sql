insert into authors(name, role, avatar_url, bio)
values ('Rajswa Srivastava', 'AI Brand Strategist', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop', 'Founder and writer')
on conflict do nothing;

insert into categories(name, slug, featured)
values ('General', 'general', true), ('AI', 'ai', true), ('Growth', 'growth', false)
on conflict do nothing;

insert into tags(name, slug)
values ('AI', 'ai'), ('Marketing', 'marketing'), ('SEO', 'seo')
on conflict do nothing;
