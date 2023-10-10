import * as React from 'react';
import {TouchableOpacity, Text } from 'react-native';

const ButtonText = (props)=> {
 return(
    <TouchableOpacity onPress={props.onPress}>
        <Text style={props.styleText}>{props.text}</Text>
    </TouchableOpacity>
 );
}

export default ButtonText;