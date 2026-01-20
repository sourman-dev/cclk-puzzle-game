---
title: "Học tập Lục Khí - Learning View with Hexagram"
description: "Add interactive hexagram diagram view for learning Six Elements relationships"
status: completed
priority: P2
effort: 2h
branch: main
tags: [vue-router, svg, learning, ui]
created: 2026-01-20
---

# Học tập Lục Khí - Learning View Implementation

## Overview

Add new "Học tập Lục Khí" learning view with interactive SVG hexagram (6-pointed star) diagram showing Lục Hành relationships: Tương Sinh (clockwise), Phản Sinh (counter-clockwise), and Tương Khắc (opposing pairs).

## Architecture Decision

**No vue-router needed.** Current App.vue uses simple component switching pattern (`currentScreen` ref). Adding a third screen `'learning'` is simpler and avoids router complexity for a 3-view app.

## Implementation Phases

| Phase | Description | Status | Effort |
|-------|-------------|--------|--------|
| [Phase 1](./phase-01-learning-view-setup.md) | Create LearningView + navigation | completed | 30m |
| [Phase 2](./phase-02-hexagram-svg-component.md) | Build SVG hexagram diagram | completed | 1h |
| [Phase 3](./phase-03-dropdown-topic-selector.md) | Add dropdown with topic switching | completed | 30m |

## Key Data Structures

Existing data in `src/data/knowledge/`:
- `luc-hanh.ts`: LUC_HANH[] with colors, khi, kinh per element
- `luc-tang.ts`: LUC_TANG[] with Tạng names by Bộ
- `luc-phu.ts`: LUC_PHU[] with Phủ names by Bộ
- `sequences.ts`: TUONG_KHAC_PAIRS for opposing elements

## Hexagram Layout (from reference image)

```
         KIM (top)
    MỘC       THỦY
        [center]
    THỬ       HỎA
         THỔ (bottom)
```

- 6 triangles forming Star of David pattern
- Clockwise outer arrows (blue) = Tương Sinh
- Counter-clockwise outer arrows (red) = Phản Sinh
- Through-center arrows = Tương Khắc (3 pairs)

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/views/LearningView.vue` | Create |
| `src/components/learning/HexagramDiagram.vue` | Create |
| `src/App.vue` | Add 'learning' screen |
| `src/views/HomeView.vue` | Add "Học tập" button |

## Success Criteria

- [ ] "Học tập" button in HomeView navigates to learning screen
- [ ] Hexagram renders with correct element colors
- [ ] Arrows show Tương Sinh/Phản Sinh/Tương Khắc relationships
- [ ] Dropdown switches display: Lục Hành, Lục Khí, Lục Kinh, Lục Tạng, Lục Phủ
- [ ] Back button returns to home
