-- Create table to track login attempts for brute-force protection
CREATE TABLE IF NOT EXISTS login_attempts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  client_ip TEXT NOT NULL,
  success BOOLEAN NOT NULL DEFAULT false,
  attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index for efficient IP-based queries
CREATE INDEX IF NOT EXISTS idx_login_attempts_client_ip_attempt_at ON login_attempts(client_ip, attempt_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_attempt_at ON login_attempts(attempt_at DESC);

-- Add RLS policy to prevent direct user access
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy that denies all access by default
CREATE POLICY "Deny all access to login_attempts" ON login_attempts
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Grant access only to service_role (admin functions)
GRANT SELECT, INSERT ON login_attempts TO service_role;
