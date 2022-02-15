import React, {useCallback, useEffect, useState} from 'react';
import {View} from "react-native";
import {useDispatch} from "react-redux";
import {getAnimal} from "../../store/actions/animalActions";
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