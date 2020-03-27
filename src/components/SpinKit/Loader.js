import React, { Component } from 'react'
import './loader.css'

export class Loader extends Component {
    render() {
        return (
            <div className="sk-folding-cube" style={{paddingBottom:'2rem', marginBottom:'2rem'}}>
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        )
    }
}

export default Loader
