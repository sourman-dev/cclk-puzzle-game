---
title: "Luc Huyet Tang/Phu Levels"
description: "Add acupoint practice levels with dynamic 5/6 card layouts"
status: pending
priority: P2
effort: 3h
branch: main
tags: [game-levels, acupoints, ui]
created: 2026-01-25
---

# Luc Huyet Tang/Phu Levels Implementation

## Overview

Add two new levels for practicing Ngu Du Huyet (acupoints) with organ-specific sequences:
- **Level 7: Luc Huyet Tang** - 5 cards per Yin organ (Tinh, Vinh, Du, Kinh, Hop)
- **Level 8: Luc Huyet Phu** - 6 cards per Yang organ (Tinh, Vinh, Du, Nguyen, Kinh, Hop)

## Key Changes

1. Remove existing level_7 (Kinh Lac)
2. Add new data structure for 66 acupoints (30 Tang + 36 Phu)
3. Create specialized question generator for Huyet levels (no rule dialog)
4. Modify CardGrid/GameCard to support 5-6 card layouts with point type labels

## Phase Overview

| Phase | Description | Status | Effort |
|-------|-------------|--------|--------|
| [Phase 1](./phase-01-data-structure.md) | Ngu Du Huyet data structure | pending | 45m |
| [Phase 2](./phase-02-game-logic.md) | Huyet question generation | pending | 45m |
| [Phase 3](./phase-03-ui-components.md) | CardGrid/GameCard modifications | pending | 60m |
| [Phase 4](./phase-04-level-integration.md) | Wire up levels, remove level_7 | pending | 30m |

## Dependencies

- Research report: `./research/researcher-ngu-du-huyet-from-pdf.md`
- Scout report: `./scout/scout-game-structure.md`
- Existing types: `src/types/index.ts`
- Game logic: `src/composables/use-game-logic.ts`

## Success Criteria

- [ ] Level 7 (Luc Huyet Tang) displays 5 cards with point type labels
- [ ] Level 8 (Luc Huyet Phu) displays 6 cards with point type labels
- [ ] Title shows "Kinh [Organ] (Bo [Element])" format
- [ ] No rule selection dialog for Huyet levels
- [ ] Only Tuong Sinh rule applied
- [ ] Answer options show acupoint names with elements
- [ ] All 66 acupoints correctly mapped

## Risk Assessment

- **Low**: UI changes are isolated to CardGrid/GameCard
- **Medium**: Question generation requires new logic path
- **Mitigation**: Keep existing question flow intact, add parallel path for Huyet levels
