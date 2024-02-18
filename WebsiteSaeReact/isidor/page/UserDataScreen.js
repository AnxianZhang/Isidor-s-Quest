import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useState, useEffect, useRef } from 'react';
import { getLanguage } from '../function/languageSelect';
import { GLOBAL_STYLES } from '../style/global';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { useIsFocused } from '@react-navigation/native';
const UserDataScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    useEffect(() => {
        setSelectLanguage(getLanguage);
    })
    const [prenom, setPrenom] = useState('');
    const [nomFamille, setNomFamille] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [notif, setNotif] = useState('');
    const [err, setErr] = useState('')

    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isEditing) {
            getUserData();
        }
    }, [isFocused])

    const handleEditing = () => {
        if (isEditing) {
            sendDataForUpdate();
        }
        setIsEditing(!isEditing);
        setNotif('');
    };

    const handleInputChange = (input, value) => {
        switch (input) {
            case 'prenom':
                setPrenom(value);
                setNotif('');
                break;
            case 'nomFamille':
                setNomFamille(value);
                setNotif('');
                break;
            case 'pseudo':
                setPseudo(value);
                setNotif('');
                break;
            default:
                break;
        }
    };

    const getUserData = async () => {
        try {
            const response = await fetch('http://localhost:3005/getData', {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status !== 200) {
                console.error('Erreur lors de la récupération des données. Statut :', response.status);
                // Gérez le statut 502 ou tout autre statut d'erreur ici
                return;
            }
            const res = await response.text();
            const result = JSON.parse(res);
            // console.log(result);
            // console.log(result.prenom);

            setPrenom(result.prenom);
            setNomFamille(result.nomFamille);
            setPseudo(result.pseudo);
            setEmail(result.email);

            // console.log({prenom});
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    const sendDataForUpdate = async () => {
        try {
            const response = await fetch('http://localhost:3005/changeData', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    prenom: prenom,
                    nomFamille: nomFamille,
                    pseudo: pseudo,
                    email: email
                }),
            }).then(res => res.status)

            getUserData()

            switch (response) {
                case 200:
                    setErr("")
                    setNotif(selectLanguage.UserData.notifOk);
                    break;
                case 402:
                    setNotif(selectLanguage.UserData.notifPseudo);
                    break;
                case 403:
                    setNotif(selectLanguage.UserData.notifNull);
                    break;
                case 406:
                    setErr(selectLanguage.lengthErr)
                    break;
                case 408:
                    setErr(selectLanguage.forbidenCarac)
                    break;

                default:
                    setErr("pd in code")
                    break;
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setNotif(selectLanguage.UserData.notifErr);
            return;
        }
    };

    const windowWidthByHook = useScreenWidthDimention()
    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"
    const textInputWidthStyle = windowWidthByHook > 500 ? 400 : "100%"
    const buttonWidthStyle = windowWidthByHook > 500 ? 400 : "200%"
    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={styles.FormContainer}>
                <View style={StyleSheet.compose(styles.FormulaireBox, { width: formulaireBoxWidthStyle })}>
                    <View style={GLOBAL_STYLES.form.title}>
                        <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.UserData.title}</Text>
                        <Text style={{ color: "white" }}>{email}</Text>
                    </View>

                    <View style={styles.InputStyle}>
                        <TextInput
                            style={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputWidthStyle })}
                            value={prenom}
                            placeholder={selectLanguage.UserData.name}
                            onChangeText={(text) => handleInputChange('prenom', text)}
                            editable={isEditing}
                        />
                    </View>

                    <View style={styles.InputStyle}>
                        <TextInput
                            style={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputWidthStyle })}
                            value={nomFamille}
                            placeholder={selectLanguage.UserData.familyName}
                            onChangeText={(text) => handleInputChange('nomFamille', text)}
                            editable={isEditing}
                        />
                    </View>

                    <View style={styles.InputStyle}>
                        <TextInput
                            style={StyleSheet.compose(GLOBAL_STYLES.form.fields, { width: textInputWidthStyle })}
                            value={pseudo}
                            placeholder={selectLanguage.UserData.pseudo}
                            onChangeText={(text) => handleInputChange('pseudo', text)}
                            editable={isEditing}
                        />
                    </View>
                    {err.length ? <Text style={{ fontSize: 15, marginVertical: 'auto', color: '#E55839', marginVertical: 10 }}>{err}</Text> : <Text style={{ fontSize: 20, marginVertical: 5 }}> </Text>}

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            disabled={isEditing === true ? (prenom && nomFamille && pseudo ? false : true) : false}
                            onPress={handleEditing}
                            style={StyleSheet.compose(styles.ButtonEnvoyerContainer, { backgroundColor: isEditing === true ? (prenom && nomFamille && pseudo ? "#5BD94C" : "#a9a9a9") : "#E55839", width: buttonWidthStyle })}
                        >
                            <Text style={styles.EnvoyerButtonText}>{isEditing === true ? selectLanguage.UserData.btnEnv : selectLanguage.UserData.btnEdit}</Text>
                        </TouchableOpacity>
                    </View>
                    {notif && <Text style={GLOBAL_STYLES.form.notification}>{notif}</Text>}
                </View>
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </ScrollView>
    );
};

export default UserDataScreen;

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