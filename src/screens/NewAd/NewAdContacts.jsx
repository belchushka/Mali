import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import {Alert, Image, StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {createNewAd, getUserInfo, saveUserInfo} from "../../store/actions/userActions";
import ContentLayout from "../../components/ContentLayout";
import ContentWrapper from "../../components/ContentWrapper";
import useLoading from "../../hooks/useLoading";
import SvgUri from "react-native-svg-uri";
import EmptyImage from "../../media/Icons/EmtyImageProfile.svg";
import Whataspp from "../../media/Icons/Whatsapp.svg"
import {ConvertImage} from "../../utils/ConvertImage";

function NewAdContacts({navigation},props) {
    const dispatch = useDispatch()
    const type = useSelector(state=>state.animal.currentAnimalTypeId)
    const dataT = useSelector(state=>state.user.newAdData)
    const [userData, setUserData] = useState({})
    const {start, stop, loading} = useLoading()
    const [name,setName]=useState("")
    const [iconPath, setIconPath] = useState({})
    const [phone,setPhone]=useState("")
    const [phoneWhatsapp,setPhoneWhatsapp]=useState("")
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
    const goNext =useCallback(async ()=>{
        try {
            start()
            const formData = new FormData()
            formData.append("name", name)
            formData.append("surname", userData.surname)
            formData.append("numberPhone", phone)
            formData.append("numberWhatsApp",phoneWhatsapp )

            if(name.length!==0 || phone.length == 0 || phoneWhatsapp.length==0){
                await dispatch(saveUserInfo(formData))
            }else{
                stop()
                Alert.alert("Уведомление","Заполните все контактные данные")
            }

            const fformData = new FormData()
            Object.keys(dataT).filter(el=>el!="imgs").forEach(el=>{
                    fformData.append(el,dataT[el])
            })
            dataT.imgs.forEach(el=>{
                fformData.append("imgs",el)
            })
            fformData.append("idAnimalCategories",type)
            const data = await dispatch(createNewAd(fformData))
            Alert.alert("Объявление отправлено")
            stop()
            navigation.navigate("home")
        }catch (e) {
            Alert.alert("Ошибочка",e)
        }

    },[dispatch, type, name,userData, phone, phoneWhatsapp])
    useEffect(fetch, [fetch])
    return (
        <ContentLayout>
            <CustomHeader hasBackButton={true} goBackAction={navigation.goBack} title={"Как с вами связаться"} />
            <ContentWrapper stretchType={"bottom"} stretch={true} >
                <View>
                    <TextInput value={name}  onChangeText={(val)=>{setName(val)}} style={[styles.textInput,{paddingRight:50}]} placeholder={"Ваше имя"}/>
                    {iconPath ?
                        <>
                            <Image  style={{width:40, height:40, borderRadius:12000, position:"absolute", alignSelf:"flex-end", marginTop:5}} source={{uri:iconPath+'?' + new Date()}}/>
                        </>
                        :
                        <View style={styles.svgUriWrapper}>
                            <SvgUri style={styles.userImage} width={40} height={40} source={EmptyImage}/>
                        </View>}
                </View>

                <TextInput value={phone}  onChangeText={(val)=>{setPhone(val)}} style={[styles.textInput]} placeholder={"Телефон"}/>
                <View>
                    <TextInput value={phoneWhatsapp}  onChangeText={(val)=>{setPhoneWhatsapp(val)}} style={[styles.textInput, {paddingLeft:45}]} placeholder={"Телефон Whatsapp"}/>
                    <SvgUri  style={{width:40, height:40, position:"absolute", alignSelf:"flex-start", marginTop:8}} source={Whataspp}/>
                </View>

            </ContentWrapper>
            <View style={{paddingLeft:12,paddingRight:12}}>
                <CustomButton style={{ position:"absolute",bottom:20,alignSelf:"center"}} onClick={goNext} title={"Разместить оюъявление"}/>
            </View>
        </ContentLayout>
    );
}

const styles = StyleSheet.create({
    textInput:{
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:"#F6F4F0",
        fontSize:14,
        marginTop:10
    },
    svgUriWrapper: {
        borderRadius: 10000,
        width: 40,
        height:40,
        overflow: "hidden",
        position:"absolute", alignSelf:"flex-end", marginTop:5
    },
})

export default NewAdContacts;