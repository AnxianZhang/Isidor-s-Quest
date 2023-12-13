import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GLOBAL_STYLES } from '../style/global';
import Header from '../component/Header';
import { getLanguage } from '../function/languageSelect';
import Footer from '../component/Footer';

const ChangePwdSuccess = ({language}) => {
    const [selectLanguage, setSelectLanguage] = useState(language)

    useEffect(() => {
        setSelectLanguage(getLanguage)
    })

    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage}></Header>
            <View style={[GLOBAL_STYLES.toCenter, { height: 522 }]}>
                <Text style={[GLOBAL_STYLES.form.text, GLOBAL_STYLES.form.title]}>Mot de passe modifier avec succes !</Text>
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </ScrollView>
    );
};

export default ChangePwdSuccess;