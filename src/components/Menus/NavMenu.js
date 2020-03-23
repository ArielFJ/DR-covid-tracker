import React, { Component } from 'react'

export class NavMenu extends Component {
    render() {
        return (
            <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                    <a className="nav-link active" id="home" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="news" href="#">News</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="timeline" href="#">Covid-19 Timeline</a>
                </li>

            </ul>
        )
    }
}

export default NavMenu
