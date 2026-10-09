# Inquiries are accepted only through the submit-inquiry Edge Function

Browsers get no direct write access to the `inquiries` table (migration 004 revokes it and drops the public insert policy). Every Inquiry goes through the `submit-inquiry` Edge Function, which applies the origin allowlist, honeypot, size limits and HMAC rate limiting before inserting with the service role. A plain RLS insert would be simpler, but none of those abuse controls could be enforced on it.
