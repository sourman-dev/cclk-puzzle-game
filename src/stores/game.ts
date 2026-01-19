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
