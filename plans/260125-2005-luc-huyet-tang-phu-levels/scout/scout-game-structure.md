# Scout Report: Game Structure Analysis

**Date:** 2026-01-25  
**Task:** Understand game components and data structure for adding new levels

---

## Key Data Structures

### 1. LucHanhElement (Central Data Model)
**File:** `/Users/uspro/Projects/cclk-puzzle-game/src/data/knowledge/luc-hanh.ts`

Single source of truth for all 6 elements. Each element contains:
- `id`: 'THO', 'KIM', 'THUY', 'THU', 'MOC', 'HOA'
- `thuTuTuongSinh`: 1-6 (forward order)
- `thuTuPhanSinh`: 6-1 (reverse order)
- `ten`: Element name (Thổ, Kim, Thủy...)
- `mauSac`, `mauChu`: Colors for UI
- `khi`: Lục Khí property (Thấp, Táo, Hàn...)
- `kinh`: Base Kinh (Thái Âm, Dương Minh...)
- `tang`: Organ Âm (Tỳ, Phế, Thận...)
- `phu`: Organ Dương (Đại Trường, Vị, Bàng Quang...)
- `kinhAm`: Full Kinh Âm name (Túc Thái Âm Tỳ...)
- `kinhDuong`: Full Kinh Dương name (Thủ Dương Minh Đại Trường...)

**Key:** All sequences derived from `LUC_HANH` array using `getSequence()` function.

### 2. Pre-generated Sequences
**File:** `/Users/uspro/Projects/cclk-puzzle-game/src/data/knowledge/luc-hanh.ts` (lines 143-156)

```typescript
LUC_HANH_SEQUENCE = getSequence('ten')
LUC_KHI_TINH_SEQUENCE = getSequence('khi')
LUC_KINH_BASE_SEQUENCE = getSequence('kinh')
LUC_TANG_SEQUENCE = getSequence('tang')
LUC_PHU_SEQUENCE = getSequence('phu')
KINH_AM_SEQUENCE = getSequence('kinhAm')
KINH_DUONG_SEQUENCE = getSequence('kinhDuong')
KINH_LAC_COMBINED_SEQUENCE = flatMap([Âm1, Dương1, Âm2, Dương2...])
```

### 3. Level Definition
**File:** `/Users/uspro/Projects/cclk-puzzle-game/src/types/index.ts` (lines 35-44)

```typescript
interface Level {
  id: string
  order: number
  title: string
  description: string
  topics: TopicType[]          // Maps to sequences
  rules: RuleType[]            // tuong_sinh | phan_sinh | tuong_khac
  unlocked: boolean
  reviewFromLevels?: string[]  // For spaced repetition (25%)
}
```

### 4. Topic to Sequence Mapping
**File:** `/Users/uspro/Projects/cclk-puzzle-game/src/data/rules.ts` (lines 72-91)

```typescript
function getSequenceForTopic(topicType: string): readonly string[] {
  'luc_hanh'      → LUC_HANH_SEQUENCE
  'luc_khi_tinh'  → LUC_KHI_TINH_SEQUENCE
  'luc_kinh_base' → LUC_KINH_BASE_SEQUENCE
  'luc_tang'      → LUC_TANG_SEQUENCE
  'luc_phu'       → LUC_PHU_SEQUENCE
  'kinh_am'       → KINH_AM_SEQUENCE
  'kinh_duong'    → KINH_DUONG_SEQUENCE
}
```

---

## Game Flow

### Question Generation (Spaced Repetition)
**File:** `/Users/uspro/Projects/cclk-puzzle-game/src/composables/use-game-logic.ts`

1. **generateMixedQuestions()** (lines 206-237):
   - 75% from current level topics
   - 25% from `reviewFromLevels` (if configured)
   - Randomly picks topic from `level.topics[]`
   - Randomly picks rule from `level.rules[]` ∩ `settings.enabledRules[]`

2. **generateQuestion()** (lines 43-119):
   - Picks random topic from level
   - Gets sequence via `getSequenceForTopic(topic)`
   - Picks target position (1-6)
   - Reveals N cards (settings.revealedCards: 1-3)
   - Calculates answer using `calculateAnswer()` with selected rule
   - Rotates sequence randomly for visual variety

3. **Comprehensive Mode** (lines 242-267):
   - Used by "Tổng hợp" level
   - Distributes questions proportionally across selected levels
   - No spaced repetition

### Answer Calculation Rules
**File:** `/Users/uspro/Projects/cclk-puzzle-game/src/data/rules.ts` (lines 21-67)

- **tuong_sinh**: Forward (targetIndex = knownIndex + distance)
- **phan_sinh**: Reverse (targetIndex = knownIndex - distance)
- **tuong_khac**: Opposing pairs (Thủy↔Hỏa, Thổ↔Thử, Kim↔Mộc)

### Gameplay Loop
**File:** `/Users/uspro/Projects/cclk-puzzle-game/src/views/GameView.vue`

1. `onMounted()`: Generate all questions upfront with spaced repetition
2. Display question with timer
3. Player answers → score calculated (time-based + hint penalty)
4. Auto-advance after 1.5s
5. Finish after N rounds → show stars (0-3 based on points %)

---

## How to Add New Level Types

### Option 1: Add New Topic (New Sequence)

**Steps:**
1. Add field to `LucHanhElement` interface (e.g., `huyet: string`)
2. Populate field in `LUC_HANH` array (6 values following tương sinh order)
3. Export sequence: `export const LUC_HUYET_SEQUENCE = getSequence('huyet')`
4. Add topic type to `/Users/uspro/Projects/cclk-puzzle-game/src/types/index.ts`:
   ```typescript
   export type TopicType = ... | 'luc_huyet'
   ```
5. Add mapping in `getSequenceForTopic()`:
   ```typescript
   case 'luc_huyet': return LUC_HUYET_SEQUENCE
   ```
6. Create level in `/Users/uspro/Projects/cclk-puzzle-game/src/data/levels/index.ts`:
   ```typescript
   {
     id: "level_8",
     order: 8,
     title: "Lục Huyết",
     topics: ["luc_huyet"],
     rules: ["tuong_sinh"],
     reviewFromLevels: ["level_3"]  // 25% from Tang
   }
   ```

### Option 2: Combined Topics (Like Kinh Lạc)

**Example:** "Lục Huyệt Tạng Phủ" mixing tang/phu/huyet

1. Add topic types (if needed)
2. Create level with multiple topics:
   ```typescript
   {
     id: "level_9",
     title: "Huyệt Tạng Phủ",
     topics: ["luc_tang", "luc_phu", "luc_huyet"],
     rules: ["tuong_sinh", "phan_sinh"],
     reviewFromLevels: ["level_3", "level_4", "level_8"]
   }
   ```
3. Question generator auto-picks random topic per question

### Option 3: Special Interleaved Sequence (Like KINH_LAC_COMBINED)

For patterns like [Tang1, Phu1, Huyet1, Tang2, Phu2, Huyet2...]:

1. Create custom sequence in `luc-hanh.ts`:
   ```typescript
   export const TANG_PHU_HUYET_COMBINED = LUC_HANH
     .sort((a, b) => a.thuTuTuongSinh - b.thuTuTuongSinh)
     .flatMap(e => [e.tang, e.phu, e.huyet])
   ```
2. Add new topic type `'tang_phu_huyet_combined'`
3. Map in `getSequenceForTopic()`
4. Create level using this topic

---

## Files Modified for New Levels

**Minimal Changes (Option 1):**
1. `/Users/uspro/Projects/cclk-puzzle-game/src/data/knowledge/luc-hanh.ts` - Add field + export sequence
2. `/Users/uspro/Projects/cclk-puzzle-game/src/types/index.ts` - Add TopicType
3. `/Users/uspro/Projects/cclk-puzzle-game/src/data/rules.ts` - Add getSequenceForTopic case
4. `/Users/uspro/Projects/cclk-puzzle-game/src/data/levels/index.ts` - Add level definition

**No changes needed:**
- Game logic (auto-handles any topic via mapping)
- UI components (topic-agnostic)
- Scoring system
- Spaced repetition

---

## Current Level Structure

```
level_1: Lục Hành          → luc_hanh
level_2: Lục Khí           → luc_khi_tinh + luc_kinh_base (reviews L1)
level_3: Lục Tạng          → luc_tang (reviews L1, L2)
level_4: Lục Phủ           → luc_phu (reviews L2, L3)
level_5: Lục Kinh Âm       → kinh_am (reviews L3)
level_6: Lục Kinh Dương    → kinh_duong (reviews L4, L5)
level_7: Kinh Lạc          → kinh_am + kinh_duong (reviews L5, L6)
tong_hop: Comprehensive    → all topics, user-selected levels
```

---

## Unresolved Questions

None. System well-structured for extension via `LUC_HANH` central model.
