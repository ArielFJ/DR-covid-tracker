import React from 'react';
import './App.css';
import firebase from 'firebase';

// Components
import CovidMap from './components/Map/CovidMap';
import NavMenu from './components/Menus/NavMenu';
import NotLoged from './components/Menus/NotLoged';
import Loged from './components/Menus/Loged';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    }
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      })
    })
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha ingresado`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
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
        { this.renderLoginButton() }
        <NavMenu />
        <CovidMap user={this.state.user} />
      </div>
    );
  }
}

export default App;
