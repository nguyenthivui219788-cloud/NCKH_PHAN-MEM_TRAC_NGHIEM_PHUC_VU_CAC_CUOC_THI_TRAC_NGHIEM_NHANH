# 🎓 Phần Mềm Kiểm Tra Trắc Nghiệm Nhanh Online (Đề tài NCKH)

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/Status-Completed-success.svg)

**Đề tài Nghiên cứu Khoa học (NCKH):** Xây dựng và phát triển phần mềm nền web phục vụ công tác tổ chức các cuộc thi trắc nghiệm nhanh, đánh giá năng lực trực tuyến.

---

## 📖 1. Giới thiệu tổng quan
Trong bối cảnh chuyển đổi số giáo dục, việc tự động hóa khâu kiểm tra và đánh giá năng lực là vô cùng cần thiết. **Phần mềm kiểm tra trắc nghiệm nhanh** được nghiên cứu và phát triển nhằm giải quyết các hạn chế của phương pháp thi giấy truyền thống (tốn kém thời gian in ấn, chấm điểm thủ công, dễ sai sót). 

Dự án cung cấp một môi trường thi trực tuyến minh bạch, giao diện thân thiện, tốc độ phản hồi cao, giúp tối ưu hóa quá trình tổ chức thi và mang lại trải nghiệm làm bài mượt mà cho người sử dụng.

## 🎯 2. Mục tiêu nghiên cứu
- **Về mặt lý thuyết:** Tìm hiểu và ứng dụng bộ công nghệ Web Front-end tiêu chuẩn để xây dựng một ứng dụng Single Page Application (hoặc nền web cơ bản) có tính tương tác cao.
- **Về mặt thực tiễn:** Xây dựng thành công hệ thống thi trắc nghiệm với khả năng tính giờ chính xác, tự động chấm điểm và bảo mật thao tác của người dùng trong quá trình thi.

## 🚀 3. Các tính năng nổi bật
Hệ thống được thiết kế tối ưu với các chức năng cốt lõi sau:

* **Xác thực và Quản lý truy cập (`loginweb`)**
  * Giao diện đăng nhập an toàn, phân quyền rõ ràng trước khi vào phòng thi.
  * Ngăn chặn việc truy cập trực tiếp vào bài thi khi chưa xác thực.
* **Môi trường làm bài thi tối ưu**
  * Hiển thị danh sách câu hỏi phân trang hoặc cuộn mượt mà.
  * Tích hợp bộ đếm thời gian đếm ngược (Countdown Timer) chính xác đến từng giây. Tự động thu bài khi hết giờ.
  * Hỗ trợ lưu trữ trạng thái chọn đáp án (người dùng có thể thay đổi đáp án trước khi nộp).
* **Hệ thống chấm điểm tức thì (Real-time Grading)**
  * Đối chiếu đáp án ngay khi thí sinh nhấn "Nộp bài".
  * Hiển thị bảng tổng kết chi tiết: Số câu đúng, số câu sai, điểm tổng và tỷ lệ hoàn thành.
* **Giao diện đáp ứng (Responsive Design)**
  * Hoạt động ổn định trên nhiều kích thước màn hình khác nhau (Desktop, Laptop, Tablet).

## 🛠️ 4. Công nghệ & Ngôn ngữ sử dụng
Dự án được xây dựng dựa trên nền tảng Web thuần, không phụ thuộc vào các thư viện nặng nề, giúp tối ưu hóa hiệu suất load trang:
- **HTML5:** Xây dựng bộ khung và cấu trúc ngữ nghĩa (semantic) cho các trang thi và đăng nhập.
- **CSS3:** Tùy chỉnh giao diện (UI), hiệu ứng chuyển cảnh, tạo bố cục thân thiện với người dùng (User Experience - UX).
- **JavaScript (Vanilla JS):** Xử lý toàn bộ logic cốt lõi của phần mềm bao gồm:
  - Thuật toán trộn câu hỏi/đáp án.
  - Xử lý đồng hồ đếm ngược bất đồng bộ.
  - DOM Manipulation để render câu hỏi động.
  - Thuật toán chấm điểm và xử lý sự kiện nộp bài.

## 📂 5. Cấu trúc thư mục dự án
```text
NCKH_PHAN-MEM_TRAC_NGHIEM_PHUC_VU_CAC_CUOC_THI_TRAC_NGHIEM_NHANH/
├── TRAC NGHIEM ONLINE/
│   ├── index.html        # Trang chủ / Trang làm bài thi
│   ├── login.html        # Module đăng nhập người dùng
│   ├── css/              # Chứa các file định dạng phong cách
│   ├── js/               # Chứa logic xử lý bài thi, đếm giờ, chấm điểm
│   └── assets/           # Hình ảnh, icon sử dụng trong dự án
└── README.md             # Tài liệu giới thiệu dự án
💻 6. Hướng dẫn cài đặt và sử dụng
Dự án được thiết kế để chạy trực tiếp trên môi trường trình duyệt mà không cần cài đặt Web Server phức tạp.

Bước 1: Tải mã nguồn về máy
Bạn có thể tải file .zip trực tiếp từ GitHub hoặc dùng lệnh git:

Bash
git clone [https://github.com/nguyenthivui219788-cloud/NCKH_PHAN-MEM_TRAC_NGHIEM_PHUC_VU_CAC_CUOC_THI_TRAC_NGHIEM_NHANH.git](https://github.com/nguyenthivui219788-cloud/NCKH_PHAN-MEM_TRAC_NGHIEM_PHUC_VU_CAC_CUOC_THI_TRAC_NGHIEM_NHANH.git)
Bước 2: Khởi chạy ứng dụng

Mở thư mục TRAC NGHIEM ONLINE vừa tải về.

Khởi động ứng dụng bằng cách mở file đăng nhập hoặc index.html bằng trình duyệt web (Google Chrome, Microsoft Edge,...).

💡 Khuyên dùng: Để có trải nghiệm tốt nhất trong quá trình đọc code và chạy thử, hãy mở thư mục bằng Visual Studio Code và sử dụng Extension Live Server.

🔮 7. Định hướng phát triển tương lai
Để hoàn thiện và đưa vào triển khai thực tế quy mô lớn, dự án hướng tới các nâng cấp sau:

Tích hợp Backend (Node.js/Java/Python) và Cơ sở dữ liệu (MySQL/Firebase) để lưu trữ vĩnh viễn kết quả thi.

Xây dựng trang Admin Dashboard cho phép Giảng viên tự do Thêm/Sửa/Xóa câu hỏi.

Hỗ trợ xuất phổ điểm báo cáo dưới dạng Excel/PDF.

👨‍💻 Thông tin Tác giả
Sinh viên thực hiện: Nguyễn Lê Thanh Tâm

Đơn vị: Trường Đại học Hùng Vương TP.HCM

Dự án được thực hiện nhằm phục vụ mục đích Nghiên cứu Khoa học và học tập. Mọi ý kiến đóng góp xin vui lòng tạo Issue hoặc Pull Request tại repository này.
