# Phase 4: Game Logic

```yaml
status: done
priority: high
estimated_files: 5
depends_on: phase-03
completed: 2026-01-20
```

## Overview

Implement core game logic: question generation, timer, scoring, hint system, và game flow.

## Context Links

- [Phase 2: Knowledge Base](./phase-02-knowledge-base.md)
- [Phase 3: Core Components](./phase-03-core-components.md)

## Files to Create

| File | Purpose |
|------|---------|
| `src/composables/use-game-logic.ts` | Question generation, validation |
| `src/composables/use-timer.ts` | Timer with pause/resume |
| `src/views/HomeView.vue` | Home screen với level selection |
| `src/views/GameView.vue` | Main gameplay screen |
| `src/views/SettingsView.vue` | Settings modal content |

## Implementation Steps

### Step 1: Timer Composable

Create `src/composables/use-timer.ts`:

```typescript
import { ref, computed, onUnmounted } from 'vue'

export function useTimer(initialTime: number = 90) {
  const timeRemaining = ref(initialTime)
  const isRunning = ref(false)
  const isPaused = ref(false)

  let intervalId: number | null = null

  const formattedTime = computed(() => {
    const mins = Math.floor(timeRemaining.value / 60)
    const secs = timeRemaining.value % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  })

  function start(time?: number) {
    if (time !== undefined) {
      timeRemaining.value = time
    }
    isRunning.value = true
    isPaused.value = false

    intervalId = window.setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        stop()
      }
    }, 1000)
  }

  function stop() {
    isRunning.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function pause() {
    isPaused.value = true
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function resume() {
    if (isPaused.value && timeRemaining.value > 0) {
      isPaused.value = false
      intervalId = window.setInterval(() => {
        if (timeRemaining.value > 0) {
          timeRemaining.value--
        } else {
          stop()
        }
      }, 1000)
    }
  }

  function addTime(seconds: number) {
    timeRemaining.value += seconds
  }

  function reset(time: number = initialTime) {
    stop()
    timeRemaining.value = time
    isPaused.value = false
  }

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    timeRemaining,
    formattedTime,
    isRunning,
    isPaused,
    start,
    stop,
    pause,
    resume,
    addTime,
    reset
  }
}
```

### Step 2: Game Logic Composable

Create `src/composables/use-game-logic.ts`:

```typescript
import { ref, computed } from 'vue'
import type { Question, Card, RuleType, TopicType, Level, GameSettings } from '@/types'
import { getSequenceForTopic, calculateAnswer } from '@/data/rules'
import { RULE_LABELS } from '@/data/knowledge/sequences'
import { LEVELS } from '@/data/levels'

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count)
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function useGameLogic() {
  const currentQuestion = ref<Question | null>(null)
  const selectedAnswer = ref<string | null>(null)
  const isCorrect = ref<boolean | null>(null)
  const roundStartTime = ref<number>(0)

  /**
   * Generate a question for the given level and settings
   */
  function generateQuestion(level: Level, settings: GameSettings): Question {
    // Pick random topic from level's topics
    const topic = pickRandom(level.topics, 1)[0] as TopicType

    // Pick random rule from intersection of level rules and enabled rules
    const availableRules = level.rules.filter(r => settings.enabledRules.includes(r))
    const rule = pickRandom(availableRules.length > 0 ? availableRules : level.rules, 1)[0] as RuleType

    // Get sequence for topic
    const sequence = getSequenceForTopic(topic)

    // Pick target position (1-6)
    const targetPosition = randomInt(1, 6)

    // Pick revealed positions (excluding target)
    const otherPositions = [1, 2, 3, 4, 5, 6].filter(p => p !== targetPosition)
    const revealedPositions = pickRandom(otherPositions, settings.revealedCards)

    // Pick one revealed position to use as reference for answer calculation
    const referencePosition = revealedPositions[0]
    const referenceIndex = referencePosition - 1
    const referenceValue = sequence[referenceIndex]

    // Calculate correct answer
    const correctAnswer = calculateAnswer(
      sequence,
      referencePosition,
      referenceValue,
      targetPosition,
      rule
    )

    // Create cards array
    const cards: Card[] = []
    for (let i = 1; i <= 6; i++) {
      cards.push({
        position: i,
        value: sequence[i - 1],
        isRevealed: revealedPositions.includes(i),
        isTarget: i === targetPosition
      })
    }

    // Shuffle answers
    const answers = shuffle([...sequence])

    const question: Question = {
      cards,
      targetPosition,
      correctAnswer,
      rule,
      ruleLabel: RULE_LABELS[rule],
      answers,
      topic
    }

    currentQuestion.value = question
    selectedAnswer.value = null
    isCorrect.value = null
    roundStartTime.value = Date.now()

    return question
  }

  /**
   * Submit answer and check if correct
   */
  function submitAnswer(answer: string): boolean {
    if (!currentQuestion.value) return false

    selectedAnswer.value = answer
    isCorrect.value = answer === currentQuestion.value.correctAnswer

    // Reveal target card
    const targetCard = currentQuestion.value.cards.find(c => c.isTarget)
    if (targetCard) {
      targetCard.isRevealed = true
    }

    return isCorrect.value
  }

  /**
   * Use hint - reveal a random hidden card
   */
  function useHint(): Card | null {
    if (!currentQuestion.value) return null

    // Find hidden cards (not revealed, not target)
    const hiddenCards = currentQuestion.value.cards.filter(
      c => !c.isRevealed && !c.isTarget
    )

    if (hiddenCards.length === 0) return null

    // Pick one randomly and reveal it
    const cardToReveal = pickRandom(hiddenCards, 1)[0]
    cardToReveal.isRevealed = true

    return cardToReveal
  }

  /**
   * Calculate stars based on elapsed time
   */
  function calculateStars(elapsedSeconds: number, hintsUsed: number): number {
    let stars = 3

    // Time-based reduction
    if (elapsedSeconds > 60) {
      stars = 1
    } else if (elapsedSeconds > 30) {
      stars = 2
    }

    // Hint penalty (first hint costs 1 star)
    if (hintsUsed >= 1) {
      stars = Math.max(1, stars - 1)
    }

    return stars
  }

  /**
   * Get elapsed time since round started
   */
  function getElapsedTime(): number {
    return Math.floor((Date.now() - roundStartTime.value) / 1000)
  }

  /**
   * Generate questions with spaced repetition
   * Mix questions from previous levels if configured
   */
  function generateMixedQuestions(
    level: Level,
    settings: GameSettings,
    count: number
  ): Question[] {
    const questions: Question[] = []

    // Calculate how many questions from previous levels
    const reviewCount = level.reviewFromLevels
      ? Math.floor(count * 0.25) // 25% from previous levels
      : 0
    const currentCount = count - reviewCount

    // Generate current level questions
    for (let i = 0; i < currentCount; i++) {
      questions.push(generateQuestion(level, settings))
    }

    // Generate review questions from previous levels
    if (level.reviewFromLevels) {
      for (let i = 0; i < reviewCount; i++) {
        const reviewLevelId = pickRandom(level.reviewFromLevels, 1)[0]
        const reviewLevel = LEVELS.find(l => l.id === reviewLevelId)
        if (reviewLevel) {
          questions.push(generateQuestion(reviewLevel, settings))
        }
      }
    }

    // Shuffle all questions
    return shuffle(questions)
  }

  return {
    currentQuestion,
    selectedAnswer,
    isCorrect,
    generateQuestion,
    generateMixedQuestions,
    submitAnswer,
    useHint,
    calculateStars,
    getElapsedTime
  }
}
```

### Step 3: HomeView

Create `src/views/HomeView.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import LevelSelector from '@/components/layout/LevelSelector.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import SettingsView from './SettingsView.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const showSettings = ref(false)

const emit = defineEmits<{
  startLevel: [levelId: string]
}>()

function handleSelectLevel(levelId: string) {
  emit('startLevel', levelId)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <AppHeader
      @open-settings="showSettings = true"
      @go-home="() => {}"
    />

    <main class="flex-1 flex flex-col items-center px-4 py-6">
      <h1 class="text-2xl font-bold mb-2">Châm Cứu Lục Khí</h1>
      <p class="text-secondary text-sm mb-6 text-center">
        Học quy luật Tương Sinh • Phản Sinh • Tương Khắc
      </p>

      <LevelSelector @select-level="handleSelectLevel" />
    </main>

    <!-- Settings Modal -->
    <BaseModal
      :open="showSettings"
      title="Cài đặt"
      @close="showSettings = false"
    >
      <SettingsView @close="showSettings = false" />
    </BaseModal>
  </div>
</template>
```

### Step 4: GameView

Create `src/views/GameView.vue`:

```vue
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import CardGrid from '@/components/game/CardGrid.vue'
import AnswerButtons from '@/components/game/AnswerButtons.vue'
import GameTimer from '@/components/game/GameTimer.vue'
import StarRating from '@/components/game/StarRating.vue'
import RuleIndicator from '@/components/game/RuleIndicator.vue'
import HintButton from '@/components/game/HintButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useGameLogic } from '@/composables/use-game-logic'
import { useTimer } from '@/composables/use-timer'
import { useGameStore } from '@/stores/game'
import { useUserStore } from '@/stores/user'
import { getLevelById } from '@/data/levels'
import type { Level } from '@/types'

interface Props {
  levelId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  exit: []
  complete: [stars: number]
}>()

const gameStore = useGameStore()
const userStore = useUserStore()

const {
  currentQuestion,
  selectedAnswer,
  isCorrect,
  generateQuestion,
  submitAnswer,
  useHint: useHintLogic,
  calculateStars,
  getElapsedTime
} = useGameLogic()

const settings = computed(() => userStore.settings)
const level = computed<Level | undefined>(() => getLevelById(props.levelId))

const timer = useTimer(settings.value.initialTime)

const hintsUsed = ref(0)
const roundNumber = ref(1)
const totalStars = ref(0)
const correctAnswers = ref(0)
const showResult = ref(false)
const showComplete = ref(false)

// Start game
onMounted(() => {
  if (level.value) {
    startNewRound()
    timer.start(settings.value.initialTime)
  }
})

// Watch for timer reaching 0
watch(() => timer.timeRemaining.value, (time) => {
  if (time <= 0) {
    finishLevel()
  }
})

function startNewRound() {
  if (!level.value) return

  hintsUsed.value = 0
  selectedAnswer.value = null
  showResult.value = false

  generateQuestion(level.value, settings.value)
}

function handleAnswer(answer: string) {
  const correct = submitAnswer(answer)
  showResult.value = true

  if (correct) {
    const stars = calculateStars(getElapsedTime(), hintsUsed.value)
    totalStars.value += stars
    correctAnswers.value++

    // Add bonus time
    timer.addTime(settings.value.bonusTime)
  }

  // Auto-advance after delay
  setTimeout(() => {
    if (roundNumber.value >= settings.value.roundsPerLevel) {
      finishLevel()
    } else {
      roundNumber.value++
      startNewRound()
    }
  }, 1500)
}

function handleHint() {
  if (hintsUsed.value >= 2) return

  useHintLogic()
  hintsUsed.value++
}

function finishLevel() {
  timer.stop()
  showComplete.value = true

  // Calculate average stars
  const avgStars = correctAnswers.value > 0
    ? Math.round(totalStars.value / correctAnswers.value)
    : 0

  // Update progress
  userStore.updateLevelProgress(props.levelId, {
    completed: true,
    bestStars: Math.max(avgStars, userStore.progress[props.levelId]?.bestStars || 0),
    totalRoundsPlayed: (userStore.progress[props.levelId]?.totalRoundsPlayed || 0) + roundNumber.value,
    correctAnswers: (userStore.progress[props.levelId]?.correctAnswers || 0) + correctAnswers.value
  })
}

function handleExit() {
  timer.stop()
  emit('exit')
}

function handlePlayAgain() {
  roundNumber.value = 1
  totalStars.value = 0
  correctAnswers.value = 0
  showComplete.value = false
  startNewRound()
  timer.start(settings.value.initialTime)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <!-- Header -->
    <header class="flex items-center justify-between px-4 py-3 border-b border-color">
      <button @click="handleExit" class="text-xl">←</button>
      <span class="font-semibold">{{ level?.title }}</span>
      <span class="text-sm">{{ roundNumber }}/{{ settings.roundsPerLevel }}</span>
    </header>

    <main v-if="currentQuestion" class="flex-1 flex flex-col px-4 py-4 gap-4">
      <!-- Timer & Stars -->
      <div class="flex items-center justify-between">
        <GameTimer
          :time-remaining="timer.timeRemaining.value"
          :max-time="settings.initialTime"
        />
        <StarRating :stars="totalStars" size="md" />
      </div>

      <!-- Rule Indicator -->
      <div class="flex justify-center">
        <RuleIndicator :rule="currentQuestion.rule" />
      </div>

      <!-- Cards -->
      <div class="flex-1 flex items-center">
        <CardGrid :cards="currentQuestion.cards" />
      </div>

      <!-- Answer Buttons -->
      <AnswerButtons
        :answers="currentQuestion.answers"
        :correct-answer="currentQuestion.correctAnswer"
        :selected-answer="selectedAnswer"
        :disabled="showResult"
        @select="handleAnswer"
      />

      <!-- Hint Button -->
      <div class="flex justify-center">
        <HintButton
          :hints-used="hintsUsed"
          :disabled="showResult"
          @use-hint="handleHint"
        />
      </div>
    </main>

    <!-- Level Complete Modal -->
    <BaseModal
      :open="showComplete"
      title="Hoàn thành!"
      @close="emit('exit')"
    >
      <div class="text-center py-4">
        <p class="text-lg mb-2">Bạn đã hoàn thành {{ level?.title }}!</p>
        <p class="text-2xl font-bold mb-4">
          {{ correctAnswers }}/{{ roundNumber }} câu đúng
        </p>
        <StarRating
          :stars="Math.round(totalStars / Math.max(correctAnswers, 1))"
          size="lg"
        />
      </div>

      <template #footer>
        <div class="flex gap-2">
          <BaseButton variant="secondary" @click="emit('exit')">
            Thoát
          </BaseButton>
          <BaseButton @click="handlePlayAgain">
            Chơi lại
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
```

### Step 5: SettingsView

Create `src/views/SettingsView.vue`:

```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useTheme } from '@/composables/use-theme'
import type { RuleType } from '@/types'

const emit = defineEmits<{
  close: []
}>()

const userStore = useUserStore()
const { theme, setTheme } = useTheme()

// Local copies for editing
const revealedCards = ref(userStore.settings.revealedCards)
const enabledRules = ref<RuleType[]>([...userStore.settings.enabledRules])
const initialTime = ref(userStore.settings.initialTime)
const bonusTime = ref(userStore.settings.bonusTime)
const roundsPerLevel = ref(userStore.settings.roundsPerLevel)
const currentTheme = ref(userStore.settings.theme)

const allRules: { value: RuleType; label: string }[] = [
  { value: 'tuong_sinh', label: 'Tương Sinh' },
  { value: 'phan_sinh', label: 'Phản Sinh' },
  { value: 'tuong_khac', label: 'Tương Khắc' }
]

function toggleRule(rule: RuleType) {
  const index = enabledRules.value.indexOf(rule)
  if (index >= 0) {
    // Don't allow removing last rule
    if (enabledRules.value.length > 1) {
      enabledRules.value.splice(index, 1)
    }
  } else {
    enabledRules.value.push(rule)
  }
}

function saveSettings() {
  userStore.updateSettings({
    revealedCards: revealedCards.value as 1 | 2 | 3,
    enabledRules: enabledRules.value,
    initialTime: initialTime.value,
    bonusTime: bonusTime.value,
    roundsPerLevel: roundsPerLevel.value,
    theme: currentTheme.value
  })
  setTheme(currentTheme.value)
  emit('close')
}
</script>

<template>
  <div class="space-y-4">
    <!-- Difficulty -->
    <div>
      <label class="block text-sm font-medium mb-2">Số lá bài mở sẵn</label>
      <div class="flex gap-2">
        <button
          v-for="n in [1, 2, 3]"
          :key="n"
          @click="revealedCards = n as 1 | 2 | 3"
          :class="[
            'flex-1 py-2 rounded-lg font-medium transition-colors',
            revealedCards === n
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700'
          ]"
        >
          {{ n }} lá
        </button>
      </div>
    </div>

    <!-- Rules -->
    <div>
      <label class="block text-sm font-medium mb-2">Quy luật áp dụng</label>
      <div class="space-y-2">
        <button
          v-for="rule in allRules"
          :key="rule.value"
          @click="toggleRule(rule.value)"
          :class="[
            'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
            enabledRules.includes(rule.value)
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]"
        >
          <span>{{ rule.label }}</span>
          <span>{{ enabledRules.includes(rule.value) ? '✓' : '' }}</span>
        </button>
      </div>
    </div>

    <!-- Timer -->
    <div>
      <label class="block text-sm font-medium mb-2">
        Thời gian ban đầu: {{ initialTime }}s
      </label>
      <input
        v-model.number="initialTime"
        type="range"
        min="30"
        max="180"
        step="10"
        class="w-full"
      />
    </div>

    <!-- Bonus Time -->
    <div>
      <label class="block text-sm font-medium mb-2">
        Thời gian thưởng: +{{ bonusTime }}s
      </label>
      <input
        v-model.number="bonusTime"
        type="range"
        min="10"
        max="60"
        step="5"
        class="w-full"
      />
    </div>

    <!-- Rounds -->
    <div>
      <label class="block text-sm font-medium mb-2">
        Số câu hỏi/level: {{ roundsPerLevel }}
      </label>
      <input
        v-model.number="roundsPerLevel"
        type="range"
        min="5"
        max="20"
        step="1"
        class="w-full"
      />
    </div>

    <!-- Theme -->
    <div>
      <label class="block text-sm font-medium mb-2">Giao diện</label>
      <div class="flex gap-2">
        <button
          v-for="t in (['light', 'dark', 'system'] as const)"
          :key="t"
          @click="currentTheme = t"
          :class="[
            'flex-1 py-2 rounded-lg font-medium transition-colors',
            currentTheme === t
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700'
          ]"
        >
          {{ t === 'light' ? '☀️ Sáng' : t === 'dark' ? '🌙 Tối' : '🖥️ Hệ thống' }}
        </button>
      </div>
    </div>

    <!-- Save Button -->
    <button
      @click="saveSettings"
      class="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
    >
      Lưu cài đặt
    </button>
  </div>
</template>
```

### Step 6: Update App.vue

Replace `src/App.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'

type Screen = 'home' | 'game'

const currentScreen = ref<Screen>('home')
const currentLevelId = ref<string>('')

function startLevel(levelId: string) {
  currentLevelId.value = levelId
  currentScreen.value = 'game'
}

function exitGame() {
  currentScreen.value = 'home'
}
</script>

<template>
  <HomeView
    v-if="currentScreen === 'home'"
    @start-level="startLevel"
  />

  <GameView
    v-else-if="currentScreen === 'game'"
    :level-id="currentLevelId"
    @exit="exitGame"
  />
</template>
```

## Todo List

- [ ] Create `src/composables/use-timer.ts`
- [ ] Create `src/composables/use-game-logic.ts`
- [ ] Create `src/views/HomeView.vue`
- [ ] Create `src/views/GameView.vue`
- [ ] Create `src/views/SettingsView.vue`
- [ ] Update `src/App.vue`
- [ ] Test complete game flow
- [ ] Verify timer accuracy
- [ ] Test hint system
- [ ] Verify spaced repetition mix

## Success Criteria

- [ ] Game starts with selected level
- [ ] Questions generate correctly per rules
- [ ] Timer counts down and adds bonus time
- [ ] Stars calculate based on time + hints
- [ ] Hints reveal cards and apply penalties
- [ ] Level completion saves progress
- [ ] Settings persist across sessions
- [ ] Game playable end-to-end
