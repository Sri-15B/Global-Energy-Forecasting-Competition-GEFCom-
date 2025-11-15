// Get canvas contexts
const loadCtx = document.getElementById('loadChart')?.getContext('2d');
const modelCtx = document.getElementById('modelChart')?.getContext('2d');

// Line chart for actual vs predicted energy load
let loadChart = loadCtx && new Chart(loadCtx, {
    type: 'line',
    data: {
        labels: [], // Dates
        datasets: [
            {
                label: 'Actual Load (MW)',
                data: [],
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37,99,235,0.2)',
                fill: true,
                tension: 0.3
            },
            {
                label: 'Predicted Load (MW)',
                data: [],
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239,68,68,0.2)',
                fill: true,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
        scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'Load (MW)' } }
        }
    }
});

// Bar chart for model comparison
let modelChart = modelCtx && new Chart(modelCtx, {
    type: 'bar',
    data: {
        labels: ['ARIMA', 'Prophet', 'LSTM'], // Model names
        datasets: [{
            label: 'Accuracy (%)',
            data: [0,0,0], // Initial dummy values
            backgroundColor: ['#2563EB','#10B981','#EF4444']
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: {
            y: { beginAtZero: true, max: 100, title: { display: true, text: 'Accuracy (%)' } },
            x: { title: { display: true, text: 'Models' } }
        },
        animation: { duration: 500 }
    }
});

// Function to update charts with new data
function updateCharts(data){
    if(loadChart && data.dates && data.actual && data.predicted){
        loadChart.data.labels = data.dates;
        loadChart.data.datasets[0].data = data.actual;
        loadChart.data.datasets[1].data = data.predicted;
        loadChart.update();
    }
    if(modelChart && data.modelAccuracy){
        modelChart.data.datasets[0].data = data.modelAccuracy;
        modelChart.update();
    }
}
