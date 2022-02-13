import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SearchBar from "../../components/CustomElements/SearchBar";
import ContentView from "../../components/ContentView";
import {searchAnimals} from "../../store/actions/animalActions";
import {useDispatch, useSelector} from "react-redux";
import AnimalCard from "../../components/AnimalCard";
import useLoading from "../../hooks/useLoading";
import CustomButton from "../../components/CustomElements/CustomButton";
import LoadingView from "../../components/CustomElements/LoadingView";

function SearchResults({route, navigation},props) {
    const params = route.params
    const dispatch = useDispatch()
    const results = useSelector(state=>state.animal.searchedAnimals)
    const [resultsCount, setResultsCount] = useState(0)
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            let filteredParams = {...params}
            delete filteredParams.searchName
            delete filteredParams.breedName
            filteredParams.idAnimalPlace = JSON.stringify(filteredParams.idAnimalPlace)
            const data = await dispatch(searchAnimals({
                ...filteredParams
            }))
            setResultsCount(data.total)
            stop()
        } catch (e) {

        }
    }, [dispatch,params])
    useEffect(fetch, [fetch])
    return (
        <>
            {loading ? <LoadingView/> :        <View style={{flex:1, backgroundColor:"#F6F4F0"}}>
                <ScrollView>
                    <SearchBar/>
                    <ContentView>
                        <View style={styles.headers}>
                            <Text style={styles.textBold}>{params.searchName}</Text>
                            <Text style={styles.textOpacity}>{resultsCount + " предложений"}</Text>
                        </View>

                        <View style={styles.cardHolder}>
                            {results && results.map(el=>{
                                return <TouchableOpacity onPress={()=>{navigation.navigate("animalInfo",{id:el.idAd})}} key={el.idAd} style={styles.searchCard}>
                                    <AnimalCard clickable={false} key={el.idAd} image={el.imagePreview}/>
                                    <Text style={styles.cardText}>{el.namePet}</Text>
                                    <Text style={styles.cardTextBold}>{el.price + " руб."}</Text>
                                    <Text style={styles.cardTextSmall}>{el.city}</Text>
                                    <View style={styles.placeWrap}>
                                        <Text style={styles.placeText}>{el.place}</Text>
                                    </View>
                                </TouchableOpacity>

                            })}
                        </View>
                    </ContentView>
                </ScrollView>
                <View style={{position:"absolute",
                    bottom:40,flexDirection:"row", justifyContent: "center", width:"100%"}}>
                    <CustomButton style={{
                        width:220
                    }} title={"Параметры"} onClick={()=>{
                        navigation.navigate("additionalFilter",{
                            params:params
                        })
                    }} />
                </View>

            </View>
            }
        </>

    );
}

const styles = StyleSheet.create({
    headers:{
        flexDirection:"column",
        alignItems:"center",
        marginTop:10
    },
    textBold:{
        fontWeight:"bold",
        fontSize:18
    },

    textOpacity:{
        color:"#949290",
        fontSize:14,
        marginTop:5
    },
    cardHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom:20
    },
    cardText:{
        marginTop:10,
        fontSize:13
    },
    cardTextBold:{
        marginTop:10,
        fontWeight:"bold",
        fontSize:13
    },

    cardTextSmall:{
        marginTop:5,
        fontSize:10,
        color:"#949290",
    },

    placeWrap:{
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:7,
        paddingRight:7,
        borderWidth:1,
        borderColor:"#F6A405",
        borderRadius:5,
        marginTop:10,
        alignSelf: 'flex-start',
    },

    placeText:{
        fontSize:10
    },

    searchCard:{
        marginTop:15
    }

})

export default SearchResults;