import Iframe from 'react-iframe'
import React, { Component } from "react";

export default class SceneEditor extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
        <div>
            <Iframe url="http://aspis.cmpt.sfu.ca/scene-toolkit/scene-viewer.html?extra"
            
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
