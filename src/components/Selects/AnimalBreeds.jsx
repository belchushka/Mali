import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getAnimalBreeds} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import {useDispatch, useSelector} from "react-redux";
import ContentView from "../ContentView";

function AnimalBreeds({onSelect, style,underlineBottom=false},props) {
    const animalTypeId = useSelector(state => state.animal.currentAnimalTypeId)
    const breeds = useSelector(state=>state.animal.breeds)
    const dispatch = useDispatch()
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalBreeds({
                id:animalTypeId
            }))
            stop()
        } catch (e) {

        }
    }, [dispatch,animalTypeId])
    useEffect(fetch, [fetch, animalTypeId])
    return (
            <View style={{paddingLeft:12,paddingRight:12, flex:1}}>
                {loading ? <ActivityIndicator size={"large"} color={"#F6A405"} /> :
                    <ScrollView style={[styles.breedList,style]}>
                        {breeds && breeds.map((item)=>{
                            return  <TouchableOpacity key={item.id} style={[styles.typePicker,!underlineBottom ? {  borderTopWidth:1,
                                borderTopColor:"#F6F4F0"} : { borderBottomWidth:1,
                                borderBottomColor:"#F6F4F0"}]} onPress={()=>{
                                onSelect(item.id,item.name)
                            }
                            }>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        })}
                    </ScrollView>
                }

            </View>
    );
}

const styles = StyleSheet.create({
    typePicker:{
        paddingTop:18,
        paddingBottom:18,

    },
    breedList:{
        marginTop:20
    }
})

export default AnimalBreeds;