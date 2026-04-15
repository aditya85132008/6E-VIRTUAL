/* ============================================
   6E Virtual - Main v3.0
   ============================================ */

const App = {
    init() {
        this.initNavbar();
        this.initSmoothScroll();
        this.initScrollReveal();
    },

    initNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    },

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = document.getElementById('navbar')?.offsetHeight || 0;
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY - offset - 24,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    initScrollReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            els.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        els.forEach(el => observer.observe(el));
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
