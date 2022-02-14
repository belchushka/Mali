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
import {getAdminAnimal, getAnimal} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import LoadingView from "../../components/CustomElements/LoadingView";
import {useAlert} from "../../hooks/useAlert";
import AnimalInfoLayout from "../../components/AnimalInfoLayout";


function AnimalInfo({navigation, route}, props) {
    const animalId = route.params.id
    const dispatch = useDispatch()
    const [data, setAnimalData] = useState({})
    const {start, stop, loading} = useLoading()
    const {open, close, render} = useAlert()

    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimal({idAd: animalId}))
            setAnimalData(data)
            stop()
        } catch (e) {
            open(e, "", () => () => {
                navigation.goBack()
            })
        }
    }, [dispatch, animalId])
    useEffect(fetch, [fetch, animalId])
    return (
        <>
            {loading ? <LoadingView/> : <View style={{flex: 1, backgroundColor: "white"}}>
                <AnimalInfoLayout navigation={navigation} data={data}/>
            </View>}
            {render()}
        </>

    );
}


export default AnimalInfo;