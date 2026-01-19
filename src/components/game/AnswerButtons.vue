<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

interface Props {
  answers: string[]
  disabled?: boolean
  correctAnswer?: string
  selectedAnswer?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  selectedAnswer: null
})

const emit = defineEmits<{
  select: [answer: string]
}>()

const userStore = useUserStore()
const accentColor = computed(() => userStore.settings.accentColor || 'teal')

const accentBgClass = computed(() => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800/50',
    teal: 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-800/50',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-800/50',
    violet: 'bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 hover:bg-violet-200 dark:hover:bg-violet-800/50',
    amber: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800/50',
    rose: 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-800/50'
  }
  return colorMap[accentColor.value] || colorMap.teal
})

const disabledClass = computed(() => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-400 dark:text-blue-500',
    teal: 'bg-teal-50 dark:bg-teal-950/30 text-teal-400 dark:text-teal-500',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-400 dark:text-emerald-500',
    violet: 'bg-violet-50 dark:bg-violet-950/30 text-violet-400 dark:text-violet-500',
    amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-400 dark:text-amber-500',
    rose: 'bg-rose-50 dark:bg-rose-950/30 text-rose-400 dark:text-rose-500'
  }
  return colorMap[accentColor.value] || colorMap.teal
})

function getButtonClass(answer: string): string {
  if (!props.selectedAnswer) {
    return accentBgClass.value
  }

  if (answer === props.correctAnswer) {
    return 'bg-green-500 text-white'
  }

  if (answer === props.selectedAnswer && answer !== props.correctAnswer) {
    return 'bg-red-500 text-white'
  }

  return disabledClass.value + ' opacity-50'
}
</script>

<template>
  <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full max-w-lg mx-auto">
    <button
      v-for="answer in answers"
      :key="answer"
      :disabled="disabled || selectedAnswer !== null"
      @click="emit('select', answer)"
      :class="[
        'min-h-[52px] px-3 py-2 rounded-lg font-medium transition-all',
        'text-sm sm:text-base',
        'active:scale-95',
        'disabled:cursor-not-allowed',
        getButtonClass(answer)
      ]"
    >
      {{ answer }}
    </button>
  </div>
</template>
