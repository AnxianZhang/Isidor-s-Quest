import { Image, StyleSheet } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import IconUser from "../assets/user.png";
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { getLanguage } from '../function/languageSelect';
import { useEffect } from 'react';
import { GLOBAL_STYLES } from '../style/global';

const UserList = (props)=> {
    useEffect(()=>{
        props.setLanguage(getLanguage);
    })

    const handleDropdownSelect = (item) => {
        if (item === props.language.Header.disconnect) {
            // Handle logic for "Se connecter" when connected
            // For example, disconnect the user
            props.disconnection();
        } else if (item === props.language.Header.userProfile) {
            // Handle logic for "Profile" when connected
            // For example, navigate to the user's profile screen
            props.navigation.navigate('UserData');
        }else if (item === props.language.Header.connect) {
            // Handle logic for "Profile" when connected
            // For example, navigate to the user's profile screen
            props.navigation.navigate('Connexion');
        }

        // Close the dropdown after selection
        props.setUserOpen(false);
    };
    const windowWidthByHook = useScreenWidthDimention()
    const userStatus = props.isConnect === "true" ? props.language.Header.connected:props.language.Header.disconnected
    const userStatusRespon = windowWidthByHook <= 650 ? props.language.Header.etat: userStatus
    const colorBtnTxt = props.isConnect === "true" ? "#90EE90" : "#FDBCB4"
    return(
        <SelectDropdown
            data={props.isConnect === "true" ? [props.language.Header.userProfile, props.language.Header.disconnect] : [props.language.Header.connect]}
            onSelect={(selectedItem, index) => {
                handleDropdownSelect(selectedItem)
            }}
            dropdownStyle={styles.dropdownContainer}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={[styles.buttonTextStyle,{color: colorBtnTxt}, GLOBAL_STYLES.pixSanRegular]}
            defaultButtonText={userStatusRespon}
            buttonTextAfterSelection={() => {
                return userStatusRespon;
            }}
            renderDropdownIcon={() => {
                return <Image source={{ uri: IconUser }}  style={styles.userPicture} />;
            }}
            dropdownIconPosition={'left'}
        />
    );
}

export default UserList;

const styles = StyleSheet.create({
    buttonStyle:{
        width : '100%',
        backgroundColor: 'rgba(47, 47, 47, 0)',
    },
    dropdownContainer : {
        width : '20%',
    },
    userPicture: {
        width: 31,
        height: 31
    },
    buttonTextStyle:{
        fontSize: 24,
        // color: "white",
    }
 })