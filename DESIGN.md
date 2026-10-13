---
name: Yarin Manoah, Personal Trading Mentor
description: A black trading-terminal desk, graphite notes, mentor green, and one silver pen; real screens behind every claim.
colors:
  ground-black: "#000000"
  graphite-card: "#111111"
  section-black: "#070707"
  deep-black: "#030303"
  brand-green: "#1F8A4C"
  accent-green: "#2ECC71"
  pen-silver: "#D4D4D8"
  whatsapp-green: "#25D366"
  text-primary: "#FFFFFF"
  text-secondary: "#A1A1AA"
  error-red: "#EF4444"
typography:
  display:
    fontFamily: "Heebo, sans-serif"
    fontSize: "clamp(2.6rem, 1rem + 5vw, 5.25rem)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Heebo, sans-serif"
    fontSize: "clamp(2.1rem, 1.2rem + 3vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  pillar:
    fontFamily: "Heebo, sans-serif"
    fontSize: "clamp(1.6rem, 1rem + 2.2vw, 3rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Heebo, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1.2
  quote:
    fontFamily: "Heebo, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.625
  body:
    fontFamily: "Heebo, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Heebo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Heebo, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.025em"
rounded:
  icon-tile: "0.5rem"
  control: "0.75rem"
  note: "1.25rem"
  frame: "1.75rem"
  pill: "999px"
spacing:
  gutter: "1.25rem"
  gutter-md: "2rem"
  container: "80rem"
  section-y: "5rem"
  section-y-md: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.control}"
    padding: "1rem 2.5rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-green}"
    textColor: "{colors.text-primary}"
  input-field:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.control}"
    padding: "14px 18px"
  note-card:
    backgroundColor: "{colors.graphite-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.note}"
    padding: "2rem"
  trade-frame:
    backgroundColor: "{colors.graphite-card}"
    rounded: "{rounded.frame}"
    padding: "0.5rem"
    width: "18.5rem"
  nav-link-active:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.875rem"
---

# Design System: Yarin Manoah, Personal Trading Mentor

## Overview

**Creative North Star: "Notes Pinned to the Screens"**

The site is a trading terminal at night: a pure black ground, the same black a charting platform uses in dark mode, with real trade screens glowing out of it. Everything that carries a claim sits on that black as a graphite note: a card one step lighter than the ground with a faint white edge, a soft shadow that falls downward, and a tilt of about one degree, as if pinned by hand over the screens. The real material (trade screenshots, Yarin's portrait, real reviews and WhatsApp messages) is framed rather than decorated; proof is the ornament.

The world is neutral. Black and graphite carry no hue, so green is the only working colour: deep brand green for the action, bright accent green for numbers that went up, check marks, stars and active states. Over that, one human mark: Yarin's silver pen, the colour of the YM logo, a hand-drawn marker stroke that underlines (or strikes through) the single phrase in a section that matters and draws itself in. The pen is rare on purpose. Type is a single family, Heebo, pushed to Black (900) for headings so Hebrew headlines read as confident and spoken, with calm regular-weight body copy at generous leading. Section headings are centred.

Density is editorial rather than dashboard: long vertical passages, two moving rails of evidence (trades and reviews) that drift sideways on their own and stop when the reader reaches for them, and quiet hairline ledgers for facts. Motion is short and functional: content rises out of a soft blur, notes land as if pinned, the pen draws, FAQ answers open with their real height, the form confirms with a pen tick. The only loops are the evidence rails, and they pause on hover, on focus and offscreen.

**Key Characteristics:**
- Pure black ground with near-black bands (#030303, #070707); graphite cards are the only lifted tone.
- Graphite tilted note cards (12% white border, soft downward shadow, rotation within about 1.5deg).
- One silver pen stroke per section at most, drawn with `pathLength="1"`.
- Heebo Black headings, centred; regular body at 1.75 leading, 56 to 62ch measure.
- Seamless auto-moving evidence marquees that pause on hover, focus and offscreen, and become a hand-scrolled row under reduced motion.
- A disclaimer sits beside every trade example or performance figure.

## Colors

A neutral black-and-graphite terminal with two greens doing all the work and one silver reserved for the mentor's hand. There is no blue on the page.

### Primary
- **Mentor Green** (brand-green): the action colour, lifted to read on black. Fills every primary CTA, tints icon tiles and check bullets (at 20 to 30% opacity), starts the scroll-progress gradient and draws the scrollbar thumbs. Never used for large surfaces.

### Secondary
- **Ticker Green** (accent-green): the "up" colour. Positive figures, the green phrase in the hero headline, review stars, check marks, FAQ plus signs, CTA hover state, the name line under the About heading, and the brand's first name in the logotype.

### Tertiary
- **Yarin's Pen** (pen-silver): hand-drawn underline and strike-through strokes, the hero text link's underline, and the focus ring of the FAQ summaries and the hero text link. Silver, matching the YM logo; it is the only non-green accent.

### Neutral
- **Terminal Black** (ground-black): page background, hero scrim base, the trade gallery, Approach and FAQ sections, the navbar glass tint.
- **Graphite** (graphite-card): every card, note, frame mat, form panel, select option and the hero trust notes (at 90% with backdrop blur over imagery).
- **Section Black** (section-black): the slightly raised band for About and Contact.
- **Deep Black** (deep-black): testimonials and footer band.
- **Paper White** (text-primary): headings and key figures. Body copy is white at 75 to 80%; supporting copy at 65 to 75%; disclaimers at 65%; the receding first line of a split heading at 40 to 55%. Hairlines are white at 6 to 12%.
- **Zinc** (text-secondary): navbar and footer links, footer fine print, the contact form's helper text.
- **WhatsApp Green** (whatsapp-green): only the WhatsApp channel (floating button, WhatsApp link icon, the icon on WhatsApp-sourced review cards). Never a brand colour.
- **Error Red** (error-red): invalid field border and its 10% ring; message text uses lighter reds for legibility on black.

### Named Rules
**The One Pen Rule.** The silver pen appears as at most one hand-drawn stroke per section, under (or through) the phrase that carries the section, plus focus rings and the hero link underline. It is never a fill, a text colour, or a second accent.

**The Green Means Up Rule.** Ticker green marks positive numbers, completion and the call to act. Neutral figures stay white; nothing negative is ever green.

**The Neutral Terminal Rule.** Grounds and cards carry no hue. Green is the only brand chroma on the page; red and WhatsApp green appear only in their functional roles.

## Typography

**Display Font:** Heebo (with sans-serif fallback)
**Body Font:** Heebo (with sans-serif fallback)

**Character:** One Hebrew-first grotesque used at two extremes: Black (900) for every heading and figure that must land, Regular (400) for reading. Medium (500) and Bold/ExtraBold (700/800) fill labels, values, quotes and links.

### Hierarchy
- **Display** (900, fluid up to 5.25rem, 1.04): the hero headline only, balanced, two lines.
- **Headline** (900, fluid up to 3.5rem, 1.05, -0.02em): centred section titles. The gallery title stretches to 3.75rem; the About hook heading to 4.5rem, as a receding first line at 40% white over the full-white hook.
- **Pillar** (900, fluid up to 3rem, 1.05): the four belief words in Approach, centred in a 2-up then 4-up grid; the struck line beneath them runs to 2.6rem.
- **Title** (900, 1.5rem mobile to 1.875rem): headings inside notes and the success panel.
- **Quote** (500, 1.125rem to 1.25rem, relaxed): review text inside testimonial notes, white at 90%.
- **Body** (400, 1.125rem, 1.75): paragraphs at 75 to 80% white, max 56 to 62ch.
- **Label** (500, 0.875rem): form labels, nav links, figure labels.
- **Caption** (500, 0.75rem, slight tracking, tabular figures): trade screenshot captions, set LTR.

### Named Rules
**The Black Heading Rule.** Every heading is weight 900 with negative tracking; there is no light or thin display style in this world.

**The Figures Stay LTR Rule.** Numbers, tickers and English trading terms are isolated with `bdi`/`dir="ltr"` and set with tabular numerals, inside otherwise RTL text.

## Layout

A single centred column capped at 80rem with 1.25rem gutters on mobile and 2rem from 768px. Sections stack vertically with generous padding (5rem mobile, 7rem desktop; the evidence sections trim their bottom to 3 to 3.5rem because the rail carries its own breathing room) and alternate ground bands instead of dividers. Section headings are centred. About opens with a centred hook heading, then a 12-column grid from 1024px (numbered beats 7, portrait 5 on the left). FAQ and Contact are narrow single columns capped at 48rem; Approach is capped at 72rem with a fit note at 64rem. Reading passages narrow to 56 to 62ch.

Evidence breaks out of the column: the trade gallery and testimonials run as full-bleed marquees with 5% faded edges, the disclaimer centred beneath. Trade frames stagger vertically (0 to 3.5rem top offsets) and testimonial notes alternate a 0.5rem / 2rem top offset, so the rail reads as pinned rather than gridded.

The hero is a full small-viewport-height stage over a darkened wall of real trade screenshots composed on black, centred text, with trust notes collapsing by breakpoint: one stacked note on mobile, a row of three tilted notes at 1024px, notes pinned around the headline from 1280px.

## Elevation & Depth

Depth is tonal and edged rather than shadowed. The grounds are pure black with near-black bands a few points apart; the graphite card is the one clearly lifted tone, and on black its 12% white border does most of the work of separating it. Shadows still sit under notes and frames, soft, large-blur and negatively spread so they fall down and away like paper lifted off a screen; they read mainly against the raised bands. No hard offsets, no coloured glows except the CTA and the WhatsApp floating button. Glass (backdrop blur over black or graphite at 65 to 95%) is reserved for things floating over imagery or content: the scrolled navbar, the mobile menu sheet and the hero trust notes. A 3.5% fractal-noise overlay covers the whole page for texture.

### Shadow Vocabulary
- **Pinned note** (`box-shadow: 0 18px 40px -14px rgba(0,0,0,0.65)`): testimonials, contact form, success panel, the chosen side of the Approach contrast pair, hero trust notes (-12px spread, 0.6).
- **Lifted frame** (`box-shadow: 0 24px 50px -18px rgba(0,0,0,0.75)`): trade screenshot frames and the fit note (-20px, 0.7).
- **Portrait** (`box-shadow: 0 30px 60px -24px rgba(0,0,0,0.8)`): the About portrait only.
- **CTA glow** (`box-shadow: 0 0 40px` accent green at 25%): primary button hover only.

### Named Rules
**The Paper Not Plastic Rule.** A note's shadow always falls downward with negative spread; it never haloes evenly or offsets hard.

## Shapes

Soft, generous corners that scale with the object: 0.5rem for icon tiles, 0.75rem for buttons, inputs and small notes, 1.25rem for content notes, 1.75rem for photo and screenshot frames (with a 1.3rem inner radius on the image well, so the 0.5rem mat reads evenly). Round controls (socials, floating contact, nav pills, check and cross bullets) are full pills. Borders are 1px white at 12% on notes and frames, 10% on hairline ledgers and the unchosen contrast card. Notes and frames tilt between -1.5deg and +2.5deg, alternating sign between neighbours; the tilt is dropped where it would hurt reading (the fit note is level and centred, the mobile trust note sits at -1deg).

## Components

### Buttons
Solid, warm, a little physical.
- **Shape:** gently rounded (0.75rem).
- **Primary:** Mentor Green fill, white Bold text, a trailing arrow pointing left (forward in RTL) that nudges on hover. Sizes from 0.625rem x 1.5rem (navbar) to 1rem x 2.5rem (hero); full-width in the form.
- **Hover / Focus:** fills to Ticker Green (0.25s), rises 2px, gains the CTA glow (0.35s expo-out). Press settles to rest at 98% scale in 0.1s. Focus is a 2px accent-green outline at 3px offset.
- **Text link (secondary):** white at 80% with a thin silver-pen underline at 50% and 8px offset that tightens to 5px and turns solid on hover; focus ring in pen silver.

### Cards / Containers (Pinned Notes)
- **Corner Style:** 1.25rem for content notes; 1.75rem for photo/screen frames.
- **Background:** Graphite, 90% plus blur when over imagery.
- **Shadow Strategy:** Pinned note or Lifted frame (see Elevation).
- **Border:** 1px white at 12%.
- **Internal Padding:** 1.75rem mobile to 2.5rem desktop; frames use a 0.5rem mat.
- **Tilt:** about 1deg, alternating sign between neighbours.

### Inputs / Fields
- **Style:** near-transparent fill (white 3%), 1px white 8% stroke, 0.75rem radius, 14px x 18px padding, 16px text; placeholder white 25%.
- **Focus:** border turns Mentor Green, fill tints green 4%, 3px green ring at 12% plus a faint outer green glow.
- **Select:** native appearance removed, chevron drawn at the inline end, placeholder state at 55% white, options on Graphite.
- **Error:** red border with a 3px red ring at 10%, message below in light red that drops in (0.18s); submission errors sit in a red-tinted rounded box with a WhatsApp fallback link.
- **Success:** the form is replaced by a pinned note that rises in (0.5s); a green-tinted round tile holds a check that the pen draws (0.6s, 0.15s delay).

### Navigation
- **Style:** fixed, transparent over the hero, then black at 65 to 80% with heavy blur, a 6% white hairline and a faint green gradient rule as the page scrolls; height steps 80 to 72 to 64px. No looping effects.
- **Links:** Label size, Zinc at rest, white on hover, active section as a white pill at 6%.
- **Mobile:** full-screen black-95% blurred sheet, links at 1.5rem Bold, active in Ticker Green, CTA at the foot.

### Evidence Marquee (signature)
The shared rail for the trade gallery and the testimonials. Items repeat in two runs and slide by exactly one run, so the loop never shows a gap at any width; speed is set in pixels per second (40 by default, slower for reviews people must read), not as a fixed duration. It pauses on hover, on keyboard focus within, and while offscreen. Edges fade over 5%. There are no buttons. Only the first copy is exposed to assistive tech; the clones are `aria-hidden` and `inert`. Under reduced motion it becomes a single row the reader scrolls by hand. An optional note (the disclaimer) sits centred beneath.

### Review Note
A graphite pinned note in the marquee: rating as five green stars, or, for WhatsApp-sourced messages, the WhatsApp icon in its own green instead of stars; quote text in Quote style; a 10% hairline above the name and context.

### Pen Stroke (signature)
An inline SVG behind or across the key phrase: a 5px round-capped silver curve, sometimes doubled with a thinner 3px stroke at 70% opacity, non-scaling stroke, `pathLength="1"` so it draws with a dash offset. As an underline it sits just under the baseline; as a strike-through it crosses the middle of a visually struck phrase (the text keeps a real `s` element for meaning). In the hero it draws after the headline rises; elsewhere it draws on view via scroll timeline and is simply present where unsupported.

### Approach Contrast Pair
Two cards side by side from 768px: the rejected option as an unfilled card (10% border), a muted cross tile and the phrase at 55% white struck by the pen; the chosen option as a graphite pinned note with a green check tile and full-white text.

### Trust Notes
Small pinned notes: a green-tinted icon tile (0.5rem radius, line icon in Ticker Green), a heavy LTR value and a quieter label beneath.

### Ledger
Facts as rows between 10% white hairlines. About uses numbered beats (a Black LTR figure with a small label, then a bold title and body); the FAQ uses native `details` with a green plus that rotates to a cross, answers opening at their real height (0.4s open, 0.25s close) and fading in, with an instant toggle where `::details-content` is unsupported.

### Motion
One easing (`cubic-bezier(0.22, 1, 0.36, 1)`), staggered with a `--d` delay variable: rise (1s, from 35% opacity, 14px below, 8px blur), pin (0.8s, from above and 4% larger), pen draw (0.75s; 0.6s for the success tick), a 2.4s settle on the hero wall image, the FAQ open and close, field-error drop-in and CTA press. The marquees are the only loops. Every CSS animation is disabled under `prefers-reduced-motion`, leaving content fully visible, and framer-motion is wrapped in `MotionConfig reducedMotion="user"`.

## Do's and Don'ts

### Do:
- **Do** set a disclaimer in the same component as any trade screenshot, performance figure or result (the marquee note slot); never let a trade example appear alone.
- **Do** put real material in frames: Graphite mat, 1.75rem corners, 12% border, Lifted frame shadow, a slight tilt.
- **Do** keep tilts within about 1.5deg on content and alternate their direction between neighbours.
- **Do** reserve the silver pen for one drawn stroke per section and for focus rings.
- **Do** make every heading Heebo 900, centre section headings, and isolate figures and English terms as LTR with tabular numerals.
- **Do** add any new animation to the reduced-motion handling so content is visible without it.
- **Do** route new evidence rails through the shared Evidence Marquee rather than building another slider, and keep its pause-on-hover, focus and offscreen behaviour.

### Don't:
- **Don't** use the silver pen as text, fills or a second accent colour.
- **Don't** reintroduce blue, or tint grounds and cards toward any hue; the terminal is neutral and green is its only brand colour.
- **Don't** colour neutral or negative figures green.
- **Don't** give notes hard offset shadows, even halos, or coloured shadows; only the primary CTA (and the WhatsApp floating button, in its own green) glows.
- **Don't** introduce a second typeface or light display weights.
- **Don't** caption a trade screenshot with an outcome; captions name only instrument and timeframe.
- **Don't** use WhatsApp green outside the WhatsApp channel.
