import React, { Component } from 'react'

export class FormCovidCase extends Component {

    styleFunc(){
        return {
            background: 'rgba(0,0,0,.8)',
            width: '40%',
            height: '40%',
            position: "absolute",
            top: '20%',
            left: '30%',
            zIndex:'1000',
            color: 'white'
        }
    }

    render() {
        return (
            <div style={this.styleFunc()} onClick={this.props.toggleAdding}>
                <h1>Hello world</h1>
            </div>
        )
    }
}

export default FormCovidCase
