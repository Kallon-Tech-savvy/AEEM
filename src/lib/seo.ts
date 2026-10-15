// Use the deployed Vercel origin until a custom domain is owned and configured.
export const SITE_URL = 'https://aeem-w.vercel.app'

export function getCanonical(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}
