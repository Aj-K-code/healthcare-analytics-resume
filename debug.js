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
});
