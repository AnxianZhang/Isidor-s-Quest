import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const APropposNav = ({ targetRef }) => {
    const scrollToAnchor  = (sectionId) => {
        if (targetRef.current) {
            targetRef.current.scrollTo({ y: sectionId * 200, animated: true });
        }
    };

    return (
        <View style={styles.nav}>
            <Text style={[styles.border, styles.title]}>Table des contenus :</Text>
            <TouchableOpacity style={styles.border} onPress={() => scrollToAnchor(2)}>
                <Text style={styles.touchableColor}>Contexte du projet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.border} onPress={() => scrollToAnchor(3)}>
                <Text style={styles.touchableColor}>À quoi consiste le site promotionnel ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.border, {borderBottomColor: "#7094CB"}]} onPress={() => scrollToAnchor(10)}>
                <Text style={styles.touchableColor}>Est-ce que le site recueille les données des utilisateurs ?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    nav: {
        flex: 0.5,
        paddingVertical: 50,
        maxHeight: 300,
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