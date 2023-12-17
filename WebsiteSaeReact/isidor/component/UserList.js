import { Text, View, Image, StyleSheet } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import IconUser from "../assets/user.png";
import useScreenWidthDimention from '../hook/useScreenWidthDimention';

const UserList = (props)=> {
    const handleDropdownSelect = (item) => {
        if (item === 'Se deconnecter') {
            // Handle logic for "Se connecter" when connected
            // For example, disconnect the user
            props.disconnection();
        } else if (item === 'Profile') {
            // Handle logic for "Profile" when connected
            // For example, navigate to the user's profile screen
            props.navigation.navigate('UserProfile');
        }else if (item === 'Se connecter') {
            // Handle logic for "Profile" when connected
            // For example, navigate to the user's profile screen
            props.navigation.navigate('Connexion');
        }

        // Close the dropdown after selection
        props.setUserOpen(false);
    };
    const windowWidthByHook = useScreenWidthDimention()
    const userStatus = props.isConnect === "true" ? "Connected":"Disconnected"
    const userStatusRespon = windowWidthByHook <= 650 ? " ": userStatus
    return(
        <SelectDropdown
            data={props.isConnect === "true" ? ['Profile', 'Se deconnecter'] : ['Se connecter']}
            onSelect={(selectedItem, index) => {
            // changeLanguage(selectedItem);
                handleDropdownSelect(selectedItem)
            }}
            dropdownStyle={styles.dropdownContainer}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
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
        fontFamily: "regular",
        color: "white",
    }
 })