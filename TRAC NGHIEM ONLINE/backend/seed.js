// Chạy 1 lần để tạo dữ liệu mẫu:  npm run seed
// Tài khoản demo:
//   Giảng viên: GV001       mật khẩu 123456
//   Sinh viên : 2305CT0747  mật khẩu 123456

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dhv_quiz',
});

async function seed() {
    const [existing] = await pool.query("SELECT COUNT(*) AS cnt FROM users WHERE user_code = 'GV001'");
    if (existing[0].cnt > 0) {
        console.log('Dữ liệu mẫu đã tồn tại — không cần chạy lại.');
        process.exit(0);
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const passwordHash = await bcrypt.hash('123456', 10);

        const [lecturer] = await conn.execute(
            `INSERT INTO users (role, user_code, full_name, email, password_hash, status)
             VALUES ('lecturer', 'GV001', 'TS. Nguyễn Văn Dũng', 'thaydung@dhv.edu.vn', ?, 'active')`,
            [passwordHash]
        );
        const lecturerId = lecturer.insertId;

        const [student] = await conn.execute(
            `INSERT INTO users (role, user_code, full_name, email, password_hash, status)
             VALUES ('student', '2305CT0747', 'Nguyễn Lê Thanh Tâm', '2305CT0747@dhv.edu.vn', ?, 'active')`,
            [passwordHash]
        );
        const studentId = student.insertId;

        const [subject] = await conn.execute(
            `INSERT INTO subjects (code, name, description, credits, lecturer_id)
             VALUES ('IT003', 'Cơ sở dữ liệu', 'Học phần cung cấp kiến thức về mô hình dữ liệu, thiết kế CSDL, SQL và quản trị CSDL.', 3, ?)`,
            [lecturerId]
        );
        const subjectId = subject.insertId;

        const [cls] = await conn.execute(
            `INSERT INTO classes (code, name, subject_id, lecturer_id, semester)
             VALUES ('2305CT01', 'Cơ sở dữ liệu - Nhóm 01', ?, ?, 'HK1 - 2026')`,
            [subjectId, lecturerId]
        );
        const classId = cls.insertId;

        await conn.execute('INSERT INTO class_students (class_id, student_id) VALUES (?, ?)', [classId, studentId]);

        const questions = [
            { chapter: 'Chương 1: Tổng quan CSDL', difficulty: 'easy', content: 'Từ khóa nào dùng để lọc dữ liệu trong câu lệnh SELECT?',
              options: [['WHERE', 1], ['GROUP BY', 0], ['ORDER BY', 0], ['HAVING', 0]] },
            { chapter: 'Chương 2: Mô hình ER', difficulty: 'medium', content: 'Khóa ngoại (Foreign Key) có chức năng chính là gì?',
              options: [['Liên kết dữ liệu giữa các bảng', 1], ['Tăng tốc độ truy vấn', 0], ['Đảm bảo tính duy nhất', 0], ['Thay thế cho khóa chính', 0]] },
            { chapter: 'Chương 3: SQL', difficulty: 'easy', content: 'Câu lệnh SQL nào dùng để thêm bản ghi mới vào bảng?',
              options: [['INSERT INTO', 1], ['UPDATE', 0], ['ADD RECORD', 0], ['CREATE TABLE', 0]] },
        ];

        const questionIds = [];
        for (const q of questions) {
            const [qRes] = await conn.execute(
                `INSERT INTO question_bank (subject_id, chapter, question_type, difficulty, content, created_by)
                 VALUES (?, ?, 'single_choice', ?, ?, ?)`,
                [subjectId, q.chapter, q.difficulty, q.content, lecturerId]
            );
            questionIds.push(qRes.insertId);
            for (let i = 0; i < q.options.length; i++) {
                await conn.execute(
                    'INSERT INTO question_options (question_id, content, is_correct, option_order) VALUES (?, ?, ?, ?)',
                    [qRes.insertId, q.options[i][0], q.options[i][1], i + 1]
                );
            }
        }

        const [exam] = await conn.execute(
            `INSERT INTO exams (title, exam_type, subject_id, duration_minutes, question_count, total_score,
                creation_method, shuffle_questions, shuffle_answers, max_attempts, pass_score,
                result_display_mode, proctoring_enabled, start_time, end_time, status, created_by)
             VALUES (?, 'official', ?, 30, ?, 10, 'bank', 1, 1, 1, 5, 'show_score', 0, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'published', ?)`,
            ['Kiểm tra chương 1-3: Tổng quan CSDL', subjectId, questionIds.length, lecturerId]
        );
        const examId = exam.insertId;

        await conn.execute('INSERT INTO exam_classes (exam_id, class_id) VALUES (?, ?)', [examId, classId]);

        const scorePerQuestion = Math.round((10 / questionIds.length) * 100) / 100;
        for (let i = 0; i < questionIds.length; i++) {
            await conn.execute(
                'INSERT INTO exam_questions (exam_id, question_id, question_order, score) VALUES (?, ?, ?, ?)',
                [examId, questionIds[i], i + 1, scorePerQuestion]
            );
        }

        await conn.commit();

        console.log('Tạo dữ liệu mẫu thành công!');
        console.log('  Giảng viên -> Mã: GV001        | Mật khẩu: 123456');
        console.log('  Sinh viên  -> Mã: 2305CT0747   | Mật khẩu: 123456');
        console.log(`Đã tạo: 1 môn học (IT003), 1 lớp (2305CT01), 3 câu hỏi, 1 bài thi (id=${examId}) đang mở.`);
    } catch (err) {
        await conn.rollback();
        console.error('Lỗi khi tạo dữ liệu mẫu:', err.message);
    } finally {
        conn.release();
        process.exit(0);
    }
}

seed();
