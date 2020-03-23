import React from 'react';

// Components
import CovidMap from './components/CovidMap';
import NavMenu from './components/NavMenu';
import LogSign from './components/LogSign';

function App() {
  return (
    <div className="container">
      <LogSign/>
      <NavMenu />
      <CovidMap />
    </div>
  );
}

export default App;
