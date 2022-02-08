import React, {useCallback, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import AnimalTypes from "../../components/Selects/AnimalTypes";
import {StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch} from "react-redux";

function NewAdName({navigation},props) {
    const [name,setName] = useState()
    const dispatch = useDispatch()
    const goNext = useCallback(async ()=>{
        await dispatch({
            type:"SET_NEW_AD_DATA",
            payload:{
                namePet:name
            }
        })
        navigation.navigate("newAdDescription")
    },[dispatch, name])
    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <CustomHeader hasBackButton={true} goBackAction={navigation.goBack} title={"Укажите название"} />
            <ContentView style={{flex: 1, justifyContent:"space-between"}}>
                <TextInput value={name}  onChangeText={(val)=>{setName(val)}} style={[styles.textInput]} placeholder={"Введите название"}/>
                <CustomButton style={{ bottom:20,alignSelf:"center"}} onClick={goNext} title={"Продолжить"}/>

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

export default NewAdName;