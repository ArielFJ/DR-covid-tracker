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
    this.dbRef.set(this.state.coords.concat(newObject),
    error => {  })
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider);
  }

  handleLogout(){
    firebase.auth().signOut();
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

          <Route exact path="/" render={()=>{ return  <CovidMap user={this.state.user} coords={this.state.coords} handleUpload={this.handleUpload} /> }} />
          {/* <Route path="/news" component={FloatingDiv} />
          <Route path="/timeline" component={FloatingDiv} /> */}
        </Router>
      </div>
    );
  }
}

export default App;
