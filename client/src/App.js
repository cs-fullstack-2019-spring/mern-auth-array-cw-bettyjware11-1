import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserBookHome from "./UserBookHome";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*This is the parent component*/}

        <UserBookHome/>



      </div>
    );
  }
}

export default App;
