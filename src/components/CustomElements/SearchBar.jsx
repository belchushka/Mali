import React from 'react';
import {TextInput, View,StyleSheet, Image} from "react-native";
import SearchIcon from "../../media/Icons/Search.svg"
import SvgUri from "react-native-svg-uri";

function SearchBar({style},props) {
    return (
        <View style={[style,{marginTop:12, marginBottom:32, paddingLeft:12, paddingRight:12}]}>
            <View style={styles.searchIcon}>
                <SvgUri width={16} height={16} source={SearchIcon}/>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder={"Поиск"}
                placeholderTextColor="#777777"
            />

        </View>
    );
}


const styles = StyleSheet.create({
    searchIcon:{
        position:"absolute",
        top:"36%",
        right:30,
        width:15,
        height:15,
        elevation:11
    },
    searchInput: {
        paddingLeft:16,
        paddingRight:36,
        paddingTop:14,
        paddingBottom:14,
        backgroundColor:"#ffffff",
        fontSize:15,
        borderRadius:10,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 },
        elevation:10,
    },


});

export default SearchBar;