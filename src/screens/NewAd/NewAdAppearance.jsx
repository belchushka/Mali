import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import {
    Alert, Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useDispatch} from "react-redux";
import PlaceFilter from "../../components/Filters/PlaceFilter";
import CustomButton from "../../components/CustomElements/CustomButton";
import * as ImagePicker from "expo-image-picker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ConvertImage} from "../../utils/ConvertImage";
import {useAlert} from "../../hooks/useAlert";
import {setNewAdData} from "../../store/actions/animalActions";
import DeleteImage from "../../media/Icons/DeleteImage.svg"
import SvgUri from "react-native-svg-uri";
import * as FileSystem from 'expo-file-system'

export const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
}

export const isSizeOk = (fileSize)=>{
    const isOk = fileSize / 1024 / 1024 < 5
    return isOk
}


function NewAdAppearance({navigation}, props) {
    const [youtube,setYoutube] = useState("")
    const [isYoutubeLinkValid,SetIsYoutubeLinkValid] = useState(true)
    const [photos, setPhotos] = useState([])
    const [place,setPlace] = useState([])
    const {open,close,render} = useAlert()
    const CheckYoutubeLink = () => {
        if (youtube) {
            let regExp =
                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            let match = youtube.match(regExp);
            if (match && match[2].length == 11) SetIsYoutubeLinkValid(true);
            else {
                SetIsYoutubeLinkValid(false);
            }
        } else SetIsYoutubeLinkValid(youtube == "");
    }
    const selectImages =useCallback(async ()=>{
        try{
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Вы должны дать разрешение доступа к галерее!");
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
                if (!result.cancelled) {
                    const info = await getFileInfo(result.uri)
                    console.log(info.size);
                    if (isSizeOk(info.size)){
                        setPhotos((prev) => [...prev, result.uri]);
                    }else{
                        throw "Размер файла не должен привышать 5мб"
                    }
                }
            }
        }catch (e){
            open("Ошибка",e)
        }


    },[])
    const dispatch = useDispatch()
    const goNext = useCallback(async ()=>{
        try{
            if (place.length===0 || place[0]===null){
                throw "Выберете место"
            }else if(!isYoutubeLinkValid){
                throw "Неверная ссылка"
            }else if(photos.length<2){
                throw "Выберете хотя бы 2 фото"
            }else if(photos.length>5){
                throw "Количество фотографий не должно быть болше 5"
            }
            await dispatch(setNewAdData({
                imgs:photos.map(el=>ConvertImage(el)),
                ...(youtube.length!==0 && {youtubeVideo:youtube}),
                idAnimalPlace:place,
                preview:ConvertImage(photos[0])
            }))
            navigation.navigate("newAdName")
        }catch (e){
            open("Ошибка",e)
        }

    },[dispatch, photos,youtube,place,isYoutubeLinkValid])
    useEffect(CheckYoutubeLink,[youtube])
    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}  keyboardShouldPersistTaps="handled">
                <CustomHeader hasBackButton={true} title={"Внешний вид"} goBackAction={navigation.goBack}/>
                <ContentView style={{flex:1}}>
                    <PlaceFilter checkOne={true} onChange={(places)=>{
                        setPlace(places)

                    }} style={{marginTop:20}} title={"Откуда животное"}/>
                    <Text style={styles.sectionTitle}>Фотографии:</Text>
                    <View style={styles.imagesWrap}>
                        {photos.map(el=>{
                            return  <View key={el} style={styles.imageWrap}>
                                <Image style={styles.image} source={{uri:el}}/>
                                <TouchableOpacity key={el} onPress={()=>{setPhotos(state=>state.filter(el1=>el1!=el))}} style={{position:"absolute", top:5, right:5}} >
                                    <SvgUri width={18} height={18}  source={DeleteImage}/>
                                </TouchableOpacity>
                            </View>

                        })}
                    </View>
                    <CustomButton onClick={selectImages} style={{backgroundColor:"white", borderWidth:1, borderColor:"#F6A405"}} textColor={"black"} title={"Добавить фотографии"}/>
                    <Text style={styles.sectionTitle}>Видео с Ютуб:</Text>
                    <TextInput value={youtube}  onChangeText={(val)=>{setYoutube(val)}} style={[styles.textInput, !isYoutubeLinkValid &&{borderBottomColor:"red"}]} placeholder={"Ссылка на видео"}/>
                    {!isYoutubeLinkValid && <Text style={{color:"red", fontSize:12, marginTop:10}}>Неверная ссылка, попробуйте еще раз.</Text>}
                    <View style={{flex:1, justifyContent:"flex-end", marginBottom:10}}>
                        <CustomButton onClick={goNext} title={"Продолжить"}/>
                    </View>
                </ContentView>
                {render()}
            </KeyboardAwareScrollView>
        </View>
    );
}




const styles = StyleSheet.create({
    sectionTitle:{
        fontSize:16,
        marginTop:30,
        marginBottom:25
    },

    textInput:{
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:"#F6F4F0",
        fontSize:14
    },

    imagesWrap:{
        flexDirection:"row",
        flexWrap:"wrap",
        marginBottom:15,
        marginTop:-10,
        marginLeft:-3

    },
    imageWrap:{
        width:70,
        height:70,
        marginTop:10,
        marginLeft:3
    },
    image:{
        width:70,
        height:70,
        borderRadius:10
    }
})

export default NewAdAppearance;