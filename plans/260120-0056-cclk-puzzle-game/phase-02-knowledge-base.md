# Phase 2: Knowledge Base

```yaml
status: pending
priority: high
estimated_files: 7
depends_on: phase-01
```

## Overview

Tạo knowledge base từ PDF analysis - định nghĩa sequences cho các chủ đề Lục Khí và level definitions.

## Context Links

- [Brainstorm Report](../reports/brainstorm-260120-0056-cclk-puzzle-game.md)
- [Phase 1: Foundation](./phase-01-foundation-setup.md)

## Key Knowledge from PDF

### Quy Luật Tương Sinh (Lục Khí)
```
Thổ → Kim → Thủy → Thử → Mộc → Hỏa → Thổ (loop)
```

### Quy Luật Phản Sinh (ngược Tương Sinh)
```
Thổ ← Kim ← Thủy ← Thử ← Mộc ← Hỏa ← Thổ
```

### Quy Luật Tương Khắc
```
Thủy ↔ Hỏa (khắc nhau)
Thổ ↔ Thử (khắc nhau)
Kim ↔ Mộc (khắc nhau)
```

### 6 Tạng (Âm) - theo Bộ
| Bộ | Tạng | Hành |
|----|------|------|
| Thổ | Tỳ | Thổ |
| Kim | Phế | Kim |
| Thủy | Thận | Thủy |
| Thử | Tâm Bào Lạc | Thử |
| Mộc | Can | Mộc |
| Hỏa | Tâm | Hỏa |

### 6 Phủ (Dương) - theo Bộ
| Bộ | Phủ | Hành |
|----|-----|------|
| Thổ | Đại Trường | Kim |
| Kim | Vị | Thổ |
| Thủy | Bàng Quang | Thủy |
| Thử | Tam Tiêu | Thử |
| Mộc | Đởm | Mộc |
| Hỏa | Tiểu Trường | Hỏa |

### 6 Đường Kinh Âm - theo Bộ (Tương Sinh)
```
Thổ: Túc Thái Âm Tỳ
Kim: Thủ Thái Âm Phế
Thủy: Túc Thiếu Âm Thận
Thử: Thủ Quyết Âm Tâm Bào
Mộc: Túc Quyết Âm Can
Hỏa: Thủ Thiếu Âm Tâm
```

### 6 Đường Kinh Dương - theo Bộ (Phản Sinh)
```
Thổ: Thủ Dương Minh Đại Trường
Kim: Túc Dương Minh Vị
Thủy: Túc Thái Dương Bàng Quang
Thử: Thủ Thiếu Dương Tam Tiêu
Mộc: Túc Thiếu Dương Đởm
Hỏa: Thủ Thái Dương Tiểu Trường
```

## Files to Create

| File | Purpose |
|------|---------|
| `src/data/knowledge/sequences.ts` | Base sequences (Ngũ Hành order) |
| `src/data/knowledge/luc-tang.ts` | 6 Tạng data |
| `src/data/knowledge/luc-phu.ts` | 6 Phủ data |
| `src/data/knowledge/kinh-lac.ts` | Kinh Lạc data |
| `src/data/levels/index.ts` | Level definitions |
| `src/data/rules.ts` | Rule application logic |

## Implementation Steps

### Step 1: Base Sequences

Create `src/data/knowledge/sequences.ts`:

```typescript
// Base sequence theo chiều Tương Sinh Lục Khí
export const NGU_HANH_SEQUENCE = ['Thổ', 'Kim', 'Thủy', 'Thử', 'Mộc', 'Hỏa'] as const

// Mapping vị trí (1-6) theo Tương Sinh
// Nếu position X = element, các position khác theo sequence
export type NguHanhElement = typeof NGU_HANH_SEQUENCE[number]

// Rule labels in Vietnamese
export const RULE_LABELS = {
  tuong_sinh: 'Tương Sinh',
  phan_sinh: 'Phản Sinh',
  tuong_khac: 'Tương Khắc'
} as const

// Các cặp tương khắc
export const TUONG_KHAC_PAIRS: [NguHanhElement, NguHanhElement][] = [
  ['Thủy', 'Hỏa'],
  ['Thổ', 'Thử'],
  ['Kim', 'Mộc']
]
```

### Step 2: Lục Tạng Data

Create `src/data/knowledge/luc-tang.ts`:

```typescript
import type { TopicType } from '@/types'

export interface TangData {
  name: string        // Tên Tạng
  shortName: string   // Viết tắt
  bo: string          // Bộ thuộc
  hanh: string        // Hành của Tạng
  kinhLac: string     // Kinh Lạc tương ứng
}

// 6 Tạng theo thứ tự Bộ (Tương Sinh)
export const LUC_TANG: TangData[] = [
  { name: 'Tỳ', shortName: 'Tỳ', bo: 'Thổ', hanh: 'Thổ', kinhLac: 'Túc Thái Âm Tỳ' },
  { name: 'Phế', shortName: 'Phế', bo: 'Kim', hanh: 'Kim', kinhLac: 'Thủ Thái Âm Phế' },
  { name: 'Thận', shortName: 'Thận', bo: 'Thủy', hanh: 'Thủy', kinhLac: 'Túc Thiếu Âm Thận' },
  { name: 'Tâm Bào Lạc', shortName: 'TBL', bo: 'Thử', hanh: 'Thử', kinhLac: 'Thủ Quyết Âm Tâm Bào' },
  { name: 'Can', shortName: 'Can', bo: 'Mộc', hanh: 'Mộc', kinhLac: 'Túc Quyết Âm Can' },
  { name: 'Tâm', shortName: 'Tâm', bo: 'Hỏa', hanh: 'Hỏa', kinhLac: 'Thủ Thiếu Âm Tâm' }
]

// Sequence chỉ lấy tên để dùng trong game
export const LUC_TANG_SEQUENCE = LUC_TANG.map(t => t.name)
export const LUC_TANG_SHORT_SEQUENCE = LUC_TANG.map(t => t.shortName)
```

### Step 3: Lục Phủ Data

Create `src/data/knowledge/luc-phu.ts`:

```typescript
export interface PhuData {
  name: string
  shortName: string
  bo: string          // Bộ thuộc (khác với Hành!)
  hanh: string        // Hành thật của Phủ
  kinhLac: string
  bieuLy: string      // Tạng biểu lý
}

// 6 Phủ theo thứ tự Bộ (Phản Sinh cho Kinh Dương)
export const LUC_PHU: PhuData[] = [
  { name: 'Đại Trường', shortName: 'ĐTr', bo: 'Thổ', hanh: 'Kim', kinhLac: 'Thủ Dương Minh Đại Trường', bieuLy: 'Phế' },
  { name: 'Vị', shortName: 'Vị', bo: 'Kim', hanh: 'Thổ', kinhLac: 'Túc Dương Minh Vị', bieuLy: 'Tỳ' },
  { name: 'Bàng Quang', shortName: 'BQ', bo: 'Thủy', hanh: 'Thủy', kinhLac: 'Túc Thái Dương Bàng Quang', bieuLy: 'Thận' },
  { name: 'Tam Tiêu', shortName: 'TTi', bo: 'Thử', hanh: 'Thử', kinhLac: 'Thủ Thiếu Dương Tam Tiêu', bieuLy: 'Tâm Bào Lạc' },
  { name: 'Đởm', shortName: 'Đởm', bo: 'Mộc', hanh: 'Mộc', kinhLac: 'Túc Thiếu Dương Đởm', bieuLy: 'Can' },
  { name: 'Tiểu Trường', shortName: 'TTr', bo: 'Hỏa', hanh: 'Hỏa', kinhLac: 'Thủ Thái Dương Tiểu Trường', bieuLy: 'Tâm' }
]

export const LUC_PHU_SEQUENCE = LUC_PHU.map(p => p.name)
export const LUC_PHU_SHORT_SEQUENCE = LUC_PHU.map(p => p.shortName)
```

### Step 4: Kinh Lạc Data

Create `src/data/knowledge/kinh-lac.ts`:

```typescript
export interface KinhLacData {
  name: string
  shortName: string
  loai: 'âm' | 'dương'
  bo: string
  tangPhu: string      // Tạng hoặc Phủ
  viTri: 'thủ' | 'túc' // Tay hoặc Chân
}

// 6 Kinh Âm theo Bộ (Tương Sinh)
export const KINH_AM: KinhLacData[] = [
  { name: 'Túc Thái Âm Tỳ', shortName: 'TThÂTỳ', loai: 'âm', bo: 'Thổ', tangPhu: 'Tỳ', viTri: 'túc' },
  { name: 'Thủ Thái Âm Phế', shortName: 'ThThÂPh', loai: 'âm', bo: 'Kim', tangPhu: 'Phế', viTri: 'thủ' },
  { name: 'Túc Thiếu Âm Thận', shortName: 'TThiÂTh', loai: 'âm', bo: 'Thủy', tangPhu: 'Thận', viTri: 'túc' },
  { name: 'Thủ Quyết Âm Tâm Bào', shortName: 'ThQÂTB', loai: 'âm', bo: 'Thử', tangPhu: 'Tâm Bào Lạc', viTri: 'thủ' },
  { name: 'Túc Quyết Âm Can', shortName: 'TQÂCan', loai: 'âm', bo: 'Mộc', tangPhu: 'Can', viTri: 'túc' },
  { name: 'Thủ Thiếu Âm Tâm', shortName: 'ThThiÂT', loai: 'âm', bo: 'Hỏa', tangPhu: 'Tâm', viTri: 'thủ' }
]

// 6 Kinh Dương theo Bộ (Phản Sinh - ngược chiều)
export const KINH_DUONG: KinhLacData[] = [
  { name: 'Thủ Dương Minh Đại Trường', shortName: 'ThDMĐTr', loai: 'dương', bo: 'Thổ', tangPhu: 'Đại Trường', viTri: 'thủ' },
  { name: 'Túc Dương Minh Vị', shortName: 'TDMVị', loai: 'dương', bo: 'Kim', tangPhu: 'Vị', viTri: 'túc' },
  { name: 'Túc Thái Dương Bàng Quang', shortName: 'TThDBQ', loai: 'dương', bo: 'Thủy', tangPhu: 'Bàng Quang', viTri: 'túc' },
  { name: 'Thủ Thiếu Dương Tam Tiêu', shortName: 'ThThiDTT', loai: 'dương', bo: 'Thử', tangPhu: 'Tam Tiêu', viTri: 'thủ' },
  { name: 'Túc Thiếu Dương Đởm', shortName: 'TThiDĐ', loai: 'dương', bo: 'Mộc', tangPhu: 'Đởm', viTri: 'túc' },
  { name: 'Thủ Thái Dương Tiểu Trường', shortName: 'ThThDTTr', loai: 'dương', bo: 'Hỏa', tangPhu: 'Tiểu Trường', viTri: 'thủ' }
]

export const KINH_AM_SEQUENCE = KINH_AM.map(k => k.tangPhu)
export const KINH_DUONG_SEQUENCE = KINH_DUONG.map(k => k.tangPhu)
```

### Step 5: Rules Logic

Create `src/data/rules.ts`:

```typescript
import type { RuleType } from '@/types'
import { NGU_HANH_SEQUENCE, TUONG_KHAC_PAIRS } from './knowledge/sequences'

/**
 * Tính giá trị tại position dựa trên:
 * - sequence: mảng 6 phần tử theo thứ tự Tương Sinh
 * - knownPosition: vị trí đã biết (1-6)
 * - knownValue: giá trị tại vị trí đã biết
 * - targetPosition: vị trí cần tìm (1-6)
 * - rule: quy luật áp dụng
 */
export function calculateAnswer(
  sequence: readonly string[],
  knownPosition: number,
  knownValue: string,
  targetPosition: number,
  rule: RuleType
): string {
  // Tìm index của knownValue trong sequence
  const knownIndex = sequence.indexOf(knownValue)
  if (knownIndex === -1) {
    throw new Error(`Value "${knownValue}" not found in sequence`)
  }

  // Tính khoảng cách giữa 2 positions
  const distance = targetPosition - knownPosition

  let targetIndex: number

  switch (rule) {
    case 'tuong_sinh':
      // Theo chiều thuận của sequence
      targetIndex = (knownIndex + distance + 6) % 6
      break

    case 'phan_sinh':
      // Ngược chiều của sequence
      targetIndex = (knownIndex - distance + 6) % 6
      break

    case 'tuong_khac':
      // Tìm phần tử khắc với knownValue
      // Chỉ áp dụng khi targetPosition cách knownPosition 3 vị trí
      const pair = TUONG_KHAC_PAIRS.find(
        ([a, b]) => a === knownValue || b === knownValue
      )
      if (pair) {
        return pair[0] === knownValue ? pair[1] : pair[0]
      }
      // Fallback to tuong_sinh if no khac pair
      targetIndex = (knownIndex + distance + 6) % 6
      break

    default:
      targetIndex = (knownIndex + distance + 6) % 6
  }

  return sequence[targetIndex]
}

/**
 * Lấy sequence phù hợp cho topic
 */
export function getSequenceForTopic(topicType: string): readonly string[] {
  // Import dynamically to avoid circular deps
  const { LUC_TANG_SEQUENCE } = require('./knowledge/luc-tang')
  const { LUC_PHU_SEQUENCE } = require('./knowledge/luc-phu')
  const { KINH_AM_SEQUENCE, KINH_DUONG_SEQUENCE } = require('./knowledge/kinh-lac')

  switch (topicType) {
    case 'ngu_hanh':
      return NGU_HANH_SEQUENCE
    case 'luc_tang':
      return LUC_TANG_SEQUENCE
    case 'luc_phu':
      return LUC_PHU_SEQUENCE
    case 'kinh_am':
      return KINH_AM_SEQUENCE
    case 'kinh_duong':
      return KINH_DUONG_SEQUENCE
    default:
      return NGU_HANH_SEQUENCE
  }
}
```

### Step 6: Level Definitions

Create `src/data/levels/index.ts`:

```typescript
import type { Level } from '@/types'

export const LEVELS: Level[] = [
  {
    id: 'level_1',
    order: 1,
    title: 'Ngũ Hành Cơ Bản',
    description: 'Học quy luật Tương Sinh của Ngũ Hành: Thổ → Kim → Thủy → Thử → Mộc → Hỏa',
    topics: ['ngu_hanh'],
    rules: ['tuong_sinh'],
    unlocked: true
  },
  {
    id: 'level_2',
    order: 2,
    title: 'Ngũ Hành Nâng Cao',
    description: 'Thêm quy luật Phản Sinh và Tương Khắc',
    topics: ['ngu_hanh'],
    rules: ['tuong_sinh', 'phan_sinh', 'tuong_khac'],
    unlocked: false,
    reviewFromLevels: ['level_1']
  },
  {
    id: 'level_3',
    order: 3,
    title: 'Lục Tạng',
    description: '6 Tạng (Âm): Tỳ, Phế, Thận, Tâm Bào Lạc, Can, Tâm theo Bộ',
    topics: ['luc_tang'],
    rules: ['tuong_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_1', 'level_2']
  },
  {
    id: 'level_4',
    order: 4,
    title: 'Lục Phủ',
    description: '6 Phủ (Dương): Đại Trường, Vị, Bàng Quang, Tam Tiêu, Đởm, Tiểu Trường',
    topics: ['luc_phu'],
    rules: ['tuong_sinh', 'phan_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_2', 'level_3']
  },
  {
    id: 'level_5',
    order: 5,
    title: 'Kinh Âm',
    description: '6 Kinh Âm theo chiều Tương Sinh',
    topics: ['kinh_am'],
    rules: ['tuong_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_3']
  },
  {
    id: 'level_6',
    order: 6,
    title: 'Kinh Dương',
    description: '6 Kinh Dương theo chiều Phản Sinh',
    topics: ['kinh_duong'],
    rules: ['phan_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_4', 'level_5']
  }
]

export function getLevelById(id: string): Level | undefined {
  return LEVELS.find(l => l.id === id)
}

export function getNextLevel(currentId: string): Level | undefined {
  const current = LEVELS.find(l => l.id === currentId)
  if (!current) return undefined
  return LEVELS.find(l => l.order === current.order + 1)
}
```

## Todo List

- [ ] Create `src/data/knowledge/sequences.ts`
- [ ] Create `src/data/knowledge/luc-tang.ts`
- [ ] Create `src/data/knowledge/luc-phu.ts`
- [ ] Create `src/data/knowledge/kinh-lac.ts`
- [ ] Create `src/data/rules.ts`
- [ ] Create `src/data/levels/index.ts`
- [ ] Verify sequences match PDF content
- [ ] Run TypeScript compiler to check types

## Success Criteria

- [ ] All sequences match PDF knowledge
- [ ] calculateAnswer() returns correct values
- [ ] 6 levels defined with proper progression
- [ ] Spaced repetition via reviewFromLevels
- [ ] TypeScript compiles without errors
