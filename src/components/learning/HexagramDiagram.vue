<script setup lang="ts">
import { computed } from 'vue'
import { LUC_HANH } from '@/data/knowledge/luc-hanh'
import { LUC_TANG } from '@/data/knowledge/luc-tang'
import { LUC_PHU } from '@/data/knowledge/luc-phu'

type TopicType = 'luc_hanh' | 'luc_khi' | 'luc_kinh' | 'luc_tang' | 'luc_phu'

interface Props {
  selectedTopic: TopicType
}

const props = defineProps<Props>()

// Lục Khí descriptions
const KHI_DESCRIPTIONS: Record<string, string> = {
  'Thấp': 'Mát',
  'Táo': 'Khô',
  'Hàn': 'Lạnh',
  'Thử': 'Ấm',
  'Phong': 'Gió',
  'Hỏa': 'Nóng'
}

// Get secondary label based on topic
function getSecondaryLabel(element: typeof LUC_HANH[0]): string {
  switch (props.selectedTopic) {
    case 'luc_khi':
      return `${element.khi}/${KHI_DESCRIPTIONS[element.khi] || ''}`
    case 'luc_kinh':
      return element.kinh
    case 'luc_tang':
      return LUC_TANG.find(t => t.bo === element.ten)?.name || ''
    case 'luc_phu':
      return LUC_PHU.find(p => p.bo === element.ten)?.name || ''
    default:
      return ''
  }
}

// Elements sorted by tuong sinh order (1-6)
const elements = computed(() => {
  return [...LUC_HANH]
    .sort((a, b) => a.thuTuTuongSinh - b.thuTuTuongSinh)
    .map(el => ({
      ...el,
      secondaryLabel: getSecondaryLabel(el)
    }))
})
</script>

<template>
  <div class="w-full max-w-md">
    <!-- Cards grid (same as game) -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
      <div
        v-for="el in elements"
        :key="el.id"
        class="aspect-square rounded-xl flex flex-col items-center justify-center p-2 border-2"
        :style="{ backgroundColor: el.mauSac, color: el.mauChu, borderColor: el.mauSac }"
      >
        <span class="text-xs opacity-70">{{ el.thuTuTuongSinh }}</span>
        <span class="text-lg font-bold">{{ el.ten }}</span>
        <span v-if="el.secondaryLabel" class="text-xs text-center leading-tight mt-1">
          {{ el.secondaryLabel }}
        </span>
      </div>
    </div>

    <!-- Relationship arrows legend -->
    <div class="flex flex-col gap-2 text-sm px-2">
      <div class="flex items-center gap-2">
        <span class="text-blue-500 font-bold">→</span>
        <span class="text-secondary">Tương Sinh: 1→2→3→4→5→6→1 (thuận chiều)</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-red-500 font-bold">←</span>
        <span class="text-secondary">Phản Sinh: 6→5→4→3→2→1→6 (ngược chiều)</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-purple-500 font-bold">↔</span>
        <span class="text-secondary">Tương Khắc: 1↔4, 2↔5, 3↔6 (đối nhau)</span>
      </div>
    </div>
  </div>
</template>
