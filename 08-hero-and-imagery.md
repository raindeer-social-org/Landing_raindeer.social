# 08 — The Hero System & The Imagery Question

> Answering the two things that were actually blocking the page: *"what is our hero visual?"* and *"we have no pictures."*
>
> Short version: **stop looking for a picture. The product is the picture.** The hero is a live, drivable Mac window running the orchestrator. Everything below is the research that gets us there, the spec, and — for the places where you genuinely do need raster art (OG cards, blog headers) — a prompt library that won't produce slop.

---

## 1. What the benchmark sites actually do

Evil Martians audited 100+ developer-tool landing pages (Linear, Vercel, Supabase et al) and found exactly six hero-visual archetypes:

| # | Archetype | Who uses it | Fit for raindeer |
|---|---|---|---|
| 1 | **Animated product UI** | Linear, Stripe | Strong |
| 2 | Static product screenshot | Most SaaS | Weak — we'd be showing a picture of a thing instead of the thing |
| 3 | Switchable multi-UI (tabs) | Products with unclear core message | No — we know our message |
| 4 | **Live product embed** | Pitch, small utility tools | **This one.** "A power move if you can pull it off" |
| 5 | Code snippet | Libraries, SDKs, infra | No — we have a UI |
| 6 | Abstract illustration / no visual | Pre-launch, stealth, "under the hood" products | **This is where we are today, and it's why the page feels empty** |

We have been sitting in archetype 6 by accident, not by choice. That is the whole problem.

**Why 4 beats everything else for us specifically:** an autonomous agent system is *invisible*. You cannot screenshot "ten agents coordinating." You can only show it happening. A static image of a dashboard would under-sell the product; a live run of the mesh over-delivers on it. Pitch faced the identical problem — presentations are hard to evaluate from a screenshot — and solved it by letting you play with the product before you click anything.

## 2. The award-craft filter

From a breakdown of 2026 Awwwards / FWA / CSSDA winners, three tests that every winning hero survives:

1. **The static-frame test.** *"Kill the motion in your head. Screenshot the hero. Is the static frame still strong? If not, the motion is hiding weak art direction."* → Our resting state (mesh fully lit, log complete, post rendered) must be a beautiful poster on its own.
2. **The throttle test.** DevTools → 4× CPU slowdown + Fast 3G. Still ~60fps, still paints fast. *"A 3D hero that drops to 18fps on a mid-range Android will not win — jurors test on real devices."* → This is why we do not reach for WebGL.
3. **The reduced-motion test.** *"A real craftsperson built a graceful fallback; an amateur shipped a broken or jarring one."*

And the structural note that matters most: **user-driven pacing creates investment.** Click-to-explore beats watch-a-loop. Our hero must be *drivable*, not a video.

> The synthesis, in one line: *art direction gives it a reason to exist, directed motion gives it life, performance keeps it alive on real devices.*

---

## 3. THE DESK — the signature hero

A macOS-class application window, tilted back in perspective, that **flattens toward the viewer as you scroll** (the "Mac screen" moment). Inside it, the raindeer orchestrator runs — for real, on a topic the visitor chooses.

### Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│ ○ ○ ○   raindeer://orchestrator                          ◉ LIVE  8.2s  │  chrome
├───────────────┬─────────────────────────────────┬──────────────────────┤
│    THE MESH   │      ORCHESTRATOR LOG           │      THE OUTPUT      │
│               │                                 │                      │
│   antler      │  $ raindeer run --topic="…"     │  ┌────────────────┐  │
│   graph;      │  [trend_intel]  3 rising angles │  │ hook decodes   │  │
│   each node   │  [brand_brain]  412 vectors     │  │ in, char by    │  │
│   lights as   │  [writer_crew]  5 hooks ranked  │  │ char           │  │
│   its agent   │  [editor]       −34 words       │  │                │  │
│   fires       │  [visual]       6 slides        │  │ ▦▦▦▦▦▦ carousel│  │
│               │  [scheduler]    peak 8:42 PM    │  │ ⏱ 8:42 PM IST  │  │
│   ↓ core      │  [DONE] 8.2s                    │  │ [Approve →]    │  │
│   lights last │                                 │  └────────────────┘  │
├───────────────┴─────────────────────────────────┴──────────────────────┤
│  What should raindeer post about?  ⟨churn⟩ ⟨hiring⟩ ⟨pricing⟩   ▸ Run   │  the driver
└────────────────────────────────────────────────────────────────────────┘
```

Three panes = the three things a visitor needs to believe: **the system is real** (mesh), **it reasons** (log), **it ships** (output).

### The run (≈8 seconds, one line per agent)

Each log line fires → its node lights in the mesh → the output pane advances. One data structure drives all three panes; they can never drift out of sync.

```
$ raindeer run --topic="we cut churn 40%"
[trend_intel]   4 platforms scanned · 3 rising angles
[research]      12 sources · 2 stats verified
[brand_brain]   412 posts retrieved · voice: founder-direct
[strategist]    angle: counterintuitive teardown
[writer_crew]   5 hooks drafted · ranked by hold
[editor]        −34 words · passive voice removed
[visual]        carousel · 6 slides rendered
[scheduler]     peak window 8:42 PM IST · +2.3× reach
[engagement]    12 reply templates staged
[analyst]       queued for retro → Brand Brain
[orchestrator]  DONE in 8.2s — awaiting your approval
```

### Rules that make it land

- **It auto-runs once on load.** The hero is never empty or waiting. Then the driver bar invites a second, user-chosen run — that second run is where investment happens.
- **The output is a real post, not lorem.** Hook, body, carousel, peak time, projected reach. It must be good enough that a founder would actually publish it.
- **The final button inside the window is the page's CTA.** "Approve & schedule →" scrolls to the waitlist. The demo hands you the conversion.
- **Never loops.** Runs once, holds the finished state. A looping hero is the #1 tell of a generated page. Re-runs are user-initiated only.
- **Scroll flatten:** `rotateX(12deg) scale(.94)` → `rotateX(0) scale(1)` over the first ~420px of scroll, with the shadow deepening as it lands. One GPU transform. No WebGL, no Three.js, no 3D library.
- **Reduced motion:** window sits flat, the run completes instantly to its finished state, chips still work. The static frame is the design.

### Why this is *ours* and not a template

Because the mesh pane is the antler graph, and the antler graph is the logo, and the logo is the architecture. The same `AGENTS/EDGES` array feeds the hero mesh, the agents diagram, and the footer mark. No other company on earth can ship this hero — that is the definition of a signature.

---

## 4. The imagery question: why the background stays *coded*

The instinct is to commission or generate a hero background image. Don't. Not for the hero.

- A raster background can't be crisp at 320px and 3840px, can't animate, and can't respond to the cursor.
- It will always read as **an asset placed behind the content**, not as the page's own atmosphere — and that gap is exactly what makes a page look "designed by a template."
- Our hero already has three coded atmosphere layers (guide `06`): the dawn gradient, two drifting blooms, and film grain. Grain is what kills the flat-CSS-gradient tell. The Desk's cobalt under-glow does the rest.

**Rule:** backgrounds are code. Rasters are for places code can't go — social cards, blog headers, email, decks.

---

## 5. Where you *do* need raster art — and the prompt library

Five real needs. Each gets a prompt built for Midjourney / Flux / Ideogram / DALL·E, keyed to our palette.

### The visual idea that unlocks all of them: **frost**

Frost crystals grow as **dendritic branching networks** — a trunk, forks, nodes, terminals. Structurally identical to the antler graph and to the agent mesh. It is arctic, it is premium, it is macro-photographic rather than illustrative, and it is *not* a purple gradient or a glowing brain. Every image asset we make should be a variation on frost, ice, snow-light, or press-ink — never robots, never neural-network clichés, never people pointing at laptops.

---

**A · OG / social share card (1200×630)** — the most-seen image you own

```
Extreme macro photograph of frost crystals branching across dark glass,
dendritic ice structures forming a natural network of nodes and connecting
lines, lit from behind with cold cobalt blue light (#0053CC) fading into
deep ultramarine (#04338A), with a single faint warm brass highlight
(#A87B2E) at one edge. Shot on a 100mm macro lens, f/2.8, shallow depth of
field, the branching structure tack-sharp in the centre and dissolving into
soft bokeh at the corners. Editorial science photography, National
Geographic quality, high dynamic range, subtle film grain. Negative space
in the left third for typography.
--ar 1200:630 --style raw
NEGATIVE: text, letters, watermark, logo, people, faces, hands, robots,
brains, circuit boards, neon, purple, magenta, glowing orbs, 3D render,
CGI, cartoon, illustration, low contrast, oversaturated
```

**B · Light-theme OG variant / section plate (1600×900)** — frost *on white*

```
Extreme macro photograph of hoarfrost on a pane of white glass, delicate
crystalline branches radiating outward in a lattice, photographed from
directly above on a near-white cool background (#FAFBFD). The ice reads as
fine cobalt-blue lines (#0053CC) against snow-white, like ink on paper.
Bright, even, diffuse arctic daylight; no harsh shadows. Minimal, calm,
architectural. Feels like a museum print, not a stock photo. Fine film
grain, no vignette.
--ar 16:9 --style raw
NEGATIVE: text, logo, people, warm tones, orange, purple, neon, 3D render,
CGI, plastic, glossy, dark background, heavy vignette
```

**C · Blog / editorial header art (2000×800)**

```
Abstract macro photograph of newsprint under raking light, the halftone dot
pattern visible as fine grey rosettes, with a single cobalt-blue ink line
(#0053CC) running across the paper fibres. Overhead, flat, editorial still
life. Cool white paper (#FAFBFD), deep navy ink shadows (#0E1B3A). Extremely
shallow grain, high detail, letterpress texture. Quiet and premium — a print
studio, not a tech ad.
--ar 5:2 --style raw
NEGATIVE: readable text, headlines, words, logo, people, warm yellow paper,
sepia, vintage filter, purple, neon
```

**D · The ten agent cards (1:1, one per agent)** — a set, not one-offs

```
Minimalist macro photograph of a single ice crystal formation on white,
[VARY: a six-armed dendrite / a straight column of frost / a fan of needle
ice / a hexagonal plate / a fractured shard], isolated centre-frame on a
cool near-white surface (#FAFBFD), lit with soft diffuse arctic light, edges
catching a faint cobalt refraction (#2470EA). Scientific specimen
photography, clinical and beautiful, deep negative space, subtle grain.
--ar 1:1 --style raw
NEGATIVE: text, icons, symbols, logo, hands, robots, colour casts, warm
light, purple, neon, busy background
```
Shoot all ten from the same recipe with only the bracketed variable changing — that's what makes them read as a *system* rather than ten stock images.

**E · Waitlist confirmation / email header (1200×400)**

```
Abstract photograph of a single shaft of cold blue winter light falling
across untouched snow, the surface almost entirely white with the faintest
blue shadow gradient (#DDECFE to #FAFBFD), one small dark point of interest
in the lower third. Minimalist landscape, Hiroshi Sugimoto restraint,
enormous negative space, natural grain.
--ar 3:1 --style raw
NEGATIVE: text, people, footprints, trees, buildings, warm light, sunset,
purple, saturated colour, HDR
```

### Prompt discipline (why these won't produce slop)

1. **Photography, not illustration.** Every prompt names a lens, a light, a genre. AI illustration is the tell; AI-assisted macro photography reads as art direction.
2. **Hexes, not colour words.** "Blue" gives you Tailwind indigo. `#0053CC` gives you our cobalt.
3. **A hard negative list every time.** Purple, magenta, neon, robots, brains, circuit boards, glowing orbs, 3D render, faces, hands, text. These are the AI-slop attractors; naming them suppresses them.
4. **Reserve negative space for type.** Ask for it explicitly or you'll get a busy frame you can't set a headline on.
5. **Never generate anything containing text.** Type goes on in code or Figma, in Newsreader — never in the render.
6. **One recipe, many variations.** A set that shares a lens, a light and a palette reads as a brand. Ten unrelated "cool AI images" read as a Pinterest board.

---

## 6. Ship checklist for the hero

- [ ] Screenshot the finished state. Is it a strong poster with zero motion? If no, fix the art direction, not the animation.
- [ ] 4× CPU throttle + Fast 3G: still ≥50fps, first paint under 2s
- [ ] Reduced motion: window flat, run resolved, chips functional, nothing jarring
- [ ] Auto-run fires once; **never loops**; re-runs are user-initiated
- [ ] The output post is good enough that a real founder would publish it
- [ ] The in-window "Approve & schedule" is the page's primary CTA and actually converts
- [ ] Mesh, log and output all read from **one** data structure — they cannot desync
- [ ] Works on a 360px phone: panes stack, the run still runs, the driver bar still drives
