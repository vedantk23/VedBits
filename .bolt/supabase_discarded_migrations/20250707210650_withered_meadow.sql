/*
  # Create Admin User Setup

  1. New Functions
    - `create_admin_user` - Function to create an admin user
    - `is_admin` - Function to check if user is admin
  
  2. Security
    - Admin role management
    - Secure admin user creation
*/

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(email)
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow admins to read admin_users table
CREATE POLICY "Only admins can read admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Function to check if a user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = $1
  );
$$;

-- Function to create admin user (can only be called by existing admin or if no admins exist)
CREATE OR REPLACE FUNCTION create_admin_user(email text, password text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
  admin_count integer;
BEGIN
  -- Check if any admins exist
  SELECT COUNT(*) INTO admin_count FROM admin_users;
  
  -- If admins exist and current user is not admin, deny
  IF admin_count > 0 AND NOT is_admin(auth.uid()) THEN
    RETURN json_build_object('error', 'Unauthorized');
  END IF;
  
  -- Create the user in auth.users (this is a simplified version)
  -- In production, you'd use Supabase's auth.signup() function
  INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
  VALUES (
    email,
    crypt(password, gen_salt('bf')),
    now(),
    now(),
    now()
  )
  RETURNING id INTO new_user_id;
  
  -- Add to admin_users table
  INSERT INTO admin_users (user_id, email)
  VALUES (new_user_id, email);
  
  RETURN json_build_object('success', true, 'user_id', new_user_id);
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('error', SQLERRM);
END;
$$;

-- Update posts policies to check admin status
DROP POLICY IF EXISTS "Only authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Only authenticated users can update posts" ON posts;
DROP POLICY IF EXISTS "Only authenticated users can delete posts" ON posts;

CREATE POLICY "Only admins can insert posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));