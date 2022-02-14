import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ContentView from "../../components/ContentView";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import QuestionBlock from "../../components/CustomElements/QuestionBlock";
import Alert from "../../media/Icons/Alert.svg";
import {SwipeablePanel} from "rn-swipeable-panel";
import Authorization from "../../components/Authorization";
import {useDispatch, useSelector} from "react-redux";
import SvgUri from "react-native-svg-uri";
import NextIcon from "../../media/Icons/Next.svg"
import {exitUser} from "../../store/actions/userActions";
import ContentLayout from "../../components/ContentLayout";
import ContentWrapper from "../../components/ContentWrapper";
import {useAlert} from "../../hooks/useAlert";
import useLoading from "../../hooks/useLoading";
import LoadingView from "../../components/CustomElements/LoadingView";

function Profile({navigation, route}, props) {
    const loggedIn = useSelector(state => state.user.loggedIn)
    const {start, stop, loading} = useLoading()
    const userData = useSelector(state=>state.user.userData)
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        onlyLarge:true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        closeOnTouchOutside: true,
        showCloseButton: true
    });
    const dispatch = useDispatch()
    const hideCloseButton = useCallback(()=>{

        setPanelProps(state=>{
            return {
                ...state,
                showCloseButton: false
            }
        })
    },[panelProps])
    const showCloseButtonAction = useCallback(()=>{
        setPanelProps(state=>{
            return {
                ...state,
                showCloseButton: true
            }
        })
    },[panelProps])
    const [isPanelActive, setIsPanelActive] = useState(false);
    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    const exit = useCallback(async () => {
        start()
        const exit = await dispatch(exitUser())
        setIsPanelActive(false)
        stop()
        if (exit) {
            navigation.navigate("profile")
        }
    }, [])
    useEffect(()=>{
        setIsPanelActive(route.params?.opened || false)
    },[route.params])
    return <>
        {loading ? <LoadingView /> :
            <ContentLayout>
                <CustomHeader title={"Личный кабинет"} hasBackButton={true} goBackAction={navigation.goBack}/>
                <ContentWrapper stretch={true}>
                    {loggedIn ?
                        <View>
                            {userData.role === 2 && <Text style={{marginTop:10, marginBottom:5, color:"rgba(0,0,0,0.37)",fontSize: 16}}>//admin</Text>}
                            <TouchableOpacity style={styles.profileElement} onPress={() => {
                                navigation.navigate("userAnimals")
                            }}>
                                <Text style={styles.profileElementText}>Мои объявления</Text>
                                <SvgUri source={NextIcon} width={9} height={14}/>
                            </TouchableOpacity>
                            {userData.role === 2 && <TouchableOpacity style={styles.profileElement} onPress={() => {
                                navigation.navigate("adminAnimal")
                            }}>
                                <Text style={styles.profileElementText}>Объявления на проверку</Text>
                                <SvgUri source={NextIcon} width={9} height={14}/>
                            </TouchableOpacity>}

                            <TouchableOpacity style={styles.profileElement} onPress={() => {
                                navigation.navigate("userInfo")
                            }}>
                                <Text style={styles.profileElementText}>Профиль</Text>
                                <SvgUri source={NextIcon} width={9} height={14}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileElement} onPress={exit}>
                                <Text style={styles.profileElementText}>Выйти</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <QuestionBlock style={{marginTop: 20}} title={"Необходимо зайти в аккаунт"}
                                       text={"Чтобы пользоваться профилем, нужно войти\n" +
                                           "в свой аккаунт или создать новый"} onButtonClick={openPanel}
                                       buttonText={"Зарегистрироваться"} icon={Alert}/>
                    }
                </ContentWrapper>
                {
                    !loggedIn && <SwipeablePanel style={{position: "absolute"}} {...panelProps} isActive={isPanelActive}>
                        <Authorization hideCloseButton={hideCloseButton} showCloseButton={showCloseButtonAction} closeAction={closePanel} navigation={navigation}/>
                    </SwipeablePanel>
                }

            </ContentLayout>
        }
    </>

}



const styles = StyleSheet.create({
    profileElement: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 58,
        borderBottomWidth: 1,
        borderBottomColor: "#F6F4F0"
    },
    profileElementText: {
        fontSize: 16
    }
})
export default Profile;