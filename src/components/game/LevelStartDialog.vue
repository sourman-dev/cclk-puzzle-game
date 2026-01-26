<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Level, RuleType, LevelOptions } from '@/types'
import { TANG_PHU_DATA } from '@/data/knowledge/luc-hanh'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  open: boolean
  level: Level | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  start: [options: LevelOptions]
}>()

// Default options
const selectedRule = ref<'tuong_sinh' | 'phan_sinh' | 'mix'>('tuong_sinh')
const roundsCount = ref(10)
const rotate = ref(true)
const shuffle = ref(true)

// Filter channels based on level topic
const availableChannels = computed(() => {
  if (!props.level) return []
  const isTang = props.level.topics.includes('ngu_du_ten_tang') || props.level.topics.includes('ngu_du_tang')
  return TANG_PHU_DATA.filter(tp => tp.isTang === isTang)
})

const selectedChannels = ref<string[]>([])

// Initialize selectedChannels when level changes
watch(() => props.level, (newLevel) => {
  if (newLevel) {
    selectedChannels.value = availableChannels.value.map(tp => tp.id)
  }
}, { immediate: true })

const isNguDuLevel = computed(() => {
  return props.level?.topics.some(t => t.startsWith('ngu_du'))
})

function handleStart() {
  const rules: RuleType[] = selectedRule.value === 'mix'
    ? ['tuong_sinh', 'phan_sinh']
    : [selectedRule.value]

  emit('start', {
    rules,
    rounds: roundsCount.value,
    rotate: rotate.value,
    shuffle: shuffle.value,
    allowedChannels: selectedChannels.value
  })
}
</script>

<template>
  <BaseModal :open="open" :title="level?.title || 'Bắt đầu'" @close="emit('close')">
    <div class="space-y-4">
      <!-- Level description -->
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ level?.description }}
      </p>

      <!-- Rule selection -->
      <div>
        <label class="block text-sm font-medium mb-2">Chọn quy luật</label>
        <div class="space-y-2">
          <button @click="selectedRule = 'tuong_sinh'" :class="[
            'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
            selectedRule === 'tuong_sinh'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]">
            <span>Tương Sinh (thuận)</span>
            <span>{{ selectedRule === 'tuong_sinh' ? '✓' : '' }}</span>
          </button>
          <button @click="selectedRule = 'phan_sinh'" :class="[
            'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
            selectedRule === 'phan_sinh'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]">
            <span>Phản Sinh (nghịch)</span>
            <span>{{ selectedRule === 'phan_sinh' ? '✓' : '' }}</span>
          </button>
          <button @click="selectedRule = 'mix'" :class="[
            'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
            selectedRule === 'mix'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]">
            <span>Mix (cả hai)</span>
            <span>{{ selectedRule === 'mix' ? '✓' : '' }}</span>
          </button>
        </div>
      </div>

      <!-- Advanced Options for Five Shu levels -->
      <div v-if="isNguDuLevel" class="space-y-4 pt-2 border-t border-color">
        <h4 class="text-sm font-bold text-accent">Tùy chỉnh độ khó</h4>

        <div class="flex flex-col gap-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="rotate" class="rounded border-gray-300 text-accent focus:ring-accent" />
            <span class="text-sm">Xoay vòng vị trí huyệt (Rotate)</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="shuffle" class="rounded border-gray-300 text-accent focus:ring-accent" />
            <span class="text-sm">Xáo trộn ngẫu nhiên (Shuffle)</span>
          </label>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Chọn Kinh lạc áp dụng</label>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="channel in availableChannels" :key="channel.id"
              class="flex items-center gap-2 p-2 bg-secondary rounded-lg border border-transparent hover:border-accent cursor-pointer transition-colors"
              :class="{ 'border-accent bg-accent/5': selectedChannels.includes(channel.id) }">
              <input type="checkbox" :value="channel.id" v-model="selectedChannels" class="hidden" />
              <div class="w-4 h-4 rounded border flex items-center justify-center"
                :class="selectedChannels.includes(channel.id) ? 'bg-accent border-accent text-white' : 'bg-white border-gray-300'">
                <span v-if="selectedChannels.includes(channel.id)" class="text-[10px]">✓</span>
              </div>
              <span class="text-xs truncate">{{ channel.ten }}</span>
            </label>
          </div>
          <p v-if="selectedChannels.length === 0" class="text-[10px] text-red-500 mt-1 italic">Vui lòng chọn ít nhất 1
            kinh lạc để bắt đầu.</p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <BaseButton variant="secondary" @click="emit('close')">
          Hủy
        </BaseButton>
        <BaseButton @click="handleStart" :disabled="isNguDuLevel && selectedChannels.length === 0">
          Bắt đầu
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
