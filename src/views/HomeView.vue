<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import LevelSelector from '@/components/layout/LevelSelector.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import SettingsView from './SettingsView.vue'
import LevelStartDialog from '@/components/game/LevelStartDialog.vue'
import ComprehensiveLevelDialog from '@/components/game/ComprehensiveLevelDialog.vue'
import { getLevelById } from '@/data/levels'
import type { Level, LevelOptions } from '@/types'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const showSettings = ref(false)
const showLevelDialog = ref(false)
const showComprehensiveDialog = ref(false)
const selectedLevelId = ref<string | null>(null)

const selectedLevel = computed<Level | null>(() =>
  selectedLevelId.value ? getLevelById(selectedLevelId.value) || null : null
)

const emit = defineEmits<{
  startLevel: [levelId: string, options: LevelOptions]
  startComprehensive: [levelIds: string[], options: LevelOptions]
  openLearning: []
}>()

function handleSelectLevel(levelId: string) {
  selectedLevelId.value = levelId
  const level = getLevelById(levelId)

  // Skip dialog for basic Five Shu points levels (Element guessing)
  if (
    level?.topics.includes("ngu_du_tang") ||
    level?.topics.includes("ngu_du_phu")
  ) {
    handleStartLevel({ rules: ["tuong_sinh"], rounds: userStore.settings.roundsPerLevel });
    return;
  }

  showLevelDialog.value = true
}

function handleSelectComprehensive() {
  showComprehensiveDialog.value = true
}

function handleStartLevel(options: LevelOptions) {
  if (selectedLevelId.value) {
    showLevelDialog.value = false
    emit('startLevel', selectedLevelId.value, options)
  }
}

function handleStartComprehensive(levelIds: string[], options: LevelOptions) {
  showComprehensiveDialog.value = false
  emit('startComprehensive', levelIds, options)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <AppHeader @open-settings="showSettings = true" @go-home="() => { }" />

    <main class="flex-1 flex flex-col items-center px-4 py-6">
      <h1 class="text-2xl font-bold mb-2">Châm Cứu Lục Khí</h1>
      <p class="text-secondary text-sm mb-4 text-center">
        Học quy luật Tương Sinh - Phản Sinh - Tương Khắc
      </p>

      <button @click="emit('openLearning')"
        class="mb-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2">
        📖 Học tập Lục Khí
      </button>

      <LevelSelector @select-level="handleSelectLevel" @select-comprehensive="handleSelectComprehensive" />
    </main>

    <!-- Settings Modal -->
    <BaseModal :open="showSettings" title="Cài đặt" @close="showSettings = false">
      <SettingsView @close="showSettings = false" />
    </BaseModal>

    <!-- Level Start Dialog -->
    <LevelStartDialog :open="showLevelDialog" :level="selectedLevel" @close="showLevelDialog = false"
      @start="handleStartLevel" />

    <!-- Comprehensive Level Dialog -->
    <ComprehensiveLevelDialog :open="showComprehensiveDialog" @close="showComprehensiveDialog = false"
      @start="handleStartComprehensive" />
  </div>
</template>
