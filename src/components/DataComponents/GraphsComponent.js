import React, { Component } from 'react';

import Graph from './Graph';
import Loader from '../SpinKit/Loader';

export class GraphsComponent extends Component {

    
    state = {
        dates: [],
        totalCases: [],
        totalDeaths: [],
    }

    async componentDidMount(){
        const res = await fetch('https://covid19.mathdro.id/api/daily');
        const data = await res.json();
        
        let dates = [];
        let totalCases = [];
        let totalDeaths = [];

        for(let item of data){
            dates.push(item.reportDate);
            totalCases.push(item.totalConfirmed);
            totalDeaths.push(item.deaths.total);
        }

        this.setState({
            dates,
            totalCases,
            totalDeaths          
        })
    }


    renderGraphs = () => {
        let dataset = this.state;
        if(this.props.user){
            if(dataset.dates.length > 0){
                let datasetLast2Months = {
                    dates: dataset.dates.slice(-60),
                    totalCases: dataset.totalCases.slice(-60),
                    totalDeaths: dataset.totalDeaths.slice(-60)
                }

                let datasetLast3 = {
                    dates: dataset.dates.slice(-3),
                    totalCases: dataset.totalCases.slice(-3),
                    totalDeaths: dataset.totalDeaths.slice(-3)
                }

                let datasetLastWeek ={
                    dates: dataset.dates.slice(-7),
                    totalCases: dataset.totalCases.slice(-7),
                    totalDeaths: dataset.totalDeaths.slice(-7)
                }
                return (
                    <div className="text-center">                    
                        <h1 className="display-4">Approximate cases in last 2 months</h1>
                        <Graph  data={datasetLast2Months} />
                        <h1 className="display-4">Approximate cases in last 3 days</h1>
                        <Graph data={datasetLast3}/>
                        <h1 className="display-4">Approximate cases in the last week</h1>
                        <Graph data={datasetLastWeek} />
                    </div>
            )
            }else{
                return <div className="text-center" style={{marginTop:'10rem'}}>
                        <Loader />
                    </div>
            }
        }else{
            return <div style={{
                minHeight:'45rem',
                paddingTop:'15rem'
                }}>
            <h1 className="display-4 ">You have to log in to see timeline.</h1>
        </div>
        }
    }

    render() {
        return (
            <div className="container text-center mt-4">
                {this.renderGraphs()}
            </div>
        )
    }
}

export default GraphsComponent
