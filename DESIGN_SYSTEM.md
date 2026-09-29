# Design System — FutbolUAgency

Source of truth for colors, type, spacing and shadows. Tokens live as CSS custom
properties in `src/index.css` (`:root`) and are exposed as Tailwind utilities via
`tailwind.config.ts`. **Never hardcode a hex value in a component — use the
Tailwind class or `hsl(var(--token))` in inline styles.** If a color you need
isn't listed below, add it as a token first instead of writing a literal hex.

## Color tokens

| Token | HSL | Tailwind class | Usage |
|---|---|---|---|
| `--background` | `0 0% 99%` | `bg-background` | Default page background (near-white) |
| `--background-alt` | `40 13% 96%` | `bg-background-alt` | Alternate section background |
| `--section-alt` | `40 11% 96%` | `bg-section-alt` | Warm light-gray section band (was `#f5f4f2`) |
| `--foreground` | `217 53% 15%` | `text-foreground` / `border-foreground` | Primary text / navy ink (was `#12213a`, `#0a1628`) |
| `--secondary` | `217 53% 15%` | `bg-secondary` | Navy surface fill (same value as foreground, used for backgrounds) |
| `--primary` | `354 92% 36%` | `bg-primary` / `text-primary` | Brand red — CTAs, accents (was `#b00717`) |
| `--primary-hover` | `354 92% 30%` | `bg-primary-hover` | Darker red hover state (was `#900612`, `#8a0512`) |
| `--accent-blue` | `210 100% 50%` | `bg-accent-blue` / `text-accent-blue` | Blue accent used for highlighted labels/links |
| `--footer-dark` | `0 0% 6%` | `bg-footer-dark` | Near-black footer / dark section background (was `#0f0f0f`, `#0d0d1a`) |
| `--muted` | `40 10% 95%` | `bg-muted` / `text-muted-foreground` | Neutral gray surface/text |
| `--border` | `0 0% 90%` | `border-border` | Default border color (was `#e5e5e5`) |
| `--card` | `0 0% 100%` | `bg-card` | Card surface (pure white) |
| `--destructive` | `0 84.2% 60.2%` | `bg-destructive` | Error states |

Per-item decorative colors (sport-page accent circles, division badges like
NCAA D1/D2/NAIA/NJCAA, gradient blur blobs) are intentionally varied and are
**not** tokenized — they're deliberate visual differentiation, not brand-color
duplicates.

## Typography

- **Display font** (`font-display`): Playfair Display, serif — used for all
  headings (`h1`–`h3`, section titles).
- **Body font** (`font-body`): Inter, sans-serif — used for paragraphs, labels,
  buttons.
- Headline sizes follow a `clamp()` or Tailwind responsive scale
  (`text-3xl sm:text-4xl md:text-5xl` for section H2s, larger `clamp(48px, 8vw, 104px)`
  for hero H1s on sport landing pages).

## Spacing & layout

- `.section-padding` / `py-24 md:py-32` — standard vertical rhythm between
  major sections.
- `.container-wide` — the shared max-width wrapper used on every page.
- Cards and section corners use `rounded-xl` / `rounded-2xl` (`--radius: 0.75rem`
  base, scaled via `borderRadius.lg/md/sm` in `tailwind.config.ts`).

## Shadows

| Token | Usage |
|---|---|
| `--shadow-glow` | Soft primary-color glow (buttons, highlighted cards) |
| `--shadow-card` | Standard card elevation |

## Adding a new color

1. Add the HSL value as a CSS custom property in `src/index.css` under `:root`.
2. Expose it in `tailwind.config.ts` under `theme.extend.colors`.
3. Use the resulting Tailwind class (`bg-your-token`) or `hsl(var(--your-token))`
   in inline styles — never a raw hex literal.
