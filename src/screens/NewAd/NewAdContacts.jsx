import React, {useCallback, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import AnimalTypes from "../../components/Selects/AnimalTypes";
import {StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {createNewAd} from "../../store/actions/userActions";
import {ConvertImage} from "../../utils/ConvertImage";

function NewAdContacts({navigation},props) {
    const [name,setName] = useState()
    const dispatch = useDispatch()
    const images = useSelector(state=>state.user.newAdPhotos)
    const youtube = useSelector(state=>state.user.newAdLink)
    const place = useSelector(state=>state.user.newAdPlace)
    const breed = useSelector(state=>state.user.newAdBreed)
    const nameAnimal = useSelector(state=>state.user.newAdName)
    const description = useSelector(state=>state.user.newAdDescription)
    const price = useSelector(state=>state.user.newAdPrice)
    const type = useSelector(state=>state.animal.currentAnimalTypeId)
    const goNext = useCallback(async ()=>{
        const data = dispatch(createNewAd({
            preview: ConvertImage(images[0]),
            imgs:JSON.stringify(images.map(el=>ConvertImage(el))),
            idAnimalCategories:type,
            idAnimalBreed:breed,
            idAnimalPlace:place[0],
            idGender:1,
            idCity:1,
            namePet:nameAnimal,
            price:price,
            address:"sidji",
            age:22,
            youtubeVideo:youtube,
            descriptionPet:description,

    }))
        navigation.navigate("home")
    },[dispatch, nameAnimal, youtube,images,place,breed,description,price,type])
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