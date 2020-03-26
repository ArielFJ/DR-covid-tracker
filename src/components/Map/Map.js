import React, { Component } from 'react'
import L from 'leaflet';

export class Map extends Component {

    constructor() {
        super();
        this.styleFunc = this.styleFunc.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.setNewMark = this.setNewMark.bind(this);
        this.loadAllMarkers = this.loadAllMarkers.bind(this);
        this.showUserLocation = this.showUserLocation.bind(this);

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
        if(this.props.mapProps.user){
            this.showUserLocation();
        }
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

    showUserLocation(){
        let greenIcon = L.icon({
            iconUrl: 'https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-red.png?raw=true',
            iconSize:     [24, 36], // size of the icon
            iconAnchor:   [12, 54], // point of the icon which will correspond to marker's location            
            popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
        });

        const data = JSON.parse(localStorage.getItem('userCoords'))
        L.marker(data, {icon: greenIcon}).addTo(this.map).bindPopup('User Location');
    }

    componentDidUpdate() {
        if (this.props.mapProps.canAdd) {
            this.setNewMark({
                coords: this.state.coords,
                cases: this.props.mapProps.cases
            }, true)
            this.props.mapProps.toggleCanAdd();
            this.props.mapProps.handleUpload({
                lat: this.state.coords.lat,
                lng: this.state.coords.lng,
                cases: this.props.mapProps.cases
            });
        }
        if(this.props.mapProps.user){
            this.showUserLocation();
        }
    }

    setNewMark(data, open){
        let marker = L.marker(data.coords, L.divIcon({className: 'my-div-icon'})).addTo(this.layerGroup);

        let div = this.createPopupInnerData('Edit', {
            lat: data.coords.lat,
            lng: data.coords.lng,
            cases:data.cases});
        marker.bindPopup(div);

        if(open){
            marker.openPopup();
        }
    }

    createPopupInnerData(label, data) {
        var div = document.createElement('div');
        var btn = document.createElement('button');
        var inputLat = document.createElement('input');
        inputLat.type = 'hidden';
        inputLat.name = 'lat';

        var inputLng = document.createElement('input');
        inputLng.type = 'hidden';
        inputLng.name = 'lng';

        inputLat.value = data.lat;
        inputLng.value = data.lng;

        btn.classList = 'btn btn-primary';
        btn.innerHTML = label;
        btn.onclick = () => {
            this.getMarkData(btn);
        }
        div.appendChild(document.createTextNode(`Cases: ${data.cases}`));
        div.appendChild(document.createElement('br'));
        div.appendChild(btn);
        div.appendChild(inputLng);
        div.appendChild(inputLat);
        return div;
    }

    getMarkData(object){
        let cases = Number(object.parentElement.innerHTML.split('<')[0].split(' ')[1]);
        let coord = {
            [object.nextSibling.name]: Number(object.nextSibling.value),
            [object.nextSibling.nextSibling.name]: Number(object.nextSibling.nextSibling.value)
        };
        this.setState({
            coords: coord
        })
        this.props.mapProps.changeCasesInMarker(cases)
        this.props.mapProps.toggleBounds(true)
        this.props.mapProps.toggleAdding()
        this.loadAllMarkers()
    }

    loadAllMarkers(){
        this.layerGroup.clearLayers();
        this.props.mapProps.coordinates.forEach(coord => {
            let {lat, lng, cases} = coord;
            this.setNewMark({
                coords: {
                    lat,
                    lng
                },
                cases
            }, false)
        });
    }

    onMapClick(e) {
        if (this.props.mapProps.user && !this.props.mapProps.adding) {
            if (e.latlng.lng > this.limits.west &&
                e.latlng.lng < this.limits.east &&
                e.latlng.lat > this.limits.south &&
                e.latlng.lat < this.limits.north) {
                this.setState({
                    coords: e.latlng
                })                
                this.props.mapProps.toggleBounds(true);
            }else{
                this.props.mapProps.toggleBounds(false);
            }
        } 
        this.props.mapProps.toggleAdding();
    }


    render() {
        if(this.props.mapProps.user){
            this.loadAllMarkers()
        }
        return (
            <div id="map" style={this.styleFunc()}>

            </div>
        )
    }
}

export default Map
