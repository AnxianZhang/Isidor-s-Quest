import { StyleSheet } from "react-native";

export const GLOBAL_STYLES = StyleSheet.create({
    backcolor: {
        flex: 1,
        backgroundColor: "#7094CB"
    },
    toCenter:{
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        paddingTop: 10,
        height: 100,
        backgroundColor: "#443955"
    },
    projectLogo: {
        width: 72,
        height: 64
    },
    container: {
        borderRadius: 50,
        backgroundColor: "#443955",
        marginVertical: 100,
        marginHorizontal: "auto",
        alignItems: 'center',
    },
    form: {
        title: {
            alignItems: "center",
            paddingTop: 15,
        },
        text: {
            color: "white",
            fontSize: 40,
            fontFamily: "ExtraBold",
            textAlign: "center",
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
        textarea: {
            backgroundColor: "white",
            width: 400,
            height: 110,
            borderRadius: 20,
            padding: 20,
            fontSize: 20,
            color: "#000000",
        },
        buttonContainer:{
            width: 310,
            height: 42,
            backgroundColor: "#5BD94C",
            borderRadius: 20
        },
        buttonText: {
            fontSize: 25,
            color: "#FFFFFF",
            fontFamily: "regular",
            margin: "auto",
        },
        notification:{
            color: "white",
            fontSize: 30,
            fontFamily: "ExtraBold",
            alignItems: "center",
            paddingTop: 40,
        },
    }
})