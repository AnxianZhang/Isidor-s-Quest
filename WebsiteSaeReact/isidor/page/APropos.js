import React, { useState } from 'react';
import { RootTagContext, StyleSheet, Text, View } from 'react-native';
import Header from '../component/Header';
import { useNavigation } from '@react-navigation/native';


const APropos = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const navigation = useNavigation();

    return (
        <View style={styles.backColor}>
            <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage} inProps />
            {/* container */}
            <View style={styles.toCenter}>
                <Text style={styles.title}>À Propos</Text>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.paragraphTitle}>Context du projet</Text>
                        <Text>
                            Ce projet a été réalisé dans le cadre de notre troisième année en BUT informatique à l'IUT de Paris Rives de Seine.
                            Le but étant de développer une application répondant à notre projet professionnel, mais aussi personnel.
                            Nous avons donc décidé de développer un jeu avec le moteur de jeu Unity, et de mettre à disposition sur un site qui sera mise en place avec React Native et NodeJS.
                            Ces deux lots, nous permet donc d'aquérir des compétences dans deux domaines qui sont complètement différents.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backColor: {
        flex: 1,
        backgroundColor: "#7094CB",
    },

    toCenter: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "cyan",
    },

    title: {
        fontSize: 60,
    },

    paragraphTitle: {
        fontSize: 30,
    },

    content: {
        flex: 1,
        backgroundColor: "pink",
        width: "80%",
    },
})

export default APropos;