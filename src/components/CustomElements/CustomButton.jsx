import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";

function CustomButton({style, title, onClick, loading=false, textColor="white"},props) {
    return (
        <TouchableOpacity  onPress={()=>{ !loading && onClick()}} style={[styles.button, style]}>
            {loading ? <ActivityIndicator size={"small"} color={"white"} />:<Text style={[styles.buttonText,{color:textColor}]}>
                {title}
            </Text>}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        width:"100%",
        paddingTop:16,
        paddingBottom:16,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#F6A405",
        borderRadius:10,
    },

    buttonText: {
        fontSize:16
    }
})
export default CustomButton;