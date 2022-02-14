import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View, StyleSheet, ScrollView} from "react-native";
import {getAnimalPlaces} from "../../store/actions/animalActions";
import {useDispatch} from "react-redux";
import useLoading from "../../hooks/useLoading";

function UserAnimalTypeFilter({style, onChange,actives, checking,archive,refused},props) {
    const [selectedType, setSelectedType] = useState(null)
    const dispatch = useDispatch()
    return (
        <View style={[{width:"100%"},style]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterWrap}>
                        <TouchableOpacity  style={[styles.filterItem,selectedType === "Активный" ? styles.filterItemActive:{}]} onPress={ ()=>{
                            if(selectedType !== "Активный"){
                                setSelectedType(state=>{
                                    return "Активный"
                                })
                                onChange("Активный")
                            }else{
                                setSelectedType((state)=>{
                                    return null
                                })
                                onChange(null)
                            }
                        }
                        }>
                            <Text style={[styles.filterText,selectedType === "Активный" && styles.filterTextActive]}>Активные {actives}</Text>
                        </TouchableOpacity>
                    <TouchableOpacity  style={[styles.filterItem,selectedType === "На проверке" ? styles.filterItemActive:{}]} onPress={ ()=>{
                        if(selectedType !== "На проверке"){
                            setSelectedType(state=>{
                                return "На проверке"
                            })
                            onChange("На проверке")
                        }else{
                            setSelectedType((state)=>{
                                return null
                            })
                            onChange(null)
                        }
                    }
                    }>
                        <Text style={[styles.filterText,selectedType === "На проверке" && styles.filterTextActive]}>На проверке {checking}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={[styles.filterItem,selectedType === "Архив" ? styles.filterItemActive:{}]} onPress={ ()=>{
                        if(selectedType !== "Архив"){
                            setSelectedType(state=>{
                                return "Архив"
                            })
                            onChange("Архив")
                        }else{
                            setSelectedType((state)=>{
                                return null
                            })
                            onChange(null)
                        }
                    }
                    }>
                        <Text style={[styles.filterText,selectedType === "Архив" && styles.filterTextActive]}>Архив {archive}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={[styles.filterItem,selectedType === "Отклонено" ? styles.filterItemActive:{}]} onPress={ ()=>{
                        if(selectedType !== "Отклонено"){
                            setSelectedType(state=>{
                                return "Отклонено"
                            })
                            onChange("Отклонено")
                        }else{
                            setSelectedType((state)=>{
                                return null
                            })
                            onChange(null)
                        }
                    }
                    }>
                        <Text style={[styles.filterText,selectedType === "Отклонено" && styles.filterTextActive]}>Отклоненные {refused}</Text>
                    </TouchableOpacity>

                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    filterWrap:{
        width:"100%",
        marginLeft:-10,
        marginTop:10
    },

    filterItem:{
        borderWidth:1,
        borderColor:"#E7E7E7",
        borderRadius:4,
        paddingTop:8,
        paddingBottom:8,
        width:130,
        flexDirection:"row",
        justifyContent:"center",
        marginLeft:10,
        marginTop:10
    },

    filterItemActive:{
        backgroundColor:"#F6A405"
    },

    filterText:{
        color:"black",
        fontSize:14,

    },

    filterTextActive:{
        color:"white"
    },
    title:{
        color:"black",
        fontSize:14
    }
})

export default UserAnimalTypeFilter;