<script setup lang="ts">
import { ref } from 'vue'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import LearningView from '@/views/LearningView.vue'
import type { RuleType } from '@/types'

type Screen = 'home' | 'game' | 'comprehensive' | 'learning'

const currentScreen = ref<Screen>('home')
const currentLevelId = ref<string>('')
const currentLevelIds = ref<string[]>([])
const currentRules = ref<RuleType[]>(['tuong_sinh'])
const currentRounds = ref<number>(10)

function startLevel(levelId: string, rules: RuleType[], rounds: number) {
  currentLevelId.value = levelId
  currentLevelIds.value = []
  currentRules.value = rules
  currentRounds.value = rounds
  currentScreen.value = 'game'
}

function startComprehensive(levelIds: string[], rules: RuleType[], rounds: number) {
  currentLevelIds.value = levelIds
  currentLevelId.value = 'tong_hop'
  currentRules.value = rules
  currentRounds.value = rounds
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
  <HomeView
    v-if="currentScreen === 'home'"
    @start-level="startLevel"
    @start-comprehensive="startComprehensive"
    @open-learning="openLearning"
  />

  <GameView
    v-else-if="currentScreen === 'game'"
    :level-id="currentLevelId"
    :rules="currentRules"
    :rounds="currentRounds"
    @exit="exitGame"
  />

  <GameView
    v-else-if="currentScreen === 'comprehensive'"
    :level-id="currentLevelId"
    :level-ids="currentLevelIds"
    :rules="currentRules"
    :rounds="currentRounds"
    @exit="exitGame"
  />

  <LearningView
    v-else-if="currentScreen === 'learning'"
    @exit="exitLearning"
  />
</template>
