// Base sequence theo chiều Tương Sinh Lục Khí
export const LUC_HANH_SEQUENCE = ['Thổ', 'Kim', 'Thủy', 'Thử', 'Mộc', 'Hỏa'] as const

// Lục Khí tính chất (Thấp/Mát, Táo/Khô, Hàn/Lạnh, Thử/Ấm, Phong/Gió, Hoả/Nóng)
// Theo thứ tự tương sinh: Thổ->Kim->Thuỷ->Thử->Mộc->Hoả
export const LUC_KHI_TINH_SEQUENCE = ['Thấp', 'Táo', 'Hàn', 'Thử', 'Phong', 'Hoả'] as const

// Lục Kinh cơ bản (Thái Âm, Dương Minh, Thái Dương, Thiếu Âm, Quyết Âm, Thiếu Dương)
// Theo thứ tự tương sinh: Thổ->Kim->Thuỷ->Thử->Mộc->Hoả
export const LUC_KINH_BASE_SEQUENCE = ['Thái Âm', 'Dương Minh', 'Thái Dương', 'Thiếu Âm', 'Quyết Âm', 'Thiếu Dương'] as const

// Mapping vị trí (1-6) theo Tương Sinh
export type LucHanhElement = typeof LUC_HANH_SEQUENCE[number]

// Rule labels in Vietnamese
export const RULE_LABELS = {
  tuong_sinh: 'Tương Sinh',
  phan_sinh: 'Phản Sinh',
  tuong_khac: 'Tương Khắc'
} as const

// Các cặp tương khắc (đối nhau trong vòng tròn)
export const TUONG_KHAC_PAIRS: [LucHanhElement, LucHanhElement][] = [
  ['Thủy', 'Hỏa'],
  ['Thổ', 'Thử'],
  ['Kim', 'Mộc']
]
