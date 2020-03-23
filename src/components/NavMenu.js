import React, { Component } from 'react'

export class NavMenu extends Component {
    render() {
        return (
            <ul class="nav nav-tabs nav-fill">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">News</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Covid-19 Timeline</a>
                </li>

            </ul>
        )
    }
}

export default NavMenu
