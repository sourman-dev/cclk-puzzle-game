// Lục Hành - Central data structure for all 6 elements
// Each element contains all related information across different topics

export interface LucHanhElement {
  id: string
  thuTuTuongSinh: number  // 1-6, thứ tự theo chiều tương sinh
  thuTuPhanSinh: number   // 6-1, thứ tự theo chiều phản sinh
  ten: string             // Thổ, Kim, Thủy, Thử, Mộc, Hỏa
  mauSac: string          // Hex color
  mauChu: string          // Text color for contrast
  khi: string             // Lục Khí tính chất: Thấp, Táo, Hàn, Thử, Phong, Hoả
  kinh: string            // Lục Kinh cơ bản: Thái Âm, Dương Minh...
  tang: string            // Lục Tạng (Âm): Tỳ, Phế, Thận, Tâm Bào Lạc, Can, Tâm
  phu: string             // Lục Phủ (Dương): Đại Trường, Vị, Bàng Quang, Tam Tiêu, Đởm, Tiểu Trường
  kinhAm: string          // Kinh Âm đầy đủ
  kinhDuong: string       // Kinh Dương đầy đủ
}

export const LUC_HANH: LucHanhElement[] = [
  {
    id: 'THO',
    thuTuTuongSinh: 1,
    thuTuPhanSinh: 6,
    ten: 'Thổ',
    mauSac: '#ac8308ff',
    mauChu: '#000000',
    khi: 'Thấp',
    kinh: 'Thái Âm',
    tang: 'Tỳ',
    phu: 'Đại Trường',
    kinhAm: 'Túc Thái Âm Tỳ',
    kinhDuong: 'Thủ Dương Minh Đại Trường'
  },
  {
    id: 'KIM',
    thuTuTuongSinh: 2,
    thuTuPhanSinh: 5,
    ten: 'Kim',
    mauSac: '#948d8d',
    mauChu: '#ffffff',
    khi: 'Táo',
    kinh: 'Dương Minh',
    tang: 'Phế',
    phu: 'Vị',
    kinhAm: 'Thủ Thái Âm Phế',
    kinhDuong: 'Túc Dương Minh Vị'
  },
  {
    id: 'THUY',
    thuTuTuongSinh: 3,
    thuTuPhanSinh: 4,
    ten: 'Thủy',
    mauSac: '#000000',
    mauChu: '#ffffff',
    khi: 'Hàn',
    kinh: 'Thái Dương',
    tang: 'Thận',
    phu: 'Bàng Quang',
    kinhAm: 'Túc Thiếu Âm Thận',
    kinhDuong: 'Túc Thái Dương Bàng Quang'
  },
  {
    id: 'THU',
    thuTuTuongSinh: 4,
    thuTuPhanSinh: 3,
    ten: 'Thử',
    mauSac: '#ff0090',
    mauChu: '#ffffff',
    khi: 'Thử',
    kinh: 'Thiếu Âm',
    tang: 'Tâm Bào Lạc',
    phu: 'Tam Tiêu',
    kinhAm: 'Thủ Quyết Âm Tâm Bào',
    kinhDuong: 'Thủ Thiếu Dương Tam Tiêu'
  },
  {
    id: 'MOC',
    thuTuTuongSinh: 5,
    thuTuPhanSinh: 2,
    ten: 'Mộc',
    mauSac: '#00b797',
    mauChu: '#ffffff',
    khi: 'Phong',
    kinh: 'Quyết Âm',
    tang: 'Can',
    phu: 'Đởm',
    kinhAm: 'Túc Quyết Âm Can',
    kinhDuong: 'Túc Thiếu Dương Đởm'
  },
  {
    id: 'HOA',
    thuTuTuongSinh: 6,
    thuTuPhanSinh: 1,
    ten: 'Hỏa',
    mauSac: '#ff0000',
    mauChu: '#ffffff',
    khi: 'Hỏa',
    kinh: 'Thiếu Dương',
    tang: 'Tâm',
    phu: 'Tiểu Trường',
    kinhAm: 'Thủ Thiếu Âm Tâm',
    kinhDuong: 'Thủ Thái Dương Tiểu Trường'
  }
]

// Get element by position (1-6 tương sinh order)
export function getByTuongSinhPosition(position: number): LucHanhElement | undefined {
  return LUC_HANH.find(e => e.thuTuTuongSinh === position)
}

// Get color by any field value (ten, khi, kinh, tang, phu, kinhAm, kinhDuong)
export function getColorByValue(value: string): { bg: string; text: string } {
  const element = LUC_HANH.find(e =>
    e.ten === value ||
    e.khi === value ||
    e.kinh === value ||
    e.tang === value ||
    e.phu === value ||
    e.kinhAm === value ||
    e.kinhDuong === value
  )
  return element
    ? { bg: element.mauSac, text: element.mauChu }
    : { bg: '#6b7280', text: '#ffffff' }
}

// Get color by position (1-6) - kept for backward compatibility
export function getColorByPosition(position: number): { bg: string; text: string } {
  const element = getByTuongSinhPosition(position)
  return element
    ? { bg: element.mauSac, text: element.mauChu }
    : { bg: '#6b7280', text: '#ffffff' }
}

// Generate sequence array for a specific field
export function getSequence(field: keyof LucHanhElement): string[] {
  return LUC_HANH
    .sort((a, b) => a.thuTuTuongSinh - b.thuTuTuongSinh)
    .map(e => String(e[field]))
}

// Pre-generated sequences for performance (all derived from LUC_HANH)
export const LUC_HANH_SEQUENCE = getSequence('ten') as readonly string[]
export const LUC_KHI_TINH_SEQUENCE = getSequence('khi') as readonly string[]
export const LUC_KINH_BASE_SEQUENCE = getSequence('kinh') as readonly string[]
export const LUC_TANG_SEQUENCE = getSequence('tang') as readonly string[]
export const LUC_PHU_SEQUENCE = getSequence('phu') as readonly string[]

// Kinh Âm/Dương sequences use tang/phu for simplicity (game học theo Tạng/Phủ)
export const KINH_AM_SEQUENCE = getSequence('tang') as readonly string[]
export const KINH_DUONG_SEQUENCE = getSequence('phu') as readonly string[]
