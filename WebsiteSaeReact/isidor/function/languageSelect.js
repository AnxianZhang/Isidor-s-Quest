import * as React from 'react';
import { View, TextInput } from 'react-native';
import { useState } from 'react';
import Fr from "../language/fr.json";
import En from "../language/en.json"

var language = Fr;
const changeLanguage = (lang)=> {
    if(lang === "Fr"){
        language = Fr;
    }
    if(lang === "En"){
       language = En;
    }
    console.log(language);
}

const getLanguage = ()=>{
    return language;
}

export {
    changeLanguage,
    getLanguage
};