import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet, ScrollView} from "react-native";
import ContentView from "../components/ContentView";
import CustomHeader from "../components/CustomElements/CustomHeader";
import {useDispatch, useSelector} from "react-redux";
import useLoading from "../hooks/useLoading";
import {getUserAnimals} from "../store/actions/userActions";
import LoadingView from "../components/CustomElements/LoadingView";
import UserAnimalTypeFilter from "../components/Filters/UserAnimalsTypeFilter";
import CustomButton from "../components/CustomElements/CustomButton";

function UserAnimals({navigation},props) {
    const dispatch = useDispatch()
    const userAnimals = useSelector(state=>state.user.userAnimals)
    const [status,setStatus] = useState(null)
    const {start, stop, loading} = useLoading()
    const actives = useMemo(()=>{
        return userAnimals.filter(el=>el.adStatus == "Активный").length
    },[userAnimals])
    const checking = useMemo(()=>{
        return userAnimals.filter(el=>el.adStatus == "На проверке").length
    },[userAnimals])
    const archive = useMemo(()=>{
        return userAnimals.filter(el=>el.adStatus == "Архив").length
    },[userAnimals])
    const filteredValues = useMemo(()=>{
        switch (status){
            case null:
                return userAnimals
            default:
                return userAnimals.filter(el=>el.adStatus === status)
        }
    },[userAnimals, status])
    const fetch = useCallback(async ()=>{
        start()
        const data = await dispatch(getUserAnimals())
        stop()
    }, [dispatch])
    useEffect(fetch, [fetch])
    return (
        <ScrollView style={{flex:1, backgroundColor:"white"}}>
            <CustomHeader hasBackButton={true} title={"Мои объявления"} goBackAction={navigation.goBack}/>
            {loading ? <LoadingView/> : <ContentView>
                    <UserAnimalTypeFilter actives={actives} checking={checking} archive={archive} onChange={(status)=>{
                        setStatus(status)
                    }}/>
                {userAnimals.length!=0 ? <View style={styles.cardHolder}>
                    {filteredValues && filteredValues.map(el=>{
                        return <TouchableOpacity key={el.adId} style={styles.card}>
                            <Image style={styles.cardImage}  source={{uri:el.imagePreview}}/>
                            <View style={styles.cardTextWrapper}>
                                <Text style={styles.cardTitle}>{el.namePet}</Text>
                                <Text style={styles.cardPrice}>{el.price} руб</Text>
                            </View>
                        </TouchableOpacity>
                    })}

                </View> : <View style={styles.createWrapper}>
                    <Text style={styles.createText}>У вас еще нет ни одного объявления.</Text>
                    <CustomButton style={{marginTop:40}} title={"Разместить объявление"} />
                </View>}

            </ContentView>}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    createWrapper:{
      marginTop:60,
        alignItems:"center"
    },
    createText:{
        fontSize:16,
        width:"60%",
        textAlign:"center"
    },
    cardHolder:{
        width:"100%",
        marginTop:10
    },

    card: {
        width:"100%",
        marginTop:15,
        flexDirection:"row",
        alignItems:"center"
    },

    cardImage:{
        width:82,
        height:82,
        borderRadius:14,
        resizeMode:"cover"
    },

    cardTextWrapper:{
        marginLeft:30,
    },
    cardTitle:{
        fontSize:16,
    },
    cardPrice:{
        fontSize:16,
        fontWeight:"bold",
        marginTop:5
    }





})

export default UserAnimals;