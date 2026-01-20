<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '@/types'
import { useUserStore } from '@/stores/user'
import { getColorByValue } from '@/data/knowledge/luc-hanh'

interface Props {
  card: Card
  showHint?: boolean
}

const props = defineProps<Props>()

const userStore = useUserStore()
const accentColor = computed(() => userStore.settings.accentColor || 'teal')
const colorHintEnabled = computed(() => userStore.settings.colorHintEnabled ?? false)

// Element-based color by value (inline style)
const elementColorStyle = computed(() => {
  if (!colorHintEnabled.value || !props.card.value) return null
  const { bg, text } = getColorByValue(props.card.value)
  return { backgroundColor: bg, color: text, borderColor: bg }
})

// Style for hidden cards when color hint enabled (white bg, black border)
const hiddenColorHintStyle = computed(() => {
  if (!colorHintEnabled.value) return null
  if (props.card.isTarget) {
    // Target card shows element color as hint
    const { bg, text } = getColorByValue(props.card.value)
    return { backgroundColor: bg, color: text, borderColor: '#facc15' } // yellow border for target
  }
  // Hidden cards: white bg, black border, black text
  return { backgroundColor: '#ffffff', color: '#000000', borderColor: '#000000' }
})

const revealedBgClass = computed(() => {
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
    <!-- Front (hidden/úp) -->
    <div
      :class="[
        'absolute inset-0 flex items-center justify-center rounded-xl backface-hidden',
        !colorHintEnabled && 'bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 text-white',
        'border',
        !colorHintEnabled && (card.isTarget ? 'border-yellow-400 ring-2 ring-yellow-400 border-2' : 'border-gray-500 dark:border-gray-500 border-2'),
        colorHintEnabled && card.isTarget && 'ring-2 ring-yellow-400'
      ]"
      :style="hiddenColorHintStyle"
    >
      <span class="text-2xl font-bold">{{ card.position }}</span>
      <span v-if="card.isTarget" class="absolute top-1 right-1 text-xl">❓</span>
    </div>

    <!-- Back (revealed/mở) -->
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
