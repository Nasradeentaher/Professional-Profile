// ========== تهيئة التطبيق ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 بدء تحميل الموقع...');
    
    // تهيئة المكونات الأساسية
    initThemeToggle();
    initTypingEffect();
    updateYear();
    
    // تحميل المحتوى الديناميكي
    initProjects();
    initTimeline();
    initGallery();
    
    // تحسينات تجربة المستخدم
    initSmoothScrolling();
    initScrollToTop();
    initNavIndicator();
    
    // تحسينات الجوال
    initMobileTracker();
    
    console.log('✅ تم تحميل الموقع بنجاح');
});

// ========== شريط التتبع العلوي للجوال ==========
function initMobileTracker() {
    const tracker = document.querySelector('.mobile-tracker-progress');
    if (!tracker) return;
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        tracker.style.width = scrolled + "%";
    });
}

// ========== مؤشر التنقل ==========
function initNavIndicator() {
    const navItems = document.querySelectorAll('.nav-item');
    const indicator = document.querySelector('.mobile-line');
    if (!indicator) return;
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const containerWidth = this.parentElement.offsetWidth;
            const itemWidth = this.offsetWidth;
            const itemOffset = this.offsetLeft;
            
            indicator.style.transform = `translateX(${itemOffset}px)`;
            indicator.style.width = `${itemWidth}px`;
        });
    });
}

// ========== تأثير الكتابة المتحركة ==========
function initTypingEffect() {
    const dynamicText = document.getElementById('dynamicText');
    if (!dynamicText) return;
    
    const texts = [
        "مطور ويب مبتدئ متحمس",
        "مبرمج بوتات تيليجرام",
        "مطور تطبيقات أندرويد",
        "مستقبل مهندس برمجيات",
        "نصر الدين الطاهر"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            dynamicText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
    
    setTimeout(type, 1000);
}

// ========== تبديل الثيم ==========
function initThemeToggle() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (!themeSwitch) return;
    
    // التحقق من التفضيل المحفوظ
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // التحقق من تفضيل النظام
    if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-mode');
    }
    
    // حدث التبديل
    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// ========== تحميل وعرض المشاريع ==========
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    // بيانات المشاريع
    const projects = [
        {
            id: 1,
            title: "Subu_lBot",
            description: "بوت تيليجرام متكامل لإدارة القنوات وتنظيم الدعم الآلي. يحتوي على نظام عقوبات ذكي (3 مخالفات)، تحكم كامل في الصلاحيات، وحذف تلقائي للمنشورات المخالفة.",
            image: "images/projects/subul-bot.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Python", "Telegram Bot", "Automation", "Channel Management"],
            link: "https://t.me/Subu_lBot",
            status: "active",
            type: "bot"
        },
        {
            id: 2,
            title: "الموقع الشخصي",
            description: "هذا الموقع الذي تراه الآن! تم تطويره باستخدام HTML5، CSS3، وJavaScript النقي مع تأثيرات بصرية متقدمة وتصميم فريد يعكس شخصيتي البرمجية.",
            image: "images/projects/portfolio.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["HTML5", "CSS3", "JavaScript", "Modern Design", "Responsive"],
            link: "#hero",
            status: "completed",
            type: "web"
        },
        {
            id: 3,
            title: "ملف مهني تفاعلي",
            description: "ملف مهني تفاعلي بتقنية حديثة لعرض الخبرات والمهارات بطريقة إبداعية وجذابة. يحتوي على عرض تفاعلي للمشاريع والخط الزمني للتطور.",
            image: "images/projects/interactive-profile.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Interactive", "Creative Design", "Portfolio", "Modern UI"],
            link: "#",
            status: "in-progress",
            type: "web"
        },
        {
            id: 4,
            title: "مواقع ملفات مهنية للعملاء",
            description: "مجموعة من المواقع المهنية الاحترافية لعملاء مختلفين. تشمل سير ذاتية تفاعلية، معارض أعمال، وتقديم خدمات متخصصة مع تصميم عصري ومتجاوب.",
            image: "images/projects/professional-sites.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Professional Sites", "Business Portfolios", "Responsive Design", "Client Projects"],
            link: "#",
            status: "completed",
            type: "web"
        },
        {
            id: 5,
            title: "DFAll Bot - بوت تحميل الفيديوهات",
            description: "بوت متكامل لتحميل الفيديوهات من جميع منصات التواصل الاجتماعي. يدعم YouTube, Facebook, Twitter, Instagram, TikTok والمزيد.",
            image: "images/projects/download-bot.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Python", "Telegram Bot", "Video Downloader", "YouTube", "Social Media"],
            link: "https://t.me/DFAll_Bot",
            status: "active",
            type: "bot"
        },
        {
            id: 6,
            title: "تطبيق أذكاري للأندرويد",
            description: "تطبيق أندرويد متكامل يعرض الأذكار والأحاديث والأدعية الإسلامية. يحتوي على تنظيم بحسب الأوقات، البحث السريع، والمفضلة.",
            image: "images/projects/azkar-app.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Android App", "Java", "Islamic", "Mobile Development", "User Friendly"],
            link: "#",
            status: "completed",
            type: "android"
        }
    ];
    
    // عرض المشاريع
    displayProjects(projects, projectsGrid);
}

// ========== عرض المشاريع ==========
function displayProjects(projects, container) {
    container.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-index', index);
        
        let statusText, statusClass;
        switch(project.status) {
            case 'active': statusText = 'نشط حالياً'; statusClass = 'active'; break;
            case 'completed': statusText = 'مكتمل'; statusClass = 'completed'; break;
            case 'in-progress': statusText = 'قيد التطوير'; statusClass = 'in-progress'; break;
        }
        
        // تحديد الزر بناءً على نوع الرابط
        let buttonHTML = '';
        if (project.link && project.link !== '#') {
            if (project.link === '#hero') {
                buttonHTML = `<a href="${project.link}" class="project-btn scroll-top-btn">
                    <i class="fas fa-home"></i> هذا الموقع
                </a>`;
            } else {
                buttonHTML = `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-btn">
                    ${project.type === 'bot' ? 
                        '<i class="fab fa-telegram"></i> تجربة البوت' : 
                        project.type === 'android' ?
                        '<i class="fab fa-android"></i> عرض التطبيق' :
                        '<i class="fas fa-external-link-alt"></i> زيارة الموقع'
                    }
                </a>`;
            }
        } else {
            buttonHTML = `<button class="project-btn disabled">
                <i class="fas fa-clock"></i> قيد التطوير
            </button>`;
        }
        
        projectCard.innerHTML = `
            <div class="project-visual">
                <img src="${project.image}" 
                     alt="${project.title}"
                     class="project-image"
                     data-fallback="${project.fallbackImage}"
                     loading="lazy"
                     onerror="this.src=this.dataset.fallback">
                <div class="project-badge ${statusClass}">${statusText}</div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">${buttonHTML}</div>
            </div>
        `;
        
        container.appendChild(projectCard);
        
        // إضافة تأثير الظهور
        setTimeout(() => {
            projectCard.classList.add('in-view');
        }, 100 * index);
    });
}

// ========== معرض الصور الديناميكي ==========
function initGallery() {
    const galleryContainer = document.getElementById('dynamicGallery');
    if (!galleryContainer) return;
    
    // بيانات الصور للمعرض (باستخدام صور Unsplash كبديل)
    const galleryImages = [
        {
            src: "images/gallery/gallery1.jpg",
            fallback: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            alt: "لقطة من كود برمجي",
            caption: "أول سطر كود كتبته"
        },
        {
            src: "images/gallery/gallery2.jpg",
            fallback: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            alt: "مشروع برمجي",
            caption: "أول مشروع ويب كامل"
        },
        {
            src: "images/gallery/gallery3.jpg",
            fallback: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            alt: "واجهة برمجة",
            caption: "واجهة برمجة API"
        },
        {
            src: "images/gallery/gallery4.jpg",
            fallback: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            alt: "تصميم واجهة",
            caption: "تصميم واجهة المستخدم"
        },
        {
            src: "images/gallery/gallery5.jpg",
            fallback: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            alt: "اختبار تطبيق",
            caption: "اختبار تطبيق أندرويد"
        },
        {
            src: "images/gallery/gallery6.jpg",
            fallback: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            alt: "تطوير بوت",
            caption: "لوحة تحكم بوت تيليجرام"
        }
    ];
    
    displayGallery(galleryImages, galleryContainer);
}

function displayGallery(images, container) {
    container.innerHTML = '';
    
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const imgElement = document.createElement('img');
        imgElement.className = 'gallery-image';
        imgElement.alt = image.alt;
        imgElement.loading = 'lazy';
        
        // حاول تحميل الصورة المحلية أولاً، ثم استخدم الفال باك
        const localImage = new Image();
        localImage.src = image.src;
        localImage.onload = () => {
            imgElement.src = image.src;
        };
        localImage.onerror = () => {
            imgElement.src = image.fallback;
        };
        
        galleryItem.innerHTML = `
            <div class="gallery-overlay">
                <div class="gallery-caption">${image.caption}</div>
            </div>
        `;
        
        galleryItem.prepend(imgElement);
        container.appendChild(galleryItem);
        
        // تأثير الظهور التدريجي
        setTimeout(() => {
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, 150 * index);
    });
}

// ========== الخط الزمني ==========
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillMeters = document.querySelectorAll('.meter-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => observer.observe(item));
    
    // تحريك أشرطة المهارات
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.setProperty('--level', `${level}%`);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    skillMeters.forEach(meter => skillObserver.observe(meter));
}

// ========== التمرير السلس ==========
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#0') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.glass-nav')?.offsetHeight || 60;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // تحديث القائمة النشطة
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// ========== العودة لأعلى الصفحة ==========
function initScrollToTop() {
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
}

// ========== تحديث السنة ==========
function updateYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ========== تصدير الوظائف للاستخدام ==========
window.NasrPortfolio = {
    refreshProjects: initProjects,
    refreshGallery: initGallery,
    smoothScrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    toggleTheme: () => document.getElementById('themeSwitch')?.click()
};
