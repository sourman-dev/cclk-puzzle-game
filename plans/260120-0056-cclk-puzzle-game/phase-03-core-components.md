# Phase 3: Core Components

```yaml
status: done
priority: high
estimated_files: 12
depends_on: phase-02
completed: 2026-01-20
```

## Overview

Xây dựng các Vue components chính: Cards, Timer, Answer Buttons, Level Selector.

## Context Links

- [Phase 1: Foundation](./phase-01-foundation-setup.md)
- [Phase 2: Knowledge Base](./phase-02-knowledge-base.md)

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/game/GameCard.vue` | Single card với flip animation |
| `src/components/game/CardGrid.vue` | 6 cards layout |
| `src/components/game/AnswerButtons.vue` | 6 answer options |
| `src/components/game/GameTimer.vue` | Countdown display |
| `src/components/game/StarRating.vue` | Score display |
| `src/components/game/RuleIndicator.vue` | Show current rule |
| `src/components/game/HintButton.vue` | Hint button with counter |
| `src/components/layout/AppHeader.vue` | Header with settings |
| `src/components/layout/LevelSelector.vue` | Level grid |
| `src/components/ui/BaseButton.vue` | Reusable button |
| `src/components/ui/BaseModal.vue` | Modal wrapper |

## Files to Modify

| File | Changes |
|------|---------|
| `src/App.vue` | Replace template with game layout |

## Implementation Steps

### Step 1: BaseButton Component

Create `src/components/ui/BaseButton.vue`:

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-lg transition-all',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95',
      // Size
      size === 'sm' && 'px-3 py-1.5 text-sm min-h-[36px]',
      size === 'md' && 'px-4 py-2 text-base min-h-[44px]',
      size === 'lg' && 'px-6 py-3 text-lg min-h-[52px]',
      // Variant
      variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      variant === 'secondary' && 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600',
      variant === 'ghost' && 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
      variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ]"
  >
    <span v-if="loading" class="mr-2 animate-spin">⏳</span>
    <slot />
  </button>
</template>
```

### Step 2: BaseModal Component

Create `src/components/ui/BaseModal.vue`:

```vue
<script setup lang="ts">
import { watch } from 'vue'

interface Props {
  open: boolean
  title?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

// Lock body scroll when modal open
watch(() => props.open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click="handleBackdropClick"
      >
        <div
          class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header -->
          <div v-if="title" class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold">{{ title }}</h2>
            <button
              @click="emit('close')"
              class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="p-4">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
```

### Step 3: GameCard Component

Create `src/components/game/GameCard.vue`:

```vue
<script setup lang="ts">
import type { Card } from '@/types'

interface Props {
  card: Card
  showHint?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'relative w-full aspect-square rounded-xl transition-transform duration-500 transform-style-preserve-3d cursor-pointer',
      card.isRevealed && 'rotate-y-180'
    ]"
  >
    <!-- Front (hidden/úp) -->
    <div
      :class="[
        'absolute inset-0 flex items-center justify-center rounded-xl backface-hidden',
        'bg-gradient-to-br from-blue-500 to-blue-700 text-white',
        'border-2',
        card.isTarget ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-blue-400'
      ]"
    >
      <span class="text-2xl font-bold">{{ card.position }}</span>
      <span v-if="card.isTarget" class="absolute top-1 right-1 text-xl">❓</span>
    </div>

    <!-- Back (revealed/mở) -->
    <div
      :class="[
        'absolute inset-0 flex flex-col items-center justify-center rounded-xl backface-hidden rotate-y-180',
        'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
      ]"
    >
      <span class="text-xs text-gray-500 dark:text-gray-400">{{ card.position }}</span>
      <span class="text-lg font-bold mt-1">{{ card.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
```

### Step 4: CardGrid Component

Create `src/components/game/CardGrid.vue`:

```vue
<script setup lang="ts">
import type { Card } from '@/types'
import GameCard from './GameCard.vue'

interface Props {
  cards: Card[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 w-full max-w-lg mx-auto">
    <GameCard
      v-for="card in cards"
      :key="card.position"
      :card="card"
    />
  </div>
</template>
```

### Step 5: AnswerButtons Component

Create `src/components/game/AnswerButtons.vue`:

```vue
<script setup lang="ts">
interface Props {
  answers: string[]
  disabled?: boolean
  correctAnswer?: string
  selectedAnswer?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  selectedAnswer: null
})

const emit = defineEmits<{
  select: [answer: string]
}>()

function getButtonClass(answer: string): string {
  if (!props.selectedAnswer) {
    return 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
  }

  if (answer === props.correctAnswer) {
    return 'bg-green-500 text-white'
  }

  if (answer === props.selectedAnswer && answer !== props.correctAnswer) {
    return 'bg-red-500 text-white'
  }

  return 'bg-gray-100 dark:bg-gray-700 opacity-50'
}
</script>

<template>
  <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full max-w-lg mx-auto">
    <button
      v-for="answer in answers"
      :key="answer"
      :disabled="disabled || selectedAnswer !== null"
      @click="emit('select', answer)"
      :class="[
        'min-h-[52px] px-3 py-2 rounded-lg font-medium transition-all',
        'text-sm sm:text-base',
        'active:scale-95',
        'disabled:cursor-not-allowed',
        getButtonClass(answer)
      ]"
    >
      {{ answer }}
    </button>
  </div>
</template>
```

### Step 6: GameTimer Component

Create `src/components/game/GameTimer.vue`:

```vue
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  timeRemaining: number
  maxTime?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxTime: 90
})

const formattedTime = computed(() => {
  const minutes = Math.floor(props.timeRemaining / 60)
  const seconds = props.timeRemaining % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const percentage = computed(() => {
  return (props.timeRemaining / props.maxTime) * 100
})

const colorClass = computed(() => {
  if (props.timeRemaining <= 10) return 'text-red-500'
  if (props.timeRemaining <= 30) return 'text-yellow-500'
  return 'text-green-500'
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div :class="['text-4xl font-mono font-bold tabular-nums', colorClass]">
      {{ formattedTime }}
    </div>

    <!-- Progress bar -->
    <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
      <div
        :class="[
          'h-full transition-all duration-1000',
          timeRemaining <= 10 ? 'bg-red-500' : timeRemaining <= 30 ? 'bg-yellow-500' : 'bg-green-500'
        ]"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>
```

### Step 7: StarRating Component

Create `src/components/game/StarRating.vue`:

```vue
<script setup lang="ts">
interface Props {
  stars: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  maxStars: 3,
  size: 'md'
})
</script>

<template>
  <div class="flex items-center gap-0.5">
    <span
      v-for="i in maxStars"
      :key="i"
      :class="[
        'transition-colors',
        size === 'sm' && 'text-lg',
        size === 'md' && 'text-2xl',
        size === 'lg' && 'text-4xl',
        i <= stars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
      ]"
    >
      ★
    </span>
  </div>
</template>
```

### Step 8: RuleIndicator Component

Create `src/components/game/RuleIndicator.vue`:

```vue
<script setup lang="ts">
import type { RuleType } from '@/types'
import { RULE_LABELS } from '@/data/knowledge/sequences'

interface Props {
  rule: RuleType
}

defineProps<Props>()

const ruleColors: Record<RuleType, string> = {
  tuong_sinh: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  phan_sinh: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  tuong_khac: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}
</script>

<template>
  <div
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      ruleColors[rule]
    ]"
  >
    <span class="mr-1">📐</span>
    {{ RULE_LABELS[rule] }}
  </div>
</template>
```

### Step 9: HintButton Component

Create `src/components/game/HintButton.vue`:

```vue
<script setup lang="ts">
interface Props {
  hintsUsed: number
  maxHints?: number
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  maxHints: 2,
  disabled: false
})

const emit = defineEmits<{
  useHint: []
}>()
</script>

<template>
  <button
    :disabled="disabled || hintsUsed >= maxHints"
    @click="emit('useHint')"
    :class="[
      'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'hover:bg-yellow-200 dark:hover:bg-yellow-800',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    ]"
  >
    <span class="text-xl">💡</span>
    <span>Gợi ý ({{ maxHints - hintsUsed }}/{{ maxHints }})</span>
  </button>
</template>
```

### Step 10: LevelSelector Component

Create `src/components/layout/LevelSelector.vue`:

```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { Level, LevelProgress } from '@/types'
import { LEVELS } from '@/data/levels'
import { useUserStore } from '@/stores/user'
import StarRating from '@/components/game/StarRating.vue'

const userStore = useUserStore()

const emit = defineEmits<{
  selectLevel: [levelId: string]
}>()

function getLevelProgress(levelId: string): LevelProgress | undefined {
  return userStore.progress[levelId]
}

function isUnlocked(level: Level): boolean {
  return userStore.isLevelUnlocked(level.id, level.order)
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg mx-auto">
    <button
      v-for="level in LEVELS"
      :key="level.id"
      :disabled="!isUnlocked(level)"
      @click="emit('selectLevel', level.id)"
      :class="[
        'flex flex-col items-start p-4 rounded-xl text-left transition-all',
        'border-2',
        isUnlocked(level)
          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-lg'
          : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed'
      ]"
    >
      <div class="flex items-center justify-between w-full mb-2">
        <span class="text-2xl font-bold text-blue-600">{{ level.order }}</span>
        <span v-if="!isUnlocked(level)" class="text-xl">🔒</span>
        <StarRating
          v-else-if="getLevelProgress(level.id)"
          :stars="getLevelProgress(level.id)?.bestStars || 0"
          size="sm"
        />
      </div>

      <h3 class="font-semibold text-sm mb-1">{{ level.title }}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
        {{ level.description }}
      </p>
    </button>
  </div>
</template>
```

### Step 11: AppHeader Component

Create `src/components/layout/AppHeader.vue`:

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/use-theme'

const emit = defineEmits<{
  openSettings: []
  goHome: []
}>()

const { isDark, setTheme } = useTheme()

function toggleTheme() {
  setTheme(isDark.value ? 'light' : 'dark')
}
</script>

<template>
  <header class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <button
      @click="emit('goHome')"
      class="text-xl font-bold text-blue-600 hover:text-blue-700"
    >
      🎴 CCLK
    </button>

    <div class="flex items-center gap-2">
      <button
        @click="toggleTheme"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        :title="isDark ? 'Light mode' : 'Dark mode'"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>

      <button
        @click="emit('openSettings')"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Cài đặt"
      >
        ⚙️
      </button>
    </div>
  </header>
</template>
```

## Todo List

- [ ] Create `src/components/ui/BaseButton.vue`
- [ ] Create `src/components/ui/BaseModal.vue`
- [ ] Create `src/components/game/GameCard.vue`
- [ ] Create `src/components/game/CardGrid.vue`
- [ ] Create `src/components/game/AnswerButtons.vue`
- [ ] Create `src/components/game/GameTimer.vue`
- [ ] Create `src/components/game/StarRating.vue`
- [ ] Create `src/components/game/RuleIndicator.vue`
- [ ] Create `src/components/game/HintButton.vue`
- [ ] Create `src/components/layout/LevelSelector.vue`
- [ ] Create `src/components/layout/AppHeader.vue`
- [ ] Test all components in isolation
- [ ] Verify mobile responsiveness

## Success Criteria

- [ ] All components render correctly
- [ ] Card flip animation works
- [ ] Touch targets ≥ 44px
- [ ] Responsive on mobile (3 columns) and desktop (6 columns)
- [ ] Dark/Light theme applies correctly
- [ ] TypeScript compiles without errors
