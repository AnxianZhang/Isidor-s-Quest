import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const APropposNav = ({ children, targetRef }) => {
    const scrollToSection = (sectionId) => {
        if (targetRef.current) {
            targetRef.current.scrollTo({ y: sectionId * 200, animated: true });
        }
    };

    return (
        <View style={styles.nav}>
            <Text style={[styles.border, styles.title]}>Table des contenus :</Text>
            <TouchableOpacity style={styles.border} onPress={() => scrollToSection(0)}>
                <Text style={styles.touchableColor}>Contexte du projet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.border}>
                <Text style={styles.touchableColor}>À quoi consiste le site promotionnel ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.border, {borderBottomColor: "#7094CB"}]}>
                <Text style={styles.touchableColor}>Est-ce que le site recueille les données des utilisateurs ?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    nav: {
        flex: 0.5,
        paddingVertical: 50,
    },

    border:{
        borderWidth: 1,
        borderColor: "#7094CB",
        width: 270,
        padding: 10,
        borderBottomColor: "transparent",
    },

    title:{
        fontSize: 20,
        color: "#DCDCDC",
    },

    touchableColor: {
        color: "#EE8A45",
    },
})

export default APropposNav;