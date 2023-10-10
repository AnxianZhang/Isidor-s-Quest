import * as React from 'react';
import {ImageBackground } from 'react-native';

const BackgroundPicture = (props)=> {
 return(
    <ImageBackground source={props.source} resizeMode={props.resize} style={props.style}>
        {props.children}
    </ImageBackground>
 );
}

export default BackgroundPicture;