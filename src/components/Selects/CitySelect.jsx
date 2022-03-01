import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    BackHandler,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {getAnimalBreeds, getAnimalCities, getAnimalRegions} from "../../store/actions/animalActions";
import useLoading from "../../hooks/useLoading";
import {useDispatch, useSelector} from "react-redux";
import ContentView from "../ContentView";

function CitySelect({onSelect},props) {
    const regions = useSelector(state=>state.animal.regions)
    const cities = useSelector(state=>state.animal.cities)
    const [step,setStep] = useState(0)
    const dispatch = useDispatch()
    const {start, stop, loading} = useLoading()
    const fetch = useCallback(async () => {
        try {
            start()
            const data = await dispatch(getAnimalRegions())
            stop()
        } catch (e) {

        }
    }, [dispatch])
    const getCities = useCallback(async (id)=>{
        try {
            start()
            const data = await dispatch(getAnimalCities({
                idRegion:id
            }))
            setStep(1)
            stop()
        } catch (e) {

        }
    },[dispatch])
    useEffect(fetch, [fetch])
    useEffect(()=>{
        const backAction = ()=>{
            if(step===1){
                setStep(0)
                return true
            }else if(step===0){
                onSelect(null,"")
                return true
            }

            return false
        }
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
    },[step])
    return (
        <View style={{paddingLeft:12,paddingRight:12}}>
            {loading ? <ActivityIndicator size={"large"} color={"#F6A405"} /> :
                <ScrollView style={styles.breedList}>

                    {step===0 && regions && regions.map(item=>{
                        return <TouchableOpacity key={item.id} style={styles.typePicker} onPress={()=>{
                            getCities(item.id)
                        }
                        }>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    })}

                    {step===1 && cities && cities.map(item=>{
                        return <TouchableOpacity key={item.id} style={styles.typePicker} onPress={()=>{
                            onSelect(item.id,item.name)
                        }
                        }>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    })}
                </ScrollView>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    typePicker:{
        paddingTop:18,
        paddingBottom:18,
        borderTopWidth:1,
        borderTopColor:"#F6F4F0"
    },
    breedList:{
        marginTop:20
    }
})

export default React.memo(CitySelect);