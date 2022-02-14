import React, {useCallback, useState} from 'react';
import {TextInput, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import SearchIcon from "../../media/Icons/Search.svg"
import SvgUri from "react-native-svg-uri";
import BackIcon from "../../media/Icons/Back.svg";
import {useDispatch} from "react-redux";
import {searchAnimalsString} from "../../store/actions/animalActions";

function SearchBar({style, showBackButton=false, navigation},props) {
    const [searchString, setSearchString] = useState("")
    const dispatch = useDispatch()
    const search = useCallback(async ()=>{
        const params = await dispatch(searchAnimalsString({
            searchString:searchString
        }))
        const properties = params.recognizedProperties
        navigation.navigate("searchResults",{
            ...(properties.idAnimalPlace.length !== 0 && {idAnimalPlace: properties.idAnimalPlace}),
            ...(properties.idAnimalBreed && {idAnimalBreed: properties.idAnimalBreed}),
            ...(properties.idAnimalCategories && {idAnimalCategories: properties.idAnimalCategories}),
            ...(properties.priceMin && {priceMin: properties.priceMin}),
            ...(properties.priceMax && {priceMax: properties.priceMax}),
            searchName:"Результаты поиска:",
        })
    },[searchString])
    return (
        <View style={[style,{marginTop:12, marginBottom:32, paddingLeft:12, paddingRight:12}]}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                {showBackButton &&  <TouchableOpacity style={{width:20, height:20}} onPress={()=>{navigation.goBack()}}>
                    <SvgUri width={16} height={16} source={BackIcon}/>
                </TouchableOpacity>}

                <View style={styles.searchIcon}>
                    <SvgUri width={16} height={16} source={SearchIcon}/>
                </View>
                <TextInput
                    style={[styles.searchInput, showBackButton && {marginLeft:15}]}
                    placeholder={"Поиск"}
                    value={searchString}
                    onChangeText={(val)=>setSearchString(val)}
                    onSubmitEditing={()=>{
                        search()
                    }}
                    placeholderTextColor="#777777"
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    searchIcon:{
        position:"absolute",
        height:"100%",
        justifyContent:"center",
        right:20,
        zIndex:10
    },
    searchInput: {
        paddingLeft:16,
        paddingRight:36,
        paddingTop:14,
        paddingBottom:14,
        backgroundColor:"#ffffff",
        fontSize:15,
        borderRadius:10,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 },
        flexGrow:1
    },


});

export default SearchBar;