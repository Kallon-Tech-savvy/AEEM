const ALLOWED_TAGS = new Set(['P','BR','STRONG','EM','B','I','U','S','H2','H3','H4','UL','OL','LI','BLOCKQUOTE','A'])
const ALLOWED_ATTRIBUTES = new Set(['href','target','rel'])

export function sanitizeHtml(html: string): string {
  if (typeof DOMParser === 'undefined') return ''

  const document = new DOMParser().parseFromString(html, 'text/html')

  document.querySelectorAll('*').forEach(element => {
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes))
      return
    }

    Array.from(element.attributes).forEach(attribute => {
      if (!ALLOWED_ATTRIBUTES.has(attribute.name)) element.removeAttribute(attribute.name)
    })

    if (element.tagName === 'A') {
      const href = element.getAttribute('href') ?? ''
      const isSafeHref = /^(https?:|mailto:|#|\\/)/i.test(href)
      if (!isSafeHref) element.removeAttribute('href')
      else {
        element.setAttribute('target', '_blank')
        element.setAttribute('rel', 'noopener noreferrer')
      }
    }
  })

  return document.body.innerHTML
}
