import React, { Component } from 'react'
import L from 'leaflet';

export class Map extends Component {

    constructor() {
        super();
        this.styleFunc = this.styleFunc.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.setNewMark = this.setNewMark.bind(this);
        this.loadAllUserMarkers = this.loadAllUserMarkers.bind(this);
        this.showUserLocation = this.showUserLocation.bind(this);
        this.loadMarkers = this.loadMarkers.bind(this);

        this.map = null;
        this.layerGroup = L.layerGroup();
        this.popup = new L.popup();
        this.state = {
            coords: {},
            isOnUserLocation: false
        }
        this.limits = {
            north: 19.97,
            east: -68.31,
            south: 17.51,
            west: -72.03
        }
    }


    componentDidMount() {
        const coord = [0, 0]
        this.map = new L.Map("map").setView(coord, 3);
        let southWest = L.latLng(-84.92909765074076, -171.91214186037487),
            northEast = L.latLng( 84.92132367178613, 192.11040404485885),
            bounds = L.latLngBounds(southWest, northEast);
        this.map.setMinZoom(2);
        this.map.setMaxBounds(bounds);
        this.layerGroup.addTo(this.map);
        this.map.on('contextmenu', this.onMapClick);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWZlcm1pbiIsImEiOiJjazg0bzhwOXgxb2RuM2tvNGhzemF3dmpjIn0.qq9jjJSvtG4ps2zkiJ22lg'
        }).addTo(this.map);

        this.map.on('click', (e) => {
            console.log(e.latlng)
        })

        //this.map.doubleClickZoom.disable();
        
        if(this.props.mapProps.user){            
            if(this.props.mapProps.userCoords){
                this.showUserLocation();
                this.map.setView(this.props.mapProps.userCoords);
            }
            this.loadMarkers();
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
        
        const data = this.props.mapProps.userCoords;
        // console.log(data)
        // L.circle(data, {
        //     color: 'green',
        //     fillColor: '#f03',
        //     fillOpacity: 0.5,
        //     radius: 15000
        // }).addTo(this.map).bindPopup('User Location');

        L.marker(data, {icon: greenIcon}).addTo(this.map).bindPopup('User Location');
    }

    async loadMarkers(){
        let res = await fetch('https://covid19.mathdro.id/api/confirmed')
        let data = await res.json();
        data.forEach(x => {
            const dat = {
                coords: {lat:x.lat, lng:x.long},
                confirmed: x.confirmed,
                active: x.active,
                deaths: x.deaths,
                recovered: x.recovered
            }
            this.setNewMark(dat, false, false);    
        })
        
    }

    componentDidUpdate() {
        if (this.props.mapProps.canAdd) {
            this.setNewMark({
                coords: this.state.coords,
                cases: this.props.mapProps.cases
            }, true, true)
            this.props.mapProps.toggleCanAdd();
            this.props.mapProps.handleUpload({
                lat: this.state.coords.lat,
                lng: this.state.coords.lng,
                cases: this.props.mapProps.cases
            });
        }
        if(this.props.mapProps.user){
            if(!this.state.isOnUserLocation){
                if(this.props.mapProps.userCoords){                    
                    this.showUserLocation();
                    this.map.setView(this.props.mapProps.userCoords, 6);
                    this.setState({
                        isOnUserLocation: true
                    })                
                }
            }
            this.loadMarkers();
        }
    }

    setNewMark(data, open, isUser, icon='my-div-icon'){
        let marker
        if(isUser){
            marker = L.marker(data.coords, L.divIcon({className: icon})).addTo(this.layerGroup);
        }else{
            marker = L.circle(data.coords, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 15000
            }).addTo(this.layerGroup);
        }

        let dat = {}
        if(isUser){
            dat = {
                lat: data.coords.lat,
                lng: data.coords.lng,
                cases:data.cases
            };
        }else{
            dat = data;
        }
        let div = this.createPopupInnerData('Edit', dat, isUser);
        marker.bindPopup(div);

        if(open){
            marker.openPopup();
        }
    }

    createPopupInnerData(label, data, isUser) {
        var div = document.createElement('div');
        
        if(isUser){
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
        }
        else{
            div.appendChild(document.createTextNode(`Cases Confirmed: ${data.confirmed}`))
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createTextNode(`Cases Recovered: ${data.recovered}`))
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createTextNode(`Deaths: ${data.deaths}`))
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createTextNode(`Active Cases: ${data.active}`))
            div.appendChild(document.createElement('br'));
        }        
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
        this.props.mapProps.toggleAdding()
        this.loadAllUserMarkers()
    }

    loadAllUserMarkers(){
        this.layerGroup.clearLayers();
        this.props.mapProps.coordinates.forEach(coord => {
            let {lat, lng, cases} = coord;
            this.setNewMark({
                coords: {
                    lat,
                    lng
                },
                cases
            }, false, true)
        });
    }

    onMapClick(e) {
        if (this.props.mapProps.user && !this.props.mapProps.adding) {
            this.setState({
                coords: e.latlng
            })                
        } 
        this.props.mapProps.toggleAdding();
    }


    render() {
        if(this.props.mapProps.user){
            this.loadAllUserMarkers()
        }
        return (
            <div id="map" style={this.styleFunc()}>

            </div>
        )
    }
}

export default Map
