<script setup lang="ts">
import { ref } from 'vue'
import HexagramDiagram from '@/components/learning/HexagramDiagram.vue'

type TopicType = 'luc_hanh' | 'luc_khi' | 'luc_kinh' | 'luc_tang' | 'luc_phu'

const emit = defineEmits<{ exit: [] }>()

const selectedTopic = ref<TopicType>('luc_hanh')

const TOPIC_OPTIONS: { value: TopicType; label: string }[] = [
  { value: 'luc_hanh', label: 'Lục Hành' },
  { value: 'luc_khi', label: 'Lục Khí' },
  { value: 'luc_kinh', label: 'Lục Kinh' },
  { value: 'luc_tang', label: 'Lục Tạng' },
  { value: 'luc_phu', label: 'Lục Phủ' }
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <header class="flex items-center gap-4 px-4 py-3 pt-safe border-b border-color">
      <button @click="emit('exit')" class="text-xl">←</button>
      <span class="font-semibold">Học tập Lục Khí</span>
    </header>

    <main class="flex-1 flex flex-col items-center px-4 py-6">
      <!-- Hexagram Diagram -->
      <HexagramDiagram :selected-topic="selectedTopic" />

      <!-- Topic Selector -->
      <select
        v-model="selectedTopic"
        class="mt-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-primary"
      >
        <option v-for="opt in TOPIC_OPTIONS" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <p class="mt-4 text-sm text-secondary text-center max-w-xs">
        Chọn chủ đề để xem thông tin tương ứng của mỗi Hành
      </p>
    </main>
  </div>
</template>
