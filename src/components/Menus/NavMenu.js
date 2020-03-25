import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom';
import NewsComponent from '../DataComponents/NewsComponent';
import GraphsComponent from '../DataComponents/GraphsComponent';


export class NavMenu extends Component {

    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        e.preventDefault();
        window.location = `/${e.target.id}`;
    }

    render() {
        return (
            <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                    <Link to="/" className={window.location.pathname.endsWith('/')? 'nav-link active' : 'nav-link'} id="" onClick={this.onClick} >Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/news" className={window.location.pathname.endsWith('news')? 'nav-link active' : 'nav-link'} id="news" onClick={this.onClick}>News</Link>
                </li>
                <li className="nav-item">
                    <Link to="/timeline" className={window.location.pathname.endsWith('timeline')? 'nav-link active' : 'nav-link'} id="timeline" onClick={this.onClick} >Covid-19 Timeline</Link>
                </li>
                <Route path="/news" render={() => <NewsComponent user={this.props.user} />} />
                <Route path="/timeline" render={() => <GraphsComponent user={this.props.user} /> } />
            </ul>
        )
    }
}

export default NavMenu
