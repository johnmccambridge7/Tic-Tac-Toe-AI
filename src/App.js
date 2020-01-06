import React, { Component } from 'react';
import Board from './components/Board';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <center>
          <header>
            <h1 className="title">Tic-Tac-Toe artificially made intelligent.</h1>
          </header>
          <Board />
        </center>
      </div>
    );
  }
  
}

export default App;
