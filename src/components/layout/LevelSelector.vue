<script setup lang="ts">
import { computed } from 'vue'
import type { Level, LevelProgress } from '@/types'
import { LEVELS } from '@/data/levels'
import { useUserStore } from '@/stores/user'
import StarRating from '@/components/game/StarRating.vue'

const userStore = useUserStore()

const emit = defineEmits<{
  selectLevel: [levelId: string]
}>()

const accentColor = computed(() => userStore.settings.accentColor || 'teal')

const accentTextClass = computed(() => {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    teal: 'text-teal-600',
    emerald: 'text-emerald-600',
    violet: 'text-violet-600',
    amber: 'text-amber-500',
    rose: 'text-rose-600'
  }
  return colorMap[accentColor.value] || colorMap.teal
})

const accentBorderClass = computed(() => {
  const colorMap: Record<string, string> = {
    blue: 'hover:border-blue-500',
    teal: 'hover:border-teal-500',
    emerald: 'hover:border-emerald-500',
    violet: 'hover:border-violet-500',
    amber: 'hover:border-amber-500',
    rose: 'hover:border-rose-500'
  }
  return colorMap[accentColor.value] || colorMap.teal
})

function getLevelProgress(levelId: string): LevelProgress | undefined {
  return userStore.progress[levelId]
}

function isUnlocked(level: Level): boolean {
  return userStore.isLevelUnlocked(level.id, level.order)
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg mx-auto">
    <button
      v-for="level in LEVELS"
      :key="level.id"
      :disabled="!isUnlocked(level)"
      @click="emit('selectLevel', level.id)"
      :class="[
        'flex flex-col items-start p-4 rounded-xl text-left transition-all',
        'border-2',
        isUnlocked(level)
          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg ' + accentBorderClass
          : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed'
      ]"
    >
      <div class="flex items-center justify-between w-full mb-2">
        <span :class="['text-2xl font-bold', accentTextClass]">{{ level.order }}</span>
        <span v-if="!isUnlocked(level)" class="text-xl">🔒</span>
        <StarRating
          v-else-if="getLevelProgress(level.id)"
          :stars="getLevelProgress(level.id)?.bestStars || 0"
          size="sm"
        />
      </div>

      <h3 class="font-semibold text-sm mb-1">{{ level.title }}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
        {{ level.description }}
      </p>
    </button>
  </div>
</template>
