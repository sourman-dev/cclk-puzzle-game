<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { RuleType, LevelOptions } from '@/types'
import { LEVELS } from '@/data/levels'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  open: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  start: [levelIds: string[], options: LevelOptions]
}>()

// Selected levels for comprehensive mode
const selectedLevelIds = ref<string[]>(['level_1'])
const selectedRule = ref<'tuong_sinh' | 'phan_sinh' | 'mix'>('mix')
const roundsCount = ref(15)

// Reset selections when dialog opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    selectedLevelIds.value = ['level_1']
  }
})

const allLevelsSelected = computed(() => selectedLevelIds.value.length === LEVELS.length)

function toggleLevel(levelId: string) {
  const idx = selectedLevelIds.value.indexOf(levelId)
  if (idx >= 0) {
    // Don't allow deselecting if only one level is selected
    if (selectedLevelIds.value.length > 1) {
      selectedLevelIds.value.splice(idx, 1)
    }
  } else {
    selectedLevelIds.value.push(levelId)
  }
}

function selectAllLevels() {
  if (allLevelsSelected.value) {
    selectedLevelIds.value = ['level_1']
  } else {
    selectedLevelIds.value = LEVELS.map(l => l.id)
  }
}

function handleStart() {
  const rules: RuleType[] = selectedRule.value === 'mix'
    ? ['tuong_sinh', 'phan_sinh']
    : [selectedRule.value]
  emit('start', [...selectedLevelIds.value], {
    rules,
    rounds: roundsCount.value,
    rotate: true,
    shuffle: true
  })
}
</script>

<template>
  <BaseModal :open="open" title="Tổng hợp" @close="emit('close')">
    <div class="space-y-4">
      <!-- Description -->
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Chọn các level muốn ôn tập. Số câu hỏi sẽ được chia đều theo tỷ lệ.
      </p>

      <!-- Level selection -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-sm font-medium">Chọn level</label>
          <button @click="selectAllLevels" class="text-xs text-blue-600 hover:text-blue-700">
            {{ allLevelsSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả' }}
          </button>
        </div>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          <button v-for="level in LEVELS" :key="level.id" @click="toggleLevel(level.id)" :class="[
            'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left',
            selectedLevelIds.includes(level.id)
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]">
            <div class="flex flex-col">
              <span class="font-medium">{{ level.title }}</span>
              <span class="text-xs opacity-70">{{ level.description.slice(0, 40) }}...</span>
            </div>
            <span>{{ selectedLevelIds.includes(level.id) ? '✓' : '' }}</span>
          </button>
        </div>
      </div>

      <!-- Rule selection -->
      <div>
        <label class="block text-sm font-medium mb-2">Chọn quy luật</label>
        <div class="flex gap-2">
          <button @click="selectedRule = 'tuong_sinh'" :class="[
            'flex-1 px-3 py-2 rounded-lg text-sm transition-colors',
            selectedRule === 'tuong_sinh'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]">
            Thuận
          </button>
          <button @click="selectedRule = 'phan_sinh'" :class="[
            'flex-1 px-3 py-2 rounded-lg text-sm transition-colors',
            selectedRule === 'phan_sinh'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]">
            Nghịch
          </button>
          <button @click="selectedRule = 'mix'" :class="[
            'flex-1 px-3 py-2 rounded-lg text-sm transition-colors',
            selectedRule === 'mix'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]">
            Mix
          </button>
        </div>
      </div>

      <!-- Rounds count -->
      <div>
        <label class="block text-sm font-medium mb-2">
          Số lượt chơi: {{ roundsCount }}
        </label>
        <input v-model.number="roundsCount" type="range" min="10" max="30" step="5" class="w-full accent-current" />
        <p class="text-xs text-gray-500 mt-1">
          ~{{ Math.floor(roundsCount / selectedLevelIds.length) }} câu/level
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <BaseButton variant="secondary" @click="emit('close')">
          Hủy
        </BaseButton>
        <BaseButton @click="handleStart">
          Bắt đầu ({{ selectedLevelIds.length }} level)
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
