import * as React from 'react';
import {View, StyleSheet } from 'react-native';

const Seperator = (props)=> {
 return(
    <View style={styles.containSeperator}>
        <View style={styles.seperator} />
    </View>
 );
}

const styles = StyleSheet.create({
    seperator: {
        height: 1,
        width : 597,
        backgroundColor: "white",
        marginVertical: 1,
      },
    containSeperator : {
        alignItems : 'center',
    }
    });

export default Seperator;