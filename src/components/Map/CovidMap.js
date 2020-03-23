import React, { Component, Fragment } from 'react'

//Components
import Map from './Map';
import CovidStats from '../DataComponents/CovidStats';
import FormCovidCase from '../FormCovidCase';

export class CovidMap extends Component {

    constructor(){
        super();
        this.state = {
            adding: false
        }
        this.toggleAdding = this.toggleAdding.bind(this);
    }

    toggleAdding(){
        this.setState({
            adding: !this.state.adding
        })
    }

    render() {
        return (
            <Fragment>
                <Map toggleAdding={this.toggleAdding} adding={this.state.adding}/>
                <CovidStats />
                {this.state.adding && <FormCovidCase toggleAdding={this.toggleAdding} />}
            </Fragment>
        )
    }
}

export default CovidMap
