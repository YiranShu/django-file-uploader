import React, { Component } from "react";
import SceneDataService from "../services/scene.service";

export default class AddScene extends Component {
  constructor(props) {
    super(props);
    // this.onChangefile_name = this.onChangefile_name.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeSceneName = this.onChangeSceneName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.onChangeDataset = this.onChangeDataset.bind(this);
    this.saveScene = this.saveScene.bind(this);
    this.newScene = this.newScene.bind(this);

    this.state = {
      file_name: "",
      user: "",
      scene_name: "",
      description: "",
      category: "",
      tag: "",
      dataset: "",
      submitted: false
    };
  }

//   onChangefile_name(e) {
//     this.setState({
//       title: e.target.value
//     });
//   }

  onChangeUser(e) {
    this.setState({
        user: e.target.value
    });
  }

  onChangeSceneName(e) {
    this.setState({
        scene_name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
        category: e.target.value
    });
  }

  onChangeTag(e) {
    this.setState({
        tag: e.target.value
    });
  }

  onChangeDataset(e) {
    this.setState({
        dataset: e.target.value
    });
  }


  saveScene() {
    var data = {
      file_name: 'test',
      user: this.state.user,
      scene_name: this.state.scene_name,
      description: this.state.description,
      category: this.state.category,
      tag: this.state.tag,
      dataset: this.state.dataset
    };

    SceneDataService.create(data)
      .then(response => {
        this.setState({
          file_name: response.data.file_name,
          user: response.data.user,
          scene_name: response.data.scene_name,
          description: response.data.description,
          category: response.data.category,
          tag: response.data.tag,
          dataset: response.data.dataset,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newScene() {
    this.setState({
        file_name: "",
        user: "",
        scene_name: "",
        description: "",
        category: "",
        tag: "",
        dataset: "",
        submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newScene}>
              Create
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="user">User</label>
              <input
                type="text"
                className="form-control"
                id="user"
                required
                value={this.state.user}
                onChange={this.onChangeUser}
                name="user"
              />
            </div>

            <div className="form-group">
              <label htmlFor="scene_name">Scene Name</label>
              <input
                type="text"
                className="form-control"
                id="scene_name"
                required
                value={this.state.scene_name}
                onChange={this.onChangeSceneName}
                name="scene_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                className="form-control"
                id="tag"
                required
                value={this.state.tag}
                onChange={this.onChangeTag}
                name="tag"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dataset">Dataset</label>
              <input
                type="text"
                className="form-control"
                id="dataset"
                required
                value={this.state.dataset}
                onChange={this.onChangeDataset}
                name="dataset"
              />
            </div>

            <button onClick={this.saveScene} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

}