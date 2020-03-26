import React, { Component } from 'react';

import Graph from './Graph';
import Loader from '../SpinKit/Loader';
import MessageDiv from '../FloatingDivs/MessageDiv';

export class GraphsComponent extends Component {

    
    state = {
        data: {}
    }

    async componentDidMount(){
        const res = await fetch('https://thevirustracker.com/free-api?countryTimeline=DO');
        const data = await res.json();
        this.setState({
            data: data.timelineitems[0]
        });
    }

    getData = () => {
        let dates = [];
        let totalCases = [];
        let totalDeaths = [];
        let totalRecoveries = [];

        Object.keys(this.state.data).forEach(date => {
            if(date !== 'stat'){
                const month = Number(date.split('/')[0]); 
                const year = Number(date.split('/')[2]);
                if(year >= 2020){
                    if((month >= 3 && year === 2020) || year > 2020){
                        dates.push(date);
                        totalCases.push(this.state.data[date].total_cases);
                        totalDeaths.push(this.state.data[date].total_deaths);
                        totalRecoveries.push(this.state.data[date].total_recoveries);
                    }
                }
            }
        })

        return {
            totalCases: totalCases,
            totalDeaths: totalDeaths,
            totalRecoveries: totalRecoveries,
            dates: dates
        }
    }


    renderGraphs = () => {
        let dataset = this.getData()
        if(this.props.user){

            if(dataset.dates.length > 0){
                return (
                    <div className="text-center">                    
                        <h1 className="display-4">Number of cases after first infected</h1>
                        <Graph labels={dataset.dates} data={dataset} />
                        <h1 className="display-4">Number of cases in last 3 days</h1>
                        <Graph labels={dataset.dates} data={dataset} quantity={3} />
                        <h1 className="display-4">Number of cases in the last week</h1>
                        <Graph labels={dataset.dates} data={dataset} quantity={7}/>
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
