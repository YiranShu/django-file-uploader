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
    if(searchName === "") {
      this.refreshList();
    }
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
          scenes: [response.data]
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
          <h4>Scene List</h4>

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
            className="mt-3 btn btn-md btn-danger mb-3"
            onClick={this.removeAllScenes}
            id="rm-button"
          >
          Remove All
          </button>
          
          {/* <iframe title="Scene Editor" src="http://www.baidu.com" name="example"></iframe> */}
        </div>
        <div className="col-md-6">
          {currentScene ? (
            <div style={{width: 300}}>
              <h4>Scene Details</h4>
              <div className="details-divs">
                <label className="list-item">
                  <strong>Name:</strong>  
                </label>{" "}            
                {currentScene.scene_name}    
              </div>
              <div className="details-divs">
                <label className="list-item">
                  <strong>Category:</strong>  
                </label>{" "}            
                {currentScene.category}    
              </div>
              <div className="details-divs">
                <label className="list-item">
                  <strong>Tag:</strong>
                </label>{" "}
                {currentScene.tag}
              </div>
              <div className="details-divs">
                <label className="list-item">
                  <strong>Dataset:</strong>  
                </label>{" "}            
                {currentScene.dataset}    
              </div>
              <div className="details-divs">
                <label className="list-item">
                  <strong>Description:</strong>
                </label>{" "}
                {currentScene.description}
              </div>
              <div className="mt-3">
                <Link
                  to={"/" + currentScene._id}
                  className="btn btn-sm btn-warning list-button"
                >
                  Edit Details
                </Link>
                <Link
                  to={"/toolkit/" + currentScene._id}
                  className="btn btn-sm btn-info"
                  target="_blank"
                >
                  Scene Toolkit
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Scene...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}