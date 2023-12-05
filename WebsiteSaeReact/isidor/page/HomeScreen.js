import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import BackgroundPicture from '../component/Background';
import Header from '../component/Header';
import { Dimensions } from 'react-native';
import Play from "../assets/Play.png";
import Previous from "../assets/previous.png";
import ButtonImage from '../component/ButtonImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const windowHeight = Dimensions.get('window').height;
const HomeScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [isConnect, setIsConnect] = useState(false);
    const firstItemRef = useRef(null);
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
            setIsConnect(responseJSON.isConnect);
        }
        console.log("connexion : " + isConnect);
    }

    const windowWidthByHook = useScreenWidthDimention()
    const gameTitleTextFontSizeStyle = windowWidthByHook > 1350 ? 70 : 50;
    const SecondPartContainerPaddingHorizontalStyle = windowWidthByHook > 1100 ? windowWidthByHook > 1400 ? windowWidthByHook > 1860 ? "24%" : "20%" : "15%" : 0
    const ThirdAndFourthPartContainerPaddingHorizontalStyle = windowWidthByHook > 1100 ? windowWidthByHook > 1400 ? windowWidthByHook > 1860 ? "12%" : "8%" : "5%" : 30
    const emptyBoxHeightStyle = windowWidthByHook <= 650 ? 700 : 800
    const emptyBoxThirdHeightStyle = windowWidthByHook <= 650 ? 600 : 700
    const emptyBoxFourthHeightStyle = windowWidthByHook <= 650 ? 350 : 600
    const [gameDescriptionFontTitleSize, gameDescriptionTextFontSize] = windowWidthByHook > 750 ? windowWidthByHook > 1610 ? [45, 30] : [40, 25] : [35, 20]
    const playerImgSize = windowWidthByHook > 750 ? windowWidthByHook > 1610 ? 130 : 110 : 100
    const dispoDescripFlexDirect = windowWidthByHook <= 650 ? "column-reverse" : "row"
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} ref={firstItemRef}>
            <ScrollView>
                <BackgroundPicture source={BackgroundGame}  style={styles.image}>
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
                    
                    <View style={{ height: emptyBoxHeightStyle }}></View> {/* empty box */}
                    <View style={StyleSheet.compose(styles.SecondPartContainer, { paddingHorizontal: SecondPartContainerPaddingHorizontalStyle, })}>
                        <View style={styles.GameDescriptionContainer}>
                            <Text style={StyleSheet.compose(styles.gameDescriptionTitleText, { fontSize: gameDescriptionFontTitleSize })}>{selectLanguage.Home.gameTitle}</Text>
                            <Text style={StyleSheet.compose(styles.gameDescription, { fontSize: gameDescriptionTextFontSize })}>{selectLanguage.Home.gameDescPartOne}{"\n\n"}{selectLanguage.Home.gameDescPartTwo}</Text>
                        </View>
                    </View>

                    <View style={{ height: emptyBoxThirdHeightStyle }}></View> {/* empty box */}
                    <View style={StyleSheet.compose(styles.ThirdPartContainer, { paddingHorizontal: ThirdAndFourthPartContainerPaddingHorizontalStyle})}>
                        <View style={styles.PlayerDescriptionContainer}>
                            <Text style={StyleSheet.compose(styles.playerDescriptionTitleText, { fontSize: gameDescriptionFontTitleSize })}>{selectLanguage.Home.playerTitle}</Text>
                            
                            <View style={styles.flexrow}>
                                <Image 
                                    source={Guerrier}
                                    style = {{ width: playerImgSize, height: playerImgSize }}
                                ></Image>
                                <Text style={StyleSheet.compose(styles.playerDescription, { fontSize: gameDescriptionTextFontSize })}><span style={{color: "#C3503C"}}>{selectLanguage.Home.typeOneGuerrier}</span>{selectLanguage.Home.typeOneDesc}</Text>
                            </View>

                            <View style={styles.flexrow}>
                                <Image 
                                    source={Archer}
                                    style = {{ width: playerImgSize, height: playerImgSize }}
                                ></Image>
                                <Text style={StyleSheet.compose(styles.playerDescription, { fontSize: gameDescriptionTextFontSize })}><span style={{color: "#5BD94C"}}>{selectLanguage.Home.typeTwoArcher}</span>{selectLanguage.Home.typeTwoDescPartOne}{"\n"}{selectLanguage.Home.typeTwoDescPartTwo}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: emptyBoxFourthHeightStyle }}></View> {/* empty box */}
                    <View style={StyleSheet.compose(styles.FourthPartContainer, { paddingHorizontal: ThirdAndFourthPartContainerPaddingHorizontalStyle})}>
                        <View style={StyleSheet.compose(styles.DispoDescriptionContainer, { flexDirection: dispoDescripFlexDirect })}>
                            <View style={{flex: 0.4}}>
                                <Image source={PC}
                                style = {{ width: playerImgSize*2.5, height: playerImgSize*2.5 }}
                                ></Image>
                            </View>

                            <View style={StyleSheet.compose(styles.flexcom, { flex: 0.6})}>
                                <Text style={StyleSheet.compose(styles.gameDescriptionTitleText, { fontSize: gameDescriptionFontTitleSize })}>{selectLanguage.Home.dispoTitle}</Text>
                                <Text style={StyleSheet.compose(styles.gameDescription, { fontSize: gameDescriptionTextFontSize })}>{selectLanguage.Home.dispoDesc}</Text>
                            </View>
                        </View>
                    </View>
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
    ThirdPartContainer: {
        flex: 1,
    },
    flexrow : {
        flexDirection: "row",
        alignItems: "center"
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
        fontFamily: "Bold",
        color: "#FFFFFF",
        marginVertical: 10,
        textAlign: "center"
    },
    playerDescription: {
        fontFamily: "Light",
        color: "black",
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