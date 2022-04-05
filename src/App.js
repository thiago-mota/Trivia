import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import TriviaGame from './pages/TriviaGame';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/trivia" component={ TriviaGame } />
          </Switch>
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    );
  }
}
