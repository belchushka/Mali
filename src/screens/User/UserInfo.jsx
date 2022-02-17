import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import CloseImg from "../../media/Icons/Close.svg"
import * as ImagePicker from "expo-image-picker";
import EmptyImage from "../../media/Icons/EmtyImageProfile.svg"
import Edit from "../../media/Icons/Edit.svg"
import SvgUri from "react-native-svg-uri";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import useLoading from "../../hooks/useLoading";
import {getUserInfo, saveUserInfo} from "../../store/actions/userActions";
import LoadingView from "../../components/CustomElements/LoadingView";
import {ConvertImage} from "../../utils/ConvertImage";;
import {useAlert} from "../../hooks/useAlert";
import ContentView from "../../components/ContentView";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import MaskInput from "react-native-mask-input/src/MaskInput";

function UserInfo({navigation}, props) {
    const dispatch = useDispatch()
    const [iconPath, setIconPath] = useState({})
    const [newUserIcon, setNewUserIcon] = useState(null)
    const [name,setName]=useState("")
    const [surname,setSurname]=useState("")
    const [phone,setPhone]=useState("")
    const [phoneWhatsapp,setPhoneWhatsapp]=useState("")
    const [email,setEmail]=useState("")
    const {start, stop, loading} = useLoading()
    const {open, close, render} = useAlert()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getUserInfo())
            setName(data.nameUser || "")
            setSurname(data.surname || "")
            setPhone(data.numberPhone || "")
            setPhoneWhatsapp(data.numberWhatsApp || "")
            setEmail(data.email || "")
            setIconPath(data.iconPath || "")
            stop()
        } catch (e) {
            open("Ошибка", e)
        }
    }, [dispatch])
    const pickImage = useCallback(async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            navigation.navigate("userPicture")
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                noData: true,
                quality: 1,
            });
            if (!result.cancelled) {
                setNewUserIcon(result.uri);
            }
        }
    }, [])
    const saveData = useCallback(async () => {
        try {
            start()
            const formData = new FormData()
            formData.append("name", name)
            formData.append("surname", surname)
            formData.append("numberPhone", phone)
            formData.append("numberWhatsApp", phoneWhatsapp)
            newUserIcon && formData.append("icon", ConvertImage(newUserIcon))

            if (name.length !== 0) {
                await dispatch(saveUserInfo(formData))
                await dispatch(getUserInfo())
                stop()
                open("Уведомление", "Данные успешно сохранены")
            } else {
                stop()
                open("Ошибка", "Имя не должно быть пустым")
            }
        } catch (e) {
            stop()
            open("Ошибка", e)

        }
    }, [newUserIcon, dispatch, name, surname, phone,phoneWhatsapp])
    useEffect(fetch, [fetch])
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}
                                     keyboardShouldPersistTaps="handled">
                <CustomHeader goBackAction={navigation.goBack} backIconHeight={14} style={{borderBottomWidth: 0}}
                              backIconWidth={14} backButtonImg={CloseImg} hasBackButton={true}/>
                {loading ? <LoadingView/> :
                    <ContentView style={{flex: 1}}>
                        <View style={styles.centeredImage}>
                            <TouchableOpacity style={styles.userImageWrapper} onPress={() => {
                                pickImage()
                            }}>
                                {newUserIcon ? <>
                                        <Image style={styles.userImage} source={{uri: newUserIcon}}/>
                                    </> :

                                        iconPath ?
                                            <>
                                                <Image style={styles.userImage}
                                                       source={{uri: iconPath + '?' + new Date()}}/>
                                            </>
                                            :
                                            <View style={styles.svgUriWrapper}>
                                                <SvgUri style={styles.userImage} width={120} height={120}
                                                        source={EmptyImage}/>
                                            </View>
                                    }

                                <SvgUri style={styles.editProfileImage} width={30} height={30} source={Edit}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userInfo}>
                            <View style={styles.input}>
                                <Text style={styles.inputText}>Имя</Text>
                                <TextInput onChangeText={(val) => setName(val)} style={styles.inputField}
                                           value={name && name} placeholder={"Не указано"}/>
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputText}>Фамилия</Text>
                                <TextInput onChangeText={(val) => setSurname(val)} style={styles.inputField}
                                           value={surname && surname} placeholder={"Не указано"}/>
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputText}>E-mail</Text>
                                <TextInput editable={false} onChangeText={(val) => setEmail(val)}
                                           style={styles.inputField} value={email && email} placeholder={"Не указано"}/>
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputText}>Телефон</Text>
                                <MaskInput
                                    value={phone && phone}
                                    onChangeText={(masked, unmasked) => {
                                        setPhone(masked); // you can use the unmasked value as well
                                    }}
                                    placeholder={"Не указано"}
                                    placeholderTextColor="#777777"
                                    style={styles.inputField}
                                    autoCapitalize = 'none'
                                    mask={['+',/\d/,'(', /\d/, /\d/, /\d/,')', ' ', /\d/, /\d/, /\d/,'-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputText}>Телефон Whatsapp</Text>
                                <MaskInput
                                    value={phoneWhatsapp && phoneWhatsapp}
                                    onChangeText={(masked, unmasked) => {
                                        setPhoneWhatsapp(masked); // you can use the unmasked value as well
                                    }}
                                    placeholder={"Не указано"}
                                    placeholderTextColor="#777777"
                                    style={styles.inputField}
                                    autoCapitalize = 'none'
                                    mask={['+',/\d/,'(', /\d/, /\d/, /\d/,')', ' ', /\d/, /\d/, /\d/,'-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                />
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
                        <View style={{flex: 1, justifyContent: "flex-end", marginBottom: 20}}>
                            <CustomButton onClick={saveData} title={"Сохранить"}/>
                        </View>
                    </ContentView>
                }
                {render()}
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    userImage: {
        width: 120,
        height: 120,
        borderRadius: 2000
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