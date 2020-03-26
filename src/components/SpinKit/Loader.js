import React, { Component } from 'react'
import './loader.css'

export class Loader extends Component {
    render() {
        return (
            <div class="sk-folding-cube" style={{paddingBottom:'2rem', marginBottom:'2rem'}}>
                <div class="sk-cube1 sk-cube"></div>
                <div class="sk-cube2 sk-cube"></div>
                <div class="sk-cube4 sk-cube"></div>
                <div class="sk-cube3 sk-cube"></div>
            </div>
        )
    }
}

export default Loader
