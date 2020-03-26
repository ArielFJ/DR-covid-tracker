import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom';
import GraphsComponent from '../DataComponents/GraphsComponent';


export class NavMenu extends Component {


    render() {
        return (
            <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                    <Link to="/" className='nav-link ' id=""  >Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/timeline" className='nav-link' id="timeline"  >Covid-19 Timeline</Link>
                </li>
                
                <Route path="/timeline" render={() => <GraphsComponent user={this.props.user} /> } />
            </ul>
        )
    }
}

export default NavMenu
