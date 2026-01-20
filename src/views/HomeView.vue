<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import LevelSelector from '@/components/layout/LevelSelector.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import SettingsView from './SettingsView.vue'
import LevelStartDialog from '@/components/game/LevelStartDialog.vue'
import { getLevelById } from '@/data/levels'
import type { Level, RuleType } from '@/types'

const showSettings = ref(false)
const showLevelDialog = ref(false)
const selectedLevelId = ref<string | null>(null)

const selectedLevel = computed<Level | null>(() =>
  selectedLevelId.value ? getLevelById(selectedLevelId.value) || null : null
)

const emit = defineEmits<{
  startLevel: [levelId: string, rules: RuleType[], rounds: number]
}>()

function handleSelectLevel(levelId: string) {
  selectedLevelId.value = levelId
  showLevelDialog.value = true
}

function handleStartLevel(rules: RuleType[], rounds: number) {
  if (selectedLevelId.value) {
    showLevelDialog.value = false
    emit('startLevel', selectedLevelId.value, rules, rounds)
  }
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

    <!-- Level Start Dialog -->
    <LevelStartDialog
      :open="showLevelDialog"
      :level="selectedLevel"
      @close="showLevelDialog = false"
      @start="handleStartLevel"
    />
  </div>
</template>
