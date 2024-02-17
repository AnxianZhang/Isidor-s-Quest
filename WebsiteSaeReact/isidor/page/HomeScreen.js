import * as React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import BackgroundPicture from '../component/Background';
import Header from '../component/Header';
import { Dimensions } from 'react-native';

import Play from "../assets/Play.png";
import Previous from "../assets/previous.png";
import ButtonImage from '../component/ButtonImage';
import { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
// import BackgroundGame from "../assets/Background1.png"
import BackgroundGame from "../assets/Background.png"
// import BackgrounGameSecond from "../assets/Background3.png"
import Archer from "../assets/Archer.png"
import Guerrier from "../assets/Guerrier.png"
import PC from "../assets/pc.png"
import { getLanguage } from '../function/languageSelect';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import Footer from '../component/Footer';
import { GLOBAL_STYLES } from '../style/global';

const windowHeight = Dimensions.get('window').height;
const HomeScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [isConnect, setIsConnect] = useState("false");
    const firstItemRef = useRef(null);
    useEffect(() => {
        getData()
    }, [isFocused])

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    const NavigationGestion = async () => {
        if (isConnect == "false") {
            navigation.navigate("Connexion");
        }
        if (isConnect == "true") {
            try {
                const response = await fetch('http://localhost:3005/paiement/pay', {
                    method: 'GET',
                    credentials : "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const textResponse = await response.text();
                console.log(textResponse);
                if(textResponse === "false"){
                    navigation.navigate("PaymentCard");
                }
                else{
                    navigation.navigate("Game");
                }
            }
            catch (error) {
                console.error('Erreur lors de l\'envoi des données au backend', error);
            }
        }
    }

   
    const getData = async () => {
        const response = await fetch('http://localhost:3005/user/connect', {
            method: 'GET',
            credentials : "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const textResponse = await response.text();
        setIsConnect(textResponse);
    }

    const windowWidthByHook = useScreenWidthDimention()
    const gameTitleTextFontSizeStyle = windowWidthByHook > 1350 ? 70 : 50;
    const SecondPartContainerPaddingHorizontalStyle = windowWidthByHook > 1100 ? windowWidthByHook > 1400 ? windowWidthByHook > 1860 ? "24%" : "20%" : "15%" : 0
    const ThirdAndFourthPartContainerPaddingHorizontalStyle = windowWidthByHook > 1100 ? windowWidthByHook > 1400 ? windowWidthByHook > 1860 ? "12%" : "8%" : "5%" : 30
    const emptyBoxHeightStyle = windowWidthByHook <= 500 ? windowWidthByHook <= 425 ? 910 : 800 : 700
    const emptyBoxThirdHeightStyle = windowWidthByHook <= 650 ? 600 : 700
    const emptyBoxFourthHeightStyle = windowWidthByHook <= 650 ? 300 : 250
    const emptyBoxFinFourthHeightStyle = windowWidthByHook <= 650 ? 100 : 0
    const [gameDescriptionFontTitleSize, gameDescriptionTextFontSize] = windowWidthByHook > 750 ? windowWidthByHook > 1610 ? [40, 25] : [38, 23] : [35, 20]
    const playerImgSize = windowWidthByHook > 750 ? windowWidthByHook > 1610 ? 130 : 110 : 100
    const dispoDescripFlexDirect = windowWidthByHook <= 650 ? "column-reverse" : "row"
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} ref={firstItemRef}>
            <ScrollView>
                <BackgroundPicture source={BackgroundGame}  style={styles.image}>
                    <Header setIsConnect={setIsConnect} setLanguage={setSelectLanguage} language={selectLanguage} />
                    <View style={styles.gameTitle}>
                        <Text style={[styles.gameTitleText, { fontSize: gameTitleTextFontSizeStyle, }, GLOBAL_STYLES.pixSanRegular]}>Isidor's Quest:{"\n"}Chasing the Glow</Text>
                    </View>
                    <View style={styles.containButtonPlay}>
                        <TouchableOpacity onPress={() => NavigationGestion()}>
                            <View style={styles.buttonContent}>
                                <Image source={{ uri: Play }} style={styles.playLogo} />
                                <Text style={[styles.headerText, GLOBAL_STYLES.pixSanRegular]}>{selectLanguage.Home.buttonPlay}</Text>
                            </View>
                        </TouchableOpacity>
                        <ButtonImage onPress={() => firstItemRef.current.scrollTo({y: 1300, animated: true})} source={{ uri: Previous }} style={styles.previousLogo} />
                    </View>
                    
                    <View style={{ height: emptyBoxHeightStyle }}></View> 
                    <View style={StyleSheet.compose(styles.SecondPartContainer, { paddingHorizontal: SecondPartContainerPaddingHorizontalStyle, })}>
                        <View style={styles.GameDescriptionContainer}>
                            <Text style={[styles.gameDescriptionTitleText, { fontSize: gameDescriptionFontTitleSize }, GLOBAL_STYLES.pixSanRegular]}>{selectLanguage.Home.gameTitle}</Text>
                            <Text style={[styles.gameDescription, { fontSize: gameDescriptionTextFontSize }, GLOBAL_STYLES.pixSanRegular]}>{selectLanguage.Home.gameDescPartOne}{"\n\n"}{selectLanguage.Home.gameDescPartTwo}</Text>
                        </View>
                    </View>

                    <View style={{ height: emptyBoxThirdHeightStyle }}></View> 
                    <View style={StyleSheet.compose(styles.ThirdPartContainer, { paddingHorizontal: ThirdAndFourthPartContainerPaddingHorizontalStyle})}>
                        <View style={styles.PlayerDescriptionContainer}>
                            <Text style={[styles.playerDescriptionTitleText, { fontSize: gameDescriptionFontTitleSize }, GLOBAL_STYLES.pixSanRegular]}>{selectLanguage.Home.playerTitle}</Text>
                            
                            <View style={styles.flexrow}>
                                <Image 
                                    source={Guerrier}
                                    style = {{ width: playerImgSize, height: playerImgSize }}
                                ></Image>
                                <Text style={[styles.playerDescription, { fontSize: gameDescriptionTextFontSize }, GLOBAL_STYLES.pixSanRegular]}><Text style={{color: "#C3503C"}}>{selectLanguage.Home.typeOneGuerrier}</Text>{selectLanguage.Home.typeOneDesc}</Text>
                            </View>

                            <View style={styles.flexrow}>
                                <Image 
                                    source={Archer}
                                    style = {{ width: playerImgSize, height: playerImgSize }}
                                ></Image>
                                <Text style={[styles.playerDescription, { fontSize: gameDescriptionTextFontSize }, GLOBAL_STYLES.pixSanRegular]}><Text style={{color: "#5BD94C"}}>{selectLanguage.Home.typeTwoArcher}</Text>{selectLanguage.Home.typeTwoDescPartOne}{"\n"}{selectLanguage.Home.typeTwoDescPartTwo}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: emptyBoxFourthHeightStyle }}></View>
                    <View style={StyleSheet.compose(styles.FourthPartContainer, { paddingHorizontal: ThirdAndFourthPartContainerPaddingHorizontalStyle})}>
                        <View style={StyleSheet.compose(styles.DispoDescriptionContainer, { flexDirection: dispoDescripFlexDirect })}>
                            <View style={{flex: 0.4}}>
                                <Image source={PC}
                                style = {{ width: playerImgSize*2.5, height: playerImgSize*2.5 }}
                                ></Image>
                            </View>

                            <View style={StyleSheet.compose(styles.flexcom, { flex: 0.6})}>
                                <Text style={[styles.gameDescriptionTitleText, { fontSize: gameDescriptionFontTitleSize }, GLOBAL_STYLES.pixSanRegular]}>{selectLanguage.Home.dispoTitle}</Text>
                                <Text style={[styles.gameDescription, { fontSize: gameDescriptionTextFontSize }, GLOBAL_STYLES.pixSanRegular]}>{selectLanguage.Home.dispoDesc}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: emptyBoxFinFourthHeightStyle }}></View> 
                </BackgroundPicture> 
            <Footer backColor={"#7094CB"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
            </ScrollView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: "#7094CB",
    },
    image: {
        width: '100%',
        minHeight: 4000,
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
        color: "#FFFFFF",
        marginVertical: 10
    },
    gameDescription: {
        color: "#FFFFFF",
        marginVertical: 20
    },
    headerText: {
        fontSize: 24,
        color: "#FFFFFF",
    },
    ThirdPartContainer: {
        flex: 1,
    },
    flexrow : {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
    },
    flexcom : {
        flexDirection: "column",
        alignItems: "center"
    },
    PlayerDescriptionContainer: {
        // flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "#443955",
        paddingTop: 20,
        paddingBottom: 60,
    },
    playerDescriptionTitleText: {
        color: "#DCDCDC",
        marginVertical: 10,
        textAlign: "center"
    },
    playerDescription: {
        color: "#DCDCDC",
    },
    FourthPartContainer: {
        flex: 1,
    },
    DispoDescriptionContainer: {
        // flex: 1,
        // flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeScreen;