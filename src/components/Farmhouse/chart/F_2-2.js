export default function chartData() {

    return {
        chart: {
            type: 'spline',
            borderWidth: 0,
            marginTop:20,
            marginBottom: 40,
            backgroundColor: '',
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%b',
                year: '%y'
            },
            title: {
                text: '年份'
            }
        },
        yAxis: {
            title: {
                text: '農舍交易量 (棟)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%y}: {point.y:.0f} 棟',
            enabled: true
        },
    
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
    
        series: [{
            name: '2012-2017 農舍交易量',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: [
                [Date.UTC(2012, 7), 45],
                [Date.UTC(2012, 10), 77],
                [Date.UTC(2013, 1), 50],
                [Date.UTC(2013, 4), 94],
                [Date.UTC(2013, 7), 80],
                [Date.UTC(2013, 10), 118],
                [Date.UTC(2014, 1), 91],
                [Date.UTC(2014, 4), 104],
                [Date.UTC(2014, 7), 97],
                [Date.UTC(2014, 10), 127],
                [Date.UTC(2015, 1), 89],
                [Date.UTC(2015, 4), 81],
                [Date.UTC(2015, 7), 50],
                [Date.UTC(2015, 10), 38],
                [Date.UTC(2016, 1), 37],
                [Date.UTC(2016, 4), 63],
                [Date.UTC(2016, 7), 55],
                [Date.UTC(2016, 10), 47],
                [Date.UTC(2017, 1), 40],
                [Date.UTC(2017, 4), 40],
                [Date.UTC(2017, 7), 37],
                [Date.UTC(2017, 10), 7]
            ]
        }]

    }; //return
}