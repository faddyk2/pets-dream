// Navbar functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Hide/show navbar on scroll and update progress bar
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar hide/show logic
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
    
    // Update scroll progress
    updateScrollProgress();
    
    // Show/hide back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
}

// Video Slider functionality
class VideoSlider {
    constructor() {
        this.currentSlide = 0;
        this.videos = document.querySelectorAll('.video-container');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.nav-arrow-left');
        this.nextBtn = document.querySelector('.nav-arrow-right');
        this.titleElement = document.getElementById('slide-title');
        this.descriptionElement = document.getElementById('slide-description');
        
        // Content data for each slide
        this.slideContent = [
            {
                title: "Say Goodbye to Excess Pet Hair with Professional Deshedding",
                description: "We use safe, gentle grooming tools designed to remove loose fur without irritating your pet's skin. Regular deshedding sessions can significantly cut down on the amount of hair your pet sheds year-round."
            },
            {
                title: "De-Matting - From Matted to Marvelous – Safe, Gentle Coat Restoration",
                description: "We prioritize your pet's well-being and only proceed with de-matting when it's safe and humane. In some cases, a full shave-down may be the best option, which we will discuss with you beforehand."
            },
            {
                title: "Full Grooming - Fresh, Clean, and Stylish – Full-Service Grooming Your Pet Deserves",
                description: "We tailor each grooming session to your pet's coat type, skin sensitivity, and personality—because grooming should never be stressful."
            },
            {
                title: "Flea & Tick Treatment - Bite-Free, Stress-Free – Powerful Protection from Fleas & Ticks",
                description: "Our products are gentle on pets but deadly to pests, providing immediate relief without harsh chemicals. For severe infestations, we may recommend follow-up treatments or vet consultation."
            },
            {
                title: "Tangle Reopening - Gently Untangle the Trouble – Comfort Starts with a Smooth Coat",
                description: "We gently work through knots without shaving the coat unless absolutely necessary. Regular brushing and tangle prevention advice will also be provided to help maintain coat health at home."
            },
            {
                title: "Medicated Treatments - Soothe Their Skin, Heal with Care – Medicated Baths for Healthier Pets",
                description: "Our groomers are trained to gently cleanse and treat affected areas, ensuring your pet feels calm and cared for throughout the session. After the treatment, we follow up with a coat-safe moisturizer or leave-in formula to prevent dryness and promote healing."
            }
        ];
        
        this.init();
    }
    
    init() {
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Add click events to navigation arrows
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        


        // Pause auto-play when user interacts
        this.videos.forEach(video => {
            const videoElement = video.querySelector('video');
            videoElement.addEventListener('play', () => this.pauseAutoPlay());
            videoElement.addEventListener('pause', () => this.startAutoPlay());
        });
        
        // Initialize with first slide content
        this.updateContent();
    }
    
    updateContent() {
        const content = this.slideContent[this.currentSlide];
        
        // Add fade out effect
        this.titleElement.style.opacity = '0';
        this.descriptionElement.style.opacity = '0';
        
        setTimeout(() => {
            this.titleElement.textContent = content.title;
            this.descriptionElement.textContent = content.description;
            
            // Fade in new content
            this.titleElement.style.opacity = '1';
            this.descriptionElement.style.opacity = '1';
        }, 200);
    }
    
    goToSlide(slideIndex) {
        // Pause all videos
        this.pauseAllVideos();
        
        // Remove active class from current slide and dot
        this.videos[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and dot
        this.videos[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // Update content
        this.updateContent();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.videos.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.videos.length) % this.videos.length;
        this.goToSlide(prevIndex);
    }
    
    pauseAllVideos() {
        this.videos.forEach(container => {
            const video = container.querySelector('video');
            video.pause();
        });
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            // Only auto-advance if no video is currently playing
            const currentVideo = this.videos[this.currentSlide].querySelector('video');
            if (currentVideo.paused) {
                this.nextSlide();
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

class SupplementsSlider {
    constructor() {
        this.track = document.getElementById('supplements-track');
        this.prevBtn = document.getElementById('supplements-prev');
        this.nextBtn = document.getElementById('supplements-next');
        this.cards = document.querySelectorAll('.supplement-card');
        this.dots = document.querySelectorAll('.supplement-dot');
        this.cardWidth = 410;
        this.gap = 32;
        this.currentPosition = 0;
        this.totalCards = this.cards.length;
        this.visibleCards = 3;
        this.isInfinite = true;
        this.autoPlayInterval = null;
        this.isUserInteracting = false;
        
        // Touch/swipe properties
        this.touchStartX = 0;
        this.touchCurrentX = 0;
        this.touchStartY = 0;
        this.isDragging = false;
        this.startPosition = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationId = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.calculateVisibleCards();
        this.updatePosition();
        this.updateButtons();
        this.updateDots();
        this.setupTouchEvents();
        
        this.prevBtn.addEventListener('click', () => {
            this.handleUserInteraction();
            this.slideLeft();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.handleUserInteraction();
            this.slideRight();
        });
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.handleUserInteraction();
                this.goToSlide(index);
            });
        });
        
        window.addEventListener('resize', () => {
            this.calculateVisibleCards();
            this.updatePosition();
            this.updateButtons();
        });
        
        this.track.parentElement.addEventListener('mouseenter', () => {
            this.isUserInteracting = true;
            this.pauseAutoPlay();
        });
        
        this.track.parentElement.addEventListener('mouseleave', () => {
            this.isUserInteracting = false;
            setTimeout(() => {
                if (!this.isUserInteracting) {
                    this.startAutoPlay();
                }
            }, 1000);
        });
        
        this.startAutoPlay();
    }
    
    setupTouchEvents() {
        // Mouse events
        this.track.addEventListener('mousedown', this.touchStart.bind(this));
        this.track.addEventListener('mousemove', this.touchMove.bind(this));
        this.track.addEventListener('mouseup', this.touchEnd.bind(this));
        this.track.addEventListener('mouseleave', this.touchEnd.bind(this));
        
        // Touch events
        this.track.addEventListener('touchstart', this.touchStart.bind(this), { passive: false });
        this.track.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
        this.track.addEventListener('touchend', this.touchEnd.bind(this));
        
        // Prevent context menu
        this.track.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Prevent drag on images
        this.track.addEventListener('dragstart', (e) => e.preventDefault());
    }
    
    touchStart(e) {
        this.isDragging = true;
        this.startPosition = this.currentTranslate;
        this.isAnimating = false;
        this.pauseAutoPlay();
        
        if (e.type === 'touchstart') {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        } else {
            this.touchStartX = e.clientX;
            this.touchStartY = e.clientY;
            e.preventDefault();
        }
        
        this.track.style.transition = 'none';
    }
    
    touchMove(e) {
        if (!this.isDragging) return;
        
        let currentX, currentY;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }
        
        // Check if it's a vertical scroll (let browser handle it)
        const deltaY = Math.abs(currentY - this.touchStartY);
        const deltaX = Math.abs(currentX - this.touchStartX);
        
        if (deltaY > deltaX && deltaY > 10) {
            this.isDragging = false;
            return;
        }
        
        if (deltaX > 10) {
            e.preventDefault();
        }
        
        this.touchCurrentX = currentX;
        const dragDistance = this.touchCurrentX - this.touchStartX;
        this.currentTranslate = this.startPosition + dragDistance;
        
        // Add resistance at boundaries
        const maxTranslate = 0;
        const minTranslate = -((this.totalCards - 1) * (this.cardWidth + this.gap));
        
        if (this.currentTranslate > maxTranslate) {
            this.currentTranslate = maxTranslate + (this.currentTranslate - maxTranslate) * 0.3;
        } else if (this.currentTranslate < minTranslate) {
            this.currentTranslate = minTranslate + (this.currentTranslate - minTranslate) * 0.3;
        }
        
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    
    touchEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        const dragDistance = this.touchCurrentX - this.touchStartX;
        const threshold = 50;
        
        if (Math.abs(dragDistance) > threshold) {
            if (dragDistance > 0) {
                this.slideLeft();
            } else {
                this.slideRight();
            }
        } else {
            // Snap back to current position
            this.updatePosition();
        }
        
        // Resume auto-play after a delay
        setTimeout(() => {
            if (!this.isUserInteracting) {
                this.startAutoPlay();
            }
        }, 2000);
    }
    
    calculateVisibleCards() {
        const containerWidth = window.innerWidth;
        
        if (containerWidth <= 480) {
            this.visibleCards = 1;
            this.cardWidth = 280;
            this.gap = 26;
        } else if (containerWidth <= 768) {
            this.visibleCards = 1;
            this.cardWidth = 320;
            this.gap = 24;
        } else if (containerWidth <= 1024) {
            this.visibleCards = 2;
            this.cardWidth = 410;
            this.gap = 32;
        } else {
            this.visibleCards = 3;
            this.cardWidth = 410;
            this.gap = 32;
        }
    }
    
    handleUserInteraction() {
        this.isUserInteracting = true;
        this.pauseAutoPlay();
        setTimeout(() => {
            this.isUserInteracting = false;
            this.startAutoPlay();
        }, 4000);
    }
    
    goToSlide(index) {
        this.currentPosition = Math.max(0, Math.min(index, this.totalCards - 1));
        this.updatePosition();
        this.updateButtons();
        this.updateDots();
    }
    
    slideLeft() {
        this.currentPosition--;
        if (this.currentPosition < 0) {
            this.currentPosition = this.totalCards - 1;
        }
        this.updatePosition();
        this.updateButtons();
        this.updateDots();
    }
    
    slideRight() {
        this.currentPosition++;
        if (this.currentPosition >= this.totalCards) {
            this.currentPosition = 0;
        }
        this.updatePosition();
        this.updateButtons();
        this.updateDots();
    }
    
    updatePosition() {
        let translateX = -(this.currentPosition * (this.cardWidth + this.gap));
    
        // Ensure we don't scroll past the last card
        const maxTranslate = -((this.totalCards - this.visibleCards) * (this.cardWidth + this.gap));
        if (this.totalCards > this.visibleCards) {
            translateX = Math.max(translateX, maxTranslate);
        }
        
        this.currentTranslate = translateX;
        this.track.style.transform = `translateX(${translateX+26-(-10*(this.currentPosition))}px)`;
        
        // Update card visibility and effects
        this.cards.forEach((card, index) => {
            let isVisible = false;
            let distanceFromCenter = Math.abs(index - this.currentPosition);
            
            // Determine visibility based on current position and visible cards
            if (this.visibleCards === 1) {
                isVisible = index === this.currentPosition;
            } else {
                isVisible = index >= this.currentPosition && index < this.currentPosition + this.visibleCards;
            }
            
            if (isVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.filter = 'brightness(1)';
            } else {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(0.95)';
                card.style.filter = 'brightness(0.9)';
            }
        });
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentPosition) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    updateButtons() {
        // For infinite scroll, buttons are always enabled
        if (this.isInfinite) {
            this.prevBtn.style.opacity = '1';
            this.prevBtn.style.cursor = 'pointer';
            this.nextBtn.style.opacity = '1';
            this.nextBtn.style.cursor = 'pointer';
        } else {
            // For non-infinite scroll, disable buttons at boundaries
            if (this.currentPosition <= 0) {
                this.prevBtn.style.opacity = '0.5';
                this.prevBtn.style.cursor = 'not-allowed';
            } else {
                this.prevBtn.style.opacity = '1';
                this.prevBtn.style.cursor = 'pointer';
            }
            
            const maxPosition = this.totalCards - this.visibleCards;
            if (this.currentPosition >= maxPosition) {
                this.nextBtn.style.opacity = '0.5';
                this.nextBtn.style.cursor = 'not-allowed';
            } else {
                this.nextBtn.style.opacity = '1';
                this.nextBtn.style.cursor = 'pointer';
            }
        }
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => {
            if (!this.isUserInteracting && !this.isDragging) {
                this.slideRight();
            }
        }, 6000);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoSlider();
    new SupplementsSlider();
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Get navbar height for offset
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            
            // Calculate the position with offset
            const targetPosition = target.offsetTop - navbarHeight - 20; // Extra 20px margin
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// Add active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, .section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Scroll animations for sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.card, .supplement-card, .faq-item');
    
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
    
    // Observe sections
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    // Observe cards with stagger effect
    cards.forEach((card, index) => {
        card.classList.add('fade-in-card');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Enhanced button navigation
document.addEventListener('DOMContentLoaded', () => {
    // Start Here button - navigate to about section
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollToSection('#about');
        });
    }
    
    // View Services button - navigate to services section
    const viewServicesBtn = document.querySelector('.view-services-btn');
    if (viewServicesBtn) {
        viewServicesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollToSection('#services');
        });
    }
    
    // Book Now button - navigate to FAQ section (or contact)
    const bookNowBtn = document.querySelector('.signature-button');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollToSection('#faq');
        });
    }
});

// Helper function for smooth scrolling
function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Back to top button functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Float animation for paw decorations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);