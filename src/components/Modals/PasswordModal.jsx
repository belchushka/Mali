import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform
} from "react-native";
import CustomButton from "../CustomElements/CustomButton";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import CloseIcon from "../../media/Icons/Close.svg"
import SvgUri from "react-native-svg-uri";
const PasswordModal = ({visible, close}) => {
    const [password,setPassword] = useState("")
    const [passwordRepeat,setPasswordRepeat] = useState("")
    const [passwordCode,setPasswordCode] = useState("")
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
                <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1,backgroundColor:"rgba(0,0,0,0.38)"}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:16}}>
                                <Text style={styles.modalText}>Смена пароля</Text>
                                <TouchableOpacity onPress={()=>{
                                    close()
                                }}>
                                    <SvgUri width={14} height={14}  source={CloseIcon}/>
                                </TouchableOpacity>
                            </View>

                            <TextInput value={passwordCode} onChangeText={val=>setPasswordCode(val)} style={styles.inputs} placeholder={"Код подтверждения с электронной почты"} placeholderTextColor="grey"></TextInput>

                            <CustomButton title={"Подтвердить"} onClick={()=>{
                                close(true,passwordCode)
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
    },
    modalView: {
        margin: 20,
        width:"85%",
        backgroundColor: "white",
        borderRadius: 5,
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

export default PasswordModal;