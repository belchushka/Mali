import React, {useCallback, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch} from "react-redux";
import ContentLayout from "../../components/ContentLayout";
import ContentWrapper from "../../components/ContentWrapper";
import CityPanel from "../../components/Panels/CityPanel";
import SexPanel from "../../components/Panels/SexPanel";

function NewAdName({navigation},props) {
    const [name,setName] = useState()
    const [description,setDescription] = useState()
    const [age,setAge] = useState()
    const [sex,setSex] = useState("")
    const [sexId,setSexId] = useState()
    const [address,setAddress] = useState()
    const [price,setPrice] = useState()
    const [cityName,setCityName] = useState("")
    const [city,setCity] = useState()
    const [cityPanelOpened,setCityPanelOpened] = useState(false)
    const [sexPanelOpened,setSexPanelOpened] = useState(false)
    const dispatch = useDispatch()
    const goNext = useCallback(async ()=>{
        try {
            if ([name,description,price,address,age].some(el=>el.length==0) || !sexId || !city){
                throw "Заполнимте все поля"
            }
            await dispatch({
                type:"SET_NEW_AD_DATA",
                payload:{
                    namePet:name,
                    descriptionPet:description,
                    price:price,
                    idGender:sexId,
                    idCity:city,
                    address:address,
                    age:age
                }
            })
            navigation.navigate("newAdContacts")
        }catch (e){
            Alert.alert(e)
        }
    },[dispatch, name, description, price, city,sexId,address,age])
    return (
        <ContentLayout>
            <CustomHeader hasBackButton={true} goBackAction={navigation.goBack} title={"Укажите данные"} />
            <ContentWrapper stretchType={"bottom"} stretch={true}>
                <TextInput value={name}  onChangeText={(val)=>{setName(val)}} style={[styles.textInput]} placeholder={"Кличка животного"}/>
                <TextInput value={age}  onChangeText={(val)=>{setAge(val)}} style={[styles.textInput]} placeholder={"Возраст животного"}/>
                <TouchableOpacity onPress={() => {
                    setSexPanelOpened(true)
                }} style={styles.input}>
                    <Text>{sex.length === 0 ? "Выберете пол" : sex}</Text>
                </TouchableOpacity>
                <TextInput value={description}  onChangeText={(val)=>{setDescription(val)}} style={[styles.textInput]} placeholder={"Опишите питомца"}/>
                <TextInput value={price}  onChangeText={(val)=>{setPrice(val)}} style={[styles.textInput]} placeholder={"Назначьте цену"}/>
                <TouchableOpacity onPress={() => {
                    setCityPanelOpened(true)
                }} style={styles.input}>
                    <Text>{cityName.length === 0 ? "Укажите город проживания" : cityName}</Text>
                </TouchableOpacity>
                <TextInput value={address}  onChangeText={(val)=>{setAddress(val)}} style={[styles.textInput]} placeholder={"Введите адресс"}/>

            </ContentWrapper>
            <View style={{paddingLeft:12,paddingRight:12}}>
                <CustomButton style={{ position:"absolute",bottom:20,alignSelf:"center"}} onClick={goNext} title={"Продолжить"}/>
            </View>
            <CityPanel closePanelAction={() => {
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
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#F6F4F0",
        height: 45,
        marginTop: 10,
        paddingBottom: 10,
        fontSize: 14,
        justifyContent: "center"
    },
})

export default NewAdName;