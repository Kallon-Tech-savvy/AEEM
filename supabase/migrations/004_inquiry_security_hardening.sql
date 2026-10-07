-- AEEM inquiry security boundary
--
-- Inquiry writes are accepted only through the submit-inquiry Edge Function.
-- The browser must never receive direct table write access.

drop policy if exists "public_submit_inquiries" on public.inquiries;

revoke all privileges on table public.inquiries from anon, authenticated;
