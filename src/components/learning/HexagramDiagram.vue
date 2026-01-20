<script setup lang="ts">
import { computed } from 'vue'
import { LUC_HANH } from '@/data/knowledge/luc-hanh'
import { LUC_TANG } from '@/data/knowledge/luc-tang'
import { LUC_PHU } from '@/data/knowledge/luc-phu'

type TopicType = 'luc_hanh' | 'luc_khi' | 'luc_kinh' | 'luc_tang' | 'luc_phu'

interface Props {
  selectedTopic: TopicType
}

const props = defineProps<Props>()

// Lục Khí descriptions
const KHI_DESCRIPTIONS: Record<string, string> = {
  'Thấp': 'Mát',
  'Táo': 'Khô',
  'Hàn': 'Lạnh',
  'Thử': 'Ấm',
  'Phong': 'Gió',
  'Hỏa': 'Nóng'
}

// Hexagram positions (6 triangles in star pattern)
// Order: Kim(top), Thủy(top-right), Hỏa(bottom-right), Thổ(bottom), Thử(bottom-left), Mộc(top-left)
const ELEMENT_POSITIONS = [
  { id: 'KIM', x: 200, y: 60 },   // top
  { id: 'THUY', x: 320, y: 130 }, // top-right
  { id: 'HOA', x: 320, y: 270 },  // bottom-right
  { id: 'THO', x: 200, y: 340 },  // bottom
  { id: 'THU', x: 80, y: 270 },   // bottom-left
  { id: 'MOC', x: 80, y: 130 }    // top-left
]

// Get element data by ID
function getElement(id: string) {
  return LUC_HANH.find(e => e.id === id)
}

// Get secondary label based on topic
function getSecondaryLabel(elementId: string): string {
  const element = getElement(elementId)
  if (!element) return ''

  switch (props.selectedTopic) {
    case 'luc_khi':
      return `${element.khi}/${KHI_DESCRIPTIONS[element.khi] || ''}`
    case 'luc_kinh':
      return element.kinh
    case 'luc_tang':
      return LUC_TANG.find(t => t.bo === element.ten)?.name || ''
    case 'luc_phu':
      return LUC_PHU.find(p => p.bo === element.ten)?.name || ''
    default:
      return ''
  }
}

// Triangle points for each position (pointing outward from center)
const trianglePoints = computed(() => {
  const center = { x: 200, y: 200 }
  const outerRadius = 140
  const innerRadius = 70

  return ELEMENT_POSITIONS.map((pos, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180) // Start from top, 60° apart
    const prevAngle = ((i - 1) * 60 - 90) * (Math.PI / 180)
    const nextAngle = ((i + 1) * 60 - 90) * (Math.PI / 180)

    // Outer point
    const ox = center.x + Math.cos(angle) * outerRadius
    const oy = center.y + Math.sin(angle) * outerRadius

    // Inner points (connecting to neighbors)
    const ix1 = center.x + Math.cos((angle + prevAngle) / 2) * innerRadius
    const iy1 = center.y + Math.sin((angle + prevAngle) / 2) * innerRadius
    const ix2 = center.x + Math.cos((angle + nextAngle) / 2) * innerRadius
    const iy2 = center.y + Math.sin((angle + nextAngle) / 2) * innerRadius

    return {
      id: pos.id,
      points: `${ox},${oy} ${ix1},${iy1} ${ix2},${iy2}`,
      textX: center.x + Math.cos(angle) * 95,
      textY: center.y + Math.sin(angle) * 95
    }
  })
})

// Elements with computed data
const elements = computed(() => {
  return ELEMENT_POSITIONS.map((pos, i) => {
    const element = getElement(pos.id)
    const tri = trianglePoints.value[i]!
    return {
      ...pos,
      ...tri,
      element,
      secondaryLabel: getSecondaryLabel(pos.id)
    }
  })
})
</script>

<template>
  <svg viewBox="0 0 400 400" class="w-full max-w-sm">
    <defs>
      <!-- Arrow markers -->
      <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
      <marker id="arrow-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
      <marker id="arrow-purple-start" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
        <polygon points="10 0, 0 3.5, 10 7" fill="#8b5cf6" />
      </marker>
      <marker id="arrow-purple-end" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <!-- Tương Sinh arrows (blue, clockwise outer) -->
    <path
      d="M 240,55 A 160,160 0 0,1 355,200"
      fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-blue)"
    />
    <path
      d="M 355,220 A 160,160 0 0,1 240,355"
      fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-blue)"
    />
    <path
      d="M 220,360 A 160,160 0 0,1 45,220"
      fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-blue)"
    />
    <path
      d="M 45,180 A 160,160 0 0,1 160,50"
      fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-blue)"
    />

    <!-- Phản Sinh arrows (red, counter-clockwise outer) -->
    <path
      d="M 160,55 A 160,160 0 0,0 45,180"
      fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-red)"
    />
    <path
      d="M 40,220 A 160,160 0 0,0 160,355"
      fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-red)"
    />
    <path
      d="M 180,360 A 160,160 0 0,0 355,220"
      fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-red)"
    />
    <path
      d="M 360,180 A 160,160 0 0,0 240,50"
      fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-red)"
    />

    <!-- Tương Khắc arrows (purple, through center) -->
    <!-- Thủy ↔ Hỏa (bottom-left to top-right diagonal) -->
    <line x1="100" y1="130" x2="300" y2="270" stroke="#8b5cf6" stroke-width="2"
      marker-start="url(#arrow-purple-start)" marker-end="url(#arrow-purple-end)" />
    <!-- Kim ↔ Mộc (top to bottom-left) -->
    <line x1="200" y1="70" x2="90" y2="260" stroke="#8b5cf6" stroke-width="2"
      marker-start="url(#arrow-purple-start)" marker-end="url(#arrow-purple-end)" />
    <!-- Thổ ↔ Thử -->
    <line x1="200" y1="330" x2="90" y2="140" stroke="#8b5cf6" stroke-width="2"
      marker-start="url(#arrow-purple-start)" marker-end="url(#arrow-purple-end)" />

    <!-- Triangles -->
    <polygon
      v-for="el in elements"
      :key="el.id"
      :points="el.points"
      :fill="el.element?.mauSac || '#666'"
      stroke="#fff"
      stroke-width="1"
    />

    <!-- Labels -->
    <g v-for="el in elements" :key="'label-' + el.id">
      <!-- Element name (fixed, small) -->
      <text
        :x="el.textX"
        :y="el.textY - (el.secondaryLabel ? 5 : 0)"
        text-anchor="middle"
        dominant-baseline="middle"
        :fill="el.element?.mauChu || '#fff'"
        font-size="14"
        font-weight="bold"
      >
        {{ el.element?.ten }}
      </text>
      <!-- Secondary label -->
      <text
        v-if="el.secondaryLabel"
        :x="el.textX"
        :y="el.textY + 12"
        text-anchor="middle"
        dominant-baseline="middle"
        :fill="el.element?.mauChu || '#fff'"
        font-size="10"
      >
        {{ el.secondaryLabel }}
      </text>
    </g>

    <!-- Legend -->
    <g transform="translate(10, 370)">
      <line x1="0" y1="0" x2="20" y2="0" stroke="#3b82f6" stroke-width="2" />
      <text x="25" y="4" font-size="10" fill="currentColor">Tương Sinh</text>
      <line x1="100" y1="0" x2="120" y2="0" stroke="#ef4444" stroke-width="2" />
      <text x="125" y="4" font-size="10" fill="currentColor">Phản Sinh</text>
      <line x1="200" y1="0" x2="220" y2="0" stroke="#8b5cf6" stroke-width="2" />
      <text x="225" y="4" font-size="10" fill="currentColor">Tương Khắc</text>
    </g>
  </svg>
</template>
