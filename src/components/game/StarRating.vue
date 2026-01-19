<script setup lang="ts">
interface Props {
  stars: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  maxStars: 3,
  size: 'md'
})
</script>

<template>
  <div class="flex items-center gap-0.5">
    <span
      v-for="i in maxStars"
      :key="i"
      :class="[
        'transition-colors',
        size === 'sm' && 'text-lg',
        size === 'md' && 'text-2xl',
        size === 'lg' && 'text-4xl',
        i <= stars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
      ]"
    >
      ★
    </span>
  </div>
</template>
