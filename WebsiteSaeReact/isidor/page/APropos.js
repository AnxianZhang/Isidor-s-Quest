import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-web';
import Header from '../component/Header';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { getLanguage } from '../function/languageSelect';
import Footer from '../component/Footer';

const APropposNav = ({ targetRef, language }) => {
    const scrollToAnchor = (sectionId) => {
        if (targetRef.current) {
            targetRef.current.scrollTo({ y: sectionId * 200, animated: true });
        }
    };

    return (
        <View style={navStyles.nav}>
            <Text style={[navStyles.border, navStyles.title]}>{language.propos.nav}</Text>
            <TouchableOpacity style={navStyles.border} onPress={() => scrollToAnchor(2)}>
                <Text style={navStyles.touchableColor}>{language.propos.contextTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={navStyles.border} onPress={() => scrollToAnchor(3)}>
                <Text style={navStyles.touchableColor}>{language.propos.consisteTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[navStyles.border, { borderBottomColor: "#7094CB" }]} onPress={() => scrollToAnchor(10)}>
                <Text style={navStyles.touchableColor}>{language.propos.getDataTitle}</Text>
            </TouchableOpacity>
        </View>
    );
};

const APropos = ({ language }) => {
    const targetRef = useRef();
    const [selectLanguage, setSelectLanguage] = useState(language);
    const screenWidth = useScreenWidthDimention();

    useEffect(() => {
        setSelectLanguage(getLanguage)
    })

    const flexDirectionStyle = screenWidth <= 1024 ? "column" : "row"
    const marginStyle = screenWidth <= 1024 ? 0 : 50

    return (
        <ScrollView style={pageStyles.backColor} ref={targetRef}>
            <Header style={pageStyles.header} setLanguage={setSelectLanguage} language={selectLanguage} inProps />
            <View style={pageStyles.toCenter}>
                <View style={[pageStyles.content, { flexDirection: flexDirectionStyle, marginTop: marginStyle, }]}>
                    <APropposNav targetRef={targetRef} language={selectLanguage}></APropposNav>
                    <View style={pageStyles.allParagraph}>
                        <Text style={[pageStyles.title, pageStyles.colorText]}>{selectLanguage.propos.title}</Text>
                        <View style={pageStyles.paragraph}>
                            <Text style={[pageStyles.paragraphTitle, pageStyles.colorText]}>{selectLanguage.propos.contextTitle}</Text>
                            <Text style={[pageStyles.colorText, pageStyles.paragraphText]}>{selectLanguage.propos.contextPara}</Text>
                        </View>
                        <View style={pageStyles.paragraph}>
                            <Text style={[pageStyles.paragraphTitle, pageStyles.colorText]}>{selectLanguage.propos.consisteTitle}</Text>
                            <Text style={[pageStyles.colorText, pageStyles.paragraphText]}>{selectLanguage.propos.consistePara}</Text>
                        </View>
                        <View style={pageStyles.paragraph}>
                            <Text style={[pageStyles.paragraphTitle, pageStyles.colorText]}>{selectLanguage.propos.getDataTitle}</Text>
                            <Text style={[pageStyles.colorText, pageStyles.paragraphText]}>{selectLanguage.propos.getDataPara}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginTop: 100}}>
                <Footer backColor={"#7094CB"}></Footer>
            </View>
        </ScrollView>
    );
};

const pageStyles = StyleSheet.create({
    colorText: {
        color: "#DCDCDC",
        // textAlign: "justify"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginVertical: 100,
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
        fontSize: 40,
        marginTop: 50,
    },

    paragraph: {
        //marginBottom: 50,
        // backgroundColor: "red",
    },

    paragraphText: {
        fontSize: 20,
    },

    content: {
        flex: 1,
        // backgroundColor: "pink",
        flexDirection: "row",
        width: "80%",
    },
})

const navStyles = StyleSheet.create({
    nav: {
        flex: 0.5,
        paddingVertical: 50,
        maxHeight: 300,
    },

    border: {
        borderWidth: 1,
        borderColor: "#7094CB",
        width: 355,
        padding: 10,
        borderBottomColor: "transparent",
    },

    title: {
        fontSize: 30,
        color: "#DCDCDC",
    },

    touchableColor: {
        fontSize: 20,
        color: "#EE8A45",
    },
})

export default APropos;