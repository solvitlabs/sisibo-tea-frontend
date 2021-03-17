export const tempChartData = {
    type: 'line',
    data: {
        labels: ['1200', '1230', '1300', '1330', '1430', '1500', '1530', '1600'],
        datasets: [{
                label: 'Red',
                data: [9, 20, 23, 30, 60, 50, 33, 24],
                backgroundColor: [
                    //     'rgba(148, 10, 10, 0.6)',
                    'rgba(0,0,0,0)',
                ],
                borderColor: [
                    '#940a0a',
                ],
                borderWidth: 3
            },
            {
                label: 'Green',
                data: [10, 10, 23, 30, 45, 40, 18, 14],
                backgroundColor: [
                    //     'rgba(23, 160, 69, 0.6)',
                    'rgba(0,0,0,0)',
                ],
                borderColor: [
                    '#17a045',
                ],
                borderWidth: 3
            }, {
                label: 'Blue',
                data: [5, 16, 25, 55, 33, 34, 19, 18],
                backgroundColor: [
                    //     'rgba(0, 153, 255, 0.6)'
                    'rgba(0,0,0,0)',
                ],
                borderColor: [
                    '#0099ff',
                ],
                borderWidth: 3
            },
        ]
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
