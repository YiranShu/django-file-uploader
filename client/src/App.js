import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddScene from "./components/add-scene.component";
import Scene from "./components/scene.component";
import ScenesList from "./components/scene-list.component";
import SceneToolkit from "./components/scene-toolkit.component";
// import axios from 'axios';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              Scene Editor
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/toolkit"} className="nav-link">
                  Toolkit
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={ScenesList} />
              <Route exact path="/add" component={AddScene} />
              <Route path="/toolkit/:_id" component={SceneToolkit} />  {/*order is important!*/}
              <Route path="/:_id" component={Scene} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;