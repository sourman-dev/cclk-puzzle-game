# Phase 4: Level Integration

## Context Links

- Levels file: `src/data/levels/index.ts`
- LevelStartDialog: `src/components/game/LevelStartDialog.vue`
- GameView: `src/views/GameView.vue`
- Phase 1-3: Prerequisites

## Overview

- **Priority**: P1 (final wiring)
- **Status**: pending
- **Effort**: 30 minutes

Wire up the new levels, remove old level_7, and handle special Huyet level flow.

## Key Insights

Special handling for Huyet levels:
- Skip rule selection dialog (only Tuong Sinh applies)
- Auto-start with default settings
- Title shows per-question Kinh name (handled in GameView)

## Requirements

### Functional
- Remove level_7 (Kinh Lac) from LEVELS array
- Add level_7 (Luc Huyet Tang) with 'luc_huyet_tang' topic
- Add level_8 (Luc Huyet Phu) with 'luc_huyet_phu' topic
- Skip LevelStartDialog for Huyet levels
- No reviewFromLevels for Huyet (no spaced repetition)

### Non-functional
- Level order maintained (1-8)
- Unlock progression preserved
- Comprehensive level updated to include new topics

## Architecture

### New Level Definitions

```typescript
// Replace existing level_7
{
  id: "level_7",
  order: 7,
  title: "Luc Huyet Tang",
  description: "Ngu Du Huyet cua 6 Tang (Am): Tinh, Vinh, Du, Kinh, Hop",
  topics: ["luc_huyet_tang"],
  rules: ["tuong_sinh"],  // Only one rule
  unlocked: false,
  // No reviewFromLevels - fresh topic
}

// Add new level_8
{
  id: "level_8",
  order: 8,
  title: "Luc Huyet Phu",
  description: "Ngu Du Huyet cua 6 Phu (Duong): Tinh, Vinh, Du, Nguyen, Kinh, Hop",
  topics: ["luc_huyet_phu"],
  rules: ["tuong_sinh"],
  unlocked: false,
  reviewFromLevels: ["level_7"],  // Review Tang points
}
```

### Dialog Skip Logic

```typescript
// In LevelSelector or wherever level is selected
const isHuyetLevel = (level: Level) =>
  level.topics.includes('luc_huyet_tang') ||
  level.topics.includes('luc_huyet_phu')

// Skip dialog, start directly
if (isHuyetLevel(selectedLevel)) {
  startGame(selectedLevel.id, ['tuong_sinh'], 10)
} else {
  showLevelStartDialog.value = true
}
```

## Related Code Files

### Modify
- `src/data/levels/index.ts` - Replace level_7, add level_8, update COMPREHENSIVE_LEVEL
- `src/components/layout/LevelSelector.vue` - Skip dialog for Huyet levels
- `src/views/HomeView.vue` or wherever level selection happens

## Implementation Steps

1. **Update src/data/levels/index.ts**:
   ```typescript
   // Remove old level_7 (Kinh Lac)
   // Replace with:
   {
     id: "level_7",
     order: 7,
     title: "Lục Huyệt Tạng",
     description: "Ngũ Du Huyệt của 6 Tạng (Âm): Tĩnh, Vinh, Du, Kinh, Hợp",
     topics: ["luc_huyet_tang"],
     rules: ["tuong_sinh"],
     unlocked: false,
   },
   {
     id: "level_8",
     order: 8,
     title: "Lục Huyệt Phủ",
     description: "Ngũ Du Huyệt của 6 Phủ (Dương): Tĩnh, Vinh, Du, Nguyên, Kinh, Hợp",
     topics: ["luc_huyet_phu"],
     rules: ["tuong_sinh"],
     unlocked: false,
     reviewFromLevels: ["level_7"],
   },
   ```

2. **Update COMPREHENSIVE_LEVEL topics**:
   ```typescript
   topics: [
     "luc_hanh",
     "luc_khi_tinh",
     "luc_kinh_base",
     "luc_tang",
     "luc_phu",
     "kinh_am",
     "kinh_duong",
     "luc_huyet_tang",   // Add
     "luc_huyet_phu",    // Add
   ],
   ```

3. **Add Huyet level detection helper**:
   ```typescript
   export function isHuyetLevel(level: Level): boolean {
     return level.topics.some(t =>
       t === 'luc_huyet_tang' || t === 'luc_huyet_phu'
     )
   }
   ```

4. **Update LevelSelector.vue**:
   - Import isHuyetLevel helper
   - When level selected, check if Huyet level
   - If Huyet: emit start directly with tuong_sinh rule
   - If not: show LevelStartDialog as usual

5. **Verify unlock chain**:
   - level_6 completion should unlock level_7
   - level_7 completion should unlock level_8

## Todo List

- [ ] Remove old level_7 (Kinh Lac) definition
- [ ] Add new level_7 (Luc Huyet Tang)
- [ ] Add level_8 (Luc Huyet Phu)
- [ ] Update COMPREHENSIVE_LEVEL topics array
- [ ] Create isHuyetLevel() helper function
- [ ] Update LevelSelector to skip dialog for Huyet
- [ ] Verify level unlocking works correctly
- [ ] Test level_7 starts without dialog
- [ ] Test level_8 starts without dialog
- [ ] Test comprehensive mode includes Huyet questions

## Success Criteria

- [ ] Level 7 shows "Luc Huyet Tang" in selector
- [ ] Level 8 shows "Luc Huyet Phu" in selector
- [ ] Clicking Huyet level starts game immediately (no dialog)
- [ ] Huyet levels use only Tuong Sinh rule
- [ ] Level progression: 6 -> 7 -> 8 works
- [ ] Comprehensive mode can include Huyet topics
- [ ] Old level_7 (Kinh Lac) completely removed

## Risk Assessment

- **Low risk**: Level definitions are straightforward
- **Medium risk**: Dialog skip logic may need careful placement
- **Mitigation**: Use helper function for consistent detection

## Security Considerations

None - game configuration only.

## Next Steps

After completion:
1. Run full test of all levels
2. Verify question generation for each level
3. Test mobile and desktop layouts
4. Build and deploy
