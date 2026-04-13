document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypewriter();
    initScrollAnimations();
    initNavOnScroll();
    initPortfolioFilters();
    initExpertiseStats();
    initMobileMenu();
    initHeaderDropdowns();
    initRTL();
    initBackToTop();
    initPasswordToggle();
});

// --- Theme Management ---
function initTheme() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeIcons(theme);
        });
    });
}

function updateThemeIcons(theme) {
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        icon.className = theme === 'light' ? 'bi bi-moon' : 'bi bi-sun';
    });
}

// --- RTL Management ---
function initRTL() {
    const langToggles = document.querySelectorAll('.lang-toggle');
    const html = document.documentElement;
    
    // Load saved direction
    const savedDir = localStorage.getItem('site-dir') || 'ltr';
    html.setAttribute('dir', savedDir);

    langToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isRTL = html.getAttribute('dir') === 'rtl';
            const newDir = isRTL ? 'ltr' : 'rtl';
            html.setAttribute('dir', newDir);
            localStorage.setItem('site-dir', newDir);
        });
    });
}

// --- Mobile Menu ---
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const close = document.querySelector('.mobile-menu-close');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const links = document.querySelectorAll('.mobile-nav-links a');

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (close) close.addEventListener('click', closeMenu);
}

// --- Typewriter Reveal ---
function initTypewriter() {
    const elements = document.querySelectorAll('.typewriter');
    elements.forEach(el => {
        const text = el.getAttribute('data-text');
        if (!text) return;
        const speed = 70;
        let i = 0;
        el.textContent = '';
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed + Math.random() * 50);
            }
        }
        setTimeout(type, 800);
    });
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, options);
    document.querySelectorAll('.reveal-page, .highlight-sweep, .legacy-image-reveal, .about-legacy, .portfolio-blueprint, .tools-security').forEach(el => observer.observe(el));
}

// --- Navigation ---
function initNavOnScroll() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
}

// --- Portfolio ---
function initPortfolioFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    if (filters.length === 0) return;
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filters.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// --- Stats ---
function initExpertiseStats() {
    const stats = document.querySelectorAll(".stat-number");
    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute("data-target");
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    stats.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

/* --- Web Header Navigation --- */
function initHeaderDropdowns() {
    const desktopToggles = document.querySelectorAll('.nav-links .nav-item-dropdown > .nav-link');
    const mobileDropToggles = document.querySelectorAll('.mobile-dropdown-toggle i');

    // Desktop: Click toggle
    desktopToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth >= 1200) {
                e.preventDefault();
                e.stopPropagation();

                const parent = this.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                const isOpen = parent.classList.contains('dropdown-active');

                // Close all others
                closeAllDesktopDropdowns();

                if (!isOpen) {
                    parent.classList.add('dropdown-active');
                    menu.classList.add('show');
                }
            }
        });
    });

    // Mobile: Click toggle
    mobileDropToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.nav-item-dropdown');
            const menu = parent.querySelector('.mobile-dropdown-menu');
            
            menu.classList.toggle('active');
            this.style.transform = menu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });

    // Close all desktop dropdowns function
    function closeAllDesktopDropdowns() {
        document.querySelectorAll('.nav-links .nav-item-dropdown').forEach(item => {
            item.classList.remove('dropdown-active');
            const menu = item.querySelector('.dropdown-menu');
            if(menu) menu.classList.remove('show');
        });
    }

    // Window click closure
    window.addEventListener('click', function() {
        if (window.innerWidth >= 1200) {
            closeAllDesktopDropdowns();
        }
    });

    // Handle mobile links (close menu EXCEPT when clicking parent items)
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // If it's the Home parent we want to toggle but not close the whole overlay
            if (link.getAttribute('href') === 'javascript:void(0)') {
                 // Skip closing for parent links
            } else {
                 overlay.classList.remove('active');
                 document.body.style.overflow = '';
            }
        });
    });
}

// --- Back to Top ---
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- Password Toggle ---
function initPasswordToggle() {
    const toggles = document.querySelectorAll('.password-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const wrap = this.parentElement;
            const input = wrap.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });
}
