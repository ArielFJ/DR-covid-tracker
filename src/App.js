import React from 'react';
import './App.css';

// Components
import CovidMap from './components/Map/CovidMap';
import NavMenu from './components/Menus/NavMenu';
import LogSign from './components/Menus/LogSign';

function App() {
  return (
    <div className="container-xl full-height ">
      <LogSign/>
      <NavMenu />
      <CovidMap />
    </div>
  );
}

export default App;
