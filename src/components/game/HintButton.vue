<script setup lang="ts">
interface Props {
  hintsUsed: number
  maxHints?: number
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  maxHints: 2,
  disabled: false
})

const emit = defineEmits<{
  useHint: []
}>()
</script>

<template>
  <button
    :disabled="disabled || hintsUsed >= maxHints"
    @click="emit('useHint')"
    :class="[
      'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'hover:bg-yellow-200 dark:hover:bg-yellow-800',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    ]"
  >
    <span class="text-xl">💡</span>
    <span>Gợi ý ({{ maxHints - hintsUsed }}/{{ maxHints }})</span>
  </button>
</template>
