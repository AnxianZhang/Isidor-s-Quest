import * as React from 'react';
import {TouchableOpacity, Text } from 'react-native';
import { GLOBAL_STYLES } from '../style/global';

const ButtonText = (props)=> {
 return(
    <TouchableOpacity onPress={props.onPress}>
        <Text style={[props.styleText, GLOBAL_STYLES.pixSanRegular]}>{props.text}</Text>
    </TouchableOpacity>
 );
}

export default ButtonText;