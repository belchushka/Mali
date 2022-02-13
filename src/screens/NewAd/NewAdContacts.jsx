import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {createNewAd, getUserInfo, saveUserInfo} from "../../store/actions/userActions";
import useLoading from "../../hooks/useLoading";
import SvgUri from "react-native-svg-uri";
import EmptyImage from "../../media/Icons/EmtyImageProfile.svg";
import Whataspp from "../../media/Icons/Whatsapp.svg"
import {useAlert} from "../../hooks/useAlert";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

function NewAdContacts({navigation}, props) {
    const dispatch = useDispatch()
    const type = useSelector(state => state.animal.currentAnimalTypeId)
    const dataT = useSelector(state => state.user.newAdData)
    const [userData, setUserData] = useState({})
    const {start, stop, loading} = useLoading()
    const [name, setName] = useState("")
    const [iconPath, setIconPath] = useState({})
    const [phone, setPhone] = useState("")
    const {open, close, render} = useAlert()
    const [phoneWhatsapp, setPhoneWhatsapp] = useState("")
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getUserInfo())
            setUserData(data)
            setName(data.nameUser || "")
            setPhone(data.numberPhone || "")
            setIconPath(data.iconPath || "")
            setPhoneWhatsapp(data.numberWhatsApp || "")
            stop()
        } catch (e) {

        }
    }, [dispatch])
    const goNext = useCallback(async () => {
        try {
            start()
            const formData = new FormData()
            formData.append("name", name)
            formData.append("surname", userData.surname)
            formData.append("numberPhone", phone)
            formData.append("numberWhatsApp", phoneWhatsapp)

            if (name.length !== 0 || phone.length === 0 || phoneWhatsapp.length === 0) {
                await dispatch(saveUserInfo(formData))
            } else {
                stop()
                throw "Заполните все контактные данные"
            }

            const AdFormData = new FormData()
            Object.keys(dataT).filter(el => el != "imgs").forEach(el => {
                AdFormData.append(el, dataT[el])
            })
            dataT.imgs.forEach(el => {
                AdFormData.append("imgs", el)
            })
            AdFormData.append("idAnimalCategories", type)
            const data = await dispatch(createNewAd(AdFormData))
            open("Уведомление", "Объявление отправлено на проверку")
            stop()
            navigation.navigate("home")
        } catch (e) {
            open("Ошибка", e)
        }

    }, [dispatch, type, name, userData, phone, phoneWhatsapp])
    useEffect(fetch, [fetch])
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}
                                     keyboardShouldPersistTaps="handled">
                <CustomHeader hasBackButton={true} goBackAction={navigation.goBack} title={"Как с вами связаться"}/>
                <ContentView style={{flex: 1}}>
                    <View>
                        <TextInput value={name} onChangeText={(val) => {
                            setName(val)
                        }} style={[styles.textInput, {paddingRight: 50}]} placeholder={"Ваше имя"}/>
                        <View style={{
                            position: "absolute",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            width: "100%"
                        }}>
                            {iconPath ?

                                <>
                                    <Image style={{width: 40, height: 40, borderRadius: 12000}}
                                           source={{uri: iconPath + '?' + new Date()}}/>
                                </>
                                :
                                <View style={styles.svgUriWrapper}>
                                    <SvgUri style={styles.userImage} width={40} height={40} source={EmptyImage}/>
                                </View>}
                        </View>

                    </View>

                    <TextInput value={phone} onChangeText={(val) => {
                        setPhone(val)
                    }} style={[styles.textInput]} placeholder={"Телефон"}/>
                    <View>
                        <TextInput value={phoneWhatsapp} onChangeText={(val) => {
                            setPhoneWhatsapp(val)
                        }} style={[styles.textInput, {paddingLeft: 45}]} placeholder={"Телефон Whatsapp"}/>
                        <View style={{position: "absolute", height: "100%", justifyContent: "center"}}>
                            <SvgUri style={{width: 40, height: 40, marginTop: 10}} source={Whataspp}/>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: "flex-end", marginBottom: 10}}>
                        <CustomButton loading={loading} onClick={goNext} title={"Разместить объявление"}/>
                    </View>

                </ContentView>
            </KeyboardAwareScrollView>

            {render()}
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F6F4F0",
        fontSize: 14,
        marginTop: 10
    },
    svgUriWrapper: {
        borderRadius: 10000,
        width: 40,
        height: 40,
        overflow: "hidden",
        position: "absolute", alignSelf: "flex-end", marginTop: 5
    },
})

export default NewAdContacts;