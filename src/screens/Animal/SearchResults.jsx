import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    BackHandler,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import SearchBar from "../../components/CustomElements/SearchBar";
import ContentView from "../../components/ContentView";
import {addAnimalsResults, searchAnimals, searchAnimalsString} from "../../store/actions/animalActions";
import {useDispatch, useSelector} from "react-redux";
import AnimalCard from "../../components/AnimalCard";
import useLoading from "../../hooks/useLoading";
import CustomButton from "../../components/CustomElements/CustomButton";


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

function SearchResults({route, navigation}, props) {
    const params = route.params
    const dispatch = useDispatch()
    const step = 10
    const [results,setResults] = useState([])
    console.log(results);
    const [goingToClose,setGoingToClose] = useState(false)
    const [remains, setRemains] = useState(0)
    const [resultsCount, setResultsCount] = useState(0)
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            let filteredParams = {...params}
            delete filteredParams.searchName
            delete filteredParams.breedName
            delete filteredParams.cityName
            filteredParams.idAnimalPlace = JSON.stringify(filteredParams.idAnimalPlace)

            const data = await dispatch(searchAnimals({
                ...filteredParams,
                idLastAd: 0,
                numberAds:step
            }))
            setResults(data.cards)
            setResultsCount(data.total || 0)
            setRemains(data.remained)
            stop()
        } catch (e) {

        }
    }, [dispatch, params])

    const fetchNext = useCallback(async (fetchIndex)=>{
        try {
            start()
            let filteredParams = {...params}
            delete filteredParams.searchName
            delete filteredParams.breedName
            filteredParams.idAnimalPlace = JSON.stringify(filteredParams.idAnimalPlace)
            const data = await dispatch(searchAnimals({
                ...filteredParams,
                idLastAd: fetchIndex,
                numberAds:step
            }))
            setResults(state=>[...state,...data.cards])
            setResultsCount(data.total)
            setRemains(data.remained)
            stop()
        } catch (e) {

        }
    },[dispatch, params])
    useEffect(fetch, [fetch])
    useEffect(()=>{
        const backAction = ()=>{
            stop()
        }
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
    })
    return (
        <>
            <View style={{flex: 1, backgroundColor: "#F6F4F0"}}>
                <ScrollView onScroll={async ({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        if (remains>0){
                            fetchNext(results[results.length - 1].idAd)
                        }
                    }
                }}
                            scrollEventThrottle={400}>
                    <SearchBar showBackButton={true} navigation={navigation}/>
                    <ContentView>
                        <View style={styles.headers}>
                            <Text style={styles.textBold}>{params.searchName}</Text>
                            <Text style={styles.textOpacity}>{resultsCount + " предложений"}</Text>
                        </View>
                        {!goingToClose && (
                            <View style={styles.cardHolder}>
                                {results && results.map((item) => {
                                   return <TouchableOpacity onPress={() => {
                                        navigation.navigate("animalInfo", {id: item.idAd, previousScreen:"searchResults"})
                                    }} key={item.idAd} style={styles.searchCard}>
                                        <AnimalCard clickable={false} key={item.idAd} image={item.imagePreview}/>
                                        <Text style={styles.cardText}>{item.namePet}</Text>
                                        <Text style={styles.cardTextBold}>{item.price + " руб."}</Text>
                                        <Text style={styles.cardTextSmall}>{item.city}</Text>

                                        <View style={styles.placeWrap}>
                                            <Text style={styles.placeText}>{item.place}</Text>
                                        </View>
                                    </TouchableOpacity>

                                })}

                                {loading && <View style={{alignItems:"center", width:"100%", marginTop:20}}>
                                    <ActivityIndicator size={"large"}  color={"#F6A405"}/>
                                </View>}
                            </View>
                        )}




                    </ContentView>
                </ScrollView>
                <View style={{
                    position: "absolute",
                    bottom: 40, flexDirection: "row", justifyContent: "center", width: "100%"
                }}>
                    <CustomButton style={{
                        width: 220
                    }} title={"Параметры"} onClick={() => {
                        navigation.navigate("additionalFilter", {
                            params: params
                        })
                    }}/>
                </View>

            </View>
        </>

    );
}

const styles = StyleSheet.create({
    headers: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 18
    },

    textOpacity: {
        color: "#949290",
        fontSize: 14,
        marginTop: 5
    },
    cardHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 5,
        width: "100%",
        marginBottom: 20
    },
    cardText: {
        marginTop: 10,
        fontSize: 13
    },
    cardTextBold: {
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 13
    },

    cardTextSmall: {
        marginTop: 5,
        fontSize: 10,
        color: "#949290",
    },

    placeWrap: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 7,
        paddingRight: 7,
        borderWidth: 1,
        borderColor: "#F6A405",
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
    },

    placeText: {
        fontSize: 10
    },

    searchCard: {
        marginTop: 15,
        maxWidth:"49%"
    }

})

export default SearchResults;