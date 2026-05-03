import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';

export default function AroPresentation() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    // Array of all your sections/slides
    const slides = [
        <HeroSection key="hero" goToSlide={() => paginate(1)} />,
        <ProblemSection key="problem" />,
        <SolutionSection key="solution" />,
        <BusinessModelCustomersSection key="business-customers" />,
        <BusinessModelMarketingSection key="business-marketing" />,
        <BusinessModelValueSection key="business-value" />,
        <BusinessModelOperationsSection key="business-operations" />,
        <BusinessModelFinancialSection key="business-financial" />,
        <MvpSection key="mvp" />
    ];

    const paginate = useCallback((newDirection) => {
        setDirection(newDirection);
        setCurrentSlide((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = 0;
            if (next >= slides.length) next = slides.length - 1;
            return next;
        });
    }, [slides.length]);

    const goToSlide = (index) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    // Keyboard navigation for presentation feel
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                paginate(-1); // Previous (RTL adjusted)
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                paginate(1); // Next
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [paginate]);

    // Framer motion variants (Adjusted for RTL layout)
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? -1000 : 1000,
            opacity: 0,
            scale: 1.05
        })
    };

    return (
        <div dir="rtl" className="presentation-wrapper" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>

            {/* AnimatePresence handles the unmounting animation of the Navbar */}
            <AnimatePresence>
                {currentSlide === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        style={{ position: 'relative', zIndex: 1001 }}
                    >
                        <Navbar currentSlide={currentSlide} goToSlide={goToSlide} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="slide-viewport">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 }
                        }}
                        className="slide-container"
                    >
                        {slides[currentSlide]}

                        {/* Show footer only on the last slide */}
                        {currentSlide === slides.length - 1 && <Footer />}
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
}

// --- Components ---

function Navbar({ currentSlide, goToSlide }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Indices updated to match the new slide array length (9 total slides now)
    const navItems = [
        { name: 'ارو', index: 0 },
        { name: 'المشكلة', index: 1 },
        { name: 'الحل', index: 2 },
        { name: 'نموذج العمل', index: 3 }, // Business model covers indices 3, 4, 5, 6, 7
        { name: 'MVP', index: 8 }
    ];

    const handleNavClick = (index) => {
        goToSlide(index);
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar" id="navbar">
            <div className="nav-container">
                <div className="logo" onClick={() => goToSlide(0)} style={{ cursor: 'pointer' }}>
                    <img src="/aro_white_background.jpeg" alt="ARO Logo" className="logo-image" id="logoPlaceholder" />
                    <span className="logo-text">ARO</span>
                </div>

                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
                    {navItems.map((item) => (
                        <li className="nav-item" key={item.index}>
                            <button
                                onClick={() => handleNavClick(item.index)}
                                // Highlight if we are on any of the business slides (3, 4, 5, 6)
                                className={`nav-link ${(currentSlide === item.index) || (item.index === 3 && currentSlide >= 3 && currentSlide <= 7) ? 'active' : ''}`}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <div
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    id="hamburger"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}

function HeroSection({ goToSlide }) {
    return (
        <section className="section hero-section slide-content">
            <div className="hero-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="title-line">ارو</span>
                        <span className="title-line">ARO</span>
                    </h1>
                    <div className="hero-cta">
                        <button onClick={goToSlide} className="btn btn-primary">ابدأ العرض</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProblemSection() {
    return (
        <section className="section problem-section slide-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', boxSizing: 'border-box' }}>
            <div className="container" style={{ width: '100%' }}>
                <div className="section-header">
                    <span className="section-tag">المعيار الأول</span>
                    <h2 className="section-title">المشكلة</h2>
                    <p className="section-subtitle">فهم عميق للتحديات التي يواجهها الطلاب</p>
                </div>

                <div className="problem-content">
                    <div className="problem-overview">
                        <p className="problem-description">
                            كثير من الطلاب يفوّتون تسليم الواجبات والاختبارات، ليس بسبب الإهمال، بل بسبب طريقة عمل أنظمة إدارة التعلم (LMS) نفسها. هذه الأنظمة تُجبر الطالب على تصفّح صفحات متعددة لمعرفة ما عليه من مهام، ولا توفّر تنبيهات فعّالة — مما يجعل من السهل أن يفوته تسليم أُضيف في اللحظة الأخيرة.
                        </p>
                    </div>

                    <div className="problem-cards">
                        <div className="problem-card-compact">
                            <div className="problem-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                                    <line x1="6" y1="6" x2="6.01" y2="6" />
                                    <line x1="6" y1="18" x2="6.01" y2="18" />
                                </svg>
                            </div>
                            <div className="problem-card-content">
                                <h4>التصفح المتعدد</h4>
                                <p>أنظمة إدارة التعلم تُجبر الطالب على تصفّح صفحات متعددة لمعرفة ما عليه من مهام</p>
                            </div>
                        </div>

                        <div className="problem-card-compact">
                            <div className="problem-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                    <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
                                    <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
                                    <path d="M18 8a6 6 0 0 0-9.33-5" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            </div>
                            <div className="problem-card-content">
                                <h4>غياب التنبيهات الفعّالة</h4>
                                <p>الأنظمة الحالية لا توفّر تنبيهات فعّالة، مما يجعل من السهل تفويت المواعيد النهائية</p>
                            </div>
                        </div>

                        <div className="problem-card-compact">
                            <div className="problem-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                    <line x1="12" y1="2" x2="12" y2="4" />
                                    <line x1="12" y1="20" x2="12" y2="22" />
                                    <path d="M21 12c0-4.97-4.03-9-9-9" stroke="#FF7675" />
                                </svg>
                            </div>
                            <div className="problem-card-content">
                                <h4>تحديثات اللحظة الأخيرة</h4>
                                <p>التسليمات التي تُضاف في اللحظة الأخيرة يسهل تفويتها بسبب نقص الإشعارات المباشرة</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SolutionSection() {
    return (
        <section className="section solution-section slide-content">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">المعيار الثاني</span>
                    <h2 className="section-title">الحل المبتكر</h2>
                    <p className="section-subtitle">مساعد أكاديمي ذكي عبر واتساب</p>
                </div>

                <div className="solution-grid">
                    <div className="solution-card">
                        <div className="solution-card-header">
                            <div className="solution-icon"></div>
                            <h3>سحب تلقائي من جميع البرامج</h3>
                        </div>
                        <p>ARO يسحب جميع المواعيد النهائية والجداول الدراسية تلقائياً من نظام إدارة التعلم</p>
                        <ul className="feature-list">
                            <li>لا حاجة لتسجيل الدخول</li>
                            <li>لا حاجة للبحث</li>
                            <li>إرسال مباشر عبر واتساب</li>
                        </ul>
                    </div>

                    <div className="solution-card">
                        <div className="solution-card-header">
                            <div className="solution-icon"></div>
                            <h3>خطط دراسة عملية</h3>
                        </div>
                        <p>ARO يُحوّل كل موعد نهائي إلى خطة دراسة عملية بدلاً من مجرد التذكير</p>
                        <ul className="feature-list">
                            <li>يقترح من أين تبدأ</li>
                            <li>يُحدد الموضوعات حسب الأولوية</li>
                            <li>خطط مخصصة لكل مهمة</li>
                        </ul>
                    </div>

                    <div className="solution-card">
                        <div className="solution-card-header">
                            <div className="solution-icon"></div>
                            <h3>شرح مباشر للمفاهيم</h3>
                        </div>
                        <p>يستطيع الطالب أن يسأل ARO مباشرةً عن أي مفهوم ويحصل على شرح مبسّط فوري</p>
                        <ul className="feature-list">
                            <li>إجابات فورية</li>
                            <li>شروحات مبسّطة</li>
                            <li>متاح عبر واتساب</li>
                        </ul>
                    </div>
                </div>

                <div className="innovation-highlight">
                    <h3>القيمة المضافة</h3>
                    <p>بإعداد واحد فقط، يتصل ARO بنظام إدارة التعلم الخاص بك ويُرسل لك كل المواعيد والمهام مباشرة عبر واتساب أو تيليجرام — دون الحاجة لفتح الـ LMS مرة أخرى</p>
                </div>
            </div>
        </section>
    );
}

// Pure SVG Area Chart — مسار النمو
function GrowthChart() {
    const data = [
        { month: 'ش١', users: 0 },
        { month: 'ش٢', users: 100 },
        { month: 'ش٣', users: 200 },
        { month: 'ش٤', users: 400 },
        { month: 'ش٥', users: 600 },
        { month: 'ش٦', users: 700 },
        { month: 'ش٧', users: 900 },
        { month: 'ش٨', users: 1000 },
    ];

    const W = 420, H = 260;
    const padL = 56, padR = 24, padT = 20, padB = 44;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const maxVal = 1000;

    const xStep = chartW / (data.length - 1);
    const toX = (i) => padL + i * xStep;
    const toY = (v) => padT + chartH - (v / maxVal) * chartH;

    // Build SVG path
    const points = data.map((d, i) => `${toX(i)},${toY(d.users)}`).join(' L ');
    const linePath = `M ${points}`;
    const areaPath = `${linePath} L ${toX(data.length - 1)},${padT + chartH} L ${toX(0)},${padT + chartH} Z`;

    // Y-axis labels
    const yTicks = [0, 200, 400, 600, 800, 1000];

    return (
        <div style={{
            flex: 1,
            background: 'white',
            borderRadius: '20px',
            border: '2px solid rgba(108, 92, 231, 0.12)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '400px',
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                }}>مسار النمو 📈</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    عدد المستخدمين المتوقع خلال 8 أشهر
                </p>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#6C5CE7" stopOpacity="0.02" />
                        </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {yTicks.map((tick) => (
                        <g key={tick}>
                            <line
                                x1={padL} y1={toY(tick)}
                                x2={W - padR} y2={toY(tick)}
                                stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3"
                            />
                            <text
                                x={padL - 6} y={toY(tick) + 4}
                                textAnchor="end"
                                fontSize="10"
                                fill="#9CA3AF"
                                fontFamily="'Cairo', sans-serif"
                            >
                                {tick}
                            </text>
                        </g>
                    ))}

                    {/* Area fill */}
                    <path d={areaPath} fill="url(#growthGrad)" />

                    {/* Line */}
                    <path d={linePath} fill="none" stroke="#6C5CE7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Data points & X labels */}
                    {data.map((d, i) => (
                        <g key={i}>
                            {/* X-axis label */}
                            <text
                                x={toX(i)} y={padT + chartH + 18}
                                textAnchor="middle"
                                fontSize="11"
                                fill="#6B7280"
                                fontFamily="'Cairo', sans-serif"
                            >
                                {d.month}
                            </text>

                            {/* Outer glow ring */}
                            <circle cx={toX(i)} cy={toY(d.users)} r="7" fill="rgba(108,92,231,0.15)" />
                            {/* Dot */}
                            <circle cx={toX(i)} cy={toY(d.users)} r="4.5" fill="#6C5CE7" stroke="white" strokeWidth="2" />

                            {/* Value tooltip above dot */}
                            <text
                                x={toX(i)}
                                y={toY(d.users) - 10}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#6C5CE7"
                                fontWeight="700"
                                fontFamily="'Cairo', sans-serif"
                            >
                                {d.users}
                            </text>
                        </g>
                    ))}

                    {/* X-axis base line */}
                    <line
                        x1={padL} y1={padT + chartH}
                        x2={W - padR} y2={padT + chartH}
                        stroke="#D1D5DB" strokeWidth="1.5"
                    />
                    {/* Y-axis base line */}
                    <line
                        x1={padL} y1={padT}
                        x2={padL} y2={padT + chartH}
                        stroke="#D1D5DB" strokeWidth="1.5"
                    />
                </svg>
            </div>

            {/* Bottom legend */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                justifyContent: 'center',
                marginTop: '0.75rem',
            }}>
                <div style={{ width: 28, height: 3, background: '#6C5CE7', borderRadius: 2 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    عدد المستخدمين
                </span>
            </div>
        </div>
    );
}

// Slide 1: Customers (With Chart Layout)
function BusinessModelCustomersSection() {
    return (
        <section className="section business-section slide-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container-full" style={{ width: '100%' }}>
                <div className="section-header">
                    <span className="section-tag">المعيار الثالث (١/٤)</span>
                    <h2 className="section-title">نموذج العمل التجاري</h2>
                    <p className="section-subtitle">العملاء والقنوات</p>
                </div>

                <div className="slide-content">
                    {/* Two-column layout: RTL puts the first item on the Right, second on the Left */}
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'stretch' }}>

                        {/* Right Column: Growth Area Chart */}
                        <GrowthChart />

                        {/* Left Column: Customer Segments Content */}
                        <div style={{ flex: 1 }}>
                            <div className="canvas-card-full" style={{ height: '100%' }}>
                                <div className="card-header-full">
                                    <h3>شرائح العملاء</h3>
                                </div>
                                <div className="card-body-full" style={{ maxHeight: '100%', opacity: 1, visibility: 'visible' }}>
                                    <div className="card-item">
                                        <span className="item-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                            </svg>
                                        </span>
                                        <div className="item-content">
                                            <h4>البداية: 20 طالب في جامعة UTeM</h4>
                                            <p>حالياً بدأنا بـ 20 طالب كمستخدمين تجريبيين. هذه المرحلة تركز على جمع التغذية الراجعة وتحسين المنتج.</p>
                                        </div>
                                    </div>
                                    <div className="card-item">
                                        <span className="item-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                            </svg>
                                        </span>
                                        <div className="item-content">
                                            <h4>التوسع داخل UTeM: 12,000 طالب</h4>
                                            <p>الخطوة التالية هي التوسع لتشمل قاعدة أكبر من طلاب الجامعة. هذا يمثل سوقنا الأساسي الأول.</p>
                                        </div>
                                    </div>
                                    <div className="card-item">
                                        <span className="item-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="2" y1="12" x2="22" y2="12" />
                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                            </svg>
                                        </span>
                                        <div className="item-content">
                                            <h4>التوسع الجغرافي: بقية ماليزيا</h4>
                                            <p>بعد نجاح التوسع في UTeM، نخطط للانتشار في جامعات أخرى داخل ماليزيا.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

// Slide 2: Marketing Plan (Separated)
function BusinessModelMarketingSection() {
    return (
        <section className="section business-section slide-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container-full" style={{ width: '100%' }}>
                <div className="section-header">
                    <span className="section-tag">المعيار الثالث (٢/٤)</span>
                    <h2 className="section-title">نموذج العمل التجاري</h2>
                    <p className="section-subtitle">خطة التسويق</p>
                </div>

                <div className="slide-content">
                    <div className="canvas-cards-grid">
                        <div className="canvas-card-full">
                            <div className="card-header-full">
                                <h3>استراتيجيات التسويق</h3>
                            </div>
                            <div className="card-body-full" style={{ maxHeight: '100%', opacity: 1, visibility: 'visible', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="card-item" style={{ marginBottom: 0 }}>
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>الاستراتيجية الأولى: Freemium</h4>
                                        <p>تقديم خطة مجانية بالكامل تجذب الطلاب لتجربة المنصة بدون مخاطر، مما يسرّع بناء قاعدة مستخدمين قوية ويسهل تحويلهم لاحقاً للخطة المدفوعة (Pro).</p>
                                    </div>
                                </div>
                                <div className="card-item" style={{ marginBottom: 0 }}>
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>الاستراتيجية الثانية: Word of Mouth</h4>
                                        <p>الطالب الذي استفاد من ARO هو أفضل مسوّق لنا. تجربة حقيقية يشاركها مع زملائه تساوي أكثر من أي إعلان. نعتمد على التسويق الشفهي كقناة نمو رئيسية.</p>
                                    </div>
                                </div>
                                <div className="card-item" style={{ marginBottom: 0 }}>
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>الاستراتيجية الثالثة: مجموعات واتساب الطلابية</h4>
                                        <p>ننشر ARO في مجموعات واتساب الطلاب والأندية الجامعية — أماكن الطلاب الفعلية — بدون تكلفة إعلانية. هذا يضمن وصولنا للجمهور المستهدف مباشرة.</p>
                                    </div>
                                </div>
                                <div className="card-item" style={{ marginBottom: 0 }}>
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                            <circle cx="9" cy="10" r="2" />
                                            <circle cx="15" cy="10" r="2" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>الاستراتيجية الرابعة: الأنديه الطلابيه</h4>
                                        <p>نستهدف الأنديه الطلابيه الأكاديمية المتخصصة التي يتشارك فيها الطلاب المواد والملاحظات، ونوصل ARO لمن يحتاجه فعلاً بشكل عضوي.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Slide 3: Value & Revenue
function BusinessModelValueSection() {
    return (
        <section className="section business-section slide-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container-full" style={{ width: '100%' }}>
                <div className="section-header">
                    <span className="section-tag">المعيار الثالث (٣/٤)</span>
                    <h2 className="section-title">نموذج العمل التجاري</h2>
                    <p className="section-subtitle">القيمة والإيرادات</p>
                </div>

                <div className="slide-content">
                    <div className="canvas-cards-grid">
                        <div className="canvas-card-full highlight-card">
                            <div className="card-header-full">
                                <h3>Free plan</h3>
                            </div>
                            <div className="card-body-full" style={{ maxHeight: '100%', opacity: 1, visibility: 'visible' }}>
                                <div className="pro-plan-header">
                                    <div className="plan-badge" style={{ background: '#00B894' }}>الخطة المجانية</div>
                                    <div className="plan-price">RM 0 / شهر</div>
                                    <p className="plan-tagline">للطالب اللي يحتاج الأساسيات</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '1.5rem' }}>
                                    <div className="card-item" style={{ marginBottom: 0 }}>
                                        <span className="item-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                            </svg>
                                        </span>
                                        <div className="item-content">
                                            <h4>إعداد واحد يربط بجميع أنظمة LMS</h4>
                                            <p>بدلاً من تسجيل الدخول يومياً لعدة منصات، يقوم الطالب بربط حسابه مرة واحدة فقط وARO يتولى البقية تلقائياً، موفراً ساعات من الوقت شهرياً.</p>
                                        </div>
                                    </div>
                                    <div className="card-item">
                                        <span className="item-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
                                            </svg>
                                        </span>
                                        <div className="item-content">
                                            <h4>تذكيرات تلقائية عبر التطبيقات اليومية</h4>
                                            <p>الإشعارات تصل مباشرة عبر واتساب وتيليجرام - التطبيقات التي يفتحها الطالب عشرات المرات يومياً، مما يضمن عدم تفويت أي موعد مهم.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="canvas-card-full">
                            <div className="card-header-full">
                                <h3>Pro Plan</h3>
                            </div>
                            <div className="card-body-full" style={{ maxHeight: '100%', opacity: 1, visibility: 'visible' }}>
                                <div className="pro-plan-header">
                                    <div className="plan-badge">⭐ Pro</div>
                                    <div className="plan-price">RM 9 / شهر</div>
                                    <p className="plan-tagline">للطالب الجاد اللي يبغى كل شيء</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '1.5rem' }}>
                                    <div className="card-item" style={{ marginBottom: 0 }}>
                                        <span className="item-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                            </svg>
                                        </span>
                                        <div className="item-content">
                                            <h4>الجدول الدراسي الكامل متاح دائماً</h4>
                                            <p>الوصول الفوري للجدول الدراسي الكامل: اليوم، الغد، الأسبوع - كل شيء في مكان واحد عبر أوامر WhatsApp البسيطة.</p>
                                        </div>
                                    </div>
                                    <div className="card-item" style={{ marginBottom: 0 }}>
                                        <span className="item-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <line x1="12" y1="17" x2="12.01" y2="17" />
                                            </svg>
                                        </span>
                                        <div className="item-content">
                                            <h4>مساعد AI للإجابة على أسئلتك</h4>
                                            <p>مساعد ذكاء اصطناعي متاح 24/7 للإجابة على أسئلة عن مواعيدك وجدولك، مما يوفر دعماً فورياً دون انتظار.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Slide 4: Operations & Costs
function BusinessModelOperationsSection() {
    return (
        <section className="section business-section slide-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container-full" style={{ width: '100%' }}>
                <div className="section-header">
                    <span className="section-tag">المعيار الثالث (٤/٥)</span>
                    <h2 className="section-title">نموذج العمل التجاري</h2>
                    <p className="section-subtitle">العمليات والتكاليف</p>
                </div>

                <div className="slide-content">
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch' }}>
                        {/* Activities */}
                        <div className="canvas-card-full" style={{ flex: 1 }}>
                            <div className="card-header-full">
                                <h3>الأنشطة الرئيسية</h3>
                            </div>
                            <div className="card-body-full" style={{ maxHeight: '100%', opacity: 1, visibility: 'visible' }}>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M12 1v6m0 6v6" />
                                            <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24" />
                                            <path d="M1 12h6m6 0h6" />
                                            <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>تطوير وصيانة البنية التقنية</h4>
                                        <p>التطوير المستمر للمنصة، إضافة ميزات جديدة، إصلاح الأخطاء، وتحسين الأداء لضمان تجربة مستخدم سلسة ومستقرة.</p>
                                    </div>
                                </div>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="23 4 23 10 17 10" />
                                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>سحب البيانات من أنظمة LMS</h4>
                                        <p>عمليات تزامن تلقائية منتظمة مع منصات التعلم المختلفة لضمان تحديث البيانات بشكل مستمر وفوري.</p>
                                    </div>
                                </div>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>التسويق واكتساب المستخدمين</h4>
                                        <p>تنفيذ استراتيجيات التسويق عبر مجموعات واتساب وتيليجرام، وبناء سمعة قوية من خلال Word of Mouth.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resources */}
                        <div className="canvas-card-full" style={{ flex: 1 }}>
                            <div className="card-header-full">
                                <h3>الموارد الرئيسية</h3>
                            </div>
                            <div className="card-body-full" style={{ maxHeight: '100%', opacity: 1, visibility: 'visible' }}>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>فريق تطوير تقني متخصص</h4>
                                        <p>مطورون خبراء في backend، frontend، mobile، وAI/ML لبناء وتطوير المنصة باستمرار.</p>
                                    </div>
                                </div>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>خوادم سحابية (Supabase, Railway)</h4>
                                        <p>بنية تحتية سحابية قابلة للتوسع لضمان الاستقرار والأداء العالي مع نمو قاعدة المستخدمين.</p>
                                    </div>
                                </div>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>OpenAI API للذكاء الاصطناعي</h4>
                                        <p>الوصول إلى نماذج لغوية متقدمة لتوفير مساعد AI والشروحات الفورية.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Partnerships */}
                        <div className="canvas-card-full" style={{ flex: 1 }}>
                            <div className="card-header-full">
                                <h3>الشراكات الرئيسية</h3>
                            </div>
                            <div className="card-body-full" style={{ maxHeight: '100%', opacity: 1, visibility: 'visible' }}>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>جامعة UTeM (شراكة تأسيسية)</h4>
                                        <p>شراكة استراتيجية مع جامعة UTeM للحصول على وصول رسمي لنظام LMS وبيانات الطلاب، مع إمكانية التوسع لجامعات أخرى.</p>
                                    </div>
                                </div>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>OpenAI (نماذج اللغة)</h4>
                                        <p>شراكة تقنية للاستفادة من أحدث نماذج الذكاء الاصطناعي في معالجة اللغة الطبيعية.</p>
                                    </div>
                                </div>
                                <div className="card-item">
                                    <span className="item-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                        </svg>
                                    </span>
                                    <div className="item-content">
                                        <h4>WhatsApp Business API</h4>
                                        <p>شراكة مع Meta للوصول الرسمي لـ WhatsApp Business API لإرسال الإشعارات والتفاعل مع الطلاب.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

// Pure SVG Stacked Bar Chart component
function StackedBarChart() {
    const stages = [
        {
            label: 'المرحلة ١',
            sub: '٢٠–١٠٠ مستخدم',
            costs: 77,
            revenue: 0,
            profit: -77,
        },
        {
            label: 'المرحلة ٢',
            sub: '١٠٠–١٬٠٠٠ مستخدم',
            costs: 1154,
            revenue: 2700,
            profit: 1546,
        },
        {
            label: 'المرحلة ٣',
            sub: '١٬٠٠٠–١٠٬٠٠٠ مستخدم',
            costs: 12326,
            revenue: 27000,
            profit: 14674,
        },
    ];

    const W = 560, H = 320;
    const padL = 72, padR = 24, padT = 24, padB = 64;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const maxVal = 30000;

    const groupW = chartW / stages.length;
    const barW = groupW * 0.38;
    const gap = groupW * 0.08;

    const toY = (v) => padT + chartH - (Math.max(v, 0) / maxVal) * chartH;
    const toH = (v) => (Math.max(v, 0) / maxVal) * chartH;

    const yTicks = [0, 10000, 20000, 30000];
    const fmtRM = (v) => v >= 1000 ? `RM ${(v / 1000).toFixed(0)}k` : `RM ${v}`;

    // Colors
    const C_COST = '#FF7675';    // red
    const C_REV = '#00B894';    // green
    const C_PROF = '#6C5CE7';    // purple

    return (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            border: '2px solid rgba(108,92,231,0.12)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    مقارنة التكاليف والإيرادات عبر المراحل
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                    القيم الشهرية بالرينجيت الماليزي (RM)
                </p>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', overflow: 'visible' }}>
                {/* Grid lines + Y labels */}
                {yTicks.map((tick) => (
                    <g key={tick}>
                        <line
                            x1={padL} y1={toY(tick)}
                            x2={W - padR} y2={toY(tick)}
                            stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3"
                        />
                        <text
                            x={padL - 6} y={toY(tick) + 4}
                            textAnchor="end" fontSize="9.5" fill="#9CA3AF"
                            fontFamily="'Cairo', sans-serif"
                        >
                            {tick === 0 ? '0' : `${tick / 1000}k`}
                        </text>
                    </g>
                ))}

                {/* Axis lines */}
                <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#D1D5DB" strokeWidth="1.5" />
                <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#D1D5DB" strokeWidth="1.5" />

                {stages.map((s, i) => {
                    const cx = padL + i * groupW + groupW / 2;
                    // Cost bar (left)
                    const x1 = cx - barW - gap / 2;
                    // Revenue bar (right)
                    const x2 = cx + gap / 2;

                    const costH = toH(s.costs);
                    const revH = toH(s.revenue);

                    // profit label color
                    const profitColor = s.profit >= 0 ? C_PROF : C_COST;
                    const profitTxt = s.profit >= 0
                        ? `+${fmtRM(s.profit)}`
                        : `-${fmtRM(Math.abs(s.profit))}`;

                    return (
                        <g key={i}>
                            {/* Cost bar */}
                            <rect
                                x={x1} y={toY(s.costs)}
                                width={barW} height={costH}
                                fill={C_COST} rx="5" ry="5"
                                opacity="0.88"
                            />
                            <text
                                x={x1 + barW / 2} y={toY(s.costs) - 5}
                                textAnchor="middle" fontSize="9" fill={C_COST}
                                fontWeight="700" fontFamily="'Cairo', sans-serif"
                            >
                                {fmtRM(s.costs)}
                            </text>

                            {/* Revenue bar (stacked: costs bottom + revenue on top when revenue > 0) */}
                            {s.revenue > 0 && (
                                <>
                                    <rect
                                        x={x2} y={toY(s.revenue)}
                                        width={barW} height={revH}
                                        fill={C_REV} rx="5" ry="5"
                                        opacity="0.88"
                                    />
                                    <text
                                        x={x2 + barW / 2} y={toY(s.revenue) - 5}
                                        textAnchor="middle" fontSize="9" fill={C_REV}
                                        fontWeight="700" fontFamily="'Cairo', sans-serif"
                                    >
                                        {fmtRM(s.revenue)}
                                    </text>
                                </>
                            )}

                            {/* Profit badge */}
                            <rect
                                x={cx - 28} y={padT + chartH + 28}
                                width={56} height={18}
                                rx="9" fill={profitColor} opacity="0.12"
                            />
                            <text
                                x={cx} y={padT + chartH + 40}
                                textAnchor="middle" fontSize="9" fill={profitColor}
                                fontWeight="800" fontFamily="'Cairo', sans-serif"
                            >
                                {profitTxt}
                            </text>

                            {/* Stage label */}
                            <text
                                x={cx} y={padT + chartH + 16}
                                textAnchor="middle" fontSize="10" fill="#374151"
                                fontWeight="700" fontFamily="'Cairo', sans-serif"
                            >
                                {s.label}
                            </text>

                            {/* Sub label */}
                            <text
                                x={cx} y={padT + chartH + 55}
                                textAnchor="middle" fontSize="8" fill="#9CA3AF"
                                fontFamily="'Cairo', sans-serif"
                            >
                                {s.sub}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[
                    { color: C_COST, label: 'التكاليف' },
                    { color: C_REV, label: 'الإيرادات' },
                    { color: C_PROF, label: 'صافي الربح' },
                ].map(({ color, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Slide 5: Financial Chart (separated)
function BusinessModelFinancialSection() {
    return (
        <section className="section business-section slide-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container-full" style={{ width: '100%' }}>
                <div className="section-header">
                    <span className="section-tag">المعيار الثالث (٥/٥)</span>
                    <h2 className="section-title">نموذج العمل التجاري</h2>
                    <p className="section-subtitle">هيكل التكاليف والإيرادات</p>
                </div>

                <div className="slide-content">
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                        {/* Chart */}
                        <div style={{ flex: 2 }}>
                            <StackedBarChart />
                        </div>

                        {/* Key numbers */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { stage: 'المرحلة ١', users: '٢٠–١٠٠', cost: 'RM 77', rev: 'RM 0', net: '-RM 77', isLoss: true },
                                { stage: 'المرحلة ٢', users: '١٠٠–١٬٠٠٠', cost: 'RM 1,154', rev: 'RM 2,475', net: '+RM 1,321', isLoss: false },
                                { stage: 'المرحلة ٣', users: '١٬٠٠٠–١٠٬٠٠٠', cost: 'RM 12,326', rev: 'RM 24,750', net: '+RM 12,424', isLoss: false },
                            ].map((r) => (
                                <div key={r.stage} style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    border: '2px solid rgba(108,92,231,0.1)',
                                    padding: '1rem 1.25rem',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                }}>
                                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                                        {r.stage}
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                                        {r.users} مستخدم
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#9CA3AF', marginBottom: '0.25rem' }}>
                                        <span>التكاليف</span><span style={{ fontWeight: 700, color: '#FF7675' }}>{r.cost}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#9CA3AF', marginBottom: '0.25rem' }}>
                                        <span>الإيرادات</span><span style={{ fontWeight: 700, color: '#00B894' }}>{r.rev}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        fontSize: '0.9rem', fontWeight: 800,
                                        padding: '0.35rem 0.5rem', borderRadius: '8px',
                                        background: r.isLoss ? 'rgba(255,118,117,0.1)' : 'rgba(0,184,148,0.1)',
                                        color: r.isLoss ? '#FF7675' : '#00B894',
                                        marginTop: '0.3rem',
                                    }}>
                                        <span>صافي</span><span>{r.net}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Reusable browser-frame component
function BrowserFrame({ src, url, aspectRatio }) {
    return (
        <div style={{
            flex: 1,
            aspectRatio: aspectRatio,
            minHeight: 0,
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.15), 0 4px 16px rgba(108,92,231,0.12)',
            border: '1px solid rgba(108,92,231,0.15)',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Top bar */}
            <div style={{
                background: '#F1F3F5',
                padding: '0.45rem 0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                borderBottom: '1px solid #E0E0E0',
                flexShrink: 0,
            }}>
                <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
                </div>
                <div style={{
                    flex: 1, background: 'white', borderRadius: '5px',
                    padding: '0.18rem 0.6rem', fontSize: '0.72rem', color: '#6B7280',
                    border: '1px solid #E0E0E0', fontFamily: 'monospace',
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00B894" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    {url}
                </div>
            </div>
            {/* Content */}
            {src ? (
                <img src={src} alt="Demo" style={{
                    flex: 1, minHeight: 0, width: '100%',
                    objectFit: 'contain', objectPosition: 'top center', display: 'block',
                }} />
            ) : (
                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(108,92,231,0.03)',
                    color: 'rgba(108,92,231,0.4)',
                    gap: '0.75rem',
                }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                        style={{ width: 48, height: 48, opacity: 0.5 }}>
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>اسحب الصورة هنا</span>
                </div>
            )}
        </div>
    );
}

function MvpSection() {
    return (
        <section className="section mvp-section slide-content" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.25rem 2rem',
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
        }}>
            <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '880px' }}>
                {/* Header */}
                <div className="section-header" style={{ marginBottom: '1rem', flexShrink: 0 }}>
                    <span className="section-tag">المعيار الرابع</span>
                    <h2 className="section-title">النموذج الأولي</h2>
                    <p className="section-subtitle">MVP قابل للاختبار والتفاعل</p>
                </div>

                {/* Two frames side by side */}
                <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>

                    {/* Frame 1 — demo.jpeg */}
                    <BrowserFrame src="/demo.jpeg" url="aro-app.vercel.app" />

                    {/* Frame 2 — demo2.jpeg */}
                    <BrowserFrame src="/demo2.jpeg" url="aro-app.vercel.app" />

                </div>
            </div>
        </section>
    );
}



function Footer() {
    return (
        <footer className="footer" style={{ width: '100%', marginTop: 'auto' }}>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <span className="logo-text">ARO</span>
                        <span className="logo-text-ar">ارو</span>
                    </div>
                    <p className="footer-tagline">تحويل تجربة الطلاب إلى رحلة استثنائية</p>
                    <div className="footer-links">
                        <a href="#home">الرئيسية</a>
                        <a href="#problem">المشكلة</a>
                        <a href="#solution">الحل</a>
                        <a href="#team">الفريق</a>
                    </div>
                    <p className="footer-copyright">© 2024 ARO. جميع الحقوق محفوظة</p>
                </div>
            </div>
        </footer>
    );
}