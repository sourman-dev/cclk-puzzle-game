<script setup lang="ts">
import { ref } from 'vue'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import LearningView from '@/views/LearningView.vue'
import type { LevelOptions } from '@/types'

type Screen = 'home' | 'game' | 'comprehensive' | 'learning'

const currentScreen = ref<Screen>('home')
const currentLevelId = ref<string>('')
const currentLevelIds = ref<string[]>([])
const currentOptions = ref<LevelOptions>({ rules: ['tuong_sinh'], rounds: 10 })

function startLevel(levelId: string, options: LevelOptions) {
  currentLevelId.value = levelId
  currentLevelIds.value = []
  currentOptions.value = options
  currentScreen.value = 'game'
}

function startComprehensive(levelIds: string[], options: LevelOptions) {
  currentLevelIds.value = levelIds
  currentLevelId.value = 'tong_hop'
  currentOptions.value = options
  currentScreen.value = 'comprehensive'
}

function exitGame() {
  currentScreen.value = 'home'
}

function openLearning() {
  currentScreen.value = 'learning'
}

function exitLearning() {
  currentScreen.value = 'home'
}
</script>

<template>
  <HomeView v-if="currentScreen === 'home'" @start-level="startLevel" @start-comprehensive="startComprehensive"
    @open-learning="openLearning" />

  <GameView v-else-if="currentScreen === 'game'" :level-id="currentLevelId" :options="currentOptions"
    @exit="exitGame" />

  <GameView v-else-if="currentScreen === 'comprehensive'" :level-id="currentLevelId" :level-ids="currentLevelIds"
    :options="currentOptions" @exit="exitGame" />

  <LearningView v-else-if="currentScreen === 'learning'" @exit="exitLearning" />
</template>
