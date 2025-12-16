// ===================================
// IGEL Joint Selling Playbooks
// Main JavaScript File
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // === Header Scroll Effect ===
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // === Smooth Scroll for Navigation Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // === Playbook Cards Animation on Scroll ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all playbook cards
    const playbookCards = document.querySelectorAll('.playbook-card');
    playbookCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // === Card Click Analytics (Optional) ===
    playbookCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const partner = this.getAttribute('data-partner');
            console.log(`Navigating to ${partner} playbook`);
            
            // Add ripple effect on click
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 209, 1, 0.4)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // === Partner Tags Hover Effect ===
    const partnerTags = document.querySelectorAll('.partner-tag');
    partnerTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.9)';
        tag.style.transition = 'all 0.4s ease';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, 100 * index);
    });
    
    // === Parallax Effect for Hero ===
    const heroContent = document.querySelector('.hero-content');
    const heroPattern = document.querySelector('.hero-pattern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
        
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // === Section Fade In ===
    const sections = document.querySelectorAll('.playbooks-section, .partners-section, .contact-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // === Stats Counter Animation ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateStats();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const hasPercent = text.includes('%');
            const hasSlash = text.includes('/');
            
            if (!hasPercent && !hasSlash) {
                const finalValue = parseInt(text);
                let currentValue = 0;
                const increment = finalValue / 50;
                const duration = 1500;
                const stepTime = duration / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(currentValue);
                    }
                }, stepTime);
            }
        });
    }
    
    // === Contact Items Hover Effect ===
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 209, 1, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 209, 1, 0.05)';
        });
    });
    
    // === Mobile Menu Toggle (if needed in future) ===
    // Placeholder for mobile menu functionality
    
    // === Page Load Animation ===
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // === Console Welcome Message ===
    console.log('%c🎯 IGEL Joint Selling Playbooks', 'color: #FFD101; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to the IGEL Ecosystem Partner Hub', 'color: #B8C1E8; font-size: 14px;');
    
});

// === Add Ripple Animation CSS ===
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            width: 500px;
            height: 500px;
            opacity: 0;
        }
    }
    
    .ripple {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// === Utility Functions ===

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
