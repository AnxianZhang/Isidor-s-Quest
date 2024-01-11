import React from 'react';
import { View, StyleSheet} from 'react-native';
import { getLanguage } from '../function/languageSelect';
import { useState, useEffect } from 'react';
import Header from '../component/Header';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { ScrollView } from 'react-native-web';
import Footer from '../component/Footer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
const UnityCompile = ({ language }) => {
  const [selectLanguage, setSelectLanguage] = useState(language);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    setSelectLanguage(getLanguage);
  })
  useEffect(() => {
    getData()
}, [isFocused])

  const getData = async()=>{
    try {
        const res = await fetch('http://localhost:3005/getUserPayAndConnect', {
            method: 'POST',
            credentials : "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const status = await res.status;
        const text = await res.text();
        console.log(text)
        console.log(status)
        if (status === 501){
           navigation.navigate("Home")
        }
        if (status === 502){
          navigation.navigate("Home")
       }
    }
    catch (error) {
        console.error('Erreur lors de l\'envoi des données au backend', error);
    }
}

  return (
     <ScrollView style={styles.ContainerGame}>
     <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage} inProps />
     <View style={styles.containGameBox}>
     <View style={styles.Game}>
     <iframe
        src='http://127.0.0.1:5500/'
        style={styles.gameSize}
        allowFullScreen={true}
        allow='fullscreen'
      />
    </View>
    </View>
     <Footer backColor={"#7094CB"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  ContainerGame : {
      flex : 1,
      backgroundColor: "#443955",
  },
  Game : {
    paddingTop : 25,
    paddingBottom : 25,
    height : 1000,
    width : 1000,
    borderColor : "#7094CB"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    backgroundColor: "#7094CB",
},
containGameBox : {
  justifyContent : "center",
  alignItems : "center",
},
  gameSize : {
    height : '100%',
    width : '100%'
  }
});

export default UnityCompile;