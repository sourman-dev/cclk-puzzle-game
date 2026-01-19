# Phase 1: Foundation Setup

```yaml
status: done
priority: high
estimated_files: 8
completed: 2026-01-20
```

## Overview

Setup project foundation: TypeScript types, Pinia stores, composables, theme system.

## Context Links

- [Brainstorm Report](../reports/brainstorm-260120-0056-cclk-puzzle-game.md)
- [Plan Overview](./plan.md)

## Requirements

### Functional
- TypeScript type definitions cho game entities
- Pinia stores cho game state, user progress, settings
- LocalStorage persistence composable
- Theme system (dark/light/system)
- Base CSS variables

### Non-Functional
- Strict TypeScript mode
- Mobile-first CSS approach

## Files to Create

| File | Purpose |
|------|---------|
| `src/types/index.ts` | All TypeScript interfaces/types |
| `src/stores/game.ts` | Game state (current question, timer, score) |
| `src/stores/user.ts` | User progress, settings, UUID |
| `src/composables/use-local-storage.ts` | LocalStorage wrapper with reactivity |
| `src/composables/use-theme.ts` | Theme detection and toggle |
| `src/style.css` | Base styles, CSS variables, Tailwind config |

## Files to Modify

| File | Changes |
|------|---------|
| `src/main.ts` | Add Pinia, initialize stores |
| `index.html` | Update title, meta tags |

## Implementation Steps

### Step 1: TypeScript Types

Create `src/types/index.ts`:

```typescript
// Rule types
export type RuleType = 'tuong_sinh' | 'phan_sinh' | 'tuong_khac'

// Topic types (knowledge categories)
export type TopicType =
  | 'ngu_hanh'      // Thổ, Kim, Thủy, Thử, Mộc, Hỏa
  | 'luc_tang'      // 6 Tạng
  | 'luc_phu'       // 6 Phủ
  | 'kinh_am'       // Kinh Âm
  | 'kinh_duong'    // Kinh Dương
  | 'luc_khi'       // 6 Khí tự nhiên

// Card state in game
export interface Card {
  position: number      // 1-6
  value: string         // e.g., "Mộc", "Tâm"
  isRevealed: boolean   // visible to player
  isTarget: boolean     // card to guess
}

// Question generated for gameplay
export interface Question {
  cards: Card[]
  targetPosition: number
  correctAnswer: string
  rule: RuleType
  ruleLabel: string     // Vietnamese display text
  answers: string[]     // 6 shuffled options
  topic: TopicType
}

// Level definition
export interface Level {
  id: string
  order: number
  title: string
  description: string
  topics: TopicType[]
  rules: RuleType[]
  unlocked: boolean
  reviewFromLevels?: string[]  // previous levels for spaced repetition
}

// User progress per level
export interface LevelProgress {
  levelId: string
  completed: boolean
  bestStars: number         // 0-3
  totalRoundsPlayed: number
  correctAnswers: number
}

// Game settings
export interface GameSettings {
  revealedCards: 1 | 2 | 3
  enabledRules: RuleType[]
  initialTime: number       // seconds
  bonusTime: number         // seconds added on correct
  roundsPerLevel: number
  theme: 'dark' | 'light' | 'system'
}

// User data
export interface UserData {
  id: string                          // UUID
  settings: GameSettings
  progress: Record<string, LevelProgress>
  createdAt: number
  lastPlayedAt: number
}

// Current game state
export interface GameState {
  status: 'idle' | 'playing' | 'paused' | 'round_end' | 'level_complete'
  currentLevelId: string | null
  currentQuestion: Question | null
  timeRemaining: number
  roundNumber: number
  totalRounds: number
  hintsUsed: number
  currentRoundStars: number
  totalStars: number
  correctAnswers: number
}
```

### Step 2: LocalStorage Composable

Create `src/composables/use-local-storage.ts`:

```typescript
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  function reset() {
    data.value = defaultValue
    localStorage.removeItem(key)
  }

  return { data, reset }
}
```

### Step 3: User Store

Create `src/stores/user.ts`:

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserData, GameSettings, LevelProgress } from '@/types'

const STORAGE_KEY = 'cclk_user'

const DEFAULT_SETTINGS: GameSettings = {
  revealedCards: 2,
  enabledRules: ['tuong_sinh'],
  initialTime: 90,
  bonusTime: 30,
  roundsPerLevel: 10,
  theme: 'system'
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const useUserStore = defineStore('user', () => {
  // Load from localStorage or create new
  const stored = localStorage.getItem(STORAGE_KEY)
  const initialData: UserData = stored
    ? JSON.parse(stored)
    : {
        id: generateUUID(),
        settings: DEFAULT_SETTINGS,
        progress: {},
        createdAt: Date.now(),
        lastPlayedAt: Date.now()
      }

  const userData = ref<UserData>(initialData)

  // Computed
  const settings = computed(() => userData.value.settings)
  const progress = computed(() => userData.value.progress)

  // Actions
  function saveToStorage() {
    userData.value.lastPlayedAt = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData.value))
  }

  function updateSettings(newSettings: Partial<GameSettings>) {
    userData.value.settings = { ...userData.value.settings, ...newSettings }
    saveToStorage()
  }

  function updateLevelProgress(levelId: string, update: Partial<LevelProgress>) {
    const current = userData.value.progress[levelId] || {
      levelId,
      completed: false,
      bestStars: 0,
      totalRoundsPlayed: 0,
      correctAnswers: 0
    }
    userData.value.progress[levelId] = { ...current, ...update }
    saveToStorage()
  }

  function isLevelUnlocked(levelId: string, levelOrder: number): boolean {
    if (levelOrder === 1) return true
    // Check if previous level completed
    const prevLevelProgress = Object.values(userData.value.progress)
      .find(p => p.levelId === `level_${levelOrder - 1}`)
    return prevLevelProgress?.completed ?? false
  }

  return {
    userData,
    settings,
    progress,
    updateSettings,
    updateLevelProgress,
    isLevelUnlocked,
    saveToStorage
  }
})
```

### Step 4: Game Store

Create `src/stores/game.ts`:

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameState, Question } from '@/types'

export const useGameStore = defineStore('game', () => {
  const state = ref<GameState>({
    status: 'idle',
    currentLevelId: null,
    currentQuestion: null,
    timeRemaining: 90,
    roundNumber: 0,
    totalRounds: 10,
    hintsUsed: 0,
    currentRoundStars: 3,
    totalStars: 0,
    correctAnswers: 0
  })

  // Computed
  const isPlaying = computed(() => state.value.status === 'playing')
  const canUseHint = computed(() => state.value.hintsUsed < 2)

  // Actions
  function startLevel(levelId: string, totalRounds: number, initialTime: number) {
    state.value = {
      status: 'playing',
      currentLevelId: levelId,
      currentQuestion: null,
      timeRemaining: initialTime,
      roundNumber: 1,
      totalRounds,
      hintsUsed: 0,
      currentRoundStars: 3,
      totalStars: 0,
      correctAnswers: 0
    }
  }

  function setQuestion(question: Question) {
    state.value.currentQuestion = question
    state.value.hintsUsed = 0
    state.value.currentRoundStars = 3
  }

  function useHint(): number | null {
    if (state.value.hintsUsed >= 2) return null
    state.value.hintsUsed++

    // First hint: -1 star
    if (state.value.hintsUsed === 1) {
      state.value.currentRoundStars = Math.max(0, state.value.currentRoundStars - 1)
    }
    // Second hint: -15 seconds
    if (state.value.hintsUsed === 2) {
      state.value.timeRemaining = Math.max(0, state.value.timeRemaining - 15)
    }

    return state.value.hintsUsed
  }

  function correctAnswer(bonusTime: number) {
    state.value.timeRemaining += bonusTime
    state.value.totalStars += state.value.currentRoundStars
    state.value.correctAnswers++
  }

  function wrongAnswer() {
    // No time penalty for wrong answer, just move to next
  }

  function nextRound() {
    if (state.value.roundNumber >= state.value.totalRounds) {
      state.value.status = 'level_complete'
    } else {
      state.value.roundNumber++
      state.value.hintsUsed = 0
      state.value.currentRoundStars = 3
    }
  }

  function tick() {
    if (state.value.status === 'playing' && state.value.timeRemaining > 0) {
      state.value.timeRemaining--

      // Update stars based on time elapsed in round
      // This is simplified - actual implementation may track round start time
    }

    if (state.value.timeRemaining <= 0) {
      state.value.status = 'level_complete'
    }
  }

  function pause() {
    if (state.value.status === 'playing') {
      state.value.status = 'paused'
    }
  }

  function resume() {
    if (state.value.status === 'paused') {
      state.value.status = 'playing'
    }
  }

  function reset() {
    state.value = {
      status: 'idle',
      currentLevelId: null,
      currentQuestion: null,
      timeRemaining: 90,
      roundNumber: 0,
      totalRounds: 10,
      hintsUsed: 0,
      currentRoundStars: 3,
      totalStars: 0,
      correctAnswers: 0
    }
  }

  return {
    state,
    isPlaying,
    canUseHint,
    startLevel,
    setQuestion,
    useHint,
    correctAnswer,
    wrongAnswer,
    nextRound,
    tick,
    pause,
    resume,
    reset
  }
})
```

### Step 5: Theme Composable

Create `src/composables/use-theme.ts`:

```typescript
import { ref, watch, onMounted } from 'vue'

type Theme = 'dark' | 'light' | 'system'

export function useTheme() {
  const theme = ref<Theme>('system')
  const isDark = ref(false)

  function applyTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = theme.value === 'dark' || (theme.value === 'system' && prefersDark)

    isDark.value = shouldBeDark
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    applyTheme()
  }

  onMounted(() => {
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', applyTheme)
    applyTheme()
  })

  watch(theme, applyTheme)

  return { theme, isDark, setTheme }
}
```

### Step 6: Update main.ts

Modify `src/main.ts`:

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

### Step 7: Update style.css

Replace `src/style.css`:

```css
@import "tailwindcss";

/* CSS Variables for theming */
:root {
  --color-bg: #ffffff;
  --color-bg-secondary: #f3f4f6;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  /* Card colors by element */
  --color-tho: #a3a042;    /* Thổ - Earth/Yellow-brown */
  --color-kim: #c0c0c0;    /* Kim - Metal/Silver */
  --color-thuy: #3b82f6;   /* Thủy - Water/Blue */
  --color-thu: #22c55e;    /* Thử - Wood variant/Green */
  --color-moc: #16a34a;    /* Mộc - Wood/Green */
  --color-hoa: #ef4444;    /* Hỏa - Fire/Red */
}

.dark {
  --color-bg: #111827;
  --color-bg-secondary: #1f2937;
  --color-text: #f9fafb;
  --color-text-secondary: #9ca3af;
  --color-border: #374151;
}

/* Base styles */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, -apple-system, sans-serif;
  min-height: 100dvh;
  margin: 0;
}

/* Utility classes */
.bg-primary { background-color: var(--color-bg); }
.bg-secondary { background-color: var(--color-bg-secondary); }
.text-primary { color: var(--color-text); }
.text-secondary { color: var(--color-text-secondary); }
.border-color { border-color: var(--color-border); }
```

### Step 8: Update index.html

Modify `index.html`:

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#3b82f6" />
    <meta name="description" content="Puzzle game học Châm Cứu Lục Khí - Học quy luật tương sinh, phản sinh, tương khắc" />
    <title>Châm Cứu Lục Khí - Puzzle Game</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## Todo List

- [ ] Create `src/types/index.ts`
- [ ] Create `src/composables/use-local-storage.ts`
- [ ] Create `src/stores/user.ts`
- [ ] Create `src/stores/game.ts`
- [ ] Create `src/composables/use-theme.ts`
- [ ] Update `src/main.ts` with Pinia
- [ ] Update `src/style.css` with theme variables
- [ ] Update `index.html` with meta tags
- [ ] Run `pnpm dev` to verify no errors

## Success Criteria

- [ ] TypeScript compiles without errors
- [ ] Pinia stores load correctly
- [ ] Theme toggle works (dark/light)
- [ ] LocalStorage persists data
- [ ] Browser console has no errors
