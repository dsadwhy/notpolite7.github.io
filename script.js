document.addEventListener('DOMContentLoaded', () => {
    const spotlight = document.getElementById('spotlight');
    const navbar = document.getElementById('navbar');
    const mobileTrigger = document.getElementById('mobile-menu-trigger');
    const navLinks = document.getElementById('nav-links');

    // 1. Mobile Menu Toggle
    if (mobileTrigger) {
        mobileTrigger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon if needed
            const icon = mobileTrigger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // 2. Global Spotlight Follow (Disable on mobile for performance)
    if (window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            if (spotlight) {
                spotlight.style.opacity = '1';
                spotlight.style.left = e.clientX + 'px';
                spotlight.style.top = e.clientY + 'px';
            }
        });
    }

    // 3. Navbar Scroll Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 5. Smooth Anchor Scrolling & Auto-close Mobile Menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileTrigger.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
