import React, { Component, Fragment } from 'react'

//Components
import Map from './Map';
import CovidStats from '../DataComponents/CovidStats';

export class CovidMap extends Component {

    render() {
        return (
            <Fragment>
                <Map />
                <CovidStats />
            </Fragment>
        )
    }
}

export default CovidMap
