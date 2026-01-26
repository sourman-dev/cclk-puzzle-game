import type { Level } from "@/types";

export const LEVELS: Level[] = [
  {
    id: "level_1",
    order: 1,
    title: "Lục Hành",
    description:
      "Học quy luật Tương Sinh của Lục Khí: Thổ → Kim → Thủy → Thử → Mộc → Hỏa",
    topics: ["luc_hanh"],
    rules: ["tuong_sinh"],
    unlocked: true,
  },
  {
    id: "level_2",
    order: 2,
    title: "Lục Khí",
    description:
      "Lục Khí tính chất (Thấp, Táo, Hàn...) và Lục Kinh cơ bản (Thái Âm, Dương Minh...)",
    topics: ["luc_khi_tinh", "luc_kinh_base"],
    rules: ["tuong_sinh", "phan_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_1"],
  },
  {
    id: "level_3",
    order: 3,
    title: "Lục Tạng",
    description: "6 Tạng (Âm): Tỳ, Phế, Thận, Tâm Bào Lạc, Can, Tâm theo Bộ",
    topics: ["luc_tang"],
    rules: ["tuong_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_1", "level_2"],
  },
  {
    id: "level_4",
    order: 4,
    title: "Lục Phủ",
    description:
      "6 Phủ (Dương): Đại Trường, Vị, Bàng Quang, Tam Tiêu, Đởm, Tiểu Trường",
    topics: ["luc_phu"],
    rules: ["tuong_sinh", "phan_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_2", "level_3"],
  },
  {
    id: "level_5",
    order: 5,
    title: "Lục Kinh Âm",
    description: "6 Kinh Âm theo chiều Tương Sinh",
    topics: ["kinh_am"],
    rules: ["tuong_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_3"],
  },
  {
    id: "level_6",
    order: 6,
    title: "Lục Kinh Dương",
    description: "6 Kinh Dương theo chiều Phản Sinh",
    topics: ["kinh_duong"],
    rules: ["phan_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_4", "level_5"],
  },
  {
    id: "level_7",
    order: 7,
    title: "Ngũ Du Tạng",
    description:
      "Xác định Hành của các huyệt Tĩnh, Vinh, Du, Kinh, Hợp trên 6 kinh Âm",
    topics: ["ngu_du_tang"],
    rules: ["tuong_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_5"],
  },
  {
    id: "level_8",
    order: 8,
    title: "Ngũ Du Phủ",
    description:
      "Xác định Hành của các huyệt Tĩnh, Vinh, Du, Nguyên, Kinh, Hợp trên 6 kinh Dương",
    topics: ["ngu_du_phu"],
    rules: ["tuong_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_6", "level_7"],
  },
  {
    id: "level_9",
    order: 9,
    title: "Tên Huyệt Tạng",
    description:
      "Ghi nhớ tên 30 huyệt trên 6 kinh Âm (Tĩnh, Vinh, Du, Kinh, Hợp)",
    topics: ["ngu_du_ten_tang"],
    rules: ["tuong_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_7"],
  },
  {
    id: "level_10",
    order: 10,
    title: "Tên Huyệt Phủ",
    description: "Ghi nhớ tên 36 huyệt trên 6 kinh Dương (Tĩnh -> Hợp)",
    topics: ["ngu_du_ten_phu"],
    rules: ["tuong_sinh"],
    unlocked: false,
    reviewFromLevels: ["level_8", "level_9"],
  },
];

// Special comprehensive level that combines multiple levels
export const COMPREHENSIVE_LEVEL: Level = {
  id: "tong_hop",
  order: 99,
  title: "Tổng hợp",
  description: "Ôn tập tất cả kiến thức - chọn nhiều level để luyện tập",
  topics: [
    "luc_hanh",
    "luc_khi_tinh",
    "luc_kinh_base",
    "luc_tang",
    "luc_phu",
    "kinh_am",
    "kinh_duong",
    "ngu_du_tang",
    "ngu_du_phu",
    "ngu_du_ten_tang",
    "ngu_du_ten_phu",
  ],
  rules: ["tuong_sinh", "phan_sinh"],
  unlocked: true,
};

export function getLevelById(id: string): Level | undefined {
  if (id === "tong_hop") return COMPREHENSIVE_LEVEL;
  return LEVELS.find((l) => l.id === id);
}

export function getNextLevel(currentId: string): Level | undefined {
  const current = LEVELS.find((l) => l.id === currentId);
  if (!current) return undefined;
  return LEVELS.find((l) => l.order === current.order + 1);
}
