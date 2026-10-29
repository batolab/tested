# Ghi chú test — pbakaus/impeccable (Video 01, The Lab Report)

- Repo: https://github.com/pbakaus/impeccable
- Ngày test: 29/10/2026. Môi trường: máy ảo của Muse (Linux, Node 24), chạy qua npx, không dùng tài khoản/API key.
- Số liệu repo tại thời điểm test (snapshot bản quét 29/10/2026): 92.571 stars, 5.476 forks, license Apache-2.0.

## Đã chạy thật
1. `npx impeccable detect --list-rules` → liệt kê đúng **62 luật** (khớp con số README công bố).
2. `npx impeccable detect slop.html` (file trong gói này — trang mẫu do Lab tự dựng với các dấu hiệu AI điển hình: font Inter, gradient tím–xanh, chữ xám trên nền màu, chữ thân bài 11px, nhảy cấp tiêu đề h1→h3):
   - Kết quả: **19 anti-patterns**, thời gian chạy thật ~1,0–1,1 giây, exit code 2 (có phát hiện).
   - Lỗi đáng chú ý: low-contrast tệ nhất 1.1:1 (chuẩn WCAG AA cần 4.5:1), gray-on-color, tiny-text 11px, overused-font (Inter), skipped-heading, ai-color-palette (gradient tím).
   - Toàn văn output: file `detect-slop.txt`.
3. `npx impeccable detect fixed.html` (trang đã sửa theo chính gợi ý của detector: bỏ gradient, tương phản đạt chuẩn, chữ 16px, thứ bậc h1→h2):
   - Kết quả: **0 lỗi**, exit code 0, ~0,9 giây. Toàn văn output: file `detect-fixed.txt` (rỗng vì không có phát hiện).

## Chưa test (nói rõ trong video)
- Phần skill đầy đủ của Impeccable (các lệnh critique, audit, polish, live...) cần một coding agent có tài khoản — chưa chạy trong video này. Video 01 chỉ kiểm chứng bộ quét độc lập (detector).

## Nhận định của Lab (đã nói trong video)
- Điểm cộng: quét rất nhanh (~1 giây), bắt đúng các dấu hiệu "AI làm ẩu" phổ biến nhất, không cần tài khoản.
- Điểm trừ: detector chỉ bắt lỗi theo luật — quét sạch 0 lỗi không có nghĩa là thiết kế đã đẹp; gu thẩm mỹ vẫn là việc của người.
