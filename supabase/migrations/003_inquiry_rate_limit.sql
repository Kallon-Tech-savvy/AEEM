-- AEEM inquiry abuse-control boundary
--
-- The Edge Function calls this SECURITY DEFINER function using the server-only
-- service role. The browser never receives access to this table or function.

create table if not exists public.inquiry_rate_limits (
  key_hash text primary key
    check (key_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0
    check (request_count >= 0)
);

revoke all privileges on table public.inquiry_rate_limits from anon, authenticated;

create or replace function public.consume_inquiry_rate_limit(
  p_key_hash text,
  p_window_seconds integer default 600,
  p_limit integer default 5
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
  v_window_started_at timestamptz;
begin
  if p_key_hash !~ '^[0-9a-f]{64}$'
     or p_window_seconds < 1
     or p_window_seconds > 86400
     or p_limit < 1
     or p_limit > 100 then
    raise exception 'invalid rate limit arguments'
      using errcode = '22023';
  end if;

  insert into public.inquiry_rate_limits (
    key_hash,
    window_started_at,
    request_count
  )
  values (
    p_key_hash,
    now(),
    1
  )
  on conflict (key_hash) do update
  set
    window_started_at = case
      when public.inquiry_rate_limits.window_started_at
        <= now() - make_interval(secs => p_window_seconds)
      then now()
      else public.inquiry_rate_limits.window_started_at
    end,
    request_count = case
      when public.inquiry_rate_limits.window_started_at
        <= now() - make_interval(secs => p_window_seconds)
      then 1
      else public.inquiry_rate_limits.request_count + 1
    end
  returning request_count, window_started_at
  into v_count, v_window_started_at;

  return v_count <= p_limit;
end;
$$;

revoke all on function public.consume_inquiry_rate_limit(text, integer, integer)
from public, anon, authenticated;

grant execute on function public.consume_inquiry_rate_limit(text, integer, integer)
to service_role;
