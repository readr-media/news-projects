export default function chartData() {

    return {
        chart: {
            type: 'line',
            borderWidth: 0,
            marginTop:20,
            marginBottom: 60,
            backgroundColor: '#273947',
        },
        credits: {
            enabled: false
        },
        legend: {
            itemStyle: {
                color: '#ababab',
                fontWeight: ''
            },
    itemHiddenStyle: { color: '#1A1A1A' },
    itemHoverStyle: { color: '#7ac9a2' },
            enabled:true,
            align: 'right',
            verticalAlign: 'bottom',
            x: 10,
            y: 20
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            labels: {
                overflow: 'justify',
                style: {
                    color: '#ababab'
                }
            },
            categories: ['2001','2002', '2003', '2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015'],
            plotLines: [{
              color: '#ffffff', // Color value
              dashStyle: 'shortdot', // Style of the plot line. Default to solid
              value: 5, // Value of where the line will appear
              width: 4, // Width of the line 
              label:{
                 text: '雪山隧道<br/>通車',
                 verticlAlign: 'top',
                 rotation: '0',
                 x: 10,
                 y: 20,
                 style:{
                   fontSize: '14px',
                   color: '#ffffff'
                 }
              }
            }]
        },
        yAxis: {
            gridLineColor: '#ababab',
            title: {
                text: '筆',
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
        //borderColor: null
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> 筆<br/>',
            shared: false,
            backgroundColor: '#ffffff',
            borderWidth: 0,
            enabled:true
        },
        plotOptions: {
            series: {
                lineWidth: 2,
                marker: {
                    enabled: false,
                    radius:4,
                    symbol:'circle',
                },
            line: {
                dataLabels: {
                    enabled: false,
                    color: '#1A1A1A',
                             style:{
                             fontSize: '9px',
                             textOutline: '0px'
                    }
                },
                enableMouseTracking: true,
                }
            }
        },
        series: [{ name: '宜蘭縣',
            data: [101, 71, 85, 43, 57, 76, 59, 113, 224,587, 431, 645,677, 674, 535],
            color: '#ff7b8f'
        },{
            name: '苗栗縣',
            data: [356, 157, 182, 186, 195, 268, 255, 293, 220, 304, 319, 414, 375, 247, 191],
            color: '#809769'
        },{ name: '南投縣',
            data: [74, 37, 31, 59, 51, 67, 95, 129, 124, 428, 579, 647, 592, 248, 219],
            color: '#7d97a4'
        },{ name: '新竹縣',
            data: [174, 101, 136, 179, 186, 232, 231, 223, 211, 187, 187, 216, 220, 216, 181],
            color: '#aaa998'
        },{ name: '桃園市',
            data: [180, 115, 120, 72, 65, 161, 125, 106, 123, 173, 201, 243, 277, 299, 259],
            color: '#9f8e6f'
        },]

    }; //return
}