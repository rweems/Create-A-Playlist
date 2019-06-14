import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";
import PlaylistList from "./components/PlaylistList";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import Playlist from "./components/Playlist";
import Song from "./components/Song";


const spotifyApi = new SpotifyWebApi();

class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
         
          <Switch> 
            <Route exact path="/" component={UserList} />
            
            <Route path="/playlists" component={PlaylistList} />

            <Route path="/api/v1/users/:id" component={User} />
            <Route path="/api/v1/playlists/:id" component={Playlist} />
            <Route path="/api/v1/songs/:id" component={Song} />


          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;