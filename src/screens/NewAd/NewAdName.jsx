import React, {useCallback, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import {Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import CityPanel from "../../components/Panels/CityPanel";
import SexPanel from "../../components/Panels/SexPanel";
import {useAlert} from "../../hooks/useAlert";
import ContentView from "../../components/ContentView";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {setNewAdData} from "../../store/actions/animalActions";
import {createNewAd} from "../../store/actions/userActions";
import useLoading from "../../hooks/useLoading";

function NewAdName({navigation},props) {
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [age,setAge] = useState("")
    const [sex,setSex] = useState("")
    const [sexId,setSexId] = useState()
    const [address,setAddress] = useState("")
    const [price,setPrice] = useState("")
    const [cityName,setCityName] = useState("")
    const [city,setCity] = useState()
    const {open,close,render} = useAlert()
    const [cityPanelOpened,setCityPanelOpened] = useState(false)
    const [sexPanelOpened,setSexPanelOpened] = useState(false)
    const dispatch = useDispatch()
    const type = useSelector(state => state.animal.currentAnimalTypeId)
    const dataT = useSelector(state => state.user.newAdData)
    const {start, stop, loading} = useLoading()
    const goNext = useCallback(async ()=>{
        try {
            if ([name,description,price,address,age].some(el=>el.length==0) || !sexId || !city){
                throw "Заполните все поля"
            }
            await dispatch(setNewAdData({
                namePet:name,
                descriptionPet:description,
                price:price,
                idGender:sexId,
                idCity:city,
                address:address,
                age:age
            }))
            start()
            const AdFormData = new FormData()
            Object.keys(dataT).filter(el => el != "imgs").forEach(el => {
                AdFormData.append(el, dataT[el])
            })
            dataT.imgs.forEach(el => {
                AdFormData.append("imgs", el)
            })
            AdFormData.append("idAnimalCategories", type)
            const data = await dispatch(createNewAd(AdFormData))
            open("Уведомление", "Объявление отправлено на проверку", ()=>()=>{
                stop()
                navigation.navigate("home")
            })
        }catch (e){
            open("Ошибка",e)
        }
    },[dispatch, name, description, price, city,sexId,address,age, dataT,type])
    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}  keyboardShouldPersistTaps="handled">
            <CustomHeader hasBackButton={true} goBackAction={navigation.goBack} title={"Укажите данные"} />
            <ContentView style={{flexGrow:1}}>
                <TextInput value={name}  onChangeText={(val)=>{setName(val)}} style={[styles.textInput]} placeholder={"Кличка животного"}/>
                <TextInput value={age} keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}  onChangeText={(val)=>{setAge(val.replace(/[^0-9]/g, ""))}} style={[styles.textInput]} placeholder={"Возраст животного(лет)"}/>

                <TouchableOpacity onPress={() => {
                    Keyboard.dismiss()
                    setSexPanelOpened(true)
                }} style={styles.input}>

                    <Text>{sex.length === 0 ? "Выберете пол >" : sex}</Text>
                </TouchableOpacity>
                <View style={{  backgroundColor:"#F6F4F0", borderRadius:10, marginTop:10,
                    marginBottom:0}}>
                    <TextInput value={description}   numberOfLines={Platform.OS === 'ios' ? null : 6}
                               minHeight={(Platform.OS === 'ios' && 6) ? (20 * 6) : null} multiline={true} onChangeText={(val)=>{setDescription(val)}} style={[styles.textInput,styles.textArea, {borderBottomWidth: 0}]} placeholder={"Опишите питомца"}/>

                </View>
                <TextInput value={price}  keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}  onChangeText={(val)=>{setPrice(val.replace(/[^0-9]/g, ""))}} style={[styles.textInput]} placeholder={"Назначьте цену"}/>
                <TouchableOpacity onPress={() => {
                    Keyboard.dismiss()
                    setCityPanelOpened(true)
                }} style={styles.input}>
                    <Text>{cityName.length === 0 ? "Укажите город проживания >" : cityName}</Text>
                </TouchableOpacity>
                <TextInput value={address}  onChangeText={(val)=>{setAddress(val)}} style={[styles.textInput]} placeholder={"Введите адресс"}/>
                <View style={{flex:1, justifyContent:"flex-end", marginBottom:10}}>
                    <CustomButton loading={loading}  onClick={goNext} title={"Продолжить"}/>
                </View>
            </ContentView>
            <CityPanel  closePanelAction={() => {
                setCityPanelOpened(false)
            }} opened={cityPanelOpened} onSelect={ (id, name) => {
                setCity(id)
                setCityName(name)
                setCityPanelOpened(false)

            }}/>
            <SexPanel closePanelAction={() => {
                setSexPanelOpened(false)
            }} opened={sexPanelOpened} onSelect={ (id, name) => {
                setSexId(id)
                setSex(name)
                setSexPanelOpened(false)

            }}/>
                {render()}

            </KeyboardAwareScrollView>
        </View>


    );
}

const styles = StyleSheet.create({
    textInput:{
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:"#F6F4F0",
        fontSize:14,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#F6F4F0",
        paddingTop:18,
        paddingBottom:18,
        fontSize: 14,
        justifyContent: "center"
    },

    textArea:{
        textAlignVertical:"top",
        paddingRight:10,
        paddingLeft:10,
        borderTopWidth:0
    }
})

export default NewAdName;