// Lục Hành - Central data structure for all 6 elements
// Each element contains all related information across different topics

export interface BaseElement {
  id: string;
  thuTuTuongSinh: number; // 1-6, thứ tự theo chiều tương sinh
  thuTuPhanSinh: number; // 6-1, thứ tự theo chiều phản sinh
  ten: string; // Thổ, Kim, Thủy, Thử, Mộc, Hỏa
  mauSac: string; // Hex color
  mauChu: string; // Text color for contrast
}

export interface LucHanhElement extends BaseElement {
  khi: string; // Lục Khí tính chất: Thấp, Táo, Hàn, Thử, Phong, Hoả
  kinh: string; // Lục Kinh cơ bản: Thái Âm, Dương Minh...
  tang: string; // Lục Tạng (Âm): Tỳ, Phế, Thận, Tâm Bào Lạc, Can, Tâm
  phu: string; // Lục Phủ (Dương): Đại Trường, Vị, Bàng Quang, Tam Tiêu, Đởm, Tiểu Trường
  kinhAm: string; // Kinh Âm đầy đủ
  kinhDuong: string; // Kinh Dương đầy đủ
}

export interface TANGPHUElement {
  id: string;
  ten: string;
  isTang: boolean;
  hanhId: string; // Bản chất (Hành) - Quyết định màu sắc
  boId: string; // Vị trí (Bộ) - Quyết định vị trí trong bộ mạch/huyệt
  mauSac: string;
  mauChu: string;
  kinhAm: string;
  kinhDuong: string;
}

export const BASE_ELEMENTS: BaseElement[] = [
  {
    id: "THO",
    thuTuTuongSinh: 1,
    thuTuPhanSinh: 6,
    ten: "Thổ",
    mauSac: "#ac8308ff",
    mauChu: "#000000",
  },
  {
    id: "KIM",
    thuTuTuongSinh: 2,
    thuTuPhanSinh: 5,
    ten: "Kim",
    mauSac: "#948d8d",
    mauChu: "#ffffff",
  },
  {
    id: "THUY",
    thuTuTuongSinh: 3,
    thuTuPhanSinh: 4,
    ten: "Thủy",
    mauSac: "#000000",
    mauChu: "#ffffff",
  },
  {
    id: "THU",
    thuTuTuongSinh: 4,
    thuTuPhanSinh: 3,
    ten: "Thử",
    mauSac: "#ff0090",
    mauChu: "#ffffff",
  },
  {
    id: "MOC",
    thuTuTuongSinh: 5,
    thuTuPhanSinh: 2,
    ten: "Mộc",
    mauSac: "#00b797",
    mauChu: "#ffffff",
  },
  {
    id: "HOA",
    thuTuTuongSinh: 6,
    thuTuPhanSinh: 1,
    ten: "Hỏa",
    mauSac: "#ff0000",
    mauChu: "#ffffff",
  },
];

/**
 * Dữ liệu 12 Tạng Phủ (Kinh Âm/Dương)
 * Mỗi Tạng Phủ có một HÀNH (bản chất) và một BỘ (vị trí).
 * - Tạng (Kinh Âm): Hành và Bộ trùng nhau.
 * - Phủ (Kinh Dương): Hành và Bộ khác nhau.
 */
export const TANG_PHU_DATA: TANGPHUElement[] = [
  // --- TẠNG (Kinh Âm): HÀNH = BỘ ---
  {
    id: "TY",
    ten: "Tỳ",
    isTang: true,
    hanhId: "THO",
    boId: "THO",
    mauSac: "#ac8308ff",
    mauChu: "#000000",
    kinhAm: "Túc Thái Âm Tỳ",
    kinhDuong: "Thủ Dương Minh Đại Trường",
  },
  {
    id: "PHE",
    ten: "Phế",
    isTang: true,
    hanhId: "KIM",
    boId: "KIM",
    mauSac: "#948d8d",
    mauChu: "#ffffff",
    kinhAm: "Thủ Thái Âm Phế",
    kinhDuong: "Túc Thái Dương Bàng Quang",
  },
  {
    id: "THAN",
    ten: "Thận",
    isTang: true,
    hanhId: "THUY",
    boId: "THUY",
    mauSac: "#000000",
    mauChu: "#ffffff",
    kinhAm: "Túc Thiếu Âm Thận",
    kinhDuong: "Thủ Thái Dương Tiểu Trường",
  },
  {
    id: "TAM",
    ten: "Tâm",
    isTang: true,
    hanhId: "THU",
    boId: "THU",
    mauSac: "#ff0090",
    mauChu: "#ffffff",
    kinhAm: "Thủ Thiếu Âm Tâm",
    kinhDuong: "Túc Thiếu Dương Đởm",
  },
  {
    id: "CAN",
    ten: "Can",
    isTang: true,
    hanhId: "MOC",
    boId: "MOC",
    mauSac: "#00b797",
    mauChu: "#ffffff",
    kinhAm: "Túc Quyết Âm Can",
    kinhDuong: "Thủ Thiếu Dương Tam Tiêu",
  },
  {
    id: "TBL",
    ten: "Tâm Bào Lạc",
    isTang: true,
    hanhId: "HOA",
    boId: "HOA",
    mauSac: "#ff0000",
    mauChu: "#ffffff",
    kinhAm: "Thủ Quyết Âm Tâm Bào",
    kinhDuong: "Túc Dương Minh Vị",
  },

  // --- PHỦ (Kinh Dương): HÀNH != BỘ ---
  {
    id: "DAI_TRUONG",
    ten: "Đại Trường",
    isTang: false,
    hanhId: "KIM", // Hành Kim
    boId: "THO", // Bộ Thổ
    mauSac: "#948d8d",
    mauChu: "#ffffff",
    kinhAm: "Túc Thái Âm Tỳ",
    kinhDuong: "Thủ Dương Minh Đại Trường",
  },
  {
    id: "BANG_QUANG",
    ten: "Bàng Quang",
    isTang: false,
    hanhId: "THUY", // Hành Thủy
    boId: "KIM", // Bộ Kim
    mauSac: "#000000",
    mauChu: "#ffffff",
    kinhAm: "Thủ Thái Âm Phế",
    kinhDuong: "Túc Thái Dương Bàng Quang",
  },
  {
    id: "TIEU_TRUONG",
    ten: "Tiểu Trường",
    isTang: false,
    hanhId: "THU", // Hành Thử
    boId: "THUY", // Bộ Thủy
    mauSac: "#ff0090",
    mauChu: "#ffffff",
    kinhAm: "Túc Thiếu Âm Thận",
    kinhDuong: "Thủ Thái Dương Tiểu Trường",
  },
  {
    id: "DOM",
    ten: "Đởm",
    isTang: false,
    hanhId: "MOC", // Hành Mộc
    boId: "THU", // Bộ Thử
    mauSac: "#00b797",
    mauChu: "#ffffff",
    kinhAm: "Thủ Thiếu Âm Tâm",
    kinhDuong: "Túc Thiếu Dương Đởm",
  },
  {
    id: "TAM_TIEU",
    ten: "Tam Tiêu",
    isTang: false,
    hanhId: "HOA", // Hành Hỏa
    boId: "MOC", // Bộ Mộc
    mauSac: "#ff0000",
    mauChu: "#ffffff",
    kinhAm: "Túc Quyết Âm Can",
    kinhDuong: "Thủ Thiếu Dương Tam Tiêu",
  },
  {
    id: "VI",
    ten: "Vị",
    isTang: false,
    hanhId: "THO", // Hành Thổ
    boId: "HOA", // Bộ Hỏa
    mauSac: "#ac8308ff",
    mauChu: "#000000",
    kinhAm: "Thủ Quyết Âm Tâm Bào",
    kinhDuong: "Túc Dương Minh Vị",
  },
];

export const LUC_HANH: LucHanhElement[] = [
  {
    id: "THO",
    thuTuTuongSinh: 1,
    thuTuPhanSinh: 6,
    ten: "Thổ",
    mauSac: "#ac8308ff",
    mauChu: "#000000",
    khi: "Thấp",
    kinh: "Thái Âm / Dương Minh",
    tang: "Tỳ",
    phu: "Đại Trường",
    kinhAm: "Túc Thái Âm Tỳ",
    kinhDuong: "Thủ Dương Minh Đại Trường",
  },
  {
    id: "KIM",
    thuTuTuongSinh: 2,
    thuTuPhanSinh: 5,
    ten: "Kim",
    mauSac: "#948d8d",
    mauChu: "#ffffff",
    khi: "Táo",
    kinh: "Thái Âm / Thái Dương",
    tang: "Phế",
    phu: "Bàng Quang",
    kinhAm: "Thủ Thái Âm Phế",
    kinhDuong: "Túc Thái Dương Bàng Quang",
  },
  {
    id: "THUY",
    thuTuTuongSinh: 3,
    thuTuPhanSinh: 4,
    ten: "Thủy",
    mauSac: "#000000",
    mauChu: "#ffffff",
    khi: "Hàn",
    kinh: "Thiếu Âm / Thái Dương",
    tang: "Thận",
    phu: "Tiểu Trường",
    kinhAm: "Túc Thiếu Âm Thận",
    kinhDuong: "Thủ Thái Dương Tiểu Trường",
  },
  {
    id: "THU",
    thuTuTuongSinh: 4,
    thuTuPhanSinh: 3,
    ten: "Thử",
    mauSac: "#ff0090",
    mauChu: "#ffffff",
    khi: "Thử",
    kinh: "Thiếu Âm / Thiếu Dương",
    tang: "Tâm",
    phu: "Đởm",
    kinhAm: "Thủ Thiếu Âm Tâm",
    kinhDuong: "Túc Thiếu Dương Đởm",
  },
  {
    id: "MOC",
    thuTuTuongSinh: 5,
    thuTuPhanSinh: 2,
    ten: "Mộc",
    mauSac: "#00b797",
    mauChu: "#ffffff",
    khi: "Phong",
    kinh: "Quyết Âm / Thiếu Dương",
    tang: "Can",
    phu: "Tam Tiêu",
    kinhAm: "Túc Quyết Âm Can",
    kinhDuong: "Thủ Thiếu Dương Tam Tiêu",
  },
  {
    id: "HOA",
    thuTuTuongSinh: 6,
    thuTuPhanSinh: 1,
    ten: "Hỏa",
    mauSac: "#ff0000",
    mauChu: "#ffffff",
    khi: "Hỏa",
    kinh: "Quyết Âm / Dương Minh",
    tang: "Tâm Bào Lạc",
    phu: "Vị",
    kinhAm: "Thủ Quyết Âm Tâm Bào",
    kinhDuong: "Túc Dương Minh Vị",
  },
];

// Get element by position (1-6 tương sinh order)
export function getByTuongSinhPosition(
  position: number,
): LucHanhElement | undefined {
  return LUC_HANH.find((e) => e.thuTuTuongSinh === position);
}

// Get color by any field value (ten, khi, kinh, tang, phu, kinhAm, kinhDuong)
export function getColorByValue(value: string): { bg: string; text: string } {
  // 1. Check if it is a specific Zang-Fu name (to prioritize HÀNH color)
  const tp = TANG_PHU_DATA.find(
    (e) =>
      e.ten === value ||
      e.id === value ||
      e.kinhAm === value ||
      e.kinhDuong === value,
  );
  if (tp) {
    return { bg: tp.mauSac, text: tp.mauChu };
  }

  // 2. Check if it is an Element or other generic values
  const element = LUC_HANH.find(
    (e) =>
      e.ten === value ||
      e.id === value ||
      e.khi === value ||
      e.kinh === value ||
      e.tang === value ||
      e.phu === value ||
      e.kinhAm === value ||
      e.kinhDuong === value,
  );
  return element
    ? { bg: element.mauSac, text: element.mauChu }
    : { bg: "#6b7280", text: "#ffffff" };
}

// Get color by position (1-6) - kept for backward compatibility
export function getColorByPosition(position: number): {
  bg: string;
  text: string;
} {
  const element = getByTuongSinhPosition(position);
  return element
    ? { bg: element.mauSac, text: element.mauChu }
    : { bg: "#6b7280", text: "#ffffff" };
}

// Generate sequence array for a specific field
export function getSequence(field: keyof LucHanhElement): string[] {
  return LUC_HANH.sort((a, b) => a.thuTuTuongSinh - b.thuTuTuongSinh).map((e) =>
    String(e[field]),
  );
}

// Pre-generated sequences for performance (all derived from LUC_HANH)
export const LUC_HANH_SEQUENCE = getSequence("ten") as readonly string[];
export const LUC_KHI_TINH_SEQUENCE = getSequence("khi") as readonly string[];
export const LUC_KINH_BASE_SEQUENCE = getSequence("kinh") as readonly string[];
export const LUC_TANG_SEQUENCE = getSequence("tang") as readonly string[];
export const LUC_PHU_SEQUENCE = getSequence("phu") as readonly string[];

// Kinh Âm/Dương sequences use full names (Túc Thái Âm Tỳ, Thủ Dương Minh Đại Trường...)
export const KINH_AM_SEQUENCE = getSequence("kinhAm") as readonly string[];
export const KINH_DUONG_SEQUENCE = getSequence(
  "kinhDuong",
) as readonly string[];

import { ACUPOINTS_DATA } from "./acupoints";
// Combined sequence for Kinh Lạc level (interleaved: Âm1, Dương1, Âm2, Dương2...)
export const KINH_LAC_COMBINED_SEQUENCE = LUC_HANH.sort(
  (a, b) => a.thuTuTuongSinh - b.thuTuTuongSinh,
).flatMap((e) => [e.kinhAm, e.kinhDuong]) as readonly string[];

/**
 * Ngũ du huyệt - Cần tính toán hành của từng huyệt
 */
export interface NguDuHuyet {
  ten: string; // Tên huyệt thật (ví dụ: Thiếu Thương)
  loai: string; // Tĩnh, Vinh, Du, Nguyên, Kinh, Hợp
  hanh: string; // Thổ, Kim, Thủy, Thử, Mộc, Hỏa
}

export function getNguDuForChannel(tpId: string): NguDuHuyet[] {
  const tp = TANG_PHU_DATA.find((e) => e.id === tpId);
  if (!tp) return [];

  const realAcupoints = ACUPOINTS_DATA[tpId] || [];
  const results: NguDuHuyet[] = [];
  const sequence = LUC_HANH_SEQUENCE; // Thổ, Kim, Thủy, Thử, Mộc, Hỏa
  const startElement = LUC_HANH.find((e) => e.id === tp.boId);
  if (!startElement) return [];

  let currentHanhIndex = startElement.thuTuTuongSinh - 1; // 0-based index

  const getNextHanh = (): string => {
    currentHanhIndex = (currentHanhIndex + 1) % 6;
    return sequence[currentHanhIndex] as string;
  };

  const types = tp.isTang
    ? ["Tĩnh", "Vinh", "Du", "Kinh", "Hợp"]
    : ["Tĩnh", "Vinh", "Du", "Nguyên", "Kinh", "Hợp"];

  for (const loai of types) {
    const realAcu = realAcupoints.find((a) => a.loai === loai);
    results.push({
      ten: realAcu?.ten || loai,
      loai: loai,
      hanh: getNextHanh(),
    });
  }

  return results;
}
