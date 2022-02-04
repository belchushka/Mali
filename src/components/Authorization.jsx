import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ContentView from "./ContentView";
import CustomButton from "./CustomElements/CustomButton";
import SvgUri from "react-native-svg-uri";
import Seperator from "../media/Icons/Seperator.svg"
import Google from "../media/Icons/Google.svg"
import Facebook from "../media/Icons/Facebook.svg"
import Apple from "../media/Icons/Apple.svg"
import {useDispatch} from "react-redux";
import {login, register} from "../store/actions/userActions";

const styles = StyleSheet.create({
    typeSwitch: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },
    switch: {
        width: "40%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 16
    },
    activeSwitch: {
        backgroundColor: "#F6A405",
    },

    inActiveSwitch: {
        backgroundColor: "#E7E7E7"
    },
    sectionHeader: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 25
    },
    inputForm: {},
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#E7E7E7",
        height: 40,
        marginTop: 20,
        fontSize: 14
    },
    policy: {
        marginTop: 20,
        color: "#808080",
        fontSize: 12
    },

    help: {
        flexDirection: "row",
        marginTop: 30
    },

    helpText: {
        color: "#808080",
        fontSize: 12
    }

})

function Authorization({navigation},props) {
    const [authorizationType,setAuthorizationType] = useState("registration")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const dispatch = useDispatch()
    const sendData = useCallback(async()=>{
        try {
            if (authorizationType==="registration"){
                const data = await dispatch(register({
                    email:email,
                    password:password
                }))
            }else {
                const loggedIn = await dispatch(login({
                    email:email,
                    password:password
                }))
                if(loggedIn){
                    navigation.navigate("profile")
                }
            }
        }catch (e) {

        }
    }, [email,password,passwordRepeat,authorizationType])
    return (
        <ScrollView>
            <ContentView>
                <View style={styles.typeSwitch}>
                    <TouchableOpacity style={[styles.switch,authorizationType==="registration" ? styles.activeSwitch:styles.inActiveSwitch, {
                        borderBottomLeftRadius: 6,
                        borderTopLeftRadius: 6
                    }]} onPress={()=>setAuthorizationType("registration")}>
                        <Text style={{color:authorizationType==="registration" ?  "white":"black"}}>Регистрация</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.switch, authorizationType==="login" ? styles.activeSwitch:styles.inActiveSwitch, {
                        borderBottomRightRadius: 6,
                        borderTopRightRadius: 6
                    }]} onPress={()=>setAuthorizationType("login")}>
                        <Text style={{color:authorizationType==="login" ?  "white":"black"}}>Войти</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.sectionHeader, {
                    marginTop: 40
                }]}>{authorizationType === "registration" ? "Зарегистрироваться":"Войти"} через:</Text>
                <View>
                   <TouchableOpacity>
                   </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeader}>Или {authorizationType === "registration" ? "зарегистрируйтесь":"войдите"} с помощью
                    электронной почты</Text>
                <View style={styles.inputForm}>
                    <TextInput value={email} onChangeText={(val)=>setEmail(val)} style={styles.input} placeholder={"Введите e-mail"}
                               placeholderTextColor="#777777"/>
                    <TextInput value={password} onChangeText={(val)=>setPassword(val)} style={styles.input} placeholder={authorizationType === "registration" ? "Придумайте пароль": "Введите пароль"}
                               placeholderTextColor="#777777"/>
                    {authorizationType === "registration" && <TextInput value={passwordRepeat} onChangeText={(val)=>setPasswordRepeat(val)} style={styles.input} placeholder={"Повторите пароль"}
                                                                        placeholderTextColor="#777777"/>}

                </View>
                <CustomButton onClick={()=>{sendData()}} style={{marginTop: 30}} title={authorizationType === "registration" ?"Зарегистрироваться": "Войти"}/>
                <Text style={styles.policy}>Создавая личный кабинет вы соглашаетесь с нашими <Text onPress={()=>{navigation.navigate("policy")}} style={{textDecorationLine: 'underline'}}>условиями использования</Text> и <Text style={{textDecorationLine: 'underline'}}>политикой конфедициальности</Text>  </Text>
                <View style={styles.help}>
                    <Text style={styles.helpText}>Забыли пароль?</Text>
                    <SvgUri
                        style={{
                            marginLeft:10,
                            marginRight:10
                        }}
                        width={1}
                        height={16}
                        source={Seperator}
                    />
                    <Text style={styles.helpText}>Нужна помощь?</Text>
                </View>
            </ContentView>
        </ScrollView>
    );
}

export default Authorization;