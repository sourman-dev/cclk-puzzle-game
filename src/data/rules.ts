import type { RuleType } from "@/types";
import {
  LUC_HANH_SEQUENCE,
  LUC_KHI_TINH_SEQUENCE,
  LUC_TANG_SEQUENCE,
  LUC_PHU_SEQUENCE,
  KINH_AM_SEQUENCE,
  KINH_DUONG_SEQUENCE,
} from "./knowledge/sequences";

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
  _knownValue: string,
  targetPosition: number,
  rule: RuleType,
): string {
  // Dùng position trực tiếp (1-indexed → 0-indexed)
  // Không dùng indexOf vì sequence có thể có giá trị trùng (ví dụ luc_kinh)
  const knownIndex = knownPosition - 1;

  // Tính khoảng cách giữa 2 positions
  const distance = targetPosition - knownPosition;

  let targetIndex: number;

  switch (rule) {
    case "tuong_sinh":
      // Theo chiều thuận của sequence
      targetIndex = (knownIndex + distance + 6) % 6;
      break;

    case "phan_sinh":
      // Ngược chiều của sequence
      targetIndex = (knownIndex - distance + 6) % 6;
      break;

    case "tuong_khac":
      // Tương Khắc = ±3 positions (đối nhau: 1↔4, 2↔5, 3↔6)
      targetIndex = (knownIndex + 3) % 6;
      break;

    default:
      targetIndex = (knownIndex + distance + 6) % 6;
  }

  return sequence[targetIndex] as string;
}

/**
 * Lấy sequence phù hợp cho topic
 */
export function getSequenceForTopic(topicType: string): readonly string[] {
  switch (topicType) {
    case "luc_hanh":
      return LUC_HANH_SEQUENCE;
    case "luc_khi_tinh":
      return LUC_KHI_TINH_SEQUENCE;
    case "luc_tang":
      return LUC_TANG_SEQUENCE;
    case "luc_phu":
      return LUC_PHU_SEQUENCE;
    case "kinh_am":
      return KINH_AM_SEQUENCE;
    case "kinh_duong":
      return KINH_DUONG_SEQUENCE;
    default:
      return LUC_HANH_SEQUENCE;
  }
}
