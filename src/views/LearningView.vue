<script setup lang="ts">
import { ref } from 'vue'
import HexagramDiagram from '@/components/learning/HexagramDiagram.vue'

type TopicType = 'luc_hanh' | 'luc_khi' | 'luc_kinh' | 'luc_tang' | 'luc_phu'
type TabType = 'diagram' | 'table' | 'huyet' | 'formulas' | 'tips'

const emit = defineEmits<{ exit: [] }>()

const selectedTopic = ref<TopicType>('luc_hanh')
const activeTab = ref<TabType>('diagram')

const TOPIC_OPTIONS: { value: TopicType; label: string }[] = [
  { value: 'luc_hanh', label: 'Lục Hành' },
  { value: 'luc_khi', label: 'Lục Khí' },
  { value: 'luc_kinh', label: 'Lục Kinh' },
  { value: 'luc_tang', label: 'Lục Tạng' },
  { value: 'luc_phu', label: 'Lục Phủ' }
]

const TABS: { value: TabType; label: string }[] = [
  { value: 'diagram', label: 'Sơ đồ' },
  { value: 'table', label: 'Bảng' },
  { value: 'huyet', label: 'Huyệt' },
  { value: 'formulas', label: 'Công thức' },
  { value: 'tips', label: 'Mẹo' }
]

// Master table data (position-based)
const MASTER_TABLE = [
  { pos: 1, hanh: 'Thổ', khi: 'Thấp', kinh: 'Thái Âm', tang: 'Tỳ', phu: 'Đại Trường' },
  { pos: 2, hanh: 'Kim', khi: 'Táo', kinh: 'Dương Minh', tang: 'Phế', phu: 'Vị' },
  { pos: 3, hanh: 'Thủy', khi: 'Hàn', kinh: 'Thái Dương', tang: 'Thận', phu: 'Bàng Quang' },
  { pos: 4, hanh: 'Thử', khi: 'Thử', kinh: 'Thiếu Âm', tang: 'Tâm Bào', phu: 'Tam Tiêu' },
  { pos: 5, hanh: 'Mộc', khi: 'Phong', kinh: 'Quyết Âm', tang: 'Can', phu: 'Đởm' },
  { pos: 6, hanh: 'Hỏa', khi: 'Hỏa', kinh: 'Thiếu Dương', tang: 'Tâm', phu: 'Tiểu Trường' }
]

// Biểu Lý pairs
const BIEU_LY = [
  { tang: 'Tỳ', phu: 'Đại Trường', bo: 1 },
  { tang: 'Phế', phu: 'Vị', bo: 2 },
  { tang: 'Thận', phu: 'Bàng Quang', bo: 3 },
  { tang: 'Tâm Bào', phu: 'Tam Tiêu', bo: 4 },
  { tang: 'Can', phu: 'Đởm', bo: 5 },
  { tang: 'Tâm', phu: 'Tiểu Trường', bo: 6 }
]

// 6 Bộ với Kinh Âm + Kinh Dương chi tiết
const LUC_BO = [
  { bo: 1, hanh: 'Thổ', kinhAm: 'Túc Thái Âm Tỳ', kinhDuong: 'Thủ Dương Minh Đại Trường', viTriAm: 'túc', viTriDuong: 'thủ' },
  { bo: 2, hanh: 'Kim', kinhAm: 'Thủ Thái Âm Phế', kinhDuong: 'Túc Dương Minh Vị', viTriAm: 'thủ', viTriDuong: 'túc' },
  { bo: 3, hanh: 'Thủy', kinhAm: 'Túc Thiếu Âm Thận', kinhDuong: 'Túc Thái Dương Bàng Quang', viTriAm: 'túc', viTriDuong: 'túc' },
  { bo: 4, hanh: 'Thử', kinhAm: 'Thủ Quyết Âm Tâm Bào', kinhDuong: 'Thủ Thiếu Dương Tam Tiêu', viTriAm: 'thủ', viTriDuong: 'thủ' },
  { bo: 5, hanh: 'Mộc', kinhAm: 'Túc Quyết Âm Can', kinhDuong: 'Túc Thiếu Dương Đởm', viTriAm: 'túc', viTriDuong: 'túc' },
  { bo: 6, hanh: 'Hỏa', kinhAm: 'Thủ Thiếu Âm Tâm', kinhDuong: 'Thủ Thái Dương Tiểu Trường', viTriAm: 'thủ', viTriDuong: 'thủ' }
]

// Ngũ Du Huyệt - tên các loại huyệt
const NGU_DU_HUYET = ['Tĩnh', 'Vinh', 'Du', 'Kinh', 'Hợp']
const NGU_DU_HUYET_DUONG = ['Tĩnh', 'Vinh', 'Du', 'Nguyên', 'Kinh', 'Hợp']

// Thứ tự Hành theo chiều tương sinh (dùng cho tính hành của huyệt)
const HANH_SEQUENCE = ['Thổ', 'Kim', 'Thủy', 'Thử', 'Mộc', 'Hỏa']

// Function: Tính Hành của huyệt dựa trên Bộ của kinh
function getHuyetHanh(boIndex: number, huyetIndex: number): string {
  // Bộ sinh ra Hành đầu tiên (Tĩnh)
  // boIndex: 0-5 (Thổ=0, Kim=1, ...)
  // Tĩnh = Bộ sinh ra = (boIndex + 1) % 6
  const tinhHanhIndex = (boIndex + 1) % 6
  const huyetHanhIndex = (tinhHanhIndex + huyetIndex) % 6
  return HANH_SEQUENCE[huyetHanhIndex] as string
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <!-- Header -->
    <header class="flex items-center gap-4 px-4 py-3 pt-safe border-b border-color">
      <button @click="emit('exit')" class="text-xl">←</button>
      <span class="font-semibold">Học tập Lục Khí</span>
    </header>

    <!-- Tab Navigation -->
    <nav class="flex border-b border-color bg-secondary">
      <button
        v-for="tab in TABS"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="[
          'flex-1 py-2 text-xs font-medium transition-colors',
          activeTab === tab.value
            ? 'text-accent border-b-2 border-accent'
            : 'text-secondary hover:text-primary'
        ]"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- Content -->
    <main class="flex-1 overflow-y-auto px-4 py-4">
      <!-- Tab: Diagram -->
      <div v-if="activeTab === 'diagram'" class="flex flex-col items-center">
        <HexagramDiagram :selected-topic="selectedTopic" />

        <select v-model="selectedTopic"
          class="mt-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-primary">
          <option v-for="opt in TOPIC_OPTIONS" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <p class="mt-3 text-xs text-secondary text-center">
          Chọn chủ đề để xem thông tin tương ứng
        </p>
      </div>

      <!-- Tab: Master Table -->
      <div v-else-if="activeTab === 'table'" class="space-y-4">
        <h3 class="text-sm font-semibold text-center text-accent">Bảng Master - Position is King</h3>

        <div class="overflow-x-auto -mx-2">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-secondary">
                <th class="px-2 py-1.5 text-center font-bold">Pos</th>
                <th class="px-2 py-1.5 text-left">Hành</th>
                <th class="px-2 py-1.5 text-left">Khí</th>
                <th class="px-2 py-1.5 text-left">Kinh</th>
                <th class="px-2 py-1.5 text-left">Tạng</th>
                <th class="px-2 py-1.5 text-left">Phủ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in MASTER_TABLE" :key="row.pos" class="border-b border-color">
                <td class="px-2 py-1.5 text-center font-bold text-accent">{{ row.pos }}</td>
                <td class="px-2 py-1.5">{{ row.hanh }}</td>
                <td class="px-2 py-1.5">{{ row.khi }}</td>
                <td class="px-2 py-1.5">{{ row.kinh }}</td>
                <td class="px-2 py-1.5">{{ row.tang }}</td>
                <td class="px-2 py-1.5">{{ row.phu }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Biểu Lý -->
        <div class="mt-4">
          <h4 class="text-xs font-semibold mb-2 text-secondary">Biểu Lý (Tạng ↔ Phủ cùng Bộ)</h4>
          <div class="grid grid-cols-2 gap-1 text-xs">
            <div v-for="pair in BIEU_LY" :key="pair.bo" class="flex items-center gap-1 px-2 py-1 bg-secondary rounded">
              <span class="text-accent font-bold">{{ pair.bo }}.</span>
              <span>{{ pair.tang }}</span>
              <span class="text-purple-500">↔</span>
              <span>{{ pair.phu }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Huyệt đạo -->
      <div v-else-if="activeTab === 'huyet'" class="space-y-4">
        <h3 class="text-sm font-semibold text-center text-accent">Ngũ Du Huyệt & Hành/Bộ</h3>

        <!-- Giới thiệu -->
        <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs">
          <p class="font-semibold mb-1">Ngũ Du Huyệt là gì?</p>
          <p class="text-secondary">5 huyệt quan trọng trên mỗi kinh, từ đầu ngón tay/chân đi vào cơ thể.</p>
        </div>

        <!-- Kinh Âm vs Kinh Dương -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
            <p class="font-semibold text-pink-600 dark:text-pink-400 mb-1">Kinh Âm (5 huyệt)</p>
            <p v-for="(h, i) in NGU_DU_HUYET" :key="i" class="text-secondary">{{ i + 1 }}. {{ h }}</p>
          </div>
          <div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p class="font-semibold text-blue-600 dark:text-blue-400 mb-1">Kinh Dương (6 huyệt)</p>
            <p v-for="(h, i) in NGU_DU_HUYET_DUONG" :key="i" class="text-secondary">{{ i + 1 }}. {{ h }}</p>
          </div>
        </div>

        <!-- Quy luật tính Hành của huyệt -->
        <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h4 class="font-semibold text-sm mb-2">Quy Luật Tính Hành Của Huyệt</h4>
          <div class="text-xs space-y-1 text-secondary">
            <p><strong>Bước 1:</strong> Xác định BỘ của kinh (1-6)</p>
            <p><strong>Bước 2:</strong> Huyệt Tĩnh = Hành mà BỘ đó <span class="text-accent">sinh ra</span></p>
            <p><strong>Bước 3:</strong> Các huyệt tiếp theo theo chiều tương sinh</p>
          </div>
        </div>

        <!-- Ví dụ -->
        <div class="p-3 bg-secondary rounded-lg">
          <h4 class="font-semibold text-sm mb-2">Ví dụ: Kinh Tâm (Bộ 6 - Hỏa)</h4>
          <div class="text-xs space-y-1">
            <p class="text-secondary">Hỏa sinh → <span class="text-accent">Thổ</span> (Tĩnh)</p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span v-for="(h, i) in NGU_DU_HUYET" :key="i"
                class="px-2 py-1 bg-primary rounded text-xs">
                {{ h }}: <span class="text-accent">{{ getHuyetHanh(5, i) }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Bảng 6 Bộ -->
        <div>
          <h4 class="text-xs font-semibold mb-2 text-secondary">6 Bộ - Kinh Âm & Dương</h4>
          <div class="space-y-2">
            <div v-for="bo in LUC_BO" :key="bo.bo" class="p-2 bg-secondary rounded-lg text-xs">
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 bg-accent text-white rounded font-bold">{{ bo.bo }}</span>
                <span class="font-semibold">{{ bo.hanh }}</span>
              </div>
              <div class="grid grid-cols-1 gap-1 text-secondary">
                <p><span class="text-pink-500">Âm:</span> {{ bo.kinhAm }}</p>
                <p><span class="text-blue-500">Dương:</span> {{ bo.kinhDuong }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mẹo nhớ -->
        <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 class="font-semibold text-sm mb-2">Mẹo Nhớ Thủ/Túc</h4>
          <div class="text-xs space-y-1 text-secondary">
            <p><strong>Kinh Âm:</strong> Túc-Thủ-Túc-Thủ-Túc-Thủ (xen kẽ)</p>
            <p><strong>Kinh Dương:</strong> Thủ-Túc-Túc-Thủ-Túc-Thủ</p>
            <p class="mt-2 text-accent">💡 Tạng có HÀNH = BỘ. Phủ có HÀNH ≠ BỘ.</p>
          </div>
        </div>
      </div>

      <!-- Tab: Formulas -->
      <div v-else-if="activeTab === 'formulas'" class="space-y-4">
        <h3 class="text-sm font-semibold text-center text-accent">Công Thức Số Học</h3>

        <!-- Tương Sinh -->
        <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-blue-500 font-bold text-lg">→</span>
            <span class="font-semibold text-sm">Tương Sinh: +N</span>
          </div>
          <p class="text-xs text-secondary">Pos(đáp án) = Pos(biết) + khoảng_cách</p>
          <p class="text-xs text-secondary">Nếu &gt; 6 → trừ 6</p>
        </div>

        <!-- Phản Sinh -->
        <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-red-500 font-bold text-lg">←</span>
            <span class="font-semibold text-sm">Phản Sinh: -N</span>
          </div>
          <p class="text-xs text-secondary">Pos(đáp án) = Pos(biết) - khoảng_cách</p>
          <p class="text-xs text-secondary">Nếu ≤ 0 → cộng 6</p>
        </div>

        <!-- Tương Khắc -->
        <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-purple-500 font-bold text-lg">↔</span>
            <span class="font-semibold text-sm">Tương Khắc: ±3</span>
          </div>
          <p class="text-xs text-secondary">Cặp khắc: 1↔4, 2↔5, 3↔6</p>
          <p class="text-xs text-secondary">Công thức: Pos ± 3</p>
        </div>

        <!-- Huyệt Hành -->
        <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-green-500 font-bold text-lg">⊕</span>
            <span class="font-semibold text-sm">Hành Huyệt: Bộ → sinh</span>
          </div>
          <p class="text-xs text-secondary">Tĩnh = Hành mà Bộ sinh ra</p>
          <p class="text-xs text-secondary">Tiếp theo: tương sinh (+1 mỗi huyệt)</p>
        </div>

        <!-- Ví dụ -->
        <div class="p-3 bg-secondary rounded-lg">
          <h4 class="font-semibold text-sm mb-2">Ví dụ</h4>
          <div class="text-xs space-y-2">
            <div>
              <p class="text-secondary">Q: Táo (pos 2) + 3 tương sinh = ?</p>
              <p class="text-accent">A: 2 + 3 = 5 → Phong</p>
            </div>
            <div>
              <p class="text-secondary">Q: Kinh Phế (Bộ 2-Kim), huyệt Tĩnh = ?</p>
              <p class="text-accent">A: Kim sinh Thủy → Tĩnh = Thủy</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Tips -->
      <div v-else-if="activeTab === 'tips'" class="space-y-4">
        <h3 class="text-sm font-semibold text-center text-accent">Mẹo Nhớ Nhanh</h3>

        <!-- Mnemonics -->
        <div class="space-y-2">
          <div class="p-2 bg-secondary rounded-lg">
            <p class="text-xs font-semibold text-accent">Lục Hành</p>
            <p class="text-sm">"Thổ Kim Thủy, Thử Mộc Hỏa"</p>
          </div>
          <div class="p-2 bg-secondary rounded-lg">
            <p class="text-xs font-semibold text-accent">Lục Khí</p>
            <p class="text-sm">"Thấp Táo Hàn, Thử Phong Hỏa"</p>
          </div>
          <div class="p-2 bg-secondary rounded-lg">
            <p class="text-xs font-semibold text-accent">Lục Tạng</p>
            <p class="text-sm">"Tỳ Phế Thận, Bào Can Tâm"</p>
          </div>
          <div class="p-2 bg-secondary rounded-lg">
            <p class="text-xs font-semibold text-accent">Lục Phủ</p>
            <p class="text-sm">"Đại Vị Bàng, Tam Đởm Tiểu"</p>
          </div>
          <div class="p-2 bg-secondary rounded-lg">
            <p class="text-xs font-semibold text-accent">Ngũ Du Huyệt</p>
            <p class="text-sm">"Tĩnh Vinh Du Kinh Hợp"</p>
            <p class="text-xs text-secondary mt-1">Kinh Dương thêm: Nguyên (sau Du)</p>
          </div>
        </div>

        <!-- Speed Tips -->
        <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h4 class="font-semibold text-sm mb-2">Speed Tips</h4>
          <ul class="text-xs space-y-1 text-secondary">
            <li>1. <strong>Đừng dịch</strong> - Nhớ thẳng số position</li>
            <li>2. <strong>Nhẩm số trước</strong> - Tính pos rồi tra tên</li>
            <li>3. <strong>3 cặp khắc</strong> - 1↔4, 2↔5, 3↔6</li>
            <li>4. <strong>Biểu Lý</strong> - Cùng Bộ = cùng pos</li>
            <li>5. <strong>Huyệt Tĩnh</strong> - Bộ sinh ra Hành</li>
          </ul>
        </div>

        <!-- Poem -->
        <div class="p-3 bg-secondary rounded-lg">
          <h4 class="font-semibold text-sm mb-2">Bài Thơ 12 Đường Kinh</h4>
          <div class="text-xs space-y-2 font-mono">
            <div>
              <p class="text-accent font-semibold">Ngón TAY:</p>
              <p>"Phế cái - đại trỏ - bào lạc trung</p>
              <p>Áp Tam - tâm út - tiểu trường đồng"</p>
            </div>
            <div>
              <p class="text-accent font-semibold">Ngón CHÂN:</p>
              <p>"Út bàng - áp đởm - trung bàn thận</p>
              <p>Vị trỏ - can tỳ ngón cái cùng"</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
