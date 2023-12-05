import * as React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BackgroundPicture from '../component/Background';
import Header from '../component/Header';
import {Dimensions} from 'react-native';
=======
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import BackgroundPicture from '../component/Background';
import Header from '../component/Header';
import { Dimensions } from 'react-native';
>>>>>>> main
import Play from "../assets/Play.png";
import Previous from "../assets/previous.png";
import ButtonImage from '../component/ButtonImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
<<<<<<< HEAD
import { ScrollView } from 'react-native-web';
import BackgroundGame from "../assets/Background1.png"
import BackgrounGameSecond from "../assets/Background3.png"
import { getLanguage } from '../function/languageSelect';

const windowHeight = Dimensions.get('window').height;
const HomeScreen = ({language})=>{
    const [selectLanguage, setSelectLanguage] = useState(language); 
=======
import BackgroundGame from "../assets/Background1.png"
import BackgrounGameSecond from "../assets/Background3.png"
import { getLanguage } from '../function/languageSelect';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Footer from '../component/Footer';

const windowHeight = Dimensions.get('window').height;
const HomeScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
>>>>>>> main
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [isConnect, setIsConnect] = useState(false);
    const firstItemRef = useRef(null);
<<<<<<< HEAD
    useEffect(()=>{
        getData()
    },[isFocused])

    useEffect(()=>{
        setSelectLanguage(getLanguage);
    })

    const Payer = async ()=>{
        try {
            const response = await fetch('http://localhost:3005/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.status;
            const TextResponse = await response.text();
            window.location = JSON.parse(TextResponse).forwardLink;
        }
        catch (error){

        }
    }


    const getData = async ()=>{
        const response = await AsyncStorage.getItem("user");
        const responseJSON = JSON.parse(response);
        if(responseJSON !== null){
=======
    useEffect(() => {
        getData()
    }, [isFocused])

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const getData = async () => {
        const response = await AsyncStorage.getItem("user");
        const responseJSON = JSON.parse(response);
        if (responseJSON !== null) {
>>>>>>> main
            setIsConnect(responseJSON.isConnect);
        }
        console.log("connexion : " + isConnect);
    }
<<<<<<< HEAD
    return(
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <BackgroundPicture source={BackgroundGame} resize="cover" style={styles.image}>
            <ScrollView>
            <Header setIsConnect={setIsConnect} setLanguage={setSelectLanguage} language={selectLanguage}/>
            <View style={styles.gameTitle}>
                <Text style={styles.gameTitleText}>Isidor's Quest:</Text>
                <Text style={styles.gameTitleText}>Chasing the Glow</Text>
            </View>
            <View style={styles.containButtonPlay}>
                <TouchableOpacity onPress={() => {isConnect ? navigation.navigate("Game") : navigation.navigate("Connexion")}}>
                    <View style={styles.buttonContent}>
                        <Image source={{ uri: Play }} style={styles.playLogo} />
                            <Text style={styles.headerText}>{selectLanguage.Home.buttonPlay}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Payer()}>
                    <View style={styles.buttonContent}>
                        <Image source={{ uri: Play }} style={styles.playLogo} />
                            <Text style={styles.headerText}>test</Text>
                    </View>
                </TouchableOpacity>
                <ButtonImage onPress={() => firstItemRef.current.scrollIntoView()} source={{ uri: Previous }} style={styles.previousLogo} />
            </View>
            <View style={styles.SecondPartContainer}>
            <View style={styles.GameDescriptionContainer} ref={firstItemRef}>
                <Text style={styles.gameDescriptionTitleText}>{selectLanguage.Home.gameTitle}</Text>
                <Text style={styles.gameDescriptionFirstPartText}>{selectLanguage.Home.gameDescPartOne}</Text>
                <Text style={styles.gameDescriptionSecondPartText}>{selectLanguage.Home.gameDescPartTwo}</Text>
            </View>
            </View>
            </ScrollView>
        </BackgroundPicture>
        <BackgroundPicture source={BackgrounGameSecond} resize="cover" style={styles.image}>


        </BackgroundPicture>
=======

    const windowWidthByHook = useScreenWidthDimention()
    const gameTitleTextFontSizeStyle = windowWidthByHook > 1350 ? 70 : 50;
    const SecondPartContainerPaddingHorizontalStyle = windowWidthByHook > 1100 ? windowWidthByHook > 1400 ? windowWidthByHook > 1860 ? "24%" : "20%" : "15%" : 0
    const emptyBoxHeightStyle = windowWidthByHook <= 650 ? 600 : 670
    const [gameDescriptionFontTitleSize, gameDescriptionTextFontSize] = windowWidthByHook > 750 ? windowWidthByHook > 1610 ? [45, 30] : [40, 25] : [35, 20]

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} ref={firstItemRef}>
            <BackgroundPicture source={BackgroundGame}  style={styles.image}>
                <ScrollView>
                    <Header setIsConnect={setIsConnect} setLanguage={setSelectLanguage} language={selectLanguage} />
                    <View style={styles.gameTitle}>
                        <Text style={StyleSheet.compose(styles.gameTitleText, { fontSize: gameTitleTextFontSizeStyle, })}>Isidor's Quest:{"\n"}Chasing the Glow</Text>
                    </View>
                    <View style={styles.containButtonPlay}>
                        <TouchableOpacity onPress={() => { isConnect ? navigation.navigate("Game") : navigation.navigate("Connexion") }}>
                            <View style={styles.buttonContent}>
                                <Image source={{ uri: Play }} style={styles.playLogo} />
                                <Text style={styles.headerText}>{selectLanguage.Home.buttonPlay}</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => navigation.navigate("PaymentCard")}>
                            <View style={styles.buttonContent}>
                                <Image source={{ uri: Play }} style={styles.playLogo} />
                                <Text style={styles.headerText}>test</Text>
                            </View>
                        </TouchableOpacity> */}
                        <ButtonImage onPress={() => firstItemRef.current.scrollTo({y: 1300, animated: true})} source={{ uri: Previous }} style={styles.previousLogo} />
                    </View>
                    <View style={StyleSheet.compose(styles.SecondPartContainer, { paddingHorizontal: SecondPartContainerPaddingHorizontalStyle, })}>
                        <View style={{ height: emptyBoxHeightStyle }}></View> {/* empty box */}
                        <View style={styles.GameDescriptionContainer}>
                            <Text style={StyleSheet.compose(styles.gameDescriptionTitleText, { fontSize: gameDescriptionFontTitleSize })}>{selectLanguage.Home.gameTitle}</Text>
                            <Text style={StyleSheet.compose(styles.gameDescription, { fontSize: gameDescriptionTextFontSize })}>{selectLanguage.Home.gameDescPartOne}{"\n\n"}{selectLanguage.Home.gameDescPartTwo}</Text>
                        </View>
                    </View>
                </ScrollView>
            </BackgroundPicture>
            <Footer backColor={"#7094CB"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
            {/* <BackgroundPicture source={BackgrounGameSecond} resize="cover" style={styles.image}></BackgroundPicture> */}
>>>>>>> main
        </ScrollView>
    )
}
const styles = StyleSheet.create({
<<<<<<< HEAD
scrollView: {
    flex: 1,
},
scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#7094CB"
},
image : {
    width: '100%', 
    minHeight: 1800,
},
gameTitle : {
    flexDirection: 'column',
    alignItems: "flex-end",
    justifyContent : "center",
    paddingRight: 40,
    height: windowHeight*0.75,
},
gameTitleText:{
    fontSize: 70,
    fontFamily:"Regular",
    color: "white",
},
buttonContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor : "#EE8A45",
    paddingTop : 5,
    paddingBottom : 5,
    paddingRight : 30,
    paddingLeft : 30,
    borderRadius : 10
},
playLogo: {
    width: 25,
    height: 33,
    marginRight : 20
},
containButtonPlay: {
    alignItems: "center",
    justifyContent : "center",
    height: windowHeight*0.10,
},
previousLogo: {
    width: 25,
    height: 33,
},
GameDescriptionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
    paddingTop : '40%',
    marginLeft : '20%'
  },
gameDescriptionTitleText:{
    fontSize : 32,
    fontFamily : "Bold",
    color : "#FFFFFF"
},
SecondPartContainer: {
    flex: 1,
    paddingHorizontal: "3%",
},
gameDescriptionFirstPartText:{
    paddingTop : 20,
    paddingBottom : 20,
    fontSize : 19, 
    fontFamily : "Light", 
    color : "white",
    textAlign : "left",
    paddingRight : 200,
    paddingLeft : 200
},
gameDescriptionSecondPartText:{
    fontSize : 19, 
    fontFamily : "Light", 
    color : "white",
    paddingRight : 200,
    textAlign : "left",
    paddingLeft : 200,
},
headerText: {
    fontSize: 24,
    fontFamily: "regular",
    color: "white",
},
=======
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: "#7094CB"
    },
    image: {
        width: '100%',
        minHeight: 2090,
    },
    gameTitle: {
        flexDirection: 'column',
        alignItems: "flex-end",
        justifyContent: "center",
        marginHorizontal: 50,
        height: 575,
        marginVertical: 20
    },
    gameTitleText: {
        fontFamily: "Regular",
        color: "white",
        textAlign: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EE8A45",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 10
    },
    playLogo: {
        width: 25,
        height: 33,
        marginRight: 20
    },
    containButtonPlay: {
        marginTop: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    previousLogo: {
        width: 25,
        height: 33,
    },
    GameDescriptionContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        marginHorizontal: 30,
    },
    SecondPartContainer: {
        flex: 1,
    },
    gameDescriptionTitleText: {
        fontFamily: "Bold",
        color: "#FFFFFF",
        marginVertical: 10
    },
    gameDescription: {
        fontFamily: "Light",
        color: "white",
        marginVertical: 20
    },
    headerText: {
        fontSize: 24,
        fontFamily: "regular",
        color: "white",
    },
>>>>>>> main
});

export default HomeScreen;