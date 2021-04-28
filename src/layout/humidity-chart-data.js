export const humidityChartData = {
    type: 'line',
    data: {
        labels: ['0900', '0906', '0912', '0918', '0924', '0930', '0936', '0942', '0948', '0954'],
        datasets: [{
            label: 'Humidity',
            data: [],
            backgroundColor: [
                'rgba(0, 153, 255, 0.6)'
            ],
            borderColor: [
                '#0099ff',
            ],
            borderWidth: 3
        }]
    },
    options: {
        animation: {
            duration: 0,
        },
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding: 25,
                }
            }]
        }
    }
}

export default humidityChartData;
