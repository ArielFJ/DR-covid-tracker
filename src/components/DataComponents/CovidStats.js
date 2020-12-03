import React, { Component } from 'react'

export class CovidStats extends Component {

    state = {
        info : {}
    }

    async componentDidMount(){
        let res = await fetch('https://cors-anywhere.herokuapp.com/https://corona.lmao.ninja/v2/all?yesterday');
        let data = await res.json();        
        this.setState({
            info: data
        })
    }

    render() {
        return (
            <div className="text-center">
                <h1 className="display-4">Stats</h1>
                <ul className="list-group">
                {
                   Object.keys(this.state.info).length > 0 &&
                    Object.keys(this.state.info).map((key,i) => {                        
                        const words = key.split(/(?=[A-Z])/);
                        const title = words.join(' ');    
                        return <li key={i} className="list-group-item list-group-item-info">{title[0].toUpperCase() + title.substr(1)}: {this.state.info[key]}</li>                    
                        //return '';
                    })
                }
                </ul>

            </div>
        )
    }
}

export default CovidStats
