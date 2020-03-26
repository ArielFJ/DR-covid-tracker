import React, { Component, Fragment } from 'react'

//Components
import Map from './Map';
import CovidStats from '../DataComponents/CovidStats';
import FloatingDiv from '../FloatingDivs/FloatingDiv';

export class CovidMap extends Component {

    constructor(){
        super();
        this.state = {
            adding: false,
            cases: 0,
            canAddCase: false,
            isOnBounds: false,
            numberOfCasesInMarker: 1
        }
        this.toggleAdding = this.toggleAdding.bind(this);
        this.changeCase = this.changeCase.bind(this);
        this.toggleCanAdd = this.toggleCanAdd.bind(this);
        this.toggleBounds = this.toggleBounds.bind(this);
        this.changeCasesInMarker = this.changeCasesInMarker.bind(this);
    }

    toggleBounds(value){
        this.setState({
            isOnBounds: value
        })
    }


    toggleAdding(){
        this.setState({
            adding: !this.state.adding
        })
    }

    toggleCanAdd(){
        if(!this.state.canAddCase){
            this.setState({
                newCase: {}
            })
        }
        this.setState({
            canAddCase: !this.state.canAddCase
        })
    }

    changeCase(cases){
        this.setState({
            cases
        })
    }

    changeCasesInMarker(n){
        this.setState({
            numberOfCasesInMarker: n
        })
    }

    render() {
        const mapProps = {
            toggleAdding:this.toggleAdding,
            adding:this.state.adding,
            cases:this.state.cases, 
            user:this.props.user,
            canAdd:this.state.canAddCase,
            toggleCanAdd:this.toggleCanAdd, 
            toggleBounds:this.toggleBounds,
            handleUpload:this.props.handleUpload,
            coordinates:this.props.coords,
            changeCasesInMarker:this.changeCasesInMarker,
            userCoords: this.props.userCoords
        }

        const divProps = {
            toggleAdding:this.toggleAdding,
            changeCase:this.changeCase,
            toggleCanAdd:this.toggleCanAdd,
            user:this.props.user,
            onBounds:this.state.isOnBounds,
            toggleBounds:this.toggleBounds,
            numberOfCases:this.state.numberOfCasesInMarker,
            changeCasesInMarker:this.changeCasesInMarker
        }

        return (
            <Fragment>
                <Map mapProps={mapProps}/>
                <CovidStats />
                {this.state.adding && <FloatingDiv divProps={divProps} />}
            </Fragment>
        )
    }
}

export default CovidMap
