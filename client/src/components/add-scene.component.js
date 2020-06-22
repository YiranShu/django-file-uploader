/**
 * This page is rendered when the "add" button on the navbar is clicked.
 * It allows a user to input information and add a new scene to the database.
 * It can be reached at the "/add" link.
 */

import React, { Component } from "react";
import SceneDataService from "../services/scene.service";
import { Link } from "react-router-dom";

export default class AddScene extends Component {
  constructor(props) {
    super(props);
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

  saveScene() {
    var data = {
      file_name: 'test',
      user: 'test',
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
    window.location.reload(false)
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div className="jumbotron justify-content-center">
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newScene}>
              Create Another
            </button>
            <br></br>
            <br></br>
            <button
              className="btn btn-danger mr-2"
              onClick={this.newScene}
            >
              Edit Scene
            </button>
          </div>
        ) : (
          <div>

            <h4>New Scene</h4>
            <form>

              <div className="form-group">
                <label htmlFor="scene_name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="scene_name"
                  required
                  value={this.state.scene_name}
                  onChange={e => this.setState({scene_name: e.target.value})}
                  name="scene_name"
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
                  onChange={e => this.setState({category: e.target.value})}
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
                  onChange={e => this.setState({tag: e.target.value})}
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
                  onChange={e => this.setState({dataset: e.target.value})}
                  name="dataset"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  className="form-control" 
                  id="description" 
                  rows="3" 
                  value={this.state.description}
                  onChange={e => this.setState({description: e.target.value})}
                  name="description"
                  />
              </div>
            </form>

            <button onClick={this.saveScene} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

}