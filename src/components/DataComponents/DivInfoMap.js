import React, { Component, Fragment } from 'react'
import red from '../../img/rec (1).png'
import click from '../../img/right-click.png'


export class DivInfoMap extends Component {
    render() {
        return (
            <Fragment>
                <div className="row mt-4" style={{marginLeft:'10rem',}} >
                    <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" alt="red mark" />
                    <p className="mr-4">User Location</p>
                    <img className="ml-4" src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png" alt="blue mark" />
                    <p className="mr-4" >Users markers</p>
                    <img className="ml-4" width="26px" src={red} alt="circle red" />
                    <p className="mr-4" >Covid Cases</p>

                    <img className="ml-4"  src={click} alt="right click action" />
                    <p >Right Click to add new case</p>
                    <br />
                    
                </div>
                <div className="text-center" >
                    <p>Click on any mark in the map to see information.</p>
                </div>
            </Fragment>
        )
    }
}

export default DivInfoMap
