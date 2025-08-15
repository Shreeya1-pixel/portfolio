// Smooth animations and interactions for Shreeya Gupta's portfolio
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setupPageLoader();
        this.setupScrollAnimations();
        this.setupNavigationEffects();
        this.setupParallaxEffects();
        this.setupFormHandler();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupTextAnimations();
        this.setupHoverEffects();
    }

    // Custom Cursor
    setupCustomCursor() {
        const cursor = document.querySelector('.cursor');
        
        if (!cursor) return;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .published-item, .education-card, .service-item, .nav-link, .skill-category, .project-item, .experience-item, .achievement-item, .certification-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.color = 'var(--color-gold)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.color = 'var(--color-accent)';
            });
        });
    }

    // Page Loader
    setupPageLoader() {
        const loader = document.querySelector('.page-loader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                this.animateHeroElements();
            }, 1500);
        });
    }

    // Hero Elements Animation
    animateHeroElements() {
        const staticIcons = document.querySelectorAll('.static-icon');
        const nameElements = document.querySelectorAll('.name-first, .name-last');
        
        // Animate name elements
        nameElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 300);
        });
        
        // Animate icons
        staticIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.opacity = '1';
                icon.style.transform = icon.classList.contains('chess-icon') 
                    ? 'translateX(-50%) scale(1)' 
                    : 'scale(1)';
            }, 800 + (index * 200));
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const navigation = document.querySelector('.navigation');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Navigation background
            if (currentScroll > 100) {
                navigation.classList.add('scrolled');
            } else {
                navigation.classList.remove('scrolled');
            }

            // Navigation hide/show
            if (currentScroll > lastScroll && currentScroll > 500) {
                navigation.style.transform = 'translateY(-100%)';
            } else {
                navigation.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Navigation Effects
    setupNavigationEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        // Active section highlighting
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            navObserver.observe(section);
        });

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    // Parallax Effects
    setupParallaxEffects() {
        const staticIcons = document.querySelectorAll('.static-icon');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            staticIcons.forEach((icon, index) => {
                const parallaxSpeed = 0.1 + (index * 0.05);
                const translateY = scrolled * parallaxSpeed;
                icon.style.transform = `translateY(${translateY}px)`;
            });
        });
    }

    // Form Handler
    setupFormHandler() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                try {
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        this.showNotification('Message sent successfully!', 'success');
                        form.reset();
                    } else {
                        this.showNotification('Error sending message. Please try again.', 'error');
                    }
                } catch (error) {
                    this.showNotification('Error sending message. Please try again.', 'error');
                }
            });
        }
    }

    // Notification System
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 10px;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.portfolio-item, .published-item, .education-card, .service-item, .timeline-item, .stat-item, .recognition-item, .skill-category, .project-item, .experience-item, .achievement-item, .certification-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Text Animations
    setupTextAnimations() {
        // Typewriter effect for quotes
        const quotes = document.querySelectorAll('.loader-quote, .footer-quote');
        
        quotes.forEach(quote => {
            const text = quote.textContent;
            quote.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    quote.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typewriter when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(quote);
        });
    }

    // Hover Effects
    setupHoverEffects() {
        // Portfolio items hover effect
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Published items book effect
        const publishedItems = document.querySelectorAll('.published-item');
        publishedItems.forEach(item => {
            const bookCover = item.querySelector('.book-cover');
            item.addEventListener('mouseenter', () => {
                if (bookCover) {
                    bookCover.style.transform = 'rotateY(-25deg) rotateX(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (bookCover) {
                    bookCover.style.transform = 'rotateY(0deg) rotateX(0deg)';
                }
            });
        });

        // Service items hover effect
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Scroll Progress Indicator
    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #e94560, #d4af37);
            z-index: 10000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Literary-themed Easter Eggs
    setupEasterEggs() {
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.showLiteraryQuote();
                konamiCode = [];
            }
        });
    }

    showLiteraryQuote() {
        const quotes = [
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. - Jane Austen",
            "I declare after all there is no enjoyment like reading! - Jane Austen",
            "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid. - Jane Austen"
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.showNotification(randomQuote, 'quote');
    }
}

// CSS for animated elements
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .notification.quote {
        background: linear-gradient(135deg, #1a1a2e, #16213e) !important;
        max-width: 400px;
        font-style: italic;
        font-family: 'Playfair Display', serif;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(250, 247, 242, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-radius: 0 0 20px 20px;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});

// Additional smooth interactions
window.addEventListener('load', () => {
    // Add stagger animation to grid items
    const gridItems = document.querySelectorAll('.portfolio-grid .portfolio-item, .published-grid .published-item, .education-grid .education-card, .services-grid .service-item, .skills-grid .skill-category, .projects-grid .project-item, .leadership-grid .leadership-category');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in-up');
    });
    
    // Initialize static icons and name elements
    const staticIcons = document.querySelectorAll('.static-icon');
    const nameElements = document.querySelectorAll('.name-first, .name-last');
    
    staticIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = icon.classList.contains('chess-icon') 
            ? 'translateX(-50%) scale(0.8)' 
            : 'scale(0.8)';
        icon.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    nameElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical images
const preloadImages = () => {
    const imageUrls = [
        '/assets/images/musings-of-life.png',
        '/assets/images/Blue Whispers at Midnight.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};

preloadImages(); 