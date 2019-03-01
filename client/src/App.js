import React, { Component } from 'react';
import { Route, NavLink, withRouter} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Jokes from "./components/Jokes";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/jokes">Jokes</NavLink>
        <Route
          path="/jokes"
          component={Jokes}
        />
        <Route
          path="/register"
          component={Register}
        />
         <Route
          path="/login"
          component={Login}
        />       
      </div>
    );
  }
}

export default withRouter(App);
