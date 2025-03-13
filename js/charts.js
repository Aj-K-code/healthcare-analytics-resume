// Charts and Data Visualization for Healthcare Analytics Resume

// Add debug logging
console.log('Loading Charts module...');

// Check if Chart.js is available
if (typeof Chart === 'undefined') {
    console.error('Chart.js is not loaded! Charts will not be displayed.');
} else {
    console.log('Chart.js is loaded successfully.');
}

// Define the chartFunctions object to expose chart functions globally
window.chartFunctions = {
    initCharts: initCharts,
    initChartsWithData: function(data) {
        console.log('Initializing charts with provided data:', data);
        initCharts();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking authentication for charts initialization...');
    // Initialize charts if user is already authenticated
    if (sessionStorage.getItem('authenticated') === 'true') {
        console.log('User is authenticated, initializing charts...');
        initCharts();
    } else {
        // Wait for the password protection to be cleared
        const checkAuthentication = setInterval(() => {
            if (sessionStorage.getItem('authenticated') === 'true' || 
                !document.getElementById('password-overlay').classList.contains('active')) {
                
                // Initialize all charts once authenticated
                console.log('User is authenticated, initializing charts...');
                initCharts();
                
                // Clear the interval
                clearInterval(checkAuthentication);
            }
        }, 500);
    }
});

// Initialize all charts
function initCharts() {
    console.log('Initializing all charts...');
    // Create all charts for the dashboard
    createSkillsRadarChart();
    createTechnicalSkillsChart();
    createExperienceComparisonChart();
    createCareerProgressionChart();
    createHealthcareMetricsChart();
    createAnalyticsImpactChart();
}

// Create skills radar chart
function createSkillsRadarChart() {
    console.log('Creating skills radar chart...');
    const ctx = document.getElementById('skills-radar-chart');
    const aboutCtx = document.getElementById('about-skills-radar-chart');
    
    if (!ctx) {
        console.error('Skills radar chart canvas not found!');
        return;
    }
    
    // Create radar chart configuration
    const radarConfig = {
        type: 'radar',
        data: {
            labels: ['Data Integration', 'SQL & Database', 'Analytics', 'Visualization', 'Healthcare Domain'],
            datasets: [
                {
                    label: 'Ajith Kurian',
                    data: [95, 98, 90, 85, 92],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Industry Average',
                    data: [70, 75, 65, 60, 55],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        color: function() {
                            return document.body.classList.contains('dark-mode') ? '#fff' : '#666';
                        }
                    },
                    grid: {
                        color: function() {
                            return document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                        }
                    },
                    pointLabels: {
                        color: function() {
                            return document.body.classList.contains('dark-mode') ? '#fff' : '#666';
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Skills Comparison with Industry Average',
                    color: function() {
                        return document.body.classList.contains('dark-mode') ? '#fff' : '#333';
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                },
                legend: {
                    labels: {
                        color: function() {
                            return document.body.classList.contains('dark-mode') ? '#fff' : '#666';
                        }
                    }
                }
            }
        }
    };
    
    // If chart already exists, destroy it
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Create new chart
    ctx.chart = new Chart(ctx, radarConfig);
    
    // Create the about section chart if it exists
    if (aboutCtx) {
        console.log('Creating about section skills radar chart...');
        // If chart already exists, destroy it
        if (aboutCtx.chart) {
            aboutCtx.chart.destroy();
        }
        
        // Create a copy of the config for the about section
        const aboutRadarConfig = JSON.parse(JSON.stringify(radarConfig));
        aboutRadarConfig.options.maintainAspectRatio = true;
        
        // Create new chart for about section
        aboutCtx.chart = new Chart(aboutCtx, aboutRadarConfig);
    }
}

// Create technical skills chart
function createTechnicalSkillsChart() {
    console.log('Creating technical skills chart...');
    const ctx = document.getElementById('technical-skills-chart');
    
    // If chart already exists, destroy it
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Create new chart
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['SQL', 'Power BI', 'Python', 'R', 'HTML/CSS', 'JavaScript'],
            datasets: [
                {
                    label: 'Proficiency Level',
                    data: [98, 95, 85, 90, 80, 75],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 205, 86, 0.7)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 205, 86, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Proficiency (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Technical Skills'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Technical Skills Proficiency'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Proficiency: ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Create experience comparison chart
function createExperienceComparisonChart() {
    console.log('Creating experience comparison chart...');
    const ctx = document.getElementById('experience-comparison-chart');
    
    // If chart already exists, destroy it
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Create new chart
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Healthcare Analytics', 'Data Integration', 'Visualization', 'Financial Analysis', 'Predictive Modeling'],
            datasets: [
                {
                    label: 'Ajith Kurian',
                    data: [5, 4, 3.5, 5, 3],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Industry Average',
                    data: [3, 2.5, 2, 2, 2],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Years of Experience'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Domain Areas'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Experience Comparison with Industry Average'
                }
            }
        }
    });
}

// Create career progression chart
function createCareerProgressionChart() {
    console.log('Creating career progression chart...');
    const ctx = document.getElementById('career-progression-chart');
    
    // If chart already exists, destroy it
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Create new chart
    ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Career Growth',
                    data: [1, 2, 3, 4, 5, 7, 9],
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Career Level (Relative Scale)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Career Progression Over Time'
                }
            }
        }
    });
}

// Create healthcare metrics chart
function createHealthcareMetricsChart() {
    console.log('Creating healthcare metrics chart...');
    const ctx = document.getElementById('healthcare-metrics-chart');
    
    // If chart already exists, destroy it
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Create new chart with CMS data integration
    ctx.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'EMR Data Integration', 
                'HEDIS Measures', 
                'CMS Data Analysis', 
                'HCC Risk Scoring', 
                'SDOH Data Analysis'
            ],
            datasets: [
                {
                    data: [25, 20, 22, 15, 18],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(255, 99, 132, 0.7)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Healthcare Domain Expertise Distribution'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Create analytics impact chart
function createAnalyticsImpactChart() {
    console.log('Creating analytics impact chart...');
    const ctx = document.getElementById('analytics-impact-chart');
    
    // If chart already exists, destroy it
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    // Create new chart with healthcare analytics project data
    ctx.chart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: [
                'Cost Reduction', 
                'Quality Improvement', 
                'Operational Efficiency', 
                'Patient Outcomes', 
                'Revenue Growth'
            ],
            datasets: [
                {
                    data: [85, 90, 80, 75, 70],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(255, 99, 132, 0.7)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Analytics Impact by Area'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Function to update charts when tab changes
function updateChartsOnTabChange() {
    console.log('Updating charts on tab change...');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
            
            // Refresh charts in the active tab
            setTimeout(() => {
                switch(this.getAttribute('data-tab')) {
                    case 'skills':
                        console.log('Refreshing skills charts...');
                        createSkillsRadarChart();
                        createTechnicalSkillsChart();
                        break;
                    case 'experience':
                        console.log('Refreshing experience charts...');
                        createExperienceComparisonChart();
                        createCareerProgressionChart();
                        break;
                    case 'healthcare':
                        console.log('Refreshing healthcare charts...');
                        createHealthcareMetricsChart();
                        break;
                    case 'impact':
                        console.log('Refreshing impact charts...');
                        createAnalyticsImpactChart();
                        break;
                }
            }, 100);
        });
    });
}

// CMS Data Integration Functions
function loadCMSData() {
    console.log('Loading CMS data...');
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
        providerRankings: [
            { name: "Provider A", rank: 1, score: 95 },
            { name: "Provider B", rank: 2, score: 92 },
            { name: "Provider C", rank: 3, score: 88 }
        ],
        procedureCosts: {
            hip: 12500,
            knee: 15000,
            cardiac: 28000,
            spine: 32000
        },
        qualityMetrics: {
            readmission: 12,
            mortality: 8,
            patientSatisfaction: 90,
            safety: 95
        }
    };
}

// Update chart theme based on current theme
function updateChartTheme(chart) {
    console.log('Updating chart theme...');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    // Update font color for all text elements
    const fontColor = isDarkTheme ? '#f8f9fa' : '#212529';
    
    // Update grid color
    const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    // Apply theme to chart
    chart.options.plugins.title.color = fontColor;
    chart.options.plugins.legend.labels.color = fontColor;
    
    // Update scales if they exist
    if (chart.options.scales) {
        Object.keys(chart.options.scales).forEach(scaleKey => {
            const scale = chart.options.scales[scaleKey];
            
            if (scale.ticks) {
                scale.ticks.color = fontColor;
            }
            
            if (scale.title) {
                scale.title.color = fontColor;
            }
            
            if (scale.grid) {
                scale.grid.color = gridColor;
            }
        });
    }
    
    // Update the chart
    chart.update();
}

// Export functions for use in other modules
window.chartFunctions = {
    initCharts,
    createSkillsRadarChart,
    createTechnicalSkillsChart,
    createExperienceComparisonChart,
    createCareerProgressionChart,
    createHealthcareMetricsChart,
    createAnalyticsImpactChart,
    updateChartsOnTabChange,
    loadCMSData,
    updateChartTheme
};
