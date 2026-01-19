<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

const userStore = useUserStore()
const accentColor = computed(() => userStore.settings.accentColor || 'teal')

const accentClasses = computed(() => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    teal: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
    violet: 'bg-violet-600 hover:bg-violet-700 focus:ring-violet-500',
    amber: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400',
    rose: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
  }
  return colorMap[accentColor.value] || colorMap.teal
})
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-lg transition-all',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95',
      // Size
      size === 'sm' && 'px-3 py-1.5 text-sm min-h-[36px]',
      size === 'md' && 'px-4 py-2 text-base min-h-[44px]',
      size === 'lg' && 'px-6 py-3 text-lg min-h-[52px]',
      // Variant
      variant === 'primary' && accentClasses + ' text-white',
      variant === 'secondary' && 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600',
      variant === 'ghost' && 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
      variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ]"
  >
    <span v-if="loading" class="mr-2 animate-spin">⏳</span>
    <slot />
  </button>
</template>
