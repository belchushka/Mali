import React, { useState } from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ScrollView, TouchableOpacity} from "react-native";
import CustomButton from "../CustomElements/CustomButton";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import CloseIcon from "../../media/Icons/Close.svg"
import SvgUri from "react-native-svg-uri";
const ErrorModal = ({visible, close}) => {
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
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:16}}>
                                <Text style={styles.modalText}>Нашли ошибку?</Text>
                                <TouchableOpacity onPress={()=>{
                                    close()
                                }}>
                                    <SvgUri width={14} height={14}  source={CloseIcon}/>

                                </TouchableOpacity>
                            </View>

                            <TextInput style={styles.inputs} placeholder={"Впишите ваше имя"}></TextInput>
                            <TextInput style={styles.inputs} placeholder={"+ 7 (000) 000-00-00"}></TextInput>
                            <TextInput multiline={true} numberOfLines={6} style={[styles.inputs,styles.textArea]} placeholder={"Опишите проблему"}></TextInput>
                            <CustomButton title={"Отправить"} onClick={()=>{
                                close()
                                Alert.alert("Уведомление отправлено")
                            }} style={{marginTop:20}}/>
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
        borderWidth:1
    },
    modalView: {
        margin: 20,
        width:"85%",
        backgroundColor: "white",
        borderRadius: 20,
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
        borderRadius: 20,
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
        fontSize:18
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

export default ErrorModal;