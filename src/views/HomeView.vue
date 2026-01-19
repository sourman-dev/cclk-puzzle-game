<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import LevelSelector from '@/components/layout/LevelSelector.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import SettingsView from './SettingsView.vue'

const showSettings = ref(false)

const emit = defineEmits<{
  startLevel: [levelId: string]
}>()

function handleSelectLevel(levelId: string) {
  emit('startLevel', levelId)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <AppHeader
      @open-settings="showSettings = true"
      @go-home="() => {}"
    />

    <main class="flex-1 flex flex-col items-center px-4 py-6">
      <h1 class="text-2xl font-bold mb-2">Châm Cứu Lục Khí</h1>
      <p class="text-secondary text-sm mb-6 text-center">
        Học quy luật Tương Sinh - Phản Sinh - Tương Khắc
      </p>

      <LevelSelector @select-level="handleSelectLevel" />
    </main>

    <!-- Settings Modal -->
    <BaseModal
      :open="showSettings"
      title="Cài đặt"
      @close="showSettings = false"
    >
      <SettingsView @close="showSettings = false" />
    </BaseModal>
  </div>
</template>
