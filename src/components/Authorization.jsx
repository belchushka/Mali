import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert, BackHandler,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import ContentView from "./ContentView";
import CustomButton from "./CustomElements/CustomButton";
import SvgUri from "react-native-svg-uri";
import Seperator from "../media/Icons/Seperator.svg"
import Google from "../media/Icons/Google.svg"
import Facebook from "../media/Icons/Facebook.svg"
import Apple from "../media/Icons/Apple.svg"
import {useDispatch, useSelector} from "react-redux";
import {changePassword, login, register, verifyCode, verifyEmail} from "../store/actions/userActions";
import useLoading from "../hooks/useLoading";
import LoadingView from "./CustomElements/LoadingView";
import BackIconBlack from "../media/Icons/BackIconBlack.svg"
import {useAlert} from "../hooks/useAlert";


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

function Auth({navigation, hideCloseButton, goTo}, props) {
    const [authorizationType, setAuthorizationType] = useState("registration")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const dispatch = useDispatch()
    const {start, stop, loading} = useLoading()
    const {open,close,render} = useAlert()
    const sendData = useCallback(async () => {
        start()
        try {
            if (authorizationType === "registration") {
                try {
                    if(email.trim().length == 0 || password.trim().length === 0 || phoneNumber.trim().length ===0){
                        throw "Заполните все поля"
                    }else if(password!=passwordRepeat){
                        throw "Пароли не совпадают"
                    }else{
                        const registered = await dispatch(register({
                            email: email,
                            password: password,
                            numberPhone: phoneNumber
                        }))

                        if (registered) {
                            dispatch({
                                type: "SET_USER_EMAIL_AND_PASSWORD",
                                payload: {
                                    email: email,
                                    password: password
                                }
                            })
                            stop()
                            goTo(1)
                            hideCloseButton()
                        }
                    }
                } catch (e) {
                    stop()
                    open(e)
                }


            } else {
                try {
                    const loggedIn = await dispatch(login({
                        email: email,
                        password: password
                    }))
                    if (loggedIn) {
                        stop()
                        navigation.navigate("profile")
                    }
                } catch (e) {
                    stop()
                    open("Неверный логин или пароль. Попробуйте ввести" +
                        "значения еще раз.")
                }

            }
        } catch (e) {

        }
    }, [email, password, passwordRepeat, authorizationType, phoneNumber])

    return (
        <ContentView>
            {loading ? <LoadingView/> :   <ScrollView>
                <View style={styles.typeSwitch}>
                    <TouchableOpacity
                        style={[styles.switch, authorizationType === "registration" ? styles.activeSwitch : styles.inActiveSwitch, {
                            borderBottomLeftRadius: 6,
                            borderTopLeftRadius: 6
                        }]} onPress={() => setAuthorizationType("registration")}>
                        <Text
                            style={{color: authorizationType === "registration" ? "white" : "black"}}>Регистрация</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.switch, authorizationType === "login" ? styles.activeSwitch : styles.inActiveSwitch, {
                            borderBottomRightRadius: 6,
                            borderTopRightRadius: 6
                        }]} onPress={() => setAuthorizationType("login")}>
                        <Text style={{color: authorizationType === "login" ? "white" : "black"}}>Войти</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.sectionHeader, {
                    marginTop: 40
                }]}>{authorizationType === "registration" ? "Зарегистрироваться" : "Войти"} через:</Text>
                <View>
                    <TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <Text
                    style={styles.sectionHeader}>Или {authorizationType === "registration" ? "зарегистрируйтесь" : "войдите"} с
                    помощью
                    электронной почты</Text>
                <View style={styles.inputForm}>
                    <TextInput value={email} onChangeText={(val) => setEmail(val)} style={styles.input}
                               placeholder={"Введите e-mail"}
                               placeholderTextColor="#777777"/>

                    {authorizationType === "registration" &&
                        <TextInput value={phoneNumber} onChangeText={(val) => setPhoneNumber(val)} style={styles.input}
                                   placeholder={"Введите номер телефона"}
                                   placeholderTextColor="#777777"/>}
                    <TextInput value={password} secureTextEntry={true} textContentType="password" onChangeText={(val) => setPassword(val)} style={styles.input}
                               placeholder={authorizationType === "registration" ? "Придумайте пароль" : "Введите пароль"}
                               placeholderTextColor="#777777"/>
                    {authorizationType === "registration" &&
                        <TextInput value={passwordRepeat} secureTextEntry={true} onChangeText={(val) => setPasswordRepeat(val)}
                                   style={styles.input} placeholder={"Повторите пароль"}
                                   placeholderTextColor="#777777"/>}

                </View>
                <CustomButton onClick={() => {
                    sendData()
                }} style={{marginTop: 30}}
                              title={authorizationType === "registration" ? "Зарегистрироваться" : "Войти"}/>
                <Text style={styles.policy}>Создавая личный кабинет вы соглашаетесь с нашими <Text onPress={() => {
                    navigation.navigate("policy")
                }} style={{textDecorationLine: 'underline'}}>условиями использования</Text> и <Text
                    style={{textDecorationLine: 'underline'}}>политикой конфедициальности</Text> </Text>
                <View style={styles.help}>
                    <Text style={styles.helpText} onPress={() => {
                        hideCloseButton();
                        goTo(2)
                    }}>Забыли пароль?</Text>
                    <SvgUri
                        style={{
                            marginLeft: 10,
                            marginRight: 10
                        }}
                        width={1}
                        height={16}
                        source={Seperator}
                    />
                    <Text style={styles.helpText}>Нужна помощь?</Text>
                </View>
                {render()}
            </ScrollView>}

        </ContentView>
    );
}

const EmailVerification = ({navigation, showCloseButton,goTo}) => {
    const userEmail = useSelector(state => state.user.email)
    const dispatch = useDispatch()
    const [code, setCode] = useState("")
    const {start, stop, loading} = useLoading()
    const {open,close,render} = useAlert()
    const submit = useCallback(async () => {
        try {
            start()
            const data = await dispatch(verifyEmail({
                email: userEmail,
                verificationCode: code
            }))
            Alert.alert("Вы успешно зарегистрировались!")
            stop()
            navigation.navigate("profile")
        } catch (e) {
            stop()
            open(e)
        }

    }, [code])
    return (
        <>
            {loading ? <LoadingView/> :   <ContentView>
                <ScrollView>
                    <TouchableOpacity style={{width:20, height:20}} onPress={()=>{showCloseButton(); goTo(0)}}>
                        <SvgUri width={9} height={16} source={BackIconBlack}/>
                    </TouchableOpacity>
                    <Text style={[styles.sectionHeader, {marginTop: 50}]}>Введите код, который мы вам отправили
                        на указанную почту</Text>
                    <TextInput value={code} onChangeText={(val) => setCode(val)} style={styles.input}
                               placeholder={"Введите код"}/>
                    <CustomButton onClick={submit} style={{marginTop: 50}} title={"Подтвердить адрес"}/>
                </ScrollView>
                {render()}
            </ContentView>}
        </>

    )
}

const PasswordResetEmail = ({goTo,showCloseButton}) => {
    const dispatch = useDispatch()
    const [code, setCode] = useState("")
    const {start, stop, loading} = useLoading()
    const {open,close,render} = useAlert()

    const submit = useCallback(async () => {
        try {
            start()
            const data = await dispatch(verifyCode({
                email: code
            }))
            dispatch({
                type: 'SET_USER_EMAIL_AND_PASSWORD',
                payload: {
                    email: code,
                    password: ""
                }
            })
            stop()
            goTo(3)
        } catch (e) {
            stop()
            open(e)
        }
    }, [code])
    return (
        <>
            {loading ? <LoadingView/> : <ContentView>
                <ScrollView>
                    <TouchableOpacity style={{width:20, height:20}} onPress={()=>{showCloseButton(); goTo(0)}}>
                        <SvgUri width={9} height={16} source={BackIconBlack}/>
                    </TouchableOpacity>
                    <Text style={[styles.sectionHeader, {marginTop: 50}]}>Восстановление пароля</Text>
                    <Text style={[styles.helpText, {marginTop: 20}]}>Введите в поле адрес электронной почты. Мы отправим вам
                        сообщение по электронной почте с инструкциеями по созданию нового пароля.</Text>
                    <TextInput value={code} onChangeText={(val) => setCode(val)} style={styles.input}
                               placeholder={"Введите email"}/>
                    <CustomButton onClick={submit} style={{marginTop: 50}} title={"Подтвердить адрес"}/>
                </ScrollView>
                {render()}
            </ContentView>}
        </>


    )
}

const PasswordChange = ({goTo, showCloseButton}) => {
    const dispatch = useDispatch()
    const userEmail = useSelector(state => state.user.email)
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const {start, stop, loading} = useLoading()
    const {open,close,render} = useAlert()

    const submit = useCallback(async () => {
        try {
            start()
            if (password.trim().length!==0 && password===repeatPassword  ){
                const data = await dispatch(changePassword({
                    email: userEmail,
                    password: password,
                    verificationCode: code
                }))
                await Alert.alert("Пароль сменили! Давай войдем")
                showCloseButton()
                stop()
                goTo(0)
            }else {
                throw "Пароли должны совпадать!"
            }

        } catch (e) {
            stop()
            open(e)
        }
    }, [code,password,repeatPassword])
    return (
        <>
            {loading?<LoadingView/> : <ContentView>
                <ScrollView>
                    <TouchableOpacity style={{width:20, height:20}} onPress={()=>{showCloseButton(); goTo(2)}}>
                        <SvgUri width={9} height={16} source={BackIconBlack}/>
                    </TouchableOpacity>
                    <Text style={[styles.sectionHeader, {marginTop: 50}]}>Введите новый пароль</Text>
                    <TextInput value={code} onChangeText={(val) => setCode(val)} style={styles.input}
                               placeholder={"Введите код подтверждения"}/>
                    <TextInput secureTextEntry={true} value={password} onChangeText={(val) => setPassword(val)} style={styles.input}
                               placeholder={"Введите новый пароль"}/>
                    <TextInput secureTextEntry={true} value={repeatPassword} onChangeText={(val) => setRepeatPassword(val)} style={styles.input}
                               placeholder={"Подтвердите новый пароль"}/>
                    <CustomButton onClick={submit} style={{marginTop: 50}} title={"Подтвердить адрес"}/>
                </ScrollView>
                {render()}
            </ContentView> }
        </>

    )
}


const Authorization = ({closeAction, hideCloseButton, showCloseButton, navigation}) => {
    const [active, setActive] = useState(0);
    const increase = useCallback(() => {
        setActive(active + 1)
    }, [active])
    const decrease = useCallback(() => {
        setActive(active - 1)
    }, [active])
    const goTo = useCallback((id) => {
        setActive(id)
    }, [active])
    useEffect(() => {
        const backAction = () => {
            if (active === 0) {
                closeAction()
                return true
            } else if (active === 1) {
                decrease()
                showCloseButton()
                return true
            } else if (active === 2) {
                goTo(0)
                showCloseButton()
                return true
            } else if (active === 3) {
                decrease()
                showCloseButton()
                return true
            }

            return false
        }
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
    }, [active])
    return <>
        {active==0 && <Auth goTo={goTo} hideCloseButton={hideCloseButton} navigation={navigation}/> }
        {active==1 && <EmailVerification navigation={navigation} showCloseButton={showCloseButton} goTo={goTo}/>}
        {active==2 &&  <PasswordResetEmail showCloseButton={showCloseButton} goTo={goTo} />}
        {active==3 &&   <PasswordChange goTo={goTo} showCloseButton={showCloseButton} />}
    </>
}

export default Authorization;