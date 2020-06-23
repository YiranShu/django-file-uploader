/**
 * Serves as the page that hosts the integrated scene toolkit.
 * Can be reached at the "/toolkit" link and will eventually
 * load and save the scenes.
 */

import Iframe from 'react-iframe'
import React, { Component } from "react";
import SceneDataService from "../services/scene.service";
import IComCom from 'icomcom-react';

export default class SceneToolkit extends Component{
    constructor(props) {
        super(props);        
        this.getScene = this.getScene.bind(this);
        this.updateScene = this.updateScene.bind(this);   
        this.state = {
          currentScene: {
            file_name: "test",
            user: "test",
            scene_name: "",
            description: "",
            category: "",
            tag: "",
            dataset: "",
            json: ""
          },
        };
    }

    getScene(_id) {
        console.log("id: "+_id)
        SceneDataService.get(_id)
          .then(response => {
            console.log(response.data);
            this.setState({
                currentScene: response.data
            });
          })
          .catch(e => {
            console.log("fail to getScene!");
            console.log(e);
          });
    }

    updateScene() {
        SceneDataService.update(
          this.state.currentScene._id,
          this.state.currentScene
        )
          .then(response => {
            console.log("update successfully!")
            console.log(response.data);
          })
          .catch(e => {
            console.log("fail to update!")
            console.log(e);
          });
    }

    onChangeJson(data) {      
      this.setState(prevState => ({
          currentScene: {
          ...prevState.currentScene,
          json: data
        }
      }));
    }

    onReceiveMessage(data) {
      console.log("received! :" + data.data);
      this.onChangeJson(data.data);
      console.log("ChangeJson Successfully!");
      this.updateScene();
      
    }
      
    componentDidMount() {
        console.log("scene-toolkit.component is mounted")
        this.getScene(this.props.match.params._id);
    }
    
    render(){
        return(
        <div>
            {/* <Iframe url="http://localhost:8010//scene-viewer.html"
            width="100%"
            height="715"
            allow="fullscreen"
            scrolling="yes"
            />  */}
            <IComCom
                attributes={{
                    src: "http://localhost:8010//scene-viewer.html",
                    width: "100%",
                    height: "715",
                    allow: "fullscreen",
                    scrolling: "yes"
                }}
                handleReceiveMessage={(data) => this.onReceiveMessage(data)}
                postMessageData = {this.state.currentScene.json}
                handleReady={() => 
                    console.log("ready")
                }
                />
        </div>
        ); 
    } 
}
