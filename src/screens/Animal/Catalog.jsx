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
import LoadingView from "../../components/CustomElements/LoadingView";

function Catalog({navigation}, props) {
    const dispatch = useDispatch()
    const [modalVisible,setModalVisible] = useState(false)
    const animalTypes = useSelector(state=>state.animal.types)
    console.log(animalTypes);
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalTypes())
            stop()
        } catch (e) {
            console.log(e);
        }
    }, [dispatch])
    useEffect(fetch, [fetch])
    return (
        <View style={{flex:1}}>
            <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}}  keyboardShouldPersistTaps="handled">
                <SearchBar navigation={navigation}/>
                <ContentView style={{flex:1, }}>
                    {loading ? <LoadingView />:
                        <>
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
                            <QuestionBlock title={"???????????? ?????????????"} text={"???????????????? ?????? ?? ???? ?????????????? ?????? \n ?? ?????????????????? ??????????."} buttonText={"????????????????"} onButtonClick={()=>{
                                setModalVisible(true)
                            }} icon={MailIcon} style={{
                                marginTop: 50,
                                marginBottom: 50,
                            }} iconHeight={12} iconWidth={16}/>
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate("policy")
                            }
                            }>
                                <Text  style={{color:"#A1A1A1", fontSize:12, textAlign:'center', textDecorationLine:"underline", textDecorationColor:"#A1A1A1", textDecorationStyle:"solid", marginBottom:20}}>???????????????????????????????? ???????????????????? ?? ???????????????? ??????????????????????????????????</Text>
                            </TouchableOpacity>

                        </>

                    }

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
        backgroundColor: "#F7F4F0",
    }
})

export default Catalog;
