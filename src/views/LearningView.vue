<script setup lang="ts">
import { ref, computed } from 'vue'
import HexagramDiagram from '@/components/learning/HexagramDiagram.vue'
import { ACUPOINTS_DATA } from '@/data/knowledge/acupoints'

import { TANG_PHU_DATA } from '@/data/knowledge/luc-hanh'
import { ACUPUNCTURE_SETS, type AcupunctureSystem } from '@/data/knowledge/acupuncture-sets'

import type { TopicType } from '@/types'
type TabType = 'theory' | 'diagram' | 'table' | 'huyet' | 'bo_huyet' | 'formulas' | 'tips'

const emit = defineEmits<{ exit: [] }>()

const selectedTopic = ref<TopicType>('luc_hanh')
const activeTab = ref<TabType>('theory')

const TOPIC_OPTIONS: { value: TopicType; label: string }[] = [
  { value: 'luc_hanh', label: 'Lục Hành' },
  { value: 'luc_khi', label: 'Lục Khí' },
  { value: 'luc_kinh', label: 'Lục Kinh' },
  { value: 'luc_tang', label: 'Lục Tạng' },
  { value: 'luc_phu', label: 'Lục Phủ' }
]

const TABS: { value: TabType; label: string }[] = [
  { value: 'theory', label: 'Lý thuyết' },
  { value: 'diagram', label: 'Sơ đồ' },
  { value: 'table', label: 'Bảng' },
  { value: 'huyet', label: 'Huyệt' },
  { value: 'bo_huyet', label: 'Bộ Huyệt' },
  { value: 'formulas', label: 'Công thức' },
  { value: 'tips', label: 'Mẹo' }
]

const THEORY_BASICS = {
  vuTruQuan: [
    'Vô cực sinh Thái cực.',
    'Thái cực sinh Lưỡng nghi (Âm - Dương).',
    'Lưỡng nghi sinh Tứ tượng (Thiếu dương, Thái dương, Thiếu âm, Thái âm).',
    'Tứ tượng sinh Bát quái.',
    'Từ Bát quái: Dương sinh Lục Khí, Âm sinh Ngũ Hành.'
  ],
  dinhNghia: [
    { ten: 'Hàn khí', tinhChat: 'Lạnh', hanh: 'Thủy', kinh: 'Thái Dương' },
    { ten: 'Táo khí', tinhChat: 'Khô', hanh: 'Kim', kinh: 'Dương Minh' },
    { ten: 'Hỏa khí', tinhChat: 'Nóng', hanh: 'Hỏa', kinh: 'Thiếu Dương' },
    { ten: 'Thử khí', tinhChat: 'Ấm', hanh: 'Thử', kinh: 'Thiếu Âm' },
    { ten: 'Phong khí', tinhChat: 'Gió', hanh: 'Mộc', kinh: 'Quyết Âm' },
    { ten: 'Thấp khí', tinhChat: 'Mát', hanh: 'Thổ', kinh: 'Thái Âm' }
  ]
}

const activeKinhId = ref<string | null>(null)
const selectedAcupoint = ref<any>(null)

// Derive 12 distinct meridian labels from TANG_PHU_DATA (BỘ-based pairings)
const allKinhLabels = computed(() => {
  // Tạng (6 Kinh Âm)
  const tangLabels = TANG_PHU_DATA.filter(tp => tp.isTang).map(tp => ({
    id: tp.id, ten: tp.ten, kinhName: tp.ten, fullKinh: tp.kinhAm, isTang: true
  }))
  // Phủ (6 Kinh Dương) — use kinhDuong from each Phủ entry
  const phuLabels = TANG_PHU_DATA.filter(tp => !tp.isTang).map(tp => ({
    id: tp.id, ten: tp.ten, kinhName: tp.ten, fullKinh: tp.kinhDuong, isTang: false
  }))
  return [...tangLabels, ...phuLabels]
})

function getAcupointsForKinh(id: string) {
  return ACUPOINTS_DATA[id] || []
}

// Master table data (position-based, HÀNH pairs from docs)
const MASTER_TABLE = [
  { pos: 1, hanh: 'Thổ', khi: 'Thấp', kinh: 'Thái Âm / Dương Minh', tang: 'Tỳ', phu: 'Vị' },
  { pos: 2, hanh: 'Kim', khi: 'Táo', kinh: 'Thái Âm / Dương Minh', tang: 'Phế', phu: 'Đại Trường' },
  { pos: 3, hanh: 'Thủy', khi: 'Hàn', kinh: 'Thiếu Âm / Thái Dương', tang: 'Thận', phu: 'Bàng Quang' },
  { pos: 4, hanh: 'Thử', khi: 'Thử', kinh: 'Thiếu Âm / Thái Dương', tang: 'Tâm', phu: 'Tiểu Trường' },
  { pos: 5, hanh: 'Mộc', khi: 'Phong', kinh: 'Quyết Âm / Thiếu Dương', tang: 'Can', phu: 'Đởm' },
  { pos: 6, hanh: 'Hỏa', khi: 'Hỏa', kinh: 'Quyết Âm / Thiếu Dương', tang: 'Tâm Bào', phu: 'Tam Tiêu' }
]

// Biểu Lý pairs (BỘ-based: Tạng ↔ Phủ cùng Bộ)
const BIEU_LY = [
  { tang: 'Tỳ', phu: 'Đại Trường', bo: 1 },
  { tang: 'Phế', phu: 'Vị', bo: 2 },
  { tang: 'Thận', phu: 'Tiểu Trường', bo: 3 },
  { tang: 'Tâm', phu: 'Bàng Quang', bo: 4 },
  { tang: 'Can', phu: 'Tam Tiêu', bo: 5 },
  { tang: 'Tâm Bào', phu: 'Đởm', bo: 6 }
]

// 6 Bộ với Kinh Âm + Kinh Dương chi tiết (BỘ-based pairings - dùng trên lâm sàng)
const LUC_BO = [
  { bo: 1, hanh: 'Thổ', kinhAm: 'Túc Thái Âm Tỳ', kinhDuong: 'Thủ Dương Minh Đại Trường', viTriAm: 'túc', viTriDuong: 'thủ' },
  { bo: 2, hanh: 'Kim', kinhAm: 'Thủ Thái Âm Phế', kinhDuong: 'Túc Dương Minh Vị', viTriAm: 'thủ', viTriDuong: 'túc' },
  { bo: 3, hanh: 'Thủy', kinhAm: 'Túc Thiếu Âm Thận', kinhDuong: 'Thủ Thái Dương Tiểu Trường', viTriAm: 'túc', viTriDuong: 'thủ' },
  { bo: 4, hanh: 'Thử', kinhAm: 'Thủ Thiếu Âm Tâm', kinhDuong: 'Túc Thái Dương Bàng Quang', viTriAm: 'thủ', viTriDuong: 'túc' },
  { bo: 5, hanh: 'Mộc', kinhAm: 'Túc Quyết Âm Can', kinhDuong: 'Thủ Thiếu Dương Tam Tiêu', viTriAm: 'túc', viTriDuong: 'thủ' },
  { bo: 6, hanh: 'Hỏa', kinhAm: 'Thủ Quyết Âm Tâm Bào', kinhDuong: 'Túc Thiếu Dương Đởm', viTriAm: 'thủ', viTriDuong: 'túc' },
]

const selectedSystem = ref<AcupunctureSystem>('thu_cham')
const filteredSets = computed(() => ACUPUNCTURE_SETS.filter(s => s.system === selectedSystem.value))
const activeSetId = ref<string | null>(null)

const SYSTEM_OPTIONS: { value: AcupunctureSystem; label: string }[] = [
  { value: 'thu_cham', label: 'Thủ Châm' },
  { value: 'tuc_cham', label: 'Túc Châm' },
  { value: 'am_cham', label: 'Âm Châm' },
  { value: 'duong_cham', label: 'Dương Châm' }
]

</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <!-- Header -->
    <header class="flex items-center gap-4 px-4 py-3 pt-safe border-b border-color">
      <button @click="emit('exit')" class="text-xl">←</button>
      <span class="font-semibold">Học tập Lục Khí</span>
    </header>

    <!-- Tab Navigation -->
    <nav class="flex border-b border-color bg-secondary overflow-x-auto no-scrollbar">
      <button v-for="tab in TABS" :key="tab.value" @click="activeTab = tab.value" :class="[
        'flex-none px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap',
        activeTab === tab.value
          ? 'text-accent border-b-2 border-accent'
          : 'text-secondary hover:text-primary'
      ]">
        {{ tab.label }}
      </button>
    </nav>

    <!-- Content -->
    <main class="flex-1 overflow-y-auto px-4 py-4">
      <!-- Tab: Theory -->
      <div v-if="activeTab === 'theory'" class="space-y-6">
        <section>
          <h3 class="text-sm font-semibold mb-3 text-accent flex items-center gap-2">
            <span class="w-1 h-4 bg-accent rounded-full"></span>
            Vũ Trụ Quan Lục Khí
          </h3>
          <div class="p-4 bg-secondary rounded-xl space-y-2 border border-color">
            <p v-for="(step, i) in THEORY_BASICS.vuTruQuan" :key="i" class="text-xs flex items-start gap-2">
              <span class="text-accent">•</span>
              <span>{{ step }}</span>
            </p>
          </div>
        </section>

        <section>
          <h3 class="text-sm font-semibold mb-3 text-accent flex items-center gap-2">
            <span class="w-1 h-4 bg-accent rounded-full"></span>
            Định nghĩa 6 Khí
          </h3>
          <div class="grid grid-cols-1 gap-3">
            <div v-for="khi in THEORY_BASICS.dinhNghia" :key="khi.ten"
              class="p-3 bg-secondary rounded-xl border border-color flex items-center justify-between">
              <div>
                <p class="font-bold text-primary">{{ khi.ten }} ({{ khi.tinhChat }})</p>
                <p class="text-[10px] text-secondary">Kinh: {{ khi.kinh }}</p>
              </div>
              <div class="px-3 py-1 bg-accent/10 rounded-full">
                <span class="text-xs font-bold text-accent">Hành {{ khi.hanh }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
          <p class="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
            <strong>Lục khí</strong> là sự khí hóa của trời đất, ảnh hưởng vào lục phủ, lục tạng con người.
            Trong châm cứu Lục Khí, thuật ngữ này chỉ sự khí hóa của tạng phủ.
          </p>
        </section>
      </div>

      <!-- Tab: Diagram -->
      <div v-else-if="activeTab === 'diagram'" class="flex flex-col items-center">
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
        <h3 class="text-sm font-semibold text-center text-accent">Ngũ Du Huyệt & Danh sách Chi tiết</h3>

        <!-- Giới thiệu quy luật -->
        <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h4 class="font-semibold text-sm mb-2">Quy Luật Tính Hành Của Huyệt</h4>
          <div class="text-xs space-y-1 text-secondary">
            <p><strong>Bước 1:</strong> Xác định BỘ của kinh (1-6)</p>
            <p><strong>Bước 2:</strong> Huyệt Tĩnh = Hành mà BỘ đó <span class="text-accent">sinh ra</span></p>
            <p><strong>Bước 3:</strong> Các huyệt tiếp theo theo chiều tương sinh</p>
          </div>
        </div>

        <!-- Bảng 6 Bộ (Quick lookup) -->
        <div class="grid grid-cols-2 gap-2">
          <div v-for="bo in LUC_BO" :key="bo.bo" class="p-2 bg-secondary rounded-lg text-[10px]">
            <div class="flex items-center gap-1 mb-1">
              <span class="w-4 h-4 flex items-center justify-center bg-accent text-white rounded-full font-bold">{{
                bo.bo }}</span>
              <span class="font-bold text-primary">{{ bo.hanh }}</span>
            </div>
            <p class="text-secondary truncate"><span class="text-pink-500">Â:</span> {{ bo.kinhAm }}
            </p>
            <p class="text-secondary truncate"><span class="text-blue-500">D:</span> {{ bo.kinhDuong }}
            </p>
          </div>
        </div>

        <!-- Chi tiết 66 Huyệt -->
        <div class="mt-6">
          <h4 class="text-xs font-bold mb-3 text-secondary uppercase tracking-widest text-center">Chi tiết 66 Huyệt theo
            Kinh</h4>
          <div class="space-y-2">
            <div v-for="kinh in allKinhLabels" :key="kinh.fullKinh"
              class="border border-color rounded-xl overflow-hidden shadow-sm">
              <button @click="activeKinhId = activeKinhId === kinh.fullKinh ? null : kinh.fullKinh"
                :class="['w-full flex items-center justify-between p-3 transition-colors text-left', activeKinhId === kinh.fullKinh ? 'bg-accent/5' : 'bg-secondary hover:bg-primary']">
                <div class="flex items-center gap-2">
                  <span
                    :class="['text-[9px] font-bold px-1.5 py-0.5 rounded mr-1', kinh.isTang ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700']">
                    {{ kinh.isTang ? 'ÂM' : 'DƯƠNG' }}
                  </span>
                  <span class="text-xs font-semibold">{{ kinh.fullKinh }}</span>
                </div>
                <span class="text-secondary text-lg">{{ activeKinhId === kinh.fullKinh ? '−' : '+' }}</span>
              </button>

              <div v-if="activeKinhId === kinh.fullKinh"
                class="p-2 bg-primary grid grid-cols-1 gap-1.5 border-t border-color">
                <div v-for="acu in getAcupointsForKinh(kinh.id)" :key="acu.ten"
                  class="p-2.5 bg-secondary/50 border border-color rounded-lg hover:border-accent cursor-pointer transition-all active:scale-[0.98]"
                  @click="selectedAcupoint = acu">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-accent text-xs">{{ acu.loai }} - {{ acu.ten }}</span>
                    <span class="text-[9px] font-bold bg-accent/10 py-0.5 px-2 rounded-full uppercase">{{ acu.hanh
                    }}</span>
                  </div>
                  <p class="text-[10px] text-secondary leading-tight line-clamp-2 italic">{{ acu.viTri }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Bộ Huyệt -->
      <div v-else-if="activeTab === 'bo_huyet'" class="space-y-4">
        <h3 class="text-sm font-semibold text-center text-accent">24 Bộ Huyệt Căn Bản</h3>

        <!-- System Selection -->
        <div class="flex gap-1 p-1 bg-secondary rounded-lg overflow-x-auto no-scrollbar">
          <button v-for="opt in SYSTEM_OPTIONS" :key="opt.value" @click="selectedSystem = opt.value" :class="[
            'flex-1 px-3 py-1.5 text-[10px] font-bold rounded-md transition-all whitespace-nowrap',
            selectedSystem === opt.value ? 'bg-accent text-white shadow-sm' : 'text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
          ]">
            {{ opt.label }}
          </button>
        </div>

        <div class="space-y-3">
          <div v-for="set in filteredSets" :key="set.id"
            class="border border-color rounded-2xl overflow-hidden bg-secondary/30">
            <button @click="activeSetId = activeSetId === set.id ? null : set.id"
              class="w-full p-4 flex items-center justify-between text-left group">
              <div>
                <h4 class="font-bold text-accent">{{ set.title }}</h4>
                <div class="flex gap-2 mt-1">
                  <span class="text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded decoration-dotted underline"
                    title="Chủ kinh">Chủ: {{ set.principalMeridian }}</span>
                  <span class="text-[9px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded line-through"
                    title="Kinh khắc (bỏ)">Bỏ: {{ set.skipMeridian }}</span>
                </div>
              </div>
              <span class="text-secondary transition-transform duration-200"
                :class="{ 'rotate-180': activeSetId === set.id }">▼</span>
            </button>

            <div v-if="activeSetId === set.id" class="px-4 pb-4 animate-in slide-in-from-top-1 duration-200">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                <div v-for="p in set.points" :key="p.ten"
                  class="p-2 bg-primary rounded-lg border border-color flex flex-col">
                  <span class="text-[10px] font-bold text-primary truncate">{{ p.ten }}</span>
                  <div class="flex items-center justify-between mt-1">
                    <span class="text-[8px] opacity-70">{{ p.loai }}</span>
                    <span class="text-[8px] px-1 bg-accent/10 text-accent rounded-full font-mono">{{ p.hanh[0] }}</span>
                  </div>
                </div>
              </div>
              <p class="mt-3 text-[10px] text-secondary italic text-center">Tổng số: {{ set.points.length }} huyệt</p>
            </div>
          </div>
          <p v-if="filteredSets.length === 0" class="text-center py-10 text-secondary text-xs italic">Dữ liệu cho hệ
            châm này đang được cập nhật...</p>
        </div>
      </div>
      <div v-else-if="activeTab === 'formulas'" class="space-y-4">
        <h3 class="text-sm font-semibold text-center text-accent">Công Thức & Vận Hành</h3>

        <!-- Chiều Vận Hành Khí Huyết -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-100 dark:border-pink-900/30">
            <p class="font-bold text-xs text-pink-700 dark:text-pink-400 mb-2">Kinh Âm (Tạng)</p>
            <p class="text-[10px] text-pink-600 dark:text-pink-300">Khí > Huyết</p>
            <p class="text-[10px] font-bold mt-1">Vận hành: Tương Sinh →</p>
          </div>
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <p class="font-bold text-xs text-blue-700 dark:text-blue-400 mb-2">Kinh Dương (Phủ)</p>
            <p class="text-[10px] text-blue-600 dark:text-blue-300">Huyết > Khí</p>
            <p class="text-[10px] font-bold mt-1">Vận hành: Phản Sinh ←</p>
          </div>
        </div>

        <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-blue-500 font-bold text-lg">→</span>
            <span class="font-semibold text-sm">Tương Sinh: +N</span>
          </div>
          <p class="text-xs text-secondary">Pos(đáp án) = Pos(biết) + khoảng_cách (Nếu > 6 trừ 6)</p>
        </div>

        <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-red-500 font-bold text-lg">←</span>
            <span class="font-semibold text-sm">Phản Sinh: -N</span>
          </div>
          <p class="text-xs text-secondary">Pos(đáp án) = Pos(biết) - khoảng_cách (Nếu ≤ 0 cộng 6)</p>
        </div>

        <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-purple-500 font-bold text-lg">↔</span>
            <span class="font-semibold text-sm">Tương Khắc: ±3</span>
          </div>
          <p class="text-xs text-secondary">Cặp khắc: 1↔4, 2↔5, 3↔6</p>
        </div>

        <div class="p-3 bg-secondary rounded-lg">
          <h4 class="font-semibold text-sm mb-2">Ví dụ</h4>
          <div class="text-xs space-y-2">
            <div>
              <p class="text-secondary">Q: Vị thuộc Bộ nào? Tại sao?</p>
              <p class="text-accent font-bold">A: Vị (hành Thổ) thuộc Bộ 2 (Kim). Cùng Bộ với Phế (Kim).</p>
            </div>
            <div>
              <p class="text-secondary">Q: Thận (Bộ 3-Thủy), Kinh Dương là gì?</p>
              <p class="text-accent font-bold">A: Thủ Thái Dương Tiểu Trường. (Hành Thử phản sinh Thủy).</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Tips -->
      <div v-else-if="activeTab === 'tips'" class="space-y-4">
        <h3 class="text-sm font-semibold text-center text-accent">Mẹo Nhớ Nhanh</h3>

        <div class="space-y-2">
          <div v-for="tip in [
            { label: 'Lục Hành', text: 'Thổ Kim Thủy, Thử Mộc Hỏa' },
            { label: 'Lục Khí', text: 'Thấp Táo Hàn, Thử Phong Hỏa' },
            { label: 'Lục Tạng', text: 'Tỳ Phế Thận, Tâm Can Bào' },
            { label: 'Lục Phủ', text: 'Vị Đại Bàng, Tiểu Đởm Tam' },
            { label: 'Ngũ Du', text: 'Tĩnh Vinh Du (Nguyên) Kinh Hợp' }
          ]" :key="tip.label" class="p-3 bg-secondary rounded-xl border border-color">
            <p class="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{{ tip.label }}</p>
            <p class="text-sm font-medium">{{ tip.text }}</p>
          </div>
        </div>

        <div
          class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
          <h4 class="font-bold text-xs mb-2">Bài Thơ 12 Đường Kinh</h4>
          <div class="text-[11px] space-y-3 font-mono leading-relaxed">
            <div>
              <p class="text-accent font-bold mb-1">Ngón TAY:</p>
              <p>"Phế cái - Đại trỏ - Bào trung</p>
              <p>Tam áp - Tâm út - Tiểu trường đồng"</p>
            </div>
            <div>
              <p class="text-accent font-bold mb-1">Ngón CHÂN:</p>
              <p>"Út bàng - Áp đởm - Trung bàn thận</p>
              <p>Vị trỏ - Can tỳ ngón cái cùng"</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal chi tiết huyệt (Global) -->
    <div v-if="selectedAcupoint"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click="selectedAcupoint = null">
      <div
        class="bg-primary w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 border border-color animate-in fade-in zoom-in duration-200"
        @click.stop>
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-2xl font-black text-accent">{{ selectedAcupoint.ten }}</span>
              <span class="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded-lg uppercase">{{
                selectedAcupoint.hanh }}</span>
            </div>
            <p class="text-sm text-secondary font-medium">{{ selectedAcupoint.loai }}</p>
          </div>
          <button @click="selectedAcupoint = null"
            class="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-secondary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span class="text-xl">&times;</span>
          </button>
        </div>

        <div class="p-5 bg-secondary rounded-2xl border border-color shadow-inner">
          <h4 class="text-[10px] font-bold mb-2 uppercase text-accent tracking-[0.2em]">Mô tả vị trí</h4>
          <p class="text-sm leading-relaxed text-primary">{{ selectedAcupoint.viTri }}</p>
        </div>

        <div
          class="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-800 dark:text-blue-200">
          <span class="text-lg">💡</span>
          <p class="text-[10px] leading-tight italic">Học thuộc vị trí giúp bạn xác định huyệt chính xác trên lâm sàng.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
