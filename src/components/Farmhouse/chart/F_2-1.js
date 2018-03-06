export default function chartData() {

    return {
        chart: {
            type: 'bar',
            borderWidth: 0,
            marginTop:20,
            marginBottom: 40,
            backgroundColor: '#273947',
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled:false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['宜蘭縣', '桃園市', '花蓮縣', '彰化縣', '南投縣'],
            title: {
                text: null
            },
            labels: {
                overflow: 'justify',
                style: {
                    color: '#ababab'
                }
            }
        },
        yAxis: {
            min: 0,
            gridLineColor: '#ababab',
            gridLineWidth: 1,
            title: {
                text: '筆',
                align: 'high',
                style: {
                    color: '#ababab'
                }
            },
            labels: {
                overflow: 'justify',
                style: {
                    color: '#ababab'
                }
            }
        },
        tooltip: {
            valueSuffix: '',
            enabled: false
        },
        plotOptions: {
            bar: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    color: '#ababab',
                             style:{
                             fontSize: '14px',
                             textOutline: '0px'
                    }
                }
            },
            
        },
        series: [{
            name: '農舍交易量 (筆)',
            data: [1471, 949, 667, 653, 640],
            color: '#ff7b8f'
        }]

    }; //return
}