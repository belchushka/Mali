import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Dimensions} from "react-native";
import CustomHeader from "../components/CustomElements/CustomHeader";
import ContentView from "../components/ContentView";
import CustomButton from "../components/CustomElements/CustomButton";
import CircledIcon from "../components/CustomElements/CircledIcon";
import Inst from "../media/Icons/Inst.svg"

function AnimalTranportation({navigation},props) {
    return (
        <View>
            <CustomHeader hasBackButton={true} title={"Перевозка животных"} goBackAction={navigation.goBack} />
           <ContentView style={{backgroundColor:"white", height:Dimensions.get("window").height}}>
               <Text style={styles.textBold}>Перевозка животных по всей России.</Text>
               <Text style={styles.textInfo}>В нашей компании <Text style={{color:"#F6A405"}}>MALI</Text> есть перевозчики, которые сами имеют животных и очень их любят.
                   Они накормят, выгуляют и приласкают ваших драгоценных любимцев. Помимо обычного
                   не специализированного транспорта для домашних животных, вы можете заказать на нашем сайте профессиональную коневозку для перевозки лошадей или специальный скотовоз для перевозки свиней или овец. Для этого вам нужно просто разместить запрос, а все остальное мы сделаем
                   за вас.</Text>
               <View style={styles.actionView}>
                   <CustomButton title={"Позвонить"} style={{width:220}} />
                   <CircledIcon style={{marginLeft:20}} image={Inst}/>
               </View>
           </ContentView>
        </View>
    );
}

const styles = StyleSheet.create({
    textBold:{
        fontSize:18,
        fontWeight:"bold",
        marginTop:24,
    },
    textInfo:{
        marginTop:28,
        fontSize:14,
        lineHeight:22
    },
    actionView:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:28
    }
})

export default AnimalTranportation;