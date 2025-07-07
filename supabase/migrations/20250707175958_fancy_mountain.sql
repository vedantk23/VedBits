/*
  # Blog Platform with Admin Panel

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `body` (text, HTML content)
      - `footer` (text, HTML content)
      - `view_count` (integer)
      - `slug` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on posts table
    - Only authenticated users can create, update, delete posts
    - Public can only read posts
    - View count increments are handled separately
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  footer text DEFAULT '',
  view_count integer DEFAULT 0,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete posts"
  ON posts FOR DELETE
  TO authenticated
  USING (true);

-- Function to update view count
CREATE OR REPLACE FUNCTION increment_view_count(post_slug text)
RETURNS void AS $$
BEGIN
  UPDATE posts 
  SET view_count = view_count + 1 
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE OR REPLACE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS posts_view_count_idx ON posts(view_count DESC);