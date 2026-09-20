// =====================================================================
// DHV QUIZ — Server Node.js (Express + MySQL), gộp trong 1 file cho gọn.
// Chạy:  npm install   rồi   npm run seed   rồi   npm start
// Mở:    http://localhost:3000/loginweb.html
// =====================================================================

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');

// ---- 1) CẤU HÌNH KẾT NỐI MYSQL — sửa 4 dòng dưới cho đúng máy bạn ----
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dhv_quiz',
    waitForConnections: true,
    connectionLimit: 10,
});

const app = express();
const PORT = 3000;

// Middleware CORS cho phép truy cập từ file:// hoặc Live Server (cổng 5500, 8080...)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'loginweb.html'));
});

app.use(express.static(path.join(__dirname, '..'))); // phục vụ loginweb.html, script.js, style.css, images/ (nằm ngoài backend/ 1 cấp)

const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });
const fail = (res, message, status = 400) => res.status(status).json({ success: false, message });

// =====================================================================
// ĐĂNG NHẬP / ĐĂNG XUẤT
// =====================================================================

app.post('/api/login', async (req, res) => {
    const { user_code, password, role } = req.body || {};
    if (!user_code || !password || !role) return fail(res, 'Thiếu tài khoản, mật khẩu hoặc vai trò', 422);

    try {
        const [rows] = await pool.query(
            'SELECT id, role, user_code, full_name, email, password_hash, status FROM users WHERE user_code = ? AND role = ? LIMIT 1',
            [user_code, role]
        );
        const user = rows[0];
        if (!user) return fail(res, 'Tài khoản hoặc vai trò không đúng', 401);
        if (user.status !== 'active') return fail(res, 'Tài khoản đã bị khóa', 403);

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return fail(res, 'Sai mật khẩu', 401);

        delete user.password_hash;
        ok(res, { user });
    } catch (err) {
        fail(res, 'Lỗi kết nối CSDL: ' + err.message, 500);
    }
});

app.post('/api/register', async (req, res) => {
    const { user_code, full_name, email, password, role } = req.body || {};
    if (!user_code || !full_name || !password || !role) {
        return fail(res, 'Vui lòng nhập đầy đủ Mã số, Họ tên, Mật khẩu và Vai trò', 422);
    }

    try {
        const [existing] = await pool.query('SELECT id FROM users WHERE user_code = ? LIMIT 1', [user_code]);
        if (existing.length > 0) {
            return fail(res, 'Mã số tài khoản này đã tồn tại trên hệ thống', 400);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const userEmail = email || `${user_code}@dhv.edu.vn`;

        const [result] = await pool.query(
            'INSERT INTO users (role, user_code, full_name, email, password_hash, status) VALUES (?, ?, ?, ?, ?, ?)',
            [role, user_code, full_name, userEmail, passwordHash, 'active']
        );

        ok(res, {
            user: {
                id: result.insertId,
                role,
                user_code,
                full_name,
                email: userEmail,
                status: 'active'
            }
        });
    } catch (err) {
        console.error("Lỗi đăng ký CSDL:", err);
        fail(res, 'Lỗi đăng ký CSDL: ' + err.message, 500);
    }
});

app.post('/api/logout', (req, res) => ok(res, { message: 'Đã đăng xuất' }));

// =====================================================================
// MÔN HỌC / LỚP HỌC
// =====================================================================

app.get('/api/subjects', async (req, res) => {
    const { lecturer_id } = req.query;
    let sql = `SELECT s.id, s.code, s.name, s.description, s.credits,
                      u.full_name AS lecturer_name,
                      (SELECT COUNT(DISTINCT cs.student_id) FROM classes c
                         JOIN class_students cs ON cs.class_id = c.id WHERE c.subject_id = s.id) AS students_count,
                      (SELECT COUNT(*) FROM exams e WHERE e.subject_id = s.id) AS quizzes_count
               FROM subjects s LEFT JOIN users u ON u.id = s.lecturer_id`;
    const params = [];
    if (lecturer_id) { sql += ' WHERE s.lecturer_id = ?'; params.push(lecturer_id); }
    sql += ' ORDER BY s.code ASC';

    const [rows] = await pool.query(sql, params);
    ok(res, rows);
});

app.get('/api/classes', async (req, res) => {
    const { lecturer_id, subject_id } = req.query;
    let sql = `SELECT c.id, c.code, c.name, c.semester, s.code AS subject_code, s.name AS subject_name,
                      u.full_name AS lecturer_name,
                      (SELECT COUNT(*) FROM class_students cs WHERE cs.class_id = c.id) AS students_count
               FROM classes c JOIN subjects s ON s.id = c.subject_id
               LEFT JOIN users u ON u.id = c.lecturer_id WHERE 1=1`;
    const params = [];
    if (lecturer_id) { sql += ' AND c.lecturer_id = ?'; params.push(lecturer_id); }
    if (subject_id)  { sql += ' AND c.subject_id = ?';  params.push(subject_id); }
    sql += ' ORDER BY c.code ASC';

    const [rows] = await pool.query(sql, params);
    ok(res, rows);
});

app.get('/api/classes/:id/students', async (req, res) => {
    const [rows] = await pool.query(
        `SELECT u.id, u.user_code, u.full_name, u.email FROM class_students cs
         JOIN users u ON u.id = cs.student_id WHERE cs.class_id = ? ORDER BY u.full_name ASC`,
        [req.params.id]
    );
    ok(res, rows);
});

// =====================================================================
// NGÂN HÀNG CÂU HỎI
// =====================================================================

app.get('/api/questions', async (req, res) => {
    const { subject_id, chapter, question_type, difficulty, search } = req.query;
    let sql = `SELECT q.id, q.chapter, q.question_type, q.difficulty, q.content, q.created_at,
                      s.code AS subject_code
               FROM question_bank q JOIN subjects s ON s.id = q.subject_id WHERE 1=1`;
    const params = [];
    if (subject_id)     { sql += ' AND q.subject_id = ?';    params.push(subject_id); }
    if (chapter)         { sql += ' AND q.chapter = ?';        params.push(chapter); }
    if (question_type)   { sql += ' AND q.question_type = ?';  params.push(question_type); }
    if (difficulty)      { sql += ' AND q.difficulty = ?';     params.push(difficulty); }
    if (search)           { sql += ' AND q.content LIKE ?';     params.push(`%${search}%`); }
    sql += ' ORDER BY q.created_at DESC';

    const [rows] = await pool.query(sql, params);
    ok(res, rows);
});

app.get('/api/questions/:id', async (req, res) => {
    const [[question]] = [await pool.query('SELECT * FROM question_bank WHERE id = ?', [req.params.id]).then(r => r[0])];
    if (!question) return fail(res, 'Không tìm thấy câu hỏi', 404);

    const [options] = await pool.query(
        'SELECT id, content, is_correct, option_order FROM question_options WHERE question_id = ? ORDER BY option_order ASC',
        [req.params.id]
    );
    ok(res, { ...question, options });
});

app.post('/api/questions', async (req, res) => {
    const { subject_id, chapter, question_type, difficulty, content, created_by, options } = req.body || {};
    if (!subject_id || !question_type || !difficulty || !content || !created_by || !Array.isArray(options) || options.length < 2) {
        return fail(res, 'Thiếu dữ liệu hoặc cần tối thiểu 2 đáp án', 422);
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const [result] = await conn.execute(
            `INSERT INTO question_bank (subject_id, chapter, question_type, difficulty, content, created_by)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [subject_id, chapter || null, question_type, difficulty, content, created_by]
        );
        const questionId = result.insertId;

        for (let i = 0; i < options.length; i++) {
            await conn.execute(
                `INSERT INTO question_options (question_id, content, is_correct, option_order) VALUES (?, ?, ?, ?)`,
                [questionId, options[i].content, options[i].is_correct ? 1 : 0, i + 1]
            );
        }

        await conn.commit();
        ok(res, { id: questionId }, 201);
    } catch (err) {
        await conn.rollback();
        fail(res, 'Không thể tạo câu hỏi: ' + err.message, 500);
    } finally {
        conn.release();
    }
});

// =====================================================================
// BÀI THI
// =====================================================================

app.get('/api/exams', async (req, res) => {
    const { student_id, lecturer_id, subject_id, status } = req.query;

    if (student_id) {
        const [rows] = await pool.query(
            `SELECT DISTINCT e.id, e.title, e.exam_type, e.duration_minutes, e.question_count,
                    e.total_score, e.max_attempts, e.start_time, e.end_time, e.status,
                    s.code AS subject_code, s.name AS subject_name
             FROM exams e JOIN subjects s ON s.id = e.subject_id
             JOIN exam_classes ec ON ec.exam_id = e.id
             JOIN class_students cs ON cs.class_id = ec.class_id AND cs.student_id = ?
             WHERE e.status IN ('published','ongoing') ORDER BY e.start_time DESC`,
            [student_id]
        );
        return ok(res, rows);
    }

    let sql = `SELECT e.id, e.title, e.exam_type, e.duration_minutes, e.question_count,
                      e.total_score, e.start_time, e.end_time, e.status, s.code AS subject_code, s.name AS subject_name
               FROM exams e JOIN subjects s ON s.id = e.subject_id WHERE 1=1`;
    const params = [];
    if (lecturer_id) { sql += ' AND e.created_by = ?'; params.push(lecturer_id); }
    if (subject_id)  { sql += ' AND e.subject_id = ?'; params.push(subject_id); }
    if (status)       { sql += ' AND e.status = ?';      params.push(status); }
    sql += ' ORDER BY e.created_at DESC';

    const [rows] = await pool.query(sql, params);
    ok(res, rows);
});

app.get('/api/exams/:id', async (req, res) => {
    const [[exam]] = [await pool.query(
        `SELECT e.*, s.code AS subject_code, s.name AS subject_name FROM exams e
         JOIN subjects s ON s.id = e.subject_id WHERE e.id = ?`, [req.params.id]
    ).then(r => r[0])];
    if (!exam) return fail(res, 'Không tìm thấy bài thi', 404);

    const [questions] = await pool.query(
        `SELECT eq.question_order, eq.score, q.id AS question_id, q.content, q.question_type
         FROM exam_questions eq JOIN question_bank q ON q.id = eq.question_id
         WHERE eq.exam_id = ? ORDER BY eq.question_order ASC`,
        [req.params.id]
    );
    for (const q of questions) {
        const [opts] = await pool.query(
            'SELECT id, content, is_correct FROM question_options WHERE question_id = ? ORDER BY option_order ASC',
            [q.question_id]
        );
        q.options = opts;
    }

    ok(res, { ...exam, questions });
});

app.post('/api/exams', async (req, res) => {
    const b = req.body || {};
    if (!b.title || !b.subject_id || !b.duration_minutes || !b.start_time || !b.end_time || !b.created_by || !Array.isArray(b.class_ids) || b.class_ids.length === 0) {
        return fail(res, 'Thiếu dữ liệu bắt buộc hoặc chưa chọn lớp áp dụng', 422);
    }

    let questionIds = b.question_ids || [];
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        if ((b.creation_method === 'auto') && questionIds.length === 0) {
            const count = parseInt(b.auto_criteria?.count || 0, 10);
            if (count <= 0) throw new Error('auto_criteria.count phải > 0 khi tạo đề tự động');
            const [rows] = await conn.query(
                'SELECT id FROM question_bank WHERE subject_id = ? ORDER BY RAND() LIMIT ?',
                [b.subject_id, count]
            );
            questionIds = rows.map(r => r.id);
        }
        if (questionIds.length === 0) throw new Error('Đề thi phải có ít nhất 1 câu hỏi');

        const totalScore = parseFloat(b.total_score || 10);
        const scorePerQuestion = Math.round((totalScore / questionIds.length) * 100) / 100;

        const [examResult] = await conn.execute(
            `INSERT INTO exams (title, exam_type, subject_id, duration_minutes, question_count, total_score,
                creation_method, shuffle_questions, shuffle_answers, max_attempts, pass_score,
                result_display_mode, proctoring_enabled, start_time, end_time, status, created_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                b.title, b.exam_type || 'official', b.subject_id, b.duration_minutes,
                questionIds.length, totalScore, b.creation_method || 'bank',
                b.shuffle_questions ? 1 : 0, b.shuffle_answers ? 1 : 0, b.max_attempts ?? 1,
                b.pass_score ?? 5, b.result_display_mode || 'show_score', b.proctoring_enabled ? 1 : 0,
                b.start_time, b.end_time, b.status || 'published', b.created_by,
            ]
        );
        const examId = examResult.insertId;

        for (const classId of b.class_ids) {
            await conn.execute('INSERT INTO exam_classes (exam_id, class_id) VALUES (?, ?)', [examId, classId]);
        }
        for (let i = 0; i < questionIds.length; i++) {
            await conn.execute(
                'INSERT INTO exam_questions (exam_id, question_id, question_order, score) VALUES (?, ?, ?, ?)',
                [examId, questionIds[i], i + 1, scorePerQuestion]
            );
        }

        await conn.commit();
        ok(res, { id: examId, question_count: questionIds.length }, 201);
    } catch (err) {
        await conn.rollback();
        fail(res, 'Không thể tạo bài thi: ' + err.message, 500);
    } finally {
        conn.release();
    }
});

// =====================================================================
// LÀM BÀI THI
// =====================================================================

app.post('/api/attempts/start', async (req, res) => {
    const { exam_id, student_id } = req.body || {};
    if (!exam_id || !student_id) return fail(res, 'Thiếu exam_id hoặc student_id', 422);

    const [[exam]] = [await pool.query('SELECT * FROM exams WHERE id = ?', [exam_id]).then(r => r[0])];
    if (!exam) return fail(res, 'Không tìm thấy bài thi', 404);

    const now = new Date();
    if (now < new Date(exam.start_time)) return fail(res, 'Bài thi chưa mở', 403);
    if (now > new Date(exam.end_time)) return fail(res, 'Bài thi đã đóng', 403);

    const [[{ cnt }]] = [await pool.query(
        'SELECT COUNT(*) AS cnt FROM exam_attempts WHERE exam_id = ? AND student_id = ?', [exam_id, student_id]
    ).then(r => r[0])];
    if (exam.max_attempts > 0 && cnt >= exam.max_attempts) return fail(res, 'Bạn đã hết số lần làm bài cho phép', 403);

    const [insertResult] = await pool.execute(
        `INSERT INTO exam_attempts (exam_id, student_id, attempt_number, started_at, status)
         VALUES (?, ?, ?, NOW(), 'in_progress')`,
        [exam_id, student_id, cnt + 1]
    );
    const attemptId = insertResult.insertId;

    const [questions] = await pool.query(
        `SELECT eq.score, q.id AS question_id, q.content, q.question_type
         FROM exam_questions eq JOIN question_bank q ON q.id = eq.question_id
         WHERE eq.exam_id = ? ORDER BY eq.question_order ASC`,
        [exam_id]
    );
    for (const q of questions) {
        const [opts] = await pool.query(
            'SELECT id, content FROM question_options WHERE question_id = ? ORDER BY option_order ASC', [q.question_id]
        );
        q.options = exam.shuffle_answers ? shuffleArray(opts) : opts;
    }
    const finalQuestions = exam.shuffle_questions ? shuffleArray(questions) : questions;

    ok(res, {
        attempt_id: attemptId,
        exam_title: exam.title,
        duration_minutes: exam.duration_minutes,
        end_time: exam.end_time,
        questions: finalQuestions,
    });
});

app.post('/api/attempts/submit', async (req, res) => {
    const { attempt_id, answers } = req.body || {};
    if (!attempt_id || !Array.isArray(answers)) return fail(res, 'Thiếu attempt_id hoặc answers', 422);

    const [[attempt]] = [await pool.query(
        `SELECT a.*, e.total_score, e.pass_score, e.question_count FROM exam_attempts a
         JOIN exams e ON e.id = a.exam_id WHERE a.id = ?`, [attempt_id]
    ).then(r => r[0])];
    if (!attempt) return fail(res, 'Không tìm thấy lượt làm bài', 404);
    if (attempt.status !== 'in_progress') return fail(res, 'Lượt làm bài này đã được nộp', 409);

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        let correctCount = 0;
        for (const ans of answers) {
            let isCorrect = null;
            if (ans.selected_option_id) {
                const [[opt]] = [await conn.query('SELECT is_correct FROM question_options WHERE id = ?', [ans.selected_option_id]).then(r => r[0])];
                isCorrect = opt ? !!opt.is_correct : false;
                if (isCorrect) correctCount++;
            }
            await conn.execute(
                `INSERT INTO exam_answers (attempt_id, question_id, selected_option_id, answer_text, is_correct)
                 VALUES (?, ?, ?, ?, ?)`,
                [attempt_id, ans.question_id, ans.selected_option_id || null, ans.answer_text || null, isCorrect === null ? null : (isCorrect ? 1 : 0)]
            );
        }

        const score = Math.round((correctCount / Math.max(1, attempt.question_count)) * attempt.total_score * 100) / 100;
        const isPassed = score >= attempt.pass_score ? 1 : 0;

        await conn.execute(
            `UPDATE exam_attempts SET submitted_at = NOW(), correct_count = ?, score = ?, is_passed = ?, status = ? WHERE id = ?`,
            [correctCount, score, isPassed, req.body.auto_submitted ? 'auto_submitted' : 'submitted', attempt_id]
        );

        await conn.commit();
        ok(res, { attempt_id, correct_count: correctCount, question_count: attempt.question_count, score, is_passed: !!isPassed });
    } catch (err) {
        await conn.rollback();
        fail(res, 'Không thể nộp bài: ' + err.message, 500);
    } finally {
        conn.release();
    }
});

// =====================================================================
// KẾT QUẢ
// =====================================================================

app.get('/api/results', async (req, res) => {
    const { student_id } = req.query;
    if (!student_id) return fail(res, 'Thiếu student_id', 422);

    const [rows] = await pool.query(
        `SELECT a.id AS attempt_id, a.attempt_number, a.started_at, a.submitted_at, a.correct_count,
                a.score, a.is_passed, e.title AS exam_title, s.code AS subject_code, s.name AS subject_name
         FROM exam_attempts a JOIN exams e ON e.id = a.exam_id JOIN subjects s ON s.id = e.subject_id
         WHERE a.student_id = ? AND a.status IN ('submitted','auto_submitted')
         ORDER BY a.submitted_at DESC`,
        [student_id]
    );
    ok(res, rows);
});

app.get('/api/results/:attemptId/review', async (req, res) => {
    const [[attempt]] = [await pool.query(
        `SELECT a.*, e.title AS exam_title FROM exam_attempts a JOIN exams e ON e.id = a.exam_id WHERE a.id = ?`,
        [req.params.attemptId]
    ).then(r => r[0])];
    if (!attempt) return fail(res, 'Không tìm thấy lượt làm bài', 404);

    const [answers] = await pool.query(
        `SELECT ans.question_id, ans.selected_option_id, ans.answer_text, ans.is_correct,
                q.content AS question_content, opt.content AS selected_option_content
         FROM exam_answers ans JOIN question_bank q ON q.id = ans.question_id
         LEFT JOIN question_options opt ON opt.id = ans.selected_option_id
         WHERE ans.attempt_id = ?`,
        [req.params.attemptId]
    );
    ok(res, { ...attempt, answers });
});

// =====================================================================
// CHỐNG GIAN LẬN
// =====================================================================

app.post('/api/anti-cheat', async (req, res) => {
    const { attempt_id, event_type, severity, description } = req.body || {};
    if (!attempt_id || !event_type) return fail(res, 'Thiếu attempt_id hoặc event_type', 422);

    const [result] = await pool.execute(
        `INSERT INTO anti_cheat_logs (attempt_id, event_type, severity, description, occurred_at) VALUES (?, ?, ?, ?, NOW())`,
        [attempt_id, event_type, severity || 'low', description || null]
    );
    ok(res, { id: result.insertId }, 201);
});

app.get('/api/anti-cheat', async (req, res) => {
    const { exam_id } = req.query;
    if (!exam_id) return fail(res, 'Thiếu exam_id', 422);

    const [rows] = await pool.query(
        `SELECT l.id, l.event_type, l.severity, l.description, l.occurred_at, u.full_name AS student_name
         FROM anti_cheat_logs l JOIN exam_attempts a ON a.id = l.attempt_id JOIN users u ON u.id = a.student_id
         WHERE a.exam_id = ? ORDER BY l.occurred_at DESC`,
        [exam_id]
    );
    ok(res, rows);
});

// ---- Hàm trộn mảng (Fisher-Yates) ----
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

app.listen(PORT, () => {
    console.log(`✅ DHV Quiz server đang chạy tại: http://localhost:${PORT}`);
    console.log(`   Mở trang đăng nhập: http://localhost:${PORT}`);
});
