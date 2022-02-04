import React, {useState} from 'react';
import {Dimensions, ScrollView, View} from "react-native";
import ContentView from "../components/ContentView";
import CustomHeader from "../components/CustomElements/CustomHeader";
import QuestionBlock from "../components/CustomElements/QuestionBlock";
import Alert from "../media/Icons/Alert.svg";
import {SwipeablePanel} from "rn-swipeable-panel";
import Authorization from "../components/Authorization";

function Profile({navigation},props) {
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        closeOnTouchOutside:true,
        showCloseButton:true
    });
    const [isPanelActive, setIsPanelActive] = useState(false);

    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };
    return (
        <View style={{height:Dimensions.get("window").height}}>
            <CustomHeader title={"Личный кабинет"} hasBackButton={true} goBackAction={navigation.goBack}/>
            <ContentView style={{height:315}}>
                <QuestionBlock style={{marginTop:20}} title={"Необходимо зайти в аккаунт"} text={"Чтобы пользоваться профилем, нужно войти\n" +
                    "в свой аккаунт или создать новый"} onButtonClick={openPanel} buttonText={"Зарегистрироваться"} icon={Alert}/>

            </ContentView>
            <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <Authorization navigation={navigation}/>
            </SwipeablePanel>
        </View>
    );
}

export default Profile;