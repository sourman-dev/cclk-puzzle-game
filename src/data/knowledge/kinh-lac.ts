export interface KinhLacData {
  name: string
  shortName: string
  loai: 'âm' | 'dương'
  bo: string
  tangPhu: string      // Tạng hoặc Phủ
  viTri: 'thủ' | 'túc' // Tay hoặc Chân
}

// 6 Kinh Âm theo Bộ (Tương Sinh)
export const KINH_AM: KinhLacData[] = [
  { name: 'Túc Thái Âm Tỳ', shortName: 'TThÂTỳ', loai: 'âm', bo: 'Thổ', tangPhu: 'Tỳ', viTri: 'túc' },
  { name: 'Thủ Thái Âm Phế', shortName: 'ThThÂPh', loai: 'âm', bo: 'Kim', tangPhu: 'Phế', viTri: 'thủ' },
  { name: 'Túc Thiếu Âm Thận', shortName: 'TThiÂTh', loai: 'âm', bo: 'Thủy', tangPhu: 'Thận', viTri: 'túc' },
  { name: 'Thủ Quyết Âm Tâm Bào', shortName: 'ThQÂTB', loai: 'âm', bo: 'Thử', tangPhu: 'Tâm Bào Lạc', viTri: 'thủ' },
  { name: 'Túc Quyết Âm Can', shortName: 'TQÂCan', loai: 'âm', bo: 'Mộc', tangPhu: 'Can', viTri: 'túc' },
  { name: 'Thủ Thiếu Âm Tâm', shortName: 'ThThiÂT', loai: 'âm', bo: 'Hỏa', tangPhu: 'Tâm', viTri: 'thủ' }
]

// 6 Kinh Dương theo Bộ (Phản Sinh - ngược chiều)
export const KINH_DUONG: KinhLacData[] = [
  { name: 'Thủ Dương Minh Đại Trường', shortName: 'ThDMĐTr', loai: 'dương', bo: 'Thổ', tangPhu: 'Đại Trường', viTri: 'thủ' },
  { name: 'Túc Dương Minh Vị', shortName: 'TDMVị', loai: 'dương', bo: 'Kim', tangPhu: 'Vị', viTri: 'túc' },
  { name: 'Túc Thái Dương Bàng Quang', shortName: 'TThDBQ', loai: 'dương', bo: 'Thủy', tangPhu: 'Bàng Quang', viTri: 'túc' },
  { name: 'Thủ Thiếu Dương Tam Tiêu', shortName: 'ThThiDTT', loai: 'dương', bo: 'Thử', tangPhu: 'Tam Tiêu', viTri: 'thủ' },
  { name: 'Túc Thiếu Dương Đởm', shortName: 'TThiDĐ', loai: 'dương', bo: 'Mộc', tangPhu: 'Đởm', viTri: 'túc' },
  { name: 'Thủ Thái Dương Tiểu Trường', shortName: 'ThThDTTr', loai: 'dương', bo: 'Hỏa', tangPhu: 'Tiểu Trường', viTri: 'thủ' }
]

export const KINH_AM_SEQUENCE = KINH_AM.map(k => k.tangPhu)
export const KINH_DUONG_SEQUENCE = KINH_DUONG.map(k => k.tangPhu)
