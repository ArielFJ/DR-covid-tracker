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
            isOnBounds: false
        }
        this.toggleAdding = this.toggleAdding.bind(this);
        this.changeCase = this.changeCase.bind(this);
        this.toggleCanAdd = this.toggleCanAdd.bind(this);
        this.toggleBounds = this.toggleBounds.bind(this);
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
        console.log(cases)
        this.setState({
            cases
        })
    }

    render() {
        return (
            <Fragment>
                <Map toggleAdding={this.toggleAdding} adding={this.state.adding} cases={this.state.cases} 
                        user={this.props.user} canAdd={this.state.canAddCase} toggleCanAdd={this.toggleCanAdd} 
                        toggleBounds={this.toggleBounds} />
                <CovidStats />
                {this.state.adding && <FloatingDiv toggleAdding={this.toggleAdding} 
                                        changeCase={this.changeCase}
                                        toggleCanAdd={this.toggleCanAdd}
                                        user={this.props.user} 
                                        onBounds={this.state.isOnBounds} />}
            </Fragment>
        )
    }
}

export default CovidMap
