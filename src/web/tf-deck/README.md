# tf-deck: Timefold slide decks on Three.js

Slides are plain HTML `<section>`s (close to reveal.js, so porting is mostly mechanical).
Three.js places them in 3D space (CSS3DRenderer, so text stays crisp and selectable) and the camera
flies between them, over a WebGL backdrop of Timefold "pixels" and an extruded 3D logomark.

`dist/tf-deck.js` is a single classic script (Three.js + highlight.js bundled), so decks also work from `file://` and offline.

## Skeleton

```html
<link rel="stylesheet" href="../src/web/tf-deck/tf-deck.css">
...
<div class="tf-deck" data-footer="Repo: github.com/TimefoldAI/timefold-quickstarts">
    <section class="title">
        <div class="kicker">Guest lecture</div>
        <h1>Introduction to Timefold</h1>
        <p class="byline">by <strong>Jane Doe</strong></p>
    </section>

    <section data-chapter="School timetabling">   <!-- a chapter: a column of slides -->
        <section class="divider"><h1>School timetabling</h1></section>
        <section><h2>Few are <span class="highlight">optimized</span></h2></section>
        <section class="layers">                   <!-- layered diagram on a sheet of paper -->
            <img src="..._0.svg">
            <img src="..._1.svg" class="fragment">
        </section>
    </section>
</div>
<script src="../src/web/tf-deck/dist/tf-deck.js"></script>
```

| reveal.js                               | tf-deck                                             |
|-----------------------------------------|-----------------------------------------------------|
| `data-background-color="#3e00ff"`       | `class="divider"` (the old attribute still works)   |
| `<img class="fullImage">` stacks        | `<section class="layers">` with plain `<img>`s      |
| `class="fragment"`                      | unchanged                                           |
| `<code class="language-java" style=…>`  | no font size needed: code is shrunk to fit          |
| `<aside class="notes">`                 | kept, hidden (no speaker view yet)                  |

Other building blocks: `ul.tiles`, `ul.plain`, `.cards > .card > .label`, `img.paper`, `img.icon`,
`span.tag` / `span.tag.hard`, `.small`, `.highlight`, `data-logo` (adds a 3D logomark to any slide).
A slide that holds only a heading becomes a big "statement" slide automatically.

## 3D scenes

A slide can hand over to a 3D scene, which takes over the camera and is stepped through like fragments:

```html
<section data-scene="airport">
    <!-- shown in the overview and in print only -->
    <h2>A trip through Zaventem airport</h2>
</section>
```

`airport` (`src/scenes/airport.js`) retells the hand-drawn `content/static/airport-story/zaventem*.svg` story:
a traveller walks from the train to the gate, and each step labels a scheduling problem
(train, flight, desk, shift, maintenance, aircraft, gate). The last step pulls back over the whole terminal.
New scenes go in `src/scenes/` and are registered in `src/scenes/index.js` with their number of steps.

## Keys

→ ↓ Space PageDown: next · ← ↑ PageUp: previous · Home/End · **O**/Esc: 3D overview (click a slide) ·
**F**: fullscreen · **B**/`.`: blackout. URLs look like `#/12/3` (slide 12, fragment 3).

## PDF

Open the deck with `?print-pdf` and print to PDF (one 1920×1080 page per slide, all fragments shown).

## Building

```sh
cd src/web/tf-deck
npm install
npm run build   # or: npm run watch
npm run fonts   # only when changing the vendored fonts
```

Fonts: the brand font (PP Neue Montreal) is used if installed, otherwise the bundled Inter Tight.
