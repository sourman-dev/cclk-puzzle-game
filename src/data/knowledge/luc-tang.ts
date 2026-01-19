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
