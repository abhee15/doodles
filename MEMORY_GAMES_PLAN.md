# Memory Games Suite — Master Plan

## Vision
A collection of games that **teach proven memory techniques** first, then let kids
**apply those techniques to any subject** — countries, presidents, periodic table,
scientists, inventions, space, history, etc.
The technique is the skill; the subject is the content library.

---

## Core Architecture

### Two-layer design
```
TECHNIQUE LAYER          CONTENT LIBRARY
─────────────────        ─────────────────────────────────────
Sequence Memory    ←──── Words / Pictures / Any list
Body Peg           ←──── Presidents, Elements, Scientists...
Story Chain        ←──── Countries in a continent, Timeline...
Memory Palace      ←──── Periodic table, Inventions...
Rhyme Peg          ←──── Ordered lists (10 items)
Keyword Image      ←──── Vocabulary, Foreign words...
Spaced Recall      ←──── Anything previously learned
```

### Content packs (pluggable JSON files)
- US Presidents (50 entries)
- Countries by continent (7 continents)
- Periodic Table (first 20 elements to start)
- Famous Scientists + their inventions
- Solar System planets (already built)
- Dinosaurs (already built)
- Custom (kid types own list)

---

## Games to Build

---

### GAME 1 — Sequence Flash  *(user's first idea)*
**Technique taught:** Visual/verbal memory + retrieval practice
**File:** `sequence-flash.html`

**How it plays:**
- Show words OR pictures one at a time on screen
- Each card visible for N seconds (default 3s, configurable 1–10s)
- After 10 items, present all items shuffled
- Kid drags them back into the original order
- Score = correct positions / 10
- Variation B: pictures instead of words (harder, stronger visual memory)
- Variation C: mix — some words, some pictures

**Configurable:**
- Timer per card: 1–10 seconds
- Number of items: 5 / 8 / 10 / 15
- Content pack: animals, colours, countries, custom words
- Mode: words only / pictures only / mixed

**Technique tip shown to kid:**
> "Try making a silly story connecting each word to the next — your brain loves stories!"

---

### GAME 2 — Body Map  *(user's second idea)*
**Technique taught:** Body Peg System (toes → head = items 1–10)
**File:** `body-map.html`

**How it plays:**
- A cartoon body is shown on screen
- 10 fixed stations: Toes, Feet, Shins, Knees, Thighs, Belly, Chest, Shoulders, Nose, Top of Head
- Items float down one at a time; kid places them on a body part
- Kid can type or record a silly association ("imagine a banana sliding down your shin")
- After all placed: blank body shown → kid taps each part to recall the item
- Bonus: randomly jump to any body part — kid must recall without going in order

**Content packs:**
- US Presidents (last 10, 20, or all 50 — body repeated in cycles)
- Any ordered list from content library

**Technique tip:**
> "The sillier and weirder the image, the better your brain will remember it!"

---

### GAME 3 — Story Chain  *(Link Method)*
**Technique taught:** Mnemonic link / story chaining
**File:** `story-chain.html`

**How it plays:**
- 8–10 items from a content pack are shown one at a time
- Kid must verbally or typed-connect each item to the next with a ridiculous sentence
- Example: "The ELEPHANT sat on MERCURY and it got so hot the elephant turned into HELIUM!"
- All connections shown as a comic strip (auto-generated panels or simple stick figures)
- Then the comic strip plays back with blanks — kid fills in missing items
- Broken Chain mode: one panel is missing, kid identifies which item is gone

**Best for:** Countries in a continent, elements in order, historical events

**Technique tip:**
> "The crazier the story, the stronger the memory — your brain remembers weird things!"

---

### GAME 4 — Memory Palace  *(Method of Loci)*
**Technique taught:** Method of Loci / Memory Palace
**File:** `memory-palace.html`

**How it plays:**
- Kid picks a "palace" — their Bedroom, Kitchen, Garden, School Corridor
- Each room has 5 hotspots shown as glowing dots on an illustrated background
- An item from the content pack is "placed" at each hotspot with a funny animation
- Kid invents the association (type it in)
- After the full palace is loaded: the palace is shown empty
- Kid clicks each hotspot in any order and recalls what's stored there
- Level up: multiple rooms = more items = bigger palace

**Content packs best suited:**
- Periodic table (room = period, spots = elements)
- Scientists and discoveries (museum palace)
- Countries of a continent (map as the palace)

**Technique tip:**
> "Imagine walking through the room in your head — your brain is amazing at remembering places!"

---

### GAME 5 — Rhyme Pegs  *(Number Rhyme Peg System)*
**Technique taught:** Rhyming peg system
**File:** `rhyme-pegs.html`

**The 10 pegs (fixed, memorized once):**
1 = Bun, 2 = Shoe, 3 = Tree, 4 = Door, 5 = Hive
6 = Sticks, 7 = Heaven, 8 = Gate, 9 = Vine, 10 = Hen

**How it plays:**
- Phase 1 (learn the pegs): rhyme cards shown, kid repeats until fluent — quick mini-game
- Phase 2 (encode): 10 items from content pack appear one at a time with their number
  Kid creates an image linking the item to the peg ("Einstein sitting on a BUN")
- Phase 3 (recall): a number shown → kid recalls what's stored there
- Bonus: random number jumps — no scanning, instant lookup

**Best for:** Any 10-item ordered list (10 commandments, 10 planets if we add Pluto, top 10 inventions)

---

### GAME 6 — Spaced Recall  *(Spaced Repetition)*
**Technique taught:** Spaced repetition / retrieval practice
**File:** `spaced-recall.html`

**How it plays:**
- A daily 10-minute session
- Cards come from all previously played games — things the kid has "learned"
- Cards sorted into 3 boxes: Shaky / Getting There / Nailed It
- Correctly recalled → moves to next box (reviewed less often)
- Wrong → goes back to box 1 (reviewed tomorrow)
- Visual: a garden where each fact is a plant — seedling → sprout → flower → tree
- A "streak" calendar shows daily play

**This is the retention glue** that ties all other games together.

---

### GAME 7 — Subject Explorer  *(Apply any technique to any topic)*
**Technique taught:** Kid chooses the technique — teaches meta-cognition
**File:** `subject-explorer.html`

**How it plays:**
- Kid picks a SUBJECT (e.g., "Countries of Africa")
- The game loads the content pack (54 countries)
- Kid chooses TECHNIQUE: Body Map / Story Chain / Memory Palace / Rhyme Pegs
- The chosen game launches with that content loaded
- At the end, score is saved to the Spaced Recall garden

**This is the master hub** — the point where a kid says
"I want to learn the periodic table — I'll use Story Chain"
and the game just works.

---

### GAME 8 — Keyword Doodle  *(Keyword / Visual Association Method)*
**Technique taught:** Keyword method (especially for vocabulary)
**File:** `keyword-doodle.html`

**How it plays:**
- A new word appears (e.g., Spanish "pato" = duck, or "photosynthesis")
- Kid hears/reads the word and picks or draws a "sounds-like" keyword image
- Then draws/selects a scene combining the keyword with the meaning
- Example: "pato → POT → duck sitting in a pot"
- The doodle is saved and shown during recall
- Best for: vocabulary, foreign language words, scientific terms

---

## Content Library Format (JSON)

All content packs follow a standard format so any game can load any pack:

```json
{
  "pack_id": "us_presidents_last20",
  "title": "US Presidents (Last 20)",
  "category": "History",
  "items": [
    { "id": 1, "order": 1, "label": "Richard Nixon", "image": "nixon.png", "fact": "37th President, 1969–1974" },
    { "id": 2, "order": 2, "label": "Gerald Ford", "image": "ford.png", "fact": "38th President, 1974–1977" }
  ]
}
```

---

## Planned Content Packs

| Pack | Items | Games it suits |
|------|-------|----------------|
| US Presidents (last 50) | 50 | Body Map, Story Chain, Memory Palace |
| Countries — Africa | 54 | Memory Palace, Story Chain, Sequence Flash |
| Countries — Europe | 44 | Memory Palace, Story Chain |
| Countries — Asia | 48 | Memory Palace, Story Chain |
| Countries — Americas | 35 | Story Chain, Rhyme Pegs (top 10) |
| Periodic Table (first 20) | 20 | Memory Palace, Body Map x2, Story Chain |
| Famous Scientists | 20 | Story Chain, Memory Palace |
| Great Inventions | 20 | Story Chain, Keyword Doodle |
| Solar System (existing) | 9 | Rhyme Pegs, Body Map |
| Dinosaurs (existing) | varies | Sequence Flash, Story Chain |
| Custom (kid types own list) | any | All games |

---

## Build Order (Recommended)

| # | Game | Status | Notes |
|---|------|--------|-------|
| 1 | Sequence Flash | pending | words/pictures + timer + drag to reorder |
| 2 | Body Map | ✅ DONE | `games/body-map/index.html` — all 47 presidents, 5 batches, learn + quiz |
| 3 | Story Chain | pending | High impact, works on any content |
| 4 | Subject Explorer | pending | The hub — plug content into technique |
| 5 | Rhyme Pegs | pending | Teach the 10 pegs first |
| 6 | Memory Palace | pending | Most complex — needs illustrated rooms |
| 7 | Spaced Recall | pending | The retention layer — add after 2–3 games exist |
| 8 | Keyword Doodle | pending | Vocabulary specialist |

---

## Design Principles (from research)

1. **Always show visual + verbal together** — never text alone
2. **Force retrieval, not re-reading** — every review is a quiz
3. **Kid creates the mnemonic** — self-generated images stick better than provided ones
4. **Absurd = memorable** — reward the most ridiculous associations
5. **Short daily sessions** — 10–15 min beats 2-hour weekly sessions
6. **Auto-schedule reviews** — kid should never have to manage spaced repetition
7. **Show progress spatially** — growing garden / filling palace / map being revealed
8. **Technique-first, content-second** — the technique is the skill; the subject is just data

---

## Files Already Built (in this project)
- `planet-quest.html` — Solar system game
- `dino-dash.html` — Dinosaur game
- `index.html` — Main hub

## Next Step
Start with **Game 1: Sequence Flash** — simplest to build, immediately playable,
demonstrates both word and picture modes, configurable timer.
