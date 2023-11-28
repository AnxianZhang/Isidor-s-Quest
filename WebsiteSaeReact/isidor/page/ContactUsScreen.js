import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLanguage } from '../function/languageSelect';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ContactUsScreen = ({language}) => {
    const [selectLanguage, setSelectLanguage] = useState(language); 
    const navigation = useNavigation();
    useEffect(()=>{
        setSelectLanguage(getLanguage);
    })
    const [disable, setDisable] = useState(true)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const [status, setStatus] = useState("Submit");
    
    const handleSubmit = async () => {
        
        try {
            const name = nameRef.current?.value;
            const email = emailRef.current?.value;
            const message = messageRef.current?.value;
            
            // useEffect(() => {
            //     if (name === "" || email === "" || message === "" || reg.test(email) === false) {
            //         setDisable(true);
            //     }
            //     else {
            //         setDisable(false);
            //     }
            // })
            
            setStatus("Sending...");
            let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ name, email, message }),
            });
            setStatus("Submit");

            let result = await response.json();
            Alert.alert(result.status);
        } catch (error) {
            console.error("ContactUsScreen Error submitting form:", error);
            setStatus("Submit");
            Alert.alert("Failed to send message");
        }
    };

    
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    return (
        <View style={styles.backcolor}>
            <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
            <View style={styles.FormContainerBlue}>
                <View>
                    <Text>Name:</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                     ref={nameRef} />
                </View>
                <View>
                    <Text>Email:</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                     ref={emailRef} />
                </View>
                <View>
                    <Text>Message:</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                     ref={messageRef} multiline={true} />
                </View>
                <TouchableOpacity onPress={handleSubmit} 
                                    disabled={disable}
                                style={[{ padding: 10, marginTop: 10 },{ backgroundColor: disable ? "#a9a9a9" : "orange" }]}>
                    <Text>{status}</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
    
}
const styles = StyleSheet.create({
backcolor : {
    flex: 1,
    backgroundColor : "#7094CB",
},
header: {
    flexDirection: 'row',
    alignItems: "center",
    paddingTop: 10,
    height: 100,
    backgroundColor : "#443955"
},
FormContainerBlue : {
    alignItems: "center",
    maxWidth : "80%",
    minWidth:"50%",
    marginHorizontal:"auto",
}
});
export default ContactUsScreen;