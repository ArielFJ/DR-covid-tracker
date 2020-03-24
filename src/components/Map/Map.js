import React, { Component } from 'react'
import L from 'leaflet';

export class Map extends Component {

    constructor() {
        super();
        this.styleFunc = this.styleFunc.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.setNewMark = this.setNewMark.bind(this);

        this.map = null;
        this.layerGroup = L.layerGroup();
        this.popup = new L.popup();
        this.state = {
            coords: {}
        }
        this.limits = {
            north: 19.97,
            east: -68.31,
            south: 17.51,
            west: -72.03
        }
    }


    componentDidMount() {
        const coord = [18.4718609, -69.8923187]
        this.map = new L.Map("map").setView(coord, 8);
        this.layerGroup.addTo(this.map);
        this.map.on('click', this.onMapClick);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWZlcm1pbiIsImEiOiJjazg0bzhwOXgxb2RuM2tvNGhzemF3dmpjIn0.qq9jjJSvtG4ps2zkiJ22lg'
        }).addTo(this.map);
        this.map.doubleClickZoom.disable();
        
    }

    styleFunc() {
        return {
            height: '30rem',
            width: '100%',
            border: '2px solid black',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1rem',
        }
    }

    componentDidUpdate() {
        
        if (this.props.canAdd) {
            this.setNewMark({
                coords: this.state.coords,
                cases: this.props.cases
            }, true)
            this.props.toggleCanAdd();
            this.props.handleUpload({
                lat: this.state.coords.lat,
                lng: this.state.coords.lng,
                cases: this.props.cases
            });
        }
    }

    setNewMark(data, open){
        let marker = L.marker(data.coords, L.divIcon({className: 'my-div-icon'})).addTo(this.layerGroup);
        let div = this.createPopupInnerData('Edit', data.cases);
        marker.bindPopup(div);

        if(open){
            marker.openPopup();
        }
    }

    createPopupInnerData(label, cases) {
        var div = document.createElement('div');
        var btn = document.createElement('button');
        btn.classList = 'btn btn-primary';
        btn.innerHTML = label;
        btn.onclick = () => {
            this.getMarkData(btn);
        }
        div.appendChild(document.createTextNode(`Cases: ${cases}`));
        div.appendChild(document.createElement('br'));
        div.appendChild(btn);
        return div;
    }

    getMarkData(object){
        let cases = Number(object.parentElement.innerHTML.split('<')[0].split(' ')[1]);
        this.props.changeCasesInMarker(cases)
        this.props.toggleBounds(true)
        this.props.toggleAdding()
    }

    onMapClick(e) {
        if (this.props.user && !this.props.adding) {
            if (e.latlng.lng > this.limits.west &&
                e.latlng.lng < this.limits.east &&
                e.latlng.lat > this.limits.south &&
                e.latlng.lat < this.limits.north) {
                this.setState({
                    coords: e.latlng
                })                
                this.props.toggleBounds(true);
            }else{
                this.props.toggleBounds(false);
            }
        } 
        this.props.toggleAdding();
    }


    render() {
        this.layerGroup.clearLayers();
        this.props.coordinates.forEach(coord => {
            let {lat, lng, cases} = coord;
            this.setNewMark({
                coords: {
                    lat,
                    lng
                },
                cases
            }, false)
        });
        return (
            <div id="map" style={this.styleFunc()}>

            </div>
        )
    }
}

export default Map
