/**
 * This page is rendered when the update button on the home page is clicked.
 * It can be reached at "/_id" and is used for editing the METADATA.
 */

import React, { Component } from "react";
import SceneDataService from "../services/scene.service";
import { Link } from "react-router-dom";

export default class Scene extends Component {
  constructor(props) {
    super(props);
    this.onChangeSceneName = this.onChangeSceneName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.onChangeDataset = this.onChangeDataset.bind(this);
    this.getScene = this.getScene.bind(this);
    // this.updatePublished = this.updatePublished.bind(this);
    this.updateScene = this.updateScene.bind(this);
    this.deleteScene = this.deleteScene.bind(this);

    this.state = {
      currentScene: {
        file_name: "test",
        user: "test",
        scene_name: "",
        description: "",
        category: "",
        tag: "",
        dataset: "",
      },
      message: ""
    };
  }
  
  componentDidMount() {
    this.getScene(this.props.match.params._id);
  }

  onChangeSceneName(e) {
    const scene_name = e.target.value;
    
    this.setState(prevState => ({
        currentScene: {
        ...prevState.currentScene,
        scene_name: scene_name
      }
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
        currentScene: {
        ...prevState.currentScene,
        description: description
      }
    }));
  }

  onChangeCategory(e) {
    const category = e.target.value;
    
    this.setState(prevState => ({
        currentScene: {
        ...prevState.currentScene,
        category: category
      }
    }));
  }

  onChangeTag(e) {
    const tag = e.target.value;
    
    this.setState(prevState => ({
        currentScene: {
        ...prevState.currentScene,
        tag: tag
      }
    }));
  }

  onChangeDataset(e) {
    const dataset = e.target.value;
    
    this.setState(prevState => ({
        currentScene: {
        ...prevState.currentScene,
        dataset: dataset
      }
    }));
  }

  getScene(file_name) {
    console.log("scene.component is mounted")
    SceneDataService.get(file_name)
      .then(response => {
        this.setState({
            currentScene: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateScene() {
    SceneDataService.update(
      this.state.currentScene._id,
      this.state.currentScene
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Your scene was successfully updated!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteScene() {    
    SceneDataService.delete(this.state.currentScene._id)
      .then(response => {
        console.log('hi')
        console.log(response.data);
        this.props.history.push('/')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentScene } = this.state;

    return (
      <div>
        {currentScene ? (
          <div className="edit-form">
            <h4>Scene Details</h4>
            <form>
                <div className="form-group">
                <label htmlFor="scene_name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="scene_name"
                    value={currentScene.scene_name}
                    onChange={this.onChangeSceneName}
                    onFocus={this.value = this.value}
                />
                </div>

                <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={currentScene.category}
                    onChange={this.onChangeCategory}
                />
                </div>

                <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                    type="text"
                    className="form-control"
                    id="tag"
                    value={currentScene.tag}
                    onChange={this.onChangeTag}
                />
                </div>

                <div className="form-group">
                <label htmlFor="dataset">Dataset</label>
                <input
                    type="text"
                    className="form-control"
                    id="dataset"
                    value={currentScene.dataset}
                    onChange={this.onChangeDataset}
                />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    rows="3" 
                    value={currentScene.description}
                    onChange={this.onChangeDescription}
                    name="description"
                    />
                </div>
            </form>
            <div className="d-flex justify-content-start">
              <button
                className="btn btn-danger mr-3"
                onClick={this.deleteScene}
              >
                Delete
              </button>

              <button
                type="submit"
                className="btn btn-success mr-3"
                onClick={this.updateScene}
              >
                Update
              </button>

              <Link
                  to="/toolkit"
                  className="btn btn-info"
                  target="_blank"
                >
                  Scene Toolkit
              </Link>
            </div>
            <p className="updated-para">{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Scene...</p>
          </div>
        )}
      </div>
    );
  }
}