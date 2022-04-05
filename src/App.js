import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <BrowserRouter>
            <Switch>
              <Route path="/" component={ Login } />
            </Switch>
          </BrowserRouter>
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    );
  }
}
