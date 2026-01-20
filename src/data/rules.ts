import type { RuleType } from '@/types'
import { LUC_HANH_SEQUENCE, TUONG_KHAC_PAIRS, LUC_KHI_TINH_SEQUENCE, LUC_KINH_BASE_SEQUENCE } from './knowledge/sequences'
import { LUC_TANG_SEQUENCE } from './knowledge/luc-tang'
import { LUC_PHU_SEQUENCE } from './knowledge/luc-phu'
import { KINH_AM_SEQUENCE, KINH_DUONG_SEQUENCE } from './knowledge/kinh-lac'

/**
 * Tính giá trị tại position dựa trên:
 * - sequence: mảng 6 phần tử theo thứ tự Tương Sinh
 * - knownPosition: vị trí đã biết (1-6)
 * - knownValue: giá trị tại vị trí đã biết
 * - targetPosition: vị trí cần tìm (1-6)
 * - rule: quy luật áp dụng
 */
export function calculateAnswer(
  sequence: readonly string[],
  knownPosition: number,
  knownValue: string,
  targetPosition: number,
  rule: RuleType
): string {
  // Tìm index của knownValue trong sequence
  const knownIndex = sequence.indexOf(knownValue)
  if (knownIndex === -1) {
    throw new Error(`Value "${knownValue}" not found in sequence`)
  }

  // Tính khoảng cách giữa 2 positions
  const distance = targetPosition - knownPosition

  let targetIndex: number

  switch (rule) {
    case 'tuong_sinh':
      // Theo chiều thuận của sequence
      targetIndex = (knownIndex + distance + 6) % 6
      break

    case 'phan_sinh':
      // Ngược chiều của sequence
      targetIndex = (knownIndex - distance + 6) % 6
      break

    case 'tuong_khac':
      // Tìm phần tử khắc với knownValue
      const pair = TUONG_KHAC_PAIRS.find(
        ([a, b]) => a === knownValue || b === knownValue
      )
      if (pair) {
        return pair[0] === knownValue ? pair[1] : pair[0]
      }
      // Fallback to tuong_sinh if no khac pair
      targetIndex = (knownIndex + distance + 6) % 6
      break

    default:
      targetIndex = (knownIndex + distance + 6) % 6
  }

  return sequence[targetIndex] as string
}

/**
 * Lấy sequence phù hợp cho topic
 */
export function getSequenceForTopic(topicType: string): readonly string[] {
  switch (topicType) {
    case 'luc_hanh':
      return LUC_HANH_SEQUENCE
    case 'luc_khi_tinh':
      return LUC_KHI_TINH_SEQUENCE
    case 'luc_kinh_base':
      return LUC_KINH_BASE_SEQUENCE
    case 'luc_tang':
      return LUC_TANG_SEQUENCE
    case 'luc_phu':
      return LUC_PHU_SEQUENCE
    case 'kinh_am':
      return KINH_AM_SEQUENCE
    case 'kinh_duong':
      return KINH_DUONG_SEQUENCE
    default:
      return LUC_HANH_SEQUENCE
  }
}
