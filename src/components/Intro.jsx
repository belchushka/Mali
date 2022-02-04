import React from 'react';
import {AsyncStorage, Image, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IntroPageOne from "../media/Intro/IntroPageOne.png"
import IntroPageTwo from "../media/Intro/IntroPageTwo.png"
import App from "../../App";

const slides = [
    {
        key: 'one',
        text: 'Находите домашних животных\n' +
            'по всей России!',
        image: IntroPageOne,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'two',
        text: 'Размещайте объявления \nдомашних животных по всей \nРоссии!',
        image: IntroPageTwo,
        backgroundColor: '#febe29',
    },
];

const styles = StyleSheet.create({
    intoImage: {
        width:"100%",
        height:500,
        resizeMode:"cover",

    },

    slideView:{
        backgroundColor:"#F6A405"
    },

    introTextWrapper:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center"
    },

    introText:{
        color:"white",
        fontSize:20,
        marginTop:30,
        lineHeight:30
    }
})

class Intro extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showRealApp:   false
        }
        this.navigation = props.navigation
    }

    _renderItem = ({item}) => {
        return (
            <View>
                <Image style={styles.intoImage} source={item.image}/>
                <View style={styles.introTextWrapper}>
                    <Text style={styles.introText} >{item.text}</Text>
                </View>

            </View>
        );
    }
    _onDone = async () => {
       await AsyncStorage.setItem("firstTime","false")
        this.navigation.navigate("home")
    }



    render() {
        if (this.state.showRealApp) {
            return <App/>;
        } else {
            return <AppIntroSlider
                style={styles.slideView}
                nextLabel={"Пропустить"}
                doneLabel={"Начать"}
                renderItem={this._renderItem}
                data={slides}
                styl
                onDone={this._onDone}
                dotStyle={{
                    width:4,
                    height:4,
                    backgroundColor:"rgba(255,255,255,0.67)",
                    marginLeft:16
                }}
                activeDotStyle={{
                    width:12,
                    height:4,
                    backgroundColor:"#ffffff",
                    marginLeft:16
                }}
            />;
        }
    }
}

export default Intro