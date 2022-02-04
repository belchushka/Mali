import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import SearchBar from "../components/SearchBar";
import Cat from "../media/Animals/Cat.png"

function Home(props) {
    return (
        <ScrollView >
            <SearchBar/>
            <View style={styles.cardHolder}>
                <TouchableOpacity style={styles.animalCard}>
                    <View>
                        <Image  style={styles.animalCardImage} source={Cat} />
                        <Text style={styles.animalCardText}>Кошки</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.animalCard}>
                    <View>
                        <Image  style={styles.animalCardImage} source={Cat} />
                        <Text style={styles.animalCardText}>Кошки</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.animalCard}>
                    <View>
                        <Image  style={styles.animalCardImage} source={Cat} />
                        <Text style={styles.animalCardText}>Кошки</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    animalCardImage:{
        width:178,
        height:178,
    },
    animalCardText:{
        position:"absolute",
        bottom:18,
        left:18,
        color:"white",
        fontSize:16
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
    }
})

export default Home;