import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import PlaceFilter from "../../components/Filters/PlaceFilter";
import CustomButton from "../../components/CustomElements/CustomButton";
import * as ImagePicker from "expo-image-picker";
import Cat from "../../media/Animals/Cat.png"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {setCurrentAnimalTypeIdAndName} from "../../store/actions/animalActions";
import {ConvertImage} from "../../utils/ConvertImage";


function NewAdAppiarance({navigation},props) {
    const [youtube,setYoutube] = useState("")
    const [isYoutubeLinkValid,SetIsYoutubeLinkValid] = useState(true)
    const [photos, setPhotos] = useState([])
    const [places,setPlaces] = useState([])
    console.log(photos);
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
    };
    const selectImages =useCallback(async ()=>{
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
                setPhotos((prev) => [...prev, result.uri]);
            }
        }

    },[])
    const dispatch = useDispatch()
    const goNext = useCallback(async ()=>{
        await dispatch({
            type:"SET_NEW_AD_DATA",
            payload:{
                imgs:photos.map(el=>ConvertImage(el)),
                youtubeVideo:youtube,
                idAnimalPlace:places[0],
                preview:ConvertImages(photos[0])
            }
        })
        navigation.navigate("newAdName")
    },[dispatch, photos,youtube,places])
    useEffect(CheckYoutubeLink,[youtube])
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <KeyboardAwareScrollView >
                <CustomHeader hasBackButton={true} title={"Внешний вид"} goBackAction={navigation.goBack}/>
                <ContentView style={{flex: 1, height:Dimensions.get("window").height*0.92}}>
                    <PlaceFilter onChange={(places)=>{
                        setPlaces(places)
                    }} style={{marginTop:20}} title={"Откуда животное"}/>
                    <Text style={styles.sectionTitle}>Фотографии:</Text>
                    <View style={styles.imagesWrap}>
                        {photos.map(el=>{
                            return  <TouchableOpacity onPress={()=>{setPhotos(state=>state.filter(el1=>el1!=el))}} style={styles.imageWrap}>
                                <Image style={styles.image} source={{uri:el}}/>

                            </TouchableOpacity>
                        })}
                    </View>
                    <CustomButton onClick={selectImages} style={{backgroundColor:"white", borderWidth:1, borderColor:"#F6A405"}} textColor={"black"} title={"Добавить фотографии"}/>
                    <Text style={styles.sectionTitle}>Видео с Ютуб:</Text>
                    <TextInput value={youtube}  onChangeText={(val)=>{setYoutube(val)}} style={[styles.textInput, !isYoutubeLinkValid &&{borderBottomColor:"red"}]} placeholder={"Ссылка на видео"}/>
                    {!isYoutubeLinkValid && <Text style={{color:"red", fontSize:12, marginTop:10}}>Неверная ссылка, попробуйте еще раз.</Text>}

                    <CustomButton style={{position:"absolute", bottom:20,alignSelf:"center"}} onClick={goNext} title={"Продолжить"}/>
                </ContentView>
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
        paddingBottom:20,
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

export default NewAdAppiarance;