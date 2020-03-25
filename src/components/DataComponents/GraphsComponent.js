import React, { Component } from 'react'

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

    render() {
        console.log(this.state.data);
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        )
    }
}

export default GraphsComponent
