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
