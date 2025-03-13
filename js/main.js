// Main JavaScript for Healthcare Analytics Resume

// Add debug logging
console.log('Loading Main module...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    // Initialize the application
    initApp();
});

// Main application initialization
function initApp() {
    console.log('Initializing application components...');
    // Initialize components
    initNavigation();
    initScrollAnimations();
    initCounters();
    initThemeToggle();
    initTabNavigation();
    // Contact form is now initialized via DOMContentLoaded event
    
    // Initialize charts if user is already authenticated
    if (sessionStorage.getItem('authenticated') === 'true') {
        console.log('User is authenticated, initializing charts from main.js...');
        if (window.chartFunctions && typeof window.chartFunctions.initCharts === 'function') {
            window.chartFunctions.initCharts();
        }
    }
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMobileNav = document.querySelector('.close-mobile-nav');
    const mainNav = document.querySelector('.main-nav');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
    });
    
    // Close mobile menu
    closeMobileNav.addEventListener('click', function() {
        mobileNav.classList.remove('active');
    });
    
    // Shrink navigation on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const staggerItems = document.querySelectorAll('.stagger-item');
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillBars = document.querySelectorAll('.skill-progress');
    
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
        // Reveal animations
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
        
        // Staggered animations
        staggerItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('active');
            }
        });
        
        // Progress bars
        progressBars.forEach(bar => {
            if (isInViewport(bar)) {
                bar.classList.add('animate');
            }
        });
        
        // Skill bars
        skillBars.forEach(skill => {
            if (isInViewport(skill)) {
                skill.classList.add('animate');
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-value'));
        const duration = 2000; // ms
        const step = 50; // ms
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
    }
    
    function checkCounters() {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Initial check
    checkCounters();
    
    // Check on scroll
    window.addEventListener('scroll', checkCounters);
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Save theme preference
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize tab navigation for dashboard
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
            
            // Refresh charts in the active tab if chartFunctions is available
            if (window.chartFunctions && typeof window.chartFunctions.updateChartsOnTabChange === 'function') {
                window.chartFunctions.updateChartsOnTabChange();
            } else {
                // Fallback to refresh specific charts based on tab
                setTimeout(() => {
                    switch(this.getAttribute('data-tab')) {
                        case 'skills':
                            if (window.chartFunctions) {
                                if (typeof window.chartFunctions.createSkillsRadarChart === 'function') {
                                    window.chartFunctions.createSkillsRadarChart();
                                }
                                if (typeof window.chartFunctions.createTechnicalSkillsChart === 'function') {
                                    window.chartFunctions.createTechnicalSkillsChart();
                                }
                            }
                            break;
                        case 'experience':
                            if (window.chartFunctions) {
                                if (typeof window.chartFunctions.createExperienceComparisonChart === 'function') {
                                    window.chartFunctions.createExperienceComparisonChart();
                                }
                                if (typeof window.chartFunctions.createCareerProgressionChart === 'function') {
                                    window.chartFunctions.createCareerProgressionChart();
                                }
                            }
                            break;
                        case 'healthcare':
                            if (window.chartFunctions && typeof window.chartFunctions.createHealthcareMetricsChart === 'function') {
                                window.chartFunctions.createHealthcareMetricsChart();
                            }
                            break;
                        case 'impact':
                            if (window.chartFunctions && typeof window.chartFunctions.createAnalyticsImpactChart === 'function') {
                                window.chartFunctions.createAnalyticsImpactChart();
                            }
                            break;
                    }
                }, 100);
            }
        });
    });
}

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare email link with all form data
            const mailtoLink = `mailto:ajith.kurian@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            
            // Create success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
                <button class="btn-primary" id="back-to-form">Send Another Message</button>
            `;
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Add event listener to back button
            document.getElementById('back-to-form').addEventListener('click', function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                formContainer.removeChild(successMessage);
            });
        });
    }
});

// Load CMS Data for Healthcare Analytics
function loadCMSData() {
    // This function now uses the static HealthcareAnalyticsData module
    if (window.HealthcareAnalyticsData && typeof window.HealthcareAnalyticsData.getData === 'function') {
        return window.HealthcareAnalyticsData.getData();
    }
    
    // Fallback mock data if HealthcareAnalyticsData is not available
    return {
        providerMetrics: {
            quality: 85,
            cost: 78,
            utilization: 92
        },
        regionalData: {
            northeast: 88,
            midwest: 75,
            south: 82,
            west: 79
        },
        qualityMetrics: {
            readmission: 12,
            mortality: 8,
            patientSatisfaction: 90,
            safety: 95
        }
    };
}

// Add event listeners for various interactive elements
function addEventListeners() {
    // Add hover effects for cards and buttons
    const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-rotate');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
}

// Animate hero section elements
function animateHeroSection() {
    const heroElements = document.querySelectorAll('.animated-text, .animated-text-delay, .animated-text-delay-2, .animated-text-delay-3, .animated-fade-in');
    
    heroElements.forEach(element => {
        element.style.visibility = 'visible';
    });
}

// Utility functions
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
    const closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
    
    // Open modal when trigger is clicked
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-target');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    });
    
    // Close modal when clicking outside of modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.classList.remove('show');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    modal.classList.remove('show');
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
            });
        }
    });
});

// Export functions for use in other modules
window.mainFunctions = {
    initApp,
    initNavigation,
    initScrollAnimations,
    initCounters,
    initThemeToggle,
    initTabNavigation,
    loadCMSData
};
