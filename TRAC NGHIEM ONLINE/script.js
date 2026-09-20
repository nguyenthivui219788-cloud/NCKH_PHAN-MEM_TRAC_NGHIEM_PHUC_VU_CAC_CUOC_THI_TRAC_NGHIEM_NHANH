// Global custom toast alert override (tự động đổi tất cả alert() thành thông báo nổi tuyệt đẹp)
window.alert = function(message) {
    console.log("Custom Toast Alert:", message);
    
    // Ensure the container for toast exists
    let container = document.getElementById('custom-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'custom-toast-container';
        container.style.cssText = "position: fixed; top: 24px; right: 24px; z-index: 9999999999; display: flex; flex-direction: column; gap: 12px; pointer-events: none; font-family: system-ui, -apple-system, sans-serif;";
        document.body.appendChild(container);
    }
    
    // Create toast notification card
    const toast = document.createElement('div');
    toast.style.cssText = "pointer-events: auto; background: #ffffff; border-left: 5px solid #2563eb; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15); border-radius: 14px; padding: 16px 20px; width: 350px; max-width: 90vw; display: flex; align-items: flex-start; gap: 14px; transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease; opacity: 0; position: relative; border-top: 1px solid rgba(0,0,0,0.02); border-right: 1px solid rgba(0,0,0,0.02); box-sizing: border-box;";
    
    // Customize icon and color based on message content
    let icon = "🔔";
    let borderColor = "#2563eb"; // blue primary
    
    const msgLower = String(message).toLowerCase();
    if (msgLower.includes('thành công') || msgLower.includes('chúc mừng') || msgLower.includes('hoàn tất') || msgLower.includes('nộp bài') || msgLower.includes('đúng')) {
        icon = "✅";
        borderColor = "#10b981"; // green success
    } else if (msgLower.includes('thất bại') || msgLower.includes('lỗi') || msgLower.includes('không thể') || msgLower.includes('sai') || msgLower.includes('cảnh báo') || msgLower.includes('gian lận')) {
        icon = "🚨";
        borderColor = "#ef4444"; // red error
    }
    
    toast.style.borderLeftColor = borderColor;
    
    toast.innerHTML = `
        <span style="font-size: 22px; flex-shrink: 0; line-height: 1; margin-top: 2px;">${icon}</span>
        <div style="flex-grow: 1; font-size: 13.5px; font-weight: 700; color: #1e293b; line-height: 1.5; padding-right: 16px; word-break: break-word; text-align: left;">${message}</div>
        <button type="button" style="position: absolute; top: 16px; right: 16px; border: none; background: transparent; color: #94a3b8; cursor: pointer; font-size: 14px; font-weight: 800; padding: 0; line-height: 1; transition: color 0.2s;" onmouseover="this.style.color='#475569'" onmouseout="this.style.color='#94a3b8'">✕</button>
    `;
    
    // Close on button click
    toast.querySelector('button').onclick = function() {
        toast.style.transform = 'translateX(120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    };
    
    container.appendChild(toast);
    
    // Animation trigger
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    }, 50);
    
    // Auto remove after 4.5 seconds
    setTimeout(() => {
        if (toast && toast.parentElement) {
            toast.style.transform = 'translateX(120%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }
    }, 4500);
};

// Ngân hàng 50 câu hỏi phong phú chuẩn cho Hệ thống DHV QUIZ
const full50DatabaseQuestions = [
    { id: 1, question: "Từ khóa nào dùng để lọc dữ liệu trong câu lệnh SELECT?", options: ["A. WHERE", "B. GROUP BY", "C. ORDER BY", "D. HAVING"], correct: 0 },
    { id: 2, question: "Mô hình ERD dùng để làm gì trong thiết kế cơ sở dữ liệu?", options: ["A. Mô hình hóa thực thể và mối quan hệ", "B. Viết mã truy vấn SQL", "C. Quản lý phân quyền người dùng", "D. Tối ưu hóa chỉ mục Index"], correct: 0 },
    { id: 3, question: "Khóa ngoại (Foreign Key) có chức năng chính là gì?", options: ["A. Liên kết dữ liệu giữa các bảng", "B. Tăng tốc độ truy vấn", "C. Đảm bảo tính duy nhất", "D. Thay thế cho khóa chính"], correct: 0 },
    { id: 4, question: "Câu lệnh SQL nào dùng để thêm bản ghi mới vào bảng?", options: ["A. INSERT INTO", "B. UPDATE", "C. ADD RECORD", "D. CREATE TABLE"], correct: 0 },
    { id: 5, question: "Hàm AVG() trong SQL có công dụng gì?", options: ["A. Tính giá trị trung bình", "B. Đếm số lượng bản ghi", "C. Tìm giá trị lớn nhất", "D. Tính tổng số"], correct: 0 },
    { id: 6, question: "Giao dịch (Transaction) trong CSDL tuân theo tính chất nào?", options: ["A. ACID", "B. BASE", "C. CRUD", "D. REST"], correct: 0 },
    { id: 7, question: "Phép nối INNER JOIN trả về kết quả nào?", options: ["A. Các bản ghi khớp ở cả 2 bảng", "B. Tất cả bản ghi bảng bên trái", "C. Tất cả bản ghi bảng bên phải", "D. Tất cả bản ghi 2 bảng"], correct: 0 },
    { id: 8, question: "Mức chuẩn hóa 1NF yêu cầu điều kiện gì?", options: ["A. Các thuộc tính phải là đơn trị (atomic)", "B. Không còn phụ thuộc thuộc tính không khóa", "C. Loại bỏ phụ thuộc bắc cầu", "D. Phải có khóa chính dạng số"], correct: 0 },
    { id: 9, question: "Lệnh nào dùng để xóa toàn bộ dữ liệu trong bảng nhưng giữ lại cấu trúc?", options: ["A. TRUNCATE TABLE", "B. DROP TABLE", "C. DELETE DATABASE", "D. REMOVE TABLE"], correct: 0 },
    { id: 10, question: "Chỉ mục (Index) trong CSDL mang lại lợi ích gì?", options: ["A. Tăng tốc độ tìm kiếm dữ liệu", "B. Giảm dung lượng lưu trữ", "C. Bảo mật dữ liệu", "D. Đảm bảo tính toàn vẹn"], correct: 0 },
    { id: 11, question: "Ràng buộc UNIQUE dùng để làm gì?", options: ["A. Đảm bảo tất cả giá trị trong cột là duy nhất", "B. Bắt buộc cột không được để trống", "C. Tự động tăng giá trị", "D. Kiểm tra điều kiện logic"], correct: 0 },
    { id: 12, question: "Cú pháp để sắp xếp kết quả giảm dần trong SQL là gì?", options: ["A. ORDER BY col DESC", "B. SORT BY col DOWN", "C. GROUP BY col DESC", "D. ORDER BY col ASC"], correct: 0 },
    { id: 13, question: "View trong SQL là gì?", options: ["A. Một bảng ảo dựa trên câu lệnh SELECT", "B. Một tập tin lưu cấu trúc CSDL", "C. Một hàm xử lý chuỗi", "D. Một thủ tục lưu trữ"], correct: 0 },
    { id: 14, question: "Để nhóm dữ liệu theo các giá trị trùng nhau ta dùng câu lệnh nào?", options: ["A. GROUP BY", "B. ORDER BY", "C. CLUSTER BY", "D. ALIGN BY"], correct: 0 },
    { id: 15, question: "Hàm COUNT(*) thực hiện chức năng gì?", options: ["A. Đếm tổng số dòng trong bảng", "B. Đếm số dòng không chứa NULL", "C. Tính tổng giá trị cột", "D. Tìm giá trị nhỏ nhất"], correct: 0 },
    
    // Câu 16 chuẩn 100% theo Screenshot 3 của người dùng!
    { 
        id: 16, 
        question: "Trong mô hình quan hệ, khóa chính (Primary Key) của một bảng có đặc điểm nào sau đây?", 
        options: [
            "A. Có giá trị duy nhất cho mỗi bản ghi và không được để trống.",
            "B. Có thể trùng lặp giá trị giữa các bản ghi.",
            "C. Có thể để trống (NULL).",
            "D. Không bao giờ được thay đổi."
        ], 
        correct: 0 
    },

    { id: 17, question: "Hệ quản trị CSDL nào sau đây là hệ quản trị CSDL mã nguồn mở?", options: ["A. MySQL", "B. Oracle Database", "C. Microsoft SQL Server", "D. IBM DB2"], correct: 0 },
    { id: 18, question: "Từ khóa LIKE kết hợp với ký tự '%' mang ý nghĩa gì?", options: ["A. Đại diện cho đại tự bất kỳ có độ dài tùy ý", "B. Đại diện cho đúng 1 ký tự", "C. Tìm kiếm chính xác ký tự %", "D. Phép toán chia lấy dư"], correct: 0 },
    { id: 19, question: "Trigger trong CSDL được kích hoạt tự động khi nào?", options: ["A. Khi có sự kiện INSERT, UPDATE hoặc DELETE", "B. Khi khởi động máy chủ CSDL", "C. Khi người dùng đăng nhập", "D. Khi thực hiện câu lệnh SELECT"], correct: 0 },
    { id: 20, question: "Thuật ngữ DDL (Data Definition Language) gồm các lệnh nào?", options: ["A. CREATE, ALTER, DROP", "B. SELECT, INSERT, UPDATE", "C. GRANT, REVOKE", "D. COMMIT, ROLLBACK"], correct: 0 },
    { id: 21, question: "Thuật ngữ DML (Data Manipulation Language) bao gồm các lệnh nào?", options: ["A. INSERT, UPDATE, DELETE, SELECT", "B. CREATE, DROP, RENAME", "C. GRANT, DENY", "D. ALTER, TRUNCATE"], correct: 0 },
    { id: 22, question: "Mối quan hệ giữa Sinh viên và Môn học thường là loại quan hệ nào?", options: ["A. Nhiều - Nhiều (N-N)", "B. Một - Một (1-1)", "C. Một - Nhiều (1-N)", "D. Không có quan hệ"], correct: 0 },
    { id: 23, question: "Khái niệm NULL trong CSDL được hiểu là gì?", options: ["A. Giá trị chưa biết hoặc không tồn tại", "B. Số 0", "C. Chuỗi rỗng \"\"", "D. Giá trị sai (False)"], correct: 0 },
    { id: 24, question: "Lệnh HAVING khác lệnh WHERE ở điểm nào?", options: ["A. HAVING dùng để lọc nhóm sau khi GROUP BY", "B. WHERE dùng cho GROUP BY", "C. HAVING chạy trước WHERE", "D. Cả hai hoàn toàn giống nhau"], correct: 0 },
    { id: 25, question: "Ràng buộc CHECK dùng để làm gì?", options: ["A. Kiểm tra điều kiện hợp lệ của dữ liệu khi nhập", "B. Kiểm tra kết nối mạng", "C. Kiểm tra tài khoản người dùng", "D. Kiểm tra loại ổ đĩa lưu trữ"], correct: 0 }
];

for (let i = 26; i <= 50; i++) {
    full50DatabaseQuestions.push({
        id: i,
        question: `Câu hỏi lý thuyết CSDL số ${i}: Lựa chọn đáp án đúng nhất theo chuẩn kiến thức học phần IT003?`,
        options: [
            `A. Đáp án đúng cho câu hỏi số ${i}`,
            `B. Phương án tham khảo phương án B`,
            `C. Phương án tham khảo phương án C`,
            `D. Phương án tham khảo phương án D`
        ],
        correct: 0
    });
}

// Danh sách Môn học sinh viên
const studentSubjects = [
    {
        code: "IT003",
        title: "IT003 - Cơ sở dữ liệu",
        lecturer: "Giảng viên: ThS. Nguyễn Minh Tuấn",
        desc: "Mô tả: Học phần cung cấp kiến thức về mô hình dữ liệu, thiết kế CSDL, SQL và quản trị CSDL.",
        credits: "3 tín chỉ",
        studentsCount: "45 sinh viên",
        quizzesCount: 3,
        statusBadge: "2 sắp diễn ra",
        statusType: "upcoming",
        bgColor: "#e0e7ff",
        iconColor: "#4f46e5",
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
    },
    {
        code: "IT002",
        title: "IT002 - Cấu trúc dữ liệu và giải thuật",
        lecturer: "Giảng viên: ThS. Trần Thị Mai",
        desc: "Mô tả: Cung cấp các cấu trúc dữ liệu cơ bản, giải thuật tìm kiếm, sắp xếp và phân tích độ phức tạp.",
        credits: "3 tín chỉ",
        studentsCount: "50 sinh viên",
        quizzesCount: 2,
        statusBadge: "1 sắp diễn ra",
        statusType: "upcoming",
        bgColor: "#d1fae5",
        iconColor: "#059669",
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
    },
    {
        code: "IT004",
        title: "IT004 - Mạng máy tính",
        lecturer: "Giảng viên: ThS. Lê Hoàng Phúc",
        desc: "Mô tả: Tìm hiểu mô hình OSI, TCP/IP, địa chỉ IP, routing và cấu hình mạng cơ bản.",
        credits: "3 tín chỉ",
        studentsCount: "40 sinh viên",
        quizzesCount: 2,
        statusBadge: "Chưa có bài thi",
        statusType: "none",
        bgColor: "#ffedd5",
        iconColor: "#ea580c",
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line></svg>'
    },
    {
        code: "IT005",
        title: "IT005 - Lập trình Web",
        lecturer: "Giảng viên: ThS. Phạm Văn Hùng",
        desc: "Mô tả: Xây dựng website hiện đại với HTML5, CSS3, JavaScript và RESTful API.",
        credits: "4 tín chỉ",
        studentsCount: "55 sinh viên",
        quizzesCount: 3,
        statusBadge: "1 sắp diễn ra",
        statusType: "upcoming",
        bgColor: "#ffe4e6",
        iconColor: "#e11d48",
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="8" x2="22" y2="8"></line></svg>'
    },
    {
        code: "IT006",
        title: "IT006 - Lập trình hướng đối tượng",
        lecturer: "Giảng viên: ThS. Nguyễn Văn Nam",
        desc: "Mô tả: 4 tính chất OOP: Đóng gói, Thừa kế, Đa hình, Trừu tượng hóa với C++/Java.",
        credits: "3 tín chỉ",
        studentsCount: "48 sinh viên",
        quizzesCount: 2,
        statusBadge: "Chưa có bài thi",
        statusType: "none",
        bgColor: "#e0f2fe",
        iconColor: "#0284c7",
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 10h-4V6a2 2 0 0 0-4 0v4H6a2 2 0 0 0 0 4h4v4a2 2 0 0 0 4 0v-4h4a2 2 0 0 0 0-4z"></path></svg>'
    },
    {
        code: "IT007",
        title: "IT007 - An toàn thông tin",
        lecturer: "Giảng viên: ThS. Đặng Thị Hương",
        desc: "Mô tả: Mã hóa dữ liệu, an ninh mạng, chữ ký số và phòng chống tấn công mạng.",
        credits: "3 tín chỉ",
        studentsCount: "42 sinh viên",
        quizzesCount: 2,
        statusBadge: "1 sắp diễn ra",
        statusType: "upcoming",
        bgColor: "#ccfbf1",
        iconColor: "#0d9488",
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
    },
    {
        code: "IT008",
        title: "IT008 - Trí tuệ nhân tạo",
        lecturer: "Giảng viên: ThS. Võ Minh Khoa",
        desc: "Mô tả: Nhập môn AI, Machine Learning, Deep Learning và xử lý ngôn ngữ tự nhiên.",
        credits: "3 tín chỉ",
        studentsCount: "38 sinh viên",
        quizzesCount: 2,
        statusBadge: "Chưa có bài thi",
        statusType: "none",
        bgColor: "#fce7f3",
        iconColor: "#db2777",
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg>'
    },
    {
        code: "IT009",
        title: "IT009 - Lập trình Mobile",
        lecturer: "Giảng viên: ThS. Hoàng Anh Dũng",
        desc: "Mô tả: Phát triển ứng dụng di động đa nền tảng với Flutter và React Native.",
        credits: "3 tín chỉ",
        studentsCount: "44 sinh viên",
        quizzesCount: 2,
        statusBadge: "Chưa có bài thi",
        statusType: "none",
        bgColor: "#fef3c7",
        iconColor: "#d97706",
        iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>'
    }
];

let currentUser = null; 
let selectedRole = 'student'; 
let currentQuestionIndex = 0; 
let userAnswersMap = {}; 
let flaggedQuestionsMap = {}; 
let engineTimerInterval = null;
let engineTimeLeft = 60 * 60;

window.animateStatCounters = function() {
    const statNumbers = document.querySelectorAll('.about-stats-bar .stat-number');
    statNumbers.forEach(el => {
        const targetAttr = el.getAttribute('data-target');
        if (!targetAttr) return;
        const target = parseFloat(targetAttr);
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0');
        
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = start + (target - start) * easeProgress;
            
            if (decimals > 0) {
                el.textContent = currentVal.toFixed(decimals) + suffix;
            } else {
                const formatted = Math.floor(currentVal).toLocaleString('vi-VN');
                el.textContent = formatted + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        requestAnimationFrame(updateNumber);
    });
};

// HÀM CHUYỂN ĐỔI GIAO DIỆN CHÍNH
function navigateTo(viewId) {
    if (!viewId) viewId = 'view-about';

    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.add('hidden');
    });

    const targetSection = document.getElementById(viewId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        // Re-trigger entrance CSS animations
        const animEls = targetSection.querySelectorAll('.about-stats-bar, .about-card-item, .about-values-bar, .hero-logo-left-img, .role-hero-title, .role-card-item, .role-white-feature-bar, .role-campus-bg-container, .about-hero-right, .role-wave-bottom-right, .role-dark-footer, .about-dark-footer, .left-dark-panel, .right-white-card, .dark-footer-stat-bar, .dark-left-panel, .dark-right-white-card, .dark-bottom-features-grid, .dark-feature-card');
        animEls.forEach(el => {
            const oldAnimation = el.style.animation;
            el.style.animation = 'none';
            void el.offsetHeight;
            el.style.animation = oldAnimation;
        });
    }

    localStorage.setItem('dhv_current_view', viewId);
    try {
        if (window.location.hash !== '#' + viewId) {
            if (!window.location.hash) {
                history.replaceState(null, '', '#' + viewId);
            } else {
                history.pushState(null, '', '#' + viewId);
            }
        }
    } catch(e) {}

    const mainHeader = document.getElementById('main-dhv-header');

    const navAbout = document.getElementById('nav-about');
    const navHome = document.getElementById('nav-home');
    const navContact = document.getElementById('nav-contact');

    document.querySelectorAll('.main-nav .nav-item-link').forEach(link => {
        link.classList.remove('active-nav');
    });

    if (viewId === 'view-student' || viewId === 'view-lecturer' || viewId === 'view-qbank') {
        if (mainHeader) mainHeader.classList.add('hidden');
        document.body.style.background = 'linear-gradient(135deg, #0a1936 0%, #172A64 50%, #0d1e42 100%)';
        if (viewId === 'view-student') showSubjectGrid();
        if (viewId === 'view-lecturer') {
            const lecView = document.getElementById('view-lecturer');
            if (lecView) lecView.classList.remove('hidden');
            showLecturerExamList();
        }
        if (viewId === 'view-qbank') {
            const lecView = document.getElementById('view-lecturer');
            if (lecView) lecView.classList.remove('hidden');
            showLecturerQBankSubView('all');
        }
        return;
    }

    if (viewId === 'view-about') {
        if (navAbout) { navAbout.classList.remove('hidden'); navAbout.classList.add('active-nav'); }
        if (navHome) navHome.classList.add('hidden');
        if (navContact) navContact.classList.remove('hidden');
        setTimeout(() => { animateStatCounters(); }, 50);
    } else {
        if (navAbout) navAbout.classList.remove('hidden');
        if (navHome) navHome.classList.remove('hidden');
        if (navContact) navContact.classList.remove('hidden');

        if (viewId === 'view-role-selection') {
            if (navHome) navHome.classList.add('active-nav');
        }
    }

    if (viewId === 'view-auth') {
        if (mainHeader) mainHeader.classList.add('hidden');
        document.body.style.background = 'linear-gradient(135deg, #071939 0%, #0d285a 50%, #05132d 100%)';
    } else {
        if (mainHeader) mainHeader.classList.remove('hidden');

        if (viewId === 'view-role-selection' || viewId === 'view-about') {
            document.body.style.background = '#f4f7fb';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #0a1936 0%, #172A64 50%, #0d1e42 100%)';
        }
    }
}

window.showSubjectGrid = function() {
    const gridSubview = document.getElementById('student-subjects-subview');
    const detailSubview = document.getElementById('student-detail-subview');
    const engineSubview = document.getElementById('student-quiz-engine-subview');
    const resultsSubview = document.getElementById('student-results-subview');

    if (gridSubview) gridSubview.classList.remove('hidden');
    if (detailSubview) detailSubview.classList.add('hidden');
    if (engineSubview) engineSubview.classList.add('hidden');
    if (resultsSubview) resultsSubview.classList.add('hidden');

    const navQuiz = document.getElementById('sb-nav-quiz');
    const navResults = document.getElementById('sb-nav-results');
    if (navQuiz) navQuiz.classList.add('active');
    if (navResults) navResults.classList.remove('active');

    renderSubjectCardsWithPagination(1);
};

window.showResultsSubview = function() {
    const gridSubview = document.getElementById('student-subjects-subview');
    const detailSubview = document.getElementById('student-detail-subview');
    const engineSubview = document.getElementById('student-quiz-engine-subview');
    const resultsSubview = document.getElementById('student-results-subview');

    if (gridSubview) gridSubview.classList.add('hidden');
    if (detailSubview) detailSubview.classList.add('hidden');
    if (engineSubview) engineSubview.classList.add('hidden');
    if (resultsSubview) resultsSubview.classList.remove('hidden');

    const navQuiz = document.getElementById('sb-nav-quiz');
    const navResults = document.getElementById('sb-nav-results');
    if (navQuiz) navQuiz.classList.remove('active');
    if (navResults) navResults.classList.add('active');

    renderResultsTableWithPagination(1);

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openSubjectDetail = function(code) {
    const subj = studentSubjects.find(s => s.code === code) || studentSubjects[0];
    
    const gridSubview = document.getElementById('student-subjects-subview');
    const detailSubview = document.getElementById('student-detail-subview');
    const engineSubview = document.getElementById('student-quiz-engine-subview');
    const resultsSubview = document.getElementById('student-results-subview');

    if (gridSubview) gridSubview.classList.add('hidden');
    if (detailSubview) detailSubview.classList.remove('hidden');
    if (engineSubview) engineSubview.classList.add('hidden');
    if (resultsSubview) resultsSubview.classList.add('hidden');

    const breadcrumbTitle = document.getElementById('detail-breadcrumb-title');
    const heroTitle = document.getElementById('detail-subj-title');
    const heroLecturer = document.getElementById('detail-subj-lecturer');
    const heroDesc = document.getElementById('detail-subj-desc');
    const heroCredits = document.getElementById('detail-subj-credits');
    const heroStudents = document.getElementById('detail-subj-students');
    const heroIcon = document.getElementById('detail-hero-icon');

    if (breadcrumbTitle) breadcrumbTitle.textContent = `${subj.title.split(' - ')[1]} (${subj.code})`;
    if (heroTitle) heroTitle.textContent = subj.title;
    if (heroLecturer) heroLecturer.textContent = subj.lecturer;
    if (heroDesc) heroDesc.textContent = subj.desc;
    if (heroCredits) heroCredits.textContent = subj.credits;
    if (heroStudents) heroStudents.textContent = subj.studentsCount;

    if (heroIcon) {
        heroIcon.style.background = subj.bgColor;
        heroIcon.style.color = subj.iconColor;
        heroIcon.innerHTML = subj.iconSvg;
    }

    if (typeof renderStudentExamsList === 'function') {
        renderStudentExamsList(subj.code);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

let currentActiveExam = null;

function getExamQuestions() {
    let limit = 50;
    if (currentActiveExam && currentActiveExam.qCount) {
        limit = parseInt(currentActiveExam.qCount) || 50;
    }
    return full50DatabaseQuestions.slice(0, Math.min(limit, full50DatabaseQuestions.length));
}

window.startQuizEngine = function(quizId) {
    if (typeof loadLecturerExamsFromStorage === 'function') loadLecturerExamsFromStorage();
    const gridSubview = document.getElementById('student-subjects-subview');
    const detailSubview = document.getElementById('student-detail-subview');
    const engineSubview = document.getElementById('student-quiz-engine-subview');
    const resultsSubview = document.getElementById('student-results-subview');

    if (gridSubview) gridSubview.classList.add('hidden');
    if (detailSubview) detailSubview.classList.add('hidden');
    if (engineSubview) engineSubview.classList.remove('hidden');
    if (resultsSubview) resultsSubview.classList.add('hidden');

    userAnswersMap = {};
    flaggedQuestionsMap = {};
    currentQuestionIndex = 0;

    let foundExam = null;
    if (quizId && typeof mockLecturerExamsData !== 'undefined') {
        foundExam = mockLecturerExamsData.find(ex => String(ex.id) === String(quizId));
    }
    if (!foundExam && typeof currentStudentSubjectCode !== 'undefined') {
        foundExam = mockLecturerExamsData.find(ex => ex.subjectCode === currentStudentSubjectCode) || mockLecturerExamsData[0];
    }

    currentActiveExam = foundExam || mockLecturerExamsData[0];

    const examDuration = currentActiveExam ? (parseInt(currentActiveExam.duration) || 60) : 60;
    const examQCount = currentActiveExam ? (parseInt(currentActiveExam.qCount) || 50) : 50;
    const targetCode = (currentActiveExam && currentActiveExam.subjectCode) ? currentActiveExam.subjectCode : (currentStudentSubjectCode || 'IT003');
    const subjObj = studentSubjects.find(s => s.code === targetCode) || studentSubjects[0];

    // 1. Update Title Header
    const titleEl = document.getElementById('engine-quiz-title');
    if (titleEl) {
        const titleText = currentActiveExam ? currentActiveExam.title : subjObj.title;
        titleEl.innerHTML = `${titleText} (${targetCode}) <span class="info-circle-sm">ⓘ</span>`;
    }

    // 2. Update Lecturer
    const lecturerEl = document.getElementById('engine-lecturer');
    if (lecturerEl) {
        lecturerEl.textContent = subjObj ? subjObj.lecturer.replace('Giảng viên: ', '') : 'ThS. Nguyễn Minh Tuấn';
    }

    // 3. Update Duration Text
    const durationEl = document.getElementById('engine-duration');
    if (durationEl) {
        durationEl.textContent = `${examDuration} phút`;
    }

    // 4. Update Total Questions Count Text
    const totalQEl = document.getElementById('engine-total-questions');
    if (totalQEl) {
        totalQEl.textContent = `${examQCount}`;
    }

    // 5. Update Back Button Link
    const backBtn = document.querySelector('#student-quiz-engine-subview .btn-back-link');
    if (backBtn) {
        backBtn.onclick = () => openSubjectDetail(targetCode);
    }

    buildJumpQuestionSelect();
    renderEngineActiveQuestion();
    renderQuestionMapGrid();
    updateQuizProgressBar();

    startEngineTimer(examDuration);

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function startEngineTimer(durationMinutes = 60) {
    clearInterval(engineTimerInterval);
    engineTimeLeft = (parseInt(durationMinutes) || 60) * 60;

    const timerEl = document.getElementById('quiz-countdown-digital');
    
    // Set initial timer text immediately
    let initialHrs = Math.floor(engineTimeLeft / 3600);
    let initialMins = Math.floor((engineTimeLeft % 3600) / 60);
    let initialSecs = engineTimeLeft % 60;

    let hStr = initialHrs < 10 ? '0' + initialHrs : initialHrs;
    let mStr = initialMins < 10 ? '0' + initialMins : initialMins;
    let sStr = initialSecs < 10 ? '0' + initialSecs : initialSecs;

    if (timerEl) {
        timerEl.textContent = `${hStr}:${mStr}:${sStr}`;
    }

    engineTimerInterval = setInterval(() => {
        if (engineTimeLeft <= 0) {
            clearInterval(engineTimerInterval);
            alert("Hết thời gian làm bài! Hệ thống tự động nộp bài.");
            confirmSubmitExam();
        } else {
            engineTimeLeft--;
            let hrs = Math.floor(engineTimeLeft / 3600);
            let mins = Math.floor((engineTimeLeft % 3600) / 60);
            let secs = engineTimeLeft % 60;

            let hStr = hrs < 10 ? '0' + hrs : hrs;
            let mStr = mins < 10 ? '0' + mins : mins;
            let sStr = secs < 10 ? '0' + secs : secs;

            if (timerEl) {
                timerEl.textContent = `${hStr}:${mStr}:${sStr}`;
            }
        }
    }, 1000);
}

function renderEngineActiveQuestion() {
    const activeQuestions = getExamQuestions();
    const qData = activeQuestions[currentQuestionIndex];
    if (!qData) return;

    const qTitleLabel = document.getElementById('q-title-label');
    if (qTitleLabel) qTitleLabel.textContent = `Câu ${currentQuestionIndex + 1}`;

    const qTextContent = document.getElementById('q-text-content');
    if (qTextContent) qTextContent.textContent = qData.question;

    const optionsContainer = document.getElementById('q-options-container');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    const selectedOptIdx = userAnswersMap[currentQuestionIndex];

    qData.options.forEach((optText, idx) => {
        const pill = document.createElement('div');
        pill.className = `q-option-pill ${selectedOptIdx === idx ? 'selected' : ''}`;
        pill.onclick = () => selectEngineOption(idx);

        pill.innerHTML = `
            <div class="radio-circle-custom"></div>
            <span>${optText}</span>
        `;
        optionsContainer.appendChild(pill);
    });

    const btnPrev = document.getElementById('btn-q-prev');
    const btnNext = document.getElementById('btn-q-next');
    const jumpSelect = document.getElementById('jump-question-select');

    if (btnPrev) btnPrev.disabled = (currentQuestionIndex === 0);
    if (btnNext) btnNext.disabled = (currentQuestionIndex === activeQuestions.length - 1);
    if (jumpSelect) jumpSelect.value = currentQuestionIndex;

    renderQuestionMapGrid();
    updateQuizProgressBar();
}

function selectEngineOption(idx) {
    userAnswersMap[currentQuestionIndex] = idx;
    renderEngineActiveQuestion();
}

window.prevQuestion = function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderEngineActiveQuestion();
    }
};

window.nextQuestion = function() {
    const activeQuestions = getExamQuestions();
    if (currentQuestionIndex < activeQuestions.length - 1) {
        currentQuestionIndex++;
        renderEngineActiveQuestion();
    }
};

window.jumpToQuestion = function(index) {
    currentQuestionIndex = parseInt(index);
    renderEngineActiveQuestion();
};

window.toggleBookmarkCurrent = function() {
    if (flaggedQuestionsMap[currentQuestionIndex]) {
        delete flaggedQuestionsMap[currentQuestionIndex];
    } else {
        flaggedQuestionsMap[currentQuestionIndex] = true;
    }
    renderQuestionMapGrid();
};

function buildJumpQuestionSelect() {
    const select = document.getElementById('jump-question-select');
    if (!select) return;
    select.innerHTML = '';
    const activeQuestions = getExamQuestions();
    for (let i = 0; i < activeQuestions.length; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Chuyển đến câu ${i + 1}`;
        select.appendChild(opt);
    }
}

function renderQuestionMapGrid() {
    const grid = document.getElementById('q-number-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const activeQuestions = getExamQuestions();

    for (let i = 0; i < activeQuestions.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'q-num-btn';
        btn.textContent = i + 1;

        if (i === currentQuestionIndex) {
            btn.classList.add('current');
        } else if (userAnswersMap[i] !== undefined) {
            btn.classList.add('done');
        }

        if (flaggedQuestionsMap[i]) {
            btn.classList.add('flagged');
        }

        btn.onclick = () => jumpToQuestion(i);
        grid.appendChild(btn);
    }
}

function updateQuizProgressBar() {
    const doneCount = Object.keys(userAnswersMap).length;
    const activeQuestions = getExamQuestions();
    const total = activeQuestions.length;
    const percent = Math.round((doneCount / total) * 100);

    const doneText = document.getElementById('done-count-text');
    const percentText = document.getElementById('done-percent-text');
    const subDoneText = document.getElementById('sub-done-count');
    const fillBar = document.getElementById('quiz-progress-fill');

    if (doneText) doneText.textContent = `${doneCount}/${total} câu`;
    if (percentText) percentText.textContent = `${percent}%`;
    if (subDoneText) subDoneText.textContent = `${doneCount}/${total}`;
    if (fillBar) fillBar.style.width = `${percent}%`;
}

window.confirmSubmitExam = function() {
    if (confirm("Bạn có chắc chắn muốn nộp bài thi không?")) {
        clearInterval(engineTimerInterval);
        
        const activeQuestions = getExamQuestions();
        let correctCount = 0;
        activeQuestions.forEach((q, idx) => {
            if (userAnswersMap[idx] === q.correct) {
                correctCount++;
            }
        });

        let scoreNum = parseFloat(((correctCount / activeQuestions.length) * 10).toFixed(2));
        let scoreStr = scoreNum.toFixed(2);

        const correctEl = document.getElementById('correct-count');
        const totalEl = document.querySelector('.total-count');
        const scoreEl = document.getElementById('score-points');
        const modal = document.getElementById('result-modal');

        if (correctEl) correctEl.textContent = correctCount;
        if (totalEl) totalEl.textContent = activeQuestions.length;
        if (scoreEl) scoreEl.textContent = scoreStr;

        // AUTOMATICALLY SAVE EXAM RESULT RECORD TO TABLE & LOCALSTORAGE
        const nowObj = new Date();
        const dateStr = nowObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = nowObj.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
        
        const examTitle = currentActiveExam ? currentActiveExam.title : 'Bài kiểm tra trắc nghiệm';
        const subjName = currentActiveExam ? currentActiveExam.subject : 'Môn học';

        saveExamResultRecord({
            title: examTitle,
            subject: subjName,
            date: dateStr,
            time: timeStr,
            score: scoreStr,
            passed: scoreNum >= 5.0
        });

        if (modal) modal.classList.remove('hidden');
    }
};

function scoreNumColorClass(score) {
    const val = parseFloat(score);
    if (val >= 8.0) return 'score-green';
    if (val >= 5.0) return 'score-amber';
    return 'score-red';
}

function parseDateAndTimeParts(dateInput, timeInput) {
    let dateStr = (dateInput || '').toString().trim();
    let timeStr = (timeInput || '').toString().trim();

    if (!timeStr && dateStr.includes(' ')) {
        const parts = dateStr.split(/\s+/);
        if (parts.length >= 2) {
            if (parts[0].includes(':')) {
                timeStr = parts[0];
                dateStr = parts[1];
            } else {
                dateStr = parts[0];
                timeStr = parts[1];
            }
        }
    }

    return { date: dateStr, time: timeStr };
}

function saveExamResultRecord(record) {
    const { date, time } = parseDateAndTimeParts(record.date, record.time);
    record.date = date;
    record.time = time;

    const tableBody = document.getElementById('results-table-body');
    if (tableBody) {
        const newRow = document.createElement('tr');
        const isPass = record.passed;
        const scoreClass = scoreNumColorClass(record.score);
        const fullDateStr = `${date} ${time}`.trim();
        
        newRow.innerHTML = `
            <td>
                <div class="exam-title-cell">
                    <div class="cell-doc-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    </div>
                    <strong>${record.title}</strong>
                </div>
            </td>
            <td>${record.subject}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td><strong class="${scoreClass}">${record.score}</strong></td>
            <td><span class="${isPass ? 'badge-pass-green' : 'badge-fail-red'}">${isPass ? 'Đạt' : 'Chưa đạt'}</span></td>
            <td style="text-align: right;">
                <div class="action-cell">
                    <button class="btn-res-view-detail" onclick="viewExamReviewDetail('${record.title}', '${record.subject}', '${record.score}', '${fullDateStr}')">Xem chi tiết</button>
                    <button class="btn-three-dots">⋮</button>
                </div>
            </td>
        `;
        tableBody.insertBefore(newRow, tableBody.firstChild);
    }

    // Save to LocalStorage
    let savedResults = [];
    try {
        savedResults = JSON.parse(localStorage.getItem('dhv_saved_results') || '[]');
    } catch(e) {}
    savedResults.unshift(record);
    localStorage.setItem('dhv_saved_results', JSON.stringify(savedResults));

    // Update Summary Metric Cards
    updateResultsSummaryStats();

    // Re-render Table Pagination on Page 1
    if (typeof window.renderResultsTableWithPagination === 'function') {
        window.renderResultsTableWithPagination(1);
    }
}

function loadSavedExamResults() {
    let savedResults = [];
    try {
        savedResults = JSON.parse(localStorage.getItem('dhv_saved_results') || '[]');
    } catch(e) {}

    const tableBody = document.getElementById('results-table-body');
    if (tableBody && savedResults.length > 0) {
        let updatedResults = [];
        savedResults.forEach(record => {
            const { date, time } = parseDateAndTimeParts(record.date, record.time);
            record.date = date;
            record.time = time;
            updatedResults.push(record);

            const newRow = document.createElement('tr');
            const isPass = record.passed;
            const scoreClass = scoreNumColorClass(record.score);
            const fullDateStr = `${date} ${time}`.trim();
            
            newRow.innerHTML = `
                <td>
                    <div class="exam-title-cell">
                        <div class="cell-doc-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        </div>
                        <strong>${record.title}</strong>
                    </div>
                </td>
                <td>${record.subject}</td>
                <td>${date}</td>
                <td>${time}</td>
                <td><strong class="${scoreClass}">${record.score}</strong></td>
                <td><span class="${isPass ? 'badge-pass-green' : 'badge-fail-red'}">${isPass ? 'Đạt' : 'Chưa đạt'}</span></td>
                <td style="text-align: right;">
                    <div class="action-cell">
                        <button class="btn-res-view-detail" onclick="viewExamReviewDetail('${record.title}', '${record.subject}', '${record.score}', '${fullDateStr}')">Xem chi tiết</button>
                        <button class="btn-three-dots">⋮</button>
                    </div>
                </td>
            `;
            tableBody.insertBefore(newRow, tableBody.firstChild);
        });
        localStorage.setItem('dhv_saved_results', JSON.stringify(updatedResults));
        updateResultsSummaryStats();
    }
}

function updateResultsSummaryStats() {
    const tableBody = document.getElementById('results-table-body');
    if (!tableBody) return;
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const totalCount = rows.length;

    let scores = [];
    rows.forEach(row => {
        const scoreTd = row.cells[3];
        if (scoreTd) {
            const num = parseFloat(scoreTd.textContent.trim());
            if (!isNaN(num)) scores.push(num);
        }
    });

    const totalEl = document.getElementById('res-stat-total-count');
    const avgEl = document.getElementById('res-stat-avg-score');
    const maxEl = document.getElementById('res-stat-max-score');

    if (totalEl) totalEl.textContent = totalCount;
    if (scores.length > 0) {
        const sum = scores.reduce((a, b) => a + b, 0);
        const avg = (sum / scores.length).toFixed(2);
        const max = Math.max(...scores).toFixed(2);
        if (avgEl) avgEl.textContent = avg;
        if (maxEl) maxEl.textContent = max;
    }
}

let currentSubjectPage = 1;
const subjectPageSize = 4;

window.renderSubjectCardsWithPagination = function(page = 1) {
    currentSubjectPage = page;
    if (typeof updateStudentSubjectsExamCounts === 'function') {
        updateStudentSubjectsExamCounts();
    }
    const grid = document.getElementById('subject-cards-grid');
    const paginationContainer = document.getElementById('subject-grid-pagination');
    if (!grid) return;

    const input = document.getElementById('dash-subject-search');
    const kw = input ? input.value.toLowerCase().trim() : '';
    const filteredList = studentSubjects.filter(s => s.title.toLowerCase().includes(kw) || s.lecturer.toLowerCase().includes(kw));

    const totalPages = Math.max(1, Math.ceil(filteredList.length / subjectPageSize));
    if (currentSubjectPage > totalPages) currentSubjectPage = totalPages;
    if (currentSubjectPage < 1) currentSubjectPage = 1;

    const startIndex = (currentSubjectPage - 1) * subjectPageSize;
    const pageItems = filteredList.slice(startIndex, startIndex + subjectPageSize);

    grid.innerHTML = '';
    pageItems.forEach(subj => {
        const card = document.createElement('div');
        card.className = 'subject-item-card';
        card.onclick = () => openSubjectDetail(subj.code);
        
        const badgeClass = subj.statusType === 'upcoming' ? 'badge-upcoming' : 'badge-none';

        card.innerHTML = `
            <div class="subject-card-top">
                <div class="subj-icon-box" style="background: ${subj.bgColor}; color: ${subj.iconColor};">
                    ${subj.iconSvg}
                </div>
                <div class="subj-info">
                    <h3 class="subj-title">${subj.title}</h3>
                    <p class="subj-lecturer">${subj.lecturer}</p>
                </div>
                <div class="subj-arrow-right">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

            <div class="subject-card-bottom">
                <div class="subj-meta-quiz">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    <span>${subj.quizzesCount} bài thi</span>
                </div>
                <span class="subj-status-badge ${badgeClass}">${subj.statusBadge}</span>
            </div>
        `;
        grid.appendChild(card);
    });

    // Render dynamic pagination buttons
    if (paginationContainer) {
        let pagHtml = `<button class="page-btn page-arrow" ${currentSubjectPage === 1 ? 'disabled' : ''} onclick="renderSubjectCardsWithPagination(${currentSubjectPage - 1})">&lt;</button>`;
        for (let p = 1; p <= totalPages; p++) {
            pagHtml += `<button class="page-btn ${p === currentSubjectPage ? 'active' : ''}" onclick="renderSubjectCardsWithPagination(${p})">${p}</button>`;
        }
        pagHtml += `<button class="page-btn page-arrow" ${currentSubjectPage === totalPages ? 'disabled' : ''} onclick="renderSubjectCardsWithPagination(${currentSubjectPage + 1})">&gt;</button>`;
        paginationContainer.innerHTML = pagHtml;
    }
}

function renderSubjectCards(list) {
    renderSubjectCardsWithPagination(1);
}

let currentResultsPage = 1;
const resultsPageSize = 2;

window.renderResultsTableWithPagination = function(page = 1) {
    currentResultsPage = page;
    const tableBody = document.getElementById('results-table-body') || document.querySelector('.res-data-table tbody');
    const paginationContainer = document.getElementById('results-table-pagination');
    if (!tableBody) return;

    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const totalPages = Math.max(1, Math.ceil(rows.length / resultsPageSize));
    if (currentResultsPage > totalPages) currentResultsPage = totalPages;
    if (currentResultsPage < 1) currentResultsPage = 1;

    rows.forEach((row, idx) => {
        if (idx >= (currentResultsPage - 1) * resultsPageSize && idx < currentResultsPage * resultsPageSize) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    if (paginationContainer) {
        let pagHtml = `<button class="page-btn page-arrow" ${currentResultsPage === 1 ? 'disabled' : ''} onclick="renderResultsTableWithPagination(${currentResultsPage - 1})">&lt;</button>`;
        for (let p = 1; p <= totalPages; p++) {
            pagHtml += `<button class="page-btn ${p === currentResultsPage ? 'active' : ''}" onclick="renderResultsTableWithPagination(${p})">${p}</button>`;
        }
        pagHtml += `<button class="page-btn page-arrow" ${currentResultsPage === totalPages ? 'disabled' : ''} onclick="renderResultsTableWithPagination(${currentResultsPage + 1})">&gt;</button>`;
        paginationContainer.innerHTML = pagHtml;
    }
}

window.filterSubjectCards = function() {
    renderSubjectCardsWithPagination(1);
};

window.handleContactClick = function() {
    const activeView = localStorage.getItem('dhv_current_view') || 'view-about';
    if (activeView === 'view-about') {
        const contactSection = document.getElementById('about-contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (activeView === 'view-role-selection') {
        const roleFooter = document.querySelector('.role-dark-footer');
        if (roleFooter) {
            roleFooter.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        alert('THÔNG TIN LIÊN HỆ DHV QUIZ:\n🏫 CƠ SỞ 1: 194 Lê Đức Thọ, Phường An Nhơn, TP. HCM\n🏫 CƠ SỞ 2: 736 Nguyễn Trãi, Phường Chợ Lớn, TP. HCM\n🏫 CƠ SỞ 3: 37 Kinh Dương Vương, Phường Phú Lâm, TP. HCM\n🏫 CƠ SỞ 4: Công viên Phần mềm Quang Trung, Phường Trung Mỹ Tây, TP. HCM\n✉️ info@dhv.edu.vn | 📞 (028) 3855 2041');
    }
};

// ĐÓNG/MỞ SIDEBAR — nhớ trạng thái qua localStorage
window.toggleSidebar = function() {
    document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem('dhv_sidebar_collapsed', document.body.classList.contains('sidebar-collapsed') ? '1' : '0');
};

function initAppSession() {
    if (localStorage.getItem('dhv_sidebar_collapsed') === '1') {
        document.body.classList.add('sidebar-collapsed');
    }

    const savedUser = localStorage.getItem('dhv_user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            const studentProfileName = document.getElementById('student-profile-name');
            if (studentProfileName && currentUser.name) {
                studentProfileName.textContent = currentUser.name;
            }
            const lecturerProfileName = document.getElementById('lecturer-profile-name');
            if (lecturerProfileName && currentUser.name) {
                lecturerProfileName.textContent = currentUser.name;
            }
        } catch(e) {}
    } else {
        currentUser = null;
    }

    const savedRole = localStorage.getItem('dhv_selected_role') || 'student';
    selectedRole = savedRole;

    let initialView = 'view-about';
    const hash = window.location.hash.replace('#', '');

    if (hash && document.getElementById(hash)) {
        initialView = hash;
    }

    loadSavedExamResults();
    navigateTo(initialView);
    renderSubjectCardsWithPagination(1);
    renderResultsTableWithPagination(1);
    initRealtimeOpeningTimeInputs();

    document.querySelectorAll('.lec-opt-card-radio').forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
            document.querySelectorAll('.lec-opt-card-radio').forEach(c => c.classList.remove('active'));
        });
    });
}

/* MODAL CHỌN DANH SÁCH LỚP HỌC */
window.openSelectClassesModal = function() {
    const modal = document.getElementById('select-classes-modal');
    if (modal) {
        modal.classList.remove('hidden');
        updateModalClassCountBadge();
    }
};

window.closeSelectClassesModal = function() {
    const modal = document.getElementById('select-classes-modal');
    if (modal) modal.classList.add('hidden');
};

window.filterClassListInModal = function(kw) {
    const query = kw.toLowerCase().trim();
    const items = document.querySelectorAll('#modal-class-list-container .class-checkbox-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
};

window.toggleSelectAllClasses = function(checked) {
    const visibleCheckboxes = document.querySelectorAll('#modal-class-list-container .class-checkbox-item:not([style*="display: none"]) .chk-class-option');
    visibleCheckboxes.forEach(chk => {
        chk.checked = checked;
    });
    updateModalClassCountBadge();
};

window.updateModalClassCountBadge = function() {
    const checkedCount = document.querySelectorAll('.chk-class-option:checked').length;
    const badge = document.getElementById('selected-class-count-badge');
    if (badge) badge.textContent = `Đã chọn: ${checkedCount} lớp`;
};

document.addEventListener('change', function(e) {
    if (e.target && e.target.classList.contains('chk-class-option')) {
        updateModalClassCountBadge();
    }
});

window.confirmSelectedClasses = function() {
    const checkedBoxes = Array.from(document.querySelectorAll('.chk-class-option:checked'));
    const tagInputBox = document.querySelector('.tag-input-box');
    if (tagInputBox) {
        tagInputBox.innerHTML = '';
        if (checkedBoxes.length === 0) {
            tagInputBox.innerHTML = `<span style="color:#94a3b8; font-size:13px; margin-right:8px;">Chưa chọn lớp nào</span><a href="#" class="link-add-class" onclick="openSelectClassesModal(); return false;">+ Chọn lớp</a>`;
        } else {
            checkedBoxes.forEach(chk => {
                const val = chk.value;
                const tagSpan = document.createElement('span');
                tagSpan.className = 'class-pill-tag';
                tagSpan.innerHTML = `${val} <button type="button" class="btn-remove-tag" onclick="removeSelectedClassTag(this, '${val}')">✕</button>`;
                tagInputBox.appendChild(tagSpan);
            });
            const addLink = document.createElement('a');
            addLink.href = '#';
            addLink.className = 'link-add-class';
            addLink.onclick = function() { openSelectClassesModal(); return false; };
            addLink.textContent = '+ Chọn lớp khác';
            tagInputBox.appendChild(addLink);
        }
    }
    closeSelectClassesModal();
};

window.removeSelectedClassTag = function(btn, classVal) {
    const pill = btn.parentElement;
    if (pill) pill.remove();
    const chk = document.querySelector(`.chk-class-option[value="${classVal}"]`);
    if (chk) chk.checked = false;
    updateModalClassCountBadge();
};

window.openDatePicker = function(id) {
    const input = document.getElementById(id);
    if (!input) return;
    try {
        if (typeof input.showPicker === 'function') {
            input.showPicker();
        } else {
            input.focus();
        }
    } catch (e) {
        input.focus();
    }
};

window.initRealtimeOpeningTimeInputs = function() {
    const startInput = document.getElementById('lec-quiz-starttime');
    const endInput = document.getElementById('lec-quiz-endtime');
    if (!startInput && !endInput) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayISO = `${year}-${month}-${day}`;

    if (startInput && !startInput.value) {
        startInput.value = `${todayISO}T08:00`;
    }
    if (endInput && !endInput.value) {
        endInput.value = `${todayISO}T23:59`;
    }
};

window.filterResultsTable = function(kw) {
    const term = kw.toLowerCase().trim();
    const rows = document.querySelectorAll('#results-table-body tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(term)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
};

let registerSelectedRole = 'student';

window.setRegisterRole = function(role) {
    registerSelectedRole = role;
    const btnStudent = document.getElementById('reg-tab-student');
    const btnLecturer = document.getElementById('reg-tab-lecturer');
    const codeLabel = document.getElementById('reg-code-label');
    const codeInput = document.getElementById('reg-user-code');

    if (role === 'lecturer') {
        if (btnLecturer) { btnLecturer.style.background = '#2563eb'; btnLecturer.style.color = '#ffffff'; }
        if (btnStudent) { btnStudent.style.background = 'transparent'; btnStudent.style.color = '#64748b'; }
        if (codeLabel) codeLabel.innerHTML = 'Mã số giảng viên <span style="color: #ef4444;">*</span>';
        if (codeInput) codeInput.placeholder = 'Ví dụ: GV002';
    } else {
        if (btnStudent) { btnStudent.style.background = '#2563eb'; btnStudent.style.color = '#ffffff'; }
        if (btnLecturer) { btnLecturer.style.background = 'transparent'; btnLecturer.style.color = '#64748b'; }
        if (codeLabel) codeLabel.innerHTML = 'Mã số sinh viên (MSSV) <span style="color: #ef4444;">*</span>';
        if (codeInput) codeInput.placeholder = 'Ví dụ: 2305CT0747';
    }
};

window.showRegisterModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    console.log("Opening #register-modal...");
    var modal = document.getElementById('register-modal');
    if (!modal) {
        console.error("#register-modal element not found in DOM");
        alert("Khung đăng ký chưa sẵn sàng, vui lòng làm mới trang (Ctrl + F5).");
        return false;
    }
    
    try {
        if (typeof setRegisterRole === 'function') {
            var currentRole = (typeof selectedRole !== 'undefined' && selectedRole) ? selectedRole : 'student';
            setRegisterRole(currentRole);
        }
    } catch(err) {
        console.warn("setRegisterRole warning:", err);
    }

    modal.classList.remove('hidden');
    modal.style.cssText = "position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background: rgba(15, 23, 42, 0.8) !important; z-index: 99999999 !important; backdrop-filter: blur(6px) !important; display: flex !important; align-items: center !important; justify-content: center !important; padding: 20px !important; visibility: visible !important; opacity: 1 !important; pointer-events: auto !important;";
    return false;
};

window.closeRegisterModal = function() {
    var modal = document.getElementById('register-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.cssText = "display: none !important; visibility: hidden !important;";
    }
};

window.toggleRegPass = function(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
};

window.handleRealRegister = async function() {
    const fullNameInput = document.getElementById('reg-full-name');
    const emailInput = document.getElementById('reg-email');
    const userCodeInput = document.getElementById('reg-user-code');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    const phoneInput = document.getElementById('reg-phone');
    const termsInput = document.getElementById('reg-terms');

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const userCode = userCodeInput ? userCodeInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

    if (!fullName || !email || !userCode || !password) {
        alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Mật khẩu và Nhập lại mật khẩu không khớp. Vui lòng kiểm tra lại!');
        if (confirmPasswordInput) confirmPasswordInput.focus();
        return;
    }

    if (termsInput && !termsInput.checked) {
        alert('Vui lòng tích chọn đồng ý với Điều khoản sử dụng và Chính sách bảo mật.');
        return;
    }

    const btnSubmit = document.getElementById('btn-reg-submit');
    if (btnSubmit) btnSubmit.disabled = true;

    const role = (typeof selectedRole !== 'undefined' && selectedRole) ? selectedRole : 'student';

    try {
        const res = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_code: userCode,
                full_name: fullName,
                email: email,
                password: password,
                role: role
            })
        });

        const result = await res.json();

        if (res.ok && result.success) {
            alert(`🎉 ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG!\n\nHọ tên: ${fullName}\nTên đăng nhập: ${userCode}\n\nTài khoản của bạn đã được tạo thành công!`);
        } else {
            alert(result.message || 'Đã tạo tài khoản thành công!');
        }

        // Fill credentials into main login form for seamless user login
        const loginUserInput = document.getElementById('auth-username');
        const loginPassInput = document.getElementById('auth-password');
        if (loginUserInput) loginUserInput.value = userCode;
        if (loginPassInput) loginPassInput.value = password;

        closeRegisterModal();
    } catch(err) {
        console.warn("Chuyển chế độ đăng ký local:", err);
        alert(`🎉 ĐĂNG KÝ THÀNH CÔNG!\n\n- Họ tên: ${fullName}\n- Tên đăng nhập: ${userCode}\n\nThông tin đã được điền sẵn vào ô Đăng nhập.`);
        
        const loginUserInput = document.getElementById('auth-username');
        const loginPassInput = document.getElementById('auth-password');
        if (loginUserInput) loginUserInput.value = userCode;
        if (loginPassInput) loginPassInput.value = password;

        closeRegisterModal();
    } finally {
        if (btnSubmit) btnSubmit.disabled = false;
    }
};

window.togglePasswordVisibility = function() {
    const pwdInput = document.getElementById('auth-password');
    if (!pwdInput) return;
    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
    } else {
        pwdInput.type = 'password';
    }
};

window.selectRole = function(role) {
    selectedRole = role;
    localStorage.setItem('dhv_selected_role', role);

    const usernameInput = document.getElementById('auth-username');
    const welcomeSubtext = document.querySelector('.welcome-subtext');

    if (usernameInput) {
        usernameInput.placeholder = role === 'lecturer' ? 'Mã giảng viên / Email' : 'Mã số sinh viên / Email';
        usernameInput.value = '';
    }

    if (welcomeSubtext) {
        welcomeSubtext.textContent = role === 'lecturer' ? 'Đăng nhập dành cho Giảng viên' : 'Đăng nhập dành cho Sinh viên';
    }

    navigateTo('view-auth');
};

// Đường dẫn gốc tới API của server Node.js (tự động chuyển tới http://localhost:3000/api nếu mở qua file:// hoặc Live Server)
const getApiBaseUrl = () => {
    if (typeof window !== 'undefined' && window.location) {
        const { protocol, host } = window.location;
        if (protocol === 'file:' || (host !== 'localhost:3000' && host !== '127.0.0.1:3000')) {
            return 'http://localhost:3000/api';
        }
    }
    return '/api';
};
const API_BASE_URL = getApiBaseUrl();

// ĐĂNG NHẬP THẬT — gọi API POST /api/login (server.js), kiểm tra với bảng users trong MySQL
window.handleRealLogin = async function() {
    const usernameInput = document.getElementById('auth-username');
    const passwordInput = document.getElementById('auth-password');
    const userCode = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!userCode || !password) {
        alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
        return;
    }

    const submitBtn = document.querySelector('.auth-form .btn-submit-blue');
    if (submitBtn) submitBtn.disabled = true;

    try {
        const targetUrl = `${API_BASE_URL}/login`;
        const res = await fetch(targetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_code: userCode,
                password: password,
                role: selectedRole || 'student'
            })
        });
        const result = await res.json();

        if (!res.ok || !result.success) {
            alert(result.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản/mật khẩu.');
            return;
        }

        const user = result.data.user;
        currentUser = {
            id: user.id,
            userCode: user.user_code,
            name: user.full_name,
            email: user.email,
            role: user.role,
            isAuthenticated: true
        };
        localStorage.setItem('dhv_user', JSON.stringify(currentUser));

        const studentProfileName = document.getElementById('student-profile-name');
        if (studentProfileName) studentProfileName.textContent = currentUser.name;
        const lecturerProfileName = document.getElementById('lecturer-profile-name');
        if (lecturerProfileName) lecturerProfileName.textContent = currentUser.name;

        navigateTo(currentUser.role === 'lecturer' ? 'view-lecturer' : 'view-student');
    } catch (err) {
        console.error("Lỗi kết nối API:", err);
        const useDemo = confirm('Không thể kết nối tới server Node.js (http://localhost:3000).\n\n- Vui lòng kiểm tra server backend đã chạy "npm start" chưa.\n- Nhấn "OK" nếu bạn muốn ĐĂNG NHẬP CHẾ ĐỘ DEMO (Không cần kết nối CSDL).\n- Nhấn "Cancel" để thử lại.');
        if (useDemo) {
            mockLogin('LocalFallback');
        }
    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
};

window.mockLogin = function(methodName) {
    const usernameInput = document.getElementById('auth-username');
    let defaultName = selectedRole === 'lecturer' ? 'ThS. Nguyễn Minh Tuấn' : 'Nguyễn Văn A';
    let enteredName = usernameInput && usernameInput.value.trim() !== '' ? usernameInput.value.trim() : defaultName;
    
    if (methodName === 'Google') {
        enteredName = selectedRole === 'lecturer' ? 'ThS. Nguyễn Minh Tuấn (Google)' : 'Nguyễn Văn A (Google)';
    }

    currentUser = {
        name: enteredName,
        isAuthenticated: true,
        role: selectedRole || 'student'
    };

    localStorage.setItem('dhv_user', JSON.stringify(currentUser));

    const studentProfileName = document.getElementById('student-profile-name');
    if (studentProfileName) studentProfileName.textContent = currentUser.name;

    const lecturerProfileName = document.getElementById('lecturer-profile-name');
    if (lecturerProfileName) lecturerProfileName.textContent = currentUser.name;

    if (selectedRole === 'lecturer') {
        navigateTo('view-lecturer');
    } else {
        navigateTo('view-student');
    }
};

window.logout = function() {
    currentUser = null;
    clearInterval(engineTimerInterval);

    fetch(`${API_BASE_URL}/logout`, { method: 'POST' }).catch(() => {});

    localStorage.removeItem('dhv_user');
    localStorage.removeItem('dhv_current_view');
    localStorage.removeItem('dhv_selected_role');
    
    try {
        history.replaceState(null, '', window.location.pathname);
    } catch(e) {}

    navigateTo('view-about');
};

// ====================== DỮ LIỆU & XEM CHI TIẾT CÂU HỎI BÀI THI ======================
const sampleReviewQuestionsData = [
    {
        id: 1,
        title: "Trong mô hình quan hệ, khóa chính (Primary Key) của một bảng có đặc điểm nào sau đây?",
        options: [
            "A. Có thể chứa giá trị NULL và duy nhất",
            "B. Không thể chứa giá trị NULL và phải duy nhất xác định mỗi hàng",
            "C. Có thể có nhiều hơn một khóa chính trong một bảng",
            "D. Chỉ được chứa dữ liệu kiểu số nguyên (Integer)"
        ],
        userAnswer: 1,
        correctAnswer: 1,
        explanation: "Khóa chính (Primary Key) bắt buộc phải duy nhất và KHÔNG ĐƯỢC CHỨA GIÁ TRỊ NULL để đảm bảo tính toàn vẹn thực thể."
    },
    {
        id: 2,
        title: "Lệnh SQL nào dùng để truy vấn dữ liệu từ một hoặc nhiều bảng?",
        options: [
            "A. INSERT INTO",
            "B. UPDATE",
            "C. SELECT",
            "D. DELETE FROM"
        ],
        userAnswer: 2,
        correctAnswer: 2,
        explanation: "Cú pháp SELECT được dùng để lấy dữ liệu từ cơ sở dữ liệu."
    },
    {
        id: 3,
        title: "Thuật ngữ 'RDBMS' là viết tắt của từ nào trong CSDL?",
        options: [
            "A. Relational Database Management System",
            "B. Rapid Database Main Server",
            "C. Record Data Management Software",
            "D. Realtime Data Business System"
        ],
        userAnswer: 0,
        correctAnswer: 0,
        explanation: "RDBMS là viết tắt của Relational Database Management System (Hệ quản trị cơ sở dữ liệu quan hệ)."
    },
    {
        id: 4,
        title: "Đâu là mệnh đề dùng để lọc dữ liệu theo điều kiện nhóm trong SQL?",
        options: [
            "A. WHERE",
            "B. HAVING",
            "C. GROUP BY",
            "D. ORDER BY"
        ],
        userAnswer: 0, // Wrong! User answered WHERE
        correctAnswer: 1, // Correct is HAVING
        explanation: "Mệnh đề HAVING được dùng để lọc điều kiện áp dụng lên các nhóm dữ liệu được gom bởi GROUP BY (trong khi WHERE lọc điều kiện trước khi nhóm)."
    },
    {
        id: 5,
        title: "Mối quan hệ giữa bảng 'SinhVien' và 'LopHoc' thường thuộc dạng nào?",
        options: [
            "A. 1 - 1 (Một - Một)",
            "B. N - 1 (Nhiều - Một)",
            "C. N - N (Nhiều - Nhiều)",
            "D. Không có mối quan hệ"
        ],
        userAnswer: 1,
        correctAnswer: 1,
        explanation: "Nhiều sinh viên thuộc về 1 Lớp học (Quan hệ Nhiều - Một)."
    },
    {
        id: 6,
        title: "Phép nối INNER JOIN trong SQL trả về kết quả nào?",
        options: [
            "A. Tất cả bản ghi ở bảng bên trái",
            "B. Tất cả bản ghi ở bảng bên phải",
            "C. Các bản ghi có giá trị khớp ở CẢ HAI bảng",
            "D. Tất cả bản ghi của cả hai bảng"
        ],
        userAnswer: 2,
        correctAnswer: 2,
        explanation: "INNER JOIN chọn tất cả các dòng từ cả hai bảng miễn là có sự khớp nhau giữa các cột chung."
    },
    {
        id: 7,
        title: "Ràng buộc FOREIGN KEY (Khóa ngoại) dùng để làm gì?",
        options: [
            "A. Đảm bảo tính toàn vẹn tham chiếu giữa hai bảng",
            "B. Tăng tốc độ tìm kiếm cơ sở dữ liệu",
            "C. Tự động mã hóa mật khẩu",
            "D. Tạo bản sao lưu tự động"
        ],
        userAnswer: 0,
        correctAnswer: 0,
        explanation: "Khóa ngoại liên kết bảng con tới khóa chính của bảng cha nhằm duy trì tính toàn vẹn tham chiếu."
    },
    {
        id: 8,
        title: "Hàm nhóm nào dùng để tính trung bình cộng của một cột kiểu số trong SQL?",
        options: [
            "A. SUM()",
            "B. COUNT()",
            "C. AVG()",
            "D. MAX()"
        ],
        userAnswer: 2,
        correctAnswer: 2,
        explanation: "Hàm AVG() (Average) tính giá trị trung bình của các dòng trong cột."
    },
    {
        id: 9,
        title: "Dạng chuẩn 1NF (First Normal Form) yêu cầu thuộc tính trong bảng phải như thế nào?",
        options: [
            "A. Mỗi thuộc tính phải là nguyên tố (Atomic - không phân chia được nữa)",
            "B. Phụ thuộc hàm đầy đủ vào khóa chính",
            "C. Không chứa phụ thuộc bắc cầu",
            "D. Có ít nhất 5 cột"
        ],
        userAnswer: 0,
        correctAnswer: 0,
        explanation: "Dạng chuẩn 1NF đòi hỏi mỗi ô dữ liệu chỉ chứa một giá trị đơn (Atomic value), không chứa danh sách hay mảng."
    },
    {
        id: 10,
        title: "Lệnh SQL nào được sử dụng để xóa cấu trúc của một bảng khỏi CSDL?",
        options: [
            "A. DELETE TABLE",
            "B. DROP TABLE",
            "C. TRUNCATE TABLE",
            "D. REMOVE TABLE"
        ],
        userAnswer: 1,
        correctAnswer: 1,
        explanation: "DROP TABLE sẽ xóa hoàn toàn bảng cùng toàn bộ dữ liệu và định nghĩa cấu trúc của bảng đó khỏi CSDL."
    }
];

let currentReviewFilter = 'all';
let reviewCurrentPage = 1;
const reviewQuestionsPerPage = 2;

window.viewExamReviewDetail = function(examTitle, subjectName, scoreStr, dateStr) {
    const card = document.getElementById('exam-review-detail-card');
    const titleEl = document.getElementById('rev-exam-title');
    const subjEl = document.getElementById('rev-exam-subject');
    const dateEl = document.getElementById('rev-exam-date');
    const scoreEl = document.getElementById('rev-exam-score');

    if (!card) return;

    if (titleEl) titleEl.textContent = `Chi tiết bài làm: ${examTitle}`;
    if (subjEl) subjEl.textContent = `Môn học: ${subjectName}`;
    if (dateEl) dateEl.textContent = `Ngày thi: ${dateStr}`;
    if (scoreEl) scoreEl.textContent = `${scoreStr}/10 điểm`;

    card.classList.remove('hidden');

    reviewCurrentPage = 1;
    currentReviewFilter = 'all';

    renderReviewQuestions('all');

    setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
};

window.closeExamReviewDetail = function() {
    const card = document.getElementById('exam-review-detail-card');
    if (card) card.classList.add('hidden');
};

window.filterReviewQuestions = function(type, btnEl) {
    currentReviewFilter = type;
    reviewCurrentPage = 1;
    
    const tabs = document.querySelectorAll('.rev-tab');
    tabs.forEach(t => t.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    renderReviewQuestions(type);
};

window.changeReviewPage = function(delta) {
    reviewCurrentPage += delta;
    renderReviewQuestions(currentReviewFilter);
};

window.jumpToReviewPage = function(pageNum) {
    reviewCurrentPage = pageNum;
    renderReviewQuestions(currentReviewFilter);
};

window.jumpToQuestionIndex = function(questionId) {
    const filtered = getFilteredQuestions(currentReviewFilter);
    const idx = filtered.findIndex(q => q.id === questionId);
    if (idx !== -1) {
        reviewCurrentPage = Math.floor(idx / reviewQuestionsPerPage) + 1;
        renderReviewQuestions(currentReviewFilter);
    }
};

function getFilteredQuestions(filterType) {
    return sampleReviewQuestionsData.filter(q => {
        const isCorrect = q.userAnswer === q.correctAnswer;
        if (filterType === 'correct') return isCorrect;
        if (filterType === 'wrong') return !isCorrect;
        return true;
    });
}

function renderReviewQuestions(filterType) {
    const container = document.getElementById('rev-questions-list');
    const pillsGrid = document.getElementById('rev-jump-pills-grid');
    const pageNumsContainer = document.getElementById('rev-page-numbers-list');
    const prevBtn = document.getElementById('btn-rev-prev-page');
    const nextBtn = document.getElementById('btn-rev-next-page');

    if (!container) return;

    const filtered = getFilteredQuestions(filterType);
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / reviewQuestionsPerPage) || 1;

    if (reviewCurrentPage < 1) reviewCurrentPage = 1;
    if (reviewCurrentPage > totalPages) reviewCurrentPage = totalPages;

    // Render Quick Jump Pills
    if (pillsGrid) {
        pillsGrid.innerHTML = '';
        sampleReviewQuestionsData.forEach(q => {
            const isCorrect = q.userAnswer === q.correctAnswer;
            const pill = document.createElement('button');
            
            const startIndex = (reviewCurrentPage - 1) * reviewQuestionsPerPage;
            const endIndex = startIndex + reviewQuestionsPerPage;
            const curPageQuestions = filtered.slice(startIndex, endIndex);
            const isSelected = curPageQuestions.some(pq => pq.id === q.id);

            pill.className = `rev-q-pill ${isCorrect ? 'pill-correct' : 'pill-wrong'} ${isSelected ? 'pill-active' : ''}`;
            pill.textContent = q.id;
            pill.title = `Câu ${q.id} (${isCorrect ? 'Đúng' : 'Sai'})`;
            pill.onclick = () => jumpToQuestionIndex(q.id);
            pillsGrid.appendChild(pill);
        });
    }

    // Slice 2 questions per page
    const startIndex = (reviewCurrentPage - 1) * reviewQuestionsPerPage;
    const pageQuestions = filtered.slice(startIndex, startIndex + reviewQuestionsPerPage);

    container.innerHTML = '';

    if (pageQuestions.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 30px; color:#64748b;">Không có câu hỏi nào trong mục này.</div>`;
    } else {
        pageQuestions.forEach(q => {
            const isCorrect = q.userAnswer === q.correctAnswer;
            
            const qBox = document.createElement('div');
            qBox.className = `rev-q-box ${isCorrect ? 'q-is-correct' : 'q-is-wrong'}`;

            let optsHtml = '';
            q.options.forEach((optText, oIdx) => {
                let optClass = 'rev-opt-card';
                let tagHtml = '';

                if (oIdx === q.userAnswer && isCorrect) {
                    optClass += ' opt-user-correct';
                    tagHtml = `<span class="opt-status-tag tag-green">✓ Lựa chọn của bạn (Đúng)</span>`;
                } else if (oIdx === q.userAnswer && !isCorrect) {
                    optClass += ' opt-user-wrong';
                    tagHtml = `<span class="opt-status-tag tag-red">✗ Lựa chọn của bạn (Sai)</span>`;
                } else if (oIdx === q.correctAnswer && !isCorrect) {
                    optClass += ' opt-actual-correct';
                    tagHtml = `<span class="opt-status-tag tag-blue">★ Đáp án đúng</span>`;
                }

                optsHtml += `
                    <div class="${optClass}">
                        <span>${optText}</span>
                        ${tagHtml}
                    </div>
                `;
            });

            qBox.innerHTML = `
                <div class="rev-q-header">
                    <div class="rev-q-title"><strong>Câu ${q.id}:</strong> ${q.title}</div>
                    ${isCorrect ? '<span class="rev-badge-correct">🟢 Đúng (+1.0đ)</span>' : '<span class="rev-badge-wrong">🔴 Sai (0đ)</span>'}
                </div>

                <div class="rev-opts-grid">
                    ${optsHtml}
                </div>

                <div class="rev-explanation-box">
                    <strong>💡 Lời giải chi tiết:</strong>
                    <span>${q.explanation}</span>
                </div>
            `;

            container.appendChild(qBox);
        });
    }

    // Render Pagination Footer Controls
    if (prevBtn) prevBtn.disabled = (reviewCurrentPage <= 1);
    if (nextBtn) nextBtn.disabled = (reviewCurrentPage >= totalPages);

    if (pageNumsContainer) {
        pageNumsContainer.innerHTML = '';
        for (let p = 1; p <= totalPages; p++) {
            const btn = document.createElement('button');
            btn.className = `rev-page-num-btn ${p === reviewCurrentPage ? 'active' : ''}`;
            btn.textContent = p;
            btn.onclick = () => jumpToReviewPage(p);
            pageNumsContainer.appendChild(btn);
        }
    }
}

// ====================== PHÂN HỆ GIẢNG VIÊN (LECTURER) ======================

function generate1200QBankItems() {
    const chapters = [
        { name: 'Chương 1:\nTổng quan CSDL', mcqTopics: ['Mô hình quan hệ & Khóa chính', 'Kiến trúc CSDL 3 cấp', 'Hệ quản trị CSDL RDBMS', 'Định nghĩa dữ liệu DDL'], essayTopics: ['Phân tích kiến trúc CSDL 3 mức độc lập', 'Đánh giá ưu nhược điểm của CSDL quan hệ', 'Trình bày vai trò của Hệ quản trị CSDL'] },
        { name: 'Chương 2:\nMô hình dữ liệu', mcqTopics: ['Sơ đồ ERD & Thực thể', 'Ràng buộc khóa ngoại Foreign Key', 'Dạng chuẩn 1NF, 2NF, 3NF', 'Chuẩn hóa CSDL'], essayTopics: ['Thiết kế sơ đồ ERD cho hệ thống Quản lý Đào tạo', 'Phân tích quá trình chuẩn hóa CSDL từ 1NF đến 3NF', 'Giải thích các ràng buộc toàn vẹn thực thể và tham chiếu'] },
        { name: 'Chương 3:\nSQL cơ bản', mcqTopics: ['Cú pháp SELECT và WHERE', 'Mệnh đề GROUP BY & HAVING', 'Phép nối INNER JOIN & LEFT JOIN', 'Hàm gộp COUNT, SUM, AVG'], essayTopics: ['Viết câu lệnh SQL truy vấn phức tạp kết hợp GROUP BY và HAVING', 'Viết Stored Procedure kiểm tra điều kiện đăng ký học phần', 'Tối ưu hóa chỉ mục Index cho câu lệnh SQL SELECT'] }
    ];

    const subjects = ['IT003', 'IT002', 'IT005'];
    const diffs = ['easy', 'medium', 'hard'];

    const mcqStems = [
        "Trong mô hình dữ liệu, phát biểu nào sau đây miêu tả chính xác nhất về",
        "Để đảm bảo tính nhất quán dữ liệu, mệnh đề nào được ưu tiên khi thực hiện",
        "Trường hợp nào sau đây bắt buộc nhà phát triển phải cấu hình",
        "Ưu điểm nổi bật của việc thiết kế kiến trúc chuẩn khi áp dụng",
        "Trong các câu lệnh SQL dưới đây, cú pháp nào đúng nhất cho",
        "Khái niệm nào phản ánh đúng bản chất kỹ thuật của",
        "Khi thực hiện tối ưu hóa hiệu năng hệ thống, vai trò chính của",
        "Tính chất toàn vẹn dữ liệu được đảm bảo thông qua cơ chế của",
        "Lựa chọn kiểu dữ liệu phù hợp nhất cho cột thuộc tính liên quan đến",
        "Thao tác nào sau đây sẽ tự động kích hoạt khi có sự thay đổi trên"
    ];

    const essayStems = [
        "Hãy trình bày chi tiết nguyên lý hoạt động và viết ví dụ minh họa về",
        "Phân tích ưu điểm, nhược điểm và phạm vi ứng dụng thực tế của",
        "Viết đoạn mã SQL / thuật toán xử lý hoàn chỉnh cho bài toán yêu cầu",
        "So sánh điểm giống và khác nhau giữa hai khái niệm kỹ thuật trọng tâm trong",
        "Đề xuất giải pháp kiến trúc tối ưu hóa hiệu năng cho hệ thống sử dụng",
        "Nêu các bước thực hiện chi tiết và giải thích lý do kỹ thuật khi áp dụng",
        "Phân tích cơ chế xử lý đồng thời (Concurrency Control) và khóa dữ liệu khi",
        "Xây dựng kịch bản kiểm thử (Test Case) toàn diện đánh giá tính ổn định của"
    ];

    const items = [];
    let idCounter = 1;

    chapters.forEach(chapObj => {
        // 200 Trắc nghiệm per chapter
        for (let i = 1; i <= 200; i++) {
            const stem = mcqStems[(i - 1) % mcqStems.length];
            const topic = chapObj.mcqTopics[(i - 1) % chapObj.mcqTopics.length];
            const subj = subjects[(i - 1) % subjects.length];
            const diff = diffs[(i - 1) % diffs.length];

            items.push({
                id: idCounter++,
                subjectCode: subj,
                text: `${stem} ${topic.toLowerCase()}?`,
                chap: chapObj.name,
                type: 'Trắc nghiệm',
                diff: diff,
                date: `${String(1 + (i % 28)).padStart(2, '0')}/05/2026\n${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`
            });
        }

        // 200 Tự luận per chapter
        for (let i = 1; i <= 200; i++) {
            const stem = essayStems[(i - 1) % essayStems.length];
            const topic = chapObj.essayTopics[(i - 1) % chapObj.essayTopics.length];
            const subj = subjects[(i - 1) % subjects.length];
            const diff = diffs[(i - 1) % diffs.length];

            items.push({
                id: idCounter++,
                subjectCode: subj,
                text: `${stem} ${topic.toLowerCase()}.`,
                chap: chapObj.name,
                type: 'Tự luận',
                diff: diff,
                date: `${String(1 + (i % 28)).padStart(2, '0')}/05/2026\n${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`
            });
        }
    });

    return items;
}

const mockMainQBankItems = generate1200QBankItems();

window.hideAllLecturerSubviews = function() {
    const subviews = [
        'lec-create-exam-subview',
        'lec-exam-list-subview',
        'lec-qbank-subview',
        'lec-classes-subview',
        'lec-class-detail-subview',
        'lec-anti-cheat-subview'
    ];
    subviews.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
            el.style.setProperty('display', 'none', 'important');
        }
    });

    const menus = [
        'lec-menu-list',
        'lec-menu-create',
        'lec-menu-qbank',
        'lec-menu-classes',
        'lec-menu-anti-cheat',
        'sb-group-exams',
        'sb-header-exams'
    ];
    menus.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
};

window.showLecturerQBankSubView = function(subType) {
    try {
        const lecView = document.getElementById('view-lecturer');
        if (lecView && lecView.classList.contains('hidden')) {
            lecView.classList.remove('hidden');
            lecView.style.setProperty('display', 'block', 'important');
        }

        hideAllLecturerSubviews();

        const qbankSubview = document.getElementById('lec-qbank-subview');
        if (qbankSubview) {
            qbankSubview.classList.remove('hidden');
            qbankSubview.style.setProperty('display', 'block', 'important');
        }

        const mQBank = document.getElementById('lec-menu-qbank');
        if (mQBank) mQBank.classList.add('active');

        renderMainQBankTable(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(err) {
        console.error("Error showing QBank subview:", err);
    }
};

let currentMainQBankPage = 1;
const mainQBankPageSize = 10;

window.renderMainQBankTable = function(page = currentMainQBankPage) {
    currentMainQBankPage = page;
    const tbody = document.getElementById('main-qbank-tbody');
    const totalCountSpan = document.getElementById('main-qbank-total-count');
    const paginationContainer = document.getElementById('main-qbank-pagination');
    if (!tbody) return;

    const searchVal = (document.getElementById('lec-main-qbank-search')?.value || '').toLowerCase().trim();
    const subjVal = document.getElementById('main-qbank-subj-filter')?.value || '';
    const chapVal = document.getElementById('main-qbank-chap-filter')?.value || '';
    const typeVal = document.getElementById('main-qbank-type-filter')?.value || '';
    const diffVal = document.getElementById('main-qbank-diff-filter')?.value || '';

    const filtered = mockMainQBankItems.filter(q => {
        const matchesSearch = !searchVal || q.text.toLowerCase().includes(searchVal) || q.chap.toLowerCase().includes(searchVal);
        const matchesSubj = !subjVal || (q.subjectCode && subjVal.includes(q.subjectCode));
        const matchesChap = !chapVal || q.chap.toLowerCase().includes(chapVal.toLowerCase());
        const matchesType = !typeVal || typeVal === 'Tất cả loại' || q.type === typeVal;
        const matchesDiff = !diffVal || diffVal === 'Tất cả độ khó' || q.diff === diffVal;

        return matchesSearch && matchesSubj && matchesChap && matchesType && matchesDiff;
    });

    if (totalCountSpan) {
        totalCountSpan.textContent = `Tổng số: ${filtered.length} câu hỏi`;
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 30px; color: #94a3b8; font-weight: 500;">Không tìm thấy câu hỏi nào phù hợp với bộ lọc.</td></tr>`;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(filtered.length / mainQBankPageSize) || 1;
    if (currentMainQBankPage > totalPages) currentMainQBankPage = totalPages;
    if (currentMainQBankPage < 1) currentMainQBankPage = 1;

    const startIdx = (currentMainQBankPage - 1) * mainQBankPageSize;
    const endIdx = startIdx + mainQBankPageSize;
    const pageItems = filtered.slice(startIdx, endIdx);

    let html = '';
    pageItems.forEach((q, idx) => {
        const globalIndex = startIdx + idx + 1;
        const diffBadge = q.diff === 'easy' ? '<span class="tag-diff easy">Dễ</span>' :
                          q.diff === 'medium' ? '<span class="tag-diff medium">Trung bình</span>' :
                          '<span class="tag-diff hard">Khó</span>';

        const typeBadge = q.type === 'Tự luận' ? '<span class="tbl-type-tag" style="background: #fef3c7; color: #d97706; border: 1px solid #fde68a;">Tự luận</span>' :
                          '<span class="tbl-type-tag">Trắc nghiệm</span>';

        html += `
            <tr>
                <td><input type="checkbox"></td>
                <td style="color: #64748b; font-weight: 600;">${globalIndex}</td>
                <td><strong class="tbl-qtext">${q.text}</strong></td>
                <td><span class="tbl-sub-tag" style="white-space: pre-line;">${q.chap}</span></td>
                <td>${typeBadge}</td>
                <td>${diffBadge}</td>
                <td><span style="font-size: 12px; color: #64748b; white-space: pre-line;">${q.date}</span></td>
                <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 6px;">
                        <button type="button" class="btn-action-icon" title="Chỉnh sửa" onclick="openEditQuestionModal(${q.id})">✏️</button>
                        <button type="button" class="btn-action-icon" title="Sao chép" onclick="alert('Sao chép câu #${q.id}')">📋</button>
                        <button type="button" class="btn-action-icon" title="Khác" onclick="alert('Tùy chọn khác')">⋮</button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;

    // Render pagination controls dynamically below the table
    if (paginationContainer) {
        let pagHtml = `
            <div style="display: flex; align-items: center; gap: 6px;">
                <button type="button" class="rev-page-num-btn" ${currentMainQBankPage === 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} onclick="renderMainQBankTable(${currentMainQBankPage - 1})">&lt;</button>
        `;

        let startPage = Math.max(1, currentMainQBankPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        if (startPage > 1) {
            pagHtml += `<button type="button" class="rev-page-num-btn" onclick="renderMainQBankTable(1)">1</button>`;
            if (startPage > 2) pagHtml += `<span style="color:#94a3b8; font-size:12px; align-self:center;">...</span>`;
        }

        for (let p = startPage; p <= endPage; p++) {
            pagHtml += `<button type="button" class="rev-page-num-btn ${p === currentMainQBankPage ? 'active' : ''}" onclick="renderMainQBankTable(${p})">${p}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pagHtml += `<span style="color:#94a3b8; font-size:12px; align-self:center;">...</span>`;
            pagHtml += `<button type="button" class="rev-page-num-btn" onclick="renderMainQBankTable(${totalPages})">${totalPages}</button>`;
        }

        pagHtml += `
                <button type="button" class="rev-page-num-btn" ${currentMainQBankPage === totalPages ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} onclick="renderMainQBankTable(${currentMainQBankPage + 1})">&gt;</button>
            </div>

            <div class="items-per-page" style="display: flex; align-items: center; gap: 4px; font-size: 13px; color: #64748b;">
                <span>Hiển thị</span>
                <strong style="color: #2563eb; padding: 0 4px;">10</strong>
                <span>/ trang (Trang ${currentMainQBankPage}/${totalPages})</span>
            </div>
        `;
        paginationContainer.innerHTML = pagHtml;
    }
};

window.openEditQuestionModal = function(qId) {
    const q = mockMainQBankItems.find(item => item.id === qId);
    if (!q) return;

    const idInput = document.getElementById('edit-q-id');
    const subjSelect = document.getElementById('edit-q-subj');
    const chapSelect = document.getElementById('edit-q-chap');
    const typeSelect = document.getElementById('edit-q-type');
    const diffSelect = document.getElementById('edit-q-diff');
    const textInput = document.getElementById('edit-q-text');

    if (idInput) idInput.value = q.id;
    if (subjSelect) subjSelect.value = q.subjectCode || 'IT003';
    if (chapSelect) chapSelect.value = q.chap;
    if (typeSelect) typeSelect.value = q.type;
    if (diffSelect) diffSelect.value = q.diff;
    if (textInput) textInput.value = q.text;

    const modal = document.getElementById('edit-question-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.setProperty('display', 'flex', 'important');
    }
};

window.closeEditQuestionModal = function() {
    const modal = document.getElementById('edit-question-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
    }
};

window.saveEditedQuestion = function() {
    const qIdInput = document.getElementById('edit-q-id');
    if (!qIdInput) return;

    const qId = parseInt(qIdInput.value, 10);
    const q = mockMainQBankItems.find(item => item.id === qId);
    if (!q) return;

    const newSubj = document.getElementById('edit-q-subj')?.value || 'IT003';
    const newChap = document.getElementById('edit-q-chap')?.value || q.chap;
    const newType = document.getElementById('edit-q-type')?.value || q.type;
    const newDiff = document.getElementById('edit-q-diff')?.value || q.diff;
    const newText = (document.getElementById('edit-q-text')?.value || '').trim();

    if (!newText) {
        alert('Vui lòng nhập nội dung câu hỏi!');
        return;
    }

    q.subjectCode = newSubj;
    q.chap = newChap;
    q.type = newType;
    q.diff = newDiff;
    q.text = newText;

    closeEditQuestionModal();
    renderMainQBankTable();

    alert(`🎉 Cập nhật thành công câu hỏi #${qId}!`);
};

window.triggerFolderUpload = function() {
    const input = document.getElementById('lecturer-folder-upload-input');
    if (input) input.click();
};

window.handleFolderSelected = function(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let folderName = 'Thu_Muc_Bai_Tap_Moi';
    if (files[0].webkitRelativePath) {
        folderName = files[0].webkitRelativePath.split('/')[0] || folderName;
    } else if (files[0].name) {
        folderName = files[0].name;
    }

    addUploadedFolderItem(folderName, files.length);
};

window.handleFolderDragOver = function(event) {
    event.preventDefault();
    const zone = document.getElementById('folder-drop-zone');
    if (zone) zone.classList.add('drag-over');
};

window.handleFolderDragLeave = function(event) {
    event.preventDefault();
    const zone = document.getElementById('folder-drop-zone');
    if (zone) zone.classList.remove('drag-over');
};

window.handleFolderDrop = function(event) {
    event.preventDefault();
    const zone = document.getElementById('folder-drop-zone');
    if (zone) zone.classList.remove('drag-over');

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
        const folderName = files[0].name || 'Thu_muc_vua_keo_tha';
        addUploadedFolderItem(folderName, files.length);
    }
};

window.addUploadedFolderItem = function(name, fileCount) {
    const list = document.getElementById('uploaded-folders-list');
    const countBadge = document.getElementById('uploaded-folder-count');
    if (!list) return;

    const newItem = document.createElement('div');
    newItem.className = 'uploaded-folder-item';
    newItem.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s ease;';

    newItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
            <span style="font-size: 18px;">📁</span>
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <strong style="font-size: 12.5px; color: #1e293b; display: block; overflow: hidden; text-overflow: ellipsis;">${name}</strong>
                <span style="font-size: 11px; color: #64748b;">${fileCount || 100} câu • Mới tải lên</span>
            </div>
        </div>
        <button type="button" onclick="importFolderQuestions('${name}')" title="Nhập vào ngân hàng" style="border: none; background: #dcfce7; color: #15803d; font-weight: 700; font-size: 11px; padding: 4px 8px; border-radius: 6px; cursor: pointer;">
            Nhập câu hỏi
        </button>
    `;

    list.insertBefore(newItem, list.firstChild);

    if (countBadge) {
        countBadge.textContent = list.children.length;
    }

    alert(`🎉 Tải lên thư mục "${name}" thành công! Tất cả file bài tập đã sẵn sàng.`);
};

window.importFolderQuestions = function(folderName) {
    alert(`⚡ Đang tự động xử lý và nhập dữ liệu câu hỏi từ thư mục "${folderName}" vào Ngân hàng câu hỏi thành công!`);
    renderMainQBankTable();
};

// AI FOLDER & FILE SELECTION LOGIC
let aiSourceFoldersData = {
    'Thu_muc_Chuong1_CSDL': [
        { name: 'Chương 1_TongQuanCSDL.pdf', icon: '📄', type: 'PDF' },
        { name: 'Chương 2_MoHinhDuLieu.pdf', icon: '📄', type: 'PDF' },
        { name: 'SQL_TruyVanNangCao.docx', icon: '📝', type: 'Word' },
        { name: 'Slide_GiangDay_Chuong3.pptx', icon: '📊', type: 'PowerPoint' }
    ],
    'De_Thi_Giua_Ky_Web': [
        { name: 'De_Thi_Giua_Ky_Web2024.pdf', icon: '📄', type: 'PDF' },
        { name: 'Ngan_Hang_Cau_Hoi_On_Tap.docx', icon: '📝', type: 'Word' }
    ],
    'Bai_Tap_Tu_Luan_SQL': [
        { name: 'Bai_Tap_Tu_Luan_SQL_Chuyen_Sau.docx', icon: '📝', type: 'Word' }
    ]
};

let currentSelectedAIFiles = [...aiSourceFoldersData['Thu_muc_Chuong1_CSDL']];

window.renderAIFilesList = function() {
    const listContainer = document.getElementById('ai-selected-files-list');
    if (!listContainer) return;

    if (currentSelectedAIFiles.length === 0) {
        listContainer.innerHTML = `<div style="font-size: 12.5px; color: #94a3b8; padding: 6px 0; font-style: italic;">Chưa có file tài liệu nào trong thư mục được chọn. Vui lòng bấm chọn Thư mục từ máy tính!</div>`;
        return;
    }

    let html = '';
    currentSelectedAIFiles.forEach((file, idx) => {
        html += `
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 12.5px; font-weight: 600; color: #334155; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <span>${file.icon}</span>
                <span>${file.name}</span>
                <button type="button" onclick="removeAIFile(${idx})" title="Xóa file khỏi danh sách phân tích" style="border: none; background: none; color: #94a3b8; font-size: 14px; cursor: pointer; padding: 0 2px; border-radius: 4px; line-height: 1;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#94a3b8'">✕</button>
            </div>
        `;
    });
    listContainer.innerHTML = html;
};

window.switchAIFolderSource = function(folderKey) {
    if (aiSourceFoldersData[folderKey]) {
        currentSelectedAIFiles = [...aiSourceFoldersData[folderKey]];
    } else {
        currentSelectedAIFiles = [];
    }
    renderAIFilesList();
};

window.removeAIFile = function(index) {
    if (index >= 0 && index < currentSelectedAIFiles.length) {
        currentSelectedAIFiles.splice(index, 1);
        renderAIFilesList();
    }
};

window.triggerAIDocumentFolderUpload = function() {
    const input = document.getElementById('ai-folder-upload-input');
    if (input) input.click();
};

window.triggerAIDocumentFileUpload = function() {
    const input = document.getElementById('ai-file-upload-input');
    if (input) input.click();
};

window.handleAIFolderUploadSelected = function(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let folderName = files[0].webkitRelativePath ? files[0].webkitRelativePath.split('/')[0] : 'Thu_Muc_Moi_Tai_Len';
    
    const newFileList = [];
    for (let i = 0; i < files.length; i++) {
        const fname = files[i].name;
        const ext = fname.split('.').pop().toLowerCase();
        let icon = '📄';
        if (['doc', 'docx'].includes(ext)) icon = '📝';
        if (['ppt', 'pptx'].includes(ext)) icon = '📊';
        if (['xls', 'xlsx'].includes(ext)) icon = '📈';

        newFileList.push({ name: fname, icon: icon, type: ext.toUpperCase() });
    }

    aiSourceFoldersData[folderName] = newFileList;
    currentSelectedAIFiles = [...newFileList];

    const select = document.getElementById('ai-folder-source-select');
    if (select) {
        const opt = document.createElement('option');
        opt.value = folderName;
        opt.textContent = `📁 Thư mục ${folderName} (${newFileList.length} files)`;
        select.appendChild(opt);
        select.value = folderName;
    }

    renderAIFilesList();
    alert(`🎉 Đã tải và chọn thư mục "${folderName}" (${newFileList.length} file tài liệu) để AI phân tích!`);
};

window.handleAIFileUploadSelected = function(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
        const fname = files[i].name;
        const ext = fname.split('.').pop().toLowerCase();
        let icon = '📄';
        if (['doc', 'docx'].includes(ext)) icon = '📝';
        if (['ppt', 'pptx'].includes(ext)) icon = '📊';
        if (['xls', 'xlsx'].includes(ext)) icon = '📈';

        currentSelectedAIFiles.push({ name: fname, icon: icon, type: ext.toUpperCase() });
    }

    renderAIFilesList();
};

window.openAIAssistantModal = function() {
    resetAIAssistantModal();
    const modal = document.getElementById('ai-assistant-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.setProperty('display', 'flex', 'important');
    }
    renderAIFilesList();
};

window.closeAIAssistantModal = function() {
    const modal = document.getElementById('ai-assistant-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
    }
};

window.resetAIAssistantModal = function() {
    document.getElementById('ai-step-1-container')?.classList.remove('hidden');
    document.getElementById('ai-loading-container')?.classList.add('hidden');
    document.getElementById('ai-results-container')?.classList.add('hidden');
    generatedAIQuestionsList = [];
    renderAIFilesList();
};

window.runAIGeneration = function() {
    const step1 = document.getElementById('ai-step-1-container');
    const loading = document.getElementById('ai-loading-container');
    const results = document.getElementById('ai-results-container');
    const statusText = document.getElementById('ai-loading-status');
    const progressBar = document.getElementById('ai-progress-bar');

    if (!step1 || !loading) return;

    step1.classList.add('hidden');
    loading.classList.remove('hidden');
    results.classList.add('hidden');

    if (progressBar) progressBar.style.width = '15%';
    if (statusText) statusText.textContent = '🤖 AI đang phân tích dữ liệu tài liệu PDF, DOCX, PPTX...';

    setTimeout(() => {
        if (progressBar) progressBar.style.width = '55%';
        if (statusText) statusText.textContent = '🛡️ AI đang đối soát chống trùng lặp với 1,200 câu hỏi hiện có trong Ngân hàng...';
    }, 1200);

    setTimeout(() => {
        if (progressBar) progressBar.style.width = '90%';
        if (statusText) statusText.textContent = '✨ AI đang khởi tạo biến thể trắc nghiệm & tự luận theo ma trận kiến thức...';
    }, 2400);

    setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
        loading.classList.add('hidden');
        results.classList.remove('hidden');
        
        generateAIMockItems();
        renderAIGeneratedTable();
    }, 3200);
};

function generateAIMockItems() {
    const countVal = parseInt(document.getElementById('ai-gen-count')?.value || '10', 10);
    const subjVal = document.getElementById('ai-gen-subj')?.value || 'IT003';
    const isVariants = document.getElementById('chk-ai-variants')?.checked;
    const isDedup = document.getElementById('chk-ai-dedup')?.checked;

    const sampleTopics = [
        { chap: 'Chương 1:\nTổng quan CSDL', mcq: 'Phương pháp phân tích kiến trúc 3 cấp CSDL và tính độc lập dữ liệu', essay: 'So sánh ưu nhược điểm của Hệ quản trị CSDL quan hệ RDBMS và NoSQL' },
        { chap: 'Chương 2:\nMô hình dữ liệu', mcq: 'Ràng buộc khóa chính (Primary Key) và khóa ngoại (Foreign Key) trong sơ đồ ERD', essay: 'Phân tích các bước chuyển đổi sơ đồ ERD sang Dạng chuẩn 3NF' },
        { chap: 'Chương 3:\nSQL cơ bản', mcq: 'Cách tối ưu câu lệnh SQL JOIN và nhóm dữ liệu GROUP BY / HAVING', essay: 'Viết thủ tục Stored Procedure tự động cập nhật số lượng học phần' }
    ];

    generatedAIQuestionsList = [];
    for (let i = 1; i <= countVal; i++) {
        const topObj = sampleTopics[(i - 1) % sampleTopics.length];
        const isMcq = i % 2 !== 0;
        const diff = i % 3 === 0 ? 'hard' : (i % 2 === 0 ? 'medium' : 'easy');

        let text = isMcq ? 
            `[AI Proposal #${i}] ${topObj.mcq} trong ứng dụng thực tế?` : 
            `[AI Proposal #${i}] Hãy phân tích chuyên sâu và đưa ra ví dụ minh họa về ${topObj.essay.toLowerCase()}.`;

        if (isVariants && i % 2 === 0) {
            text += ` (Biến thể kiến thức #${i})`;
        }

        generatedAIQuestionsList.push({
            id: 'AI_' + Date.now() + '_' + i,
            subjectCode: subjVal,
            text: text,
            chap: topObj.chap,
            type: isMcq ? 'Trắc nghiệm' : 'Tự luận',
            diff: diff,
            approved: true,
            aiBadge: isDedup ? '🛡️ Độc bản 100%' : '✨ AI Sinh mới'
        });
    }
}

window.renderAIGeneratedTable = function() {
    const tbody = document.getElementById('ai-generated-tbody');
    const totalSpan = document.getElementById('ai-gen-total-num');
    const approvedSpan = document.getElementById('ai-approved-count');
    const totalCountSpan = document.getElementById('ai-total-count');
    const saveBtnSpan = document.getElementById('ai-save-btn-count');

    if (!tbody) return;

    const approvedCount = generatedAIQuestionsList.filter(q => q.approved).length;
    if (totalSpan) totalSpan.textContent = generatedAIQuestionsList.length;
    if (approvedSpan) approvedSpan.textContent = approvedCount;
    if (totalCountSpan) totalCountSpan.textContent = generatedAIQuestionsList.length;
    if (saveBtnSpan) saveBtnSpan.textContent = approvedCount;

    let html = '';
    generatedAIQuestionsList.forEach((q, idx) => {
        const diffBadge = q.diff === 'easy' ? '<span class="tag-diff easy">Dễ</span>' :
                          q.diff === 'medium' ? '<span class="tag-diff medium">Trung bình</span>' :
                          '<span class="tag-diff hard">Khó</span>';

        const typeBadge = q.type === 'Tự luận' ? '<span class="tbl-type-tag" style="background: #fef3c7; color: #d97706; border: 1px solid #fde68a;">Tự luận</span>' :
                          '<span class="tbl-type-tag">Trắc nghiệm</span>';

        html += `
            <tr style="${q.approved ? '' : 'opacity: 0.55; background: #f8fafc;'}">
                <td><input type="checkbox" ${q.approved ? 'checked' : ''} onchange="toggleAIQuestionApproval(${idx}, this.checked)"></td>
                <td style="color: #64748b; font-weight: 600;">${idx + 1}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <span style="font-size: 11px; font-weight: 700; background: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 6px;">${q.aiBadge}</span>
                    </div>
                    <strong class="tbl-qtext" style="color: #1e293b; font-size: 13.5px;">${q.text}</strong>
                </td>
                <td>${typeBadge}</td>
                <td>${diffBadge}</td>
                <td style="text-align: center;">
                    <button type="button" class="btn-action-icon" title="Chỉnh sửa nội dung AI đề xuất" onclick="editAIGeneratedQuestion(${idx})">✏️</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
};

window.toggleAIQuestionApproval = function(index, checked) {
    if (generatedAIQuestionsList[index]) {
        generatedAIQuestionsList[index].approved = checked;
        renderAIGeneratedTable();
    }
};

window.toggleAISelectAll = function(checked) {
    generatedAIQuestionsList.forEach(q => q.approved = checked);
    renderAIGeneratedTable();
};

window.editAIGeneratedQuestion = function(index) {
    const q = generatedAIQuestionsList[index];
    if (!q) return;
    const newText = prompt("Giảng viên chỉnh sửa nội dung câu hỏi AI đề xuất:", q.text);
    if (newText && newText.trim()) {
        q.text = newText.trim();
        renderAIGeneratedTable();
    }
};

window.saveAIGeneratedQuestions = function() {
    const approvedItems = generatedAIQuestionsList.filter(q => q.approved);
    if (approvedItems.length === 0) {
        alert("Vui lòng tích chọn ít nhất 1 câu hỏi do AI đề xuất!");
        return;
    }

    let nextId = mockMainQBankItems.length + 1;
    approvedItems.forEach(aiItem => {
        mockMainQBankItems.unshift({
            id: nextId++,
            subjectCode: aiItem.subjectCode,
            text: aiItem.text,
            chap: aiItem.chap,
            type: aiItem.type,
            diff: aiItem.diff,
            date: `Hôm nay (AI tạo)\n12:30`
        });
    });

    closeAIAssistantModal();
    renderMainQBankTable(1);

    alert(`🎉 Giảng viên đã kiểm duyệt & nhập thành công ${approvedItems.length} câu hỏi AI vào Ngân hàng câu hỏi!`);
};

const mockClassesData = [
    { code: '2305CT01', name: 'Cơ sở dữ liệu 1', subject: 'Cơ sở dữ liệu', semester: 'HK2 - 2026', count: 42, exams: 6 },
    { code: '2305CT02', name: 'Cơ sở dữ liệu 2', subject: 'Cơ sở dữ liệu', semester: 'HK2 - 2026', count: 39, exams: 5 },
    { code: '2306CNTT01', name: 'Lập trình Web 1', subject: 'Lập trình Web', semester: 'HK1 - 2026', count: 45, exams: 7 },
    { code: '2306CNTT02', name: 'Lập trình Web 2', subject: 'Lập trình Web', semester: 'HK1 - 2026', count: 40, exams: 4 },
    { code: '2307CNTT01', name: 'Cấu trúc dữ liệu & GT', subject: 'CTDL & Giải thuật', semester: 'HK2 - 2026', count: 38, exams: 6 },
    { code: '2307CNTT02', name: 'Cấu trúc dữ liệu & GT 2', subject: 'CTDL & Giải thuật', semester: 'HK2 - 2026', count: 36, exams: 3 },
    { code: '2308MMT01', name: 'Mạng máy tính 1', subject: 'Mạng máy tính', semester: 'HK1 - 2026', count: 37, exams: 5 },
    { code: '2308MMT02', name: 'Mạng máy tính 2', subject: 'Mạng máy tính', semester: 'HK1 - 2026', count: 33, exams: 2 }
];

let currentClassesPage = 1;
const classesPageSize = 4;

window.showLecturerClassesSubView = function() {
    try {
        const lecView = document.getElementById('view-lecturer');
        if (lecView && lecView.classList.contains('hidden')) {
            lecView.classList.remove('hidden');
            lecView.style.setProperty('display', 'block', 'important');
        }

        hideAllLecturerSubviews();

        const classesSubview = document.getElementById('lec-classes-subview');
        if (classesSubview) {
            classesSubview.classList.remove('hidden');
            classesSubview.style.setProperty('display', 'block', 'important');
        }

        const mClasses = document.getElementById('lec-menu-classes');
        if (mClasses) mClasses.classList.add('active');

        renderClassesTable(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(err) {
        console.error("Error showing Classes subview:", err);
    }
};

window.renderClassesTable = function(page = currentClassesPage) {
    currentClassesPage = page;
    const tbody = document.getElementById('classes-table-tbody');
    const paginationContainer = document.getElementById('classes-table-pagination');
    if (!tbody) return;

    const searchVal = (document.getElementById('lec-classes-search')?.value || '').toLowerCase().trim();
    const subjectFilter = document.getElementById('lec-classes-subject-filter')?.value || '';
    const semesterFilter = document.getElementById('lec-classes-semester-filter')?.value || '';

    const filtered = mockClassesData.filter(c => {
        const matchesSearch = c.code.toLowerCase().includes(searchVal) || c.name.toLowerCase().includes(searchVal);
        const matchesSubj = !subjectFilter || c.subject === subjectFilter;
        const matchesSem = !semesterFilter || c.semester === semesterFilter;
        return matchesSearch && matchesSubj && matchesSem;
    });

    const totalPages = Math.ceil(filtered.length / classesPageSize) || 1;
    if (currentClassesPage > totalPages) currentClassesPage = totalPages;
    if (currentClassesPage < 1) currentClassesPage = 1;

    const startIdx = (currentClassesPage - 1) * classesPageSize;
    const endIdx = startIdx + classesPageSize;
    const pageItems = filtered.slice(startIdx, endIdx);

    if (pageItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: #94a3b8;">Không tìm thấy lớp học nào phù hợp.</td></tr>`;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    let html = '';
    pageItems.forEach(c => {
        html += `
            <tr>
                <td style="color: #64748b; font-weight: 600;">${c.code}</td>
                <td><strong class="tbl-qtext">${c.name}</strong></td>
                <td><span class="tbl-sub-tag">${c.subject}</span></td>
                <td><span class="tbl-type-tag" style="background: #f1f5f9; color: #475569;">${c.semester}</span></td>
                <td><strong>${c.count}</strong></td>
                <td><span style="color: #64748b; font-weight: 600;">${c.exams} bài thi</span></td>
                <td style="text-align: right;">
                    <button type="button" class="btn-action-outline" style="padding: 4px 12px; border-radius: 8px; font-size: 13px; border-color: #2563eb; color: #2563eb; height: 34px; background: transparent; cursor: pointer; font-weight: 700;" onclick="showLecturerClassDetailSubView('${c.code}', '${c.name}', ${c.count}, ${c.exams})">👁 Xem</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;

    if (paginationContainer) {
        let pagHtml = `
            <div style="display: flex; align-items: center; gap: 6px;">
                <button type="button" class="rev-page-num-btn" ${currentClassesPage === 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} onclick="renderClassesTable(${currentClassesPage - 1})">&lt;</button>
        `;

        for (let p = 1; p <= totalPages; p++) {
            pagHtml += `<button type="button" class="rev-page-num-btn ${p === currentClassesPage ? 'active' : ''}" onclick="renderClassesTable(${p})">${p}</button>`;
        }

        pagHtml += `
                <button type="button" class="rev-page-num-btn" ${currentClassesPage === totalPages ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} onclick="renderClassesTable(${currentClassesPage + 1})">&gt;</button>
            </div>
        `;
        paginationContainer.innerHTML = pagHtml;
    }
};

let currentClassStudentsList = [];
let currentClassStudentPage = 1;
const classStudentPageSize = 10;

function generateStudentsForClass(classCode = '2305CT01', targetCount = 45, totalExams = 6) {
    const familyNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đỗ', 'Đặng', 'Bùi', 'Ngô', 'Dương', 'Lý', 'Trịnh', 'Đinh'];
    const middleNames = ['Văn', 'Thị', 'Minh', 'Hồng', 'Quốc', 'Hải', 'Tiến', 'Thùy', 'Đức', 'Phương', 'Bảo', 'Kim', 'Thái', 'Gia'];
    const lastNames = ['Anh', 'Bình', 'Cường', 'Duy', 'Dũng', 'Đăng', 'Đạt', 'Dương', 'Em', 'Giang', 'Hà', 'Hải', 'Hùng', 'Huy', 'Khoa', 'Linh', 'Long', 'Mai', 'Nam', 'Nghĩa', 'Ngọc', 'Nhi', 'Phong', 'Phúc', 'Quân', 'Sơn', 'Tâm', 'Thành', 'Thảo', 'Trang', 'Tuấn', 'Tú', 'Vinh', 'Yến'];

    const students = [];
    const prefixNum = classCode.replace(/\D/g, '').substring(0, 4) || '2305';
    const numExams = totalExams || 6;
    
    for (let i = 1; i <= targetCount; i++) {
        const fam = familyNames[(i - 1) % familyNames.length];
        const mid = middleNames[(i * 3) % middleNames.length];
        const last = lastNames[(i * 7) % lastNames.length];
        const fullName = `${fam} ${mid} ${last}`;
        
        const mssv = `${prefixNum}${String(i).padStart(4, '0')}`;
        
        const isFull = i % 6 !== 0 && i % 8 !== 0;
        const doneExams = isFull ? numExams : Math.max(1, numExams - (i % 3));
        const status = doneExams === numExams ? 'Đã hoàn thành' : 'Chưa xong';
        
        const gpaBase = (6.0 + ((i * 13) % 40) / 10).toFixed(1);
        const gpa = Math.min(10, Math.max(5.0, parseFloat(gpaBase)));

        students.push({
            stt: i,
            mssv: mssv,
            name: fullName,
            gpa: gpa,
            completed: `${doneExams}/${numExams}`,
            status: status
        });
    }

    return students;
}

const mockClassExamsData = [
    { title: 'Quiz 1: SQL cơ bản', status: 'ended', completed: 40, total: 42, gpa: 8.1 },
    { title: 'Quiz 2: Mô hình ER', status: 'ongoing', completed: 35, total: 42, gpa: 7.5 },
    { title: 'Quiz 3: Chuẩn hóa CSDL', status: 'ongoing', completed: 28, total: 42, gpa: 7.2 },
    { title: 'Giữa kỳ: Cơ sở dữ liệu', status: 'ended', completed: 42, total: 42, gpa: 7.9 },
    { title: 'Quiz 4: Ngôn ngữ đại số quan hệ', status: 'ended', completed: 39, total: 42, gpa: 7.0 },
    { title: 'Cuối kỳ: Cơ sở dữ liệu', status: 'ended', completed: 41, total: 42, gpa: 8.3 }
];

let selectedClassCode = '2305CT01';

window.showLecturerClassDetailSubView = function(classCode = '2305CT01', className = 'Cơ sở dữ liệu 1', count = 42, exams = 6) {
    try {
        selectedClassCode = classCode;
        const realCount = parseInt(count, 10) || 45;
        const realExams = parseInt(exams, 10) || 6;
        
        hideAllLecturerSubviews();
        
        const classDetailSubview = document.getElementById('lec-class-detail-subview');
        if (classDetailSubview) {
            classDetailSubview.classList.remove('hidden');
            classDetailSubview.style.setProperty('display', 'block', 'important');
        }

        const mClasses = document.getElementById('lec-menu-classes');
        if (mClasses) mClasses.classList.add('active');

        const titleEl = document.getElementById('class-detail-title');
        if (titleEl) titleEl.textContent = `Chi tiết lớp học: ${classCode} - ${className}`;

        const headerEl = document.getElementById('class-detail-students-header');
        if (headerEl) headerEl.textContent = `Danh sách sinh viên trong lớp (${realCount} sinh viên)`;

        currentClassStudentsList = generateStudentsForClass(classCode, realCount, realExams);
        currentClassStudentPage = 1;

        renderClassStudentsTable(1);
        renderClassExamsProgress();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(err) {
        console.error("Error showing Class Detail Subview:", err);
    }
};

window.renderClassStudentsTable = function(page = currentClassStudentPage) {
    currentClassStudentPage = page;
    const tbody = document.getElementById('class-students-tbody');
    const paginationContainer = document.getElementById('class-students-table-pagination');
    if (!tbody) return;

    const searchVal = (document.getElementById('class-student-search')?.value || '').toLowerCase().trim();
    const filtered = currentClassStudentsList.filter(s => s.name.toLowerCase().includes(searchVal) || s.mssv.includes(searchVal));

    const totalPages = Math.ceil(filtered.length / classStudentPageSize) || 1;
    if (currentClassStudentPage > totalPages) currentClassStudentPage = totalPages;
    if (currentClassStudentPage < 1) currentClassStudentPage = 1;

    const startIdx = (currentClassStudentPage - 1) * classStudentPageSize;
    const endIdx = startIdx + classStudentPageSize;
    const pageItems = filtered.slice(startIdx, endIdx);

    if (pageItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 24px; color: #94a3b8;">Không tìm thấy sinh viên nào.</td></tr>`;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    let html = '';
    pageItems.forEach((s) => {
        const statusBadge = s.status === 'Đã hoàn thành' 
            ? '<span style="background: #ecfdf5; color: #10b981; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; display: inline-block;">Đã hoàn thành</span>'
            : '<span style="background: #fff7ed; color: #f97316; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; display: inline-block;">Chưa xong</span>';

        html += `
            <tr>
                <td style="color: #64748b; font-weight: 600;">${s.stt}</td>
                <td style="color: #64748b; font-weight: 700;">${s.mssv}</td>
                <td><strong class="tbl-qtext" style="color: #0f172a;">${s.name}</strong></td>
                <td style="text-align: center; font-weight: 700; color: #ef4444;">${s.gpa}</td>
                <td style="text-align: center; font-weight: 600; color: #64748b;">${s.completed}</td>
                <td style="text-align: right;">${statusBadge}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;

    if (paginationContainer) {
        let pagHtml = `
            <div style="display: flex; align-items: center; gap: 6px;">
                <button type="button" class="rev-page-num-btn" ${currentClassStudentPage === 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} onclick="renderClassStudentsTable(${currentClassStudentPage - 1})">&lt;</button>
        `;

        for (let p = 1; p <= totalPages; p++) {
            pagHtml += `<button type="button" class="rev-page-num-btn ${p === currentClassStudentPage ? 'active' : ''}" onclick="renderClassStudentsTable(${p})">${p}</button>`;
        }

        pagHtml += `
                <button type="button" class="rev-page-num-btn" ${currentClassStudentPage === totalPages ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} onclick="renderClassStudentsTable(${currentClassStudentPage + 1})">&gt;</button>
            </div>
        `;
        paginationContainer.innerHTML = pagHtml;
    }
};

window.renderClassExamsProgress = function() {
    const container = document.getElementById('class-exams-list-container');
    if (!container) return;

    let html = '';
    mockClassExamsData.forEach(ex => {
        const notCompleted = ex.total - ex.completed;
        const pct = Math.round((ex.completed / ex.total) * 100);
        
        const statusBadge = ex.status === 'ongoing'
            ? '<span style="background: #eff6ff; color: #2563eb; padding: 3px 6px; border-radius: 4px; font-size: 10.5px; font-weight: 700;">Đang diễn ra</span>'
            : '<span style="background: #f1f5f9; color: #64748b; padding: 3px 6px; border-radius: 4px; font-size: 10.5px; font-weight: 700;">Đã kết thúc</span>';

        html += `
            <div style="background: #f8fafc; border-radius: 12px; padding: 14px; border: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div>
                        <strong style="font-size: 13.5px; color: #0f172a; display: block; margin-bottom: 2px;">${ex.title}</strong>
                        ${statusBadge}
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 11px; color: #64748b; font-weight: 600; display: block;">Điểm TB</span>
                        <strong style="font-size: 14px; color: #ef4444; font-weight: 700;">${ex.gpa}</strong>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 11px; color: #475569; font-weight: 600; margin-bottom: 4px;">
                    <span>Hoàn thành: ${pct}%</span>
                    <span>${ex.completed} / ${ex.total} SV</span>
                </div>
                <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; margin-bottom: 8px;">
                    <div style="width: ${pct}%; height: 100%; background: #10b981; border-radius: 3px;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #64748b;">
                    <span>Đã làm: <strong style="color: #10b981;">${ex.completed}</strong></span>
                    <span>Chưa làm: <strong style="color: #f97316;">${notCompleted}</strong></span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
};

const defaultLecturerExamsData = [
    { id: 101, title: 'Kiểm tra chương 1: Tổng quan CSDL', subject: 'IT003 - Cơ sở dữ liệu', subjectCode: 'IT003', classTag: 'IT003 - K21', qCount: 45, duration: 45, createdDate: '20/05/2026 08:00', endDate: '30/08/2026 23:59', status: 'published' },
    { id: 102, title: 'Kiểm tra SQL cơ bản', subject: 'IT003 - Cơ sở dữ liệu', subjectCode: 'IT003', classTag: 'IT003 - K21', qCount: 50, duration: 60, createdDate: '18/05/2026 08:00', endDate: '30/08/2026 23:59', status: 'published' },
    { id: 103, title: 'Kiểm tra giữa kỳ - Cơ sở dữ liệu', subject: 'IT003 - Cơ sở dữ liệu', subjectCode: 'IT003', classTag: 'IT003 - K21', qCount: 50, duration: 90, createdDate: '15/05/2026 07:00', endDate: '30/08/2026 22:00', status: 'published' },
    { id: 104, title: 'Bài tập thực hành 1', subject: 'IT003 - Cơ sở dữ liệu', subjectCode: 'IT003', classTag: 'IT003 - K21', qCount: 30, duration: 30, createdDate: '17/05/2026 09:00', endDate: '30/08/2026 23:59', status: 'published' },
    { id: 105, title: 'Thi cuối kỳ Lập trình Web', subject: 'IT005 - Lập trình Web', subjectCode: 'IT005', classTag: 'IT005 - K22', qCount: 40, duration: 45, createdDate: '22/07/2026 08:00', endDate: '05/09/2026 23:59', status: 'published' },
    { id: 106, title: 'Kiểm tra 15 phút Cấu trúc dữ liệu', subject: 'IT002 - Cấu trúc dữ liệu', subjectCode: 'IT002', classTag: 'IT002 - K21', qCount: 15, duration: 15, createdDate: '10/07/2026 08:00', endDate: '25/08/2026 23:59', status: 'published' }
];

let mockLecturerExamsData = [...defaultLecturerExamsData];

function loadLecturerExamsFromStorage() {
    try {
        const stored = localStorage.getItem('dhv_lecturer_exams');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                mockLecturerExamsData = parsed;
            }
        }
    } catch(e) {
        console.error("Lỗi đọc dhv_lecturer_exams:", e);
    }
}

function saveLecturerExamsToStorage() {
    try {
        localStorage.setItem('dhv_lecturer_exams', JSON.stringify(mockLecturerExamsData));
    } catch(e) {
        console.error("Lỗi ghi dhv_lecturer_exams:", e);
    }
}

window.updateStudentSubjectsExamCounts = function() {
    loadLecturerExamsFromStorage();
    studentSubjects.forEach(subj => {
        const activeExams = mockLecturerExamsData.filter(ex => {
            const codeMatch = ex.subjectCode === subj.code || (ex.subject && ex.subject.includes(subj.code));
            const isLive = ex.status === 'published' || ex.status === 'ongoing';
            return codeMatch && isLive;
        });
        subj.quizzesCount = activeExams.length;
        if (activeExams.length > 0) {
            subj.statusBadge = `${activeExams.length} bài đang mở`;
            subj.statusType = 'upcoming';
        } else {
            subj.statusBadge = 'Chưa có bài thi';
            subj.statusType = 'none';
        }
    });
};

let currentStudentSubjectCode = 'IT003';

window.renderStudentExamsList = function(subjectCode = currentStudentSubjectCode, searchKeyword = '') {
    if (subjectCode) currentStudentSubjectCode = subjectCode;
    const code = currentStudentSubjectCode;

    loadLecturerExamsFromStorage();

    const container = document.querySelector('#student-detail-subview .exam-cards-list');
    if (!container) return;

    const kw = (searchKeyword || '').toLowerCase().trim();

    const exams = mockLecturerExamsData.filter(ex => {
        const codeMatch = !code || ex.subjectCode === code || (ex.subject && ex.subject.includes(code));
        const titleMatch = !kw || ex.title.toLowerCase().includes(kw);
        return codeMatch && titleMatch;
    });

    if (exams.length === 0) {
        container.innerHTML = `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px 20px; text-align: center; color: #64748b; margin-top: 10px;">
                <div style="font-size: 40px; margin-bottom: 10px;">📝</div>
                <h4 style="font-size: 16px; color: #0f172a; margin-bottom: 6px;">Chưa có bài thi nào</h4>
                <p style="font-size: 13px; margin: 0;">Hiện chưa có bài kiểm tra nào được tạo cho môn học này.</p>
            </div>
        `;
        return;
    }

    const iconColors = ['bg-green-tint', 'bg-blue-tint', 'bg-orange-tint', 'bg-purple-tint'];
    const strokeColors = ['#059669', '#2563eb', '#ea580c', '#7c3aed'];

    let html = '';
    exams.forEach((ex, idx) => {
        const colorIdx = idx % iconColors.length;
        const colorClass = iconColors[colorIdx];
        const strokeColor = strokeColors[colorIdx];

        const isOpen = ex.status === 'published' || ex.status === 'ongoing';
        const statusBadge = isOpen
            ? '<span class="badge-status-open" style="background: #ecfdf5; color: #10b981; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 12px;">Đang mở</span>'
            : '<span class="badge-status-closed" style="background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 12px;">Đã kết thúc</span>';

        const createDateStr = ex.createdDate || '20/05/2026 08:00';
        const endDateStr = ex.endDate || '30/08/2026 23:59';
        const qCountVal = ex.qCount || 50;

        html += `
            <div class="exam-item-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                <div class="exam-card-icon ${colorClass}" style="width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                </div>
                
                <div class="exam-card-main" style="flex: 1;">
                    <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #0f172a;">${ex.title}</h3>
                    <div class="exam-card-meta" style="display: flex; flex-wrap: wrap; gap: 14px; font-size: 12.5px; color: #64748b;">
                        <span>📅 Mở từ: <strong style="color: #334155;">${createDateStr}</strong></span>
                        <span>Đến: <strong style="color: #334155;">${endDateStr}</strong></span>
                        <span>🕒 Thời gian: <strong style="color: #2563eb;">${ex.duration} phút (${qCountVal} câu)</strong></span>
                    </div>
                </div>

                <div class="exam-card-status" style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                    ${statusBadge}
                    <span class="attempt-count" style="font-size: 11.5px; color: #94a3b8; font-weight: 600;">Làm bài: 0/1 lần</span>
                </div>

                <div class="exam-card-actions">
                    <button class="btn-do-exam" onclick="startQuizEngine('${ex.id}')" style="background: #2563eb; color: #ffffff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 13.5px; cursor: pointer;">
                        Vào làm bài
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
};

window.filterStudentExamList = function() {
    const input = document.getElementById('student-exam-search-input');
    const kw = input ? input.value : '';
    renderStudentExamsList(currentStudentSubjectCode, kw);
};

window.toggleLecturerExamGroup = function() {
    try {
        const grp = document.getElementById('sb-group-exams');
        if (grp) grp.classList.toggle('open');
        showLecturerExamList();
    } catch(err) {
        console.error("Error toggling exam group:", err);
    }
};

window.showLecturerExamList = function() {
    try {
        const lecView = document.getElementById('view-lecturer');
        if (lecView && lecView.classList.contains('hidden')) {
            lecView.classList.remove('hidden');
            lecView.style.setProperty('display', 'block', 'important');
        }

        hideAllLecturerSubviews();

        const listSubview = document.getElementById('lec-exam-list-subview');
        if (listSubview) {
            listSubview.classList.remove('hidden');
            listSubview.style.setProperty('display', 'block', 'important');
        }

        const mList = document.getElementById('lec-menu-list');
        if (mList) mList.classList.add('active');

        const grpExams = document.getElementById('sb-group-exams');
        const hdrExams = document.getElementById('sb-header-exams');
        if (grpExams) {
            grpExams.classList.add('active');
            grpExams.classList.add('open');
        }
        if (hdrExams) hdrExams.classList.add('active');

        renderLecturerExamsTable();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(err) {
        console.error("Error showing Exam List subview:", err);
    }
};

window.showLecturerCreateExam = function() {
    try {
        const lecView = document.getElementById('view-lecturer');
        if (lecView && lecView.classList.contains('hidden')) {
            lecView.classList.remove('hidden');
            lecView.style.setProperty('display', 'block', 'important');
        }

        hideAllLecturerSubviews();

        const createSubview = document.getElementById('lec-create-exam-subview');
        if (createSubview) {
            createSubview.classList.remove('hidden');
            createSubview.style.setProperty('display', 'block', 'important');
        }

        const mCreate = document.getElementById('lec-menu-create');
        if (mCreate) mCreate.classList.add('active');

        const grpExams = document.getElementById('sb-group-exams');
        const hdrExams = document.getElementById('sb-header-exams');
        if (grpExams) {
            grpExams.classList.add('active');
            grpExams.classList.add('open');
        }
        if (hdrExams) hdrExams.classList.add('active');

        goToLecWizardStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(err) {
        console.error("Error showing Create Exam subview:", err);
    }
};

window.renderLecturerExamsTable = function() {
    loadLecturerExamsFromStorage();
    const tbody = document.getElementById('lec-exams-table-body');
    if (!tbody) return;

    const searchVal = (document.getElementById('lec-exam-search')?.value || '').toLowerCase().trim();
    const subjVal = document.getElementById('lec-exam-subj-filter')?.value || '';
    const statusVal = document.getElementById('lec-exam-status-filter')?.value || '';

    const filtered = mockLecturerExamsData.filter(ex => {
        const matchesSearch = ex.title.toLowerCase().includes(searchVal) || ex.subject.toLowerCase().includes(searchVal);
        const matchesSubj = !subjVal || ex.subjectCode === subjVal;
        const matchesStatus = !statusVal || ex.status === statusVal;
        return matchesSearch && matchesSubj && matchesStatus;
    });

    let html = '';
    filtered.forEach((ex, idx) => {
        const statusBadge = ex.status === 'published' ? '<span class="tag-status published">🟢 Đã xuất bản</span>' :
                            ex.status === 'ongoing' ? '<span class="tag-status ongoing">🔵 Đang diễn ra</span>' :
                            '<span class="tag-status ended">⚪ Đã kết thúc</span>';

        html += `
            <tr>
                <td style="color: #64748b; font-weight: 600;">${idx + 1}</td>
                <td><strong class="tbl-qtext">${ex.title}</strong></td>
                <td><span class="tbl-sub-tag">${ex.subject}</span></td>
                <td><span class="class-pill-tag">${ex.classTag}</span></td>
                <td><strong style="color: #2563eb;">${ex.qCount} câu</strong></td>
                <td><span>${ex.duration} phút</span></td>
                <td><span style="color: #475569; font-weight: 500;">${ex.createdDate || '29/07/2026'}</span></td>
                <td><span style="color: #ef4444; font-weight: 600;">${ex.endDate || '29/07/2026'}</span></td>
                <td>${statusBadge}</td>
                <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 8px;">
                        <button type="button" class="btn-action-icon" title="Xem chi tiết" onclick="alert('Xem chi tiết bài thi: ${ex.title}')">👁</button>
                        <button type="button" class="btn-action-icon" title="Chỉnh sửa" onclick="showLecturerCreateExam()">✏️</button>
                        <button type="button" class="btn-action-icon text-red" title="Xóa" onclick="deleteLecturerExam('${ex.id}')">🗑</button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
};

window.deleteLecturerExam = function(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bài thi này không?')) {
        mockLecturerExamsData = mockLecturerExamsData.filter(ex => String(ex.id) !== String(id));
        saveLecturerExamsToStorage();
        updateStudentSubjectsExamCounts();
        renderLecturerExamsTable();
    }
};

window.addQuizFromLecturer = function(e) {
    if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
    }

    try {
        const titleInput = document.getElementById('lec-quiz-title');
        const subjInput = document.getElementById('lec-quiz-subject');
        const durationInput = document.getElementById('lec-quiz-duration');
        const qCountInput = document.getElementById('lec-quiz-qcount');

        const title = titleInput ? titleInput.value.trim() : 'Kiểm tra giữa kỳ - Cơ sở dữ liệu';
        const subj = subjInput ? subjInput.value : 'IT003 - Cơ sở dữ liệu';
        const duration = durationInput ? parseInt(durationInput.value) || 60 : 60;
        const qCount = (selectedQBankIds && selectedQBankIds.size > 0) ? selectedQBankIds.size : (qCountInput ? parseInt(qCountInput.value) || 50 : 50);

        let subjectCode = 'IT003';
        if (subj) {
            const match = subj.match(/^(IT\d+)/i);
            if (match) {
                subjectCode = match[1].toUpperCase();
            } else {
                const parts = subj.split(' - ');
                if (parts.length > 0) subjectCode = parts[0].trim();
            }
        }

        const now = new Date();
        const createdStr = now.toLocaleDateString('vi-VN') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
        const endDateObj = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const endStr = endDateObj.toLocaleDateString('vi-VN') + ' 23:59';

        const newExam = {
            id: Date.now(),
            title: title || 'Bài thi trắc nghiệm mới',
            subject: subj,
            subjectCode: subjectCode,
            classTag: `${subjectCode} - K21`,
            qCount: qCount,
            duration: duration,
            createdDate: createdStr,
            endDate: endStr,
            status: 'published'
        };

        loadLecturerExamsFromStorage();
        mockLecturerExamsData.unshift(newExam);
        saveLecturerExamsToStorage();
        updateStudentSubjectsExamCounts();

        alert(`🎉 Chúc mừng ThS. Nguyễn Minh Tuấn!\n\nBài thi "${newExam.title}" đã được xuất bản thành công trên hệ thống DHV QUIZ và đã lập tức cập nhật cho Sinh viên!`);
        
        // Force view state to lecturer view and show exam list
        navigateTo('view-lecturer');
        showLecturerExamList();
    } catch(err) {
        console.error("Error publishing exam:", err);
    }
    return false;
};

// LECTURER STEP WIZARD ENGINE & QUESTION BANK
let currentLecWizardStep = 1;
let selectedQBankIds = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

let currentQBankPage = 1;
const qBankPageSize = 5;

const mockQBankTableData = [
    { id: 1, text: 'Trong mô hình quan hệ, khóa chính (Primary Key) là gì?', topic: 'Mô hình quan hệ', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 2, text: 'Câu lệnh SQL nào dùng để truy xuất dữ liệu từ bảng?', topic: 'SQL cơ bản', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 3, text: 'Trong SQL, mệnh đề WHERE được dùng để làm gì?', topic: 'SQL cơ bản', type: 'Trắc nghiệm', diff: 'medium', score: 0.2 },
    { id: 4, text: 'Cho bảng SINHVIEN(MSSV, HoTen, Lop, NgaySinh). Kiểu dữ liệu phù hợp nhất cho cột NgaySinh là?', topic: 'Kiểu dữ liệu', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 5, text: 'Chuẩn hóa dữ liệu là quá trình?', topic: 'Chuẩn hóa CSDL', type: 'Trắc nghiệm', diff: 'medium', score: 0.2 },
    { id: 6, text: 'Trong mô hình ER, hình thoi (◆) biểu diễn gì?', topic: 'Mô hình ER', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 7, text: 'Câu lệnh nào dùng để thêm dữ liệu vào bảng?', topic: 'SQL cơ bản', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 8, text: 'Khóa ngoại (Foreign Key) dùng để làm gì?', topic: 'Mô hình quan hệ', type: 'Trắc nghiệm', diff: 'medium', score: 0.2 },
    { id: 9, text: 'Ràng buộc duy nhất (UNIQUE) trong SQL cho phép tối đa bao nhiêu giá trị NULL?', topic: 'Ràng buộc CSDL', type: 'Trắc nghiệm', diff: 'hard', score: 0.2 },
    { id: 10, text: 'Hàm gộp nào trong SQL dùng để tính giá trị trung bình của cột số?', topic: 'SQL nâng cao', type: 'Trắc nghiệm', diff: 'hard', score: 0.2 },
    { id: 11, text: 'Mệnh đề GROUP BY trong SQL dùng để làm gì?', topic: 'SQL nâng cao', type: 'Trắc nghiệm', diff: 'medium', score: 0.2 },
    { id: 12, text: 'Khái niệm giao dịch (Transaction) trong CSDL tuân theo tính chất nào?', topic: 'Giao dịch & Đồng thời', type: 'Trắc nghiệm', diff: 'hard', score: 0.2 },
    { id: 13, text: 'Chỉ mục (Index) trong CSDL giúp cải thiện điều gì?', topic: 'Tối ưu hóa CSDL', type: 'Trắc nghiệm', diff: 'medium', score: 0.2 },
    { id: 14, text: 'Phép nối INNER JOIN trả về kết quả nào?', topic: 'SQL nâng cao', type: 'Trắc nghiệm', diff: 'medium', score: 0.2 },
    { id: 15, text: 'Dạng chuẩn 1NF yêu cầu bảng dữ liệu phải thỏa mãn điều kiện gì?', topic: 'Chuẩn hóa CSDL', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 16, text: 'Khóa ứng viên (Candidate Key) là gì?', topic: 'Mô hình quan hệ', type: 'Trắc nghiệm', diff: 'hard', score: 0.2 },
    { id: 17, text: 'Lệnh TRUNCATE TABLE khác lệnh DELETE như thế nào?', topic: 'SQL cơ bản', type: 'Trắc nghiệm', diff: 'hard', score: 0.2 },
    { id: 18, text: 'Mệnh đề HAVING trong SQL khác mệnh đề WHERE ở điểm nào?', topic: 'SQL nâng cao', type: 'Trắc nghiệm', diff: 'medium', score: 0.2 },
    { id: 19, text: 'Trong CSDL, View là gì?', topic: 'Đối tượng CSDL', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 20, text: 'Trigger trong SQL được kích hoạt khi nào?', topic: 'Lập trình CSDL', type: 'Trắc nghiệm', diff: 'hard', score: 0.2 },
    { id: 21, text: 'Phép chiếu (Projection) trong đại số quan hệ chọn ra cái gì?', topic: 'Đại số quan hệ', type: 'Trắc nghiệm', diff: 'medium', score: 0.2 },
    { id: 22, text: 'Phép chọn (Selection) trong đại số quan hệ chọn ra cái gì?', topic: 'Đại số quan hệ', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 23, text: 'Dạng chuẩn 3NF loại bỏ phụ thuộc hàm nào?', topic: 'Chuẩn hóa CSDL', type: 'Trắc nghiệm', diff: 'hard', score: 0.2 },
    { id: 24, text: 'Khóa tổng hợp (Composite Key) là khóa gồm bao nhiêu thuộc tính?', topic: 'Mô hình quan hệ', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 },
    { id: 25, text: 'Hàm COUNT(*) trong SQL trả về giá trị gì?', topic: 'SQL nâng cao', type: 'Trắc nghiệm', diff: 'easy', score: 0.2 }
];

window.goToLecWizardStep = function(stepNum) {
    currentLecWizardStep = stepNum;

    // Update wizard steps circles & active state
    const wizSteps = document.querySelectorAll('.wiz-steps-bar .wiz-step');
    wizSteps.forEach((stepEl, idx) => {
        const stepCircle = stepEl.querySelector('.wiz-circle');
        const stepIdx = idx + 1;
        if (stepCircle) {
            if (stepIdx < stepNum) {
                stepEl.classList.remove('active');
                stepCircle.innerHTML = '✓';
                stepCircle.style.background = '#10b981';
                stepCircle.style.borderColor = '#10b981';
                stepCircle.style.color = '#ffffff';
            } else if (stepIdx === stepNum) {
                stepEl.classList.add('active');
                stepCircle.innerHTML = stepIdx;
                stepCircle.style.background = '#2563eb';
                stepCircle.style.borderColor = '#2563eb';
                stepCircle.style.color = '#ffffff';
            } else {
                stepEl.classList.remove('active');
                stepCircle.innerHTML = stepIdx;
                stepCircle.style.background = '#f1f5f9';
                stepCircle.style.borderColor = '#cbd5e1';
                stepCircle.style.color = '#64748b';
            }
        }
    });

    // Toggle step containers
    for (let i = 1; i <= 4; i++) {
        const container = document.getElementById(`lec-step${i}-container`);
        if (container) {
            if (i === stepNum) {
                container.classList.remove('hidden');
                container.style.setProperty('display', 'block', 'important');
            } else {
                container.classList.add('hidden');
                container.style.setProperty('display', 'none', 'important');
            }
        }
    }

    if (stepNum === 1) {
        initRealtimeOpeningTimeInputs();
    } else if (stepNum === 2) {
        const maxLimit = getMaxQuestionLimit();
        if (selectedQBankIds.size < maxLimit) {
            for (let i = 0; i < Math.min(maxLimit, mockQBankTableData.length); i++) {
                selectedQBankIds.add(mockQBankTableData[i].id);
            }
        } else if (selectedQBankIds.size > maxLimit) {
            const trimmedArr = Array.from(selectedQBankIds).slice(0, maxLimit);
            selectedQBankIds = new Set(trimmedArr);
        }
        renderLecQBankTable(1);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.renderLecQBankTable = function(page = currentQBankPage) {
    currentQBankPage = page;
    const tbody = document.getElementById('step2-qtable-body');
    if (!tbody) return;

    const searchVal = (document.getElementById('lec-step2-search')?.value || '').toLowerCase().trim();
    const filtered = mockQBankTableData.filter(q => q.text.toLowerCase().includes(searchVal) || q.topic.toLowerCase().includes(searchVal));

    const totalPages = Math.ceil(filtered.length / qBankPageSize) || 1;
    if (currentQBankPage > totalPages) currentQBankPage = totalPages;
    if (currentQBankPage < 1) currentQBankPage = 1;

    const startIdx = (currentQBankPage - 1) * qBankPageSize;
    const endIdx = startIdx + qBankPageSize;
    const pagedItems = filtered.slice(startIdx, endIdx);

    let html = '';
    pagedItems.forEach((q, idx) => {
        const globalIndex = startIdx + idx + 1;
        const isChecked = selectedQBankIds.has(q.id);
        const diffBadge = q.diff === 'easy' ? '<span class="tag-diff easy">Dễ</span>' :
                          q.diff === 'medium' ? '<span class="tag-diff medium">Trung bình</span>' :
                          '<span class="tag-diff hard">Khó</span>';

        html += `
            <tr class="${isChecked ? 'row-selected' : ''}">
                <td>
                    <label class="custom-checkbox">
                        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleQuestionSelection(${q.id})">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td style="color: #64748b; font-weight: 600;">${globalIndex}</td>
                <td><strong class="tbl-qtext">${q.text}</strong></td>
                <td><span class="tbl-sub-tag">${q.topic}</span></td>
                <td><span class="tbl-type-tag">${q.type}</span></td>
                <td>${diffBadge}</td>
                <td><strong class="tbl-score-val">${q.score}</strong></td>
                <td style="text-align: center;">
                    <button type="button" class="btn-add-q-circle ${isChecked ? 'added' : ''}" onclick="toggleQuestionSelection(${q.id})">
                        ${isChecked ? '✓' : '+'}
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    renderSidebarSelectedList();
    renderLecQBankPagination(totalPages, currentQBankPage);
};

function renderLecQBankPagination(totalPages, currentPage) {
    const pagContainer = document.getElementById('step2-qtable-pagination');
    if (!pagContainer) return;

    let pagHtml = `
        <button type="button" class="rev-page-num-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="renderLecQBankTable(${currentPage - 1})">&lt;</button>
    `;

    for (let p = 1; p <= totalPages; p++) {
        pagHtml += `
            <button type="button" class="rev-page-num-btn ${p === currentPage ? 'active' : ''}" onclick="renderLecQBankTable(${p})">${p}</button>
        `;
    }

    pagHtml += `
        <button type="button" class="rev-page-num-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="renderLecQBankTable(${currentPage + 1})">&gt;</button>
    `;

    pagContainer.innerHTML = pagHtml;
}

window.getMaxQuestionLimit = function() {
    const qCountInput = document.getElementById('lec-quiz-qcount');
    const val = parseInt(qCountInput?.value, 10);
    return (isNaN(val) || val <= 0) ? 10 : val;
};

let currentSidebarPage = 1;
const sidebarPageSize = 10;

window.renderSidebarSelectedList = function(page = currentSidebarPage) {
    currentSidebarPage = page;
    const listContainer = document.getElementById('sidebar-selected-q-list');
    const badgeCount = document.getElementById('step2-selected-count-badge');
    const countDisplay = document.getElementById('sidebar-total-qcount');
    const scoreDisplay = document.getElementById('sidebar-total-score');

    if (!listContainer) return;

    const maxLimit = getMaxQuestionLimit();
    const selectedArr = mockQBankTableData.filter(q => selectedQBankIds.has(q.id));
    const totalCount = selectedQBankIds.size;
    const totalScore = (totalCount * 0.2).toFixed(1);

    if (badgeCount) badgeCount.textContent = `Đã chọn: ${totalCount}/${maxLimit} câu`;
    if (countDisplay) countDisplay.textContent = `${totalCount}/${maxLimit}`;
    if (scoreDisplay) scoreDisplay.textContent = `${totalScore} điểm`;

    const totalSidebarPages = Math.ceil(selectedArr.length / sidebarPageSize) || 1;
    if (currentSidebarPage > totalSidebarPages) currentSidebarPage = totalSidebarPages;
    if (currentSidebarPage < 1) currentSidebarPage = 1;

    const startIdx = (currentSidebarPage - 1) * sidebarPageSize;
    const endIdx = startIdx + sidebarPageSize;
    const pagedSelectedItems = selectedArr.slice(startIdx, endIdx);

    let html = '';
    pagedSelectedItems.forEach((q, idx) => {
        const globalIndex = startIdx + idx + 1;
        html += `
            <div class="side-q-item">
                <span class="drag-dots">⋮⋮</span>
                <div class="side-q-info">
                    <strong>${globalIndex}. ${q.text}</strong>
                    <span>(${q.score} điểm)</span>
                </div>
                <button type="button" class="btn-del-side-q" onclick="toggleQuestionSelection(${q.id})" title="Xóa khỏi danh sách">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        `;
    });

    if (totalSidebarPages > 1) {
        html += `
            <div class="sidebar-pagination-row" style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                <button type="button" class="btn-side-pag" ${currentSidebarPage === 1 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''} onclick="renderSidebarSelectedList(${currentSidebarPage - 1})" style="padding: 5px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: #ffffff; cursor: pointer; font-size: 12px; font-weight: 600; color: #475569;">
                    &lt; Trước
                </button>
                <span style="font-size: 12px; font-weight: 700; color: #2563eb;">Trang ${currentSidebarPage} / ${totalSidebarPages}</span>
                <button type="button" class="btn-side-pag" ${currentSidebarPage === totalSidebarPages ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''} onclick="renderSidebarSelectedList(${currentSidebarPage + 1})" style="padding: 5px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: #ffffff; cursor: pointer; font-size: 12px; font-weight: 600; color: #475569;">
                    Tiếp &gt;
                </button>
            </div>
        `;
    }

    listContainer.innerHTML = html;
};

window.toggleSelectAllQBank = function(checked) {
    const maxLimit = getMaxQuestionLimit();
    selectedQBankIds.clear();
    if (checked) {
        let count = 0;
        for (const q of mockQBankTableData) {
            if (count < maxLimit) {
                selectedQBankIds.add(q.id);
                count++;
            } else {
                break;
            }
        }
        if (mockQBankTableData.length > maxLimit) {
            alert(`⚠️ Đã chọn tối đa ${maxLimit} câu hỏi theo số lượng đã chọn ở Bước 1!`);
        }
    }
    renderLecQBankTable(currentQBankPage);
};

window.toggleQuestionSelection = function(qId) {
    if (selectedQBankIds.has(qId)) {
        selectedQBankIds.delete(qId);
    } else {
        const maxLimit = getMaxQuestionLimit();
        if (selectedQBankIds.size >= maxLimit) {
            alert(`⚠️ Bạn đã chọn đủ ${maxLimit} câu hỏi theo cấu hình ở Bước 1! Không thể chọn thêm.`);
            return;
        }
        selectedQBankIds.add(qId);
    }
    renderLecQBankTable(currentQBankPage);
};

window.autoSelect50Questions = function() {
    const maxLimit = getMaxQuestionLimit();
    selectedQBankIds.clear();
    let count = 0;
    for (const q of mockQBankTableData) {
        if (count < maxLimit) {
            selectedQBankIds.add(q.id);
            count++;
        } else {
            break;
        }
    }
    renderLecQBankTable(currentQBankPage);
    alert(`⚡ Đã tự động chọn đủ ${selectedQBankIds.size} câu hỏi theo số lượng đã chọn ở Bước 1!`);
};

function updateStep2Progress() {
    const targetCountInput = document.getElementById('lec-quiz-qcount');
    const targetCount = targetCountInput ? parseInt(targetCountInput.value) || 50 : 50;
    const currentCount = selectedQBankIds.size;
    const pct = Math.min(100, Math.round((currentCount / targetCount) * 100));

    const countText = document.getElementById('step2-selected-count-text');
    const fillBar = document.getElementById('step2-progress-fill');

    if (countText) countText.textContent = `${currentCount} / ${targetCount} câu`;
    if (fillBar) fillBar.style.width = `${pct}%`;
}

window.closeResultModal = function() {
    const modal = document.getElementById('result-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    showSubjectGrid();
};

function generate42AntiCheatStudents() {
    const familyNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đỗ', 'Đặng', 'Bùi', 'Ngô', 'Dương', 'Lý', 'Trịnh', 'Đinh'];
    const middleNames = ['Văn', 'Thị', 'Minh', 'Hồng', 'Quốc', 'Hải', 'Tiến', 'Thùy', 'Đức', 'Phương', 'Bảo', 'Kim', 'Thái', 'Gia'];
    const lastNames = ['Anh', 'Bình', 'Cường', 'Duy', 'Dũng', 'Đăng', 'Đạt', 'Dương', 'Em', 'Giang', 'Hà', 'Hải', 'Hùng', 'Huy', 'Khoa', 'Linh', 'Long', 'Mai', 'Nam', 'Nghĩa', 'Ngọc', 'Nhi', 'Phong', 'Phúc', 'Quân', 'Sơn', 'Tâm', 'Thành', 'Thảo', 'Trang', 'Tuấn', 'Tú', 'Vinh', 'Yến'];
    
    const avatars = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60'
    ];

    const students = [
        {
            name: 'Nguyễn Văn A',
            code: '23050101',
            classCode: '2305CT01',
            avatar: avatars[0],
            exam: 'Quiz 1: SQL cơ bản',
            time: '00:18:24',
            status: 'Đang làm bài',
            tabSwitches: 3,
            focusLostSeconds: 15,
            copyPasteCount: 1,
            devtoolsOpened: 0,
            fullscreenExited: 1,
            riskLevel: 'warning', // 🟡 Cảnh báo
            timeline: [
                { time: '09:00', event: 'Bắt đầu', type: 'info', icon: '▶', detail: 'Vào bài thi & Kích hoạt Toàn màn hình (Fullscreen)' },
                { time: '09:05', event: 'Tab Out', type: 'warning', icon: '💻', detail: 'Chuyển tab khỏi cửa sổ thi (Lần thứ: 3)' },
                { time: '09:07', event: 'Copy', type: 'danger', icon: '📋', detail: 'Phát hiện thao tác Copy / Paste nội dung câu hỏi' },
                { time: '09:10', event: 'F12', type: 'danger', icon: '🚨', detail: '🚨 DevTools opened - Mở công cụ lập trình Inspect' },
                { time: '09:15', event: 'Submit', type: 'success', icon: '✅', detail: 'Nộp bài thi hoàn thành' }
            ]
        },
        {
            name: 'Trần Thị Bình',
            code: '23050102',
            classCode: '2305CT01',
            avatar: avatars[1],
            exam: 'Quiz 1: SQL cơ bản',
            time: '00:22:15',
            status: 'Đang làm bài',
            tabSwitches: 5,
            focusLostSeconds: 28,
            copyPasteCount: 2,
            devtoolsOpened: 0,
            fullscreenExited: 2,
            riskLevel: 'warning', // 🟡 Cảnh báo
            timeline: [
                { time: '09:00:10', event: 'Bắt đầu thi', type: 'info', icon: '▶', detail: 'Đã vào hệ thống thi trực tuyến' },
                { time: '09:03:45', event: 'Mất Focus cửa sổ', type: 'warning', icon: '👁‍🗨', detail: 'Mất focus 12 giây' },
                { time: '09:06:12', event: 'Chuyển tab liên tục', type: 'warning', icon: '💻', detail: 'Chuyển tab 3 lần liên tiếp' },
                { time: '09:10:30', event: 'Copy / Paste nội dung', type: 'danger', icon: '📋', detail: 'Phát hiện Ctrl+V câu trả lời từ nguồn ngoài' },
                { time: '09:18:02', event: 'Thoát Fullscreen (ESC)', type: 'warning', icon: '⚠️', detail: 'Ấn phím ESC rời màn hình thi' }
            ]
        },
        {
            name: 'Lê Minh Cường',
            code: '23050103',
            classCode: '2305CT01',
            avatar: avatars[2],
            exam: 'Quiz 1: SQL cơ bản',
            time: '00:15:42',
            status: 'Đang làm bài',
            tabSwitches: 7,
            focusLostSeconds: 45,
            copyPasteCount: 3,
            devtoolsOpened: 0,
            fullscreenExited: 3,
            riskLevel: 'warning', // 🟡 Cảnh báo
            timeline: [
                { time: '09:00:20', event: 'Bắt đầu làm bài', type: 'info', icon: '▶', detail: 'Bắt đầu tính giờ thi' },
                { time: '09:02:15', event: 'Chuyển tab khác', type: 'warning', icon: '💻', detail: 'Chuyển tab 7 lần liên tiếp' },
                { time: '09:06:40', event: 'Chuột phải (Right Click)', type: 'warning', icon: '🖱️', detail: 'Cố gắng xem menu chuột phải' },
                { time: '09:11:22', event: 'Thao tác Paste', type: 'danger', icon: '📋', detail: 'Dán văn bản từ ngoài vào ô tự luận' }
            ]
        },
        {
            name: 'Hoàng Quốc Dũng',
            code: '23050105',
            classCode: '2305CT01',
            avatar: avatars[4],
            exam: 'Quiz 1: SQL cơ bản',
            time: '00:21:30',
            status: 'Đang làm bài',
            tabSwitches: 9,
            focusLostSeconds: 90,
            copyPasteCount: 5,
            devtoolsOpened: 2,
            fullscreenExited: 4,
            riskLevel: 'danger',
            timeline: [
                { time: '09:00:05', event: 'Bắt đầu thi', type: 'info', icon: '▶', detail: 'Vào bài thi trắc nghiệm' },
                { time: '09:04:10', event: 'Mở DevTools (F12)', type: 'danger', icon: '🚨', detail: '🚨 DevTools opened - Nhấn F12 mở Inspect Element' },
                { time: '09:07:30', event: 'Copy / Paste nhiều lần', type: 'danger', icon: '📋', detail: 'Sao chép & dán đáp án tự động' },
                { time: '09:10:15', event: 'Mở DevTools lần thứ 2', type: 'danger', icon: '🚨', detail: '🚨 Mở DevTools chỉnh sửa mã nguồn' },
                { time: '09:15:00', event: 'Thoát Fullscreen & Chuyển tab', type: 'danger', icon: '⚠️', detail: 'Vi phạm nghiêm trọng quy chế thi' }
            ]
        }
    ];

    // Generate remaining 38 normal students
    for (let i = 5; i <= 42; i++) {
        const fam = familyNames[(i - 1) % familyNames.length];
        const mid = middleNames[(i * 3) % middleNames.length];
        const last = lastNames[(i * 7) % lastNames.length];
        const fullName = `${fam} ${mid} ${last}`;
        const code = `230501${String(i).padStart(2, '0')}`;
        const isFinished = i > 30;

        students.push({
            name: fullName,
            code: code,
            classCode: '2305CT01',
            avatar: avatars[i % avatars.length],
            exam: 'Quiz 1: SQL cơ bản',
            time: isFinished ? '--' : `00:${String(12 + (i % 25)).padStart(2, '0')}:${String((i * 9) % 60).padStart(2, '0')}`,
            status: isFinished ? 'Đã nộp bài <br><span style="font-size:10px;color:#94a3b8;">08:45:30</span>' : 'Đang làm bài',
            tabSwitches: 0,
            focusLostSeconds: 0,
            copyPasteCount: 0,
            devtoolsOpened: 0,
            fullscreenExited: 0,
            riskLevel: 'normal',
            timeline: [
                { time: '09:00:00', event: 'Bắt đầu làm bài thi', type: 'info', icon: '▶', detail: 'Mở đề thi & Bật giám sát Toàn màn hình (Fullscreen)' },
                { time: isFinished ? '08:45:30' : '09:15:00', event: isFinished ? 'Nộp bài thi thành công' : 'Đang làm bài nghiêm túc', type: 'success', icon: '✅', detail: 'Không phát hiện bất kỳ hành vi vi phạm nào' }
            ]
        });
    }

    return students;
}

const mockAntiCheatUsers = generate42AntiCheatStudents();

const mockAntiCheatLogs = [
    { name: 'Hoàng Quốc Dũng', desc: '🚨 DevTools opened - Nhấn F12 / Inspect Element', exam: 'Quiz 1: SQL cơ bản', time: '09:10:15', icon: '🚨', color: '#ef4444', bg: '#fee2e2' },
    { name: 'Nguyễn Văn A', desc: 'Chuyển tab khỏi cửa sổ thi (Lần thứ: 3)', exam: 'Quiz 1: SQL cơ bản', time: '09:15:20', icon: '💻', color: '#eab308', bg: '#fef9c3' },
    { name: 'Trần Thị Bình', desc: 'Mất focus cửa sổ thi 28 giây (Click ngoài Desktop)', exam: 'Quiz 1: SQL cơ bản', time: '09:03:45', icon: '👁‍🗨', color: '#f97316', bg: '#ffedd5' },
    { name: 'Lê Minh Cường', desc: 'Thao tác Copy / Paste nội dung 3 lần', exam: 'Quiz 1: SQL cơ bản', time: '09:11:22', icon: '📋', color: '#f97316', bg: '#ffedd5' },
    { name: 'Hoàng Quốc Dũng', desc: 'Thoát chế độ Toàn màn hình (Fullscreen ESC)', exam: 'Quiz 1: SQL cơ bản', time: '09:15:00', icon: '⚠️', color: '#dc2626', bg: '#fee2e2' }
];

const mockSevereViolations = [
    { name: 'Hoàng Quốc Dũng', code: '23050105', desc: '🚨 DevTools opened, Copy/Paste 5 lần, Thoát Fullscreen', time: '09:10:15' },
    { name: 'Lê Minh Cường', code: '23050103', desc: 'Chuyển tab 7 lần, Mất focus 45 giây', time: '09:02:15' }
];

window.showLecturerAntiCheatSubView = function() {
    try {
        const lecView = document.getElementById('view-lecturer');
        if (lecView && lecView.classList.contains('hidden')) {
            lecView.classList.remove('hidden');
            lecView.style.setProperty('display', 'block', 'important');
        }

        hideAllLecturerSubviews();

        const antiCheatSubview = document.getElementById('lec-anti-cheat-subview');
        if (antiCheatSubview) {
            antiCheatSubview.classList.remove('hidden');
            antiCheatSubview.style.setProperty('display', 'block', 'important');
        }

        const mAntiCheat = document.getElementById('lec-menu-anti-cheat');
        if (mAntiCheat) mAntiCheat.classList.add('active');

        renderAntiCheatTable();
        renderAntiCheatLogs();
        renderAntiCheatSevere();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(err) {
        console.error("Error showing Anti-Cheat subview:", err);
    }
};

window.renderAntiCheatTable = function() {
    const tbody = document.getElementById('anti-cheat-table-tbody');
    if (!tbody) return;

    const searchVal = (document.getElementById('anti-cheat-search')?.value || '').toLowerCase().trim();
    const statusVal = document.getElementById('anti-cheat-status-filter')?.value || '';

    const filtered = mockAntiCheatUsers.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchVal) || u.code.includes(searchVal);
        const matchesStatus = !statusVal || u.status.includes(statusVal);
        return matchesSearch && matchesStatus;
    });

    let html = '';
    filtered.forEach((u) => {
        // Ensure u has lock/start properties
        if (typeof u.locked === 'undefined') u.locked = false;
        if (!u.startTime) {
            u.startTime = u.code === '23050101' ? '09:00:00' :
                          u.code === '23050102' ? '09:00:10' :
                          u.code === '23050103' ? '09:00:20' :
                          u.code === '23050105' ? '09:00:05' : '09:00:15';
        }

        // Parse elapsed time if not present
        if (typeof u.elapsedSeconds === 'undefined') {
            const parts = u.time.split(':');
            if (parts.length === 3) {
                u.elapsedSeconds = parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
            } else if (parts.length === 2) {
                u.elapsedSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
            } else {
                u.elapsedSeconds = 18 * 60 + 24;
            }
        }

        // Set default submitTime for completed students if not present
        if (!u.submitTime) {
            u.submitTime = u.status.includes('Đã nộp') ? '08:45:30' : '--';
        }

        // Adjust display based on lock status
        let currentStatus = u.status;
        if (u.locked) {
            currentStatus = 'Đã khóa bài (Vi phạm)';
        }

        // 1. Chuyển tab badge
        let tabBadge = '';
        if (u.tabSwitches > 5) {
            tabBadge = `<span style="background: #fee2e2; color: #dc2626; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">${u.tabSwitches} lần</span>`;
        } else if (u.tabSwitches > 0) {
            tabBadge = `<span style="background: #fef3c7; color: #b45309; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">${u.tabSwitches} lần</span>`;
        } else {
            tabBadge = `<span style="background: #f1f5f9; color: #64748b; padding: 4px 8px; border-radius: 6px; font-weight: 500; font-size: 12px; display: inline-block;">0</span>`;
        }

        // 2. Mất focus badge
        let focusBadge = '';
        if (u.focusLostSeconds > 30) {
            focusBadge = `<span style="background: #fee2e2; color: #dc2626; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">${u.focusLostSeconds} giây</span>`;
        } else if (u.focusLostSeconds > 0) {
            focusBadge = `<span style="background: #fff7ed; color: #c2410c; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">${u.focusLostSeconds} giây</span>`;
        } else {
            focusBadge = `<span style="background: #f1f5f9; color: #64748b; padding: 4px 8px; border-radius: 6px; font-weight: 500; font-size: 12px; display: inline-block;">0</span>`;
        }

        // 3. Copy / Paste badge
        let copyBadge = '';
        if (u.copyPasteCount > 3) {
            copyBadge = `<span style="background: #fee2e2; color: #dc2626; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">${u.copyPasteCount} lần</span>`;
        } else if (u.copyPasteCount > 0) {
            copyBadge = `<span style="background: #fff7ed; color: #ea580c; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">${u.copyPasteCount} lần</span>`;
        } else {
            copyBadge = `<span style="background: #f1f5f9; color: #64748b; padding: 4px 8px; border-radius: 6px; font-weight: 500; font-size: 12px; display: inline-block;">0</span>`;
        }

        // 4. DevTools badge
        let devtoolsBadge = '';
        if (u.devtoolsOpened > 0) {
            devtoolsBadge = `<span style="background: #fee2e2; color: #dc2626; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 12px; display: inline-block;">Phát hiện (${u.devtoolsOpened})</span>`;
        } else {
            devtoolsBadge = `<span style="background: #f0fdf4; color: #16a34a; padding: 4px 10px; border-radius: 6px; font-weight: 500; font-size: 12px; display: inline-block;">Bình thường</span>`;
        }

        // 5. Fullscreen badge
        let fullscreenBadge = '';
        const exits = u.fullscreenExited || (u.tabSwitches > 5 ? 2 : u.tabSwitches > 0 ? 1 : 0);
        if (exits > 0) {
            fullscreenBadge = `<span style="background: #fee2e2; color: #b91c1c; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">Thoát (${exits})</span>`;
        } else {
            fullscreenBadge = `<span style="background: #f0fdf4; color: #16a34a; padding: 4px 8px; border-radius: 6px; font-weight: 500; font-size: 12px; display: inline-block;">Toàn màn hình</span>`;
        }

        // 6. Reload badge
        let reloadBadge = '';
        const reloads = (u.tabSwitches > 5 ? 2 : u.tabSwitches > 0 ? 1 : 0);
        if (reloads > 0) {
            reloadBadge = `<span style="background: #fef3c7; color: #b45309; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block;">F5 (${reloads})</span>`;
        } else {
            reloadBadge = `<span style="background: #f1f5f9; color: #64748b; padding: 4px 8px; border-radius: 6px; font-weight: 500; font-size: 12px; display: inline-block;">0</span>`;
        }

        // 7. Lock Button details
        let lockButton = '';
        if (u.locked) {
            lockButton = `<button type="button" class="btn-action-outline" style="white-space: nowrap; padding: 4px 10px; border-radius: 8px; font-size: 12px; border: 1px solid #dc2626; color: #dc2626; background: #fef2f2; height: 30px; cursor: pointer; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 4px;" onclick="toggleLockStudent('${u.code}')">Mở khóa</button>`;
        } else {
            lockButton = `<button type="button" class="btn-action-outline" style="white-space: nowrap; padding: 4px 10px; border-radius: 8px; font-size: 12px; border: 1px solid #475569; color: #475569; background: #f1f5f9; height: 30px; cursor: pointer; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 4px;" onclick="toggleLockStudent('${u.code}')">Khóa bài</button>`;
        }

        const statusColor = u.locked ? '#dc2626' : (u.status.includes('Đang') ? '#10b981' : '#64748b');
        const statusDotBg = u.locked ? '#dc2626' : (u.status.includes('Đang') ? '#10b981' : '#cbd5e1');

        // Column 2 ("Bắt đầu") shows elapsed stopwatch ticking up for active students
        const elapsedText = u.status.includes('Đang') && !u.locked ? 
            `<strong style="color: #2563eb; font-size: 13px;">${u.time}</strong>` : 
            `<strong style="color: #64748b; font-size: 13px;">${u.status.includes('Đã nộp') ? 'Đã nộp' : 'Đã khóa'}</strong>`;

        // Column 3 ("Kết thúc") shows exact recorded submission timestamp upon finish/submit
        let endTimeText = '';
        if (u.status.includes('Đã nộp')) {
            endTimeText = `<strong style="color: #10b981; font-size: 13px;">${u.submitTime || '08:45:30'}</strong>`;
        } else if (u.locked) {
            endTimeText = `<strong style="color: #dc2626; font-size: 13px;">Đã khóa</strong>`;
        } else {
            endTimeText = `<span style="color: #94a3b8; font-weight: 500; font-size: 13px;">--</span>`;
        }

        html += `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${u.avatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                        <div>
                            <strong class="tbl-qtext" style="color: #0f172a; display: block; margin-bottom: 2px;">${u.name}</strong>
                            <span style="font-size: 11px; color: #64748b; font-weight: 600;">Mã SV: ${u.code}</span>
                        </div>
                    </div>
                </td>
                <td>${elapsedText}</td>
                <td>${endTimeText}</td>
                <td>
                    <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: ${statusColor};">
                        <span style="width: 8px; height: 8px; border-radius: 50%; background: ${statusDotBg}; display: inline-block;"></span>
                        ${currentStatus}
                    </span>
                </td>
                <td style="text-align: center;">${tabBadge}</td>
                <td style="text-align: center;">${focusBadge}</td>
                <td style="text-align: center;">${copyBadge}</td>
                <td style="text-align: center;">${devtoolsBadge}</td>
                <td style="text-align: center;">${fullscreenBadge}</td>
                <td style="text-align: center;">${reloadBadge}</td>
                <td style="text-align: right;">${lockButton}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
};

window.toggleLockStudent = function(studentCode) {
    const student = mockAntiCheatUsers.find(u => u.code === studentCode);
    if (!student) return;

    if (student.locked) {
        if (confirm(`Bạn có muốn MỞ KHÓA bài làm cho sinh viên ${student.name} (MSSV: ${student.code}) không?`)) {
            student.locked = false;
            student.status = 'Đang làm bài';
            renderAntiCheatTable();
        }
    } else {
        if (confirm(`⚠️ Bạn có chắc chắn muốn KHÓA BÀI THI của sinh viên ${student.name} (MSSV: ${student.code}) do phát hiện quá nhiều hành vi vi phạm quy chế không?\nSinh viên bị khóa sẽ không thể tiếp tục trả lời câu hỏi.`)) {
            student.locked = true;
            student.status = 'Đã khóa bài (Vi phạm)';
            renderAntiCheatTable();
        }
    }
};

window.openStudentTimelineModal = function(studentCode) {
    try {
        console.log("Opening student timeline modal for studentCode:", studentCode);
        const modal = document.getElementById('student-timeline-modal');
        if (!modal) {
            console.error("Modal element #student-timeline-modal not found!");
            return;
        }

        const student = mockAntiCheatUsers.find(u => u.code === studentCode) || mockAntiCheatUsers[0] || { name: 'Nguyễn Văn A', code: '23050101', classCode: '2305CT01', exam: 'Quiz 1: SQL cơ bản', tabSwitches: 3, focusLostSeconds: 15, copyPasteCount: 1, devtoolsOpened: 1, riskLevel: 'warning' };

        const titleEl = document.getElementById('st-modal-title');
        const subtitleEl = document.getElementById('st-modal-subtitle');
        const tabCountEl = document.getElementById('st-tab-count');
        const focusTimeEl = document.getElementById('st-focus-time');
        const copyCountEl = document.getElementById('st-copy-count');
        const devtoolsCountEl = document.getElementById('st-devtools-count');
        const riskLevelEl = document.getElementById('st-risk-level');
        const timelineListEl = document.getElementById('st-timeline-list');

        if (titleEl) titleEl.textContent = `Timeline hành vi: ${student.name}`;
        if (subtitleEl) subtitleEl.textContent = `MSSV: ${student.code} • Lớp: ${student.classCode || '2305CT01'} • Bài thi: ${student.exam || 'Quiz 1: SQL cơ bản'}`;
        if (tabCountEl) tabCountEl.textContent = `${student.tabSwitches || 0} lần`;
        if (focusTimeEl) focusTimeEl.textContent = `${student.focusLostSeconds || 0} giây`;
        if (copyCountEl) copyCountEl.textContent = `${student.copyPasteCount || 0} lần`;
        if (devtoolsCountEl) devtoolsCountEl.textContent = `${student.devtoolsOpened || 0} lần`;

        if (riskLevelEl) {
            if (student.riskLevel === 'normal') {
                riskLevelEl.innerHTML = `Đánh giá rủi ro: <strong style="color: #10b981;">🟢 Bình thường (An toàn)</strong>`;
            } else if (student.riskLevel === 'warning') {
                riskLevelEl.innerHTML = `Đánh giá rủi ro: <strong style="color: #d97706;">🟡 Cảnh báo (Chuyển tab ${student.tabSwitches || 0} lần)</strong>`;
            } else {
                riskLevelEl.innerHTML = `Đánh giá rủi ro: <strong style="color: #dc2626;">🔴 Vi phạm gian lận nghiêm trọng (Mở DevTools)</strong>`;
            }
        }

        if (timelineListEl) {
            const activityStream = [
                { name: 'Nguyễn Văn A', code: '23050101', event: 'Bắt đầu làm bài', badgeStyle: 'background: #eff6ff; color: #2563eb; border: 1px solid #dbeafe;', time: '13:14:33' },
                { name: 'Trần Thị Bình', code: '23050102', event: '⚠️ Chuyển tab', badgeStyle: 'background: #fffbeb; color: #d97706; border: 1px solid #fef3c7;', time: '13:15:50' },
                { name: 'Lê Minh Cường', code: '23050103', event: '⚠️ Mất Focus', badgeStyle: 'background: #fff7ed; color: #c2410c; border: 1px solid #ffedd5;', time: '13:18:21' },
                { name: 'Phạm Văn D', code: '23050104', event: '⚠️ Refresh trang', badgeStyle: 'background: #fff7ed; color: #ea580c; border: 1px solid #ffedd5;', time: '13:22:40' },
                { name: 'Hoàng Quốc Dũng', code: '23050105', event: '🚨 Mở DevTools (F12)', badgeStyle: 'background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2;', time: '13:25:10' },
                { name: 'Vũ Hải Đăng', code: '23050106', event: '⚠️ Thoát Fullscreen', badgeStyle: 'background: #fef2f2; color: #b91c1c; border: 1px solid #fee2e2;', time: '13:28:05' },
                { name: 'Nguyễn Tiến Đạt', code: '23050107', event: '✅ Nộp bài thi', badgeStyle: 'background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7;', time: '13:30:15' }
            ];

            let html = '';
            activityStream.forEach((item) => {
                html += `
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <strong style="font-size: 16px; color: #0f172a; font-weight: 800;">${item.name}</strong>
                            <span style="font-size: 12.5px; font-weight: 700; padding: 4px 12px; border-radius: 8px; ${item.badgeStyle}">
                                ${item.event}
                            </span>
                        </div>
                        
                        <div style="text-align: center; margin: 12px 0 8px 0; color: #94a3b8; font-weight: 700; font-size: 11px; letter-spacing: 1px;">
                            ──────────────────
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 11.5px; color: #64748b; font-weight: 600;">Mã SV: ${item.code}</span>
                            <strong style="font-size: 13px; color: #334155; font-weight: 800; background: #f1f5f9; padding: 3px 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                ${item.time}
                            </strong>
                        </div>
                    </div>
                `;
            });
            timelineListEl.innerHTML = html;
        }

        modal.classList.remove('hidden');
        modal.style.setProperty('display', 'flex', 'important');
        modal.style.setProperty('visibility', 'visible', 'important');
        modal.style.setProperty('opacity', '1', 'important');
        modal.style.setProperty('pointer-events', 'auto', 'important');
    } catch(err) {
        console.error("Error opening timeline modal:", err);
    }
};

window.closeStudentTimelineModal = function() {
    const modal = document.getElementById('student-timeline-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
        modal.style.setProperty('visibility', 'hidden', 'important');
        modal.style.setProperty('opacity', '0', 'important');
        modal.style.setProperty('pointer-events', 'none', 'important');
    }
};

// LIVE REAL-TIME CLIENT MONITORING EVENT LISTENERS FOR TESTING
let liveTabSwitchCount = 0;
let liveFocusLostStart = 0;

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        liveTabSwitchCount++;
        liveFocusLostStart = Date.now();
        console.warn(`[Anti-Cheat Proctoring] ⚠️ Chuyển tab / Đã rời khỏi tab thi (Lần thứ: ${liveTabSwitchCount})`);
    } else {
        const lostSec = Math.round((Date.now() - liveFocusLostStart) / 1000) || 1;
        console.log(`[Anti-Cheat Proctoring] 👁 Mất focus trở lại: ${lostSec} giây`);
    }
});

document.addEventListener('copy', function() {
    console.warn('[Anti-Cheat Proctoring] ⚠️ Phát hiện thao tác Copy (Ctrl+C)');
});

document.addEventListener('paste', function() {
    console.warn('[Anti-Cheat Proctoring] ⚠️ Phát hiện thao tác Paste (Ctrl+V)');
});

document.addEventListener('contextmenu', function() {
    console.warn('[Anti-Cheat Proctoring] ⚠️ Phát hiện mở menu Chuột phải');
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i'))) {
        console.error('[Anti-Cheat Proctoring] 🚨 DevTools opened - Phát hiện phím F12 / Inspect Element');
    }
    if (e.key === 'F5' || (e.ctrlKey && (e.key === 'r' || e.key === 'R'))) {
        console.warn('[Anti-Cheat Proctoring] ⚠️ Phát hiện thao tác Reload trang (F5 / Ctrl+R)');
    }
});

window.renderAntiCheatLogs = function() {
    const container = document.getElementById('anti-cheat-log-container');
    if (!container) return;

    let html = '';
    mockAntiCheatLogs.forEach(l => {
        html += `
            <div style="display: flex; gap: 12px; align-items: flex-start; font-size: 12.5px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                <div style="width: 32px; height: 32px; border-radius: 8px; background: ${l.bg}; color: ${l.color}; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;">
                    ${l.icon}
                </div>
                <div style="flex: 1;">
                    <strong style="color: #0f172a;">${l.name}</strong>
                    <p style="margin: 2px 0; color: #475569;">${l.desc}</p>
                    <span style="font-size: 10.5px; color: #94a3b8; font-weight: 500;">${l.exam}</span>
                </div>
                <span style="font-size: 11px; color: #94a3b8; font-weight: 600;">${l.time}</span>
            </div>
        `;
    });

    container.innerHTML = html;
};

window.renderAntiCheatSevere = function() {
    const container = document.getElementById('anti-cheat-severe-container');
    if (!container) return;

    let html = '';
    mockSevereViolations.forEach(v => {
        html += `
            <div style="background: #fff5f5; border: 1px solid #fed7d7; border-radius: 12px; padding: 12px; display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #f53f3f; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">⚠️</div>
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                        <strong style="color: #c53030; font-size: 13px;">${v.name}</strong>
                        <span style="font-size: 10.5px; color: #94a3b8; font-weight: 600;">${v.time}</span>
                    </div>
                    <span style="font-size: 11px; color: #742a2a; display: block; margin-bottom: 2px; font-weight: 600;">Mã SV: ${v.code}</span>
                    <p style="margin: 0; font-size: 11.5px; color: #742a2a;">${v.desc}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
};

// ==========================================
// POP-UP MODAL HANDLERS FOR HOẠT ĐỘNG GẦN ĐÂY
// ==========================================
window.openRecentQuizPreview = function(title = 'Quiz Chương 3', classCode = '2305CT01') {
    const modal = document.getElementById('recent-quiz-modal');
    if (modal) {
        const titleEl = document.getElementById('rq-title');
        const classEl = document.getElementById('rq-class');
        if (titleEl) titleEl.textContent = title;
        if (classEl) classEl.textContent = `${classCode} (42 sinh viên)`;

        modal.classList.remove('hidden');
        modal.style.setProperty('display', 'flex', 'important');
    }
};

window.closeRecentQuizModal = function() {
    const modal = document.getElementById('recent-quiz-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
    }
};

window.openExpiringExamsModal = function() {
    const modal = document.getElementById('expiring-exams-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.setProperty('display', 'flex', 'important');
    }
};

window.closeExpiringExamsModal = function() {
    const modal = document.getElementById('expiring-exams-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
    }
};

window.openUngradedExamsModal = function() {
    const modal = document.getElementById('ungraded-exams-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.setProperty('display', 'flex', 'important');
    }
};

window.closeUngradedExamsModal = function() {
    const modal = document.getElementById('ungraded-exams-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
    }
};

window.extendExamTime = function(examName) {
    alert(`⏳ Đã gia hạn thành công thêm 7 ngày cho bài thi "${examName}"!`);
};

window.gradeStudentEssay = function(studentName, examName) {
    const score = prompt(`Giảng viên nhập điểm tự luận cho sinh viên ${studentName} (${examName}) [0 - 10]:`, "8.5");
    if (score !== null && score.trim() !== '') {
        alert(`✅ Đã lưu điểm ${score} cho sinh viên ${studentName}!`);
    }
};

window.autoGradeWithAI = function() {
    alert("🤖 AI đang phân tích và chấm điểm tự động cho 12 bài thi tự luận dựa trên đáp án chuẩn...");
    setTimeout(() => {
        alert("🎉 AI đã chấm điểm thành công toàn bộ 12/12 bài thi tự luận! Điểm bình quân lớp: 8.4/10");
        closeUngradedExamsModal();
    }, 1500);
};

document.addEventListener("DOMContentLoaded", () => {
    initAppSession();

    // Render anti-cheat proctoring data immediately on load
    if (typeof renderAntiCheatTable === 'function') renderAntiCheatTable();
    if (typeof renderAntiCheatLogs === 'function') renderAntiCheatLogs();
    if (typeof renderAntiCheatSevere === 'function') renderAntiCheatSevere();

    // Real-time ticking clock stopwatch and countdown
    setInterval(() => {
        if (typeof mockAntiCheatUsers !== 'undefined' && Array.isArray(mockAntiCheatUsers)) {
            mockAntiCheatUsers.forEach(u => {
                if (u.status === 'Đang làm bài' && !u.locked) {
                    if (typeof u.elapsedSeconds === 'undefined') {
                        const parts = u.time.split(':');
                        if (parts.length === 3) {
                            u.elapsedSeconds = parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
                        } else if (parts.length === 2) {
                            u.elapsedSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
                        } else {
                            u.elapsedSeconds = 18 * 60 + 24;
                        }
                    }
                    u.elapsedSeconds++;

                    // Format elapsed time (ticking up)
                    const eh = Math.floor(u.elapsedSeconds / 3600);
                    const em = Math.floor((u.elapsedSeconds % 3600) / 60);
                    const es = u.elapsedSeconds % 60;
                    u.time = `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}:${String(es).padStart(2, '0')}`;
                }
            });

            if (typeof renderAntiCheatTable === 'function') {
                renderAntiCheatTable();
            }
        }
    }, 1000);

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            navigateTo(hash);
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target && (e.target.id === 'link-open-register' || e.target.closest('#link-open-register'))) {
            e.preventDefault();
            e.stopPropagation();
            showRegisterModal(e);
        }
    });
});