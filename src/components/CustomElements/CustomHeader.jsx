import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import SvgUri from "react-native-svg-uri";
import Back from "../../media/Icons/Back.svg"

function CustomHeader({title,hasBackButton, goBackAction, style, backButtonImg=Back, backIconWidth = 8, backIconHeight=15},props) {
    return (
        <View style={[styles.headerView, style, { justifyContent: hasBackButton ?  "space-between" : "center",}]}>
            {hasBackButton &&
                <TouchableOpacity onPress={()=>{
                    goBackAction()
                }
                } style={{width:20, height:20}}>
                    <SvgUri
                        width={backIconWidth}
                        height={backIconHeight}
                        source={backButtonImg}
                    />
                </TouchableOpacity>

            }
            <Text style={styles.headerTitle}>{title}</Text>
            {hasBackButton &&<View style={{width:20}}></View>}
        </View>
    );
}

const styles = StyleSheet.create({
    headerView:{
        flexDirection:"row",
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