# The Lab Report — Tested

**We test it. Then we report it.**

Đây là kho lưu toàn bộ nội dung The Lab Report đã test thật, đi kèm các video review trên kênh. Mỗi mục đã test có một thư mục riêng gồm file mẫu đầu vào và output gốc — để bất kỳ ai cũng kiểm chứng lại được.

This repository archives everything actually tested by The Lab Report, companion to the channel's review videos. One folder per tested item: sample inputs and raw outputs — so anyone can verify.

## Đã test / Tested

| # | Mục đã test | Repo gốc | Kết quả tóm tắt | Thư mục |
|---|---|---|---|---|
| 01 | Impeccable (bộ quét "AI slop") | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 62 luật quét đúng như công bố; trang mẫu bị bắt 19 lỗi trong ~1 giây; trang đã sửa đạt 0 lỗi | [impeccable/](impeccable/) |
| 02 | security-audit-skill (skill audit bảo mật) | [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | Bắt đủ 5/5 lỗ hổng cài sẵn, 0 báo nhầm; cả 5 dừng ở mức cần kiểm chứng thêm (0 confirmed) vì verdict xác nhận cần sandbox đạt chuẩn | [security-audit-skill/](security-audit-skill/) |
| 03 | pixelfx (hiệu ứng pixel bằng code) | [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx) | Đếm lại 3 cách trong mã nguồn: đúng 244 hiệu ứng thuộc 21 nhóm; render thật 11 hiệu ứng, bộ kiểm tra của repo đạt 244/244 kèm 19 cảnh báo chậm; repo mới 8 commit, skill tự tạo hiệu ứng chưa test | [pixelfx/](pixelfx/) |
| 04 | diagram-design (sơ đồ editorial bằng agent skill) | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | Đếm đủ 45 loại bằng 3 cách; cùng một prompt, bản có skill đạt bài tự kiểm của repo, file HTML 9.281 byte chỉ gọi thêm font Google, nhuộm được theo màu thương hiệu; giới hạn: mới thử 1/45 loại, lệnh cài gốc là tương tác, Snyk báo rủi ro trung bình | [diagram-design/](diagram-design/) |
