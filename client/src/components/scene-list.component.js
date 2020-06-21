/**
 * Serves as the "home page" and can be accessed by the "/" url.
 * Holds the list of created scenes.
 */

import React, { Component } from "react";
import SceneDataService from "../services/scene.service";
import { Link } from "react-router-dom";

export default class ScenesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveScenes = this.retrieveScenes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveScene = this.setActiveScene.bind(this);
    this.removeAllScenes = this.removeAllScenes.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      scenes: [],
      currentScene: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveScenes();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
        searchName: searchName
    });
  }

  retrieveScenes() {
    SceneDataService.getAll()
      .then(response => {
        this.setState({
            scenes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveScenes();
    this.setState({
      currentScene: null,
      currentIndex: -1
    });
  }

  setActiveScene(scene, index) {
    this.setState({
      currentScene: scene,
      currentIndex: index
    });
  }

  removeAllScenes() {
    SceneDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    SceneDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          scenes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, scenes, currentScene, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by scene name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Scenes List</h4>

          <ul className="list-group">
            {scenes &&
              scenes.map((scene, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveScene(scene, index)}
                  key={index}
                >
                  {scene.scene_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-md btn-danger"
            onClick={this.removeAllScenes}
          >
            Remove All
          </button>
          
          {/* <iframe title="Scene Editor" src="http://www.baidu.com" name="example"></iframe> */}
        </div>
        <div className="col-md-6">
          {currentScene ? (
            <div>
              <h4>Scene</h4>
              <div>
                <label>
                  <strong>Name:</strong>  
                </label>{" "}            
                {currentScene.scene_name}    
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentScene.description}
              </div>
              <div>
                <label>
                  <strong>Category:</strong>  
                </label>{" "}            
                {currentScene.category}    
              </div>
              <div>
                <label>
                  <strong>Tag:</strong>
                </label>{" "}
                {currentScene.tag}
              </div>
              <div>
                <label>
                  <strong>Dataset:</strong>  
                </label>{" "}            
                {currentScene.dataset}    
              </div>

              <Link
                to={"/" + currentScene._id}
                className="btn btn-sm btn-warning"
                style={{marginRight: 10}}
              >
                Edit
              </Link>
              <Link
                // need to eventually make it specialize in a particular scene
                to="/editor"
                className="btn btn-sm btn-info"
                target="_blank"
              >
                Scene Editor
              </Link>
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Scene...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}