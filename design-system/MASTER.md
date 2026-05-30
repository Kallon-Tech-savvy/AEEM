# AEEM Design System Master (UI UX Pro Max)

## Project: AEEM - Africa Education Empowerment Movement
**Style Priority:** Neo-Minimalist / Soft UI Evolution
**Mood:** Professional, Trustworthy, Empowering, Luxurious

---

## 🎨 Color Palette
| Role | Hex Code | Usage |
|------|----------|-------|
| Primary (Gold) | `#D4AF37` | Accents, Primary Buttons, Active States |
| Primary (Charcoal) | `#1A1A1A` | Main Text, Hero Backgrounds, Footers |
| Secondary | `#F8F7F4` | Global Background (Warm White) |
| Success | `#10B981` | Validation, Success States, Verified Badges |
| Error | `#EF4444` | Form Errors, Critical Alerts |
| Glass | `rgba(255, 255, 255, 0.7)` | Navbars, Card Overlays (Backdrop Blur 12px) |

---

## Typography (Plus Jakarta Sans)
- **H1**: `text-fluid-h1` (Custom Clamp: 2.5rem to 5rem) | Font-weight: 900 (Black)
- **H2**: `text-4xl` to `text-5xl` | Font-weight: 800 (Extra Bold)
- **Body**: `text-base` to `text-lg` | Leading: 1.625 (Relaxed)
- **Labels**: `text-xs` | Uppercase | Tracking: 0.3em | Font-weight: 700

---

## ✨ Key Effects & Interactions
- **Transitions**: Global `200ms` to `300ms` ease-out.
- **Hover States**: `hover:-translate-y-1 hover:shadow-2xl` with smooth transition.
- **Buttons**: `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`.
- **Glassmorphism**: `backdrop-blur-xl bg-white/70 border border-white/20`.
- **Shadows**: Custom "Soft UI" depth: `shadow-[0_20px_50px_rgba(0,0,0,0.05)]`.

---

## 🚫 Anti-Patterns to Avoid
- **No Emojis as Icons**: Always use Lucide-React or SVG.
- **No Harsh Gradients**: Avoid AI purple/pink gradients; stick to gold/charcoal or subtle mesh gradients.
- **No Sharp Corners**: Minimum `rounded-2xl` (1rem) for containers; `rounded-full` for CTAs.
- **Contrast**: Ensure text contrast remains > 4.5:1 (WCAG AA).

---

## ✅ Pre-Delivery Checklist
- [ ] `cursor-pointer` on all clickable elements.
- [ ] Hover states on all buttons/links.
- [ ] Responsive breakpoints: 375px, 768px, 1024px, 1440px.
- [ ] Focus states visible for keyboard navigation.
- [ ] `prefers-reduced-motion` respected in Framer Motion.
