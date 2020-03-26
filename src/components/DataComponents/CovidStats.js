import React, { Component } from 'react'

export class CovidStats extends Component {

    state = {
        info : {}
    }

    async componentDidMount(){
        let res = await fetch('https://thevirustracker.com/free-api?countryTotal=DO');
        let data = await res.json();
        this.setState({
            info: data.countrydata[0]
        })
    }

    render() {
        return (
            <div className="text-center">
                <h1 className="display-4">Stats</h1>
                <ul className="list-group">
                {   Object.keys(this.state.info).length > 0 &&
                    Object.keys(this.state.info).map((key,i) => {
                        if(key !== 'info'){
                            const words = key.split('_');
                            const title = words.map((word, i) => {
                                if(i === 0){
                                    return word.charAt(0).toUpperCase() + word.slice(1) + ' ';
                                }
                                return word + ' ';
                            });    
                            return <li key={i} className="list-group-item list-group-item-info">{title.map(word => word)}: {this.state.info[key]}</li>
                        }
                    })
                }
                </ul>

            </div>
        )
    }
}

export default CovidStats
