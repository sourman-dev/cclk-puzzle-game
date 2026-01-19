# Brainstorm Report: CCLK Puzzle Game

**Date**: 2026-01-20
**Project**: Châm Cứu Lục Khí Learning Game
**Stack**: Vue 3 + TypeScript + Tailwind CSS v4 + Pinia

---

## Problem Statement

Học viên cần công cụ học tập tương tác để ghi nhớ kiến thức "Châm Cứu Lục Khí" - một hệ thống phức tạp dựa trên quy luật 6 yếu tố (Thổ, Kim, Thủy, Thử, Mộc, Hỏa) với các mối quan hệ tương sinh/phản sinh/tương khắc.

Phương pháp flashcard truyền thống kém hiệu quả → cần game hóa với cơ chế đoán bài để kích thích học tập.

---

## Core Gameplay Mechanics

### Card Guessing System
- 6 lá bài úp, vị trí 1-6
- Mở 1-3 lá (tùy độ khó), đánh dấu "?" vào lá cần đoán
- 6 nút đáp án random thứ tự
- Ghi chú rõ quy luật đang áp dụng trong mỗi câu

### Scoring
| Thời gian trả lời | Stars |
|-------------------|-------|
| < 30s | ★★★ |
| 30-60s | ★★ |
| > 60s | ★ |

### Timer System
- Default: 90s countdown
- Correct answer: +30s bonus
- Configurable trong settings

### Hint System
- Tối đa 2 hints/lượt
- Hint 1: Lật 1 lá random → **-1★**
- Hint 2: Lật 1 lá random → **-15s**

---

## Level Structure (từ PDF Analysis)

| Level | Topic | Concepts |
|-------|-------|----------|
| 1 | Nền Tảng Lục Khí | Ngũ Hành cơ bản, 6 Tạng, 6 Phủ |
| 2 | Quy Luật Vận Hành | Tương sinh, Phản sinh, Tương khắc |
| 3 | Kinh Lạc | 6 cặp đường kinh (Thiếu Âm, Quyết Âm...) |
| 4 | Bộ Huyệt | Hành vs Bộ, Ngũ Du Huyệt |
| 5 | Kết Nối Huyệt | Nguyên tắc a/B ↔ b/A |
| 6 | Ứng Dụng | Thủ/Túc/Âm/Dương châm |

**Spaced Repetition**: Level mới mix 20-30% câu hỏi từ level cũ.

---

## Settings Configuration

```typescript
interface GameSettings {
  // Difficulty
  revealedCards: 1 | 2 | 3 // Default: 2

  // Rules
  enabledRules: ('tuong_sinh' | 'phan_sinh' | 'tuong_khac')[]

  // Timer
  initialTime: number // Default: 90
  bonusTime: number // Default: 30

  // Rounds
  roundsPerLevel: number // Default: 10

  // Theme
  theme: 'dark' | 'light' | 'system'
}
```

---

## Architecture

### Directory Structure
```
src/
├── components/
│   ├── game/
│   │   ├── CardGrid.vue          # 6 cards layout
│   │   ├── GameCard.vue          # Single card (flip animation)
│   │   ├── AnswerButtons.vue     # 6 answer options
│   │   ├── Timer.vue             # Countdown display
│   │   ├── StarRating.vue        # Score display
│   │   └── RuleIndicator.vue     # Show current rule
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   └── LevelSelector.vue
│   └── ui/
│       ├── Modal.vue
│       └── Button.vue
├── stores/
│   ├── game.ts                   # Current game state
│   ├── user.ts                   # Progress, settings
│   └── levels.ts                 # Level definitions
├── data/
│   ├── knowledge/
│   │   ├── ngu-hanh.ts           # Thổ, Kim, Thủy...
│   │   ├── luc-tang.ts           # Tâm, Can, Tỳ...
│   │   ├── luc-phu.ts            # Đởm, Vị...
│   │   └── kinh-lac.ts           # Thiếu Âm, Quyết Âm...
│   └── levels/
│       └── index.ts              # All level definitions
├── composables/
│   ├── useGameLogic.ts           # Question generation
│   ├── useTimer.ts               # Timer with pause/resume
│   └── useLocalStorage.ts        # Persistence
├── types/
│   └── index.ts
└── views/
    ├── HomeView.vue              # Level selection
    ├── GameView.vue              # Main gameplay
    └── SettingsView.vue          # Configuration
```

### Data Flow
```
User Action → Pinia Store → Composable Logic → Component Update
                 ↓
          LocalStorage (persist)
```

---

## Data Storage Strategy

### LocalStorage Keys
| Key | Purpose | Type |
|-----|---------|------|
| `cclk_user_id` | UUID for user identification | string |
| `cclk_settings` | Game configuration | GameSettings |
| `cclk_progress` | Level completion, stars earned | UserProgress |

### Knowledge Base
**Decision**: Hardcode trong TypeScript files thay vì IndexedDB
- PDF knowledge cố định, không thay đổi
- Giảm complexity
- Faster load time
- Dễ maintain

---

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Routing | Vue Router (optional) | Single page có thể không cần, component-based navigation đủ |
| State | Pinia | Already installed, lightweight |
| Storage | LocalStorage | Sufficient cho settings/progress |
| Knowledge | Hardcoded TS | No external DB needed |
| Styling | Tailwind v4 | Already installed, mobile-first utilities |
| Animation | CSS transitions | Card flip, button feedback |
| PWA | Optional future | GitHub Pages compatible |

---

## Question Generation Algorithm

```typescript
function generateQuestion(level: Level, settings: GameSettings): Question {
  // 1. Get sequence for topic (e.g., Ngũ Hành)
  const sequence = getSequence(level.topic)

  // 2. Random pick target position (1-6)
  const targetPos = randomInt(1, 6)

  // 3. Random pick revealed positions
  const revealedPositions = pickRandom(
    [1,2,3,4,5,6].filter(p => p !== targetPos),
    settings.revealedCards
  )

  // 4. Determine correct answer based on rule
  const correctAnswer = applyRule(sequence, targetPos, level.rule)

  // 5. Generate shuffled answers
  const answers = shuffle([...sequence])

  return { cards, targetPos, correctAnswer, answers, rule: level.rule }
}
```

---

## UI/UX Requirements

### Mobile-First Priorities
- Touch-friendly buttons (min 44px tap target)
- Cards visible without scroll on iPhone
- Bottom-aligned answer buttons for thumb reach
- Large timer display

### Responsive Breakpoints
```css
/* Mobile (default) */
.card-grid { grid-template-columns: repeat(3, 1fr); }

/* Tablet+ */
@media (min-width: 640px) {
  .card-grid { grid-template-columns: repeat(6, 1fr); }
}
```

### Theme System
- CSS variables for colors
- `prefers-color-scheme` detection
- User override saved to LocalStorage

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Knowledge extraction errors | Medium | High | Manual verification of sequences |
| Mobile performance | Low | Medium | CSS animations, avoid JS-heavy logic |
| LocalStorage limits | Low | Low | Progress data small, compress if needed |
| Complex rules confusion | Medium | Medium | Clear visual indicators, tooltips |

---

## Success Metrics

- [ ] All 6 base levels playable
- [ ] Spaced repetition working (mix questions)
- [ ] Settings persisted across sessions
- [ ] Responsive on iPhone Safari
- [ ] Dark/Light mode toggle
- [ ] Deployable to GitHub Pages

---

## Next Steps

1. **Implementation Plan**: Detailed phase-by-phase development
2. **Knowledge Extraction**: Verify sequences from PDF
3. **Component Development**: Card, Timer, Buttons
4. **Game Logic**: Question generation, scoring
5. **Polish**: Animations, responsive testing

---

## Unresolved Questions

1. Có cần sound effects khi đoán đúng/sai?
2. Có cần leaderboard/high score?
3. Có muốn chia sẻ kết quả lên social media?
