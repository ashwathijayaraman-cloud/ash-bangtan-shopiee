
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_lower_key
  ON public.profiles (lower(username))
  WHERE username IS NOT NULL;

CREATE OR REPLACE FUNCTION public.get_auth_info_for_username(_username text)
 RETURNS TABLE(email text, has_password boolean, has_google boolean)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    u.email,
    (u.encrypted_password IS NOT NULL AND length(u.encrypted_password) > 0) AS has_password,
    EXISTS (
      SELECT 1 FROM auth.identities i
      WHERE i.user_id = u.id AND i.provider = 'google'
    ) AS has_google
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE lower(p.username) = lower(_username)
  ORDER BY u.created_at ASC
  LIMIT 1;
$function$;

CREATE OR REPLACE FUNCTION public.get_email_for_username(_username text)
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT u.email
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE lower(p.username) = lower(_username)
  ORDER BY u.created_at ASC
  LIMIT 1;
$function$;
