// LUC_HANH element colors for Color Hint feature
// Colors with good contrast for text readability

export const ELEMENT_COLORS: Record<string, { bg: string; text: string }> = {
  // Lục Hành
  'Hỏa': { bg: '#2596be', text: '#ffffff' },
  'Hoả': { bg: '#2596be', text: '#ffffff' }, // alternate spelling
  'Thổ': { bg: '#ffbe00', text: '#000000' },
  'Thử': { bg: '#ff0090', text: '#ffffff' },
  'Mộc': { bg: '#00b797', text: '#ffffff' },
  'Kim': { bg: '#948d8d', text: '#ffffff' },
  'Thủy': { bg: '#000000', text: '#ffffff' },
  'Thuỷ': { bg: '#000000', text: '#ffffff' }, // alternate spelling
}

// Get color for element value, fallback to default if not found
export function getElementColor(value: string): { bg: string; text: string } {
  return ELEMENT_COLORS[value] || { bg: '#6b7280', text: '#ffffff' }
}
