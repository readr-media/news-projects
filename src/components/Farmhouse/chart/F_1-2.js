export default function chartData() {

    return {
        chart: {
            type: 'bar',
            borderWidth: 0,
            marginTop:20,
            // marginBottom: 40,
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
        exporting: { 
            enabled: false 
        },
        xAxis: {
            categories: ['宜蘭縣', '彰化縣', '台中市', '屏東縣', '高雄市'],
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
                text: '公頃',
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
            name: '農舍佔用農地面積-平地範圍非農業使用 (筆)',
            data: [925, 596, 550, 355, 330],
            color: '#ff7b8f'
        }]

    }; //return
}