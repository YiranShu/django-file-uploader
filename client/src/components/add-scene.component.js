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
      json: "",
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
      dataset: this.state.dataset,
      json: this.state.json
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
          json: response.data.json,

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
        json: "",
        submitted: false
    });
    window.location.reload(false)
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div className="jumbotron ">
            <h4 className="d-flex justify-content-center">You submitted successfully!</h4>
            <br></br>
            <div className="d-flex justify-content-center">
              <button className="btn btn-success mr-3" onClick={this.newScene}>
                Create Another
              </button>
              <Link
                  to="/"
                  className="btn btn-danger"
                  >
                  Scene List
              </Link>
            </div>
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