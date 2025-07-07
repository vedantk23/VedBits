/*
  # Disable user registration and restrict post operations

  1. Security Changes
    - Only existing authenticated users can create, update, delete posts
    - Everyone can read published posts
    - Comments remain open to public with captcha protection

  2. Notes
    - User registration is disabled at the application level
    - Only manually added users in Supabase Auth can sign in
    - Post operations are restricted to authenticated users only
*/

-- Update posts policies to be more restrictive
DROP POLICY IF EXISTS "Users can insert their own posts" ON posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;

-- Create more restrictive policies for posts
CREATE POLICY "Authenticated users can insert their own posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can update their own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can delete their own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Update profiles policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

CREATE POLICY "Authenticated users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);