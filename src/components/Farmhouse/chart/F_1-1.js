export default function chartData() {

    return {
        chart: {
            type: 'bar',
            borderWidth: 0,
            marginTop:20,
            marginBottom: 40,
            backgroundColor: '#273947',
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        credits: {
            enabled: false
        },
        exporting: { 
            enabled: false },
        xAxis: {
            categories: ['宜蘭縣', '台中市', '彰化縣', '桃園市', '高雄市'],
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
            max: 14000,
            gridLineColor: '#ababab',
            gridLineWidth: 1,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                style: {
                    color: '#ababab'
                }
            }
        },
        tooltip: {
            valueSuffix: 'millions',
            enabled:false
        },
        plotOptions: {
            bar: {
                pointPadding: 0.1,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    color: '#ababab',
                             style:{
                             fontSize: '14px',
                             textOutline: '0px'
                    }
                }
            }
        },
        legend: {
            itemStyle: {
                color: '#ababab',
                fontWeight: ''
            },
            enabled:true,
            align: 'right',
            verticalAlign: 'bottom',
            x: 10,
            y: 20
        },
        series: [{
            name: '違規筆數',
            data: [6213, 2074, 3449, 1107, 1013],
            color: '#ff7b8f'
        }, {
            name: '總計',
            data: [12243, 10425, 8254, 5987, 4279],
            color: '#7ac9a2'
        }]

    }; //return
}