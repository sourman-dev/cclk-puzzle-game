# Phase 1: Learning View Setup

## Context
- Parent: [plan.md](./plan.md)
- Current App.vue uses component switching, not router

## Overview
- Priority: P1
- Status: pending
- Effort: 30m

## Requirements
1. Create LearningView.vue with header and placeholder
2. Add 'learning' screen type to App.vue
3. Add "Học tập" navigation button in HomeView

## Related Code Files

### Modify
- `src/App.vue` - Add Screen type 'learning', import LearningView
- `src/views/HomeView.vue` - Add navigation button

### Create
- `src/views/LearningView.vue` - New learning view

## Implementation Steps

### 1. Create LearningView.vue
```vue
<script setup lang="ts">
const emit = defineEmits<{ exit: [] }>()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <header class="flex items-center gap-4 px-4 py-3 pt-safe border-b border-color">
      <button @click="emit('exit')" class="text-xl">←</button>
      <span class="font-semibold">Học tập Lục Khí</span>
    </header>
    <main class="flex-1 flex flex-col items-center px-4 py-6">
      <!-- HexagramDiagram + Dropdown will go here -->
      <p class="text-secondary">Hexagram diagram placeholder</p>
    </main>
  </div>
</template>
```

### 2. Update App.vue
- Add `'learning'` to Screen type
- Import LearningView
- Add function `openLearning()` and `exitLearning()`
- Add `<LearningView v-else-if="currentScreen === 'learning'" @exit="exitLearning" />`

### 3. Update HomeView.vue
- Add emit for `openLearning`
- Add button below subtitle:
```vue
<button @click="emit('openLearning')" class="mb-4 px-4 py-2 bg-accent rounded-lg">
  📖 Học tập Lục Khí
</button>
```

## Todo List
- [ ] Create src/views/LearningView.vue
- [ ] Update App.vue Screen type and add learning screen
- [ ] Add "Học tập" button in HomeView.vue
- [ ] Test navigation flow

## Success Criteria
- Clicking "Học tập" shows LearningView
- Back button returns to HomeView
- Build passes without errors
