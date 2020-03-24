import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import FloatingDiv from './FloatingDivs/FloatingDiv'

export class Routes extends Component {
    render() {
        return (
            <div>
                

                <Route path="/Add" component={FloatingDiv} />
                <Route path="/Edit" component={FloatingDiv} />
                <Route path="/" render={FloatingDiv} />
            </div>
        )
    }
}

export default Routes
