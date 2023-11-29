import React, { useRef, useState } from 'react';
import { Button, RootTagContext, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../component/Header';
import { useNavigation } from '@react-navigation/native';
import APropposNav from '../component/APropposNav';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';

const APropos = ({ language }) => {
    const targetRef = useRef();
    const [selectLanguage, setSelectLanguage] = useState(language);
    const screenWidth = useScreenWidthDimention();

    const flexDirectionStyle = screenWidth <= 1024 ? "column" : "row"
    const marginStyle = screenWidth <= 1024 ? 0 : 50


    return (
        <ScrollView style={styles.backColor} ref={targetRef}>
            <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage} inProps />
            <View style={styles.toCenter}>
                {/* <View style={[styles.content, {}]}> */}
                {/* <ScrollView > */}
                <View style={[styles.content, { flexDirection: flexDirectionStyle, marginTop: marginStyle, }]}>
                    <APropposNav targetRef={targetRef}></APropposNav>
                    <View style={styles.allParagraph}>
                        <Text style={[styles.title, styles.colorText]}>À Propos</Text>
                        <View style={styles.paragraph}>
                            <Text style={[styles.paragraphTitle, styles.colorText]}>Contexte du projet</Text>
                            <Text style={styles.colorText}>
                                Ce projet a été réalisé dans le cadre de notre troisième année en BUT informatique à l'IUT de Paris Rives de Seine.
                                Le but étant de développer une application répondant à notre projet professionnel, mais aussi personnel.
                                Nous avons donc décidé de développer un jeu avec le moteur de jeu Unity, et de mettre à disposition sur un site qui sera mis en place avec React Native et NodeJS.
                                Ces deux lots, nous permet ainsi d'acquérir des compétences dans deux domaines qui sont complètement différents.
                            </Text>
                        </View>
                        <View style={styles.paragraph}>
                            <Text style={[styles.paragraphTitle, styles.colorText]}>À quoi consiste le site promotionnel ?</Text>
                            <Text style={styles.colorText}>
                                Le site est un lieu qui permet aux utilisateurs d'acheter le jeu, qui sera accessible via un navigateur. Lorsqu'ils rencontrent
                                des difficultés, celles-ci peuvent nous contacter afin solliciter de l'aide.
                            </Text>
                        </View>
                        <View style={styles.paragraph}>
                            <Text style={[styles.paragraphTitle, styles.colorText]}>Est-ce que le site recueille les données des utilisateurs ?</Text>
                            <Text style={styles.colorText}>
                                Les données entrées dans nos formulaires sont stockées dans sur nos bases de données.
                                Cela concernent le formulaire d'inscription et de contact.
                            </Text>
                        </View>
                    </View>
                </View>
                {/* </ScrollView> */}
            </View>
            {/* </View> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    colorText: {
        color: "#DCDCDC",
        // textAlign: "justify"
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        height: 100,
        backgroundColor: "#7094CB",
    },

    backColor: {
        flex: 1,
        backgroundColor: "#443955",
    },

    toCenter: {
        flex: 1,
        alignItems: "center",
    },

    title: {
        fontSize: 60,
        // marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 2.5,
        borderColor: "#7094CB",
    },

    allParagraph: {
        flex: 1,
        // flexDirection: "row",
    },

    paragraphTitle: {
        fontSize: 30,
        marginTop: 50,
    },

    paragraph: {
        //marginBottom: 50,
        // backgroundColor: "red",
    },

    content: {
        flex: 1,
        // backgroundColor: "pink",
        flexDirection: "row",
        width: "80%",
    },
})

export default APropos;