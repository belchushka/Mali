import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import Swiper from 'react-native-swiper'
import BackWhite from "../../media/Icons/BackWhite.svg"
import SvgUri from "react-native-svg-uri";
import CircledIcon from "../../components/CustomElements/CircledIcon";
import PlaneImg from "../../media/Icons/Plane.svg"
import ContentView from "../../components/ContentView";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {getAnimal} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import LoadingView from "../../components/CustomElements/LoadingView";
import YoutubePlayer from "react-native-youtube-iframe";
import {LinearGradient} from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import {useAlert} from "../../hooks/useAlert";

function youtube_parser(url){
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function AnimalInfo({navigation, route}, props) {
    const [videoLoaded,setVideoLoaded] = useState(false)
    const animalId = route.params.id
    const dispatch = useDispatch()
    const [data, setAnimalData]=useState({})
    const {start, stop, loading} = useLoading()
    const [playing, setPlaying] = useState(false);
    const {open,close,render} = useAlert()
    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);
    const fetch = useCallback(async ()=>{
        try {
            start()
            const data = await dispatch(getAnimal({idAd:animalId}))
            setAnimalData(data)
            stop()
        }catch (e){
            open(e)
        }
    },[dispatch, animalId])
    useEffect(fetch,[fetch, animalId])
    return (
        <>
            {loading ? <LoadingView/> :<View style={{flex: 1, backgroundColor:"white"}}>
                <ScrollView >
                    <View style={styles.swiperWrapper}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }} style={styles.swiperBackButton}>
                            <SvgUri width={44} height={44} source={BackWhite}/>
                        </TouchableOpacity>
                        <View style={styles.textWrapper}>
                            <View>
                                <Text style={styles.textInfoBold}>{data.namePet}</Text>
                                <Text style={styles.textInfoSmall}>{data.city}</Text>
                                <View style={styles.placeWrap}>
                                    <Text style={styles.placeText}>{data.animalPlace}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.shareButton}>
                                <Text style={styles.shareText}>Поделиться</Text>
                                <CircledIcon image={PlaneImg} style={{marginLeft: 5}}/>
                            </TouchableOpacity>
                        </View>
                        {data.imagesPath &&<AppIntroSlider
                            style={{ width: "100%", aspectRatio: 1 }}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flex: 1 }}>
                                        <Image
                                            source={{ uri: item }}
                                            style={{
                                                width: "100%",
                                                aspectRatio: 1,
                                            }}
                                        />
                                        <LinearGradient
                                            colors={["rgba(255,255,255,0.01)", "rgba(0,0,0,0.65)"]}
                                            style={{
                                                width: "100%",
                                                aspectRatio: 2,
                                                position: "absolute",
                                                top: "50%",
                                            }}
                                        />
                                    </View>
                                );
                            }}
                            activeDotStyle={{ display: "none" }}
                            dotStyle={{ display: "none" }}
                            showDoneButton={false}
                            showNextButton={false}
                            renderPagination={(index)=>{
                                return <View style={{position:"absolute", alignSelf:"center", bottom:40, flexDirection:"row"}}>
                                    {data.imagesPath.map((el,indexEl)=>{
                                        return <View style={[{width:5, height:5, backgroundColor:"rgba(255,255,255,0.3)", borderRadius:1200, marginLeft:10},indexEl==index && {width:15, backgroundColor:"white"} ]}>

                                        </View>
                                    })}
                                </View>
                            }
                            }
                            data={data.imagesPath}
                        />}

                    </View>
                    <ContentView style={styles.mainView}>
                        <View style={styles.priceInfo}>
                            <Text style={styles.price}>{`${data.price} руб`}</Text>
                            <View style={styles.buttons}>
                                <TouchableOpacity style={[styles.button, styles.buttonWhite]}>
                                    <Text style={styles.buttonTextBlack}>Позвонить</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.buttonOrange]}>
                                    <Text style={styles.buttonTextWhite}>Написать</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.mainInfo}>
                            <View style={styles.mainInfoInner}>
                                <Text style={styles.mainInfoTitle}>Порода</Text>
                                <View style={styles.seperator}></View>
                                <Text style={styles.mainInfoValue}>{data.animalBreed}</Text>
                            </View>
                            <View style={styles.mainInfoInner}>
                                <Text style={styles.mainInfoTitle}>Пол</Text>
                                <View style={styles.seperator}></View>
                                <Text style={styles.mainInfoValue}>{data.gender}</Text>
                            </View>
                            <View style={styles.mainInfoInner}>
                                <Text style={styles.mainInfoTitle}>Возраст</Text>
                                <View style={styles.seperator}></View>
                                <Text style={styles.mainInfoValue}>{data.age}</Text>
                            </View>
                        </View>
                        <View style={styles.descriptionBlock}>
                            <Text style={styles.descriptionTitle}>Описание</Text>
                            <Text style={styles.descriptionText}>{`${data.descriptionPet}`}</Text>
                        </View>
                        {data.youtubeVideo && <View style={[styles.video, !videoLoaded && {display:"none"}]}>
                            <YoutubePlayer
                                height={245}
                                play={playing}
                                onReady={()=>{setVideoLoaded(true)}}
                                videoId={youtube_parser(data.youtubeVideo)}
                            />
                        </View>}

                        {!videoLoaded && <View style={[styles.video, {justifyContent:"center"}]}><ActivityIndicator size="large" color="#F6A405" /></View>}



                        <CustomButton style={{marginTop:25}} title={"Нашли ошибку?"}/>
                        {/*<View style={styles.suggestions}>*/}
                        {/*    <Text style={styles.suggestionsTitle}>Похожие предложения</Text>*/}
                        {/*    <View style={styles.cardHolder}>*/}
                        {/*        <TouchableOpacity onPress={()=>{navigation.navigate("animalInfo")}} style={styles.searchCard}>*/}
                        {/*            /!*<AnimalCard clickable={false}  image={CatImg}/>*!/*/}
                        {/*            <Text style={styles.cardText}>{"Абиссинская кошка Молли"}</Text>*/}
                        {/*            <Text style={styles.cardTextBold}>{"5000 руб."}</Text>*/}
                        {/*            <Text style={styles.cardTextSmall}>{"Сочи, Мамайка"}</Text>*/}
                        {/*            <View style={styles.placeCardWrap}>*/}
                        {/*                <Text style={styles.placeCardText}>{"Частное объявление"}</Text>*/}
                        {/*            </View>*/}
                        {/*        </TouchableOpacity>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </ContentView>
                </ScrollView>
            </View>}
            {render()}
        </>

    );
}

const styles = StyleSheet.create({
    cardHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom:20
    },
    cardText:{
        marginTop:10,
        fontSize:13
    },
    cardTextBold:{
        marginTop:10,
        fontWeight:"bold",
        fontSize:13
    },

    cardTextSmall:{
        marginTop:5,
        fontSize:10,
        color:"#949290",
    },

    placeCardWrap:{
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:7,
        paddingRight:7,
        borderWidth:1,
        borderColor:"#F6A405",
        borderRadius:5,
        marginTop:10,
        alignSelf: 'flex-start',
    },

    placeCardText:{
        fontSize:10
    },
    suggestionsTitle:{
      fontSize:18
    },
    suggestions:{
      marginTop:60
    },
    video:{
      width:"100%",
        height:210,
        overflow:"hidden",
        marginTop:30,
        borderRadius:20
    },
    descriptionText:{
      marginTop:20,
        fontSize:14
    },
    descriptionTitle:{
        fontSize:18
    },
    descriptionBlock:{
      marginTop:30
    },
    seperator:{
      flexGrow:1,
      borderWidth:1,
        marginLeft:8,
        marginRight:8,
        marginTop:10,
        borderStyle:"dashed",
        borderRadius:1,
        height:1,
        borderColor:"#e7e7e7"
    },
    mainInfoValue:{
        fontSize:14
    },
    mainInfoTitle:{
        fontSize:14,
        color:"#999999"
    },
    mainInfoInner:{
      width:"100%",
      flexDirection:"row",
        justifyContent:"space-between",
        marginTop:15,
    },
    mainInfo:{
      width:"100%",
        marginTop:15,
        paddingBottom:30,
        borderBottomColor:"#E5E5E5",
        borderBottomWidth:1
    },
    buttonTextBlack:{
        fontSize:16,
        color:"black"
    },
    buttonTextWhite:{
        fontSize:16,
        color:"white"
    },
    buttonWhite:{
        borderWidth:1,
        borderColor:"#E7E7E7",
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"center"
    },
    buttonOrange:{
       width:112,
        marginLeft:10,
        borderRadius:10,
        flexDirection:"row",
        backgroundColor:"#F6A405",
        justifyContent:"center"
    },
    buttons:{
      flexDirection:"row"
    },
    button:{
        width:116,
        paddingTop:15,
        paddingBottom:15
    },
    price:{
        fontSize:17,
        fontWeight:"bold"
    },
    priceInfo: {
        width:"100%",
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
    },
    mainView: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        top: -20
    },
    animalImage: {
        width: "100%",
        resizeMode: "cover",
    },
    swiperBackButton: {
        position: "absolute",
        top: 26,
        width: 44,
        height: 44,
        elevation: 1,
        zIndex: 100
    },

    textInfoBold: {
        fontSize: 18,
        color: "white",
    },
    textInfoSmall: {
        fontSize: 12,
        marginTop: 10,
        color: "white",
    },
    textWrapper: {
        position: "absolute",
        bottom: 80,
        width: "100%",
        zIndex: 200,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    placeWrap: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 7,
        paddingRight: 7,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
    },

    placeText: {
        fontSize: 10,
        color: "white"
    },
    shareButton: {
        flexDirection: "row",
        alignItems: "center",
        top: 10
    },
    shareText: {
        color: "white",
        fontSize: 12
    }

})

export default AnimalInfo;