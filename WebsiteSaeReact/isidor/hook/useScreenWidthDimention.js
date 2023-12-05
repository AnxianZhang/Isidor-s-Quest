import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useScreenWidthDimention = () => {
    const [screenWidth, setscreenWidth] = useState(Dimensions.get("window").width);

    useEffect(()=>{
        const updateSreenWidth = () => setscreenWidth(Dimensions.get("window").width)

        Dimensions.addEventListener('change', updateSreenWidth)

        return () => Dimensions.removeEventListener('change', updateSreenWidth)
    }, [])


    return screenWidth 
};

export default useScreenWidthDimention;