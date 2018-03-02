export default function chartData() {

    return {
        chart: {
            plotBackgroundColor: '',
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
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
        
        tooltip: {
            enabled:false,
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                pointPadding: 0.1,
                borderWidth: 0,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    color: '#1A1A1A',
                             style:{
                                 fontSize: '16px',
                                 textOutline: '0px'
                        }
                }
            }
        },
        series: [{
            name: '交易農舍種類',
            colorByPoint: true,
            data: [{
                name: '2006 年之前',
                y: 22.5,
                color:'#808080'
            }, {
                name: '2006 年之後',
                y: 77.5,
                color:'#C1272D',
                sliced: true,
                selected: true
            }]
        }]

    }; //return
}