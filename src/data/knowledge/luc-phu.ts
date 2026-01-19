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
