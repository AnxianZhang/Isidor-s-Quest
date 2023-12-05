import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonImage from './ButtonImage';
import { useNavigation } from '@react-navigation/native';
import LogoSae from "../assets/LogoSae.png";
import { GLOBAL_STYLES } from '../style/global';
import ButtonText from './ButtonText';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';

const Footer = ({ backColor, ...props}) => {
    const navigation = useNavigation()
    const windowWidth = useScreenWidthDimention()

    return (
        <View>
            <View style={[styles.container, { backgroundColor: backColor }]}>
                <View style={StyleSheet.compose(styles.content, { flexDirection: windowWidth <= 600 ? "column" : "row" })}>
                    <View style={{ margin: 10 }}>
                        <ButtonImage onPress={() => navigation.navigate("Home")} source={{ uri: LogoSae }} style={GLOBAL_STYLES.projectLogo} />
                    </View>
                    <View style={styles.links}>
                        <View>
                            <ButtonText onPress={() => navigation.navigate("Contact")} styleText={styles.text} text="Contact"></ButtonText>
                            <ButtonText onPress={() => navigation.navigate("APropos")} styleText={styles.text} text={props.language.Footer.aPropos}></ButtonText>
                            <ButtonText onPress={() => console.log("CGU & Mentions légales")} styleText={styles.text} text={props.language.Footer.gcu}></ButtonText>
                        </View>
                        <View>
                            <ButtonText onPress={() => console.log("Twitter")} styleText={styles.text} text="Twitter"></ButtonText>
                            <ButtonText onPress={() => console.log("Instagram")} styleText={styles.text} text="Instagram"></ButtonText>
                            <ButtonText onPress={() => console.log("Discord")} styleText={styles.text} text="Discord"></ButtonText>
                        </View>
                    </View>
                </View>
                <View style={styles.copyRight}>
                    <Text style={[styles.text, { marginVertical: 25, textAlign: "center" }]}>&copy; Isidor's Quest - 2023 -- {props.language.Footer.copyRight}.</Text>
                </View>
            </View>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: "center",
        marginVertical: 50,
        marginHorizontal: 70,
    },
    links: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: "#f1f1f1",
        marginVertical: 5,
        marginHorizontal: 15
    },
    copyRight: {
        borderTopWidth: 1,
        borderTopColor: "#4A4F56",
        alignItems: "center",
    }
})