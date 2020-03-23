import React, { Component, Fragment } from 'react'

//Components
import Map from './Map';
import CovidStats from '../DataComponents/CovidStats';
import FormCovidCase from '../FormCovidCase';

export class CovidMap extends Component {

    constructor(){
        super();
        this.state = {
            adding: false,
            cases: 0,
            canAddCase: false
        }
        this.toggleAdding = this.toggleAdding.bind(this);
        this.changeCase = this.changeCase.bind(this);
        this.toggleCanAdd = this.toggleCanAdd.bind(this);
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
        console.log('render',this.state)
        return (
            <Fragment>
                <Map toggleAdding={this.toggleAdding} adding={this.state.adding} cases={this.state.cases} 
                        changeCase={this.changeCase} canAdd={this.state.canAddCase} toggleCanAdd={this.toggleCanAdd}/>
                <CovidStats />
                {this.state.adding && <FormCovidCase toggleAdding={this.toggleAdding} 
                                        changeCase={this.changeCase}
                                        toggleCanAdd={this.toggleCanAdd} />}
            </Fragment>
        )
    }
}

export default CovidMap
