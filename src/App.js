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
import Footer from './components/Footer';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null,
      coords: [],
      userCoords: {}
    }

    this.dbRef = firebase.database().ref('coords');

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          const obj = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.setState({
              userCoords: obj
          })
        }, error => {
            if(error.code === error.PERMISSION_DENIED){
                this.setState({
                    userCoords: null
                })
            }
        })
      }

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
        // if(navigator.geolocation){
        //   navigator.geolocation.getCurrentPosition(position => {
        //     const obj = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     }
        //     this.setState({
        //         userCoords: obj
        //     })
        //   })
        // }
        console.log(result.user.email + 'ha iniciado sesión')
      })
    //   this.forceUpdate();
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
      <div className="container-xl full-height" style={{minHeight:'57rem'}}>
        <Router>
          { this.renderLoginButton() }
          <NavMenu optionSelected={this.state.optionSelected} changeOption={this.changeOption} user={this.state.user} />

          <Route exact path="/" render={()=>{ 
            return  <CovidMap 
                        user={this.state.user} 
                        coords={this.state.coords} 
                        handleUpload={this.handleUpload} 
                        userCoords={this.state.userCoords} /> }} />
          
        </Router>
        <div className="my-auto"></div>
        <Footer />
      </div>
    );
  }
}

export default App;
