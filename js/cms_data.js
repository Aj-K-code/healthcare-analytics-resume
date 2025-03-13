/**
 * Healthcare Analytics Data Module
 * 
 * This module provides static healthcare analytics data for the interactive resume dashboard.
 * It contains mock data based on realistic healthcare metrics for demonstration purposes.
 */

// Add debug logging
console.log('Loading HealthcareAnalyticsData module...');

// Healthcare Analytics Data Module
const HealthcareAnalyticsData = (function() {
    // Static data for the dashboard
    const staticData = {
        providerMetrics: {
            quality: {
                overall: 85,
                readmission: 92,
                mortality: 88,
                patientSatisfaction: 90,
                safety: 95
            },
            cost: {
                overall: 78,
                inpatient: 82,
                outpatient: 75,
                emergency: 80,
                preventive: 73
            },
            utilization: {
                overall: 92,
                bedDays: 88,
                readmissions: 82,
                emergencyVisits: 75,
                preventiveServices: 95
            },
            value: {
                costQualityRatio: 0.92,
                valueIndex: 88,
                efficiencyScore: 85
            }
        },
        regionalData: {
            northeast: {
                quality: 88,
                cost: 82,
                utilization: 85,
                value: 86
            },
            midwest: {
                quality: 85,
                cost: 78,
                utilization: 82,
                value: 83
            },
            south: {
                quality: 82,
                cost: 75,
                utilization: 80,
                value: 80
            },
            west: {
                quality: 86,
                cost: 80,
                utilization: 83,
                value: 84
            }
        },
        providerRankings: {
            qualityRank: 15,
            costRank: 22,
            valueRank: 18,
            totalProviders: 250,
            percentile: {
                quality: 94,
                cost: 91,
                value: 93
            }
        },
        procedureCosts: {
            inpatient: [
                { name: 'Joint Replacement', cost: 25000, benchmark: 28000 },
                { name: 'Heart Surgery', cost: 75000, benchmark: 82000 },
                { name: 'Spinal Fusion', cost: 42000, benchmark: 45000 },
                { name: 'Pneumonia', cost: 18000, benchmark: 20000 }
            ],
            outpatient: [
                { name: 'Colonoscopy', cost: 3200, benchmark: 3500 },
                { name: 'Cataract Surgery', cost: 4800, benchmark: 5200 },
                { name: 'Endoscopy', cost: 2800, benchmark: 3000 },
                { name: 'MRI', cost: 1200, benchmark: 1500 }
            ]
        },
        historicalTrends: {
            quality: [80, 82, 83, 85, 88, 90],
            cost: [85, 82, 80, 78, 76, 75],
            value: [78, 80, 82, 85, 87, 90],
            years: ['2018', '2019', '2020', '2021', '2022', '2023']
        },
        qualityMetrics: {
            patientSafety: {
                infectionRate: 1.2,
                medicationErrors: 0.5,
                fallRate: 0.8,
                benchmark: {
                    infectionRate: 2.0,
                    medicationErrors: 1.0,
                    fallRate: 1.5
                }
            },
            patientExperience: {
                overallRating: 4.5,
                recommendationRate: 92,
                communicationScore: 88,
                benchmark: {
                    overallRating: 3.8,
                    recommendationRate: 85,
                    communicationScore: 80
                }
            },
            clinicalOutcomes: {
                readmissionRate: 4.2,
                mortalityRate: 1.8,
                complicationRate: 3.5,
                benchmark: {
                    readmissionRate: 5.5,
                    mortalityRate: 2.2,
                    complicationRate: 4.8
                }
            }
        }
    };
    
    /**
     * Process and transform raw data for visualization
     * @param {Object} data Raw data
     * @returns {Object} Processed data ready for visualization
     */
    function processDataForVisualization(data) {
        // Process provider metrics
        const providerMetricsData = {
            labels: ['Quality', 'Cost', 'Utilization', 'Value'],
            datasets: [
                {
                    label: 'Provider Performance',
                    data: [
                        data.providerMetrics.quality.overall,
                        data.providerMetrics.cost.overall,
                        data.providerMetrics.utilization.overall,
                        data.providerMetrics.value.valueIndex
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        };
        
        // Process regional data
        const regionalData = {
            labels: ['Northeast', 'Midwest', 'South', 'West'],
            datasets: [
                {
                    label: 'Quality',
                    data: [
                        data.regionalData.northeast.quality,
                        data.regionalData.midwest.quality,
                        data.regionalData.south.quality,
                        data.regionalData.west.quality
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Cost',
                    data: [
                        data.regionalData.northeast.cost,
                        data.regionalData.midwest.cost,
                        data.regionalData.south.cost,
                        data.regionalData.west.cost
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        };
        
        // Process historical trends
        const historicalTrends = {
            labels: data.historicalTrends.years,
            datasets: [
                {
                    label: 'Quality',
                    data: data.historicalTrends.quality,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Cost',
                    data: data.historicalTrends.cost,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Value',
                    data: data.historicalTrends.value,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        };
        
        return {
            providerMetrics: providerMetricsData,
            regionalData: regionalData,
            historicalTrends: historicalTrends
        };
    }
    
    /**
     * Get data for all visualizations
     * @returns {Object} Visualization data
     */
    function getVisualizationData() {
        return processDataForVisualization(staticData);
    }
    
    /**
     * Get provider value insights data
     * @returns {Object} Value insights data
     */
    function getValueInsights() {
        return {
            costQuality: {
                x: staticData.providerMetrics.cost.overall,
                y: staticData.providerMetrics.quality.overall
            },
            regional: {
                northeast: {
                    cost: staticData.regionalData.northeast.cost,
                    quality: staticData.regionalData.northeast.quality
                },
                midwest: {
                    cost: staticData.regionalData.midwest.cost,
                    quality: staticData.regionalData.midwest.quality
                },
                south: {
                    cost: staticData.regionalData.south.cost,
                    quality: staticData.regionalData.south.quality
                },
                west: {
                    cost: staticData.regionalData.west.cost,
                    quality: staticData.regionalData.west.quality
                }
            }
        };
    }
    
    /**
     * Get predictive analytics data
     * @returns {Object} Predictive analytics data
     */
    function getPredictiveAnalytics() {
        // Historical data
        const historicalData = staticData.historicalTrends;
        
        // Generate forecast data (simple linear extrapolation)
        const qualityForecast = [...historicalData.quality];
        const costForecast = [...historicalData.cost];
        const valueForecast = [...historicalData.value];
        const yearsForecast = [...historicalData.years];
        
        // Add two more years of forecast
        const lastYear = parseInt(yearsForecast[yearsForecast.length - 1]);
        yearsForecast.push((lastYear + 1).toString());
        yearsForecast.push((lastYear + 2).toString());
        
        // Simple linear extrapolation for quality
        const qualityTrend = (qualityForecast[qualityForecast.length - 1] - qualityForecast[qualityForecast.length - 2]);
        qualityForecast.push(Math.min(100, qualityForecast[qualityForecast.length - 1] + qualityTrend));
        qualityForecast.push(Math.min(100, qualityForecast[qualityForecast.length - 1] + qualityTrend));
        
        // Simple linear extrapolation for cost (lower is better)
        const costTrend = (costForecast[costForecast.length - 1] - costForecast[costForecast.length - 2]);
        costForecast.push(Math.max(0, costForecast[costForecast.length - 1] + costTrend));
        costForecast.push(Math.max(0, costForecast[costForecast.length - 1] + costTrend));
        
        // Simple linear extrapolation for value
        const valueTrend = (valueForecast[valueForecast.length - 1] - valueForecast[valueForecast.length - 2]);
        valueForecast.push(Math.min(100, valueForecast[valueForecast.length - 1] + valueTrend));
        valueForecast.push(Math.min(100, valueForecast[valueForecast.length - 1] + valueTrend));
        
        return {
            historical: {
                quality: historicalData.quality,
                cost: historicalData.cost,
                value: historicalData.value,
                years: historicalData.years
            },
            forecast: {
                quality: qualityForecast,
                cost: costForecast,
                value: valueForecast,
                years: yearsForecast
            }
        };
    }
    
    /**
     * Get report data
     * @param {Object} options Report options
     * @returns {Object} Report data
     */
    function getReportData(options = {}) {
        // Default options
        const defaultOptions = {
            sections: ['quality', 'cost', 'utilization', 'value'],
            dateRange: {
                start: '2023-01-01',
                end: '2023-12-31'
            },
            providers: ['All'],
            procedures: ['All']
        };
        
        // Merge options with defaults
        const mergedOptions = { ...defaultOptions, ...options };
        
        // Prepare report data based on options
        const reportData = {
            title: 'Healthcare Analytics Report',
            dateRange: mergedOptions.dateRange,
            summary: {
                quality: staticData.providerMetrics.quality.overall,
                cost: staticData.providerMetrics.cost.overall,
                utilization: staticData.providerMetrics.utilization.overall,
                value: staticData.providerMetrics.value.valueIndex
            },
            sections: {}
        };
        
        // Add requested sections
        if (mergedOptions.sections.includes('quality')) {
            reportData.sections.quality = {
                overall: staticData.providerMetrics.quality.overall,
                readmission: staticData.providerMetrics.quality.readmission,
                mortality: staticData.providerMetrics.quality.mortality,
                patientSatisfaction: staticData.providerMetrics.quality.patientSatisfaction,
                safety: staticData.providerMetrics.quality.safety
            };
        }
        
        if (mergedOptions.sections.includes('cost')) {
            reportData.sections.cost = {
                overall: staticData.providerMetrics.cost.overall,
                inpatient: staticData.providerMetrics.cost.inpatient,
                outpatient: staticData.providerMetrics.cost.outpatient,
                emergency: staticData.providerMetrics.cost.emergency,
                preventive: staticData.providerMetrics.cost.preventive
            };
        }
        
        if (mergedOptions.sections.includes('utilization')) {
            reportData.sections.utilization = {
                overall: staticData.providerMetrics.utilization.overall,
                bedDays: staticData.providerMetrics.utilization.bedDays,
                readmissions: staticData.providerMetrics.utilization.readmissions,
                emergencyVisits: staticData.providerMetrics.utilization.emergencyVisits,
                preventiveServices: staticData.providerMetrics.utilization.preventiveServices
            };
        }
        
        if (mergedOptions.sections.includes('value')) {
            reportData.sections.value = {
                costQualityRatio: staticData.providerMetrics.value.costQualityRatio,
                valueIndex: staticData.providerMetrics.value.valueIndex,
                efficiencyScore: staticData.providerMetrics.value.efficiencyScore
            };
        }
        
        return reportData;
    }
    
    // Public API
    return {
        getVisualizationData,
        getValueInsights,
        getPredictiveAnalytics,
        getReportData,
        getData: function() {
            return staticData;
        }
    };
})();

// Export for use in other modules
window.HealthcareAnalyticsData = HealthcareAnalyticsData;
