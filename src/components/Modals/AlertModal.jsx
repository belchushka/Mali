import React, { useState } from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ScrollView, TouchableOpacity} from "react-native";
import CustomButton from "../CustomElements/CustomButton";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import CloseIcon from "../../media/Icons/Close.svg"
import SvgUri from "react-native-svg-uri";
const AlertModal = ({visible, close, text}) => {
    return (
        <View style={{flex:1, justifyContent:"center"}}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    close()
                }}
            >
                <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                                <Text style={styles.modalText}>Ошибка</Text>
                                <Text style={{fontSize:14, color:"#808080", marginTop:10}}>{text}</Text>
                            <TouchableOpacity onPress={close} style={{marginTop:10, alignSelf:"flex-end"}}>
                                <Text style={{color:"#F6A405", fontSize:16}}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>

            </Modal>


        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        width:"85%",
        backgroundColor: "white",
        borderRadius: 10,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize:18,
        fontWeight:"bold"
    },
    inputs:{
        fontSize:14,
        backgroundColor:"rgba(245,245,245,0.4)",
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:10,
        paddingRight:10,
        marginTop:10,
        borderRadius:5
    },
    textArea:{
        textAlignVertical:"top"
    }
});

export default AlertModal;