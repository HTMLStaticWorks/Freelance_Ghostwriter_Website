/**
 * 🎭 PUPPET THEATER COMPANY - CORE JS
 * ✨ Vanilla JavaScript ONLY
 */

document.addEventListener('DOMContentLoaded', () => {
    // 🌍 INITIALIZE RTL & THEME
    initRTL();
    initTheme();

    // 🎬 CURTAIN LOAD ANIMATION
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    // 🎲 MAGNETIC BUTTONS
    initMagneticButtons();

    // 💫 SPOTLIGHT TRACKING
    initSpotlightTracking();

    // 🎡 INTERSECTION OBSERVER
    initScrollAnimations();

    // 🔗 ACTIVE NAV HIGHLIGHT
    initActiveNav();

    // 📸 LIGHTBOX (Pure JS)
    initLightbox();

    // ⏳ COUNTDOWN (For Coming Soon)
    initCountdown();
});

/**
 * 🌍 RTL SYSTEM
 */
function initRTL() {
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlTag = document.documentElement;
    const currentDir = localStorage.getItem('puppet-dir') || 'ltr';

    htmlTag.setAttribute('dir', currentDir);
    if (rtlToggle) rtlToggle.checked = (currentDir === 'rtl');

    if (rtlToggle) {
        rtlToggle.addEventListener('change', (e) => {
            const newDir = e.target.checked ? 'rtl' : 'ltr';
            htmlTag.setAttribute('dir', newDir);
            localStorage.setItem('puppet-dir', newDir);

            // 🔥 REVERSE ANIMATIONS (Optional trigger if needed)
            document.body.classList.add('switching-dir');
            setTimeout(() => document.body.classList.remove('switching-dir'), 300);
        });
    }
}

/**
 * 🌘 THEME SYSTEM
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('puppet-theme') || 'dark';

    body.setAttribute('data-theme', currentTheme);
    if (themeToggle) themeToggle.checked = (currentTheme === 'light');

    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('puppet-theme', newTheme);
        });
    }
}

/**
 * 🎲 MAGNETIC BUTTONS HOVER
 */
function initMagneticButtons() {
    const btns = document.querySelectorAll('.magnetic-btn');

    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}

/**
 * 💫 SPOTLIGHT TRACKING
 */
function initSpotlightTracking() {
    const cards = document.querySelectorAll('.spotlight-hover');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const spotlight = card.querySelector('::after'); // We use inline style because ::after is not selectable
            card.style.setProperty('--spotlight-x', `${x}px`);
            card.style.setProperty('--spotlight-y', `${y}px`);
        });
    });
}

/**
 * 🔗 ACTIVE NAV HIGHLIGHT
 */
function initActiveNav() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/**
 * 🎡 SCROLL REVEAL ANIMATIONS
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * 📸 LIGHTBOX MINIMAL
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="Puppet Lightbox" id="lightbox-img">
        </div>
    `;
    document.body.appendChild(overlay);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = img.src;
            overlay.classList.add('active');
        });
    });

    overlay.querySelector('.lightbox-close').addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
    });
}

/**
 * ⏳ COUNTDOWN TIMER
 */
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    const targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `
            <div class="countdown-unit"><span>${days}</span><label>Days</label></div>
            <div class="countdown-unit"><span>${hours}</span><label>Hours</label></div>
            <div class="countdown-unit"><span>${minutes}</span><label>Mins</label></div>
            <div class="countdown-unit"><span>${seconds}</span><label>Secs</label></div>
        `;
    }, 1000);
}
