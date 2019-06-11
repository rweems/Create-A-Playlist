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

          <Switch>
            <Route exact path="/" component={UserList} />
            <Route path="/users/:id" component={User} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;