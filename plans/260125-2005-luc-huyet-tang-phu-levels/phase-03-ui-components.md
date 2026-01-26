# Phase 3: UI Component Modifications

## Context Links

- Current CardGrid: `src/components/game/CardGrid.vue`
- Current GameCard: `src/components/game/GameCard.vue`
- GameView: `src/views/GameView.vue`
- Phase 2: `./phase-02-game-logic.md`

## Overview

- **Priority**: P1 (visual changes)
- **Status**: pending
- **Effort**: 60 minutes

Modify UI components to support dynamic card counts and point type labels.

## Key Insights

Current implementation:
- CardGrid hardcoded to 6 columns
- GameCard shows position number (1-6)
- No support for custom labels

Required changes:
- Dynamic grid: 5 columns for Tang, 6 for Phu
- Card label: Show point type (Tinh/Vinh/Du...) instead of position
- Title bar: Show Kinh name with element

## Requirements

### Functional
- CardGrid adapts columns based on card count (5 or 6)
- GameCard displays pointType when available
- GameView header shows kinhTitle for Huyet modes

### Non-functional
- Backward compatible with existing 6-card levels
- Responsive design maintained
- Card sizing consistent

## Architecture

### CardGrid Changes

```vue
<script setup>
interface Props {
  cards: Card[]
  correctAnswer?: string
  cardCount?: 5 | 6  // New prop
}
</script>

<template>
  <div :class="gridClass">
    <!-- cards -->
  </div>
</template>
```

Grid classes:
- 6 cards: `grid-cols-3 sm:grid-cols-6`
- 5 cards: `grid-cols-5` (no mobile breakpoint needed)

### GameCard Changes

```vue
<script setup>
interface Props {
  card: Card & { pointType?: string }  // Extended
  // ...existing
}

const displayLabel = computed(() => {
  return props.card.pointType || props.card.position
})
</script>

<template>
  <!-- Hidden card face -->
  <span>{{ displayLabel }}</span>

  <!-- Revealed card face -->
  <span>{{ displayLabel }}</span>
  <span>{{ card.value }}</span>
</template>
```

### GameView Header

```vue
<!-- Dynamic title -->
<span class="font-semibold">
  {{ currentQuestion?.kinhTitle || level?.title }}
</span>
```

## Related Code Files

### Modify
- `src/components/game/CardGrid.vue` - Add cardCount prop, dynamic grid
- `src/components/game/GameCard.vue` - Support pointType label
- `src/views/GameView.vue` - Show kinhTitle in header

## Implementation Steps

1. **Update CardGrid.vue**:
   ```vue
   <script setup lang="ts">
   interface Props {
     cards: Card[]
     correctAnswer?: string
   }

   const props = defineProps<Props>()

   const gridClass = computed(() => {
     const count = props.cards.length
     if (count === 5) {
       return 'grid grid-cols-5 gap-2 sm:gap-3 w-full max-w-lg mx-auto'
     }
     return 'grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 w-full max-w-lg mx-auto'
   })
   </script>

   <template>
     <div :class="gridClass">
       <!-- GameCard loop -->
     </div>
   </template>
   ```

2. **Update GameCard.vue**:
   ```vue
   <script setup lang="ts">
   // Add to Card interface expectation
   interface ExtendedCard extends Card {
     pointType?: string
   }

   interface Props {
     card: ExtendedCard
     // ...existing
   }

   const displayLabel = computed(() => {
     return props.card.pointType || String(props.card.position)
   })
   </script>

   <template>
     <!-- Front (hidden) -->
     <span class="text-xl font-bold">{{ displayLabel }}</span>

     <!-- Back (revealed) -->
     <span class="text-xs">{{ displayLabel }}</span>
     <span class="font-bold">{{ card.value }}</span>
   </template>
   ```

3. **Update GameView.vue header**:
   ```vue
   <header>
     <span class="font-semibold">
       {{ currentQuestion?.kinhTitle || level?.title }}
     </span>
   </header>
   ```

4. **Adjust card sizing for 5-card grid**:
   - Cards in 5-column grid may need slight width adjustment
   - Test on mobile viewport

## Todo List

- [ ] Add gridClass computed in CardGrid.vue
- [ ] Support 5-column grid layout
- [ ] Add pointType to Card interface in types
- [ ] Add displayLabel computed in GameCard.vue
- [ ] Show pointType label on hidden card face
- [ ] Show pointType label on revealed card face
- [ ] Update GameView header with kinhTitle
- [ ] Test 5-card layout on mobile
- [ ] Test 6-card layout unchanged
- [ ] Verify card text sizing with Vietnamese point types

## Success Criteria

- [ ] 5-card grid displays correctly (single row)
- [ ] 6-card grid unchanged (3x2 on mobile, 1x6 on desktop)
- [ ] Point type labels (Tinh/Vinh/Du...) display on cards
- [ ] Position numbers still work for non-Huyet levels
- [ ] Header shows Kinh title for Huyet questions
- [ ] Cards are properly sized and readable

## Risk Assessment

- **Low risk**: CSS-only grid changes
- **Medium risk**: Card text overflow with long Vietnamese names
- **Mitigation**: Use textSizeClass computed (already exists)

## Security Considerations

None - UI display only.

## Next Steps

After completion, proceed to Phase 4 for level integration.
