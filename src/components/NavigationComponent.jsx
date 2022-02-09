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
import userInfo from "../screens/UserInfo";
import userPicture from "../screens/UserPicture";
import CreateAdInactive from "../media/Icons/CreateAdInactive.svg"
import CreateAdActive from "../media/Icons/CreateAdActive.svg"
import NewAdAnimalType from "../screens/NewAd/NewAdAnimalType";
import NewAdAnimalBreed from "../screens/NewAd/NewAdAnimalBreed";
import NewAdAppiarance from "../screens/NewAd/NewAdAppiarance";
import NewAdName from "../screens/NewAd/NewAdName";
import NewAdContacts from "../screens/NewAd/NewAdContacts";

function HomeTabs() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#F6A405",
                tabBarLabelStyle: {
                    fontSize: 12
                },
                headerShown: false
            }}>
            <Tab.Screen options={{
                tabBarLabel: "Каталог",

                tabBarIcon: ({focused}) => (
                    <SvgUri
                        width="20"
                        height="20"
                        source={focused ? HomeActive : HomeInactive}
                    />

                ),
            }} name="home" component={Catalog}/>

            <Tab.Screen options={{
                tabBarLabel: "Разместить",
                tabBarIcon: ({focused}) => (
                    <SvgUri
                        width="20"
                        height="20"
                        source={focused ? CreateAdActive : CreateAdInactive}
                    />
                ),
            }} name="createAd" component={NewAdAnimalType}/>

            <Tab.Screen options={{
                tabBarLabel: "Профиль",
                tabBarIcon: ({focused}) => (
                    <SvgUri
                        width="20"
                        height="20"
                        source={focused ? ProfileActive : ProfileInactive}
                    />
                ),
            }} name="profile" component={Profile}/>

        </Tab.Navigator>
    );
}


const NavigationComponent = () => {
    const dispatch = useDispatch()
    const firstTime = useSelector(state => state.user.firstTime)
    const Stack = createNativeStackNavigator()
    useEffect(async () => {
        const firstTime = await AsyncStorage.getItem("firstTime") !== "false"
        const loggedIn = await AsyncStorage.getItem("loggedIn")
        const userData = await AsyncStorage.getItem("userData")
        dispatch(setUserData(userData ? JSON.parse(userData) : {}))
        dispatch(setFirstTime(firstTime))
        dispatch(setLoggedIn(loggedIn))
    })
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}  initialRouteName={firstTime ? "introduction" : "home"}>
            {firstTime && <Stack.Screen name={"introduction"} component={Intro}/>}
            <Stack.Screen name={"home"} component={HomeTabs}/>
            <Stack.Screen name={"animalTransportation"} component={AnimalTranportation}/>
            <Stack.Screen name={"policy"} component={Policy}/>
            <Stack.Screen name={"animalFilter"} component={AnimalFilter}/>
            <Stack.Screen name={"searchResults"} component={SearchResults}/>
            <Stack.Screen name={"additionalFilter"} component={AdditionFilter}/>
            <Stack.Screen name={"animalInfo"} component={AnimalInfo}/>
            <Stack.Screen name={"userAnimals"} component={userAnimals}/>
            <Stack.Screen name={"userInfo"} component={userInfo}/>
            <Stack.Screen name={"userPicture"} component={userPicture}/>
            <Stack.Screen name={"newAdBreed"} component={NewAdAnimalBreed}/>
            <Stack.Screen name={"newAdAppiarance"} component={NewAdAppiarance}/>
            <Stack.Screen name={"newAdName"} component={NewAdName}/>
            <Stack.Screen name={"newAdContacts"} component={NewAdContacts}/>
        </Stack.Navigator>
    </NavigationContainer>
}


export default NavigationComponent