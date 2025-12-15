// Chart.js initialization and configuration

(function() {
  'use strict';

  // Chart color configuration based on theme
  function getChartColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
      primary: isDark ? '#00e5ff' : '#2563eb',
      background: isDark ? '#12182a' : '#ffffff',
      grid: isDark ? 'rgba(156, 163, 175, 0.1)' : 'rgba(100, 116, 139, 0.1)',
      text: isDark ? '#e5e7eb' : '#0f172a',
      muted: isDark ? '#9ca3af' : '#64748b'
    };
  }

  // Initialize analytics chart
  function initAnalyticsChart() {
    const canvas = document.getElementById('analytics-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const colors = getChartColors();

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue Growth',
          data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45],
          borderColor: colors.primary,
          backgroundColor: colors.primary + '20',
          tension: 0.4,
          fill: true
        }, {
          label: 'Client Acquisition',
          data: [8, 12, 10, 18, 16, 22, 20, 26, 24, 30, 28, 35],
          borderColor: colors.muted,
          backgroundColor: colors.muted + '20',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: colors.text
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: colors.grid
            },
            ticks: {
              color: colors.text
            }
          },
          x: {
            grid: {
              color: colors.grid
            },
            ticks: {
              color: colors.text
            }
          }
        }
      }
    });
  }

  // Initialize performance chart
  function initPerformanceChart() {
    const canvas = document.getElementById('performance-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const colors = getChartColors();

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Data Processing', 'Real-time Analytics', 'Predictive Models', 'Visualization', 'Reporting'],
        datasets: [{
          label: 'Performance Score',
          data: [92, 88, 95, 90, 87],
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: colors.grid
            },
            ticks: {
              color: colors.text
            }
          },
          x: {
            grid: {
              color: colors.grid
            },
            ticks: {
              color: colors.text
            }
          }
        }
      }
    });
  }

  // Initialize all charts
  function initCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded');
      return;
    }

    initAnalyticsChart();
    initPerformanceChart();
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
  } else {
    initCharts();
  }

  // Reinitialize charts on theme change
  document.addEventListener('themeChanged', () => {
    setTimeout(initCharts, 100);
  });
})();

