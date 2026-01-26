// Rule types for game mechanics
export type RuleType = "tuong_sinh" | "phan_sinh" | "tuong_khac";

// Topic types (knowledge categories)
export type TopicType =
  | "luc_hanh" // Thổ, Kim, Thủy, Thử, Mộc, Hỏa
  | "luc_khi_tinh" // Thấp, Táo, Hàn, Thử, Phong, Hoả
  | "luc_kinh_base" // Thái Âm, Dương Minh, Thái Dương, Thiếu Âm, Quyết Âm, Thiếu Dương
  | "luc_tang" // 6 Tạng
  | "luc_phu" // 6 Phủ
  | "kinh_am" // Kinh Âm
  | "kinh_duong" // Kinh Dương
  | "luc_khi" // 6 Khí tự nhiên
  | "ngu_du_tang" // Ngũ du huyệt Tạng (đoán hành)
  | "ngu_du_phu" // Ngũ du huyệt Phủ (đoán hành)
  | "ngu_du_ten_tang" // Ngũ du huyệt Tạng (đoán tên)
  | "ngu_du_ten_phu"; // Ngũ du huyệt Phủ (đoán tên)

// Card state in game
export interface Card {
  position: number; // 1-6
  value: string; // e.g., "Mộc", "Tâm"
  label?: string; // e.g., "Tĩnh", "Vinh"
  isRevealed: boolean; // visible to player
  isTarget: boolean; // card to guess
}

// Question generated for gameplay
export interface Question {
  cards: Card[];
  targetPosition: number;
  correctAnswer: string;
  rule: RuleType;
  ruleLabel: string; // Vietnamese display text
  answers: string[]; // 6 shuffled options
  topic: TopicType;
  titleOverride?: string; // Custom title for Ngũ Du huyệt levels
}

// Level definition
export interface Level {
  id: string;
  order: number;
  title: string;
  description: string;
  topics: TopicType[];
  rules: RuleType[];
  unlocked: boolean;
  reviewFromLevels?: string[]; // previous levels for spaced repetition
}

// User progress per level
export interface LevelProgress {
  levelId: string;
  completed: boolean;
  bestStars: number; // 0-3
  totalRoundsPlayed: number;
  correctAnswers: number;
}

// Accent color options
export type AccentColor =
  | "blue"
  | "teal"
  | "emerald"
  | "violet"
  | "amber"
  | "rose";

// Game settings
export interface GameSettings {
  revealedCards: 1 | 2 | 3;
  enabledRules: RuleType[];
  initialTime: number; // seconds
  bonusTime: number; // seconds added on correct
  roundsPerLevel: number;
  theme: "dark" | "light" | "system";
  accentColor: AccentColor;
  colorHintEnabled: boolean; // Show element-based colors instead of accent
}

// User data
export interface UserData {
  id: string; // UUID
  settings: GameSettings;
  progress: Record<string, LevelProgress>;
  createdAt: number;
  lastPlayedAt: number;
}

// Current game state
export interface GameState {
  status: "idle" | "playing" | "paused" | "round_end" | "level_complete";
  currentLevelId: string | null;
  currentQuestion: Question | null;
  timeRemaining: number;
  roundNumber: number;
  totalRounds: number;
  hintsUsed: number;
  currentRoundStars: number;
  totalStars: number;
  correctAnswers: number;
}
