import React, { useState } from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ScrollView, TouchableOpacity} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
const AlertModal = ({visible, close, text, title, callback}) => {
    return (
        <View style={{flex:1, justifyContent:"center", position:"absolute"}}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    close()
                }}
            >
                <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1,backgroundColor:"rgba(0,0,0,0.38)"}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                                <Text style={styles.modalText}>{title}</Text>
                                <Text style={{fontSize:14, color:"#808080", marginTop:10}}>{text}</Text>
                            <TouchableOpacity onPress={()=>{
                                callback && callback()
                                close()
                            }} style={{marginTop:10, alignSelf:"flex-end", width:30, height:30}}>
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
        width:"90%",
        backgroundColor: "white",
        borderRadius: 5,
        paddingTop: 25,
        paddingBottom: 14,
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