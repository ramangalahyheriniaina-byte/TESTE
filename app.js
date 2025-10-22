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

    // Navigation améliorée
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
    
    // Optimisations mobiles supplémentaires
    initMobileOptimizations();
}

// Navigation améliorée pour mobile
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksAll = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle menu mobile amélioré
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Empêcher le scroll du body quand le menu est ouvert
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                // Animation d'entrée du menu
                gsap.fromTo(navLinks, 
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
                );
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Fermer le menu au clic sur un lien (amélioré)
    navLinksAll.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                // Petit délai pour une transition plus fluide
                setTimeout(() => {
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
                
                e.preventDefault();
            }
        });
    });

    // Navigation scroll améliorée
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ne pas interrompre si c'est déjà géré pour mobile
            if (window.innerWidth > 768 || !this.classList.contains('nav-link')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active link on scroll avec optimisation mobile
    const sections = document.querySelectorAll('section[id]');
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        // Debounce le scroll pour les performances mobiles
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });

            // Navbar shadow on scroll avec optimisation
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }, 10);
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
            
            // Animation du toggle améliorée pour mobile
            gsap.fromTo(themeToggle, 
                { rotation: -15, scale: 0.9 },
                { rotation: 0, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
            );
            
            // Animation de transition de thème
            gsap.to('body', {
                duration: 0.3,
                ease: 'power2.inOut',
                backgroundColor: newTheme === 'dark' ? '#0f172a' : '#ffffff'
            });
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

// Animations optimisées pour mobile
function initAnimations() {
    // Vérifier si c'est un appareil mobile pour désactiver certaines animations
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        // Hero animations (désactivées sur mobile pour les performances)
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
    } else {
        // Animations simplifiées pour mobile
        gsap.from('.hero-title .title-line', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        });

        gsap.from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: 0.3,
            ease: 'power2.out'
        });
    }

    // Sections animations avec optimisation mobile
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: isMobile ? 'top 90%' : 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                // Désactiver le scrub sur mobile pour les performances
                scrub: !isMobile
            },
            y: isMobile ? 30 : 50,
            opacity: 0,
            duration: isMobile ? 0.6 : 1,
            ease: 'power2.out'
        });
    });

    // Cards animations optimisées
    gsap.utils.toArray('.project-card, .expertise-card, .contact-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: isMobile ? 'top 95%' : 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: isMobile ? 20 : 30,
            opacity: 0,
            duration: isMobile ? 0.4 : 0.6,
            ease: 'power2.out',
            stagger: isMobile ? 0.1 : 0.2
        });
    });

    // Progress bars animation avec optimisation
    gsap.utils.toArray('.level-progress').forEach(progress => {
        const level = progress.getAttribute('data-level');
        ScrollTrigger.create({
            trigger: progress,
            start: isMobile ? 'top 95%' : 'top 85%',
            onEnter: () => {
                gsap.to(progress, {
                    width: `${level}%`,
                    duration: isMobile ? 1 : 1.5,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Animation du terminal typing
    initTerminalAnimation();
}

// Animation du terminal
function initTerminalAnimation() {
    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    if (typedText && cursor) {
        const commands = ['terraform plan', 'docker build . -t app', 'kubectl apply -f k8s/'];
        let currentCommand = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function type() {
            const current = commands[currentCommand];
            
            if (isDeleting) {
                typedText.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typedText.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            if (!isDeleting && currentChar === current.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentCommand = (currentCommand + 1) % commands.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        
        // Démarrer l'animation après un délai
        setTimeout(type, 1000);
        
        // Animation du curseur
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
}

// Filtres projets avec optimisation mobile
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Animation du bouton cliqué
            gsap.fromTo(btn, 
                { scale: 0.95 },
                { scale: 1, duration: 0.2, ease: 'back.out(1.7)' }
            );

            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter projects avec animation optimisée
            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category').split(' ');
                const delay = window.innerWidth <= 768 ? index * 0.05 : index * 0.1;
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        delay: delay,
                        ease: 'power2.out',
                        display: 'block'
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0.3,
                        scale: 0.9,
                        duration: 0.3,
                        delay: delay,
                        ease: 'power2.out'
                    });
                }
            });
            
            // Scroll vers les projets si sur mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const projectsSection = document.getElementById('projets');
                    if (projectsSection) {
                        const offsetTop = projectsSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 400);
            }
        });
    });
}

// Formulaire contact amélioré
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Gestion des labels flottants
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Vérifier si le champ a déjà du contenu
                if (input.value) {
                    label.classList.add('active');
                }
                
                input.addEventListener('focus', () => {
                    label.classList.add('active');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.classList.remove('active');
                    }
                });
            }
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Validation basique
            if (!validateForm(this)) {
                showNotification('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            // Simulation d'envoi
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Envoi en cours...';
            
            gsap.to(submitBtn, {
                scale: 0.95,
                duration: 0.2
            });
            
            // Animation de progression
            const progress = document.createElement('div');
            progress.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                width: 0%;
                border-radius: 0 0 50px 50px;
                transition: width 2s ease;
            `;
            submitBtn.style.position = 'relative';
            submitBtn.appendChild(progress);
            
            // Animation de progression
            gsap.to(progress, {
                width: '100%',
                duration: 2,
                ease: 'power2.inOut'
            });
            
            setTimeout(() => {
                // Réinitialiser le formulaire
                this.reset();
                
                // Réinitialiser les labels
                formGroups.forEach(group => {
                    const label = group.querySelector('label');
                    if (label) label.classList.remove('active');
                });
                
                // Message de succès
                showNotification('Message envoyé avec succès ! Je vous réponds dans les 24h.', 'success');
                
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
                progress.remove();
                
                gsap.to(submitBtn, {
                    scale: 1,
                    duration: 0.2
                });
                
                // Vibration sur mobile si supporté
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
            }, 2000);
        });
    }
}

// Validation du formulaire
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            // Animation d'erreur
            gsap.fromTo(field, 
                { x: -10 },
                { x: 0, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
            );
            field.style.borderColor = 'var(--error)';
            
            // Réinitialiser la couleur après un délai
            setTimeout(() => {
                field.style.borderColor = '';
            }, 2000);
        }
    });
    
    return isValid;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    
    // Styles pour la notification avec optimisation mobile
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        left: window.innerWidth <= 768 ? '20px' : 'auto',
        background: type === 'success' ? 'var(--success)' : 'var(--error)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontWeight: '500',
        transform: window.innerWidth <= 768 ? 'translateY(-100px)' : 'translateX(400px)',
        opacity: '0',
        maxWidth: window.innerWidth <= 768 ? 'calc(100vw - 40px)' : '400px'
    });
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    gsap.to(notification, {
        [window.innerWidth <= 768 ? 'y' : 'x']: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });
    
    // Disparition après 4 secondes
    setTimeout(() => {
        gsap.to(notification, {
            [window.innerWidth <= 768 ? 'y' : 'x']: window.innerWidth <= 768 ? -100 : 400,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                notification.remove();
            }
        });
    }, 4000);
    
    // Fermer au clic sur mobile
    if (window.innerWidth <= 768) {
        notification.style.cursor = 'pointer';
        notification.addEventListener('click', () => {
            gsap.to(notification, {
                y: -100,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    notification.remove();
                }
            });
        });
    }
}

// Compteurs animés avec optimisation mobile
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = window.innerWidth <= 768 ? 1500 : 2000; // Plus rapide sur mobile
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
                            
                            // Petite animation à la fin
                            gsap.fromTo(counter, 
                                { scale: 1.2 },
                                { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
                            );
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: window.innerWidth <= 768 ? 0.1 : 0.2 // Seuil plus bas sur mobile
        });
        
        observer.observe(counter);
    });
}

// Optimisations mobiles supplémentaires
function initMobileOptimizations() {
    // Désactiver les animations lourdes sur les vieux appareils mobiles
    if (window.innerWidth <= 768 && !isHighEndDevice()) {
        gsap.globalTimeline.timeScale(1.5); // Accélérer les animations
    }
    
    // Gestion du viewport sur l'orientation
    window.addEventListener('orientationchange', function() {
        // Petit délai pour laisser le temps à la rotation
        setTimeout(() => {
            document.body.scrollTop = 0;
            if (window.scrollY > 0) {
                window.scrollTo(0, window.scrollY);
            }
        }, 300);
    });
    
    // Empêcher le zoom sur les inputs sur iOS
    document.addEventListener('touchstart', function() {}, { passive: true });
}

// Détection des appareils performants
function isHighEndDevice() {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    
    if (isIOS) {
        // iOS devices récents
        return !/OS [1-9]|OS 1[0-2]/.test(userAgent);
    }
    
    if (isAndroid) {
        // Android devices récents
        return !/Android [2-5]/.test(userAgent);
    }
    
    return true; // Par défaut, considérer comme performant
}

// Gestion du redimensionnement améliorée
let resizeTimeout;
window.addEventListener('resize', function() {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    
    // Debounce le redimensionnement
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
        
        // Réinitialiser certaines animations si nécessaire
        ScrollTrigger.refresh();
    }, 250);
});

// Gestion du touch et swipe
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

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

// Gestion de la visibilité de la page pour les performances
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Ralentir les animations quand la page n'est pas visible
        gsap.globalTimeline.timeScale(0.5);
    } else {
        // Reprendre la vitesse normale
        gsap.globalTimeline.timeScale(1);
    }
});

// Préchargement des images critiques
function preloadCriticalImages() {
    const criticalImages = [
        'Image/322895941_741704226956251_1281742835380426626_n.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialiser le préchargement après le chargement
window.addEventListener('load', preloadCriticalImages);