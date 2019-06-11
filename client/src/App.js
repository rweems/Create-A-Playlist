import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <a href="http://localhost:8888">
            <button>Login with spotify</button>
          </a>
          <Switch>
            <Route exact path="/users" component={UserList} />
            <Route path="/users/:id" component={User} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;