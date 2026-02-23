// Re-export all sequences from luc-hanh.ts (single source of truth)
export {
  LUC_HANH_SEQUENCE,
  LUC_KHI_TINH_SEQUENCE,
  LUC_TANG_SEQUENCE,
  LUC_PHU_SEQUENCE,
  KINH_AM_SEQUENCE,
  KINH_DUONG_SEQUENCE,
  KINH_LAC_COMBINED_SEQUENCE,
} from "./luc-hanh";
export type { LucHanhElement } from "./luc-hanh";

// Rule labels in Vietnamese
export const RULE_LABELS = {
  tuong_sinh: "Tương Sinh",
  phan_sinh: "Phản Sinh",
  tuong_khac: "Tương Khắc",
} as const;

// Tương khắc: đối nhau trong vòng tròn (±3 positions)
// 1↔4 (Thổ↔Thử), 2↔5 (Kim↔Mộc), 3↔6 (Thủy↔Hỏa)
// Logic được tính trực tiếp trong rules.ts bằng (index + 3) % 6
