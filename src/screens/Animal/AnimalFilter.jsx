import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ContentView from "../../components/ContentView";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import PlaceFilter from "../../components/Filters/PlaceFilter";
import {useDispatch, useSelector} from "react-redux";
import useLoading from "../../hooks/useLoading";
import {getAnimalBreeds, getAnimalPlaces, searchAnimals} from "../../store/actions/animalActions";
import AnimalBreeds from "../../components/Selects/AnimalBreeds";

function AnimalFilter({navigation}, props) {
    const dispatch = useDispatch()
    const animalTypeId = useSelector(state => state.animal.currentAnimalTypeId)
    const animalTypeName = useSelector(state => state.animal.currentAnimalTypeName)
    const [filterPlaces, setFilterPlaces]=useState([])
    const search = useCallback( (breedId, breedName)=>{
        navigation.navigate("searchResults",{
        ...(filterPlaces.length !== 0 && {idAnimalPlace:filterPlaces}),
            idAnimalBreed:breedId,
            idAnimalCategories:animalTypeId,
            searchName:breedName,
            breedName:breedName,
        })
    },[dispatch,filterPlaces])
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <CustomHeader title={animalTypeName} goBackAction={navigation.goBack} hasBackButton={true}/>
            <View style={{paddingLeft:12, paddingRight:12, flex:1, flexGrow:1}}>
                <PlaceFilter onChange={(selectedPlaces)=>{
                    setFilterPlaces(selectedPlaces)
                }}  style={{marginTop: 24}} title={"Откуда животное"}/>
                <AnimalBreeds

                    onSelect={(breedId, breedName)=>{
                        search(breedId,breedName)
                    }}
                />
            </View>
        </View>
    );
}



export default AnimalFilter;