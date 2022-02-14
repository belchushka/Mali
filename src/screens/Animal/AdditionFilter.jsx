import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import PlaceFilter from "../../components/Filters/PlaceFilter";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {searchAnimals} from "../../store/actions/animalActions";
import PricePanel from "../../components/Panels/PricePanel";
import AnimalBreedPanel from "../../components/Panels/AnimalBreedPanel";
import CityPanel from "../../components/Panels/CityPanel";
import useLoading from "../../hooks/useLoading";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

function AdditionFilter({navigation, route}, props) {
    const animalTypeId = useSelector(state => state.animal.currentAnimalTypeId)
    const params = route.params.params
    const [city, setCity] = useState(params.idCity ?params.idCity : null)
    const [cityName, setCityName] = useState("")
    const [animalBreed, setAnimalBreed] = useState(params.idAnimalBreed ? params.idAnimalBreed : null)
    const [animalTypeName, setAnimalTypeName] = useState(params.breedName ?params.breedName : "")
    const [animalPlace, setAnimalPlace] = useState(params.idAnimalPlace ? params.idAnimalPlace : [])
    const [total, setTotal] = useState(0)
    const [priceRange, setPriceRange] = useState([params.priceMin ? params.priceMin : null, params.priceMax ? params.priceMax : null])
    const dispatch = useDispatch()
    const [pricePanelOpened, setPricePanelOpened] = useState(false)
    const [breedPanelOpened, setBreedPanelOpened] = useState(false)
    const [cityPanelOpened, setCityPanelOpened] = useState(false)
    const {start, stop, loading} = useLoading()
    const refreshData = useCallback(async () => {
        start()
        const data = await dispatch(searchAnimals({
            // idCity:city.toString(),
            ...(animalPlace.length !== 0 && {idAnimalPlace: JSON.stringify(animalPlace)}),
            ...(animalBreed && {idAnimalBreed: animalBreed}),
            ...(animalTypeId && {idAnimalCategories: animalTypeId}),
            ...(priceRange[0] && {priceMin: priceRange[0]}),
            ...(priceRange[1] && {priceMax: priceRange[1]}),
        }))
        setTotal(data.total)
        stop()
    }, [dispatch, animalTypeId, animalBreed, priceRange, city, animalPlace])
    useEffect(refreshData,[refreshData])
    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}  keyboardShouldPersistTaps="handled">
            <CustomHeader goBackAction={navigation.goBack} hasBackButton={true} title={"Параметры"}/>
            <ContentView style={{flex:1}}>
                <TouchableOpacity onPress={() => {
                    setCityPanelOpened(true)
                }} style={styles.input}>
                    <Text>{cityName.length === 0 ? "Область, город, населеный пункт" : cityName}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setPricePanelOpened(true)
                }} style={styles.input}>
                    <Text style={styles.priceFilterSmall}>Цена, руб.</Text>
                    <Text>{priceRange.every(el => el === null) ? "Любая" : `от ${priceRange[0]} до ${priceRange[1]}`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setBreedPanelOpened(true)
                }} style={styles.input}>
                    <Text>Тип животного{animalTypeName.length !== 0 ? `: ${animalTypeName}` : ""}</Text>
                </TouchableOpacity>
                <PlaceFilter selectedValues={animalPlace} onChange={(places) => {
                    setAnimalPlace(places)
                }} style={{marginTop: 20}} title={"Откуда животное:"}/>
                <View style={{
                  flex:1,
                    justifyContent: "flex-end",
                    marginBottom: 20
                }}>
                    <CustomButton loading={loading} title={`Показать ${total} предложений`} onClick={() => {
                        navigation.navigate("searchResults",{
                            ...(animalPlace.length !== 0 && {idAnimalPlace: animalPlace}),
                            ...(animalBreed && {idAnimalBreed: animalBreed}),
                            ...(animalTypeId && {idAnimalCategories: animalTypeId}),
                            ...(priceRange[0] && {priceMin: priceRange[0]}),
                            ...(priceRange[1] && {priceMax: priceRange[1]}),
                            searchName:"Результаты поиска:",
                            breedName:animalTypeName,
                            numberAds:46,
                        })
                    }}/>
                </View>
            </ContentView>
            </KeyboardAwareScrollView>

            <CityPanel closePanelAction={() => {
                setCityPanelOpened(false)
            }} opened={cityPanelOpened} onSelect={ (id, name) => {
                 setCity(id)
                 setCityName(name)
                 setCityPanelOpened(false)

            }}/>
            <PricePanel closePanelAction={() => {
                setPricePanelOpened(false)
            }} opened={pricePanelOpened} priceRange={priceRange} onDone={ (from, to) => {
                 setPriceRange([from, to])
                 setPricePanelOpened(false)

            }}/>
            <AnimalBreedPanel selectedId ={animalBreed} closePanelAction={() => {
                setBreedPanelOpened(false)
            }} opened={breedPanelOpened} onSelect={(id, name) => {
                setAnimalBreed(id)
                setAnimalTypeName(name)
                setBreedPanelOpened(false)
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    typePicker: {
        paddingTop: 18,
        paddingBottom: 18,
        borderTopWidth: 1,
        borderTopColor: "#F6F4F0"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#E7E7E7",
        height: 45,
        marginTop: 10,
        paddingBottom: 10,
        fontSize: 14,
        justifyContent: "center"
    },
    priceFilterSmall: {
        fontSize: 10,
        color: "#949290",
        marginBottom: 3
    }
})

export default AdditionFilter;