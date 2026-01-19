<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useTheme } from '@/composables/use-theme'
import type { RuleType, AccentColor } from '@/types'

const emit = defineEmits<{
  close: []
}>()

const userStore = useUserStore()
const { setTheme } = useTheme()

// Local copies for editing
const revealedCards = ref(userStore.settings.revealedCards)
const enabledRules = ref<RuleType[]>([...userStore.settings.enabledRules])
const initialTime = ref(userStore.settings.initialTime)
const bonusTime = ref(userStore.settings.bonusTime)
const roundsPerLevel = ref(userStore.settings.roundsPerLevel)
const currentTheme = ref(userStore.settings.theme)
const accentColor = ref<AccentColor>(userStore.settings.accentColor || 'teal')

const allRules: { value: RuleType; label: string }[] = [
  { value: 'tuong_sinh', label: 'Tương Sinh' },
  { value: 'phan_sinh', label: 'Phản Sinh' },
  { value: 'tuong_khac', label: 'Tương Khắc' }
]

const accentColors: { value: AccentColor; label: string; bgClass: string }[] = [
  { value: 'blue', label: 'Xanh biển', bgClass: 'bg-blue-500' },
  { value: 'teal', label: 'Xanh lục', bgClass: 'bg-teal-500' },
  { value: 'emerald', label: 'Ngọc lục', bgClass: 'bg-emerald-500' },
  { value: 'violet', label: 'Tím', bgClass: 'bg-violet-500' },
  { value: 'amber', label: 'Vàng', bgClass: 'bg-amber-500' },
  { value: 'rose', label: 'Hồng', bgClass: 'bg-rose-500' }
]

const selectedAccentClass = computed(() => {
  const color = accentColors.find(c => c.value === accentColor.value)
  return color?.bgClass || 'bg-teal-500'
})

function toggleRule(rule: RuleType) {
  const index = enabledRules.value.indexOf(rule)
  if (index >= 0) {
    if (enabledRules.value.length > 1) {
      enabledRules.value.splice(index, 1)
    }
  } else {
    enabledRules.value.push(rule)
  }
}

function saveSettings() {
  userStore.updateSettings({
    revealedCards: revealedCards.value as 1 | 2 | 3,
    enabledRules: enabledRules.value,
    initialTime: initialTime.value,
    bonusTime: bonusTime.value,
    roundsPerLevel: roundsPerLevel.value,
    theme: currentTheme.value,
    accentColor: accentColor.value
  })
  setTheme(currentTheme.value)
  // Apply accent color
  document.documentElement.dataset.accent = accentColor.value
  emit('close')
}
</script>

<template>
  <div class="space-y-4">
    <!-- Difficulty -->
    <div>
      <label class="block text-sm font-medium mb-2">Số lá bài mở sẵn</label>
      <div class="flex gap-2">
        <button
          v-for="n in [1, 2, 3]"
          :key="n"
          @click="revealedCards = n as 1 | 2 | 3"
          :class="[
            'flex-1 py-2 rounded-lg font-medium transition-colors',
            revealedCards === n
              ? selectedAccentClass + ' text-white'
              : 'bg-gray-100 dark:bg-gray-700'
          ]"
        >
          {{ n }} lá
        </button>
      </div>
    </div>

    <!-- Rules -->
    <div>
      <label class="block text-sm font-medium mb-2">Quy luật áp dụng</label>
      <div class="space-y-2">
        <button
          v-for="rule in allRules"
          :key="rule.value"
          @click="toggleRule(rule.value)"
          :class="[
            'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
            enabledRules.includes(rule.value)
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700'
          ]"
        >
          <span>{{ rule.label }}</span>
          <span>{{ enabledRules.includes(rule.value) ? '✓' : '' }}</span>
        </button>
      </div>
    </div>

    <!-- Timer -->
    <div>
      <label class="block text-sm font-medium mb-2">
        Thời gian ban đầu: {{ initialTime }}s
      </label>
      <input
        v-model.number="initialTime"
        type="range"
        min="30"
        max="180"
        step="10"
        class="w-full accent-current"
      />
    </div>

    <!-- Bonus Time -->
    <div>
      <label class="block text-sm font-medium mb-2">
        Thời gian thưởng: +{{ bonusTime }}s
      </label>
      <input
        v-model.number="bonusTime"
        type="range"
        min="10"
        max="60"
        step="5"
        class="w-full accent-current"
      />
    </div>

    <!-- Rounds -->
    <div>
      <label class="block text-sm font-medium mb-2">
        Số câu hỏi/level: {{ roundsPerLevel }}
      </label>
      <input
        v-model.number="roundsPerLevel"
        type="range"
        min="5"
        max="20"
        step="1"
        class="w-full accent-current"
      />
    </div>

    <!-- Theme -->
    <div>
      <label class="block text-sm font-medium mb-2">Giao diện</label>
      <div class="flex gap-2">
        <button
          v-for="t in (['light', 'dark', 'system'] as const)"
          :key="t"
          @click="currentTheme = t"
          :class="[
            'flex-1 py-2 rounded-lg font-medium transition-colors',
            currentTheme === t
              ? selectedAccentClass + ' text-white'
              : 'bg-gray-100 dark:bg-gray-700'
          ]"
        >
          {{ t === 'light' ? 'Sáng' : t === 'dark' ? 'Tối' : 'Hệ thống' }}
        </button>
      </div>
    </div>

    <!-- Accent Color -->
    <div>
      <label class="block text-sm font-medium mb-2">Màu chủ đạo</label>
      <div class="grid grid-cols-6 gap-2">
        <button
          v-for="color in accentColors"
          :key="color.value"
          @click="accentColor = color.value"
          :class="[
            'aspect-square rounded-lg transition-all',
            color.bgClass,
            accentColor === color.value
              ? 'ring-2 ring-offset-2 ring-gray-800 dark:ring-white'
              : ''
          ]"
          :title="color.label"
        />
      </div>
    </div>

    <!-- Save Button -->
    <button
      @click="saveSettings"
      :class="[
        'w-full py-3 text-white font-medium rounded-lg transition-colors',
        selectedAccentClass
      ]"
    >
      Lưu cài đặt
    </button>
  </div>
</template>
