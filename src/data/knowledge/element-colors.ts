// LUC_HANH element colors for Color Hint feature
// Colors mapped by position (1-6) following tương sinh order
// Position 1=Thổ, 2=Kim, 3=Thuỷ, 4=Thử, 5=Mộc, 6=Hoả

export const POSITION_COLORS: Record<number, { bg: string; text: string }> = {
  1: { bg: '#ffbe00', text: '#000000' },  // Thổ
  2: { bg: '#948d8d', text: '#ffffff' },  // Kim
  3: { bg: '#000000', text: '#ffffff' },  // Thuỷ
  4: { bg: '#ff0090', text: '#ffffff' },  // Thử
  5: { bg: '#00b797', text: '#ffffff' },  // Mộc
  6: { bg: '#2596be', text: '#ffffff' },  // Hoả
}

// Get color by position (1-6), fallback to gray
export function getColorByPosition(position: number): { bg: string; text: string } {
  return POSITION_COLORS[position] || { bg: '#6b7280', text: '#ffffff' }
}
