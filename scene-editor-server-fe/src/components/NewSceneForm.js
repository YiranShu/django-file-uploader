import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewSceneForm extends React.Component {
  state = {
    file_name: "",
    user: "",
    scene_name: "",
    description: "",
    category: "",
    tag: ""
  };

  componentDidMount() {
    if (this.props.scene) {
      const { file_name, user, scene_name, description, category, tag } = this.props.scene;
      this.setState({ file_name, user, scene_name, description, category, tag });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
        <FormGroup>
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
        </FormGroup>
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
          <Input
            type="text"
            name="description"
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
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewSceneForm;