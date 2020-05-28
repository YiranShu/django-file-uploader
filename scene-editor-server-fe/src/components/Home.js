import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import SceneList from "./SceneList";
import NewSceneModal from "./NewSceneModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    scenes: []
  };

  componentDidMount() {
    this.resetState();
  }

  getScenes = () => {
    axios.get(API_URL).then(res => this.setState({ scenes: res.data }));
  };

  resetState = () => {
    this.getScenes();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <SceneList
              scenes={this.state.scenes}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewSceneModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;

