import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet, ScrollView} from "react-native";
import ContentView from "../../components/ContentView";
import CustomHeader from "../../components/CustomElements/CustomHeader";
import {useDispatch, useSelector} from "react-redux";
import useLoading from "../../hooks/useLoading";
import {getUserAnimals} from "../../store/actions/userActions";
import LoadingView from "../../components/CustomElements/LoadingView";
import UserAnimalTypeFilter from "../../components/Filters/UserAnimalsTypeFilter";
import CustomButton from "../../components/CustomElements/CustomButton";
import {useRefresh} from "../../hooks/useRefresh";
import {useFocusEffect} from "@react-navigation/native";

function UserAnimals({navigation, route}, props) {
    const dispatch = useDispatch()
    const userAnimals = useSelector(state => state.user.userAnimals)
    const [status, setStatus] = useState(null)
    const {refresh} = useRefresh()
    const {start, stop, loading} = useLoading()
    const actives = useMemo(() => {
        if (userAnimals) {
            return userAnimals.filter(el => el.adStatus == "Активный").length
        }
        return []
    }, [userAnimals])
    const checking = useMemo(() => {
        if (userAnimals) {
            return userAnimals.filter(el => el.adStatus == "На проверке").length
        }
        return []
    }, [userAnimals])
    const archive = useMemo(() => {
        if (userAnimals) {
            return userAnimals.filter(el => el.adStatus == "Архив").length
        }
        return []
    }, [userAnimals])

    const refused = useMemo(() => {
        if (userAnimals) {
            return userAnimals.filter(el => el.adStatus == "Отклонено").length
        }
        return []
    }, [userAnimals])
    const filteredValues = useMemo(() => {
        switch (status) {
            case null:
                return userAnimals
            default:
                if (userAnimals) {
                    return userAnimals.filter(el => el.adStatus === status)
                }
                return []

        }
    }, [userAnimals, status])
    const fetch = useCallback(async () => {
        start()
        const data = await dispatch(getUserAnimals())
        stop()
    }, [dispatch])
    useEffect(()=>{
        const unsubscribe = navigation.addListener("focus",()=>{
            fetch()
            setStatus(route.params?.status || null)
        })

        return unsubscribe
    }, [fetch, navigation, route])
    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, backgroundColor: "white"}}>
                <CustomHeader hasBackButton={true}
                              title={"Мои объявления"}
                              goBackAction={navigation.goBack}/>
                {loading ? <LoadingView/> : <ContentView>
                    <UserAnimalTypeFilter refused={refused} actives={actives} selectedStatus={status} checking={checking} archive={archive}
                                          onChange={(status) => {
                                              setStatus(status)
                                          }}/>

                    {userAnimals ? <View style={styles.cardHolder}>
                        {filteredValues && filteredValues.map(el => {
                            return(
                            <View key={el.idAd}>
                                <TouchableOpacity  onPress={() => {
                                    navigation.navigate("animalInfo", {
                                        id: el.idAd,
                                        status:status,
                                        previousScreen:"userAnimals"
                                    })
                                }
                                } style={styles.card}>
                                    <Image style={styles.cardImage} source={{uri: el.imagePreview}}/>
                                    <View style={styles.cardTextWrapper}>
                                        <Text style={styles.cardTitle}>{el.namePet}</Text>
                                        <Text style={styles.cardPrice}>{el.price} руб.</Text>
                                    </View>
                                </TouchableOpacity>
                                {el.reasonRefusal &&
                                    <View style={{marginLeft:110}}>
                                        <Text>Причина отклонения:</Text>
                                        <Text style={{color:"red", marginTop:2}}>{el.reasonRefusal}</Text>
                                    </View>
                                }
                            </View>)

                        })}

                    </View> : <View style={styles.createWrapper}>
                        <Text style={styles.createText}>У вас еще нет ни одного объявления.</Text>
                        <CustomButton onClick={() => {
                            navigation.navigate("createAd")
                        }} style={{marginTop: 40}} title={"Разместить объявление"}/>
                    </View>}

                </ContentView>}

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    createWrapper: {
        marginTop: 60,
        alignItems: "center"
    },
    createText: {
        fontSize: 16,
        width: "60%",
        textAlign: "center"
    },
    cardHolder: {
        width: "100%",
        marginTop: 10
    },

    card: {
        width: "100%",
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center"
    },

    cardImage: {
        width: 82,
        height: 82,
        borderRadius: 14,
        resizeMode: "cover"
    },

    cardTextWrapper: {
        marginLeft: 30,
    },
    cardTitle: {
        fontSize: 16,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5
    }


})

export default UserAnimals;