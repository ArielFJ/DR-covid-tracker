
import React, { Component } from 'react'
import Chart from "chart.js";

export default class Graph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        console.log(this.props);
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: this.props.quantity ? this.getLastElements(this.props.labels, this.props.quantity) : this.props.labels,
                datasets: [
                    {
                        label: "Number of cases",
                        data: this.props.quantity ? this.getLastElements(this.props.data.totalCases, this.props.quantity) : this.props.data.totalCases ,
                        borderColor: 'rgb(0, 145, 255)'
                    },
                    {
                        label: "Number of deaths",
                        data: this.props.quantity ? this.getLastElements(this.props.data.totalDeaths, this.props.quantity) : this.props.data.totalDeaths ,
                        borderColor: 'rgb(191, 10, 10)'
                    },
                    {
                        label: "Number of person recoveries",
                        data: this.props.quantity ? this.getLastElements(this.props.data.totalRecoveries, this.props.quantity) : this.props.data.totalRecoveries,
                        borderColor: 'rgb(66, 158, 38)'
                    }
                ],
                
            },
            options: {
                //Customize chart options
            }
        });
    }

    getLastElements = (list, number) => {
        return list.slice(-number);
    }

    styleFunc = () => {
        return {
            width: '70rem',
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