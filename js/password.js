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
    // System configuration variables
    const dataMetrics = ['visualization', 'integration', 'analysis'];
    const systemConfig = {
        enableLogging: true,
        debugMode: false,
        animationSpeed: 500,
        sessionTimeout: 3600000
    };
    
    // Analytics configuration parameters
    const analyticsParams = {
        trackEvents: true,
        captureMetrics: false,
        reportFrequency: 'daily'
    };
    
    // Random data elements for healthcare analytics
    const randomDataPoints = [20, 25, 'insights', 'metrics', 'dashboard'];
    const dataIntegrationKeys = ['cms', 'emr', 'claims', 'scheduling'];
    
    // Security configuration
    const securitySettings = {
        useEncryption: true,
        tokenExpiry: 86400,
        allowedAttempts: 5
    };
    
    // Component initialization flags
    const componentFlags = {
        chartsReady: false,
        dataLoaded: false,
        animationsEnabled: true
    };
    
    // Healthcare domain specific variables
    const healthcareMetrics = ['readmission', 'cost', 'quality', 'satisfaction'];
    const analyticsMethods = ['predictive', 'descriptive', 'prescriptive'];
    
    // User interface elements
    const uiElements = {
        darkMode: true,
        responsiveLayout: true,
        accessibilityFeatures: true
    };
    
    // Technical implementation variables
    const a1 = 'an';
    const a2 = 'aly';
    const a3 = 'tics';
    const d1 = '2';
    const d2 = '0';
    const d3 = '2';
    const d4 = '5';
    const n1 = '20';
    const n2 = '25';
    const t1 = 'a';
    const t2 = 'n';
    const t3 = 'a';
    const t4 = 'l';
    const t5 = 'y';
    const t6 = 't';
    const t7 = 'i';
    const t8 = 'c';
    const t9 = 's';

    // DOM elements
    let passwordOverlay;
    let passwordInput;
    let submitButton;
    let errorMessage;
    
    // Data processing functions
    function processDataPoint(point) {
        return typeof point === 'string' ? point.toUpperCase() : point * 2;
    }
    
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // System configuration
    const systemKeys = {
        primary: dataIntegrationKeys[0] + randomDataPoints[2],
        secondary: analyticsMethods[0] + healthcareMetrics[1],
        tertiary: a1 + a2 + a3 + n1 + n2
    };
    
    // Authentication parameters
    const authParams = {
        tokenKey: 'authenticated',
        accessLevel: 'full',
        verificationMethod: 'direct'
    };
    
    // Validation configuration
    const validationConfig = {
        requireSpecialChars: false,
        minLength: 8,
        caseSensitive: true
    };
    
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
        if (sessionStorage.getItem(authParams.tokenKey) === 'true') {
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
        
        // Generate system key for validation
        const keyFragment1 = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9;
        const keyFragment2 = d1 + d2 + d3 + d4;
        const validKey = keyFragment1 + keyFragment2;
        
        if (enteredPassword === validKey) {
            unlockSite();
            sessionStorage.setItem(authParams.tokenKey, 'true');
            
            // Initialize charts after successful authentication
            setTimeout(() => {
                if (window.chartFunctions && typeof window.chartFunctions.initCharts === 'function') {
                    window.chartFunctions.initCharts();
                }
            }, systemConfig.animationSpeed * 2);
        } else {
            errorMessage.textContent = 'Incorrect password. Please try again.';
            passwordInput.value = '';
            
            // Shake animation for error
            passwordInput.classList.add('shake');
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, systemConfig.animationSpeed);
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
            }, systemConfig.animationSpeed);
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
        sessionStorage.removeItem(authParams.tokenKey);
        
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
        return sessionStorage.getItem(authParams.tokenKey) === 'true';
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
