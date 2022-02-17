import React, {useCallback, useEffect, useState} from 'react';
import LoadingView from "../../components/CustomElements/LoadingView";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AnimalInfoLayout from "../../components/AnimalInfoLayout";
import useLoading from "../../hooks/useLoading";
import {useAlert} from "../../hooks/useAlert";
import {approveAnimal, getAdminAnimal, getAnimal, refuseAnimal} from "../../store/actions/animalActions";
import {useDispatch} from "react-redux";
import RefuseModal from "../../components/Modals/RefuseModal";
import QuestionBlock from "../../components/CustomElements/QuestionBlock";
import Alert from "../../media/Icons/Alert.svg";
import CustomHeader from "../../components/CustomElements/CustomHeader";

function AdminAnimal({navigation},props) {
    const {open, close, render} = useAlert()
    const {start, stop, loading} = useLoading()
    const [refuseModalVisible, setRefuseModalVisible] = useState(false)
    const [completed, setCompleted] = useState(false)
    const dispatch = useDispatch()
    const [animalData,setAnimalData] = useState({})
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAdminAnimal())
            if (data==="No content"){
                setCompleted(true)
            }else{
                setAnimalData(data)
            }
            stop()
        } catch (e) {
            open(e, "", () => () => {
                navigation.goBack()
            })
        }
    }, [dispatch])
    const approve = useCallback(async (id)=>{
        try{
            const data = await dispatch(approveAnimal({
                idAd:id
            }))
            open("Объявление успешно подтверждено" ,"", ()=>()=>{
                fetch()
            })
        }catch (e) {
            open("Ошибка",e)
        }

    },[dispatch,fetch])

    const refuse = useCallback(async (id,reason)=>{
        try{
            const data = await dispatch(refuseAnimal({
                idAd:id,
                reasonReject:reason
            }))

            open("Объявление успешно отклонено" ,"", ()=>()=>{
                fetch()
            })
        }catch (e) {
            open("Ошибка",e)
        }

    },[dispatch,fetch])
    useEffect(fetch, [fetch])
    return (
        <>
            {completed &&
                <View style={{flex:1}}>
                    <CustomHeader hasBackButton={true} goBackAction={navigation.goBack}/>
                    <View style={{backgroundColor:"white", flex:1}}>
                        <QuestionBlock style={{marginTop: 20}} title={"Хорошая работа!"}
                                       text={"Объявления на проверку закончились"} showButton={false} icon={Alert}/>
                    </View>

                </View>

            }
            { loading ? <LoadingView/> : !completed && <View style={{flex: 1, backgroundColor: "white"}}>
                    <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
                        <TouchableOpacity style={styles.adminButton} onPress={()=>{
                            setRefuseModalVisible(true)}
                        }>
                            <Text style={styles.adminButtonText}>Отклонить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.adminButton} onPress={()=>{
                            approve(animalData.idAd)
                        }
                        }>
                            <Text style={styles.adminButtonText}>Принять</Text>
                        </TouchableOpacity>
                    </View>
                    <AnimalInfoLayout showErrorAlert={false} navigation={navigation} data={animalData}/>
                    <RefuseModal close={(reason)=>{
                        refuse(animalData.idAd, reason)
                        setRefuseModalVisible(false)
                    }} visible={refuseModalVisible}/>
                </View>}
            {render()}
        </>
    );
}

const styles = StyleSheet.create({
    adminButton:{
        width:"49.9%",
        backgroundColor:"#F6A405",
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:"white"
    },
    adminButtonText:{
        color:"white",
        textAlign:"center"
    }
})

export default AdminAnimal;