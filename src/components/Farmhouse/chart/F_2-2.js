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
            enabled: false
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
        
            categories: ['2012 Q3', '2012 Q4', '2013 Q1', '2013 Q2', '2013 Q3', '2013 Q4', '2014 Q1', '2014 Q2', '2014 Q3', '2014 Q4', '2015 Q1', '2015 Q2', '2015 Q3','2015 Q4', '2016 Q1','2016 Q2', '2016 Q3', '2016 Q4', '2017 Q1', '2017 Q2', '2017 Q3', '2017 Q4',],
            plotLines: [{
              color: '#ffffff', // Color value
              dashStyle: 'shortdash', // Style of the plot line. Default to solid
              value: 10, // Value of where the line will appear
              width: 4, // Width of the line 
              label:{
                 text: '宜蘭縣<br/>暫停核發<br/>農舍建照',
                 verticlAlign: 'top',
                 rotation: '0',
                 x: -70,
                 y: 270,
                 style:{
                   fontSize: '14px',
                   color: '#ffffff'
                 }
              }
            },{
              color: '#ffffff', // Color value
              dashStyle: 'shortdash', // Style of the plot line. Default to solid
              value: 13, // Value of where the line will appear
              width: 4, // Width of the line 
              label:{
                 text: '宜蘭縣<br/>廢止加嚴<br/>審查辦法',
                 verticlAlign: 'top',
                 rotation: '0',
                 x: 10,
                 y: 20,
                 style:{
                   fontSize: '14px',
                   color: '#ffffff'
                 }
              }
            }],
            labels: {
                overflow: 'justify',
                style: {
                    color: '#ababab'
                }
            }
        },
        yAxis: {
                gridLineColor: '#ababab',
            gridLineWidth: 1,
            title: {
                text: '',
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
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> 件<br/>',
            shared: false,
            backgroundColor: '#ffffff',
            borderWidth: 0,
            enabled:true
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false,
                    color: '#ababab',
                             style:{
                             fontSize: '9px',
                             textOutline: '0px'
                    }
                },
                enableMouseTracking: true
            }
        },
        series: [{
            name: '件數',
            data: [45, 77, 50, 94, 80, 118, 91, 104, 97, 127, 89, 81, 50, 38, 37, 63, 55, 47, 40, 40, 37, 7],
            color: '#ff7b8f'
        }]

    }; //return
}