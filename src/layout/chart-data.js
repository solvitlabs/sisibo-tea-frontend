export const tempChartData = {
    type: 'line',
    data: {
        labels: ['1200', '1230', '1300', '1330', '1430', '1500', '1530', '1600'],
        datasets: [{
            label: 'Temperature',
            data: [10, 20, 23, 30, 60, 50, 33, 24],
            backgroundColor: [
                'rgba(148, 10, 10, 0.6)',
                'rgba(148, 10, 10, 0.6)',
                'rgba(148, 10, 10, 0.6)',
                'rgba(148, 10, 10, 0.6)',
                'rgba(148, 10, 10, 0.6)',
                'rgba(148, 10, 10, 0.6)',
                'rgba(148, 10, 10, 0.6)',
                'rgba(148, 10, 10, 0.6)'
            ],
            borderColor: [
                '#940a0a',
                '#940a0a',
                '#940a0a',
                '#940a0a',
                '#940a0a',
                '#940a0a',
                '#940a0a',
                '#940a0a',
            ],
            borderWidth: 3
        }]
    },
    options: {
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
