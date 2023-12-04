import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import Seperator from '../component/Seperator';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getLanguage } from '../function/languageSelect';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const VerificationScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const [code, setCode] = useState();
    const [confirmCode, setConfirmCode] = useState();
    const [errorCode, setErrorCode] = useState("");
    const [errorConfirmCode, setErrorConfirmCode] = useState("");
    const [disable, setDisable] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    
    let number = /^(0|[1-9][0-9]*)$/
    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    useEffect(() => {
        if (!code || !confirmCode || !number.test(code) || !number.test(confirmCode)) {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    })

    const RegisterUser = async() => {
        const data = {
            prenom: route.params.data.prenom,
            nomFamille: route.params.data.nomFamille,
            email: route.params.data.email,
            pseudo: route.params.data.pseudo,
            password: route.params.data.password
<<<<<<< Updated upstream
       }
       try {
           const response = await fetch('http://localhost:3005/inscription', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
           });
           const result = await response.status;
           if (result === 200) {
               await AsyncStorage.setItem("user", JSON.stringify({ pseudo: route.params.data.pseudo, isConnect: true }));
               navigation.navigate("Home");
           }
       }
       catch (error) {
           console.error('Erreur lors de l\'envoi des données au backend', error);
       }
=======
        }
        try {
            const response = await fetch('http://localhost:3005/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.status;
            if (result === 200) {
                navigation.navigate("Home");
            }
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
>>>>>>> Stashed changes
    }

    const sendDataToDatabase = async () => {
        if (code !== confirmCode) {
            setConfirmCode("");
            setErrorConfirmCode(selectLanguage.Code.errorCodeCaseOne);
        }
        else {
            setErrorConfirmCode("");
            const data = {
                 email : route.params.data.email,
                 code : parseInt(code)
            }
            try {
                const response = await fetch('http://localhost:3005/VerifyCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.status;
                if (result === 401) {
                    setCode("");
                    setConfirmCode("");
                    setErrorCode(selectLanguage.Code.errorExpireDate);
                    setErrorConfirmCode(selectLanguage.Code.errorExpireDate)
                }
                else {
                    setErrorCode("");
                    setErrorConfirmCode("");
                }
                if (result === 402) {
                    setCode("");
                    setConfirmCode("");
                    setErrorCode(selectLanguage.Code.errorCode);
                    setErrorConfirmCode(selectLanguage.Code.errorCode);

                }
                else {
                    setErrorCode("");
                    setErrorConfirmCode("");
                }
                if (result === 200) {
                    setErrorCode("");
                    setErrorConfirmCode("");
                    RegisterUser();
                }
            }
            catch (error) {
                console.error('Erreur lors de l\'envoi des données au backend', error);
            }       
        }
    }
    

    return (
        <View style={styles.backcolor}>
            <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={styles.FormContainer}>
                <View style={styles.FormulaireBox}>
                    <View style={styles.VerifyCodeTitle}>
                        <Text style={styles.VerifyCodeText}>{selectLanguage.Code.codeVerification}</Text>
                    </View>
                    <View style={styles.ContainField}>
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields, { borderColor: errorCode.length > 0 && "#E55839", borderWidth: errorCode.length > 0 && 1 }]} placeholder={errorCode.length > 0 ? errorCode : selectLanguage.Code.codeText} placeholderTextColor={errorCode.length ? "#E55839" : "#000000"} onChangeText={setCode} value={code} secureTextEntry={false} />
                        <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields, { borderColor: errorConfirmCode.length > 0 && "#E55839", borderWidh: errorConfirmCode.length > 0 && 1 }]} placeholder={errorConfirmCode.length > 0 ? errorConfirmCode : selectLanguage.Code.confirmCodeText} placeholderTextColor={errorConfirmCode.length ? "#E55839" : "#000000"} onChangeText={setConfirmCode} value={confirmCode} secureTextEntry={false} />
                    </View>
                    <Seperator />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => sendDataToDatabase()} disabled={disable}>
                            <View style={[styles.NewUserButtonConnectContainer, { backgroundColor: disable ? "#a9a9a9" : "#5BD94C" }]}>
                                <Text style={styles.NewUserButtonText}>{selectLanguage.Code.register}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    backcolor: {
        flex: 1,
        backgroundColor: "#7094CB"
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        paddingTop: 10,
        height: 100,
        backgroundColor: "#443955"
    },
    FormContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: windowHeight * 0.85,
    },
    FormulaireBox: {
        height: windowHeight * 0.7,
        width: windowWidth * 0.6,
        borderRadius: 50,
        backgroundColor: "#443955"
    },
    VerifyCodeTitle: {
        alignItems: "center",
        paddingTop: 15
    },
    VerifyCodeText: {
        color: "white",
        fontSize: 24,
        fontFamily: "ExtraBold"
    },
    InputStyle: {
        alignItems: "center",
        paddingTop: 40
    },
    fields: {
        backgroundColor: "white",
        width: 450,
        height: 55,
        borderRadius: 20,
        padding: 20,
        fontSize: 20,
        color: "#000000"
    },
    ContainField: {
        paddingBottom: 20,
    },
    ButtonContainer: {
        alignItems: "center",
        paddingTop: 20
    },
    NewUserButtonConnectContainer: {
        width: 310,
        height: 42,
        borderRadius: 20
    },
    NewUserButtonText: {
        fontSize: 24,
        color: "#FFFFFF",
        fontFamily: "regular",
        textAlign: "center"
    }
});

export default VerificationScreen;