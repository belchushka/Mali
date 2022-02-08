import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import AnimalTypes from "../../components/Selects/AnimalTypes";
import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {createNewAd} from "../../store/actions/userActions";

function NewAdContacts({navigation},props) {
    const [name,setName] = useState()
    const dispatch = useDispatch()
    const type = useSelector(state=>state.animal.currentAnimalTypeId)
    const dataT = useSelector(state=>state.user.newAdData)
    const goNext =useCallback(async ()=>{
        try {
            const formData = new FormData()
            Object.keys(dataT).filter(el=>el!="imgs").forEach(el=>{
                    formData.append(el,dataT[el])
            })
            dataT.imgs.forEach(el=>{
                formData.append("imgs[]",el)
            })
            formData.append("idAnimalCategories",type)
            formData.append("idGender",1)
            formData.append("idCity",1)
            formData.append("address","test")
            formData.append("age",1)

            const data = await dispatch(createNewAd(formData))
            navigation.navigate("home")
        }catch (e) {
            Alert.alert("Ошибочка",e.message)
        }

    },[dispatch, type])
    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <CustomHeader hasBackButton={true} goBackAction={navigation.goBack} title={"Как с вами связаться"} />
            <ContentView style={{flex: 1, justifyContent:"space-between"}}>
                <TextInput value={name}  onChangeText={(val)=>{setName(val)}} style={[styles.textInput]} placeholder={"Введите описание"}/>
                <CustomButton style={{ bottom:20,alignSelf:"center"}} onClick={goNext} title={"Разместить объявление"}/>

            </ContentView>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput:{
        paddingBottom:20,
        borderBottomWidth:1,
        borderBottomColor:"#F6F4F0",
        fontSize:14,
        marginTop:20
    },
})

export default NewAdContacts;