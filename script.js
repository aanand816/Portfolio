function initLucide() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function setNavOpen(nav, open) {
    nav.classList.toggle('is-open', open);
    const btn = nav.querySelector('.nav-toggle');
    if (btn) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    document.body.classList.toggle('nav-open', open);
}

document.addEventListener('DOMContentLoaded', () => {
    initLucide();

    const nav = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('#nav-menu a[href^="#"]');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            setNavOpen(nav, !nav.classList.contains('is-open'));
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                setNavOpen(nav, false);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                setNavOpen(nav, false);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                setNavOpen(nav, false);
            }
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach((el) => {
        revealOnScroll.observe(el);
    });
});
