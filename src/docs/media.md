# Media Guide

This document describes the media components and best practices for AEEM.

## Components

- `LazyImage`
  - Use for images that should lazy-load and support responsive `srcSet` and `webp`.
  - Props: `src`, `placeholder`, `alt`, `decorative`, `srcSet`, `webp`.
  - Decorative images should pass `decorative` or empty `alt` and will be hidden from assistive tech.

- `DecorativeSVG`
  - Lightweight SVG patterns: `sketch`, `geometry`, `grid`, `wave`.
  - Use for background overlays and blended decoration. They are aria-hidden by default.

- `VideoPlayer`
  - Accessible wrapper around `<video>` with caption support.
  - Provide `captions` as array of `{ src, lang, label }`.

- `AudioPlayer`
  - Simple accessible wrapper around `<audio>`.

## Patterns

- Place decorative SVGs and `LazyImage` components inside existing sections (hero, spotlight, access) and use `mix-blend-mode` or `opacity` for subtlety.
- Use `aria-hidden` on purely decorative media.
- Prefer `webp` and `srcSet` for responsive images.
- Store consent state for cookies in `localStorage` (handled by `CookieConsentBanner`).

## Performance

- Use the `LazyImage` `placeholder` to reduce layout shift.
- Prefer optimized image builds (generate responsive `webp` variants, use `sharp` or similar in build pipeline).

## Accessibility

- Provide captions (`<track>`) for video content.
- Avoid auto-playing audio/video without user interaction.
- Ensure decorative media have empty `alt` and `aria-hidden`.
