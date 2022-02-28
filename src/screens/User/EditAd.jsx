import React, {useCallback, useState} from 'react';
import {Platform, StyleSheet, TextInput, View} from "react-native";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ContentView from "../../components/ContentView";
import CustomButton from "../../components/CustomElements/CustomButton";
import useLoading from "../../hooks/useLoading";
import {useDispatch} from "react-redux";
import {useAlert} from "../../hooks/useAlert";
import {saveAnimalEdit} from "../../store/actions/animalActions";

function EditAd({navigation,route},props) {
    const idAd = route?.params.idAd
    const dispatch = useDispatch()
    const [name,setName] = useState(route?.params?.name || "")
    const [description,setDescription] = useState(route?.params?.description || "")
    const [age,setAge] = useState(route?.params?.age.toString() || "")
    const [price, setPrice] = useState(route?.params?.price.toString() || "")
    const {start, stop, loading} = useLoading()
    const {open,close,render} = useAlert()
    const  saveData = useCallback(async ()=>{
        try{
            start()
            if ([name,description,price,age].some(el=>el.length==0) || !idAd){
                throw "Заполните все поля"
            }
            const data = await dispatch(saveAnimalEdit({
                idAd:idAd,
                namePet:name,
                descriptionPet:description,
                price:price,
                age:age
            }))
            open("Уведомление", "Объявление успешно отредактированно", () => () => {
                navigation.goBack()
            })
        }catch (e) {
            open("Ошибка",e)
            stop()
        }
    },[dispatch, idAd, name,description,price, age])
    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}  keyboardShouldPersistTaps="handled">
                <CustomHeader hasBackButton={true} goBackAction={navigation.goBack} title={"Редактирование"} />
                <ContentView style={{flexGrow:1}}>
                    <TextInput value={name}  onChangeText={(val)=>{setName(val)}} style={[styles.textInput]} placeholder={"Кличка животного"}/>
                    <TextInput value={age} keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}  onChangeText={(val)=>{setAge(val.replace(/[^0-9]/g, ""))}} style={[styles.textInput]} placeholder={"Возраст животного(лет)"}/>
                    <View style={{  backgroundColor:"#F6F4F0", borderRadius:10, marginTop:10,
                        marginBottom:0}}>
                        <TextInput value={description}   numberOfLines={Platform.OS === 'ios' ? null : 6}
                                   minHeight={(Platform.OS === 'ios' && 6) ? (20 * 6) : null} multiline={true} onChangeText={(val)=>{setDescription(val)}} style={[styles.textInput,styles.textArea, {borderBottomWidth: 0}]} placeholder={"Опишите питомца"}/>

                    </View>
                    <TextInput value={price}  keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}  onChangeText={(val)=>{setPrice(val.replace(/[^0-9]/g, ""))}} style={[styles.textInput]} placeholder={"Назначьте цену"}/>
                    <View style={{flex:1, justifyContent:"flex-end", marginBottom:10}}>
                        <CustomButton loading={loading} onClick={saveData}  title={"Сохранить"}/>
                    </View>
                </ContentView>
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

export default EditAd;