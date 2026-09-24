---
name: For Amanda
description: A private photobox strip from Kiky in Depok to Amanda in Bireuen, developing live on her phone.
colors:
  frame: "oklch(0.47 0.17 18)"
  frame-deep: "oklch(0.36 0.13 18)"
  frame-soft: "oklch(0.91 0.045 15)"
  flash-white: "oklch(0.985 0.004 20)"
  window: "oklch(0.2 0.008 20)"
  window-2: "oklch(0.27 0.01 20)"
  window-muted: "oklch(0.76 0.012 20)"
  stamp: "oklch(0.78 0.165 60)"
  paper: "oklch(0.975 0.003 250)"
  ink: "oklch(0.24 0.012 20)"
  ink-soft: "oklch(0.44 0.012 20)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7.4vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.93
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.65rem, 4.4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body-lede:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.375
  label-unit:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.12em"
  pen-display:
    fontFamily: "Nanum Pen Script, cursive"
    fontSize: "clamp(3.25rem, 9vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.85
  pen:
    fontFamily: "Nanum Pen Script, cursive"
    fontSize: "1.65rem"
    fontWeight: 400
    lineHeight: 1
rounded:
  window: "2px"
  paper: "3px"
  pill: "9999px"
spacing:
  frame-border: "10px"
  gutter-mobile: "16px"
  gutter: "24px"
  section-y-mobile: "64px"
  section-y: "96px"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.flash-white}"
    textColor: "{colors.window}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.frame-deep}"
    textColor: "{colors.flash-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-ghost:
    textColor: "{colors.flash-white}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.window-2}"
  button-primary-on-paper:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "40px"
  print-frame:
    backgroundColor: "{colors.flash-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "{spacing.frame-border}"
  photo-window:
    backgroundColor: "{colors.window}"
    textColor: "{colors.flash-white}"
    rounded: "{rounded.window}"
    padding: "16px"
  letter-sleeve:
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "14px"
  letter-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "24px"
---

# Design System: For Amanda

## Overview

**Creative North Star: "The Photobox Strip"**

The site is a Life4Cuts-style booth print lying on a cherry table. The ground is drenched frame-paper red; everything that holds content is either a white print border around charcoal B&W photo windows, a glassine sleeve, or cool printed paper. Numbers are never typeset: every time, date, distance and count is an orange seven-segment date imprint, the way a film camera burns the date into the corner of a frame. Handwriting comes from the kiosk pen: white hand-drawn doodles and Nanum Pen Script notes.

It is read on a phone at the edges of the day, so the page is one column of physical objects, slightly tilted, each casting the same table shadow. Motion is photographic: frames develop from a white flash, reasons resolve out of blur, the map draws the real road. Nothing floats, sparkles or pulses for decoration.

**Key Characteristics:**
- Drenched cherry red ground; charcoal photo windows with film grain; orange date-imprint digits with a faint glow.
- Two faces only: Bricolage Grotesque (booth logo, headings, UI) and Nanum Pen Script (the pen).
- Flash-white pills are the only filled action.
- Objects sit at small tilts (0.5deg to 2deg) and share one table shadow.
- Tokens flip to ink-on-paper wherever content is printed.

## Colors

One hot ground, one neutral photo charcoal, one orange imprint accent, and paper white; the red does the emotional work so nothing else has to.

### Primary
- **Cherry Frame Paper** (frame): the page ground, scrollbar track, sealed-letter disc, and the pen signature on letter paper. Drenched, never used as a small accent on white.
- **Deep Frame** (frame-deep): footer band, secondary pill, the map jump-button tray, scrollbar thumb.
- **Frame Blush** (frame-soft): secondary text on red (ledes, nav links, pen notes). A text tint only, never a ground.

### Secondary
- **Date-Imprint Orange** (stamp): seven-segment digits, the hero squiggle, text selection, map route line and pin glow. Always paired with the stamp glow (a 5px drop-shadow at 55% of itself) when on charcoal.

### Neutral
- **Flash White** (flash-white): body text on red, print borders, the primary pill fill, focus ring.
- **Photo Charcoal** (window) and **Lifted Charcoal** (window-2): photo windows, rendered as a radial gradient from window-2 at upper left into window, under a film-grain overlay.
- **Silver Caption** (window-muted): secondary text and unit labels inside photo windows.
- **Photo Paper** (paper): letter paper and the peeking sheet inside glassine.
- **Ink** (ink) and **Faded Ink** (ink-soft): text on white prints, sleeves and paper.

### Named Rules
**The Imprint Rule.** Every number (time, date, km, count, day) renders through the SevenSeg component in stamp orange; never set digits in Bricolage for display. Only digits, `-`, `:`, `.`, space and the infinity glyph are supported.

**The Paper Flip Rule.** Any surface printed on paper takes the `.on-paper` token flip (foreground and primary become ink, primary-foreground becomes paper), so shared components invert without new variants.

**The Mirror Rule.** The map canvas cannot read CSS variables, so components/distance-map.tsx mirrors window, window-2 and stamp as hex. Change a token, change the mirror.

## Typography

**Display Font:** Bricolage Grotesque (optical-size axis on, `font-optical-sizing: auto`)
**Pen Font:** Nanum Pen Script (400 only)

**Character:** A chunky booth-logo grotesque set tight and heavy, against the loose felt-tip of the kiosk pen. The grotesque states facts; the pen speaks to Amanda.

### Hierarchy
- **Display** (800, clamp(2.75rem, 7.4vw, 5.5rem), 0.93, max 12ch): the hero headline only.
- **Headline** (800, clamp(2.1rem, 5vw, 3.5rem), 0.98): section headings, all sentences ending in a full stop.
- **Title** (600, clamp(1.65rem, 4.4vw, 3rem), 1.08, max 22ch): the reason inside the photo window.
- **Lede** (400, 1.125rem, relaxed, max 40ch, frame-soft): one or two sentences under each heading.
- **Body** (400, 0.875rem to 1.05rem): frame captions at 0.875rem; letter paragraphs at 1.05rem relaxed.
- **Unit label** (600, 0.75rem, 0.12em tracking, uppercase, window-muted): only the unit beside a SevenSeg readout (km, days, WIB) and the "opened" state stamp.
- **Pen** (400, 1.65rem to 2.6rem, line-height 0.9 to 1): frame captions ("right now", "between us"), letter titles, photo titles, hints ("tap a pin"). **Pen display** (clamp(3.25rem, 9vw, 6rem), 0.85): the footer sign-off.

### Named Rules
**The Pen Speaks Rule.** Nanum Pen Script is for what Kiky would write by hand on the print: captions, titles of letters and photos, hints, sign-offs. It never carries body copy, buttons or numbers.

## Layout

A single centered column capped at 72rem, gutters 16px (24px from sm). Sections breathe at 64px vertical padding on mobile and 96px from lg; heading-to-lede gap 16px, heading block to content 40px to 56px. The page reserves 112px bottom padding on mobile for the sticky bar.

- **Hero:** stacked on mobile; from lg a 1.35fr / 1fr grid with the headline left and lede plus actions right, bottom-aligned.
- **Photo strip:** vertical on mobile (max 23rem wide, frames 3:2, tilted +0.8deg); horizontal from lg (frames square, strip tilted -1.2deg, a vertical-text logo end cap).
- **Split sections (map, reasons):** stacked on mobile; from lg an asymmetric text-left grid (1fr / 2fr map, 1fr / 1.6fr reasons); the map intro sticks at top 40px.
- **Letters:** 2 columns on mobile, 3 from md; sleeves 4:5, 5:4 from lg.
- **Roll:** 1 column, 2 from sm, 3 from lg; prints max 20rem, 9:16 windows, 56px row gap to leave room for tape.
- **Sticky WhatsApp bar:** mobile only (hidden from md), full-width pill over a frame-to-transparent scrim, bottom padding respects the safe-area inset. From md the same action sits in the hero (secondary) and footer (primary).
- Header nav is hidden below md; the K+A logo is the only mobile chrome.

## Elevation & Depth

Depth is physical, not interface: prints, sleeves and paper lie on a table. There is one shadow for everything resting on the red, plus a deeper lift for paper held up to read.

### Shadow Vocabulary
- **Table** (`0 22px 40px -18px oklch(0.2 0.1 18 / 0.7), 0 3px 8px oklch(0.2 0.1 18 / 0.35)`): every print frame, sleeve, strip and map frame.
- **Held paper** (`0 30px 80px -20px oklch(0.1 0.05 18 / 0.7)`): the open letter dialog only.
- **Tape** (`0 1px 2px oklch(0.2 0.1 18 / 0.2)`): tape strips.
- **Stamp glow** (`drop-shadow(0 0 5px oklch(0.78 0.165 60 / 0.55))`): seven-segment digits on charcoal.

### Named Rules
**The One Table Rule.** Everything resting on the red uses the table shadow; do not invent new elevations for new objects. Lift is expressed by tilt returning to 0 and a 6px rise on hover or focus.

## Shapes

Print-sharp corners: paper and print borders at 3px, photo windows inside them at 2px, so the white border reads as a trimmed booth print. The only round shapes are pills (buttons, map tray), the sealed-letter disc and map pins. Objects carry small deterministic tilts from a repeating list (letters -2deg to 2deg, roll -1.5deg to 1.8deg) so a grid still feels hand-placed.

## Components

### Buttons
- **Shape:** full pill (9999px), 48px tall for hero and WhatsApp actions, 44px in section toolbars, 40px on letter paper; 0.95rem semibold.
- **Primary (flash pill):** flash-white fill, charcoal text; hover drops to 80% opacity fill; active nudges down 1px. The one filled action per cluster.
- **Secondary:** frame-deep fill, white text; used when the primary action appears a second time in view (WhatsApp in the desktop hero).
- **Ghost:** no fill, white text, charcoal hover; tertiary actions (Drive it again, Close, map jumps inside the frame-deep tray).
- **On paper:** the `.on-paper` flip turns primary into an ink pill with paper text.
- **Focus:** 2px solid currentColor outline at 3px offset site-wide; buttons also get the shadcn ring.
- **Disabled:** 50% opacity, no pointer (map controls until the map is ready).
- **Icons:** lucide at 16px, inline-start or inline-end, only inside buttons.

### Print Frame and Photo Window (signature)
The container for every fact. A flash-white print border (10px, 12px from lg, 3px radius, table shadow) around a charcoal photo window (2px radius) with radial charcoal gradient and a 16% overlay film-grain noise layer. Inside: pen caption top-left, SevenSeg readout plus unit label, then a medium caption line and a window-muted sub line. Content in the window sits above the grain (z-index 3).

### Photo Strip
Four frames plus the logo end cap in one print. Frames develop on load: a white flash fades over 1.1s while the image resolves from blur(6px), low contrast and high brightness over 1.3s, easing `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 280ms per frame after 200ms. Reduced motion removes the flash and blur.

### Seven-Segment Readout
An authored SVG, skewed -6deg, filled currentColor; unlit segments at 9% opacity so the digit grid is always visible. Height sets size (12px for small stamps to 56px for strip values). Always carries an accessible label.

### Letter Sleeve
A glassine button: translucent white gradient (60% to 46% to 56%) over the frame red, 3px radius, tilted, table shadow. A paper sheet peeks through with the first line of the letter blurred 1.2px at 60% ink. Title in pen, 1.75rem to 2.2rem. Top-right shows a frame-red disc with a white heart doodle while sealed, and "opened" plus a seven-segment time once read (persisted in localStorage). Hover and focus: rise 6px and straighten; the peek sheet slides up 12px.

### Letter Paper (dialog)
Photo-paper white, 3px radius, held-paper shadow, `.on-paper` flip, charcoal 75% overlay. Enters on a Motion spring (visualDuration 0.5, bounce 0.18) from 28px below and -1.5deg. Pen title 2.6rem, body 1.05rem relaxed, pen signature in frame red, ink primary pill plus ghost Close.

### Reason Window
One large photo window. Changing the reason fires a white flash (90% to 0 over 0.7s) and the new line resolves from blur(8px) over 0.4s; counter is a SevenSeg "07 / 42" style readout.

### Taped Print (roll)
A tall print with a translucent tape strip (warm white at 55%, 96x24px, -4deg) across the top edge, 9:16 window, optional seven-segment date stamp bottom-right, pen title and ink-soft note below.

### Distance Map
MapLibre inside a print frame (4:5 mobile, 16:11 sm, 16:10 lg). Camera fits both cities, then the route draws along real road geometry with a live SevenSeg km counter bottom-left on an 85% charcoal plate. Pins are 44px face photos (or a 14px stamp dot) with a 3px white ring and orange glow, scaling 1.12 on hover; labels are small white 3px-radius tags. Map controls are white pills.

### Doodles
Authored SVGs with one stroke (2.4, round caps and joins, currentColor): heart, arrow, squiggle, spark. White on red and charcoal, frame red on paper, stamp orange for the hero squiggle.

## Do's and Don'ts

### Do:
- **Do** render every number through SevenSeg in stamp orange with the stamp glow on charcoal.
- **Do** put new content inside a print frame, sleeve or paper sheet with the table shadow and a small tilt.
- **Do** keep one flash-white pill per action cluster; demote repeats to secondary or ghost.
- **Do** use the pen for captions, titles and sign-offs and Bricolage for everything else.
- **Do** respect reduced motion: MotionConfig reducedMotion="user" for Motion, a media query for CSS keyframes, matchMedia before running the map draw.
- **Do** update the hex mirror in distance-map.tsx when window, window-2 or stamp change.

### Don't:
- **Don't** use a pink or pastel ground; blush exists only as text on red.
- **Don't** animate hearts or scatter them as particles; the heart is a static pen doodle placed once per object.
- **Don't** use gradient text, or backdrop-filter glass on any surface. Blur is optical only: the glassine peek and the develop and resolve transitions.
- **Don't** set display numbers in a text face or add a monospace font.
- **Don't** use lucide icons outside buttons, or emoji and glyphs as icons; draw a doodle instead.
- **Don't** round prints beyond 3px or add card borders; the white print border is the edge.
- **Don't** add a new shadow for a new object; use the table shadow.
