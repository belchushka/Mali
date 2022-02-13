import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getAnimalTypes} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import {useDispatch, useSelector} from "react-redux";

function AnimalTypes({onSelect,style, underlineBottom=false},props) {
    const types = useSelector(state=>state.animal.types)
    const dispatch = useDispatch()
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalTypes())
            stop()
        } catch (e) {

        }
    }, [dispatch])
    useEffect(fetch, [fetch])
    return (
        <View style={{paddingLeft:12,paddingRight:12, flex:1}}>
            {loading ? <ActivityIndicator size={"large"} color={"#F6A405"} /> :
                <FlatList
                    style={[styles.breedList,style]}
                    data={types}
                    renderItem={({item})=>{
                        if (item.name!=="Перевозка животных"){
                            return <TouchableOpacity style={[styles.typePicker,!underlineBottom ? {  borderTopWidth:1,
                                borderTopColor:"#F6F4F0"} : { borderBottomWidth:1,
                                borderBottomColor:"#F6F4F0"}]} onPress={()=>{
                                onSelect(item.id,item.name)
                            }
                            }>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        }

                    }
                    }
                />
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

export default AnimalTypes;