# Kịch bản Video 01 (chính thức) — pbakaus/impeccable — The Lab Report

Mọi con số trong kịch bản đều từ buổi test thật trên máy Muse ngày 29/10/2026:
- `npx impeccable detect --list-rules` → đúng 62 luật (khớp công bố của README).
- Trang mẫu slop.html (Lab tự dựng: font Inter, gradient tím–xanh, chữ xám trên nền màu, chữ 11px, nhảy cấp tiêu đề h1→h3): detect báo **19 anti-patterns**, thời gian chạy thật 1,0–1,1 giây, exit code 2. Lỗi nặng nhất: low-contrast 1.1:1 (chuẩn cần 4.5:1), cộng gray-on-color, tiny-text, overused-font (Inter), skipped-heading, ai-color-palette (gradient tím).
- Trang đã sửa fixed.html (bỏ gradient, tương phản đạt chuẩn, chữ 16px, h1→h2 đúng thứ bậc): detect báo **0 lỗi**, exit code 0, ~0,9 giây.
- Chưa test (nói rõ trong video): phần skill đầy đủ (critique/audit/polish) — cần coding agent có tài khoản của Hoàng; video này chỉ test bộ quét độc lập (detector).

1. Một trang web do AI viết bị bắt 19 lỗi thiết kế trong đúng một giây. Không cần tài khoản, không cần khóa API.
2. Đó là Impeccable, repo đang nóng trên GitHub với hơn 92 nghìn sao. Nó dạy coding agent gu thiết kế và bắt dấu hiệu AI làm ẩu.
3. Cài bằng một lệnh npx. Bộ quét của nó có đúng 62 luật như công bố. Mình đếm thật, không thiếu một luật nào.
4. Mình thả vào một trang mẫu đúng kiểu AI hay làm. Kết quả: 19 lỗi. Tương phản tệ nhất chỉ 1,1 trên 1, chuẩn phải là 4,5. Chữ thân bài 11 pixel.
5. Mình sửa lại trang theo đúng gợi ý của nó: bỏ gradient, chữ đủ tương phản, cỡ chữ chuẩn. Quét lại: 0 lỗi. Sạch hoàn toàn.
6. Nhưng nói thật: hết lỗi không có nghĩa là đã đẹp. Máy quét chỉ bắt lỗi theo luật, gu vẫn là việc của người. Phần skill đầy đủ cần coding agent có tài khoản, video này chưa test.
7. Link repo và toàn bộ bản Lab đã test để ở comment ghim. Bạn muốn Lab test repo nào tiếp theo? Comment cho mình biết nhé.
