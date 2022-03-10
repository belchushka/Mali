import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Dimensions} from "react-native";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import ContentView from "../../components/ContentView";
import CustomButton from "../../components/CustomElements/CustomButton";
import CircledIcon from "../../components/CustomElements/CircledIcon";
import Inst from "../../media/Icons/Inst.svg"
import Telegram from "../../media/Icons/Telegram.svg"
import {Linking} from 'react-native'
import ErrorModal from "../../components/Modals/ErrorModal";


function AnimalTranportation({navigation},props) {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <View>
            <CustomHeader hasBackButton={true} title={"Перевозка животных"} goBackAction={navigation.goBack} />
           <ContentView style={{backgroundColor:"white", height:Dimensions.get("window").height}}>
               <Text style={styles.textBold}>Перевозка животных по всей России.</Text>
               <Text style={styles.textInfo}>Наша компания <Text style={{color:"#F6A405"}} onPress={() => Linking.openURL('https://feival.ru')}>Feival</Text> предоставляет услуги трансфера для ваших питомцев. Мы поможем доставить вашего друга в любую точку города или даже страны, различными видами транспорта. Во время путешествия предложим напитки и подкрепиться, сопроводим во время выгула, приложим максимальные условия для безопасности транспортировки.</Text>
               <View style={styles.actionView}>
                   <CustomButton onClick={()=>{setModalVisible(true)}} title={"Написать"} style={{width:220}} />
                   <TouchableOpacity onPress={()=>{
                       Linking.openURL("https://www.instagram.com/ooo_feival/?r=nametag")
                   }}>
                       <CircledIcon width={20} height={20}  style={{marginLeft:20}} image={Inst}/>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{
                       Linking.openURL("https://t.me/oooFeival")
                   }}>
                       <CircledIcon width={20} height={20}  style={{marginLeft:20}} image={Telegram}/>
                   </TouchableOpacity>

               </View>
           </ContentView>
            <ErrorModal close={()=>{
                setModalVisible(false)

            }} title={"Написать"} descriptionTitle={"Ваше сообщение"} visible={modalVisible}/>
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