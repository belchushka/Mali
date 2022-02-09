import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {getAnimalPlaces} from "../../store/actions/animalActions";
import {useDispatch} from "react-redux";
import useLoading from "../../hooks/useLoading";

function PlaceFilter({title,style, onChange,selectedValues, checkOne=false},props) {
    const [places,setPlaces] = useState([])
    const [selectedPlaces, setSelectedPlaces] = useState(selectedValues?selectedValues : [])
    const [selectedPlace, setSelectedPlace] = useState(null)
    const dispatch = useDispatch()
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalPlaces())
            setPlaces(data)
            stop()
        } catch (e) {

        }
    }, [dispatch])
    useEffect(fetch, [fetch])
    return (
        <View style={style}>

                <>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.filterWrap}>
                        {places.map(el=>{
                           return <>
                               {checkOne ?
                                   <TouchableOpacity key={el.id} style={[styles.filterItem,selectedPlace==el.id?styles.filterItemActive:{}]} onPress={ ()=>{
                                       if(selectedPlace != el.id){
                                           setSelectedPlace(state=>{
                                               return el.id
                                           })
                                           onChange(el.id)
                                       }else{
                                           setSelectedPlace((state)=>{
                                               return null
                                           })
                                           onChange(null)
                                       }



                                   }
                                   }>
                                       <Text style={styles.filterText}>{el.name}</Text>
                                   </TouchableOpacity>
                                   :
                                   <TouchableOpacity key={el.id} style={[styles.filterItem,selectedPlaces.indexOf(el.id)!==-1?styles.filterItemActive:{}]} onPress={ ()=>{
                                       if(selectedPlaces.indexOf(el.id)===-1){
                                           setSelectedPlaces(state=>{
                                               return [...state, el.id]
                                           })
                                           onChange([...selectedPlaces, el.id])
                                       }else{
                                           setSelectedPlaces((state)=>{
                                               return state.filter(key=>key!==el.id)
                                           })
                                           onChange(selectedPlaces.filter(key=>key!==el.id))
                                       }



                                   }
                                   }>
                                       <Text style={styles.filterText}>{el.name}</Text>
                                   </TouchableOpacity>
                               }
                           </>

                        })}
                    </View>
                </>
        </View>
    );
}

const styles = StyleSheet.create({
    filterWrap:{
        flexDirection:"row",
        flexWrap:"wrap",
        marginLeft:-10,
        marginTop:10
    },

    filterItem:{
        borderWidth:1,
        borderColor:"#E7E7E7",
        borderRadius:4,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:16,
        paddingRight:16,
        marginLeft:10,
        marginTop:10
    },

    filterItemActive:{
        backgroundColor:"#E7E7E7"
    },

    filterText:{
        color:"#808080",
        fontSize:14
    },
    title:{
        color:"black",
        fontSize:14
    }
})

export default React.memo(PlaceFilter);