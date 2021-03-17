export const tempChartData = {
    type: 'line',
    data: {
        labels: ['0900', '0906', '0912', '0918', '0924', '0930', '0936', '0942', '0948', '0954'],
        datasets: [{
            label: 'Temperature',
            data: [10, 20, 23, 30, 60, 50, 33, 24, 55, 23],
            backgroundColor: [
                'rgba(148, 10, 10, 0.6)'
            ],
            borderColor: [
                '#940a0a',
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

export default tempChartData;
