import Iframe from 'react-iframe'
import React, { Component } from "react";

export default class SceneEditor extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
        <div>
            <Iframe url="http://localhost:8010//scene-viewer.html"
            width="1300"
            height="950"
            allow="fullscreen"
            id="myId"
            className="myClassname"
            /> 
        </div>
        
        );
        
    }
    
}
