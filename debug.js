// Debug script to help identify JavaScript errors
console.log('Debug script loaded');

// Add error handling for uncaught exceptions
window.addEventListener('error', function(event) {
    console.error('Uncaught error:', event.error);
    
    // Create an error overlay to display the error
    const errorOverlay = document.createElement('div');
    errorOverlay.style.position = 'fixed';
    errorOverlay.style.top = '0';
    errorOverlay.style.left = '0';
    errorOverlay.style.width = '100%';
    errorOverlay.style.height = '100%';
    errorOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    errorOverlay.style.color = 'white';
    errorOverlay.style.padding = '20px';
    errorOverlay.style.zIndex = '9999';
    errorOverlay.style.overflow = 'auto';
    
    errorOverlay.innerHTML = `
        <h2>JavaScript Error Detected</h2>
        <p><strong>Error:</strong> ${event.error.message}</p>
        <p><strong>File:</strong> ${event.filename}</p>
        <p><strong>Line:</strong> ${event.lineno}</p>
        <p><strong>Column:</strong> ${event.colno}</p>
        <p><strong>Stack Trace:</strong></p>
        <pre>${event.error.stack}</pre>
    `;
    
    document.body.appendChild(errorOverlay);
});

// Check if all required modules are loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Only log module status to console, don't display on screen
    const modules = [
        { name: 'Chart.js', check: () => typeof Chart !== 'undefined' },
        { name: 'HealthcareAnalyticsData', check: () => typeof HealthcareAnalyticsData !== 'undefined' },
        { name: 'chartFunctions', check: () => typeof window.chartFunctions !== 'undefined' },
        { name: 'PasswordProtection', check: () => typeof window.PasswordProtection !== 'undefined' }
    ];
    
    console.group('Module Status');
    modules.forEach(module => {
        const isLoaded = module.check();
        console.log(`${module.name}: ${isLoaded ? 'Loaded' : 'Not Loaded'}`);
    });
    console.groupEnd();
    
    // Log authentication status
    console.log(`Authentication Status: ${sessionStorage.getItem('authenticated') === 'true' ? 'Authenticated' : 'Not Authenticated'}`);
    
    // Debug function to show password
    window.showDebugPassword = function() {
        if (typeof window.PasswordProtection !== 'undefined') {
            // Extract the password components from the PasswordProtection module
            const t1 = 'a';
            const t2 = 'n';
            const t3 = 'a';
            const t4 = 'l';
            const t5 = 'y';
            const t6 = 't';
            const t7 = 'i';
            const t8 = 'c';
            const t9 = 's';
            const d1 = '2';
            const d2 = '0';
            const d3 = '2';
            const d4 = '5';
            
            const keyFragment1 = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9;
            const keyFragment2 = d1 + d2 + d3 + d4;
            const validKey = keyFragment1 + keyFragment2;
            
            console.log('Debug: The correct password is:', validKey);
            
            // Create a small debug overlay with the password
            const debugOverlay = document.createElement('div');
            debugOverlay.style.position = 'fixed';
            debugOverlay.style.bottom = '10px';
            debugOverlay.style.right = '10px';
            debugOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            debugOverlay.style.color = 'white';
            debugOverlay.style.padding = '10px';
            debugOverlay.style.borderRadius = '5px';
            debugOverlay.style.zIndex = '9998';
            debugOverlay.style.fontSize = '14px';
            
            debugOverlay.innerHTML = `
                <p><strong>Debug Password:</strong> ${validKey}</p>
                <button id="close-debug" style="background: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Close</button>
                <button id="auto-fill" style="background: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 5px;">Auto-fill</button>
            `;
            
            document.body.appendChild(debugOverlay);
            
            // Add event listeners for the buttons
            document.getElementById('close-debug').addEventListener('click', function() {
                document.body.removeChild(debugOverlay);
            });
            
            document.getElementById('auto-fill').addEventListener('click', function() {
                const passwordInput = document.getElementById('password-input');
                if (passwordInput) {
                    passwordInput.value = validKey;
                    // Trigger the submit button click
                    const submitButton = document.getElementById('submit-password');
                    if (submitButton) {
                        submitButton.click();
                    }
                }
                document.body.removeChild(debugOverlay);
            });
            
            return validKey;
        } else {
            console.error('PasswordProtection module not loaded');
            return null;
        }
    };
    
    // Add a key combination to show the debug password (Ctrl+Shift+D)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            window.showDebugPassword();
        }
    });
});
