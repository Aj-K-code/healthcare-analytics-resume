// Animations JavaScript for Healthcare Analytics Resume

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations when DOM is loaded
    initAnimations();
});

// Initialize all animations
function initAnimations() {
    // Wait for the password protection to be cleared
    const checkAuthentication = setInterval(() => {
        if (sessionStorage.getItem('authenticated') === 'true' || 
            !document.getElementById('password-overlay').classList.contains('active')) {
            
            // Initialize all animations once authenticated
            setupScrollAnimations();
            setupTypingAnimations();
            setupParticleEffects();
            setupHoverAnimations();
            setupDataAnimations();
            
            // Clear the interval
            clearInterval(checkAuthentication);
        }
    }, 500);
}

// Set up scroll-triggered animations
function setupScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        // Basic reveal animations
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
        
        // Staggered animations for lists
        staggerItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('active');
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimations();
    
    // Check on scroll with debounce for performance
    window.addEventListener('scroll', debounce(handleScrollAnimations));
}

// Set up typing animations
function setupTypingAnimations() {
    const typingElements = document.querySelectorAll('.typewriter');
    
    typingElements.forEach(element => {
        // Get the text content
        const text = element.textContent;
        // Clear the element
        element.textContent = '';
        
        // Function to type text character by character
        function typeText(index) {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                setTimeout(() => typeText(index + 1), 100);
            }
        }
        
        // Start typing when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(0);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Set up particle effects
function setupParticleEffects() {
    const particleContainers = document.querySelectorAll('.particle-container');
    
    particleContainers.forEach(container => {
        const particleCount = parseInt(container.getAttribute('data-particles')) || 50;
        const particleColor = container.getAttribute('data-color') || '#2c7be5';
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.backgroundColor = particleColor;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            const delay = Math.random() * 5;
            particle.style.animationDelay = `${delay}s`;
            
            // Add to container
            container.appendChild(particle);
        }
    });
}

// Set up hover animations
function setupHoverAnimations() {
    // Elements with hover effects
    const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-rotate');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // Timeline items hover effect
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-content').classList.add('hover-scale');
            this.querySelector('.timeline-dot').classList.add('pulse');
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-content').classList.remove('hover-scale');
            this.querySelector('.timeline-dot').classList.remove('pulse');
        });
    });
}

// Set up data-related animations
function setupDataAnimations() {
    // Progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = bar.getAttribute('data-width') || '0%';
                    bar.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
    
    // Skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(skill => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = skill.getAttribute('data-level') || '0%';
                    skill.style.setProperty('--skill-level', level);
                    skill.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skill);
    });
    
    // Counters
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                    const step = 50;
                    const increment = target / (duration / step);
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            counter.textContent = target;
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, step);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Create a 3D tilt effect for cards
function setupTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const tiltX = deltaY * 10;
            const tiltY = -deltaX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Create animated background gradient
function setupAnimatedGradient() {
    const gradientElements = document.querySelectorAll('.animated-gradient');
    
    gradientElements.forEach(element => {
        // Set up the gradient animation
        element.style.backgroundSize = '400% 400%';
        element.style.animation = 'gradient 15s ease infinite';
    });
}

// Create animated icons
function setupAnimatedIcons() {
    const iconElements = document.querySelectorAll('.icon-pulse, .icon-spin, .icon-bounce');
    
    iconElements.forEach(element => {
        if (element.classList.contains('icon-pulse')) {
            element.style.animation = 'pulse 2s infinite';
        } else if (element.classList.contains('icon-spin')) {
            element.style.animation = 'rotate 3s linear infinite';
        } else if (element.classList.contains('icon-bounce')) {
            element.style.animation = 'bounce 2s infinite';
        }
    });
}

// Create animated borders
function setupAnimatedBorders() {
    const borderElements = document.querySelectorAll('.border-glow');
    
    borderElements.forEach(element => {
        // Create a pseudo-element for the glowing border
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const before = document.createElement('div');
        before.style.position = 'absolute';
        before.style.top = '-2px';
        before.style.left = '-2px';
        before.style.right = '-2px';
        before.style.bottom = '-2px';
        before.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--primary-light), var(--secondary-light))';
        before.style.backgroundSize = '400% 400%';
        before.style.zIndex = '-1';
        before.style.animation = 'gradient 10s ease infinite';
        before.style.borderRadius = 'inherit';
        
        element.insertBefore(before, element.firstChild);
    });
}

// Utility function: Debounce
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Export functions for use in other modules
window.animationFunctions = {
    initAnimations,
    setupScrollAnimations,
    setupTypingAnimations,
    setupParticleEffects,
    setupHoverAnimations,
    setupDataAnimations,
    setupTiltEffect,
    setupAnimatedGradient,
    setupAnimatedIcons,
    setupAnimatedBorders
};
