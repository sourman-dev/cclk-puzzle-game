# Phase 3: Dropdown Topic Selector

## Context
- Parent: [plan.md](./plan.md)
- Depends on: Phase 2

## Overview
- Priority: P2
- Status: pending
- Effort: 30m

## Requirements
1. Dropdown select below hexagram
2. Options: Lục Hành, Lục Khí, Lục Kinh, Lục Tạng, Lục Phủ
3. Selecting option updates hexagram secondary labels

## Topic Mapping

| Option | Key | Secondary Label Source |
|--------|-----|----------------------|
| Lục Hành | luc_hanh | (none, just element names) |
| Lục Khí | luc_khi | element.khi + description |
| Lục Kinh | luc_kinh | element.kinh |
| Lục Tạng | luc_tang | LUC_TANG[].name by bo |
| Lục Phủ | luc_phu | LUC_PHU[].name by bo |

### Lục Khí Descriptions
- Thấp → Mát
- Táo → Khô
- Hàn → Lạnh
- Thử → Ấm
- Phong → Gió
- Hỏa → Nóng

## Related Code Files

### Modify
- `src/views/LearningView.vue` - Add dropdown, pass selectedTopic to HexagramDiagram

## Implementation Steps

### 1. Add topic options constant
```typescript
const TOPIC_OPTIONS = [
  { value: 'luc_hanh', label: 'Lục Hành' },
  { value: 'luc_khi', label: 'Lục Khí' },
  { value: 'luc_kinh', label: 'Lục Kinh' },
  { value: 'luc_tang', label: 'Lục Tạng' },
  { value: 'luc_phu', label: 'Lục Phủ' },
]
```

### 2. Add selectedTopic ref
```typescript
const selectedTopic = ref<'luc_hanh' | 'luc_khi' | 'luc_kinh' | 'luc_tang' | 'luc_phu'>('luc_hanh')
```

### 3. Add select element in template
```vue
<select v-model="selectedTopic" class="mt-4 px-4 py-2 rounded-lg border ...">
  <option v-for="opt in TOPIC_OPTIONS" :key="opt.value" :value="opt.value">
    {{ opt.label }}
  </option>
</select>
```

### 4. Pass to HexagramDiagram
```vue
<HexagramDiagram :selected-topic="selectedTopic" />
```

## Todo List
- [ ] Define TOPIC_OPTIONS in LearningView
- [ ] Add selectedTopic ref with default 'luc_hanh'
- [ ] Add styled select dropdown
- [ ] Pass selectedTopic prop to HexagramDiagram
- [ ] Test topic switching updates labels

## Success Criteria
- Dropdown shows all 5 options
- Selecting option updates hexagram labels
- Default shows "Lục Hành" (element names only)
