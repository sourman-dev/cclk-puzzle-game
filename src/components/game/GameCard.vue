<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '@/types'
import { useUserStore } from '@/stores/user'
import { getColorByPosition } from '@/data/knowledge/element-colors'

interface Props {
  card: Card
  showHint?: boolean
}

const props = defineProps<Props>()

const userStore = useUserStore()
const accentColor = computed(() => userStore.settings.accentColor || 'teal')
const colorHintEnabled = computed(() => userStore.settings.colorHintEnabled ?? false)

// Element-based color by position (inline style) for revealed cards
const elementColorStyle = computed(() => {
  if (!colorHintEnabled.value) return null
  const { bg, text } = getColorByPosition(props.card.position)
  return { backgroundColor: bg, color: text, borderColor: bg }
})

const revealedBgClass = computed(() => {
  // If color hint enabled, only use border class (background from inline style)
  if (colorHintEnabled.value) return ''

  const colorMap: Record<string, string> = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400',
    teal: 'bg-gradient-to-br from-teal-500 to-teal-700 border-teal-400',
    emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-700 border-emerald-400',
    violet: 'bg-gradient-to-br from-violet-500 to-violet-700 border-violet-400',
    amber: 'bg-gradient-to-br from-amber-500 to-amber-700 border-amber-400',
    rose: 'bg-gradient-to-br from-rose-500 to-rose-700 border-rose-400'
  }
  return colorMap[accentColor.value] || colorMap.teal
})
</script>

<template>
  <div
    :class="[
      'relative w-full aspect-square rounded-xl transition-transform duration-500 transform-style-preserve-3d cursor-pointer',
      card.isRevealed && 'rotate-y-180'
    ]"
  >
    <!-- Front (hidden/úp) - màu xám -->
    <div
      :class="[
        'absolute inset-0 flex items-center justify-center rounded-xl backface-hidden',
        'bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 text-white',
        'border-2',
        card.isTarget ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-500 dark:border-gray-500'
      ]"
    >
      <span class="text-2xl font-bold">{{ card.position }}</span>
      <span v-if="card.isTarget" class="absolute top-1 right-1 text-xl">❓</span>
    </div>

    <!-- Back (revealed/mở) - màu accent hoặc element -->
    <div
      :class="[
        'absolute inset-0 flex flex-col items-center justify-center rounded-xl backface-hidden rotate-y-180',
        'border-2',
        !colorHintEnabled && 'text-white',
        revealedBgClass
      ]"
      :style="elementColorStyle"
    >
      <span :class="['text-xs', colorHintEnabled ? 'opacity-70' : 'text-white/70']">{{ card.position }}</span>
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
