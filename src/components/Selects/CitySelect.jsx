import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getAnimalBreeds, getAnimalCities} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import {useDispatch, useSelector} from "react-redux";
import ContentView from "../ContentView";

function CitySelect({onSelect},props) {
    const cities = useSelector(state=>state.animal.cities)
    const dispatch = useDispatch()
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalCities({
                limit:500
            }))
            stop()
        } catch (e) {

        }
    }, [dispatch])
    useEffect(fetch, [fetch])
    return (
        <View style={{paddingLeft:12,paddingRight:12}}>
            {loading ? <ActivityIndicator size={"large"} color={"#F6A405"} /> :
                <ScrollView style={styles.breedList}>
                    {cities && cities.map(item=>{
                        return <TouchableOpacity style={styles.typePicker} onPress={()=>{
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
        borderTopWidth:1,
        borderTopColor:"#F6F4F0"
    },
    breedList:{
        marginTop:20
    }
})

export default React.memo(CitySelect);