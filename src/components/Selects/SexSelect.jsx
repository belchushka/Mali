import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getAnimalBreeds, getAnimalCities, getAnimalGender} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import {useDispatch, useSelector} from "react-redux";
import ContentView from "../ContentView";

function SexSelect({onSelect},props) {
    const dispatch = useDispatch()
    const genders = useSelector(state=>state.animal.genders)
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalGender({
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
                <FlatList
                    style={styles.breedList}
                    data={genders}
                    nestedScrollEnabled={true}
                    renderItem={({item})=>{
                        return <TouchableOpacity style={styles.typePicker} onPress={()=>{
                            onSelect(item.id,item.name)
                        }
                        }>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
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
        borderTopWidth:1,
        borderTopColor:"#F6F4F0"
    },
    breedList:{
        marginTop:20
    }
})

export default React.memo(SexSelect);