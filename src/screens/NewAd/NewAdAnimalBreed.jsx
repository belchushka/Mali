import React, {useCallback} from 'react';
import {View} from "react-native";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import AnimalBreeds from "../../components/Selects/AnimalBreeds";
import {setNewAdData} from "../../store/actions/animalActions";
import {useDispatch} from "react-redux";

function NewAdAnimalBreed({navigation},props) {
    const dispatch = useDispatch()
    const goNext = useCallback(async (id,name)=>{
        await dispatch(setNewAdData({
            idAnimalBreed:id
        }))
        navigation.navigate("newAdAppearance")
    },[dispatch])
    return (
       <View style={{flex:1, backgroundColor:"white"}}>
           <CustomHeader title={"Выберите подкатеогрию"} hasBackButton={true} goBackAction={navigation.goBack}/>
           <ContentView style={{flex:1}}>
               <AnimalBreeds onSelect={(id,name)=>{
                   goNext(id,name)
               }} style={{marginTop:0}} underlineBottom={true} />
           </ContentView>
       </View>
    );
}

export default NewAdAnimalBreed;