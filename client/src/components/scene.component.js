/**
 * This page is rendered when the update button on the home page is clicked.
 * It can be reached at "/file_name" and is used for editing the METADATA.
 */

import React, { Component } from "react";
import SceneDataService from "../services/scene.service";
import { BrowserRouter as Link } from "react-router-dom";

export default class Scene extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
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
    console.log("2" + this.props.match.params.file_name)
    this.getScene(this.props.match.params.file_name);  //???
    console.log("hello")
  }

  onChangeUser(e) {
    const user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentScene: {
          ...prevState.currentScene,
          user: user
        }
      };
    });
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
      this.state.currentScene.file_name,
      this.state.currentScene
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The scene was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteScene() {    
    SceneDataService.delete(this.state.currentScene.file_name)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/scenes')
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
            <h4>Scene</h4>
            <form>
                {/* <div className="form-group">
                <label htmlFor="user">User</label>
                <input
                    type="text"
                    className="form-control"
                    id="user"
                    value={this.state.user}
                    onChange={this.onChangeUser}
                />
                </div> */}

                <div className="form-group">
                <label htmlFor="scene_name">Scene Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="scene_name"
                    value={this.state.scene_name}
                    onChange={this.onChangeSceneName}
                />
                </div>

                <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                />
                </div>

                <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={this.state.category}
                    onChange={this.onChangeCategory}
                />
                </div>

                <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                    type="text"
                    className="form-control"
                    id="tag"
                    value={this.state.tag}
                    onChange={this.onChangeTag}
                />
                </div>

                <div className="form-group">
                <label htmlFor="dataset">Dataset</label>
                <input
                    type="text"
                    className="form-control"
                    id="dataset"
                    value={this.state.dataset}
                    onChange={this.onChangeDataset}
                />
                </div>
            </form>

            

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteScene}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateScene}
            >
              Update
            </button>
            <br></br>
            <br></br>  
            <Link
                // to={"/scenes/" + currentScene.file_name}
                // to={"/scenes/display/" + currentScene.file_name}
                to={"/editor"}
                className="badge badge-warning"
                target="_blank"
              >
                Scene-editor
            </Link>
            
            <p>{this.state.message}</p>
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