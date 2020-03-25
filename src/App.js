import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {BrowserRouter as Router, Route} from 'react-router-dom';


// Components
import CovidMap from './components/Map/CovidMap';
import NavMenu from './components/Menus/NavMenu';
import NotLoged from './components/Menus/NotLoged';
import Loged from './components/Menus/Loged';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null,
      coords: []
    }

    this.dbRef = firebase.database().ref('coords');

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      })
    });

    this.dbRef.on('value', snap => {
      let coords = snap.val() !== null ? snap.val() : [];
      this.setState({
        coords
      })
    })
    
  }

  handleUpload(newObject){
    let newCoords = this.state.coords;
    if(this.state.coords.length > 0){
      console.log('mayor de 0', this.doesCoordExist(newObject, newCoords))
      if(this.doesCoordExist(newObject, newCoords)){  
        newCoords = this.state.coords.map((coord) => {
          if(coord.lat === newObject.lat && coord.lng === newObject.lng){
            coord.cases = Number(newObject.cases);
          }
          return coord;
        })
      }else{
        newCoords.push(newObject)
      }
    }else{
      newCoords.push(newObject)
    }
    console.log(newCoords)
    this.setState({
      coords: newCoords
    })
    this.dbRef.set(newCoords,
    error => {  })
  }

  doesCoordExist(coord, listCoords){
    for(let c of listCoords){
      if(c.lat === coord.lat && c.lng === coord.lng){
        return true;
      }
    }
    return false;
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position => {
            const obj = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            localStorage.setItem('userCoords', JSON.stringify(obj))
          })
        }
      })
  }

  handleLogout(){
    firebase.auth().signOut();
    window.location = '/';
  }


  renderLoginButton(){
    if(this.state.user){
      return <Loged handleLogout={this.handleLogout} user={this.state.user} />
    }else{
      return <NotLoged  handleAuth={this.handleAuth} />
    }
  }

  render() {
    return (
      <div className="container-xl full-height ">
        <Router>
          { this.renderLoginButton() }
          <NavMenu />
          {/* <CovidMap user={this.state.user} coords={this.state.coords} handleUpload={this.handleUpload} /> */}

          <Route exact path="/" render={()=>{ return  <CovidMap user={this.state.user} coords={this.state.coords} handleUpload={this.handleUpload} userCoords={this.state.userCoords} /> }} />
          {/* <Route path="/news" component={FloatingDiv} />
          <Route path="/timeline" component={FloatingDiv} /> */}
        </Router>
      </div>
    );
  }
}

export default App;
