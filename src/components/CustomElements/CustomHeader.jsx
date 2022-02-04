import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import SvgUri from "react-native-svg-uri";
import Back from "../../media/Icons/Back.svg"

function CustomHeader({title,hasBackButton, goBackAction, style},props) {
    return (
        <View style={[styles.headerView, style]}>
            {hasBackButton &&
                <TouchableOpacity onPress={()=>{
                    goBackAction()
                }
                } style={{width:50}}>
                    <SvgUri
                        width={8}
                        height={15}
                        source={Back}
                    />
                </TouchableOpacity>

            }
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={{width:50}}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"white",
        paddingLeft:12,
        paddingRight:12,
        paddingTop:18,
        paddingBottom:18,
        borderBottomWidth:1,
        borderColor:"#F6F4F0"
    },

    headerTitle:{
        color:"#F6A405",
        fontSize:16
    }
})

export default CustomHeader;