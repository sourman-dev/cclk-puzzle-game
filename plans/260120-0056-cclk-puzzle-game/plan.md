# CCLK Puzzle Game - Implementation Plan

```yaml
status: complete
created: 2026-01-20
stack: Vue 3 + TypeScript + Tailwind CSS v4 + Pinia
deployment: GitHub Pages
```

## Overview

Puzzle game học Châm Cứu Lục Khí với cơ chế lật bài đoán theo quy luật tương sinh/phản sinh/tương khắc.

## Phases

| Phase | Name | Status | Files |
|-------|------|--------|-------|
| 1 | Foundation Setup | ✅ done | [phase-01-foundation-setup.md](./phase-01-foundation-setup.md) |
| 2 | Knowledge Base | ✅ done | [phase-02-knowledge-base.md](./phase-02-knowledge-base.md) |
| 3 | Core Components | ✅ done | [phase-03-core-components.md](./phase-03-core-components.md) |
| 4 | Game Logic | ✅ done | [phase-04-game-logic.md](./phase-04-game-logic.md) |
| 5 | UI Polish & Deploy | ✅ done | [phase-05-ui-polish-and-deploy.md](./phase-05-ui-polish-and-deploy.md) |

## Key Dependencies

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
   ↓         ↓         ↓         ↓         ↓
 Types   Knowledge  Components  Logic    Polish
 Stores  Data Files UI Parts   Scoring  Deploy
```

## Success Criteria

- [ ] All 6 levels playable
- [ ] Timer, scoring, hints working
- [ ] Settings persistent
- [ ] Mobile responsive (iPhone first)
- [ ] Dark/Light theme
- [ ] Deployed to GitHub Pages

## References

- [Brainstorm Report](../reports/brainstorm-260120-0056-cclk-puzzle-game.md)
