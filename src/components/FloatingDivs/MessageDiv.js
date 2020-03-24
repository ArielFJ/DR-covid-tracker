import React, { Component } from 'react'

export class MessageDiv extends Component {
    render() {
        return (
            <div style={{
                padding: '2rem'
            }}>
                <h2>{this.props.title}</h2>
                <h4 className="mt-4">{this.props.message}</h4>
            </div>
        )
    }
}

export default MessageDiv
