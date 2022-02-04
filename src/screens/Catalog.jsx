import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import SearchBar from "../components/CustomElements/SearchBar";
import AnimalCard from "../components/AnimalCard";
import QuestionBlock from "../components/CustomElements/QuestionBlock";
import ContentView from "../components/ContentView";
import MailIcon from "../media/Icons/Mail.svg";
import {useDispatch, useSelector} from "react-redux";
import {getAnimalTypes, setCurrentAnimalTypeId, setCurrentAnimalTypeIdAndName} from "../store/actions/animalActions";
import useLoading from "../hooks/useLoading";

function Catalog({navigation}, props) {
    const dispatch = useDispatch()
    const [animalTypes, setAnimalTypes] = useState([])
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalTypes())
            setAnimalTypes(data)
            stop()
        } catch (e) {

        }
    }, [dispatch])
    useEffect(fetch, [fetch])
    return (
        <ScrollView style={styles.catalogView}>
            <SearchBar/>
            <ContentView>
                {loading ? <ActivityIndicator size={"large"} color={"#F6A405"} />:
                    <View style={styles.cardHolder}>
                        {animalTypes.map(el=>{
                            if(el.id === 6){
                                return <AnimalCard key={el.id} text={el.name} onClick={() => {
                                    navigation.navigate("animalTransportation")
                                }} image={el.src}/>
                            }
                            return <AnimalCard key={el.id} text={el.name} image={el.src} onClick={()=>{
                                dispatch(setCurrentAnimalTypeIdAndName({id:el.id, name:el.name}))
                                console.log("typeSet", el.id);
                                navigation.navigate("animalFilter")
                            }
                            }/>

                        })}


                    </View>
                }

                <QuestionBlock title={"Возник вопрос?"} text={"Напишите нам и мы ответим вам\n" +
                    "                в ближайшее время."} buttonText={"Написать"} icon={MailIcon} style={{
                    marginTop: 50,
                    marginBottom: 50,
                }} iconHeight={12} iconWidth={16}/>
            </ContentView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cardHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: -13
    },

    catalogView: {
        backgroundColor: "#F6F4F0",
    }
})

export default Catalog;