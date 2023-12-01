import { StyleSheet } from "react-native";

export const GLOBAL_STYLES = StyleSheet.create({
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
    form: {
        title:{
            alignItems: "center",
            paddingTop: 15,
        },
        text:{
            color: "white",
            fontSize: 40,
            fontFamily: "ExtraBold",
        },
        fields: {
            backgroundColor: "white",
            width: 400,
            height: 55,
            borderRadius: 20,
            padding: 20,
            fontSize: 20,
            color: "#000000"
        },
        buttonContainer:{
            width: 310,
            height: 42,
            backgroundColor: "#5BD94C",
            borderRadius: 20
        },
        buttonText:{
            fontSize: 25,
            color: "#FFFFFF",
            fontFamily: "regular",
            margin: "auto",
        }
    }
})