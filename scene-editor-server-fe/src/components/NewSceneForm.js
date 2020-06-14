import React from "react";
import {Button, Form, FormGroup, Input, Label } from "reactstrap";
import Button from 'react-bootstrap/Button';

import axios from "axios";

import { API_URL } from "../constants";

class NewSceneForm extends React.Component {
  state = {
    // file_name: "",
    // user: "",
    scene_name: "",
    description: "",
    category: "",
    tag: "",
    dataset: ""
  };

  componentDidMount() {
    if (this.props.scene) {
      const { scene_name, description, category, tag, dataset } = this.props.scene;
      this.setState({scene_name, description, category, tag, dataset });
    }
  }

  onChange = e => {                                      //handle Input Change
    this.setState({ [e.target.name]: e.target.value });  //target.name can be the "name" in Input tag
  };

  createScene = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editScene = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.file_name, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.scene ? this.editScene : this.createScene}>
        {/* <FormGroup>
          <Label for="file_name">File Name:</Label>
          <Input
            type="text"
            name="file_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.file_name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="user">User Name:</Label>
          <Input
            type="text"
            name="user"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.user)}
          />
        </FormGroup> */}
        <FormGroup>
          <Label for="scene_name">Scene Name:</Label>
          <Input
            type="text"
            name="scene_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.scene_name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description:</Label>
          <br></br>
          <textarea
            type="text"
            name="description"
            rows={2}
            cols={50}
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.description)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category:</Label>
          <Input
            type="text"
            name="category"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.category)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="tag">Tag:</Label>
          <Input
            type="text"
            name="tag"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.tag)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="dataset">Dataset:</Label>
          <Input
            type="text"
            name="dataset"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.dataset)}
          />
        </FormGroup>
        <Button variant='secondary'>Cancel</Button>{' '}
        <Button variant='primary'>Create Scene</Button>{' '}
      </Form>
    );
  }
}

export default NewSceneForm;