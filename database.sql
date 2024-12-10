-- Add admin flag to users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create admin policies
CREATE POLICY "Admins can view all companies"
  ON companies FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE is_admin = true
    )
  );

CREATE POLICY "Admins can manage all companies"
  ON companies FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE is_admin = true
    )
  );

CREATE POLICY "Admins can view all contacts"
  ON contacts FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE is_admin = true
    )
  );

CREATE POLICY "Admins can manage all contacts"
  ON contacts FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE is_admin = true
    )
  );

CREATE POLICY "Admins can view all deals"
  ON deals FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE is_admin = true
    )
  );

CREATE POLICY "Admins can manage all deals"
  ON deals FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users WHERE is_admin = true
    )
  );

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER;