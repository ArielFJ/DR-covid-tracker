import React, { Component } from 'react'
import L from 'leaflet';
import FormCovidCase from '../FormCovidCase';

export class Map extends Component {

    constructor(){
        super();
        this.styleFunc = this.styleFunc.bind(this);
        this.onMapClick = this.onMapClick.bind(this);

        this.map = null;
        this.popup = new L.popup();
    }


    componentDidMount(){
        const coord = [18.4718609, -69.8923187]
        this.map = new L.Map("map").setView(coord, 8);
        this.map.on('click', this.onMapClick);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWZlcm1pbiIsImEiOiJjazg0bzhwOXgxb2RuM2tvNGhzemF3dmpjIn0.qq9jjJSvtG4ps2zkiJ22lg'
        }).addTo(this.map);
    }

    styleFunc(){
        return{
            height:'30rem',
            width: '60%',
            border: '2px solid black',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1rem',
        }
    }

    

    onMapClick(e) {
        // this.popup
        //     .setLatLng(e.latlng)
        //     .setContent("You clicked the map at " + e.latlng.toString())
        //     .openOn(this.map);
        // console.log(this.state.adding)
        this.props.toggleAdding()
        // let marker = L.marker(e.latlng).addTo(this.map);
        // let province = prompt("Write the province name");
        // let number = prompt("Write the number of cases");
        // marker.bindPopup(`Province: ${province}\n Cases: ${number}`);
    }



    render() {
        return (
            <div id="map" style={this.styleFunc()}>
                
            </div>
        )
    }
}

export default Map
