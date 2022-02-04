import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ContentView from "../components/ContentView";
import CustomHeader from "../components/CustomElements/CustomHeader";
import QuestionBlock from "../components/CustomElements/QuestionBlock";
import Alert from "../media/Icons/Alert.svg";
import {SwipeablePanel} from "rn-swipeable-panel";
import Authorization from "../components/Authorization";
import {useDispatch, useSelector} from "react-redux";
import SvgUri from "react-native-svg-uri";
import NextIcon from "../media/Icons/Next.svg"
import {exitUser} from "../store/actions/userActions";

function Profile({navigation},props) {
    const loggedIn = useSelector(state=>state.user.loggedIn)
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        closeOnTouchOutside:true,
        showCloseButton:true
    });
    const dispatch = useDispatch()
    const [isPanelActive, setIsPanelActive] = useState(false);
    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    const exit = useCallback(async ()=>{
        const exit = await dispatch(exitUser())
        if(exit){
            navigation.navigate("home")
        }
    },[])
    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <CustomHeader title={"Личный кабинет"} hasBackButton={true} goBackAction={navigation.goBack}/>
            <ContentView style={{height:315}}>
                {loggedIn ?
                    <>
                        <TouchableOpacity style={styles.profileElement} onPress={()=>{navigation.navigate("userAnimals")}}>
                            <Text style={styles.profileElementText}>Мои объявления</Text>
                            <SvgUri  source={NextIcon} width={9} height={14}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileElement}>
                            <Text style={styles.profileElementText}>Профиль</Text>
                            <SvgUri  source={NextIcon} width={9} height={14}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileElement} onPress={exit}>
                            <Text style={styles.profileElementText}>Выйти</Text>
                        </TouchableOpacity>
                    </>



                    : <QuestionBlock style={{marginTop:20}} title={"Необходимо зайти в аккаунт"} text={"Чтобы пользоваться профилем, нужно войти\n" +
                    "в свой аккаунт или создать новый"} onButtonClick={openPanel} buttonText={"Зарегистрироваться"} icon={Alert}/>}


            </ContentView>
            {!loggedIn && <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <Authorization navigation={navigation}/>
            </SwipeablePanel>}
        </View>
    );
}

const styles = StyleSheet.create({
    profileElement:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:58,
        borderBottomWidth:1,
        borderBottomColor:"#F6F4F0"
    },
    profileElementText:{
        fontSize:16
    }
})
export default Profile;