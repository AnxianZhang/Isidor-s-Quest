import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../component/Header';
import { Dimensions} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { getLanguage } from '../function/languageSelect';
import Footer from '../component/Footer';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { GLOBAL_STYLES } from '../style/global';
const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

const ContactUsScreen = ({language}) => {
    const [selectLanguage, setSelectLanguage] = useState(language); 
    useEffect(()=>{
        setSelectLanguage(getLanguage);
    })
    const [disable, setDisable] = useState(true)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(selectLanguage.Contact.send);

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
            setStatus(selectLanguage.Contact.sending);
            let response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ name, email, message }),
            });
            setStatus(selectLanguage.Contact.send);

            let result = await response.json();
            console.log(result.status);

            setName('');
            setEmail('');
            setMessage('');

            setNotif(selectLanguage.Contact.sendOK);
        } catch (error) {
            console.error("ContactUsScreen Error submitting form:", error);
            setStatus(selectLanguage.Contact.send);
            setNotif(selectLanguage.Contact.sendErr);
        }
    };

    const windowWidthByHook = useScreenWidthDimention()
    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"

    return (
        <View style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
            <View style={styles.FormContainer}>
                <View style={StyleSheet.compose(styles.FormulaireBox, { width: formulaireBoxWidthStyle})}>
                    <View style={styles.InputStyle}>
                        <TextInput
                            style={GLOBAL_STYLES.form.fields}
                            value={name}
                            placeholder={selectLanguage.Contact.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        />
                    </View>
                    <View style={styles.InputStyle}>
                        <TextInput
                            style={GLOBAL_STYLES.form.fields}
                            value={email}
                            placeholder={selectLanguage.Contact.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                    </View>
                    <View style={styles.InputStyle}>
                        <TextInput
                            style={GLOBAL_STYLES.form.textarea}
                            value={message}
                            placeholder={selectLanguage.Contact.message}
                            onChangeText={(text) => handleInputChange('message', text)}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity 
                            onPress={handleSubmit} 
                            disabled={disable}
                            style={StyleSheet.compose(styles.ButtonEnvoyerContainer, { backgroundColor: disable ? "#a9a9a9" : "#E55839" })}
                        >
                            <Text style={styles.EnvoyerButtonText}>{status}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {notif && <Text style={GLOBAL_STYLES.form.notification}>{notif}</Text>} 
                </View>
                
            </View>
            <View>
                <Footer backColor="#443955"></Footer>
            </View>
        </View>
    )
    
}
export default ContactUsScreen;

const styles = StyleSheet.create({
    FormContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: windowHeight * 0.85,
    },
    FormulaireBox: {
        height: windowHeight * 0.7,
        // width : windowWidth * 0.6, // <=========================
        borderRadius: 50,
        backgroundColor: "#443955",
        flex: .75,
        alignItems: "center"
    },
    InputStyle: {
        // alignItems : "center",
        paddingTop: 40
    },
    ButtonContainer: {
        alignItems: "center",
        paddingTop: 40,
    },
    EnvoyerButtonText: {
        fontSize: 25,
        color: "#FFFFFF",
        fontFamily: "Light",
        // height: "100%",
        // textAlign : "center",
        margin: "auto",
    },
    ButtonEnvoyerContainer: {
        width: 400,
        height: 42,
        borderRadius: 20,
    }
});