import * as React from 'react';
<<<<<<< HEAD
import {View, StyleSheet } from 'react-native';

const Seperator = (props)=> {
 return(
    <View style={styles.containSeperator}>
        <View style={styles.seperator} />
    </View>
 );
=======
import { View, StyleSheet } from 'react-native';
import useScreenWidthDimention from '../hook/useScreenWidthDimention';

const Seperator = (props) => {
    const windowWidth = useScreenWidthDimention()
    // const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"

    const seperatorWidthStyle = windowWidth > 750 ? windowWidth > 1300 ? 600 : 400 : 200 ;

    return (
        <View style={styles.containSeperator}>
            <View style={StyleSheet.compose(styles.seperator, {width: seperatorWidthStyle})} />
        </View>
    );
>>>>>>> main
}

const styles = StyleSheet.create({
    seperator: {
        height: 1,
<<<<<<< HEAD
        width : 597,
        backgroundColor: "white",
        marginVertical: 1,
      },
    containSeperator : {
        alignItems : 'center',
    }
    });
=======
        // width: 597,
        backgroundColor: "white",
        marginVertical: 1,
    },
    containSeperator: {
        alignItems: 'center',
    }
});
>>>>>>> main

export default Seperator;