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
  theme: 'system',
  accentColor: 'teal',
  colorHintEnabled: false
}

function generateUUID(): string {
  // Use crypto.randomUUID if available, fallback to Math.random
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const useUserStore = defineStore('user', () => {
  // Load from localStorage or create new
  let initialData: UserData
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    initialData = stored
      ? JSON.parse(stored)
      : {
          id: generateUUID(),
          settings: DEFAULT_SETTINGS,
          progress: {},
          createdAt: Date.now(),
          lastPlayedAt: Date.now()
        }
  } catch {
    // Corrupted localStorage data
    initialData = {
      id: generateUUID(),
      settings: DEFAULT_SETTINGS,
      progress: {},
      createdAt: Date.now(),
      lastPlayedAt: Date.now()
    }
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

  function isLevelUnlocked(_levelId: string, levelOrder: number): boolean {
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
