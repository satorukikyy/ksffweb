---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Home (the whole site)

Scope: single page, Experience mode. Reader: Amanda on her phone at the edges of the day. Owner: Kiky.
Direction chosen unattended: the user declined the question round and asked to proceed ("pake next js yang rapih cakep bucin dan modern"). Assigned direction #5 from the grounded list, no decision page shown.

## Direction contract

THESIS: The page is a photobox strip that develops live. Each frame holds a true, current fact about Kiky and Amanda (the shared clock, the km between Depok and Bireuen, days together, days to the next hug), date-stamped in film-camera digits. It refuses the Valentine template: pink ground, floating hearts, script headline, "Our Love Story" card timeline.

OWN-WORLD: Drenched cherry frame-paper red owns the page. Content sits in charcoal B&W photo windows with grain, photo-white type. Every number, time and date is an orange seven-segment date imprint with a faint glow. White marker doodles from the kiosk pen. Glassine sleeves hold the letters; letters are printed on cool photo-paper white. Flash-white pills are the only actionable fill (raise, from warm consumer app: action color reserved for actions). Faces: Bricolage Grotesque for the booth-logo display and UI, Nanum Pen Script for the kiosk pen.

STORY: Amanda sees the strip develop, frame by frame, and understands this was made for her specifically, right now. She watches the road between them draw itself, opens a letter that fits today, taps for another reason, sees her own photos taped up, then texts Kiky on WhatsApp.

FIRST VIEWPORT: Mobile: small K+A logo, headline "Amanda, this one's for you.", one line of sub, the vertical strip starting below with its first two frames visible; sticky bottom booth button. Desktop: headline and actions top-left at up to 5.5rem, the strip laid sideways across the lower half, four frames plus the logo end cap.

FORM: Photobox strip (Life4Cuts / photomatic), position 5 of 7 on the grounded list, seed 73e8c297. Raises: presence as the one live signal (from ANSI nightboard: the shared-clock status line); sealed until revealed, opened sleeves stamped (from teletext REVEAL); one press transforms (from drawcord cape: the booth button runs countdown, flash, print); frames develop in sequence (from Versailles vistas); one moment owns the phone screen in the booth overlay (from vertical feed).

Signature interaction: the strip developing live on load (flash, then each frame comes up), plus the map drawing the real Depok-Bireuen road with a km counter. The booth overlay was removed at the owner's request (2026-09-24, it read as a camera); the action is now "Text Kiky on WhatsApp" with a prefilled note and the live WIB time.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions
- Next visit date: owner to supply. "Together" is deliberately infinity, not a day count (owner's call).
- Road distance: 2,266 km from OSRM; owner saw ~2,400 on Google Maps. ROAD_KM in lib/route.ts is the knob.
