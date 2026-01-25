/* ============================================
   CHRONOS - Luxury Watch Website
   Interactive JavaScript
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    initPreloader();
    initStarfield();
    initNavbar();
    initScrollAnimations();
    initCounterAnimations();
    initParallaxEffects();
    initSmoothScroll();
    initProductCards();
    initNewsletterForm();
});

/* ============================================
   Wave Canvas Animation
   ============================================ */
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave configuration
    const waves = [
        { amplitude: 50, wavelength: 0.003, speed: 0.015, yOffset: 0.6, color: 'rgba(10, 30, 60, 0.8)', blur: 0 },
        { amplitude: 40, wavelength: 0.004, speed: 0.02, yOffset: 0.65, color: 'rgba(15, 45, 90, 0.6)', blur: 2 },
        { amplitude: 35, wavelength: 0.005, speed: 0.025, yOffset: 0.7, color: 'rgba(25, 60, 120, 0.5)', blur: 4 },
        { amplitude: 30, wavelength: 0.006, speed: 0.018, yOffset: 0.75, color: 'rgba(40, 80, 150, 0.4)', blur: 6 },
        { amplitude: 25, wavelength: 0.007, speed: 0.022, yOffset: 0.8, color: 'rgba(60, 100, 180, 0.3)', blur: 8 },
        { amplitude: 20, wavelength: 0.008, speed: 0.028, yOffset: 0.85, color: 'rgba(74, 159, 245, 0.25)', blur: 10 }
    ];

    // Draw a single wave
    function drawWave(wave, timeOffset) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 2) {
            const y = canvas.height * wave.yOffset +
                Math.sin(x * wave.wavelength + time * wave.speed + timeOffset) * wave.amplitude +
                Math.sin(x * wave.wavelength * 0.5 + time * wave.speed * 0.7) * wave.amplitude * 0.5;
            ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        // Create gradient for each wave
        const gradient = ctx.createLinearGradient(0, canvas.height * wave.yOffset - wave.amplitude, 0, canvas.height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'rgba(5, 15, 35, 0.9)');

        ctx.fillStyle = gradient;
        ctx.filter = wave.blur > 0 ? `blur(${wave.blur}px)` : 'none';
        ctx.fill();
        ctx.filter = 'none';
    }

    // Draw floating particles on waves
    const particles = [];
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.4 + canvas.height * 0.5,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random() * 0.5 + 0.3
        });
    }

    function drawParticles() {
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y + Math.sin(time * 0.02 + p.x * 0.01) * 10, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 159, 245, ${p.opacity * (0.5 + Math.sin(time * 0.03 + p.x) * 0.3)})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(74, 159, 245, 0.5)';
            ctx.fill();
            ctx.shadowBlur = 0;

            p.x -= p.speed;
            if (p.x < -10) {
                p.x = canvas.width + 10;
                p.y = Math.random() * canvas.height * 0.4 + canvas.height * 0.5;
            }
        });
    }

    // Animation loop
    function animate() {
        // Dark gradient background
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#050a15');
        bgGradient.addColorStop(0.3, '#0a1525');
        bgGradient.addColorStop(0.6, '#0d1a30');
        bgGradient.addColorStop(1, '#081020');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw subtle glow at top
        const topGlow = ctx.createRadialGradient(
            canvas.width * 0.3, canvas.height * 0.2, 0,
            canvas.width * 0.3, canvas.height * 0.2, canvas.width * 0.5
        );
        topGlow.addColorStop(0, 'rgba(74, 159, 245, 0.08)');
        topGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = topGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw waves from back to front
        waves.forEach((wave, index) => {
            drawWave(wave, index * 0.5);
        });

        // Draw particles
        drawParticles();

        time++;
        requestAnimationFrame(animate);
    }

    animate();
}


/* ============================================
   Preloader
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    // Hide preloader after animation completes
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';

        // Trigger initial animations
        triggerHeroAnimations();
    }, 2500);
}

function triggerHeroAnimations() {
    // Add staggered animations to hero elements
    const heroElements = document.querySelectorAll('.hero .animate-fade-in, .hero .animate-slide-up, .hero .animate-fade-in-delay, .hero .animate-fade-in-delay-2');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   Scroll Animations
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered delay for grid items
                if (entry.target.closest('.collection-grid') || entry.target.closest('.features-grid')) {
                    const siblings = entry.target.parentElement.children;
                    const index = Array.from(siblings).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ============================================
   Counter Animations
   ============================================ */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ============================================
   Parallax Effects
   ============================================ */
function initParallaxEffects() {
    const heroWatch = document.querySelector('.hero-watch');
    const heroParticles = document.querySelector('.hero-particles');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (heroWatch) {
            heroWatch.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX - innerWidth / 2) / innerWidth;
            const yPos = (clientY - innerHeight / 2) / innerHeight;

            if (heroWatch) {
                heroWatch.style.transform = `translate(${xPos * 20}px, ${yPos * 20}px)`;
            }
        });
    }
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   Product Card Interactions
   ============================================ */
function initProductCards() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        // 3D tilt effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });

        // Add to cart animation
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();

                // Button animation
                addToCartBtn.classList.add('added');
                addToCartBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                `;

                // Update cart count
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    const currentCount = parseInt(cartCount.textContent);
                    cartCount.textContent = currentCount + 1;
                    cartCount.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        cartCount.style.transform = 'scale(1)';
                    }, 200);
                }

                // Reset button after delay
                setTimeout(() => {
                    addToCartBtn.classList.remove('added');
                    addToCartBtn.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    `;
                }, 2000);
            });
        }

        // Quick view button
        const quickViewBtn = card.querySelector('.quick-view-btn');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', () => {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                quickViewBtn.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);

                // Could open a modal here
                console.log('Quick view clicked');
            });
        }
    });
}

/* ============================================
   Newsletter Form
   ============================================ */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const input = form.querySelector('.newsletter-input');
            const button = form.querySelector('.btn');
            const originalText = button.innerHTML;

            // Validate email
            if (input.value && isValidEmail(input.value)) {
                // Show loading state
                button.innerHTML = '<span>Subscribing...</span>';
                button.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    button.innerHTML = '<span>✓ Subscribed!</span>';
                    button.style.background = 'linear-gradient(135deg, #4ADE80, #22C55E)';
                    input.value = '';

                    // Reset after delay
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.style.background = '';
                        button.disabled = false;
                    }, 3000);
                }, 1500);
            } else {
                // Show error state
                input.style.borderColor = '#F87171';
                input.style.animation = 'shake 0.5s ease';

                setTimeout(() => {
                    input.style.borderColor = '';
                    input.style.animation = '';
                }, 500);
            }
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================
   Additional Utility Functions
   ============================================ */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mouse events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add shake animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .add-to-cart-btn.added {
        background: var(--color-gold-primary) !important;
        color: var(--color-bg-primary) !important;
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   Create Floating Particles
   ============================================ */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * -20}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

/* ============================================
   Image Lazy Loading
   ============================================ */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading
initLazyLoading();

/* ============================================
   Console Easter Egg
   ============================================ */
console.log('%c🕰️ CHRONOS', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%cLuxury Timepieces Since 1876', 'font-size: 14px; color: #A0A0A8;');
console.log('%cCrafted with precision and passion.', 'font-size: 12px; color: #6B6B75;');
