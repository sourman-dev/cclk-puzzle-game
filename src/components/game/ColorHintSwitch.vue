<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const colorHintEnabled = computed(() => userStore.settings.colorHintEnabled)

function toggle() {
  userStore.updateSettings({ colorHintEnabled: !colorHintEnabled.value })
}
</script>

<template>
  <button
    @click="toggle"
    :class="[
      'flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors',
      colorHintEnabled
        ? 'bg-amber-500 text-white'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
    ]"
    title="Bật/tắt gợi ý màu sắc"
  >
    <span>🎨</span>
    <span class="hidden sm:inline">Màu</span>
  </button>
</template>
