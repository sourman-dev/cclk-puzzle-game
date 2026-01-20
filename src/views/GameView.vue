<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import CardGrid from '@/components/game/CardGrid.vue'
import AnswerButtons from '@/components/game/AnswerButtons.vue'
import GameTimer from '@/components/game/GameTimer.vue'
import StarRating from '@/components/game/StarRating.vue'
import RuleIndicator from '@/components/game/RuleIndicator.vue'
import HintButton from '@/components/game/HintButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import ColorHintSwitch from '@/components/game/ColorHintSwitch.vue'
import { useGameLogic } from '@/composables/use-game-logic'
import { useTimer } from '@/composables/use-timer'
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

const userStore = useUserStore()

const {
  currentQuestion,
  selectedAnswer,
  generateQuestion,
  submitAnswer,
  useHint: useHintLogic,
  calculatePoints,
  calculateStarsFromPoints,
  getElapsedTime
} = useGameLogic()

const settings = computed(() => userStore.settings)
const level = computed<Level | undefined>(() => getLevelById(props.levelId))

const timer = useTimer(settings.value.initialTime)

const hintsUsed = ref(0)
const roundNumber = ref(1)
const totalPoints = ref(0)
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
    const points = calculatePoints(getElapsedTime(), hintsUsed.value)
    totalPoints.value += points
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

  // Calculate stars from total points (max = roundsPerLevel)
  const maxPoints = settings.value.roundsPerLevel
  const finalStars = calculateStarsFromPoints(totalPoints.value, maxPoints)

  // Update progress
  userStore.updateLevelProgress(props.levelId, {
    completed: true,
    bestStars: Math.max(finalStars, userStore.progress[props.levelId]?.bestStars || 0),
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
  totalPoints.value = 0
  correctAnswers.value = 0
  showComplete.value = false
  startNewRound()
  timer.start(settings.value.initialTime)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <!-- Header -->
    <header class="flex items-center justify-between px-4 py-3 pt-safe border-b border-color">
      <button @click="handleExit" class="text-xl">←</button>
      <span class="font-semibold">{{ level?.title }}</span>
      <ColorHintSwitch />
    </header>

    <main v-if="currentQuestion" class="flex-1 flex flex-col px-4 py-2 gap-2">
      <!-- Timer & Points & Progress -->
      <div class="flex items-center justify-between">
        <GameTimer
          :time-remaining="timer.timeRemaining.value"
          :max-time="settings.initialTime"
        />
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">{{ roundNumber }}/{{ settings.roundsPerLevel }}</span>
          <span class="text-xl font-bold text-primary">{{ totalPoints.toFixed(1) }}đ</span>
        </div>
      </div>

      <!-- Rule Indicator -->
      <div class="flex justify-center">
        <RuleIndicator :rule="currentQuestion.rule" />
      </div>

      <!-- Cards -->
      <div class="flex-1 flex items-center min-h-0">
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
      <div class="flex justify-center pb-2">
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
        <p class="text-2xl font-bold mb-2">
          {{ correctAnswers }}/{{ roundNumber }} câu đúng
        </p>
        <p class="text-lg mb-4">
          {{ totalPoints.toFixed(1) }}/{{ settings.roundsPerLevel }} điểm
        </p>
        <div class="flex justify-center">
          <StarRating
            :stars="calculateStarsFromPoints(totalPoints, settings.roundsPerLevel)"
            size="lg"
          />
        </div>
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
