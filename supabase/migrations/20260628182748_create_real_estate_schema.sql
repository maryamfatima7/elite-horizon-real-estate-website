/*
# Elite Horizon Real Estate Schema

1. New Tables
- `properties` — real estate listings with details, images, pricing, and features
- `agents` — real estate agents with bios and contact info
- `testimonials` — customer reviews and ratings
- `blog_posts` — articles and content
- `contact_inquiries` — form submissions from the contact page

2. Security
- Enable RLS on all tables.
- Allow public (anon + authenticated) read access for properties, agents, testimonials, blog_posts.
- Allow public (anon + authenticated) write access for contact_inquiries.
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price bigint NOT NULL,
  location text NOT NULL,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms integer NOT NULL DEFAULT 0,
  area_sqft integer NOT NULL DEFAULT 0,
  property_type text NOT NULL DEFAULT 'house',
  listing_type text NOT NULL DEFAULT 'sale',
  image_url text NOT NULL,
  gallery jsonb DEFAULT '[]',
  featured boolean NOT NULL DEFAULT false,
  amenities jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  bio text,
  email text,
  phone text,
  image_url text NOT NULL,
  social jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  content text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  image_url text NOT NULL,
  category text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_properties" ON properties;
CREATE POLICY "anon_select_properties" ON properties FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_agents" ON agents;
CREATE POLICY "anon_select_agents" ON agents FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_blog_posts" ON blog_posts;
CREATE POLICY "anon_select_blog_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_contact_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_contact_inquiries" ON contact_inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact_inquiries" ON contact_inquiries;
CREATE POLICY "anon_select_contact_inquiries" ON contact_inquiries FOR SELECT
  TO anon, authenticated USING (true);
