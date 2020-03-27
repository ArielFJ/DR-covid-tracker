
import React, { Component } from 'react'
import Chart from "chart.js";

export default class Graph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: this.props.data.dates,
                datasets: [
                    {
                        label: "Number of cases",
                        data: this.props.data.totalCases ,
                        borderColor: 'rgb(0, 145, 255)'
                    },
                    {
                        label: "Number of deaths",
                        data: this.props.data.totalDeaths ,
                        borderColor: 'rgb(191, 10, 10)'
                    },
                ]
                
            }
        });
    }

    styleFunc = () => {
        return {
            width: '65rem',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    }

    render() {
        return (
            <div style={this.styleFunc()} >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}