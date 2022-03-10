import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import SvgUri from "react-native-svg-uri";

function CircledIcon({style, image, width,height},props) {
    return (
        <View style={[styles.iconWrapper, style]}>
            <SvgUri width={width} height={height} source={image} />
        </View>
    );
}

const styles = StyleSheet.create({

    iconWrapper:{
        width:45,
        height:45,
        borderWidth:1,
        borderColor:"#dad8d7",
        borderRadius:1000,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
})

export default React.memo(CircledIcon) ;