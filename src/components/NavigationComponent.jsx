import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setFirstTime, setLoggedIn, setUserData} from "../store/actions/userActions";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import Intro from "./Intro";
import Catalog from "../screens/Animal/Catalog";
import {NavigationContainer} from "@react-navigation/native";
import {AsyncStorage} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SvgUri from "react-native-svg-uri";
import HomeActive from "../media/Icons/HomeActive.svg"
import HomeInactive from "../media/Icons/HomeInactive.svg"
import ProfileActive from "../media/Icons/ProfileActive.svg"
import ProfileInactive from "../media/Icons/ProfileInactive.svg"
import AnimalTransportation from "../screens/Animal/AnimalTransportation";
import Profile from "../screens/User/Profile";
import Policy from "../screens/User/Policy";
import AnimalFilter from "../screens/Animal/AnimalFilter";
import SearchResults from "../screens/Animal/SearchResults";
import AdditionFilter from "../screens/Animal/AdditionFilter";
import AnimalInfo from "../screens/Animal/AnimalInfo";
import userAnimals from "../screens/User/UserAnimals";
import userInfo from "../screens/User/UserInfo";
import userPicture from "../screens/User/UserPicture";
import CreateAdInactive from "../media/Icons/CreateAdInactive.svg"
import CreateAdActive from "../media/Icons/CreateAdActive.svg"
import NewAdAnimalType from "../screens/NewAd/NewAdAnimalType";
import NewAdAnimalBreed from "../screens/NewAd/NewAdAnimalBreed";
import NewAdAppearance from "../screens/NewAd/NewAdAppearance";
import NewAdName from "../screens/NewAd/NewAdName";
import NewAdContacts from "../screens/NewAd/NewAdContacts";
import useLoading from "../hooks/useLoading";
import LoadingView from "./CustomElements/LoadingView";
import AdminAnimal from "../screens/Animal/AdminAnimal";

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
    const {start, stop, loading} = useLoading()
    useEffect(async () => {
        start()
        const firstTime = await AsyncStorage.getItem("firstTime") !== "false"
        const loggedIn = await AsyncStorage.getItem("loggedIn")
        const userData = await AsyncStorage.getItem("userData")
        dispatch(setUserData(userData ? JSON.parse(userData) : {}))
        dispatch(setFirstTime(firstTime))
        dispatch(setLoggedIn(loggedIn))
        stop()
    },[])
    return <>
        {loading ? <LoadingView/> :
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}  initialRouteName={firstTime ? "introduction" : "home"}>
                    {firstTime && <Stack.Screen name={"introduction"} component={Intro}/>}
                    <Stack.Screen name={"home"} component={HomeTabs}/>
                    <Stack.Screen name={"animalTransportation"} component={AnimalTransportation}/>
                    <Stack.Screen name={"policy"} component={Policy}/>
                    <Stack.Screen name={"animalFilter"} component={AnimalFilter}/>
                    <Stack.Screen name={"searchResults"} component={SearchResults}/>
                    <Stack.Screen name={"additionalFilter"} component={AdditionFilter}/>
                    <Stack.Screen name={"animalInfo"} component={AnimalInfo}/>
                    <Stack.Screen name={"userAnimals"} component={userAnimals}/>
                    <Stack.Screen name={"userInfo"} component={userInfo}/>
                    <Stack.Screen name={"userPicture"} component={userPicture}/>
                    <Stack.Screen name={"newAdBreed"} component={NewAdAnimalBreed}/>
                    <Stack.Screen name={"newAdAppearance"} component={NewAdAppearance}/>
                    <Stack.Screen name={"newAdName"} component={NewAdName}/>
                    <Stack.Screen name={"newAdContacts"} component={NewAdContacts}/>
                    <Stack.Screen name={"adminAnimal"} component={AdminAnimal}/>
                </Stack.Navigator>
            </NavigationContainer>
        }
    </>

}


export default NavigationComponent