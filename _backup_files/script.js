// ==========================================
// NAVIGATION & SCROLL BEHAVIOR
// ==========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const logoPlaceholder = document.getElementById('logoPlaceholder');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// ACTIVE SECTION HIGHLIGHTING
// ==========================================

const sections = document.querySelectorAll('.section');

const highlightNavOnScroll = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavOnScroll);

// ==========================================
// SMOOTH SCROLL
// ==========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll('.stat-card, .problem-item, .solution-card, .revenue-card, .team-member, .timeline-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
};

// Initial check
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ==========================================
// FLOATING CARDS ANIMATION
// ==========================================

const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.3}s`;
});

// ==========================================
// PROGRESS BAR ANIMATION
// ==========================================

const progressBars = document.querySelectorAll('.progress-fill');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        
        if (barTop < window.innerHeight - 100) {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

// Trigger once when section is in view
let progressAnimated = false;

window.addEventListener('scroll', () => {
    if (!progressAnimated) {
        const impactSection = document.getElementById('impact');
        if (impactSection) {
            const sectionTop = impactSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 200) {
                animateProgressBars();
                progressAnimated = true;
            }
        }
    }
});

// ==========================================
// DEMO BUTTON INTERACTION
// ==========================================

const demoBtn = document.querySelector('.demo-btn');

if (demoBtn) {
    demoBtn.addEventListener('click', () => {
        // Add your demo functionality here
        alert('النموذج التفاعلي قيد التطوير! 🚀');
    });
}

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    };
    
    updateCounter();
};

// Trigger counter animation when stats are in view
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    statNumbers.forEach(stat => {
        const statTop = stat.getBoundingClientRect().top;
        
        if (statTop < window.innerHeight - 100 && !statsAnimated) {
            const value = parseInt(stat.textContent);
            stat.dataset.suffix = stat.textContent.replace(/[0-9]/g, '');
            animateCounter(stat, value, 1500);
        }
    });
    
    if (statNumbers.length > 0) {
        const firstStatTop = statNumbers[0].getBoundingClientRect().top;
        if (firstStatTop < window.innerHeight - 100) {
            statsAnimated = true;
        }
    }
};

window.addEventListener('scroll', animateStats);

// ==========================================
// RESULT NUMBERS ANIMATION
// ==========================================

const resultNumbers = document.querySelectorAll('.result-number');
let resultsAnimated = false;

const animateResults = () => {
    if (!resultsAnimated) {
        const mvpSection = document.getElementById('mvp');
        if (mvpSection) {
            const sectionTop = mvpSection.getBoundingClientRect().top;
            
            if (sectionTop < window.innerHeight - 200) {
                resultNumbers.forEach(result => {
                    const text = result.textContent;
                    
                    // Check if it's a percentage
                    if (text.includes('%')) {
                        const value = parseInt(text);
                        result.dataset.suffix = '%';
                        animateCounter(result, value, 1500);
                    }
                    // Check if it contains +
                    else if (text.includes('+')) {
                        const value = parseInt(text);
                        result.dataset.suffix = '+';
                        animateCounter(result, value, 1500);
                    }
                    // Check if it's a rating (contains /)
                    else if (text.includes('/')) {
                        // For ratings like 4.8/5, animate the first number
                        const value = parseFloat(text);
                        let current = 0;
                        const increment = value / 100;
                        
                        const updateRating = () => {
                            current += increment;
                            if (current < value) {
                                result.textContent = current.toFixed(1) + '/5';
                                requestAnimationFrame(updateRating);
                            } else {
                                result.textContent = value + '/5';
                            }
                        };
                        
                        updateRating();
                    }
                });
                
                resultsAnimated = true;
            }
        }
    }
};

window.addEventListener('scroll', animateResults);

// ==========================================
// LOGO PLACEHOLDER
// ==========================================

// Create a simple gradient placeholder if no logo image exists
if (logoPlaceholder) {
    logoPlaceholder.onerror = function() {
        this.style.display = 'none';
        const logoContainer = this.parentElement;
        if (logoContainer) {
            logoContainer.style.background = 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)';
            logoContainer.style.width = '40px';
            logoContainer.style.height = '40px';
            logoContainer.style.borderRadius = '50%';
            logoContainer.style.display = 'flex';
            logoContainer.style.alignItems = 'center';
            logoContainer.style.justifyContent = 'center';
            logoContainer.innerHTML = '<span style="color: white; font-weight: 800; font-size: 1.2rem;">A</span>';
        }
    };
}

// ==========================================
// INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.stat-card, .problem-item, .solution-card, .revenue-card, .team-member, .step-card').forEach(el => {
    observer.observe(el);
});

// ==========================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ==========================================

const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// ADD HOVER EFFECT TO CARDS
// ==========================================

const cards = document.querySelectorAll('.stat-card, .solution-card, .revenue-card, .team-member');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==========================================
// FEATURE BOXES STAGGER ANIMATION
// ==========================================

const featureBoxes = document.querySelectorAll('.feature-box');

featureBoxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        box.style.transition = 'all 0.4s ease';
        box.style.opacity = '1';
        box.style.transform = 'translateY(0)';
    }, index * 100);
});

// ==========================================
// CTA BUTTONS RIPPLE EFFECT
// ==========================================

const buttons = document.querySelectorAll('.btn, .demo-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c ARO - ارو ', 'background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); color: white; font-size: 24px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c تحويل تجربة الطلاب إلى رحلة استثنائية 🚀 ', 'font-size: 16px; color: #667EEA; font-weight: bold;');
console.log('%c Made with ❤️ for the Hackathon ', 'font-size: 12px; color: #636E72;');

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});


// ==========================================
// BUSINESS CAROUSEL - NAVIGATION & INTERACTION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // ==========================================
    // SLIDE NAVIGATION
    // ==========================================
    
    function showSlide(index) {
        // Wrap around
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'slide-out-left', 'slide-out-right');
            
            if (i === currentSlide) {
                slide.classList.add('active');
            } else if (i < currentSlide) {
                slide.classList.add('slide-out-left');
            } else {
                slide.classList.add('slide-out-right');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        // IMPORTANT: Close all expanded cards when changing slides
        closeAllCards();
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Button clicks
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    
    document.addEventListener('keydown', (e) => {
        // Only navigate when not typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        }
    });

    // ==========================================
    // CARD EXPANSION - FIXED TO ONLY OPEN ONE AT A TIME
    // ==========================================
    
    // Function to close all cards
    function closeAllCards() {
        const allCards = document.querySelectorAll('.canvas-card-full');
        allCards.forEach(card => {
            card.classList.remove('expanded');
        });
    }
    
    // Attach click listeners to all card headers
    const allCardHeaders = document.querySelectorAll('.card-header-full');
    
    allCardHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const clickedCard = this.closest('.canvas-card-full');
            const wasExpanded = clickedCard.classList.contains('expanded');
            
            // STEP 1: Close ALL cards first
            closeAllCards();
            
            // STEP 2: If this card was NOT expanded, expand it now
            if (!wasExpanded) {
                clickedCard.classList.add('expanded');
                
                // Smooth scroll to card if it's below viewport
                setTimeout(() => {
                    const cardRect = clickedCard.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (cardRect.bottom > windowHeight) {
                        clickedCard.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }
                }, 300);
            }
            // If it WAS expanded, it stays closed (because we closed all)
        });
    });

    // ==========================================
    // SWIPE SUPPORT FOR MOBILE
    // ==========================================
    
    let touchStartX = 0;
    let touchEndX = 0;
    const carousel = document.querySelector('.business-carousel');
    
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left - show next (in RTL, swipe left = next)
                    nextSlide();
                } else {
                    // Swiped right - show previous (in RTL, swipe right = previous)
                    prevSlide();
                }
            }
        }
    }

    // ==========================================
    // SCROLL REVEAL ANIMATION
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all card items for scroll reveal
    document.querySelectorAll('.card-item').forEach(item => {
        observer.observe(item);
    });
});