import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {getAnimal} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import LoadingView from "../../components/CustomElements/LoadingView";
import {useAlert} from "../../hooks/useAlert";
import AnimalInfoLayout from "../../components/AnimalInfoLayout";
import Seperator from "../../media/Icons/Seperator.svg";
import SvgUri from "react-native-svg-uri";
import CloseSvg from "../../media/Icons/Close.svg"
import Edit from "../../media/Icons/EditNoWrap.svg"
import Ok from "../../media/Icons/OkSvg.svg"
import {sendToArchive} from "../../store/actions/userActions";


function AnimalInfo({navigation, route}, props) {
    const animalId = route.params.id
    const dispatch = useDispatch()
    const status = route.params.status
    const refreshParent = route?.params?.refresh
    const [data, setAnimalData] = useState({})
    const {start, stop, loading} = useLoading()
    const {open, close, render} = useAlert()
    const [adStatus, setAdStatus] = useState(null)
    const [isMine, setIsMine] = useState(false)
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimal({idAd: animalId}))
            setAnimalData(data)
            setAdStatus(data.adStatus)
            setIsMine(data.isMine)
            stop()
        } catch (e) {
            open(e, "", () => () => {
                navigation.goBack()
            })
        }
    }, [dispatch, animalId])

    const sendAdToArchive = useCallback(async ()=>{
        try{
            const data = await dispatch(sendToArchive({idAd:animalId}))
            open("Уведомление", "Объявление отправлено в архив", () => () => {
                navigation.goBack()
            })
        }catch(e){
            open(e, "", () => () => {
                navigation.goBack()
            })
        }
    },[dispatch, animalId])
    useEffect(()=>{
        const unsubscribe = navigation.addListener("focus",()=>{
            fetch()
        })

        return unsubscribe
    }, [fetch, animalId, navigation, route])
    return (
        <>
            {loading ? <LoadingView/> : <View style={{flex: 1, backgroundColor: "white"}}>
                {isMine && (
                    <View >
                        <View style={styles.chekingText}>
                            <Text style={styles.statusText}>{(adStatus==="На проверке" && "Объявление на проверке")||(adStatus==="Архив" && "Объявление в архиве") || (adStatus==="Отклонено"&&"Объявление отклонено") || (adStatus==="Активный" && "Ваше объявление")}</Text>
                            <SvgUri
                                width={14}
                                height={14}
                                source={Ok}
                            />
                        </View>
                        {
                            (adStatus!=="Отклонено" && adStatus!=="Архив") &&  <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <TouchableOpacity style={styles.adminButton} onPress={()=>{
                                    sendAdToArchive()
                                }}>
                                    <View style={{width:"100%", flexDirection:"row", alignItems:"center",paddingLeft:12}}>
                                        <SvgUri
                                            width={10}
                                            height={10}
                                            source={CloseSvg}
                                        />
                                        <Text style={styles.adminButtonText}>Снять с публикации</Text>
                                    </View>
                                </TouchableOpacity>
                                <SvgUri
                                    style={{
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}
                                    width={1}
                                    height={16}
                                    source={Seperator}
                                />
                                <TouchableOpacity style={styles.adminButton} onPress={()=>{
                                    navigation.navigate("editAd",{
                                        idAd:data.idAd,
                                        name:data.namePet,
                                        price:data.price,
                                        age:data.age,
                                        description:data.descriptionPet
                                    })
                                }
                                }>
                                    <View style={{width:"100%", flexDirection:"row", alignItems:"center",paddingLeft:12}}>
                                        <SvgUri
                                            width={14}
                                            height={14}
                                            source={Edit}
                                        />
                                        <Text style={styles.adminButtonText}>Редактировать</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                )}
                <AnimalInfoLayout approved={adStatus} navigation={navigation} data={data}/>
            </View>}
            {render()}
        </>

    );
}

const styles = StyleSheet.create({
    adminButton:{
        width:"44%",
        backgroundColor:"white",
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:"white"
    },
    adminButtonText:{
        color:"black",
        textAlign:"center",
        marginLeft:10
    },
    chekingText:{
        height:50,
        width:"100%",
        backgroundColor:"#F6A405",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        paddingLeft:12,
        paddingRight:12

    },
    statusText:{
        color:"white",
        fontSize:14,
    }
})

export default AnimalInfo;