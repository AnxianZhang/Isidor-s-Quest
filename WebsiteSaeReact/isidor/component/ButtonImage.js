import * as React from 'react';
import {TouchableOpacity, Image } from 'react-native';

const ButtonImage = (props)=> {
 return(
    <TouchableOpacity onPress={props.onPress} testID='ButtonImage:Click'>
        <Image source={props.source} style={props.style} />
    </TouchableOpacity>
 );
}

export default ButtonImage;