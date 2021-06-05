import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

let GraphData = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Users Lifetime'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Lifetime (days)'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Days',
        data: [],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}',
            y: 10, 
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
};

export default class Graph extends React.Component {
    
    componentDidMount() {
        GraphData.series[0].data = this.props.data
    }

    render() {
        return (
            <HighchartsReact 
                highcharts={Highcharts}
                options={GraphData}
                updateArgs={[true]}
            />
        )
    }
} 