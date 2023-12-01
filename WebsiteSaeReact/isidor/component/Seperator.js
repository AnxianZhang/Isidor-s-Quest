import * as React from 'react';
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
}

const styles = StyleSheet.create({
    seperator: {
        height: 1,
        // width: 597,
        backgroundColor: "white",
        marginVertical: 1,
    },
    containSeperator: {
        alignItems: 'center',
    }
});

export default Seperator;