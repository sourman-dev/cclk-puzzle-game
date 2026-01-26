# Phase 1: Ngu Du Huyet Data Structure

## Context Links

- Research: `./research/researcher-ngu-du-huyet-from-pdf.md`
- Scout: `./scout/scout-game-structure.md`
- Existing data: `src/data/knowledge/luc-hanh.ts`

## Overview

- **Priority**: P1 (blocker for other phases)
- **Status**: pending
- **Effort**: 45 minutes

Create the data structure for all 66 acupoints following the Ngu Du Huyet system.

## Key Insights

From research report:
- **Tang (Yin)**: 5 points per organ (Tinh, Vinh, Du, Kinh, Hop)
- **Phu (Yang)**: 6 points per organ (Tinh, Vinh, Du, Nguyen, Kinh, Hop)
- Element progression differs between Tang and Phu
- Total: 30 Tang points + 36 Phu points = 66 acupoints

## Requirements

### Functional
- Store all 66 acupoints with correct Vietnamese names
- Each point has: type, name, code, element
- Each Kinh (meridian) groups its points
- Support lookup by organ for question generation

### Non-functional
- Type-safe TypeScript interfaces
- Single source of truth (like LUC_HANH pattern)
- Exportable for use in rules.ts and levels

## Architecture

```typescript
// Types
interface AcuPoint {
  type: 'Tinh' | 'Vinh' | 'Du' | 'Nguyen' | 'Kinh' | 'Hop'
  name: string       // e.g., "An Bach"
  code: string       // e.g., "Ty1"
  element: string    // e.g., "Moc"
}

interface KinhMeridian {
  organ: string           // e.g., "Ty"
  organFull: string       // e.g., "Ty (Spleen)"
  type: 'Tang' | 'Phu'
  element: string         // e.g., "Tho"
  points: AcuPoint[]      // 5 for Tang, 6 for Phu
}

// Constants
export const NGU_DU_HUYET_TANG: KinhMeridian[]  // 6 Tang organs
export const NGU_DU_HUYET_PHU: KinhMeridian[]   // 6 Phu organs

// Helper
export function getKinhByOrgan(organ: string): KinhMeridian | undefined
```

## Related Code Files

### Create
- `src/data/knowledge/ngu-du-huyet.ts` - New file with all acupoint data

### Modify
- `src/types/index.ts` - Add new types (optional, can be inline)

## Implementation Steps

1. Create `src/data/knowledge/ngu-du-huyet.ts`
2. Define TypeScript interfaces: `AcuPoint`, `KinhMeridian`
3. Create `NGU_DU_HUYET_TANG` array with 6 Tang organs:
   - Ty (Spleen - Tho): 5 points
   - Phe (Lung - Kim): 5 points
   - Than (Kidney - Thuy): 5 points
   - Tam Bao Lac (Pericardium - Hoa): 5 points
   - Can (Liver - Moc): 5 points
   - Tam (Heart - Hoa): 5 points
4. Create `NGU_DU_HUYET_PHU` array with 6 Phu organs:
   - Vi (Stomach - Tho): 6 points
   - Dai Truong (Large Intestine - Kim): 6 points
   - Bang Quang (Bladder - Thuy): 6 points
   - Tam Tieu (Triple Burner - Hoa): 6 points
   - Dom (Gallbladder - Moc): 6 points
   - Tieu Truong (Small Intestine - Hoa): 6 points
5. Export helper functions for lookups
6. Add Vietnamese diacritics for display names

## Todo List

- [ ] Create ngu-du-huyet.ts file
- [ ] Define AcuPoint interface
- [ ] Define KinhMeridian interface
- [ ] Add all 6 Tang organs with 5 points each (30 points)
- [ ] Add all 6 Phu organs with 6 points each (36 points)
- [ ] Export lookup helper function
- [ ] Verify point names match PDF research
- [ ] Verify element assignments match Tuong Sinh order

## Success Criteria

- [ ] TypeScript compiles without errors
- [ ] All 66 acupoints present
- [ ] Point type order: Tinh → Vinh → Du → (Nguyen) → Kinh → Hop
- [ ] Helper function returns correct Kinh by organ name
- [ ] Vietnamese diacritics correct for display

## Risk Assessment

- **Low risk**: Self-contained data file
- **Potential issue**: Typos in Vietnamese names
- **Mitigation**: Cross-reference with PDF research report

## Security Considerations

None - static readonly data.

## Next Steps

After completion, proceed to Phase 2 for question generation logic.
