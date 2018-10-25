import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, world? Are you there? It's me, Mario. </h1>
      </div>
    );
  }
}

export default hot(module)(App);
