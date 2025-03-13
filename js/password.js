/**
 * Password Protection Module
 * 
 * This module handles the password protection functionality for the resume website.
 * It includes user authentication, session management, and content unlocking.
 */

// Add debug logging
console.log('Loading Password Protection module...');

// Password Protection Module
const PasswordProtection = (function() {
    // Default password - in a real application this would be more secure
    const correctPassword = 'analytics';
    
    // DOM elements
    let passwordOverlay;
    let passwordInput;
    let submitButton;
    let errorMessage;
    
    /**
     * Initialize password protection
     */
    function init() {
        // Get DOM elements
        passwordOverlay = document.getElementById('password-overlay');
        passwordInput = document.getElementById('password-input');
        submitButton = document.getElementById('submit-password');
        errorMessage = document.getElementById('password-error');
        
        console.log('Password protection initialized, checking authentication...');
        
        // Remove auto-unlock for testing
        // Check if user has already entered the password in this session
        if (sessionStorage.getItem('authenticated') === 'true') {
            console.log('User is already authenticated, unlocking site...');
            unlockSite();
        } else {
            // Ensure the overlay is visible
            if (passwordOverlay) {
                passwordOverlay.style.display = 'flex';
                document.body.classList.add('locked');
            }
        }
        
        // Add event listeners
        if (submitButton) {
            submitButton.addEventListener('click', validatePassword);
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    validatePassword();
                }
            });
        }
    }
    
    /**
     * Validate the entered password
     */
    function validatePassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === correctPassword) {
            unlockSite();
            sessionStorage.setItem('authenticated', 'true');
            
            // Initialize charts after successful authentication
            setTimeout(() => {
                if (window.chartFunctions && typeof window.chartFunctions.initCharts === 'function') {
                    window.chartFunctions.initCharts();
                }
            }, 1000);
        } else {
            errorMessage.textContent = 'Incorrect password. Please try again.';
            passwordInput.value = '';
            
            // Shake animation for error
            passwordInput.classList.add('shake');
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    }
    
    /**
     * Unlock the site after successful password entry
     */
    function unlockSite() {
        if (passwordOverlay) {
            passwordOverlay.classList.add('fade-out');
            
            setTimeout(() => {
                passwordOverlay.style.display = 'none';
                document.body.classList.remove('locked');
                
                // Trigger animations for the main content
                animateHeroSection();
                
                // Initialize charts with data from HealthcareAnalyticsData
                if (window.HealthcareAnalyticsData) {
                    console.log('Healthcare Analytics data loaded successfully');
                    // Initialize charts with the data
                    if (window.chartFunctions && typeof window.chartFunctions.initCharts === 'function') {
                        window.chartFunctions.initCharts();
                    }
                } else {
                    // Initialize charts with default data if HealthcareAnalyticsData is not available
                    if (window.chartFunctions && typeof window.chartFunctions.initCharts === 'function') {
                        window.chartFunctions.initCharts();
                    }
                }
            }, 500);
        }
    }
    
    /**
     * Animate the hero section
     */
    function animateHeroSection() {
        const heroElements = document.querySelectorAll('.hero-content > *');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, index * 200);
        });
    }
    
    /**
     * Lock the site (log out)
     */
    function lockSite() {
        // Remove authentication from session storage
        sessionStorage.removeItem('authenticated');
        
        // Show password overlay
        if (passwordOverlay) {
            passwordOverlay.style.display = 'flex';
            passwordOverlay.classList.remove('fade-out');
            document.body.classList.add('locked');
            
            // Clear password input
            if (passwordInput) {
                passwordInput.value = '';
            }
            
            // Clear error message
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        }
    }
    
    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated, false otherwise
     */
    function isAuthenticated() {
        return sessionStorage.getItem('authenticated') === 'true';
    }
    
    // Public API
    return {
        init,
        validatePassword,
        unlockSite,
        lockSite,
        isAuthenticated
    };
})();

// Initialize password protection when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    PasswordProtection.init();
});

// Export the module
window.PasswordProtection = PasswordProtection;

// Add shake animation for incorrect password
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}
.shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
}
.fade-out {
    animation: fade-out 0.5s ease forwards;
}
</style>
`);
