# Škola OnLine – Marks card for Home Assistant <!-- omit from toc -->

[![GitHub Release](https://img.shields.io/github/release/hondzik/skolaonline-znamky-ui.svg?style=for-the-badge)](https://github.com/hondzik/skolaonline-znamky-ui/releases)
[![License](https://img.shields.io/github/license/hondzik/skolaonline-znamky-ui.svg?style=for-the-badge)](LICENSE)
[![Project Maintenance](https://img.shields.io/badge/maintainer-hondzik-blue.svg?style=for-the-badge)](https://github.com/hondzik)
![Github](https://img.shields.io/github/followers/hondzik.svg?style=for-the-badge)
[![GitHub Activity](https://img.shields.io/github/last-commit/hondzik/skolaonline-znamky-ui?style=for-the-badge)](https://github.com/hondzik/skolaonline-znamky-ui/commits/main)

[Čeština](README.cs.md)

This is a custom Home Assistant Lovelace **card** that renders a child's marks (grades) from
the [`skolaonline_znamky`](https://github.com/hondzik/skolaonline-znamky) integration for the
Czech school information system **Škola OnLine** — a colored average, a row per subject with
its recent marks, and an on-demand full history.

## Table of contents <!-- omit from toc -->

- [How it works](#how-it-works)
- [Setup](#setup)
  - [1. Install](#1-install)
  - [2. Add the card](#2-add-the-card)
- [Configuration options](#configuration-options)
- [Using the visual editor](#using-the-visual-editor)
- [Troubleshooting](#troubleshooting)
- [Translations](#translations)
- [Contributors](#contributors)

## How it works

The card reads everything it shows from a single `sensor.<child>_marks` entity that the
`skolaonline_znamky` integration already provides — it never talks to the Škola OnLine API
directly:

- **Header** — child's name, school year and semester, and the overall average (state) in a
  colored badge. Czech grading is 1 = best, 5 = worst, so the color scale is reversed compared
  to a typical gauge (green at 1, red at 5).
- **Subject rows** — one per subject, with a colored bar on the left (its width configurable via
  `border_width`) using that subject's configured color, each with its own average and the most
  recent marks as small colored chips (a verbal evaluation like `"Sl"` is shown as a plain grey
  chip instead of being treated as a number). A `+N` badge appears when the subject has more
  marks than the entity's attributes carry. A subject the integration knows about (e.g. from the
  timetable) but that has no marks yet this semester shows "–" instead of an average and "No
  marks yet" instead of chips — `show_empty_subjects` (default on) hides these entirely instead,
  and any individual subject can be hidden from the visual editor regardless of whether it has
  marks.
- **New mark highlight** — a mark is flagged as new either because it just arrived via the
  integration's `skolaonline_znamky_new_mark` event, or because its date is within the last few
  days.
- **Full history** — clicking a subject row expands the complete, unabridged list of that
  subject's marks (date, theme and weight, plus the verbal evaluation field, none of which fit
  in the entity's attributes) right under the row; only one subject can be expanded at a time,
  so opening another one collapses whichever was open. This is backed by the integration's
  `skolaonline_znamky.get_marks` service, which returns every subject's marks regardless of
  which one you asked for — so the card fetches it once, caches the result for 30 minutes, and
  reuses it for every subject you expand until it goes stale. The cache is also dropped
  immediately by a `skolaonline_znamky_new_mark` event or by pressing refresh (see below) —
  either means the underlying marks may have changed, so the next expand re-fetches instead of
  showing what's now stale data.
- **Refresh** — the icon next to the average calls the built-in `homeassistant.update_entity`
  service on the entity, which for a coordinator-backed entity like this one triggers an
  immediate refresh (fetch semester + marks, aggregate, diff against the stored marks, fire
  `skolaonline_znamky_new_mark` if warranted) — the same thing a scheduled update does, just
  without waiting for it. `get_marks` itself never updates the entity's state, so this is the
  only way to force a fresh pull from Škola OnLine from the card.

The card only ever shows the entity's *current* semester — Škola OnLine marks are read-only, and
there's no way to switch a single entity to a past semester from the card itself.

## Setup

### 1. Install

Install through [HACS](https://hacs.xyz/) as a custom repository (category: Plugin) if it isn't
listed in the default store yet, or copy `dist/skolaonline-znamky-ui.js` into your `www/`
folder and add it as a Lovelace resource manually.

[![My Home Assistant](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?repository=skolaonline-znamky-ui&owner=hondzik&category=Plugin)

### 2. Add the card

Make sure the [`skolaonline_znamky`](https://github.com/hondzik/skolaonline-znamky) integration
is set up and has created a `sensor.<child>_marks` entity. Then, in the dashboard editor, use
"Add card" and pick that entity — **Škola OnLine – Marks** is suggested automatically for any
entity belonging to the integration.

Or add it directly via YAML:

```yaml
type: custom:skolaonline-znamky-ui-marks-all-card
entity: sensor.<child>_marks
```

## Configuration options

All options are settable either through YAML or the visual editor:

| Option | Type | Default | Description |
| ---------------- | ------ | ------------------ | ------------------------------------------------------------------------ |
| `entity` | string | — | The `sensor.<child>_marks` entity. Required. |
| `title` | string | child's name | Overrides the name shown in the header. |
| `title_font_size` | number | `20` | Font size (px) of the header title. |
| `subject_font_size` | number | `15` | Font size (px) of each subject's name. |
| `marks_font_size` | number | `14` | Font size (px) of the mark chips and the "+N more" badge. |
| `size_by_weight` | boolean | `false` | Scale a mark chip's size by its weight, relative to the average weight of the marks shown (verbal evaluations are sized as if at that average, since their own weight isn't meaningful). Works regardless of which weight scale the school uses (e.g. 0.1-1 or 1-100). |
| `border_width` | number | `8` | Width (px) of the colored bar on the left of each subject row. |
| `show_empty_subjects` | boolean | `true` | Whether to show subjects that have no marks yet this semester. |
| `subject_order` | list | attribute order | Subject ids in the order they should be displayed. |
| `subject_colors` | map | none | Subject id → hex color, used for that subject's left bar and name. |
| `subject_hidden` | list | none | Subject ids to always hide, regardless of `show_empty_subjects`. |

```yaml
type: custom:skolaonline-znamky-ui-marks-all-card
entity: sensor.<child>_marks
title: 'Tomáš'
title_font_size: 22
subject_font_size: 16
marks_font_size: 16
border_width: 10
size_by_weight: true
show_empty_subjects: false
subject_order:
  - D118760
  - D118763
subject_colors:
  D118763: '#3f51b5'
subject_hidden:
  - D118761
```

## Using the visual editor

Instead of editing YAML, open the card's visual editor (pencil icon) to pick the child's entity,
set a custom title, adjust the three font sizes and the left bar's width with a slider each, and
toggle whether subjects with no marks yet are shown at all. The **subject order and colors**
section lists every subject currently on the entity, including hidden and mark-less ones (shown
dimmed) — drag a row by its handle to reorder subjects on the card, click a subject's color dot
to open a color picker and set its accent color (a button next to it resets back to the default
color), and use the eye icon to hide or show that specific subject regardless of the global
toggle.

Subjects that disappear from the entity (e.g. a subject not taught this semester) simply drop
out of this list — nothing needs to be cleaned up manually.

## Troubleshooting

- **The card isn't offered in "Add card"** — it only suggests itself for entities whose registry
  entry reports `platform: skolaonline_znamky`; confirm the integration created the entity and
  that it's a `sensor.*_marks` entity, not something else on the same device.
- **Expanding a subject shows an error** — the `skolaonline_znamky.get_marks` service call
  failed, most commonly because the integration's config entry isn't loaded (check
  Settings → Devices & services) or the Škola OnLine API is temporarily unreachable. The refresh
  icon in the header doesn't retry this call — it only forces the entity itself to update;
  collapse and re-expand a subject (or wait for the 30-minute cache to go stale) to retry
  `get_marks`.
- **A subject's marks/colors look wrong after a semester change** — `subject_order`/
  `subject_colors` key on `subject_id`, not on the subject's name, so this should be stable
  across semesters; if a subject truly changed id (e.g. a genuinely new course), just reorder or
  recolor it again in the editor.

## Translations

The card and its editor are localized into Czech and English (falls back to English for any
other language). Don't see your language, or spot something wrong in an existing translation?
Feel free to open an issue or PR.

## Contributors

[![Contributors](https://contrib.rocks/image?repo=hondzik/skolaonline-znamky-ui)](https://github.com/hondzik/skolaonline-znamky-ui/graphs/contributors)
