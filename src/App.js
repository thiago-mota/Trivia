import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import TriviaGame from './pages/TriviaGame';
import Settings from './pages/Settings';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/trivia" component={ TriviaGame } />
            <Route path="/settings" component={ Settings } />
          </Switch>
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    );
  }
}
