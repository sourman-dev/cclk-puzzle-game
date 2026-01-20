<script setup lang="ts">
import { ref } from 'vue'
import type { Level, RuleType } from '@/types'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  open: boolean
  level: Level | null
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  start: [rules: RuleType[], rounds: number]
}>()

// Rule selection: 'tuong_sinh', 'phan_sinh', or 'mix' (both)
const selectedRule = ref<'tuong_sinh' | 'phan_sinh' | 'mix'>('tuong_sinh')
const roundsCount = ref(10)

function handleStart() {
  const rules: RuleType[] = selectedRule.value === 'mix'
    ? ['tuong_sinh', 'phan_sinh']
    : [selectedRule.value]
  emit('start', rules, roundsCount.value)
}
</script>

<template>
  <BaseModal
    :open="open"
    :title="level?.title || 'Bắt đầu'"
    @close="emit('close')"
  >
    <div class="space-y-4">
      <!-- Level description -->
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ level?.description }}
      </p>

      <!-- Rule selection -->
      <div>
        <label class="block text-sm font-medium mb-2">Chọn quy luật</label>
        <div class="space-y-2">
          <button
            @click="selectedRule = 'tuong_sinh'"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
              selectedRule === 'tuong_sinh'
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-gray-100 dark:bg-gray-700'
            ]"
          >
            <span>Tương Sinh (thuận)</span>
            <span>{{ selectedRule === 'tuong_sinh' ? '✓' : '' }}</span>
          </button>
          <button
            @click="selectedRule = 'phan_sinh'"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
              selectedRule === 'phan_sinh'
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-gray-100 dark:bg-gray-700'
            ]"
          >
            <span>Phản Sinh (nghịch)</span>
            <span>{{ selectedRule === 'phan_sinh' ? '✓' : '' }}</span>
          </button>
          <button
            @click="selectedRule = 'mix'"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
              selectedRule === 'mix'
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-gray-100 dark:bg-gray-700'
            ]"
          >
            <span>Mix (cả hai)</span>
            <span>{{ selectedRule === 'mix' ? '✓' : '' }}</span>
          </button>
        </div>
      </div>

      <!-- Rounds count -->
      <div>
        <label class="block text-sm font-medium mb-2">
          Số lượt chơi: {{ roundsCount }}
        </label>
        <input
          v-model.number="roundsCount"
          type="range"
          min="5"
          max="20"
          step="1"
          class="w-full accent-current"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <BaseButton variant="secondary" @click="emit('close')">
          Hủy
        </BaseButton>
        <BaseButton @click="handleStart">
          Bắt đầu
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
