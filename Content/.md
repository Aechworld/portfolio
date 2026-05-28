# Portfolio Content Brief — Nik

This file is the single source of truth for the case-study content on my portfolio site.
Use it to build the `/content/<slug>.html` fragments. Each project below has a **slug**
(the filename to use), a **status** for each section, and the **locked copy** where it exists.

## How to use this file (instructions for Claude Code)
- Build one HTML fragment per project at `/content/<slug>.html`. Fragments only — no
  `<html>/<head>/<body>` wrappers.
- Only use copy marked **LOCKED**. Do NOT invent or fill in text for sections marked
  **PENDING** — instead leave a clearly-commented placeholder, e.g.
  `<!-- PENDING: Research — awaiting source material -->`, so I can see what's unfinished.
- Keep my existing layout, classes, and styling. This is content population, not redesign.
- Section order per project is listed under each project. Some projects rename the last two
  sections (noted inline) — respect those names exactly.
- Do not add a build step or framework. Plain static HTML fragments only (GitHub Pages).

## Case study template (standard section order)
1. Hero (title, optional tagline, meta: timeline / role / context / tools, hero visual)
2. Context
3. Research
4. Synthesis
5. Ideation
6. Iteration
7. Final Outcome
8. Reflection

Note: two projects deviate — see inline notes.

---

# Project 1 — Ministry of Misconduct
- **slug:** `ministry-of-misconduct`
- **Position:** First project on the homepage.
- **One-line:** A p5.js browser game where you play the powerful person and your job is to
  *maintain* corruption, not fight it. Inversion is the point — it should be felt, not explained.
- **Type:** Game design / systems / interaction-as-critique.
- **WIP NOTE:** This project is still in progress. Its last two sections are RENAMED:
  - "Final Outcome" → **Current State**
  - "Reflection" → **What's next**

### Hero — LOCKED
- Title: Ministry of Misconduct
- Tagline: *Can you stay corrupt?*
- Timeline: March 2026 – present (in progress)
- Role: Solo
- Context: Self-initiated outside class
- Tools: p5.js
- Hero visual: Animated GIF montage — decision moment → chain forming → chain breaking
  (≤3 sec loop). [ASSET PENDING — to be captured]

### Context — LOCKED
Ministry of Misconduct is a game where you play the powerful person. The system is already
broken. Your job is to keep it that way.

The project didn't start with a headline. It started with a shape — the same shape, showing up
across different systems. A decision is made. Another decision builds on it. The pattern
thickens. Nobody notices, until something breaks and people are briefly uncomfortable. Then the
pattern resumes.

I made it a game because you can't argue with what you just did. You can read about corruption
and disagree. You can watch a film about it and stay outside. But when you sit in the chair,
make the choices, and watch your own chain hold — the discomfort lands somewhere reading and
watching can't reach.

### Research — PENDING
Reference games identified (Papers Please — played fully; Beholder — played fully; You Are Jeff
Bezos — played part). Still need: what each game specifically contributed to MoM. Conceptual
references are loose/absorbed, no specific texts. Do not draft yet.

### Synthesis — LOCKED
The game is built around a single inversion: the goal is to maintain corruption, not fight it.
Everything in the design exists to make that inversion *felt* by the player — not described to
them. Three principles came out of that commitment, and every later decision had to honor them.

**Inversion must be felt, not understood.**
A reader can disagree with an essay about corruption. A viewer can stay outside a film about it.
But a player who has just maintained the chain — who pressed the button that kept the system
intact — can't unfeel that. The discomfort isn't argued for; it's caused. This principle pushed
me away from anything that explains the game's politics to the player. No narration, no on-screen
morality, no "see, this is bad" framing. If the inversion has to be explained, it has already
failed.

**Pattern formation is the system.**
Corruption is not one bad decision. It is the *shape* that decisions take when consistency is the
goal. One honest choice doesn't reform a corrupt system — it exposes it, which is something
different. This principle forced the central mechanic: a visible chain of choices, where every
link has to align, and a single break is fatal. The game isn't asking the player to be evil.
It's asking them to be *consistent*.

**The player is the powerful one.**
The player sits at the top of the pyramid. The choices in front of them are choices about people
who never appear on screen — people whose lives sit at the bottom of the structure the player is
holding up. Most games put the player in the role of resister, hero, or survivor. This one
doesn't. The discomfort of the inversion lives partly here: in the experience of being the person
whose small, abstract decisions reshape lives the player will never see.

These three principles are the test every version of the game had to pass. The next sections
trace which versions passed, and which ones didn't.

### Ideation — PENDING
Pre-V1 sketches/notes exist and a few unbuilt mechanic variations exist. Awaiting source notes.
Do not draft yet.

### Iteration — LOCKED
The game went through three versions before settling on its current form. The story isn't a
smooth refinement — it's two distinct decisions to throw away a working prototype. The first
because the concept was wrong. The second because the scope was.

**V1 — Word shooter.**
The first prototype borrowed the structure of a Space Invaders game. Words categorized into
tension meters fell from the top of the screen. The player had to shoot or destroy them before
they hit the ground. The intent was to make the political content reactive — let the player feel
pressure as charged language piled up.

It didn't work. The form fought the idea. Shooting words is an arcade act, and arcade acts don't
carry weight. The player wasn't sitting in a position of power; they were a reflex. None of the
discomfort the project was reaching for had anywhere to land. The version was buildable, even fun
in a thin way — and that was the problem. A fun word-shooter was further from the thesis than no
game at all.

I cut it.

**V2 — Papers Please structure.**
The second prototype borrowed from *Papers Please* — a desk, files to sign or reject, three files
a day, two to handle, relationship bars per stakeholder. This time the form was right. The desk
put the player in the seat of power. The choices accumulated through stakeholders, which started
to look like a pattern. The discomfort had a place to land.

But the scope was wrong. A desk-and-stakeholders game needs daily content, character writing,
branching consequences, and visual variety to stay alive across multiple sessions. As a solo
developer on a deadline, I couldn't sustain that scale without the project collapsing under its
own weight. The version that captured the thesis was the version I couldn't finish.

That cut was harder than the first. V1 was wrong; killing it felt obvious. V2 was *right* and
still had to go.

**V3 — Chain mechanic.**
The current version strips the form down to the smallest shape that still carries the thesis.
Each turn, the player gets two choices. One sustains the chain. One breaks it. The chain is
visible — it accumulates across the screen as the player makes decisions. Maintain it for the
duration of the timer to win. Break it once and you're exposed.

Everything that wasn't load-bearing is gone. No stakeholders to manage, no daily calendar, no
content treadmill. What remains is the smallest possible game that still asks the player to be
consistent in service of something they shouldn't want to maintain. The form finally matches what
the project has been about since the start.

V3 is what the rest of the case study covers — where it is now, and where it's going.

### Current State (renamed from Final Outcome) — PENDING
Describe V3 as it currently stands; embed the playable build/link + screenshots. Do not draft yet.

### What's next (renamed from Reflection) — PENDING
Forward-looking. Timer tuning via weekly iteration; targeted finish ~3 weeks from late May 2026.
Do not draft yet.

---

# Project 2 — Ghar Jo Hum Piche Chhod Aaye
- **slug:** `ghar-jo-hum-piche-chhod-aaye`
- **One-line:** A multisensory VR + physical-space installation set in a single kitchen on the day
  Partition news breaks, experienced through the body of an unsupervised child looking for a lost
  toy. Zooms in where most Partition work zooms out.
- **Type:** Multisensory installation / physical computing / immersive experience.
- **Tone:** Reflective / essayistic (more space, slower sentences than MoM).
- **Section names:** Standard (V1 is exhibited = real Final Outcome; V2-in-progress goes in
  Reflection).

### Hero — LOCKED
- Title: Ghar Jo Hum Piche Chhod Aaye
- Tagline: none — the title carries the frame.
- Timeline: Few weeks · Sem 6
- Role: Two-person team with Janvi. I led the technical build — Unity, Arduino, texturing, and
  VR-to-physical-space mapping. Janvi led research, theory, and asset/space creation. Core
  interaction and physical-space development were collaborative.
- Context: Sem 6 class brief
- Status: V1 exhibited; V2 in development
- Format: Multisensory installation — VR + physical space + sound + smell + touch
- Hero visual: Installation walkthrough video. [ASSET PENDING — to be selected]

### Context — LOCKED
Most Partition stories arrive at scale. The trains, the maps redrawn overnight, the violence, the
millions in motion. The history is real, but the scale has its own gravity — it pulls the story
toward statistics, toward distance, toward the kind of looking that allows the viewer to stay
outside.

*Ghar Jo Hum Piche Chhod Aaye* is a single room. A kitchen, in a house, on a day when the news has
just broken. The parents are packing somewhere else. A child has been sent to the kitchen to
gather his things, and instead — because no one is watching — he goes looking for a lattu he lost
some time ago. He blows air into the chulha because he was never allowed to. He gets distracted.
He leaves. He forgets the toy.

That is the entire piece.

We chose the child not as a victim, but as a vessel. A child arrives at the world without
ideology, without political memory, without the apparatus that helps adults sort experience into
meaning. The visitor, inhabiting the child through VR, arrives the same way — uncluttered,
curious, unaware of what the day actually is. The context of Partition rests on top of that
innocence, and the gap between what the visitor knows and what the child feels is where the piece
does its work.

The kitchen continues while panic happens elsewhere. The visitor walks through a real space,
wears a headset, hears sounds, smells food, touches objects that respond. The installation isn't
a depiction of a moment. It is the moment, ongoing, while the visitor moves inside it.

The piece is small on purpose. It is one boy, one room, one forgotten toy. The rest of the
history surrounds it without ever entering.

### Research — PENDING
Real and substantial but currently undocumented on my side. Janvi led Partition texts/films/facts
(list to come from her). Visual references pulled from Google, Alamy, Shutterstock, books,
Internet Archive, Pinterest — specific archives/photographers used but not yet recalled. Method
note worth capturing: referenced real archival imagery as ground truth, then built custom assets
where archives fell short. Do not draft yet.

### Synthesis — IN PROGRESS (candidate principles, not yet locked)
Candidate principles under consideration (need keep/drop/merge/reword pass):
1. Zoom in, not out — the piece refuses scale; one child, one room, one moment.
2. The visitor inhabits, doesn't observe — multisensory + VR exist to dissolve the watch/be-in
   boundary.
3. The child is a vessel, not a subject — the child is the door the visitor enters through.
4. Dramatic irony does the work, not narration — the gap between visitor knowledge and child
   feeling is the engine; no voice-over or on-screen text.
5. Reference reality, then exceed it — archival ground truth, custom-built where needed.
Do not finalize until I confirm the set.

### Ideation — PENDING
### Iteration — PENDING
### Final Outcome — PENDING (V1 exhibited — walkthrough video + installation stills)
### Reflection — PENDING (reflect on V1 by pointing at what V2 will address)

---

# Project 3 — Untitled.Nikhil (working title)
- **slug:** `untitled-nikhil`  *(rename when title is finalized)*
- **One-line:** A speculative-design thought experiment: each party's manifesto is a "pill" that
  grants complete knowledge of that party — but consuming it disqualifies you from voting for them.
  Full knowledge cancels belief; the system never lets choice be as clean as it claims.
- **Type:** Speculative / critical design, political philosophy.
- **Status:** Strong conceptual core; needs scaling + a tangible artifact.
- **Notes for case study:** Synthesis is the star section (the thinking IS the deliverable).
  Research leans philosophical (rational ignorance, theories of democratic choice) not user
  research. Final Outcome depends on what artifact gets made — to be planned.
- **All sections:** PENDING. Concept material exists (see my pasted "pill" writeup) but nothing is
  drafted/locked yet.

---

# Project 4 — Hum Panchi Umukt Gagan Ke
- **slug:** `hum-panchi-umukt-gagan-ke`
- **One-line:** A video poem adapting Shiv Mangal Singh Suman's Hindi poem into a puppeteering-style
  animated short — full solo pipeline: narration, storyboard, assets, sound design, final video.
- **Type:** Narrative / audio-visual / animation pipeline.
- **Status:** Finished. Recognized at a college animation festival.
- **Honest framing note:** Visuals read as student-level; the strength is process + pipeline +
  narrative. Frame as a PROCESS piece — foreground storyboards, asset sheets, sound design,
  narration; embed the final video lower as one output, not the centerpiece. Consider one redrawn
  hero key-visual so the page's first impression is confident. Surface the festival recognition
  near the top as a small credit line.
- **All sections:** PENDING. Not yet audited.

---

# Project 5 — Zepto Satire
- **slug:** `zepto-satire`
- **One-line:** A functional dummy app that mimics Zepto's ordering flow but, instead of food,
  surfaces data about gig-workers' health under Delhi's high AQI — interaction-as-critique. The
  comfort of the familiar interface is the point.
- **Type:** Interaction-as-critique / data visualization. (Data-viz coursework.)
- **Status:** Finished, no baggage — happy to write about it. Promoted to a primary case study.
- **Notes for case study:** Thematic kin to Untitled.Nikhil — both use a familiar system's structure
  to expose something. Together they form a "design as critique" cluster. Frame deliberately as
  interaction design, not "a data-viz project."
- **All sections:** PENDING. Not yet audited.

---

# Secondary work

## Fledge (into Yondor)
- **slug:** `fledge` (secondary, NOT a full case study)
- **One-line:** A bird-themed educational comic about breaking routine and facing challenges.
- **Placement:** Secondary / additional work. Short framing only — a few lines + a couple of
  representative images. Reframe around narrative + world-building (the unique thing it adds:
  inventing a world and characters from scratch), not drawing craft.
- **Content:** PENDING — short blurb to be written.

---

# Labs
- A grid of tiles, visual-first, undated, browsable. Recent unpolished experiments — sketches,
  motion, photos, game prototypes. Ongoing feed; implies a commitment to keep it fed.
- **Content:** Populated separately by me over time. Not part of the case-study build.

---

# Parked (not on the site yet — decide after primaries are drafted)
- **Learning Comms** — inclusive navigation for a college library/lounge/talk-house. Jury feedback
  was "it's not even a problem." Possible salvage as an honest case study about a problem the jury
  didn't see — decide later. Do NOT build a page for this yet.

---

# Build status summary (what is safe to publish today)
- **Ministry of Misconduct:** Hero, Context, Synthesis, Iteration are LOCKED and publishable.
  Research, Ideation, Current State, What's next are PENDING — placeholder-comment them.
- **Ghar Jo Hum Piche Chhod Aaye:** Hero, Context are LOCKED and publishable. Synthesis is
  candidate-only (do not finalize). Everything else PENDING.
- **Untitled.Nikhil / Hum Panchi / Zepto:** No locked copy yet — create the file shells with the
  one-liner + framing notes as HTML comments, but mark all sections PENDING.
- **Fledge:** secondary blurb PENDING.
