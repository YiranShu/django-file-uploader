
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddScene from "./components/add-scene.component";
import Scene from "./components/scene.component";
import ScenesList from "./components/scenes-list.component";
// import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./components/Header";
// import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/scenes" className="navbar-brand">
              Scene-Editor
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/scenes"} className="nav-link">
                  Scenes
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/scenes"]} component={ScenesList} />
              <Route exact path="/add" component={AddScene} />
              <Route path="/scenes/<str:file_name>" component={Scene} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;