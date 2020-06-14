import React, { Component } from "react";
import { Table } from "reactstrap";
import NewSceneModal from "./NewSceneModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class SceneList extends Component {
  render() {
    const scenes = this.props.scenes;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>File Name</th>
            <th>User Name</th>
            <th>Scene Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Tag</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!scenes || scenes.length <= 0 ? (
            <tr>
              <td colSpan="7" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            scenes.map(scene => (
              <tr key={scene.file_name}>
                <td>{scene.file_name}</td>
                <td>{scene.user_name}</td>
                <td>{scene.scene_name}</td>
                <td>{scene.description}</td>
                <td>{scene.category}</td>
                <td>{scene.tag}</td>
                <td align="center">
                  <NewSceneModal
                    create={false}
                    scene={scene}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    file_name={scene.file_name}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default SceneList;