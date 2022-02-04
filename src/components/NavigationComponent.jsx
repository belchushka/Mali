import {AsyncStorage, View} from "react-native";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setFirstTime} from "../store/actions/userActions";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import Intro from "./Intro";
import Home from "../screens/Home";


const NavigationWrapper = ()=>{
    const dispatch = useDispatch()
    const firstTime = useSelector(state=>state.user.firstTime)
    const Stack = createNativeStackNavigator()
    useEffect(async ()=>{
        const firstTime = await AsyncStorage.getItem("firstTime") || true
        dispatch(setFirstTime(firstTime))
    })
    return <NavigationWrapper>
        <Stack.Navigator>
            <Stack.Screen name={"introduction"} component={Intro} />
            <Stack.Screen name={"home"} component={Home} />
        </Stack.Navigator>
    </NavigationWrapper>
}

export default NavigationWrapper