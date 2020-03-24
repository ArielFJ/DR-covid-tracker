import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyALHLrRDY_lKbtWfKhbof8AeYt4YnJEERA",
    authDomain: "covid-tracker-8393a.firebaseapp.com",
    databaseURL: "https://covid-tracker-8393a.firebaseio.com",
    projectId: "covid-tracker-8393a",
    storageBucket: "covid-tracker-8393a.appspot.com",
    messagingSenderId: "649220265239",
    appId: "1:649220265239:web:f637ec231a0fca9ed49352"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

