import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from '../component/Header';
import { Dimensions} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { getLanguage } from '../function/languageSelect';
import Footer from '../component/Footer';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { GLOBAL_STYLES } from '../style/global';
const windowHeight = Dimensions.get('window').height;

const ContactUsScreen = ({language}) => {
    const [selectLanguage, setSelectLanguage] = useState(language); 
    useEffect(()=>{
        setSelectLanguage(getLanguage);
    })
    const [disable, setDisable] = useState(true)
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(selectLanguage.Contact.send);

    const [notif, setNotif] = useState('');

    const [err, setErr] = useState('')
    
    useEffect(() => {
        const isValid = name && email && message
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
                credentials : "include",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ name, email, message }),
            }).then(res => res.status)
            setStatus(selectLanguage.Contact.send);

            if (response === 401) {
                setErr(selectLanguage.changePwd.notCorresponding)
                return
            }

            if (response === 408) {
                setErr(selectLanguage.forbidenCarac)
                return
            }

            if (response === 405){
                setErr(selectLanguage.unvalidEmail)
                return
            }

            if (response === 406){
                setErr(selectLanguage.lengthErr)
                return
            }

            setName('')
            setEmail('')
            setMessage('')
            setErr('')

            setNotif(selectLanguage.Contact.sendOK);
        } catch (error) {
            console.error("ContactUsScreen Error submitting form:", error);
            setStatus(selectLanguage.Contact.send);
            setNotif(selectLanguage.Contact.sendErr);
        }
    };

    const windowWidthByHook = useScreenWidthDimention()
    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"
    const textInputWidthStyle = windowWidthByHook > 500? 400 : "100%"
    const textAreaWidthStyle = windowWidthByHook > 500? 400 : "115%"
    const buttonWidthStyle = windowWidthByHook > 500? 400 : "200%"
    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
            <View style={styles.FormContainer}>
                <View style={StyleSheet.compose(styles.FormulaireBox, { width: formulaireBoxWidthStyle})}>
                    <View style={GLOBAL_STYLES.form.title}>
                        <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.Contact.title}</Text>
                    </View>
                    <View style={styles.InputStyle}>
                        <TextInput
                            style={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputWidthStyle})}
                            value={name}
                            placeholder={selectLanguage.Contact.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        />
                    </View>
                    <View style={styles.InputStyle}>
                        <TextInput
                            style={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputWidthStyle})}
                            value={email}
                            placeholder={selectLanguage.Contact.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                    </View>
                    <View style={styles.InputStyle}>
                        <TextInput
                            style={StyleSheet.compose(GLOBAL_STYLES.form.textarea, { width: textAreaWidthStyle, alignSelf: "center"})}
                            value={message}
                            placeholder={selectLanguage.Contact.message}
                            onChangeText={(text) => handleInputChange('message', text)}
                            multiline={true}
                        />
                    </View>
                    {err.length ? <Text style={{ fontSize: 15, marginVertical: 'auto', color: '#E55839', marginVertical: 10 }}>{err}</Text> : <Text style={{ fontSize: 20, marginVertical: 5 }}> </Text>}
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity 
                            onPress={handleSubmit} 
                            disabled={disable}
                            style={StyleSheet.compose(styles.ButtonEnvoyerContainer, { backgroundColor: disable ? "#a9a9a9" : "#E55839", width: buttonWidthStyle })}
                        >
                            <Text style={styles.EnvoyerButtonText}>{status}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {notif && <Text style={GLOBAL_STYLES.form.notification}>{notif}</Text>} 
                </View>
                
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </ScrollView>
    )
    
}
export default ContactUsScreen;

const styles = StyleSheet.create({
    FormContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 750,
    },
    FormulaireBox: {
        height: 600,
        borderRadius: 50,
        backgroundColor: "#443955",
        flex: .75,
        alignItems: "center"
    },
    InputStyle: {
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
        margin: "auto",
    },
    ButtonEnvoyerContainer: {
        width: 400,
        height: 42,
        borderRadius: 20,
    }
});