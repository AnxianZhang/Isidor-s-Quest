import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { changeLanguage } from '../function/languageSelect';
import { getLanguage } from '../function/languageSelect';
import { useEffect } from 'react';
const List = (props) => {
// const List = ({ onSelect }) => {
   useEffect(()=>{
      props.setLanguage(getLanguage);
  })

   const countries = ["Fr", "En"]
   return (
      <SelectDropdown
         data={countries}
         onSelect={(selectedItem, index) => {
            // changeLanguage(selectedItem);
            props.onSelect(selectedItem);
         }}
         dropdownStyle={styles.dropdownContainer}
         buttonStyle={styles.buttonStyle}
         defaultButtonText={props.language.Header.buttonLanguage}
      />
   );
}
const styles = StyleSheet.create({
   buttonStyle:{
      width : '100%',
   },
   dropdownContainer : {
      width : '20%',
   }
})
export default List;