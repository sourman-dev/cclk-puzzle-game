// Base sequence theo chiều Tương Sinh Lục Khí
export const NGU_HANH_SEQUENCE = ['Thổ', 'Kim', 'Thủy', 'Thử', 'Mộc', 'Hỏa'] as const

// Mapping vị trí (1-6) theo Tương Sinh
export type NguHanhElement = typeof NGU_HANH_SEQUENCE[number]

// Rule labels in Vietnamese
export const RULE_LABELS = {
  tuong_sinh: 'Tương Sinh',
  phan_sinh: 'Phản Sinh',
  tuong_khac: 'Tương Khắc'
} as const

// Các cặp tương khắc (đối nhau trong vòng tròn)
export const TUONG_KHAC_PAIRS: [NguHanhElement, NguHanhElement][] = [
  ['Thủy', 'Hỏa'],
  ['Thổ', 'Thử'],
  ['Kim', 'Mộc']
]
