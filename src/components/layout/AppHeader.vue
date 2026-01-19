<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/use-theme'
import { useUserStore } from '@/stores/user'

const emit = defineEmits<{
  openSettings: []
  goHome: []
}>()

const { isDark, setTheme } = useTheme()
const userStore = useUserStore()

const accentColor = computed(() => userStore.settings.accentColor || 'teal')
const accentTextClass = computed(() => {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600 hover:text-blue-700',
    teal: 'text-teal-600 hover:text-teal-700',
    emerald: 'text-emerald-600 hover:text-emerald-700',
    violet: 'text-violet-600 hover:text-violet-700',
    amber: 'text-amber-500 hover:text-amber-600',
    rose: 'text-rose-600 hover:text-rose-700'
  }
  return colorMap[accentColor.value] || colorMap.teal
})

function toggleTheme() {
  setTheme(isDark.value ? 'light' : 'dark')
}
</script>

<template>
  <header class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <button
      @click="emit('goHome')"
      class="flex items-center gap-2"
    >
      <img src="/android-chrome-192x192.png" alt="CCLK" class="w-8 h-8 rounded-lg" />
      <div class="flex flex-col items-start">
        <span :class="['text-xl font-bold leading-tight', accentTextClass]">CCLK</span>
        <span class="text-[10px] text-gray-400 leading-tight">v0.0.3</span>
      </div>
    </button>

    <div class="flex items-center gap-2">
      <button
        @click="toggleTheme"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        :title="isDark ? 'Light mode' : 'Dark mode'"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>

      <button
        @click="emit('openSettings')"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Cài đặt"
      >
        ⚙️
      </button>
    </div>
  </header>
</template>
