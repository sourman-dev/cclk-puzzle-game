# Mẹo Tính Nhẩm Nhanh - Châm Cứu Lục Khí

## Nguyên Tắc Vàng: Position is King 👑

**Tất cả các chuỗi đều share cùng thứ tự 1→6. Chỉ cần nhớ SỐ THỨ TỰ.**

---

## 1. Bảng Master - Học Thuộc Lòng

| Pos | Hành | Khí | Kinh | Tạng | Phủ |
|:---:|------|-----|------|------|-----|
| **1** | Thổ | Thấp | Thái Âm | Tỳ | Đại Trường |
| **2** | Kim | Táo | Dương Minh | Phế | Vị |
| **3** | Thủy | Hàn | Thái Dương | Thận | Bàng Quang |
| **4** | Thử | Thử | Thiếu Âm | Tâm Bào | Tam Tiêu |
| **5** | Mộc | Phong | Quyết Âm | Can | Đởm |
| **6** | Hỏa | Hỏa | Thiếu Dương | Tâm | Tiểu Trường |

### Mnemonic (Câu thần chú)

**Lục Hành**: "Thổ Kim Thủy, Thử Mộc Hỏa" (3-3 nhịp)

**Lục Khí**: "Thấp Táo Hàn, Thử Phong Hỏa"

**Lục Kinh**: "Thái Dương, Thiếu Quyết Thiếu" (Âm-Minh-Dương, Âm-Âm-Dương)

**Lục Tạng**: "Tỳ Phế Thận, Bào Can Tâm"

---

## 2. Công Thức Số Học

### Tương Sinh (→): +N (mod 6)
```
Pos(đáp án) = Pos(biết) + khoảng_cách
Nếu > 6 → trừ 6
```

### Phản Sinh (←): -N (mod 6)
```
Pos(đáp án) = Pos(biết) - khoảng_cách
Nếu ≤ 0 → cộng 6
```

### Tương Khắc (↔): ±3
```
Cặp khắc nhau: 1↔4, 2↔5, 3↔6
Công thức: Pos ± 3 (nếu >6 thì -6, nếu <1 thì +6)
```

---

## 3. Ví Dụ Thực Tế

### Ví dụ 1: Lục Khí - Tương Sinh
**Câu hỏi**: Vị trí 2 là "Táo", vị trí 5 là gì?

```
Táo = position 2
Khoảng cách: 5 - 2 = +3
Tra bảng: Position 5 = Phong
→ Đáp án: Phong
```

### Ví dụ 2: Lục Tạng - Phản Sinh
**Câu hỏi**: Vị trí 3 là "Thận", vị trí 1 là gì?

```
Thận = position 3
Phản sinh từ 3 → 1: khoảng cách -2
Position 1 = Tỳ
→ Đáp án: Tỳ
```

### Ví dụ 3: Tương Khắc
**Câu hỏi**: "Táo" khắc với gì?

```
Táo = position 2
Khắc: 2 + 3 = 5
Position 5 trong Lục Khí = Phong
→ Đáp án: Phong
```

---

## 4. Kinh Lạc - 12 Đường Kinh

### Pattern Thủ/Túc

| Bộ | Kinh Âm (Tương Sinh) | Kinh Dương (Phản Sinh) |
|----|---------------------|------------------------|
| 1-Thổ | **Túc** Thái Âm Tỳ | **Thủ** Dương Minh Đại Trường |
| 2-Kim | **Thủ** Thái Âm Phế | **Túc** Dương Minh Vị |
| 3-Thủy | **Túc** Thiếu Âm Thận | **Túc** Thái Dương Bàng Quang |
| 4-Thử | **Thủ** Quyết Âm Tâm Bào | **Thủ** Thiếu Dương Tam Tiêu |
| 5-Mộc | **Túc** Quyết Âm Can | **Túc** Thiếu Dương Đởm |
| 6-Hỏa | **Thủ** Thiếu Âm Tâm | **Thủ** Thái Dương Tiểu Trường |

### Trick: Thủ/Túc Pattern
- **Kinh Âm**: Túc-Thủ-Túc-Thủ-Túc-Thủ (xen kẽ, bắt đầu Túc)
- **Kinh Dương**: Thủ-Túc-Túc-Thủ-Túc-Thủ (phức tạp hơn)

### Trick: Biểu Lý (Âm-Dương cùng Bộ)
```
Tỳ ↔ Đại Trường (Bộ 1)
Phế ↔ Vị (Bộ 2)
Thận ↔ Bàng Quang (Bộ 3)
Tâm Bào ↔ Tam Tiêu (Bộ 4)
Can ↔ Đởm (Bộ 5)
Tâm ↔ Tiểu Trường (Bộ 6)
```

---

## 5. Chiều Vận Hành Khí Huyết

### Quy luật chung
- **Kinh Âm**: Đi từ Tạng → Ngón (ly tâm)
- **Kinh Dương**: Đi từ Ngón → Đầu → Chân (hướng tâm rồi xuống)

### Vòng tuần hoàn 12 kinh
```
Phế → Đại Trường → Vị → Tỳ → Tâm → Tiểu Trường
→ Bàng Quang → Thận → Tâm Bào → Tam Tiêu → Đởm → Can → (quay lại Phế)
```

**Trick**: Nhớ theo cặp Biểu-Lý:
```
Phế-ĐTr → Vị-Tỳ → Tâm-TTr → BQ-Thận → TBào-TTiêu → Đởm-Can
```

---

## 6. Tóm Tắt Siêu Nhanh

| Muốn tìm | Công thức |
|----------|-----------|
| Tương Sinh +1 | Pos + 1 (>6 → -6) |
| Phản Sinh -1 | Pos - 1 (<1 → +6) |
| Tương Khắc | Pos ± 3 |
| Biểu Lý | Tạng ↔ Phủ cùng Bộ |

### Speed Tips
1. **Đừng dịch** - Nhớ thẳng số position
2. **Nhẩm số trước** - Tính position đáp án rồi mới tra tên
3. **3 cặp khắc** - 1↔4, 2↔5, 3↔6 (luôn cách 3)
4. **Biểu Lý** - Cùng Bộ = cùng position

---

## 8. Bài Thơ 12 Đường Kinh - Điểm Khởi/Cuối

### Mnemonic thơ

```
10 đầu ngón TAY:
"Phế cái - đại trỏ - bào lạc trung
 Áp Tam - tâm út - tiểu trường đồng"

10 đầu ngón CHÂN (riêng Thận ở lòng bàn chân):
"Út bàng - áp đởm - trung bàn thận
 Vị trỏ - can tỳ ngón cái cùng"
```

### Bảng giải mã

**Ngón TAY (Thủ):**
| Ngón | Âm | Dương |
|------|-----|-------|
| Cái | Phế | - |
| Trỏ | - | Đại Trường |
| Giữa | Tâm Bào | - |
| Áp út | - | Tam Tiêu |
| Út | Tâm | Tiểu Trường |

**Ngón CHÂN (Túc):**
| Ngón | Âm | Dương |
|------|-----|-------|
| Cái | Can, Tỳ | - |
| Trỏ | - | Vị |
| Áp út | - | Đởm |
| Út | - | Bàng Quang |
| Lòng bàn chân | Thận | - |

### Pattern nhớ nhanh
- **Kinh Âm**: Chạy ở mặt TRONG tay/chân
- **Kinh Dương**: Chạy ở mặt NGOÀI tay/chân
- **Ngón út** đặc biệt: Có 2 kinh (Tâm + Tiểu Trường ở tay, Bàng Quang ở chân)
- **Ngón cái chân**: Có 2 kinh Âm (Can + Tỳ)

---

## 9. Luyện Tập

1. Thấp (pos 1) + 3 theo Tương Sinh = ?
2. Phong (pos 5) khắc với gì?
3. Tỳ biểu lý với Phủ nào?
4. Phế thuộc Bộ mấy? Kinh Dương cùng Bộ là gì?

<details>
<summary>Đáp án</summary>

1. Position 4 = Thử
2. Position 2 = Táo
3. Đại Trường (cùng Bộ 1 với Tỳ)
4. Bộ 2, Kinh Dương = Vị

</details>
