import React, { Component } from 'react'

export class Loged extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Covid Tracker by Magna</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className=" mr-auto"></div>
                    <img src={this.props.user.photoURL} alt={this.props.user.displayName} width="45px" />
                    <p className="ml-3">Welcome, {this.props.user.displayName}</p>
                    <button className="btn btn-outline-danger my-2 ml-3 mr-3 my-sm-0" type="submit" onClick={this.props.handleLogout}>Log Out</button>
                </div>
            </nav>
        )
    }
}

export default Loged
