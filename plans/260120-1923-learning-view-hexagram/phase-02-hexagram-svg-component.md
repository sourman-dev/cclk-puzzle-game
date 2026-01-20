# Phase 2: Hexagram SVG Component

## Context
- Parent: [plan.md](./plan.md)
- Depends on: Phase 1

## Overview
- Priority: P1
- Status: pending
- Effort: 1h

## Key Insights

### Hexagram Geometry
6-pointed star = 2 overlapping equilateral triangles
- Triangle 1 (pointing up): Thổ (bottom), Mộc (top-left), Thủy (top-right)
- Triangle 2 (pointing down): Kim (top), Thử (bottom-left), Hỏa (bottom-right)

### Element Positions (clockwise from top)
1. Kim (top) - #948d8d
2. Thủy (top-right) - #000000
3. Hỏa (right) - #ff0000
4. Thổ (bottom) - #ac8308
5. Thử (bottom-left) - #ff0090
6. Mộc (left) - #00b797

### Relationships
- **Tương Sinh** (blue arrows clockwise): Thổ→Kim→Thủy→Thử→Mộc→Hỏa→Thổ
- **Phản Sinh** (red arrows counter-clockwise): reverse of above
- **Tương Khắc** (3 opposing pairs): Thủy↔Hỏa, Kim↔Mộc, Thổ↔Thử

## Requirements
1. SVG viewBox ~400x400
2. 6 colored triangles with element names
3. Curved arrows for Tương Sinh/Phản Sinh
4. Straight through-center arrows for Tương Khắc
5. Props: `selectedTopic` to show secondary text

## Architecture

```
HexagramDiagram.vue
├── Props: selectedTopic: 'luc_hanh' | 'luc_khi' | 'luc_kinh' | 'luc_tang' | 'luc_phu'
├── Computed: elementLabels - maps topic to display text per element
└── SVG: triangles, arrows, text labels
```

## Related Code Files

### Create
- `src/components/learning/HexagramDiagram.vue`

### Reference (read-only)
- `src/data/knowledge/luc-hanh.ts` - colors, khi, kinh
- `src/data/knowledge/luc-tang.ts` - tang names
- `src/data/knowledge/luc-phu.ts` - phu names
- `src/data/knowledge/sequences.ts` - TUONG_KHAC_PAIRS

## Implementation Steps

### 1. Create HexagramDiagram.vue structure
```typescript
interface Props {
  selectedTopic: 'luc_hanh' | 'luc_khi' | 'luc_kinh' | 'luc_tang' | 'luc_phu'
}
```

### 2. Define hexagram geometry
```typescript
// Center at (200, 200), radius 150
const positions = [
  { id: 'KIM', angle: -90, ... },  // top
  { id: 'THUY', angle: -30, ... }, // top-right
  { id: 'HOA', angle: 30, ... },   // bottom-right
  { id: 'THO', angle: 90, ... },   // bottom
  { id: 'THU', angle: 150, ... },  // bottom-left
  { id: 'MOC', angle: 210, ... },  // top-left
]
```

### 3. Draw triangles
- Use `<polygon>` for each triangle
- Fill with element.mauSac
- Position text at triangle centroid

### 4. Draw arrows
- `<path>` with curved arcs for outer arrows
- Use marker-end for arrowheads
- Blue (#3b82f6) for Tương Sinh, Red (#ef4444) for Phản Sinh

### 5. Draw Tương Khắc arrows
- 3 straight lines through center
- Double-headed arrows

### 6. Compute secondary labels
```typescript
const getSecondaryLabel = (elementId: string) => {
  switch (props.selectedTopic) {
    case 'luc_khi': return element.khi + '/' + khi_description
    case 'luc_kinh': return element.kinh
    case 'luc_tang': return LUC_TANG.find(t => t.bo === element.ten)?.name
    case 'luc_phu': return LUC_PHU.find(p => p.bo === element.ten)?.name
    default: return ''
  }
}
```

## Todo List
- [ ] Create component file with props interface
- [ ] Define triangle positions and geometry
- [ ] Draw 6 colored triangles with SVG polygon
- [ ] Add fixed LUC_HANH text labels (small)
- [ ] Add secondary text labels (reactive to topic)
- [ ] Draw Tương Sinh arrows (blue, clockwise)
- [ ] Draw Phản Sinh arrows (red, counter-clockwise)
- [ ] Draw Tương Khắc arrows (center, double-headed)
- [ ] Import in LearningView.vue

## Success Criteria
- Hexagram displays with correct colors
- Element names visible in triangles
- All 3 arrow types render correctly
- Secondary labels update when topic changes
