export const SITE_URL = 'https://www.aeemmovement.org'

export function getCanonical(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}
