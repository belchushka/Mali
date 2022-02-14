import React, {useCallback, useEffect, useState} from 'react';
import LoadingView from "../../components/CustomElements/LoadingView";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnimalInfoLayout from "../../components/AnimalInfoLayout";
import useLoading from "../../hooks/useLoading";
import {useAlert} from "../../hooks/useAlert";
import {approveAnimal, getAdminAnimal, getAnimal} from "../../store/actions/animalActions";
import {useDispatch} from "react-redux";

function AdminAnimal({navigation},props) {
    const {open, close, render} = useAlert()
    const {start, stop, loading} = useLoading()
    const dispatch = useDispatch()
    const [animalData,setAnimalData] = useState({})
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAdminAnimal())
            setAnimalData(data)
            stop()
        } catch (e) {
            open(e, "", () => () => {
                navigation.goBack()
            })
        }
    }, [dispatch])
    const approve = useCallback(async (id)=>{
        try{
            console.log(id);
            const data = await dispatch(approveAnimal({
                idAd:id
            }))
            open("Объявление успешно подтверждено" ,"", ()=>()=>{
                fetch()
            })
        }catch (e) {
            open("Ошибка",e)
        }

    },[dispatch,fetch])
    useEffect(fetch, [fetch])
    return (
        <>
            {loading ? <LoadingView/> : <View style={{flex: 1, backgroundColor: "white"}}>
                <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
                    <TouchableOpacity style={styles.adminButton}>
                        <Text style={styles.adminButtonText}>Отклонить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.adminButton} onPress={()=>{
                        approve(animalData.idAd)
                    }
                    }>
                        <Text style={styles.adminButtonText}>Принять</Text>
                    </TouchableOpacity>
                </View>
                <AnimalInfoLayout showErrorAlert={false} navigation={navigation} data={animalData}/>
            </View>}
            {render()}
        </>
    );
}

const styles = StyleSheet.create({
    adminButton:{
        width:"49.9%",
        backgroundColor:"#F6A405",
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:"white"
    },
    adminButtonText:{
        color:"white",
        textAlign:"center"
    }
})

export default AdminAnimal;