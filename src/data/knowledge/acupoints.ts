export interface Acupoint {
  ten: string;
  loai: string; // Tĩnh, Vinh, Du, Nguyên, Kinh, Hợp
  hanh: string;
  viTri: string;
}

export const ACUPOINTS_DATA: Record<string, Acupoint[]> = {
  PHE: [
    {
      ten: "Thiếu Thương",
      loai: "Tĩnh",
      hanh: "Thủy",
      viTri: "Cách góc ngón tay cái 0,1 thốn.",
    },
    {
      ten: "Ngư Tế",
      loai: "Vinh",
      hanh: "Thử",
      viTri:
        "Điểm giữa xương bàn ngón tay cái, nơi tiếp giáp da gan tay và da mu tay.",
    },
    {
      ten: "Thái Uyên",
      loai: "Du",
      hanh: "Mộc",
      viTri: "Chỗ lõm trên động mạch quay, trên lằn chỉ cổ tay.",
    },
    {
      ten: "Kinh Cừ",
      loai: "Kinh",
      hanh: "Hỏa",
      viTri: "Mặt trong đầu dưới xương quay, nếp gấp cổ tay thẳng lên 1 thốn.",
    },
    {
      ten: "Xích Trạch",
      loai: "Hợp",
      hanh: "Thổ",
      viTri: "Trung điểm nếp gấp khuỷu tay, bờ ngoài cơ nhị đầu cánh tay.",
    },
  ],
  DAI_TRUONG: [
    {
      ten: "Thương Dương",
      loai: "Tĩnh",
      hanh: "Kim",
      viTri: "Cách góc ngoài chân móng ngón tay trỏ 0,1 thốn.",
    },
    {
      ten: "Nhị Gian",
      loai: "Vinh",
      hanh: "Thủy",
      viTri:
        "Ở chỗ lõm phía trước và ngoài xương bàn tay và ngón trỏ. Nắm tay để lấy huyệt.",
    },
    {
      ten: "Tam Gian",
      loai: "Du",
      hanh: "Thử",
      viTri: "Ở chỗ lõm phía sau và ngoài xương bàn tay và ngón trỏ.",
    },
    {
      ten: "Hợp Cốc",
      loai: "Nguyên",
      hanh: "Mộc",
      viTri:
        "Bờ ngoài xương bàn ngón 2, trung điểm đường nối 2 huyệt Tam Gian và Dương Khê.",
    },
    {
      ten: "Dương Khê",
      loai: "Kinh",
      hanh: "Hỏa",
      viTri:
        "Chỗ lõm bờ ngoài lằn sau cổ tay, nằm tại hõm lào giải phẫu (khi cong ngón cái lên).",
    },
    {
      ten: "Khúc Trì",
      loai: "Hợp",
      hanh: "Thổ",
      viTri:
        "Co khuỷu tay, huyệt nằm ở trên đầu lằn chỉ nếp gấp khuỷu nơi hõm vào.",
    },
  ],
  VI: [
    {
      ten: "Lệ Đoài",
      loai: "Tĩnh",
      hanh: "Thổ",
      viTri: "Ngoài ngón chân thứ 2, cách góc móng chân 0,1 thốn.",
    },
    {
      ten: "Nội Đình",
      loai: "Vinh",
      hanh: "Kim",
      viTri: "Giữa kẽ ngón chân 2-3.",
    },
    {
      ten: "Hãm Cốc",
      loai: "Du",
      hanh: "Thủy",
      viTri: "Giữa kẽ ngón chân 2,3, đo lên 0,5 thốn về phía mu chân.",
    },
    {
      ten: "Xung Dương",
      loai: "Nguyên",
      hanh: "Thử",
      viTri:
        "Dưới huyệt Giải Khê 1,5 thốn, nơi cao nhất của mu bàn chân chỗ có động mạch đập.",
    },
    {
      ten: "Giải Khê",
      loai: "Kinh",
      hanh: "Mộc",
      viTri:
        "Trên nếp gấp cổ chân giữa 2 gân cơ cẳng chân trước và gân cơ duỗi dài ngón cái.",
    },
    {
      ten: "Túc Tam Lý",
      loai: "Hợp",
      hanh: "Hỏa",
      viTri:
        "Úp bàn tay lên đầu gối, ngón giữa đặt trên xương chày, ngón đeo nhẫn chỉ vào đâu tức là huyệt.",
    },
  ],
  TY: [
    {
      ten: "Ẩn Bạch",
      loai: "Tĩnh",
      hanh: "Kim",
      viTri: "Góc trong ngón chân cái, cách móng chân 0,1 thốn.",
    },
    {
      ten: "Đại Đô",
      loai: "Vinh",
      hanh: "Thủy",
      viTri:
        "Bờ trong xương ngón cái, trên đường tiếp giáp lằn da gan bàn chân chỗ dưới chỏm xương bàn chân.",
    },
    {
      ten: "Thái Bạch",
      loai: "Du",
      hanh: "Thử",
      viTri:
        "Chỗ lõm phía trước mắt cá chân trong, nằm giữa gân cơ cẳng chân sau và khớp sên - thuyền.",
    },
    {
      ten: "Thương Khâu",
      loai: "Kinh",
      hanh: "Mộc",
      viTri:
        "Chỗ lõm phía trước mắt cá chân trong, nằm giữa gân cơ cẳng chân sau và khớp sên - thuyền.",
    },
    {
      ten: "Âm Lăng Tuyền",
      loai: "Hợp",
      hanh: "Hỏa",
      viTri:
        "Chỗ lõm tạo bởi bờ sau trong đầu trên xương chày với đường ngang qua nơi lồi cao nhất của cơ cẳng chân trước xương chày.",
    },
  ],
  TAM: [
    {
      ten: "Thiếu Xung",
      loai: "Tĩnh",
      hanh: "Mộc",
      viTri: "Ở ngón út phía xương mác, cách góc móng tay 0,1 thốn.",
    },
    {
      ten: "Thiếu Phủ",
      loai: "Vinh",
      hanh: "Hỏa",
      viTri:
        "Nằm giữa xương bàn tay thứ 4 và 5, khi nắm tay, huyệt ở giữa ngón út và ngón nhẫn hướng vào lòng bàn tay.",
    },
    {
      ten: "Thần Môn",
      loai: "Du",
      hanh: "Thổ",
      viTri:
        "Ở phía xương trụ, trên lằn cổ tay, sau xương nguyệt, chỗ lõm sát bờ ngoài gân cơ trụ trước.",
    },
    {
      ten: "Linh Đạo",
      loai: "Kinh",
      hanh: "Kim",
      viTri: "Ở mặt trước trong cẳng tay, cách nếp gấp cổ tay 1,5 thốn.",
    },
    {
      ten: "Thiếu Hải",
      loai: "Hợp",
      hanh: "Thủy",
      viTri:
        "Co tay, huyệt nằm giữa cuối đầu nếp gấp khuỷu tay và mỏm trên lồi cầu.",
    },
  ],
  TIEU_TRUONG: [
    {
      ten: "Thiếu Trạch",
      loai: "Tĩnh",
      hanh: "Thử",
      viTri: "Góc trong chân móng ngón tay út, cách chân móng 0.1 thốn.",
    },
    {
      ten: "Tiền Cốc",
      loai: "Vinh",
      hanh: "Mộc",
      viTri:
        "Chỗ lõm xương ngón tay thứ 5 về hướng xương trụ (trước lằn chỉ tay ngón út và bàn).",
    },
    {
      ten: "Hậu Khê",
      loai: "Du",
      hanh: "Hỏa",
      viTri:
        "Hơi nắm tay lại, huyệt nằm ở đầu trong đường vân tim của bàn tay.",
    },
    {
      ten: "Uyển Cốt",
      loai: "Nguyên",
      hanh: "Thổ",
      viTri:
        "Phía bờ trong bàn tay, chỗ lõm giữa xương móc và xương bàn tay thứ 5.",
    },
    {
      ten: "Dương Cốc",
      loai: "Kinh",
      hanh: "Kim",
      viTri:
        "Ở bờ trong cổ ngón tay, nơi chỗ lõm giữa xương đậu và mỏm trâm xương trụ.",
    },
    {
      ten: "Tiểu Hải",
      loai: "Hợp",
      hanh: "Thủy",
      viTri:
        "Co khuỷu tay lại, huyệt ở giữa mỏm khuỷu và mỏm trên ròng rọc đầu dưới xương cánh tay (chỗ lõm vào).",
    },
  ],
  BANG_QUANG: [
    {
      ten: "Chí Âm",
      loai: "Tĩnh",
      hanh: "Thủy",
      viTri:
        "Ở cạnh ngoài gốc móng ngón út, cách gốc móng khoảng hơn 0,1 thốn.",
    },
    {
      ten: "Thông Cốc",
      loai: "Vinh",
      hanh: "Thử",
      viTri: "Chỗ lõm phía trước khớp bàn và ngón út.",
    },
    {
      ten: "Thúc Cốt",
      loai: "Du",
      hanh: "Mộc",
      viTri: "Ở chỗ lõm cạnh ngoài, sau đầu nhỏ xương bàn chân nối với ngón 5.",
    },
    {
      ten: "Kinh Cốt",
      loai: "Nguyên",
      hanh: "Hỏa",
      viTri:
        "Ở cạnh ngoài bàn chân, phía dưới đầu mẩu xương to (đầu trong xương bàn ngón út).",
    },
    {
      ten: "Côn Lôn",
      loai: "Kinh",
      hanh: "Thổ",
      viTri: "Phía sau mắt cá ngoài 0,5 thốn, chỗ giữa mắt cá và gân gót.",
    },
    {
      ten: "Ủy Trung",
      loai: "Hợp",
      hanh: "Kim",
      viTri: "Giữa nếp gấp sau khuỷu chân.",
    },
  ],
  THAN: [
    {
      ten: "Dũng Tuyền",
      loai: "Tĩnh",
      hanh: "Thử",
      viTri:
        "Dưới lòng bàn chân, huyệt ở điểm lõm khi co bàn chân, chỗ giữa ngón thứ 2 và thứ 3.",
    },
    {
      ten: "Nhiên Cốc",
      loai: "Vinh",
      hanh: "Mộc",
      viTri: "Chỗ lõm sát bờ dưới xương trên đường nối da gan chân và mu chân.",
    },
    {
      ten: "Thái Khê",
      loai: "Du",
      hanh: "Hỏa",
      viTri:
        "Trung điểm giữa đường nối bờ sau mắt cá trong và mép trong gân gót.",
    },
    {
      ten: "Phục Lưu",
      loai: "Kinh",
      hanh: "Thổ",
      viTri: "Từ huyệt Thái Khê đo thẳng lên 2 thốn, chỗ lõm trước gân gót.",
    },
    {
      ten: "Âm Cốc",
      loai: "Hợp",
      hanh: "Kim",
      viTri:
        "Từ bờ sau nếp gấp gối sau, giữa gân cơ bán gân và gân cơ bán mạc.",
    },
  ],
  TBL: [
    {
      ten: "Trung Xung",
      loai: "Tĩnh",
      hanh: "Thổ",
      viTri: "Điểm chính giữa đầu ngón giữa.",
    },
    {
      ten: "Lao Cung",
      loai: "Vinh",
      hanh: "Kim",
      viTri:
        "Huyệt nằm trên gan bàn tay, khi co tay nắm lại, huyệt nằm giữa đầu móng tay ngón 3 và 4 chỉ vào bàn tay.",
    },
    {
      ten: "Đại Lăng",
      loai: "Du",
      hanh: "Thủy",
      viTri: "Ở ngay giữa nếp gấp cổ tay, giữa gân cơ tay lớn và tay bé.",
    },
    {
      ten: "Giản Sử",
      loai: "Kinh",
      hanh: "Thử",
      viTri:
        "Nếp gấp cổ tay thẳng lên 3 thốn, giữa khe gân cơ gan tay lớn và bé.",
    },
    {
      ten: "Khúc Trạch",
      loai: "Hợp",
      hanh: "Mộc",
      viTri:
        "Trên bờ sau nếp gấp khuỷu tay, giữa gân cơ nhị đầu (Sửa lại: Tài liệu PDF ghi gân cơ bán gân nhưng đó là ở chân).",
    },
  ],
  TAM_TIEU: [
    {
      ten: "Quan Xung",
      loai: "Tĩnh",
      hanh: "Hỏa",
      viTri:
        "Bàn tay ngửa lên, co ngón đeo nhẫn lại, lấy ở cạnh ngoài gốc móng (về phía ngón út) cách 0,1 thốn.",
    },
    {
      ten: "Dịch Môn",
      loai: "Vinh",
      hanh: "Thổ",
      viTri: "Úp bàn tay, lấy ở cuối nếp gấp khe ngón đeo nhẫn và ngón út.",
    },
    {
      ten: "Trung Chữ",
      loai: "Du",
      hanh: "Kim",
      viTri:
        "Úp bàn tay, lấy chỗ lõm sau khớp ngón và bàn trong khe xương bàn số 4 và 5.",
    },
    {
      ten: "Dương Trì",
      loai: "Nguyên",
      hanh: "Thủy",
      viTri:
        "Chỗ lõm trên lằn chỉ sau cổ tay, phía xương quay gân cơ duỗi chung các ngón.",
    },
    {
      ten: "Chi Cấu",
      loai: "Kinh",
      hanh: "Thử",
      viTri:
        "Bàn tay úp, khuỷu tay hơi co, từ huyệt Ngoại Quan lên 1 thốn, khe giữa 2 xương.",
    },
    {
      ten: "Thiên Tĩnh",
      loai: "Hợp",
      hanh: "Mộc",
      viTri:
        "Ngồi ngay, co khuỷu tay, từ lồi mỏm khuỷu tay lên 1 thốn, giữa chỗ lõm.",
    },
  ],
  DOM: [
    {
      ten: "Túc Khiếu Âm",
      loai: "Tĩnh",
      hanh: "Mộc",
      viTri: "Bên ngoài ngón chân thứ 4, cách góc móng chân chừng 0,1 thốn.",
    },
    {
      ten: "Hiệp Khê",
      loai: "Vinh",
      hanh: "Hỏa",
      viTri:
        "Khe giữa xương bàn chân ngón thứ 4 và 5, huyệt nằm ở đầu kẽ giữa 2 ngón chân.",
    },
    {
      ten: "Túc Lâm Khấp",
      loai: "Du",
      hanh: "Thổ",
      viTri: "Chỗ lõm phía trước khớp xương bàn ngón chân thứ 4 - 5.",
    },
    {
      ten: "Khâu Khư",
      loai: "Nguyên",
      hanh: "Kim",
      viTri: "Ở phía trước và dưới mắt cá ngoài, nơi chỗ lõm của khe xương.",
    },
    {
      ten: "Dương Phụ",
      loai: "Kinh",
      hanh: "Thủy",
      viTri: "Trên đỉnh mắt cá ngoài 4 thốn, ở bờ dưới xương mác.",
    },
    {
      ten: "Dương Lăng Tuyền",
      loai: "Hợp",
      hanh: "Thử",
      viTri: "Ở chỗ lõm phía trước và dưới đầu nhỏ của xương mác.",
    },
  ],
  CAN: [
    {
      ten: "Đại Đôn",
      loai: "Tĩnh",
      hanh: "Hỏa",
      viTri: "Cách bờ ngoài gốc móng chân ngón chân cái 0,1 thốn.",
    },
    {
      ten: "Hành Gian",
      loai: "Vinh",
      hanh: "Thổ",
      viTri: "Kẽ ngón chân 1 và 2 đo lên 0,5 thốn về phía mu chân.",
    },
    {
      ten: "Thái Xung",
      loai: "Du",
      hanh: "Kim",
      viTri: "Giữa kẽ ngón chân 1 và 2 đo lên 2 thốn về phía mu chân.",
    },
    {
      ten: "Trung Phong",
      loai: "Kủy",
      hanh: "Thủy",
      viTri:
        "Bờ dưới mắt cá trong khoảng 1 thốn, điểm lõm giữa cơ dài ngón cái và cơ chày trước.",
    },
    {
      ten: "Khúc Tuyền",
      loai: "Hợp",
      hanh: "Thử",
      viTri:
        "Khi gấp chân lại, huyệt nằm trên phía trong xương đùi đầu nếp gấp đầu gối.",
    },
  ],
};
