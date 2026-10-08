export const SITE_URL = ''

export function getCanonical(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}
