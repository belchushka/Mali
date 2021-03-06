import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert, BackHandler, Button, Platform,
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
import {useDispatch, useSelector} from "react-redux";
import {changePassword, login, register, verifyCode, verifyEmail} from "../store/actions/userActions";
import useLoading from "../hooks/useLoading";
import LoadingView from "./CustomElements/LoadingView";
import BackIconBlack from "../media/Icons/BackIconBlack.svg"
import {useAlert} from "../hooks/useAlert";
import MaskInput from "react-native-mask-input/src/MaskInput";
import * as GoogleSignIn from "expo-google-sign-in"
import * as Google from 'expo-google-app-auth';



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
    const [name,setName] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const dispatch = useDispatch()
    const {start, stop, loading} = useLoading()
    const {open,close,render} = useAlert()
    const androidClientId = "1033752769210-t2gjm84ns6v68ofvb4el8a7hc0a359m6.apps.googleusercontent.com"
    const iosClientId = "1033752769210-oe6ksm0uqai87ns8if9oujle8145jih3.apps.googleusercontent.com"
    const initAsync = async ()=>{
        try{
           await GoogleSignIn.initAsync({
               clientId:Platform.OS === "ios" ? iosClientId : androidClientId
           })
            getUser()
        }catch (e) {

        }
    }
    const getUser = async ()=>{
        try {
          const user=await GoogleSignIn.signInSilentlyAsync()
        }catch (e) {

        }
    }

    const handleGoogleSignIn = async ()=>{
        // await GoogleSignIn.askForPlayServicesAsync()
        const { type, accessToken, user } = await Google.logInAsync({
            iosClientId:iosClientId,
            androidClientId:androidClientId
        });
        console.log(user, accessToken);
        // if (type==="success"){
        //     getUser()
        // }else{
        //     alert("canceled")
        // }
    }
    useEffect(initAsync)

    const sendData = useCallback(async () => {
        start()
        try {
            if (authorizationType === "registration") {
                try {
                    if(email.trim().length === 0 || password.trim().length === 0 || phoneNumber.trim().length ===0 || name.trim().length === 0){
                        throw "?????????????????? ?????? ????????"
                    }else if(password!=passwordRepeat){
                        throw "???????????? ???? ??????????????????"
                    }else{
                        const registered = await dispatch(register({
                            email: email,
                            password: password,
                            numberPhone: phoneNumber,
                            name:name
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
                    open("???????????????? ?????????? ?????? ????????????. ???????????????????? ???????????? ???????????????? ?????? ??????.")
                }

            }
        } catch (e) {

        }
    }, [email, password, passwordRepeat, authorizationType, phoneNumber, name])

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
                            style={{color: authorizationType === "registration" ? "white" : "black"}}>??????????????????????</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.switch, authorizationType === "login" ? styles.activeSwitch : styles.inActiveSwitch, {
                            borderBottomRightRadius: 6,
                            borderTopRightRadius: 6
                        }]} onPress={() => setAuthorizationType("login")}>
                        <Text style={{color: authorizationType === "login" ? "white" : "black"}}>??????????</Text>
                    </TouchableOpacity>
                </View>
                {/*<Text style={[styles.sectionHeader, {*/}
                {/*    marginTop: 40*/}
                {/*}]}>{authorizationType === "registration" ? "????????????????????????????????????" : "??????????"} ??????????:</Text>*/}
                {/*<View>*/}
                {/*    <Button title={"Google"} onPress={handleGoogleSignIn}/>*/}
                {/*</View>*/}
                <Text
                    style={[styles.sectionHeader,{marginTop:40}]}>{authorizationType === "registration" ? "??????????????????????????????????" : "??????????????"} ??
                    ??????????????
                    ?????????????????????? ??????????</Text>
                <View style={styles.inputForm}>
                    <TextInput autoCapitalize = 'none' value={email} onChangeText={(val) => setEmail(val)} style={styles.input}
                               placeholder={"?????????????? e-mail"}
                               placeholderTextColor="#777777"/>
                    {authorizationType === "registration" && <TextInput onChangeText={(val) => setName(val)}  style={styles.input}
                                                                        placeholder={"?????????????? ???????? ??????"}
                                                                        placeholderTextColor="#777777"/> }

                    {authorizationType === "registration" &&
                        <MaskInput
                            value={phoneNumber}
                            onChangeText={(masked, unmasked) => {
                                setPhoneNumber(masked); // you can use the unmasked value as well
                            }}
                            placeholder={"?????????????? ?????????? ????????????????"}
                            placeholderTextColor="#777777"
                            style={styles.input}
                            autoCapitalize = 'none'
                            mask={['+',/\d/,'(', /\d/, /\d/, /\d/,')', ' ', /\d/, /\d/, /\d/,'-', /\d/, /\d/, '-', /\d/, /\d/]}
                        />
                    }
                    <TextInput value={password} secureTextEntry={true} textContentType="password" onChangeText={(val) => setPassword(val)} style={styles.input}
                               placeholder={authorizationType === "registration" ? "???????????????????? ????????????" : "?????????????? ????????????"}
                               placeholderTextColor="#777777"/>
                    {authorizationType === "registration" &&
                        <TextInput autoCapitalize = 'none' value={passwordRepeat} secureTextEntry={true} onChangeText={(val) => setPasswordRepeat(val)}
                                   style={styles.input} placeholder={"?????????????????? ????????????"}
                                   placeholderTextColor="#777777"/>}

                </View>
                <CustomButton onClick={() => {
                    sendData()
                }} style={{marginTop: 30}}
                              title={authorizationType === "registration" ? "????????????????????????????????????" : "??????????"}/>
                <Text style={styles.policy}>???????????????? ???????????? ?????????????? ???? ???????????????????????? ?? ???????????? <Text onPress={() => {
                    navigation.navigate("policy")
                }} style={{textDecorationLine: 'underline'}}>?????????????????? ??????????????????????????</Text> ?? <Text
                    onPress={() => {
                        navigation.navigate("policy")
                    }}
                    style={{textDecorationLine: 'underline'}}>?????????????????? ??????????????????????????????????</Text> </Text>
                <View style={styles.help}>
                    <Text style={styles.helpText} onPress={() => {
                        hideCloseButton();
                        goTo(2)
                    }}>???????????? ?????????????</Text>
                    <SvgUri
                        style={{
                            marginLeft: 10,
                            marginRight: 10
                        }}
                        width={1}
                        height={16}
                        source={Seperator}
                    />
                    <Text style={styles.helpText}>?????????? ?????????????</Text>
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
            Alert.alert("???? ?????????????? ????????????????????????????????????!")
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
                    <Text style={[styles.sectionHeader, {marginTop: 50}]}>?????????????? ??????, ?????????????? ???? ?????? ??????????????????
                        ???? ?????????????????? ??????????</Text>
                    <TextInput value={code} onChangeText={(val) => setCode(val)} style={styles.input}
                               placeholder={"?????????????? ??????"}/>
                    <CustomButton onClick={submit} style={{marginTop: 50}} title={"?????????????????????? ??????????"}/>
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
                    <Text style={[styles.sectionHeader, {marginTop: 50}]}>???????????????????????????? ????????????</Text>
                    <Text style={[styles.helpText, {marginTop: 20}]}>?????????????? ?? ???????? ?????????? ?????????????????????? ??????????. ???? ???????????????? ??????
                        ?????????????????? ???? ?????????????????????? ?????????? ?? ?????????????????????????? ???? ???????????????? ???????????? ????????????.</Text>
                    <TextInput value={code} onChangeText={(val) => setCode(val)} style={styles.input}
                               placeholder={"?????????????? email"}/>
                    <CustomButton onClick={submit} style={{marginTop: 50}} title={"?????????????????????? ??????????"}/>
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
                stop()
                open("??????????????????????","???????????? ??????????????! ?????????? ????????????", ()=>()=>{
                    showCloseButton()

                    goTo(0)
                })

            }else {
                throw "???????????? ???????????? ??????????????????!"
            }

        } catch (e) {
            stop()
            open("????????????",e)
        }
    }, [code,password,repeatPassword,userEmail])
    return (
        <>
            {loading?<LoadingView/> : <ContentView>
                <ScrollView>
                    <TouchableOpacity style={{width:20, height:20}} onPress={()=>{showCloseButton(); goTo(2)}}>
                        <SvgUri width={9} height={16} source={BackIconBlack}/>
                    </TouchableOpacity>
                    <Text style={[styles.sectionHeader, {marginTop: 50}]}>?????????????? ?????????? ????????????</Text>
                    <TextInput value={code} onChangeText={(val) => setCode(val)} style={styles.input}
                               placeholder={"?????????????? ?????? ??????????????????????????"}/>
                    <TextInput secureTextEntry={true} value={password} onChangeText={(val) => setPassword(val)} style={styles.input}
                               placeholder={"?????????????? ?????????? ????????????"}/>
                    <TextInput secureTextEntry={true} value={repeatPassword} onChangeText={(val) => setRepeatPassword(val)} style={styles.input}
                               placeholder={"?????????????????????? ?????????? ????????????"}/>
                    <CustomButton onClick={submit} style={{marginTop: 50}} title={"?????????????????????? ??????????"}/>
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
