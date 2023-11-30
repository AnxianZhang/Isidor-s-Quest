import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState("Submit");

    const [notif, setNotif] = useState('');
    
    useEffect(() => {
        const isValid = name && email && message && reg.test(email);
        setDisable(!isValid);
    }, [name, email, message]);

    const handleInputChange = (input, value) => {
        switch (input) {
            case 'name':
                setName(value);
                setNotif('');
                break;
            case 'email':
                setEmail(value);
                setNotif('');
                break;
            case 'message':
                setMessage(value);
                setNotif('');
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        try {
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
            console.log(result.status);

            setName('');
            setEmail('');
            setMessage('');

            setNotif("Message sent successfully! / Votre message est déjà envoyé!");
            console.log("Message sent successfully! / Votre message est déjà envoyé!");
        } catch (error) {
            console.error("ContactUsScreen Error submitting form:", error);
            setStatus("Submit");
            console.log("Failed to send message");
        }
    };

    return (
        <View style={styles.backcolor}>
            <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
            <View style={styles.FormContainerBlue}>
                <View>
                    <Text>Name:</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                        value={name}
                        onChangeText={(text) => handleInputChange('name', text)}
                    />
                </View>
                <View>
                    <Text>Email:</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                        value={email}
                        onChangeText={(text) => handleInputChange('email', text)}
                    />
                </View>
                <View>
                    <Text>Message:</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                        value={message}
                        onChangeText={(text) => handleInputChange('message', text)}
                        multiline={true}
                    />
                </View>
                <TouchableOpacity 
                    onPress={handleSubmit} 
                    disabled={disable}
                    style={[{ padding: 10, marginTop: 10 },{ backgroundColor: disable ? "#a9a9a9" : "orange" }]}
                >
                    <Text>{status}</Text>
                </TouchableOpacity>
                {notif && <Text>{notif}</Text>}
            </View>
            
        </View>
    )
    
}
export default ContactUsScreen;

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