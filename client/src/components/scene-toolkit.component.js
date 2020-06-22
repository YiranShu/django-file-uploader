/**
 * Serves as the page that hosts the integrated scene toolkit.
 * Can be reached at the "/toolkit" link and will eventually
 * load and save the scenes.
 */

import Iframe from 'react-iframe'
import React, { Component } from "react";

export default class SceneToolkit extends Component{

    render(){
        return(
        <div>
            <Iframe url="http://localhost:8010//scene-viewer.html"
            width="100%"
            height="715"
            allow="fullscreen"
            scrolling="yes"
            /> 
        </div>
        
        );
        
    }
    
}
