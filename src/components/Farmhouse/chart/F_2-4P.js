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
            name: '完工農舍交易時間',
            colorByPoint: true,
            data: [{
                name: '5 年以上',
                y: 40.5,
                color:'#eeeeee'
            },{
                name: '4-5 年',
                y: 7.1,
                color:'#dddddd'
            },{
                name: '3-4 年',
                y: 6.9,
                color:'#cccccc'
            },{
                name: '2-3 年',
                y: 6.8,
                color:'#bbbbbb'
            },{
                name: '1-2 年',
                y: 8.3,
                color:'#aaaaaa'
            }, {
                name: '1 年內',
                y: 30.4,
                color:'#C1272D',
                sliced: true,
                selected: true
            }]
        }]

    }; //return
}