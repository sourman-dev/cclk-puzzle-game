# Phase 2: Huyet Question Generation

## Context Links

- Phase 1: `./phase-01-data-structure.md`
- Data: `src/data/knowledge/ngu-du-huyet.ts` (created in Phase 1)
- Current logic: `src/composables/use-game-logic.ts`
- Rules: `src/data/rules.ts`

## Overview

- **Priority**: P1 (core game logic)
- **Status**: pending
- **Effort**: 45 minutes

Create specialized question generation for Huyet levels with different mechanics.

## Key Insights

Huyet levels differ from existing levels:
- **Variable card count**: 5 for Tang, 6 for Phu (not always 6)
- **No rule selection**: Only Tuong Sinh applies
- **Card labels**: Show point type (Tinh/Vinh/Du...) not position (1-6)
- **Answer options**: Show acupoint names with elements
- **Title format**: "Kinh [Organ] (Bo [Element])"

## Requirements

### Functional
- Generate question for random Kinh (meridian)
- Reveal 2 cards showing point names
- Target 1 card with "?" for user to guess
- All answer options from same Kinh's points
- Apply Tuong Sinh rule only

### Non-functional
- Reuse existing scoring system
- Integrate with spaced repetition (reviewFromLevels)
- Type-safe question generation

## Architecture

```typescript
// New topic types
export type TopicType = ... | 'luc_huyet_tang' | 'luc_huyet_phu'

// Extended Question interface for Huyet mode
interface HuyetQuestion extends Question {
  isHuyetMode: true
  kinhTitle: string              // "Kinh Tam (Bo Hoa)"
  pointTypes: string[]           // ['Tinh', 'Vinh', 'Du', 'Kinh', 'Hop']
  cardCount: 5 | 6
}

// Question generator
function generateHuyetQuestion(
  levelType: 'tang' | 'phu',
  settings: GameSettings
): HuyetQuestion
```

## Related Code Files

### Modify
- `src/types/index.ts` - Add HuyetQuestion type, new TopicType values
- `src/composables/use-game-logic.ts` - Add generateHuyetQuestion()
- `src/data/rules.ts` - Add topic mapping for huyet types

## Implementation Steps

1. **Update types/index.ts**:
   ```typescript
   export type TopicType = ... | 'luc_huyet_tang' | 'luc_huyet_phu'

   export interface HuyetCard extends Card {
     pointType?: string  // 'Tinh', 'Vinh', etc.
   }

   export interface Question {
     // existing fields...
     isHuyetMode?: boolean
     kinhTitle?: string
     pointTypes?: string[]
     cardCount?: 5 | 6
   }
   ```

2. **Add generateHuyetQuestion() in use-game-logic.ts**:
   - Import NGU_DU_HUYET_TANG/PHU from ngu-du-huyet.ts
   - Pick random Kinh from appropriate array
   - Create cards with pointType field
   - Pick 2 revealed + 1 target from available points
   - Build answers array from Kinh's points
   - Set isHuyetMode=true, kinhTitle, pointTypes, cardCount

3. **Integrate with generateMixedQuestions()**:
   - Check if level.topics contains 'luc_huyet_tang' or 'luc_huyet_phu'
   - Route to generateHuyetQuestion() instead of generateQuestion()

4. **Update getSequenceForTopic() in rules.ts** (optional):
   - May not need since Huyet uses different flow

## Todo List

- [ ] Add new TopicType values in types/index.ts
- [ ] Add HuyetCard/HuyetQuestion fields to interfaces
- [ ] Create generateHuyetQuestion() function
- [ ] Pick random Kinh and select points
- [ ] Build answer options from same Kinh
- [ ] Set kinhTitle format "Kinh [Organ] (Bo [Element])"
- [ ] Integrate with level detection in generateMixedQuestions()
- [ ] Test with mock level to verify question shape

## Success Criteria

- [ ] generateHuyetQuestion() returns valid HuyetQuestion
- [ ] Cards have pointType field populated
- [ ] Answers contain all points from selected Kinh
- [ ] kinhTitle formatted correctly
- [ ] cardCount = 5 for Tang, 6 for Phu
- [ ] Only Tuong Sinh rule used (no rule randomization)

## Risk Assessment

- **Medium risk**: New parallel path in question generation
- **Potential issue**: Mixing Huyet and regular questions in comprehensive mode
- **Mitigation**: Use topic type check to route correctly

## Security Considerations

None - read-only game logic.

## Next Steps

After completion, proceed to Phase 3 for UI component updates.
