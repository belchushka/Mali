import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CustomHeader from "../components/CustomElements/CustomHeader";
import CloseImg from "../media/Icons/Close.svg"
import * as ImagePicker from "expo-image-picker";
import EmptyImage from "../media/Icons/EmtyImageProfile.svg"
import Edit from "../media/Icons/Edit.svg"
import SvgUri from "react-native-svg-uri";
import CustomButton from "../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import useLoading from "../hooks/useLoading";
import {getUserInfo, saveUserInfo} from "../store/actions/userActions";
import LoadingView from "../components/CustomElements/LoadingView";
import {ConvertImage} from "../utils/ConvertImage";
import ContentLayout from "../components/ContentLayout";
import ContentWrapper from "../components/ContentWrapper";

function UserInfo({navigation}, props) {
    const dispatch = useDispatch()
    const [iconPath, setIconPath] = useState({})
    const {start, stop, loading} = useLoading()
    const [name,setName]=useState("")
    const [surname,setSurname]=useState("")
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState("")
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getUserInfo())
            setName(data.nameUser || "")
            setSurname(data.surname || "")
            setPhone(data.numberPhone || "")
            setEmail(data.email || "")
            setIconPath(data.iconPath || "")
            stop()
        } catch (e) {

        }
    }, [dispatch])
    const pickImage = useCallback(async ()=>{
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            navigation.navigate("userPicture")
        }else{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                noData:true,
                quality: 1,
            });
            if (!result.cancelled) {
                setIconPath(result.uri);
            }
        }
    },[])
    const saveData = useCallback(async ()=>{
        try {
            start()
            const formData = new FormData()
            formData.append("name", name)
            formData.append("surname", surname)
            formData.append("numberPhone", phone)
            formData.append("numberWhatsApp", phone)
            iconPath && formData.append("icon", ConvertImage(iconPath))

            if(name.length!==0){
                await dispatch(saveUserInfo(formData))
                    //name
                    //     surname,
                    //     numberPhone:phone,
                    //     numberWhatsApp:phone,
                    // ...(iconPath && {"icon": ConvertImage(iconPath)})
                await dispatch(getUserInfo())
                stop()
                Alert.alert("Уведомление","Данные успешно сохранены")
            }else{
                stop()
                Alert.alert("Уведомление","Имя не должно быть пустым")
            }
        }catch (e){
            stop()

            Alert.alert("Ошибочка", e)

        }
    },[iconPath, dispatch, name,surname,phone])
    useEffect(fetch, [fetch])
    return (
        <ContentLayout>
            <CustomHeader goBackAction={navigation.goBack} backIconHeight={14} style={{borderBottomWidth: 0}}
                          backIconWidth={14} backButtonImg={CloseImg} hasBackButton={true}/>
            {loading ? <LoadingView/> :
                <ContentWrapper>
                    <View style={styles.centeredImage}>
                        <TouchableOpacity style={styles.userImageWrapper} onPress={()=>{pickImage()}}>
                            {iconPath ?
                                <>
                                    <Image  style={styles.userImage} source={{uri:iconPath+'?' + new Date()}}/>
                                </>
                                :
                                <View style={styles.svgUriWrapper}>
                                    <SvgUri style={styles.userImage} width={120} height={120} source={EmptyImage}/>
                                </View>}

                            <SvgUri style={styles.editProfileImage} width={30} height={30} source={Edit}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userInfo}>
                        <View style={styles.input}>
                            <Text style={styles.inputText}>Имя</Text>
                            <TextInput onChangeText={(val)=>setName(val)} style={styles.inputField} value={name && name} placeholder={"Не указано"}/>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputText}>Фамилия</Text>
                            <TextInput onChangeText={(val)=>setSurname(val)}  style={styles.inputField} value={surname && surname} placeholder={"Не указано"}/>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputText}>E-mail</Text>
                            <TextInput editable={false} onChangeText={(val)=>setEmail(val)} style={styles.inputField} value={email && email} placeholder={"Не указано"}/>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputText}>Телефон</Text>
                            <TextInput onChangeText={(val)=>setPhone(val)} style={styles.inputField} value={phone && phone} placeholder={"Не указано"}/>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputText}>Изменить пароль</Text>
                            <TextInput style={styles.inputField} secureTextEntry={true}/>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputText}>Повторить пароль</Text>
                            <TextInput style={styles.inputField} secureTextEntry={true}/>
                        </View>
                    </View>
                    <CustomButton onClick={saveData} style={{marginTop: 30}} title={"Сохранить"}/>
                </ContentWrapper>
            }
        </ContentLayout>
    );
}

const styles = StyleSheet.create({
    userImage:{
        width:120,
        height:120,
        borderRadius:2000
    },
    userInfo: {
        marginTop: 10
    },
    input: {
        marginTop: 15
    },
    inputField: {
        paddingTop: 5,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E7E7E7",
        fontSize: 16
    },
    inputText: {
        color: "#808080",
        fontSize: 14
    },
    svgUriWrapper: {
        borderRadius: 10000,
        width: 120,
        height: 120,
        overflow: "hidden"
    },
    centeredImage: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },
    editProfileImage: {
        position: "absolute",
        bottom: 5,
        right: 5
    }

})

export default UserInfo;