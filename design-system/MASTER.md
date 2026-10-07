# AEEM Design System Master

## Product
**Africa Education Empowerment Movement (AEEM)**

## Design direction
**Human Institutional Modernism**

AEEM should feel credible enough for an institution, clear enough for a public-service organization, and contemporary enough for a young African movement.

### Principles
1. Human before interface
2. Evidence before decoration
3. African without cliché
4. Quiet confidence
5. Editorial hierarchy
6. Motion with purpose
7. Accessibility by default

The interface should not resemble a generic SaaS, AI agency, fintech dashboard, or luxury landing page.

---

## Color tokens

### Brand
| Token | Hex | Use |
|---|---|---|
| Forest | `#2C5F2D` | Primary brand identity, selected states |
| Forest Dark | `#173D28` | Deep backgrounds, strong emphasis |
| Gold | `#B8941A` | Primary accent, links, key actions |
| Gold Light | `#D4AF37` | Decorative use only |
| Ink | `#17201A` | Primary text |
| Cream | `#F7F5EF` | Primary background |
| White | `#FFFFFF` | Content surfaces |

### Semantic
| Token | Hex | Use |
|---|---|---|
| Success | `#0D9B6E` | Positive state |
| Error | `#C0392B` | Error state |
| Warning | `#A66B00` | Warning state |
| Focus | `#1A6BCC` | Keyboard focus |

Pink, campaign colors, and photography-derived colors are contextual—not structural brand tokens.

---

## Typography

Font family: **Plus Jakarta Sans**

| Level | Size | Weight | Purpose |
|---|---|---:|---|
| Display | 64–88px | 800 | Hero / campaign statements |
| H1 | 48–64px | 700 | Page title |
| H2 | 36–48px | 700 | Major section |
| H3 | 24–32px | 600 | Subsection / card title |
| Body | 16–18px | 400–500 | Reading |
| Small | 14px | 400–500 | Supporting information |
| Label | 11–12px | 500–600 | Metadata / navigation |

Avoid `font-black` except where a specific campaign treatment requires it.

---

## Layout

Use a consistent content container and generous vertical rhythm.

- Mobile page padding: 20–24px
- Desktop page padding: 32–48px
- Reading width: approximately 65–75 characters
- Major section spacing: 80–128px
- Content sections should alternate between dense information and quiet editorial space.

Prefer open layouts for mission statements, statistics, and stories. Use cards for objects that behave like objects: events, resources, programs, and discrete actions.

---

## Shape and depth

- Default radius: 12–16px
- Large feature radius: up to 24px
- Pills: reserved for compact controls, filters, and status labels
- Avoid giant `rounded-[3rem]` containers.
- Avoid decorative glassmorphism as a default surface.
- Use borders and restrained shadows to establish hierarchy.
- Avoid glow effects as structural UI.

---

## Motion

Motion communicates state, hierarchy, or spatial relationships.

- Fast: 150ms
- Base: 250ms
- Slow: 400ms
- Prefer opacity and small positional transitions.
- Avoid hover scaling on large cards and sections.
- Never make essential information depend on animation.
- Respect `prefers-reduced-motion`.

---

## Component rules

### Buttons
Clear hierarchy:
- Primary: solid brand/accent
- Secondary: outlined
- Tertiary: text/ghost

Buttons should not grow or bounce on hover.

### Cards
Cards are for discrete content objects. They should not become the default container for every section.

### Statistics
Use large numbers, a concise qualifier, and source/year where relevant. Avoid animated counters and glowing number treatments.

### Stories
Stories are editorial. Favor strong image + headline + context over dashboard-style cards.

### Maps / geography
AEEM's Africa network visualization is a proprietary brand motif. Prefer it over generic Africa illustrations.

---

## Accessibility

- WCAG AA contrast target
- Keyboard-visible focus states
- Semantic HTML before ARIA
- Real buttons for actions
- Reduced-motion support
- Focus management for dialogs and mobile navigation
- Images require meaningful alt text unless decorative

---

## Anti-patterns

Do not introduce:
- AI purple/pink gradients
- excessive gold gradients
- HUD/cybersecurity aesthetics
- glassmorphism everywhere
- giant rounded containers
- excessive shadows
- hover-scale-heavy interfaces
- generic stock Africa illustrations
- decorative UI that competes with evidence or stories

---

## Pre-delivery checklist

- [ ] Correct responsive behavior at 375px, 768px, 1024px, 1440px
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Reduced motion works
- [ ] Contrast meets WCAG AA
- [ ] Images have correct paths and alt text
- [ ] SEO metadata exists for every route
- [ ] No placeholder production links
- [ ] No hard-coded secrets or environment files
