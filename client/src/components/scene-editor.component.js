/**
 * Serves as the page that hosts the integrated scene toolkit.
 * Can be reached at the "/editor" link and will eventually
 * load and save the scenes.
 */

import Iframe from 'react-iframe'
import React, { Component } from "react";

export default class SceneEditor extends Component{

    render(){
        return(
        <div>
            <Iframe url="http://localhost:8010//scene-viewer.html"
            width="1300"
            height="890"
            allow="fullscreen"
            id="myId"
            className="myClassname"
            /> 
        </div>
        
        );
        
    }
    
}
