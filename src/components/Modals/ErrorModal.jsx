import React, {useCallback, useState} from "react";
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
import MaskInput from "react-native-mask-input/src/MaskInput";
import {useAlert} from "../../hooks/useAlert";
import {useDispatch} from "react-redux";
import {sendErrorFeedback} from "../../store/actions/userActions"

const ErrorModal = ({visible, close}) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const {open,close: closeAlert,render} = useAlert()
    const sendFeedback = useCallback(async () => {
        try {
            if (name.trim().length===0 || phone.length < 15 || description.trim().length===0){
               throw "Заполните все поля"
            }else{
                const data = await dispatch(sendErrorFeedback({
                    phoneNumber:phone,
                    name:name,
                    message:description
                }))
                open("Уведомление", "Вы успешно сообщили об ошибке", ()=>()=>{
                    close()
                })
            }
        }catch (e){
            open("Ошибка", e)
        }

    },[dispatch, name, phone, description])
    return (
        <View style={{flex: 1, justifyContent: "center"}}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    close()
                }}
            >
                <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: "rgba(0,0,0,0.38)"}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 16
                            }}>
                                <Text style={styles.modalText}>Нашли ошибку?</Text>
                                <TouchableOpacity onPress={() => {
                                    close()
                                }}>
                                    <SvgUri width={14} height={14} source={CloseIcon}/>
                                </TouchableOpacity>
                            </View>

                            <TextInput onChangeText={(val) => setName(val)} style={styles.inputs}
                                       placeholder={"Впишите ваше имя"} placeholderTextColor="grey" />
                            <MaskInput
                                value={phone && phone}
                                onChangeText={(masked, unmasked) => {
                                    setPhone(masked); // you can use the unmasked value as well
                                }}
                                placeholder={"+7 000 00 00"}
                                placeholderTextColor="#777777"
                                style={styles.inputs}
                                autoCapitalize='none'
                                mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            />
                            <TextInput placeholderTextColor="grey" multiline={true}
                                       onChangeText={(val) => setDescription(val)}
                                       numberOfLines={Platform.OS === 'ios' ? null : 6}
                                       minHeight={(Platform.OS === 'ios' && 6) ? (20 * 6) : null}
                                       style={[styles.inputs, styles.textArea]}
                                       placeholder={"Опишите проблему"} />

                            <CustomButton title={"Отправить"} onClick={() => {
                                sendFeedback()
                            }} style={{marginTop: 20}}/>
                        </View>
                    </View>
                </KeyboardAwareScrollView>

            </Modal>
            {render()}

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
        width: "85%",
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
        fontSize: 18
    },
    inputs: {
        fontSize: 14,
        backgroundColor: "rgba(245,245,245,0.4)",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        borderRadius: 5
    },
    textArea: {
        textAlignVertical: "top"
    }
});

export default ErrorModal;