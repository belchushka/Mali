import React from 'react';
import {View, StyleSheet, Image, Text, Button, TouchableOpacity} from "react-native";
import CustomButton from "./CustomButton";
import CircledIcon from "./CircledIcon";

function QuestionBlock({title, icon, buttonText, text, style, iconWidth, iconHeight, onButtonClick},props) {
    return (
        <View style={[styles.questionBlock,style]}>
            <CircledIcon width={iconWidth} height={iconHeight} image={icon}/>
            <Text style={styles.headerText}>{title}</Text>
            <Text style={styles.subText}>{text}</Text>
            <CustomButton onClick={onButtonClick} title={buttonText} style={{ marginTop:28}} />
        </View>
    );
}

const styles = StyleSheet.create({
    questionBlock:{
        width:"100%",
        backgroundColor:"white",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        borderRadius:20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 12,
        paddingLeft: 12,
    },

    headerText:{
        fontSize:18,
        fontWeight:"normal",
        marginTop:20,
    },

    subText:{
        color:"#B1B1B1",
        textAlign:"center",
        marginTop:24,
        fontSize:16,
        paddingRight:40,
        paddingLeft:40,
    },
})

export default QuestionBlock;