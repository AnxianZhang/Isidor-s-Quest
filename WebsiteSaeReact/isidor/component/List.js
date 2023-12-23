import * as React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { changeLanguage } from '../function/languageSelect';
import { getLanguage } from '../function/languageSelect';
import { useEffect } from 'react';
import World from "../assets/world.png"
import Fr from "../language/fr.json";
import useScreenWidthDimention from '../hook/useScreenWidthDimention';

const List = (props) => {
// const List = ({ onSelect }) => {
   useEffect(()=>{
      props.setLanguage(getLanguage);
  })

   const countries = ["Francais", "English"]
   const langStatus = props.language==Fr?"Fr":"En"
   const windowWidthByHook = useScreenWidthDimention()
   const langStatusRespon = windowWidthByHook <= 650 ? " ": langStatus
   const iconPositionRespon = windowWidthByHook <= 650 ? 'right': 'left'
   return (
      <SelectDropdown
         data={countries}
         onSelect={(selectedItem, index) => {
            // changeLanguage(selectedItem);
            props.onSelect(selectedItem);
         }}
         dropdownStyle={styles.dropdownContainer}
         buttonStyle={styles.buttonStyle}
         buttonTextStyle={styles.buttonTextStyle}
         defaultButtonText={langStatusRespon}
         buttonTextAfterSelection={() => {
            return langStatusRespon;
        }}
         renderDropdownIcon={() => {
             return <Image source={{ uri: World }}  style={styles.worldPicture} />;
         }}
         dropdownIconPosition={iconPositionRespon}
      />
   );
}
const styles = StyleSheet.create({
   buttonStyle:{
      width : '100%',
      backgroundColor: 'rgba(47, 47, 47, 0)',
   },
   dropdownContainer : {
      width : '20%',
   },
   buttonTextStyle:{
       fontSize: 24,
       fontFamily: "regular",
       color: "white",
   },
   worldPicture: {
       width: 31,
       height: 31
   },
})
export default List;