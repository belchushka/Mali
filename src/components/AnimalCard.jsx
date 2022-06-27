import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";
import Shadow from "../media/Animals/Shadow.png"
import useLoading from "../hooks/useLoading";

function AnimalCard({text, image,  onClick, clickable=true},props) {
    const {start, stop, loading} = useLoading()

    return (<>
            {clickable ? <TouchableOpacity onPress={onClick} style={styles.animalCard}>
                <View>
                    {loading?
                        <ActivityIndicator size="large"  color={"#F6A405"} style={{
                            position:"absolute",
                            elevation:5,
                            top:"40%",
                            left:"40%",
                        }} />:
                        <></>
                    }
                    <Image  style={styles.animalCardImage} source={{
                        uri:image
                    }} fadeDuration={200} onLoadStart={()=>{start()}} onLoadEnd={()=>{stop()}}/>
                    <Image style={styles.animalCardShadow} source={Shadow} />
                    <Text style={styles.animalCardText}>{text}</Text>
                </View>
            </TouchableOpacity> :<View style={styles.animalCard}>
                <View>
                    {loading?
                        <ActivityIndicator size="large"  color={"#F6A405"} style={{
                            position:"absolute",
                            elevation:5,
                            top:"40%",
                            left:"40%",
                        }} />:
                        <></>
                    }
                    <Image  style={styles.animalCardImage} source={{
                        uri:image
                    }} fadeDuration={200} onLoadStart={()=>{start()}} onLoadEnd={()=>{stop()}}/>
                    <Image style={styles.animalCardShadow} source={Shadow} />
                    <Text style={styles.animalCardText}>{text}</Text>
                </View>
            </View> }
    </>


    );
}

const styles = StyleSheet.create({
    animalCardImage:{
        width:Dimensions.get("window").width/2.2,
        height:Dimensions.get("window").width/2.2,
          borderRadius:20
    },
    animalCardText:{
        position:"absolute",
        bottom:18,
        left:18,
        color:"white",
        fontSize:14
    },
    cardHolder:{
        paddingLeft:12,
        paddingRight:12,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between",
        marginTop:-13
    },
    animalCard:{
        marginTop:13
    },
    animalCardShadow:{
        position:"absolute",
        width:Dimensions.get("window").width/2.2,
        height:Dimensions.get("window").width/2.2,
    }
})

export default AnimalCard;
