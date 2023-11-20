import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { changeLanguage } from '../function/languageSelect';
const List = (props) => {
   const countries = ["Fr", "En"]
   return (
      <SelectDropdown
         data={countries}
         onSelect={(selectedItem, index) => {
            changeLanguage(selectedItem);
         }}
         dropdownStyle={styles.dropdownContainer}
         buttonStyle={styles.buttonStyle}
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