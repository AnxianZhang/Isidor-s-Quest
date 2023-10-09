import * as React from 'react';
import { View, TextInput } from 'react-native';


const Field = (props)=> {
 return(
    <View style={props.fieldsViewStyle}>
        <TextInput style={props.TextInputStyle} placeholder={props.placeholder} onChangeText={props.onChangeText} value={props.value} secureTextEntry={props.secureTextEntry}/>
    </View>
 );
}

export default Field;