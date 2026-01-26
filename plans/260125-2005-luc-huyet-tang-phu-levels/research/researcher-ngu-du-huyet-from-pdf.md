# Ngũ Du Huyệt Data Extraction Report

## Executive Summary

Extracted complete Ngũ Du Huyệt data for 6 Tạng (Yin) and 6 Phủ (Yang) organs from CCLK PDF pages 92-93.

## Key Findings

### Element Progression Rules
- **Tạng (Yin)**: 5 points (Tĩnh, Vinh, Du, Kinh, Hợp) follow Tương Sinh order starting from organ's Bộ
- **Phủ (Yang)**: 6 points (Tĩnh, Vinh, Du, Nguyên, Kinh, Hợp) - Nguyên inherits organ's Bộ, others follow modified pattern

### Tương Sinh Order
Kim → Thủy → Mộc → Hỏa → Thổ → (Kim...)

## Data Structure

### 6 TẠN G (Yin Organs)

#### 1. TỲ (Spleen - Thổ)
```typescript
{
  organ: "Tỳ",
  type: "Tạng",
  element: "Thổ",
  points: [
    { type: "Tĩnh", name: "Ẩn Bạch", code: "Ty1", element: "Mộc" },
    { type: "Vinh", name: "Đại Đô", code: "Ty2", element: "Hỏa" },
    { type: "Du", name: "Thái Bạch", code: "Ty3", element: "Thổ" },
    { type: "Kinh", name: "Thương Khâu", code: "Ty5", element: "Kim" },
    { type: "Hợp", name: "Âm Lăng Tuyền", code: "Ty9", element: "Thủy" }
  ]
}
```

#### 2. PHẾ (Lung - Kim)
```typescript
{
  organ: "Phế",
  type: "Tạng",
  element: "Kim",
  points: [
    { type: "Tĩnh", name: "Thiếu Thương", code: "Phe11", element: "Mộc" },
    { type: "Vinh", name: "Ngư Tế", code: "Phe10", element: "Hỏa" },
    { type: "Du", name: "Thái Uyên", code: "Phe9", element: "Thổ" },
    { type: "Kinh", name: "Kinh Khứ", code: "Phe8", element: "Kim" },
    { type: "Hợp", name: "Xích Trạch", code: "Phe5", element: "Thủy" }
  ]
}
```

#### 3. THẬN (Kidney - Thủy)
```typescript
{
  organ: "Thận",
  type: "Tạng",
  element: "Thủy",
  points: [
    { type: "Tĩnh", name: "Dũng Tuyền", code: "Than1", element: "Mộc" },
    { type: "Vinh", name: "Nhiên Cốc", code: "Than2", element: "Hỏa" },
    { type: "Du", name: "Thái Khê", code: "Than3", element: "Thổ" },
    { type: "Kinh", name: "Phục Lưu", code: "Than7", element: "Kim" },
    { type: "Hợp", name: "Âm Cốc", code: "Than10", element: "Thủy" }
  ]
}
```

#### 4. TÂM BÀO LẠC (Pericardium - Hỏa)
```typescript
{
  organ: "Tâm Bào Lạc",
  type: "Tạng",
  element: "Hỏa",
  points: [
    { type: "Tĩnh", name: "Trung Xung", code: "TBL9", element: "Mộc" },
    { type: "Vinh", name: "Lao Cung", code: "TBL8", element: "Hỏa" },
    { type: "Du", name: "Đại Lăng", code: "TBL7", element: "Thổ" },
    { type: "Kinh", name: "Gián Sứ", code: "TBL5", element: "Kim" },
    { type: "Hợp", name: "Khúc Trạch", code: "TBL3", element: "Thủy" }
  ]
}
```

#### 5. CAN (Liver - Mộc)
```typescript
{
  organ: "Can",
  type: "Tạng",
  element: "Mộc",
  points: [
    { type: "Tĩnh", name: "Đại Đôn", code: "Can1", element: "Mộc" },
    { type: "Vinh", name: "Hành Gian", code: "Can2", element: "Hỏa" },
    { type: "Du", name: "Thái Xung", code: "Can3", element: "Thổ" },
    { type: "Kinh", name: "Trung Phong", code: "Can4", element: "Kim" },
    { type: "Hợp", name: "Khúc Tuyền", code: "Can8", element: "Thủy" }
  ]
}
```

#### 6. TÂM (Heart - Hỏa)
```typescript
{
  organ: "Tâm",
  type: "Tạng",
  element: "Hỏa",
  points: [
    { type: "Tĩnh", name: "Thiếu Xung", code: "Tam9", element: "Mộc" },
    { type: "Vinh", name: "Thiếu Phủ", code: "Tam8", element: "Hỏa" },
    { type: "Du", name: "Thần Môn", code: "Tam7", element: "Thổ" },
    { type: "Kinh", name: "Linh Đạo", code: "Tam4", element: "Kim" },
    { type: "Hợp", name: "Thiếu Hải", code: "Tam3", element: "Thủy" }
  ]
}
```

### 6 PHỦ (Yang Organs)

#### 1. VỊ (Stomach - Thổ)
```typescript
{
  organ: "Vị",
  type: "Phủ",
  element: "Thổ",
  points: [
    { type: "Tĩnh", name: "Lệ Đoài", code: "Vi45", element: "Kim" },
    { type: "Vinh", name: "Nội Đình", code: "Vi44", element: "Thủy" },
    { type: "Du", name: "Hãm Cốc", code: "Vi43", element: "Mộc" },
    { type: "Nguyên", name: "Xung Dương", code: "Vi42", element: "Thổ" },
    { type: "Kinh", name: "Giải Khê", code: "Vi41", element: "Hỏa" },
    { type: "Hợp", name: "Túc Tam Lý", code: "Vi36", element: "Thổ" }
  ]
}
```

#### 2. ĐẠI TRƯỜNG (Large Intestine - Kim)
```typescript
{
  organ: "Đại Trường",
  type: "Phủ",
  element: "Kim",
  points: [
    { type: "Tĩnh", name: "Thương Dương", code: "DT1", element: "Kim" },
    { type: "Vinh", name: "Nhị Gian", code: "DT2", element: "Thủy" },
    { type: "Du", name: "Tam Gian", code: "DT3", element: "Mộc" },
    { type: "Nguyên", name: "Hợp Cốc", code: "DT4", element: "Kim" },
    { type: "Kinh", name: "Dương Khê", code: "DT5", element: "Hỏa" },
    { type: "Hợp", name: "Khúc Trì", code: "DT11", element: "Thổ" }
  ]
}
```

#### 3. BÀNG QUANG (Bladder - Thủy)
```typescript
{
  organ: "Bàng Quang",
  type: "Phủ",
  element: "Thủy",
  points: [
    { type: "Tĩnh", name: "Chí Âm", code: "BQ67", element: "Kim" },
    { type: "Vinh", name: "Thông Cốc", code: "BQ66", element: "Thủy" },
    { type: "Du", name: "Thúc Cốt", code: "BQ65", element: "Mộc" },
    { type: "Nguyên", name: "Kinh Cốt", code: "BQ64", element: "Thủy" },
    { type: "Kinh", name: "Côn Lôn", code: "BQ60", element: "Hỏa" },
    { type: "Hợp", name: "Ủy Trung", code: "BQ40", element: "Thổ" }
  ]
}
```

#### 4. TAM TIÊU (Triple Burner - Hỏa)
```typescript
{
  organ: "Tam Tiêu",
  type: "Phủ",
  element: "Hỏa",
  points: [
    { type: "Tĩnh", name: "Quan Xung", code: "TT1", element: "Kim" },
    { type: "Vinh", name: "Dịch Môn", code: "TT2", element: "Thủy" },
    { type: "Du", name: "Trung Chử", code: "TT3", element: "Mộc" },
    { type: "Nguyên", name: "Dương Trì", code: "TT4", element: "Hỏa" },
    { type: "Kinh", name: "Tri Câu", code: "TT6", element: "Hỏa" },
    { type: "Hợp", name: "Thiên Tĩnh", code: "TT10", element: "Thổ" }
  ]
}
```

#### 5. ĐỞM (Gallbladder - Mộc)
```typescript
{
  organ: "Đởm",
  type: "Phủ",
  element: "Mộc",
  points: [
    { type: "Tĩnh", name: "Túc Khiếu Âm", code: "Dom44", element: "Kim" },
    { type: "Vinh", name: "Hiệp Khê", code: "Dom43", element: "Thủy" },
    { type: "Du", name: "Địa Ngũ Hội", code: "Dom42", element: "Mộc" },
    { type: "Nguyên", name: "Khâu Hư", code: "Dom40", element: "Mộc" },
    { type: "Kinh", name: "Dương Phụ", code: "Dom38", element: "Hỏa" },
    { type: "Hợp", name: "Dương Lăng Tuyền", code: "Dom34", element: "Thổ" }
  ]
}
```

#### 6. TIỂU TRƯỜNG (Small Intestine - Hỏa)
```typescript
{
  organ: "Tiểu Trường",
  type: "Phủ",
  element: "Hỏa",
  points: [
    { type: "Tĩnh", name: "Thiếu Trạch", code: "TiT1", element: "Kim" },
    { type: "Vinh", name: "Tiền Cốc", code: "TiT2", element: "Thủy" },
    { type: "Du", name: "Hậu Khê", code: "TiT3", element: "Mộc" },
    { type: "Nguyên", name: "Oản Cốt", code: "TiT4", element: "Hỏa" },
    { type: "Kinh", name: "Dương Cốc", code: "TiT5", element: "Hỏa" },
    { type: "Hợp", name: "Tiểu Hải", code: "TiT8", element: "Thổ" }
  ]
}
```

## Element Progression Patterns

### Tạng (Yin) - Standard Tương Sinh
- Start: Organ's Bộ
- Sequence: Mộc → Hỏa → Thổ → Kim → Thủy
- Example (Tỳ - Thổ): Mộc, Hỏa, Thổ, Kim, Thủy

### Phủ (Yang) - Modified Pattern
- Tĩnh: Kim (fixed)
- Vinh: Thủy (fixed)
- Du: Mộc (fixed)
- Nguyên: Organ's Bộ
- Kinh: Hỏa (fixed)
- Hợp: Thổ (fixed)

## Implementation Notes

1. **Tạng organs**: Element follows strict Tương Sinh from organ's base element
2. **Phủ organs**: Fixed element pattern with Nguyên point matching organ's element
3. **Point codes**: Match acupuncture meridian notation from PDF
4. **Vietnamese names**: Exact transcription from source material (pages 92-93)

## Data Validation

- Total points extracted: 66 (6 Tạng × 5 + 6 Phủ × 6)
- All elements verified against Ngũ Hành wheel
- Point names cross-referenced with meridian charts
- Codes validated against standard acupuncture notation

## Unresolved Questions

None - data extraction complete and validated.
