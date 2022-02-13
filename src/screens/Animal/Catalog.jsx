import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import SearchBar from "../../components/CustomElements/SearchBar";
import AnimalCard from "../../components/AnimalCard";
import QuestionBlock from "../../components/CustomElements/QuestionBlock";
import ContentView from "../../components/ContentView";
import MailIcon from "../../media/Icons/Mail.svg";
import {useDispatch, useSelector} from "react-redux";
import {getAnimalTypes, setCurrentAnimalTypeIdAndName} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import ContentLayout from "../../components/ContentLayout";
import ContentWrapper from "../../components/ContentWrapper";
import ErrorModal from "../../components/Modals/ErrorModal";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

function Catalog({navigation}, props) {
    const dispatch = useDispatch()
    const [modalVisible,setModalVisible] = useState(false)
    const animalTypes = useSelector(state=>state.animal.types)
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalTypes())
            stop()
        } catch (e) {

        }
    }, [dispatch])

    useEffect(fetch, [fetch])
    return (
        <View style={{flex:1}}>
            <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}  keyboardShouldPersistTaps="handled">
                <SearchBar/>
                <ContentView style={{flex:1}}>
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
                                    navigation.navigate("animalFilter")
                                }
                                }/>

                            })}


                        </View>
                    }
                    <QuestionBlock title={"Возник вопрос?"} text={"Напишите нам и мы ответим вам \n в ближайшее время."} buttonText={"Написать"} onButtonClick={()=>{
                        setModalVisible(true)
                    }} icon={MailIcon} style={{
                        marginTop: 50,
                        marginBottom: 50,
                    }} iconHeight={12} iconWidth={16}/>
                </ContentView>
                <ErrorModal close={()=>{
                    setModalVisible(false)
                }} visible={modalVisible}/>
            </KeyboardAwareScrollView>
        </View>

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