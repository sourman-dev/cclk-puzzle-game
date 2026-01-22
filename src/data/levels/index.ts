import type { Level } from '@/types'

export const LEVELS: Level[] = [
  {
    id: 'level_1',
    order: 1,
    title: 'Lục Khí Cơ Bản',
    description: 'Học quy luật Tương Sinh của Lục Khí: Thổ → Kim → Thủy → Thử → Mộc → Hỏa',
    topics: ['luc_hanh'],
    rules: ['tuong_sinh'],
    unlocked: true
  },
  {
    id: 'level_2',
    order: 2,
    title: 'Lục Khí Nâng Cao',
    description: 'Lục Khí tính chất (Thấp, Táo, Hàn...) và Lục Kinh cơ bản (Thái Âm, Dương Minh...)',
    topics: ['luc_khi_tinh', 'luc_kinh_base'],
    rules: ['tuong_sinh', 'phan_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_1']
  },
  {
    id: 'level_3',
    order: 3,
    title: 'Lục Tạng',
    description: '6 Tạng (Âm): Tỳ, Phế, Thận, Tâm Bào Lạc, Can, Tâm theo Bộ',
    topics: ['luc_tang'],
    rules: ['tuong_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_1', 'level_2']
  },
  {
    id: 'level_4',
    order: 4,
    title: 'Lục Phủ',
    description: '6 Phủ (Dương): Đại Trường, Vị, Bàng Quang, Tam Tiêu, Đởm, Tiểu Trường',
    topics: ['luc_phu'],
    rules: ['tuong_sinh', 'phan_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_2', 'level_3']
  },
  {
    id: 'level_5',
    order: 5,
    title: 'Kinh Âm',
    description: '6 Kinh Âm theo chiều Tương Sinh',
    topics: ['kinh_am'],
    rules: ['tuong_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_3']
  },
  {
    id: 'level_6',
    order: 6,
    title: 'Kinh Dương',
    description: '6 Kinh Dương theo chiều Phản Sinh',
    topics: ['kinh_duong'],
    rules: ['phan_sinh'],
    unlocked: false,
    reviewFromLevels: ['level_4', 'level_5']
  }
]

// Special comprehensive level that combines multiple levels
export const COMPREHENSIVE_LEVEL: Level = {
  id: 'tong_hop',
  order: 99,
  title: 'Tổng hợp',
  description: 'Ôn tập tất cả kiến thức - chọn nhiều level để luyện tập',
  topics: ['luc_hanh', 'luc_khi_tinh', 'luc_kinh_base', 'luc_tang', 'luc_phu', 'kinh_am', 'kinh_duong'],
  rules: ['tuong_sinh', 'phan_sinh'],
  unlocked: true
}

export function getLevelById(id: string): Level | undefined {
  if (id === 'tong_hop') return COMPREHENSIVE_LEVEL
  return LEVELS.find(l => l.id === id)
}

export function getNextLevel(currentId: string): Level | undefined {
  const current = LEVELS.find(l => l.id === currentId)
  if (!current) return undefined
  return LEVELS.find(l => l.order === current.order + 1)
}
