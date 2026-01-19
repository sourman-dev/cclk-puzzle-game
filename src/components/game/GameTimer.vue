<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  timeRemaining: number
  maxTime?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxTime: 90
})

const formattedTime = computed(() => {
  const minutes = Math.floor(props.timeRemaining / 60)
  const seconds = props.timeRemaining % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const percentage = computed(() => {
  return (props.timeRemaining / props.maxTime) * 100
})

const colorClass = computed(() => {
  if (props.timeRemaining <= 10) return 'text-red-500'
  if (props.timeRemaining <= 30) return 'text-yellow-500'
  return 'text-green-500'
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div :class="['text-4xl font-mono font-bold tabular-nums', colorClass]">
      {{ formattedTime }}
    </div>

    <!-- Progress bar -->
    <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
      <div
        :class="[
          'h-full transition-all duration-1000',
          timeRemaining <= 10 ? 'bg-red-500' : timeRemaining <= 30 ? 'bg-yellow-500' : 'bg-green-500'
        ]"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>
