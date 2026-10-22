// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // 导航栏阴影
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
    }

    // 返回顶部按钮
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // 导航高亮
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== 移动端菜单 =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});
navLinks.forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
});

// ===== 返回顶部 =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 数字滚动动画 =====
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-num, .data-num');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        update();
    });
}

// 元素进入视口触发
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('overview-stats') || entry.target.classList.contains('data-grid')) {
                animateNumbers();
            }
            // 营养条动画
            if (entry.target.classList.contains('nutrition-grid')) {
                document.querySelectorAll('.nutrition-fill').forEach(fill => {
                    fill.style.width = fill.style.width;
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.overview-stats, .data-grid, .nutrition-grid').forEach(el => {
    observer.observe(el);
});

// ===== 生长之旅四季切换 =====
const growthTabs = document.querySelectorAll('.growth-tab');
const growthStages = document.querySelectorAll('.growth-stage');
growthTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const season = tab.getAttribute('data-season');
        growthTabs.forEach(t => t.classList.remove('active'));
        growthStages.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`.growth-stage[data-season="${season}"]`).classList.add('active');
    });
});

// ===== 虚拟摘苹果游戏 =====
const startGameBtn = document.getElementById('startGame');
const gameCrown = document.getElementById('gameCrown');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
let gameRunning = false;
let gameScore = 0;
let gameTime = 30;
let gameTimer = null;
let appleInterval = null;

function spawnApple() {
    const apple = document.createElement('span');
    apple.className = 'game-apple';
    apple.textContent = '🍎';
    const size = 200;
    const x = Math.random() * (size - 40) + 10;
    const y = Math.random() * (size - 40) + 10;
    apple.style.left = x + 'px';
    apple.style.top = y + 'px';
    apple.addEventListener('click', () => {
        if (!gameRunning) return;
        gameScore++;
        scoreEl.textContent = gameScore;
        apple.style.transform = 'scale(0)';
        apple.style.opacity = '0';
        setTimeout(() => apple.remove(), 200);
    });
    gameCrown.appendChild(apple);
    setTimeout(() => apple.remove(), 1500);
}

startGameBtn.addEventListener('click', () => {
    if (gameRunning) return;
    gameRunning = true;
    gameScore = 0;
    gameTime = 30;
    scoreEl.textContent = '0';
    timerEl.textContent = '30';
    startGameBtn.textContent = '游戏中...';
    startGameBtn.disabled = true;
    gameCrown.innerHTML = '';

    appleInterval = setInterval(spawnApple, 400);
    gameTimer = setInterval(() => {
        gameTime--;
        timerEl.textContent = gameTime;
        if (gameTime <= 0) {
            clearInterval(gameTimer);
            clearInterval(appleInterval);
            gameRunning = false;
            startGameBtn.textContent = '再玩一次';
            startGameBtn.disabled = false;
            gameCrown.innerHTML = `<p style="color:#fff;text-align:center;padding-top:80px;font-size:18px;">时间到！你摘了 <strong style="color:#d63031;">${gameScore}</strong> 个苹果</p>`;
        }
    }, 1000);
});

// ===== 知识问答 =====
const startQuizBtn = document.getElementById('startQuiz');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizResult = document.getElementById('quizResult');

const questions = [
    {
        q: '千阳县位于陕西省哪个市？',
        options: ['西安市', '宝鸡市', '咸阳市', '渭南市'],
        answer: 1,
        explain: '千阳县隶属于陕西省宝鸡市，地处渭北旱塬丘陵沟壑区。'
    },
    {
        q: '千阳苹果的主栽晚熟品种是？',
        options: ['嘎啦', '红富士', '澳洲青苹', '黄元帅'],
        answer: 1,
        explain: '红富士是千阳县的主栽品种，10月中下旬成熟。'
    },
    {
        q: '千阳苹果进行了几次航天搭载育种实验？',
        options: ['3次', '4次', '6次', '8次'],
        answer: 2,
        explain: '千阳苹果共进行了6次航天搭载育种实验，培育出多个优良新品种。'
    },
    {
        q: '苹果中哪种营养成分有助于促进消化？',
        options: ['维生素C', '膳食纤维', '糖分', '钾'],
        answer: 1,
        explain: '膳食纤维能促进肠道蠕动，帮助消化，预防便秘。'
    }
];

let currentQuiz = 0;
let quizScore = 0;
let quizAnswered = false;

function showQuestion() {
    quizAnswered = false;
    const q = questions[currentQuiz];
    quizQuestion.textContent = `第 ${currentQuiz + 1}/${questions.length} 题：${q.q}`;
    quizOptions.innerHTML = '';
    quizResult.textContent = '';
    quizResult.className = 'quiz-result';
    q.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'quiz-option';
        div.textContent = opt;
        div.addEventListener('click', () => selectOption(i, div));
        quizOptions.appendChild(div);
    });
}

function selectOption(idx, el) {
    if (quizAnswered) return;
    quizAnswered = true;
    const q = questions[currentQuiz];
    document.querySelectorAll('.quiz-option').forEach((o, i) => {
        if (i === q.answer) o.classList.add('correct');
        if (i === idx && idx !== q.answer) o.classList.add('wrong');
    });
    if (idx === q.answer) {
        quizScore++;
        quizResult.textContent = '✅ 回答正确！' + q.explain;
        quizResult.classList.add('correct');
    } else {
        quizResult.textContent = '❌ 回答错误。' + q.explain;
        quizResult.classList.add('wrong');
    }
    currentQuiz++;
    setTimeout(() => {
        if (currentQuiz < questions.length) {
            showQuestion();
        } else {
            quizQuestion.textContent = `答题结束！你答对了 ${quizScore}/${questions.length} 题`;
            quizOptions.innerHTML = '';
            quizResult.textContent = quizScore === questions.length ? '🎉 太棒了！你是千阳苹果小达人！' : '💪 再接再厉，多了解千阳苹果哦！';
            quizResult.className = 'quiz-result correct';
            startQuizBtn.textContent = '重新答题';
            startQuizBtn.style.display = 'inline-block';
            currentQuiz = 0;
            quizScore = 0;
        }
    }, 1500);
}

startQuizBtn.addEventListener('click', () => {
    startQuizBtn.style.display = 'none';
    showQuestion();
});

// ===== 留言板 =====
const messageForm = document.getElementById('messageForm');
const msgName = document.getElementById('msgName');
const msgContent = document.getElementById('msgContent');
const charCount = document.getElementById('charCount');
const messageList = document.getElementById('messageList');

msgContent.addEventListener('input', () => {
    charCount.textContent = msgContent.value.length;
});

function renderMessages() {
    const messages = JSON.parse(localStorage.getItem('qianyang_messages') || '[]');
    if (messages.length === 0) {
        messageList.innerHTML = '<p class="no-message">还没有留言，快来抢沙发吧~</p>';
        return;
    }
    messageList.innerHTML = messages.map(m => `
        <div class="message-item">
            <div class="message-header">
                <span class="message-name">${escapeHtml(m.name)}</span>
                <span class="message-time">${m.time}</span>
            </div>
            <div class="message-content">${escapeHtml(m.content)}</div>
        </div>
    `).join('');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = msgName.value.trim();
    const content = msgContent.value.trim();
    if (!name || !content) return;
    const messages = JSON.parse(localStorage.getItem('qianyang_messages') || '[]');
    messages.unshift({
        name,
        content,
        time: new Date().toLocaleString('zh-CN', { hour12: false })
    });
    localStorage.setItem('qianyang_messages', JSON.stringify(messages.slice(0, 30)));
    msgName.value = '';
    msgContent.value = '';
    charCount.textContent = '0';
    renderMessages();
});

renderMessages();

// ===== 溯源查询与预约采摘 =====
const traceBtn = document.getElementById('traceBtn');
const traceCode = document.getElementById('traceCode');
const traceResult = document.getElementById('traceResult');

const traceDB = {
    QY20261015001: {
        status: '溯源有效 · 官方示范批次',
        origin: '陕西省宝鸡市千阳县城关镇矮砧密植示范园',
        variety: '红富士',
        pick: '2026-10-15',
        test: '农残抽检合格｜糖度 15.2°Brix｜优果一级',
        flow: ['10月15日 清晨采摘，2小时内进入冷库预冷', '10月16日 光电分选，按果径/色泽/瑕疵分级', '10月17日 抽检合格，粘贴溯源码并装箱', '10月18日 冷链发往西安仓与线上订单仓']
    },
    QY20261008002: {
        status: '溯源有效 · 研学基地批次',
        origin: '陕西省宝鸡市千阳县草碧镇研学体验基地',
        variety: '秦冠',
        pick: '2026-10-08',
        test: '农残抽检合格｜糖度 14.6°Brix｜优果一级',
        flow: ['10月08日 分批采摘，保留果柄减少磕碰', '10月09日 田间初选与瑕疵剔除', '10月10日 基地冷库预冷与分级包装', '10月11日 冷链发往宝鸡展销中心']
    },
    QY20260920003: {
        status: '溯源有效 · 早熟品种批次',
        origin: '陕西省宝鸡市千阳县南寨镇标准化果园',
        variety: '嘎啦',
        pick: '2026-09-20',
        test: '农残抽检合格｜糖度 13.8°Brix｜优果二级',
        flow: ['09月20日 早熟品种错峰采收', '09月21日 分选后进入0-4℃保鲜库', '09月22日 完成装箱与溯源绑定', '09月23日 发往社区团购与商超专柜']
    }
};

function initTraceQuery() {
    if (!traceBtn || !traceCode || !traceResult) return;

    function showTrace() {
        const code = traceCode.value.trim().toUpperCase();
        traceResult.classList.add('show');

        if (code.length < 6) {
            traceResult.classList.add('error');
            traceResult.textContent = '请输入包装上的有效溯源码（至少 6 位）。';
            return;
        }

        const batch = traceDB[code] || {
            status: '格式有效 · 演示系统未收录该批次',
            origin: '陕西省宝鸡市千阳县（待接入真实基地数据）',
            variety: '待同步',
            pick: '待同步',
            test: '待接入真实检测数据',
            flow: ['溯源码格式校验通过', '当前页面仍为本地演示数据', '接入真实溯源系统后可返回完整流通节点']
        };

        traceResult.classList.remove('error');
        traceResult.innerHTML = `
            <span class="trace-badge">✓ ${batch.status}</span>
            <div class="trace-meta">
                <div><strong>产地</strong>${batch.origin}</div>
                <div><strong>品种</strong>${batch.variety}</div>
                <div><strong>采摘时间</strong>${batch.pick}</div>
                <div><strong>检测结果</strong>${batch.test}</div>
            </div>
            <ul class="trace-flow">
                ${batch.flow.map(step => `<li>${step}</li>`).join('')}
            </ul>
        `;
    }

    traceBtn.addEventListener('click', showTrace);
    traceCode.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            showTrace();
        }
    });
    document.querySelectorAll('.trace-samples [data-code]').forEach(btn => {
        btn.addEventListener('click', () => {
            traceCode.value = btn.getAttribute('data-code');
            showTrace();
        });
    });
}

initTraceQuery();

// ===== 预约采摘 / 研学报名 =====
const bookingModal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const bookingTitle = document.getElementById('bookingTitle');
const bookingType = document.getElementById('bookingType');
const bookingBase = document.getElementById('bookingBase');
const bookingDate = document.getElementById('bookingDate');
const bookingPeople = document.getElementById('bookingPeople');
const bookingName = document.getElementById('bookingName');
const bookingPhone = document.getElementById('bookingPhone');
const bookingNote = document.getElementById('bookingNote');
const bookingError = document.getElementById('bookingError');
const bookingSuccess = document.getElementById('bookingSuccess');
const bookingList = document.getElementById('bookingList');
const clearBookings = document.getElementById('clearBookings');
const BOOKING_KEY = 'qianyang_bookings';

function getBookings() {
    try {
        return JSON.parse(localStorage.getItem(BOOKING_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveBookings(list) {
    localStorage.setItem(BOOKING_KEY, JSON.stringify(list.slice(0, 30)));
}

function formatDateLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function makeBookingNo() {
    const day = formatDateLocal(new Date()).replace(/-/g, '');
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `QY${day}-${random}`;
}

function openBooking(type) {
    bookingForm.hidden = false;
    bookingError.textContent = '';
    bookingSuccess.classList.remove('show');
    bookingSuccess.innerHTML = '';
    bookingType.value = type;
    bookingTitle.textContent = type === '亲子研学' ? '研学报名' : type;
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeBooking() {
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function renderBookings() {
    if (!bookingList) return;
    const list = getBookings();

    if (list.length === 0) {
        bookingList.innerHTML = '<div class="booking-empty">还没有预约。点击上方“预约采摘 / 研学报名 / 基地参观”即可创建。</div>';
        return;
    }

    bookingList.innerHTML = list.map(item => `
        <div class="booking-item">
            <div>
                <h4>${escapeHtml(item.type)} · ${escapeHtml(item.base)}</h4>
                <p><span class="booking-no">${item.no}</span>｜${item.date}｜${item.people} 人</p>
                <p>联系人：${escapeHtml(item.name)} ${escapeHtml(item.phone)}${item.note ? '｜备注：' + escapeHtml(item.note) : ''}</p>
            </div>
            <button class="booking-cancel" type="button" data-cancel-booking="${item.id}">取消预约</button>
        </div>
    `).join('');
}

function initBooking() {
    if (!bookingModal || !bookingForm) return;

    const today = formatDateLocal(new Date());
    bookingDate.min = today;
    if (!bookingDate.value) bookingDate.value = today;

    document.querySelectorAll('[data-booking-type]').forEach(btn => {
        btn.addEventListener('click', () => openBooking(btn.getAttribute('data-booking-type')));
    });
    document.querySelectorAll('[data-close-booking]').forEach(el => {
        el.addEventListener('click', closeBooking);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal.classList.contains('open')) closeBooking();
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const booking = {
            id: Date.now(),
            no: makeBookingNo(),
            type: bookingType.value,
            base: bookingBase.value,
            date: bookingDate.value,
            people: Number(bookingPeople.value),
            name: bookingName.value.trim(),
            phone: bookingPhone.value.trim(),
            note: bookingNote.value.trim(),
            createdAt: new Date().toLocaleString('zh-CN', { hour12: false })
        };

        if (!booking.date) {
            bookingError.textContent = '请选择到访日期。';
            return;
        }
        if (!booking.name || !/^1[3-9]\d{9}$/.test(booking.phone)) {
            bookingError.textContent = '请填写联系人姓名，并输入正确的 11 位手机号。';
            return;
        }

        const list = getBookings();
        list.unshift(booking);
        saveBookings(list);
        renderBookings();

        bookingForm.hidden = true;
        bookingSuccess.classList.add('show');
        bookingSuccess.innerHTML = `
            预约提交成功！<br>
            预约编号：<strong>${booking.no}</strong><br>
            ${escapeHtml(booking.date)}｜${escapeHtml(booking.base)}｜${booking.people} 人<br>
            请凭预约编号和手机号到基地接待处核验。
        `;
    });

    bookingList.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cancel-booking]');
        if (!btn) return;
        const id = Number(btn.getAttribute('data-cancel-booking'));
        saveBookings(getBookings().filter(item => item.id !== id));
        renderBookings();
    });

    clearBookings.addEventListener('click', () => {
        saveBookings([]);
        renderBookings();
    });

    renderBookings();
}

initBooking();
