import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getAnimalBreeds, getAnimalCities} from "../store/actions/animalActions";
import useLoading from "../hooks/useLoading";
import {useDispatch, useSelector} from "react-redux";
import ContentView from "./ContentView";

function CitySelect({onSelect},props) {
    const [cities, setCities] = useState([])
    const dispatch = useDispatch()
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalCities({
                limit:500
            }))
            setCities(data)
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
                    data={cities}
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

export default CitySelect;