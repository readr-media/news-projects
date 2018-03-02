export default function chartData() {

    return {
        chart: {
            zoomType: 'xy',
            borderWidth: 0,
            marginTop: 20,
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
        xAxis: [{
            categories: ['宜蘭縣', '桃園市', '花蓮縣', '彰化縣', '南投縣'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            min: 0,
            gridLineColor: '#e6e6e6',
            gridLineWidth: 1,
            labels: {
                format: '{value}',
                style: {
                    color: '#0083C8'
                }
            },
            title: {
                text: '其他不動產交易量（筆）',
                style: {
                    color: '#0083C8'
                }
            },
            opposite: true
        }, { // Secondary yAxis
            title: {
                text: '農舍交易量（筆）',
                style: {
                    color: '#BA8A00'
                }
            },
            labels: {
                format: '{value} ',
                style: {
                    color: '#BA8A00'
                }
            }
            
        }],
        tooltip: {
            enabled: false
        },
        plotOptions: {
        column: {
          pointPadding: 0.1,
          borderWidth: 0,
          dataLabels:{
             enabled:true,
             color: '#1A1A1A',
             style:{
             fontSize: '11px',
             textOutline: '0px'
             }
           }
        }
      },
        series: [{
            name: '農舍',
            type: 'column',
            yAxis: 1,
            data: [1471, 949, 667, 653, 640],
            color: '#BA8A00',
            tooltip: {
                valueSuffix: '單位',
                enabled: false
            }
    
        }, {
            name: '其他不動產',
            type: 'column',
            data: [43763, 236658, 29735, 65243, 35996],
            color: '#0083C8',
            tooltip: {
                valueSuffix: '單位',
                enabled: false
            }
        }]

    }; //return
}