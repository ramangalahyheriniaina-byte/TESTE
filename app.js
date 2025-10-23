// Configuration GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    initApp();
});

function initApp() {
    // Loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 2000);

    // Navigation
    initNavigation();
    
    // Theme toggle
    initTheme();
    
    // Animations
    initAnimations();
    
    // Filtres projets
    initProjectFilters();
    
    // Formulaire contact
    initContactForm();
    
    // Compteurs animés
    initCounters();
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksAll = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle menu mobile
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Fermer le menu au clic sur un lien
    navLinksAll.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navigation scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Navbar shadow on scroll
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Theme toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Appliquer le thème sauvegardé
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        // Mettre à jour l'icône selon le thème
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeIcon(newTheme);
            
            // Animation du toggle
            gsap.fromTo(themeToggle, 
                { rotation: -15, scale: 0.9 },
                { rotation: 0, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
            );
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');

    if (theme === 'dark') {
        gsap.to(sunIcon, { rotation: -90, opacity: 0, duration: 0.3 });
        gsap.to(moonIcon, { rotation: 0, opacity: 1, duration: 0.3, delay: 0.1 });
    } else {
        gsap.to(moonIcon, { rotation: 90, opacity: 0, duration: 0.3 });
        gsap.to(sunIcon, { rotation: 0, opacity: 1, duration: 0.3, delay: 0.1 });
    }
}

// Animations
function initAnimations() {
    // Hero animations
    gsap.from('.hero-title .title-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out'
    });

    gsap.from('.hero-actions', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power2.out'
    });

    gsap.from('.terminal-window', {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    // Sections animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Cards animations
    gsap.utils.toArray('.project-card, .expertise-card, .contact-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // Progress bars animation
    gsap.utils.toArray('.level-progress').forEach(progress => {
        const level = progress.getAttribute('data-level');
        ScrollTrigger.create({
            trigger: progress,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(progress, {
                    width: `${level}%`,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Filtres projets
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0.3,
                        scale: 0.9,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    });
}

// Formulaire contact
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Simulation d'envoi
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Envoi en cours...';
            
            gsap.to(submitBtn, {
                scale: 0.95,
                duration: 0.2
            });
            
            setTimeout(() => {
                // Réinitialiser le formulaire
                this.reset();
                
                // Message de succès
                showNotification('Message envoyé avec succès !', 'success');
                
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
                
                gsap.to(submitBtn, {
                    scale: 1,
                    duration: 0.2
                });
            }, 2000);
        });
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    
    // Styles pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontWeight: '500',
        transform: 'translateX(400px)',
        opacity: '0',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    gsap.to(notification, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });
    
    // Disparition après 4 secondes
    setTimeout(() => {
        gsap.to(notification, {
            x: 400,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                notification.remove();
            }
        });
    }, 4000);
}

// Compteurs animés
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Gestion du redimensionnement
window.addEventListener('resize', function() {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('active');
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    }
});

// Service Worker pour le cache (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}