<script setup lang="ts">
import { ref } from 'vue'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import type { RuleType } from '@/types'

type Screen = 'home' | 'game'

const currentScreen = ref<Screen>('home')
const currentLevelId = ref<string>('')
const currentRules = ref<RuleType[]>(['tuong_sinh'])
const currentRounds = ref<number>(10)

function startLevel(levelId: string, rules: RuleType[], rounds: number) {
  currentLevelId.value = levelId
  currentRules.value = rules
  currentRounds.value = rounds
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
    :rules="currentRules"
    :rounds="currentRounds"
    @exit="exitGame"
  />
</template>
