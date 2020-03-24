import React, { Component } from 'react'

import FormCovidCase from './FormCovidCase';
import MessageDiv from './MessageDiv';

export class FloatingDiv extends Component {

    constructor(){
        super();
        this.handleCancel = this.handleCancel.bind(this);
    }

    styleFunc(){
        return {
            background: 'rgba(0,0,0,.8)',
            width: '48%',
            height: '25rem',
            position: "absolute",
            top: '17.5%',
            left: '26%',
            zIndex:'1000',
            color: 'white',
        }
    }

    handleCancel() {
        this.props.changeCase({});
        this.props.toggleAdding();
    }

    renderInnerElement(){
        if(this.props.user){
            if(this.props.onBounds){
                return <FormCovidCase changeCase={this.props.changeCase} toggleCanAdd={this.props.toggleCanAdd} toggleAdding={this.props.toggleAdding} />
            }else{
                return <MessageDiv title="Out of bounds" message="Please, limit the marks to Dominican Republic." />
            }
        }else{
            return <MessageDiv title="No user" message="You have to log in to make marks on the map." />
        }
    }

    render() {
        return (
            <div style={this.styleFunc()} >
                { this.renderInnerElement() }
                <button className="btn btn-danger ml-4 mt-4" onClick={this.handleCancel}>Back</button>
            </div>
        )
    }
}

export default FloatingDiv
