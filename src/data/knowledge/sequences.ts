// Re-export sequences from luc-hanh.ts for backward compatibility
export { LUC_HANH_SEQUENCE, LUC_KHI_TINH_SEQUENCE, LUC_KINH_BASE_SEQUENCE } from './luc-hanh'
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
