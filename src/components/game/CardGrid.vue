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
