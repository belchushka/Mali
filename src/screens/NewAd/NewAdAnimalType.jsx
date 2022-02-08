import React, {useCallback, useEffect} from 'react';
import {ScrollView, Text, View} from "react-native";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import AnimalTypes from "../../components/Selects/AnimalTypes";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentAnimalTypeIdAndName} from "../../store/actions/animalActions";
import QuestionBlock from "../../components/CustomElements/QuestionBlock";
import Alert from "../../media/Icons/Alert.svg";

function NewAdAnimalType({navigation}, props) {
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.user.loggedIn)
    const goNext = useCallback(async (id, name) => {
        await dispatch(setCurrentAnimalTypeIdAndName({id, name}))
        navigation.navigate("newAdBreed")
    }, [dispatch])

    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <CustomHeader hasBackButton={false} title={"Новое объявление"}/>
            <ContentView style={{flex: 1}}>
                {loggedIn ? <AnimalTypes onSelect={(id, name) => {
                        goNext(id, name)
                    }} underlineBottom={true} style={{marginTop: 0}}/> :
                    <ScrollView><QuestionBlock style={{marginTop: 20}} title={"Необходимо зайти в аккаунт"}
                                               text={"Чтобы разместить объявление необходимо авторизоваться в профиле"}
                                               buttonText={"Перейти в профиль"} onButtonClick={() => {
                        navigation.navigate("profile", {opened:true})
                    }} icon={Alert}/></ScrollView>}

            </ContentView>
        </View>
    );
}

export default NewAdAnimalType;