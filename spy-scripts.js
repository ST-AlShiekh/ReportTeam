document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
     * 1. نظام النافذة المنبثقة (Hover Tooltip) لأيقونات الأسلحة والوحدات
     * ========================================================== */
    const iconData = {
        // الربط الصحيح بناءً على أسماء الملفات وصلاحيات الوحدات
        "-5.webp": { title: "سلاح آلي", desc: "تصريح استخدام الفئة الأولى للعمليات الخاصة." },
        "2.webp": { title: "وحدة الدراجات", desc: "وحدة الاستجابة السريعة للمطاردات الضيقة." },
        "23.webp": { title: "مفاوض رسمي", desc: "إدارة المفاوضات في حالات السطو والرهائن." },
        "-6.webp": { title: "وحدة المطاردة", desc: "مركبات عالية الأداء للمطاردات الطويلة." },
        "dis.webp": { title: "ديسباتش", desc: "توجيه الوحدات وتنظيم البلاغات عبر العمليات." },
        "-3.webp": { title: "الطيران المروحي", desc: "الدعم الجوي والرصد الحراري للملاحقة." },
        "": { title: "دعم ميداني", desc: "كافة صلاحيات المساندة الأرضية والقبض." }
    };

    const modal = document.getElementById('infoModal');
    const modalContent = modal.querySelector('.modal-content');
    const titleElem = document.getElementById('modalTitle');
    const descElem = document.getElementById('modalDescription');

    // تفعيل التفاعل عند المرور بالفأرة على الأيقونات
    document.querySelectorAll('.res-icons img').forEach(img => {
        img.addEventListener('mouseenter', function(e) {
            const fileName = this.src.split('/').pop();
            const data = iconData[fileName];
            if (data) {
                titleElem.innerText = data.title;
                descElem.innerText = data.desc;
                modal.style.display = "block";
            }
        });

        // تحريك صندوق التلميح بسلاسة مع حركة المؤشر
        img.addEventListener('mousemove', (e) => {
            let x = e.pageX + 15;
            let y = e.pageY + 15;
            if (x + 260 > window.innerWidth) x = e.pageX - 280;
            modalContent.style.left = x + "px";
            modalContent.style.top = y + "px";
        });

        // إخفاء الصندوق عند إبعاد المؤشر
        img.addEventListener('mouseleave', () => {
            modal.style.display = "none";
        });
    });


    /* ==========================================================
     * 2. إعدادات الجزيئات الخلفية (Particles.js) - الهوية الحمراء المتوهجة
     * ========================================================== */
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60 },
                "color": { "value": "#ff0033" }, /* لون أحمر متوهج للجزيئات */
                "shape": { "type": "circle" },
                "opacity": { "value": 0.25 },
                "size": { "value": 2 },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#ff3344", /* خطوط حمراء داكنة متصلة */
                    "opacity": 0.12, 
                    "width": 1 
                },
                "move": { "enable": true, "speed": 1.5 }
            }
        });
    }


    /* ==========================================================
     * 3. إدارة التنقل بين الصفحات والانتقال السلس
     * ========================================================== */
    window.showPage = function(pageId) {
        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add("active");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    /* ==========================================================
     * 4. نظام البحث الفوري والذكي داخل الكروت والقوانين
     * ========================================================== */
    const searchInput = document.getElementById('searchInput');
    const resultsBox = document.getElementById('search-results');
    const cards = document.querySelectorAll('.card');

    if (searchInput && resultsBox) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            resultsBox.innerHTML = '';
            
            if (query.length < 1) {
                resultsBox.style.display = 'none';
                return;
            }

            let matches = [];
            cards.forEach(card => {
                const text = card.innerText;
                if (text.toLowerCase().includes(query)) {
                    const lines = text.split(/[،\n.-]/);
                    lines.forEach(l => {
                        if (l.toLowerCase().includes(query) && l.trim().length > 3) {
                            matches.push(l.trim());
                        }
                    });
                }
            });

            matches = [...new Set(matches)].slice(0, 8);

            if (matches.length > 0) {
                resultsBox.style.display = 'block';
                matches.forEach(match => {
                    const div = document.createElement('div');
                    div.className = 'result-item';
                    
                    // تمييز الكلمة المطابقة للبحث باللون الأحمر الساطع والمتوهج
                    div.innerHTML = match.replace(new RegExp(query, 'gi'), m => `<span style="color:#ff3355; font-weight:bold; text-shadow: 0 0 8px rgba(255, 51, 85, 0.7);">${m}</span>`);
                    
                    div.onclick = () => {
                        searchInput.value = match;
                        resultsBox.style.display = 'none';
                        filterCards(match.toLowerCase());
                    };
                    resultsBox.appendChild(div);
                });
            } else {
                resultsBox.style.display = 'none';
            }
        });
    }

    // دالة تصفية الكروت بناءً على نتائج البحث
    function filterCards(query) {
        cards.forEach(card => {
            card.style.display = card.innerText.toLowerCase().includes(query) ? "flex" : "none";
        });
    }

    // إخفاء صندوق البحث عند النقر في أي مكان خارج حقل البحث
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper') && resultsBox) {
            resultsBox.style.display = 'none';
        }
    });

});