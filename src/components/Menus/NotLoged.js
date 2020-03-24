import React, { Component } from 'react'

export class NotLoged extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Covid Tracker by Magna</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className=" mr-auto"></div>
                    <button className="btn btn-outline-primary my-2 mr-3 my-sm-0" type="submit" onClick={this.props.handleAuth}>Log In</button>
                </div>
            </nav>
        )
    }
}

export default NotLoged
