// Re-export all sequences from luc-hanh.ts (single source of truth)
export {
  LUC_HANH_SEQUENCE,
  LUC_KHI_TINH_SEQUENCE,
  LUC_KINH_BASE_SEQUENCE,
  LUC_TANG_SEQUENCE,
  LUC_PHU_SEQUENCE,
  KINH_AM_SEQUENCE,
  KINH_DUONG_SEQUENCE,
  KINH_LAC_COMBINED_SEQUENCE
} from './luc-hanh'
export type { LucHanhElement } from './luc-hanh'

// Rule labels in Vietnamese
export const RULE_LABELS = {
  tuong_sinh: 'Tương Sinh',
  phan_sinh: 'Phản Sinh',
  tuong_khac: 'Tương Khắc'
} as const

// Các cặp tương khắc (đối nhau trong vòng tròn)
export const TUONG_KHAC_PAIRS: [string, string][] = [
  ['Thủy', 'Hỏa'],
  ['Thổ', 'Thử'],
  ['Kim', 'Mộc']
]
