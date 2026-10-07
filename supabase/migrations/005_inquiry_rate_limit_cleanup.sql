-- AEEM inquiry rate-limit retention
--
-- Keeps the abuse-control table bounded without exposing cleanup privileges
-- to browser roles. The production project uses pg_cron; local environments
-- may not have the extension enabled, so scheduling is conditional.

create or replace function public.cleanup_inquiry_rate_limits(
  p_max_age_seconds integer default 86400
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  if p_max_age_seconds < 1 or p_max_age_seconds > 2592000 then
    raise exception 'invalid cleanup age'
      using errcode = '22023';
  end if;

  delete from public.inquiry_rate_limits
  where window_started_at < now() - make_interval(secs => p_max_age_seconds);

  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke all on function public.cleanup_inquiry_rate_limits(integer)
from public, anon, authenticated;

grant execute on function public.cleanup_inquiry_rate_limits(integer)
to service_role;

do $$
declare
  v_job_id bigint;
begin
  if exists (
    select 1
    from pg_extension
    where extname = 'pg_cron'
  ) then
    execute $sql$
      select jobid
      from cron.job
      where jobname = 'cleanup-inquiry-rate-limits'
      limit 1
    $sql$
    into v_job_id;

    if v_job_id is not null then
      execute format('select cron.unschedule(%s)', v_job_id);
    end if;

    execute $sql$
      select cron.schedule(
        'cleanup-inquiry-rate-limits',
        '17 * * * *',
        'select public.cleanup_inquiry_rate_limits(86400);'
      )
    $sql$;
  end if;
end;
$$;
