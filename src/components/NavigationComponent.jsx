import {Text, TouchableOpacity, View} from "react-native";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setFirstTime, setLoggedIn, setUserData} from "../store/actions/userActions";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import Intro from "./Intro";
import Catalog from "../screens/Catalog";
import {NavigationContainer} from "@react-navigation/native";
import {AsyncStorage} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SvgUri from "react-native-svg-uri";
import HomeActive from "../media/Icons/HomeActive.svg"
import HomeInactive from "../media/Icons/HomeInactive.svg"
import ProfileActive from "../media/Icons/ProfileActive.svg"
import ProfileInactive from "../media/Icons/ProfileInactive.svg"
import AnimalTranportation from "../screens/AnimalTranportation";
import Profile from "../screens/Profile";
import Policy from "../screens/Policy";
import AnimalFilter from "../screens/AnimalFilter";
import SearchResults from "../screens/SearchResults";
import AdditionFilter from "../screens/AdditionFilter";
import AnimalInfo from "../screens/AnimalInfo";
import userAnimals from "../screens/UserAnimals";

function HomeTabs() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor:"#F6A405",
            tabBarLabelStyle:{
                fontSize:12
            },
            headerShown:false
        }} >
            <Tab.Screen options={{
                tabBarLabel:"Каталог",
                tabBarIcon: ({ focused}) => (
                        <SvgUri
                            width="20"
                            height="20"
                            source={focused ? HomeActive:HomeInactive}
                        />

                ),
            }} name="home" component={Catalog} />

            <Tab.Screen options={{
                tabBarLabel:"Профиль",
                tabBarIcon: ({ focused}) => (
                        <SvgUri
                            width="20"
                            height="20"
                            source={focused ? ProfileActive:ProfileInactive}
                        />
                ),
            }} name="profile" component={Profile} />
        </Tab.Navigator>
    );
}


const NavigationComponent = ()=>{
    const dispatch = useDispatch()
    const firstTime = useSelector(state=>state.user.firstTime)
    const Stack = createNativeStackNavigator()
    useEffect(async ()=>{
        const firstTime = await AsyncStorage.getItem("firstTime") !== "false"
        const loggedIn = await AsyncStorage.getItem("loggedIn") !== "false"
        const userData = await AsyncStorage.getItem("userData")
        dispatch(setUserData(userData ? JSON.parse(userData) : {}))
        dispatch(setFirstTime(firstTime))
        dispatch(setLoggedIn(loggedIn))
    })
    return <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}}  initialRouteName={firstTime ? "introduction" : "home"} >
            {firstTime && <Stack.Screen name={"introduction"} component={Intro} />}
            <Stack.Screen name={"home"} component={HomeTabs} />
            <Stack.Screen  name={"animalTransportation"} component={AnimalTranportation} />
            <Stack.Screen  name={"policy"} component={Policy} />
            <Stack.Screen  name={"animalFilter"} component={AnimalFilter} />
            <Stack.Screen  name={"searchResults"} component={SearchResults} />
            <Stack.Screen  name={"additionalFilter"} component={AdditionFilter}  />
            <Stack.Screen  name={"animalInfo"} component={AnimalInfo}  />
            <Stack.Screen  name={"userAnimals"} component={userAnimals}  />
        </Stack.Navigator>
    </NavigationContainer>
}


export default NavigationComponent