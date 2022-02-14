import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SearchBar from "../../components/CustomElements/SearchBar";
import ContentView from "../../components/ContentView";
import {searchAnimals, searchAnimalsString} from "../../store/actions/animalActions";
import {useDispatch, useSelector} from "react-redux";
import AnimalCard from "../../components/AnimalCard";
import useLoading from "../../hooks/useLoading";
import CustomButton from "../../components/CustomElements/CustomButton";
import LoadingView from "../../components/CustomElements/LoadingView";
import SvgUri from "react-native-svg-uri";
import BackIcon from "../../media/Icons/Back.svg"

function SearchResults({route, navigation},props) {
    const params = route.params
    const dispatch = useDispatch()
    const [fetchIndex, setFetchIndex] = useState(0)
    const step = 16
    const [results,setResults] = useState([])
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
                    ...filteredParams,
                    idLastAd:fetchIndex,
                    numberAds:step
                }))
                setResultsCount(data.total+data.remained)
                setResults(state=>[...state,...data.cards])
            stop()
        } catch (e) {

        }
    }, [dispatch,params, fetchIndex])
    useEffect(fetch, [fetch])
    return (
        <>
            <View style={{flex:1, backgroundColor:"#F6F4F0"}}>
                <ScrollView>
                    <SearchBar showBackButton={true} navigation={navigation}/>
                    <ContentView>
                        <View style={styles.headers}>
                            <Text style={styles.textBold}>{params.searchName}</Text>
                            <Text style={styles.textOpacity}>{resultsCount + " предложений"}</Text>
                        </View>

                            <FlatList
                                data={results}
                                style={{width:"100%"}}
                                contentContainerStyle={styles.cardHolder}
                                numColumns={2}
                                onEndReached={()=>{
                                    setFetchIndex(state=>state+step)
                                    fetch()
                                }
                                }
                                renderItem={({item})=>{
                                    return <TouchableOpacity onPress={()=>{navigation.navigate("animalInfo",{id:item.idAd})}} key={item.idAd} style={styles.searchCard}>
                                        <AnimalCard clickable={false} key={item.idAd} image={item.imagePreview}/>
                                        <Text style={styles.cardText}>{item.namePet}</Text>
                                        <Text style={styles.cardTextBold}>{item.price + " руб."}</Text>
                                        <Text style={styles.cardTextSmall}>{item.city}</Text>
                                        <View style={styles.placeWrap}>
                                            <Text style={styles.placeText}>{item.place}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                }
                            />
                        {loading && <ActivityIndicator size={"large"} color={"#F6A405"}/>}

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
        alignItems:"center",
        marginTop: 5,
        width:"100%",
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
        marginTop:15,
        margin:5
    }

})

export default SearchResults;