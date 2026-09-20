# DHV QUIZ — Server Node.js

## Cài đặt & chạy (chỉ 4 bước)

1. Cài **Node.js** (nếu chưa có): https://nodejs.org (bản LTS)
2. Cài **MySQL** — có thể dùng MySQL Server độc lập, hoặc chỉ cần bật
   **MySQL** trong XAMPP Control Panel (không cần bật Apache/PHP nữa).
3. Mở phpMyAdmin hoặc MySQL Workbench, import file `backend/database/dhv_quiz_schema.sql`
   để tạo database `dhv_quiz` và 12 bảng.
4. Mở terminal, `cd` vào thư mục **`backend/`** (không phải thư mục gốc dự án), chạy lần lượt:
   ```
   cd backend
   npm install
   npm run seed
   npm start
   ```
5. Mở trình duyệt: **http://localhost:3000/loginweb.html**
   - Giảng viên: mã `GV001`, mật khẩu `123456`
   - Sinh viên: mã `2305CT0747`, mật khẩu `123456`

⚠️ Không mở `loginweb.html` bằng cách double-click hay bằng Live Server
(cổng 8080/5500) — bắt buộc phải truy cập qua `http://localhost:3000/...`
vì đó là nơi `backend/server.js` đang chạy và phục vụ cả trang web lẫn API.

## Cấu hình MySQL khác mặc định

Nếu MySQL của bạn có mật khẩu hoặc chạy ở host/port khác, sửa 4 dòng đầu
trong **cả 2 file** `backend/server.js` và `backend/seed.js`:

```js
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '26012005',
    database: 'dhv_quiz',
```

## Cấu trúc dự án

```
backend/                         Toàn bộ phần server — chạy các lệnh npm bên trong thư mục này
  server.js                        API (đăng nhập, môn học, lớp học, ngân hàng câu hỏi,
                                    bài thi, làm bài, kết quả, chống gian lận) — gộp 1 file,
                                    "npm start", lắng nghe cổng 3000, phục vụ luôn frontend
  seed.js                           Script chạy 1 lần để tạo dữ liệu mẫu — "npm run seed"
  package.json                      Khai báo thư viện (express, mysql2, bcryptjs)
  node_modules/                     Thư viện đã cài (tạo ra bởi npm install)
  database/
    dhv_quiz_schema.sql              Cấu trúc 12 bảng MySQL

loginweb.html, script.js, style.css, images/    Giao diện (không đổi, nằm ngoài backend/)
```

## Danh sách API (tiền tố `/api`)

| Method | Đường dẫn | Chức năng |
|---|---|---|
| POST | /api/login | Đăng nhập |
| POST | /api/logout | Đăng xuất |
| GET | /api/subjects | Danh sách môn học |
| GET | /api/classes | Danh sách lớp học |
| GET | /api/classes/:id/students | Sinh viên trong lớp |
| GET | /api/questions | Ngân hàng câu hỏi |
| POST | /api/questions | Tạo câu hỏi mới |
| GET | /api/exams | Danh sách bài thi (`?student_id=` hoặc `?lecturer_id=`) |
| GET | /api/exams/:id | Chi tiết bài thi |
| POST | /api/exams | Tạo bài thi |
| POST | /api/attempts/start | Bắt đầu làm bài |
| POST | /api/attempts/submit | Nộp bài, chấm điểm tự động |
| GET | /api/results | Lịch sử kết quả sinh viên |
| GET | /api/results/:attemptId/review | Xem lại chi tiết bài đã làm |
| POST | /api/anti-cheat | Ghi log sự kiện gian lận |
| GET | /api/anti-cheat | Xem log gian lận theo bài thi |

Hiện chỉ có màn hình **đăng nhập** trong `script.js` đã nối vào API thật
(`handleRealLogin`). Các màn hình khác (ngân hàng câu hỏi, tạo bài thi,
làm bài, kết quả...) vẫn đang dùng dữ liệu mẫu cứng trong `script.js` —
API ở trên đã có sẵn, chỉ cần thay các đoạn render bằng `fetch()` khi cần.
