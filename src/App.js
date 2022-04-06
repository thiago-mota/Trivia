import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import TriviaGame from './pages/TriviaGame';
import Settings from './pages/Settings';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/settings" component={ Settings } />
            <Route exact path="/trivia" component={ TriviaGame } />
            <Route exact path="/" component={ Login } />
          </Switch>
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    );
  }
}
