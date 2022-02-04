import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import ContentView from "../ContentView";
import CustomButton from "../CustomElements/CustomButton";

function PriceFilter({onSubmit,fromPrice,toPrice},props) {
    const [from,setFrom]=useState(fromPrice)
    const [to,setTo]=useState(toPrice)
    console.log(from);
    return (
        <View>
            <ContentView >
                <View style={styles.inputWrapper}>
                    <TextInput value={from} keyboardType='numeric' onChangeText={(val)=>{val.trim().length === 0?setFrom(null):setFrom(val)}} style={styles.rangeInput} placeholder={"От"}/>
                    <TextInput value={to} keyboardType='numeric' onChangeText={(val)=>{val.trim().length === 0?setTo(null):setTo(val)}} style={styles.rangeInput} placeholder={"До"} />
                </View>
                <CustomButton style={{
                    marginTop: 40
                }} title={"Применить"} onClick={()=>{
                    onSubmit(from,to)
                }}/>
            </ContentView>
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper:{
        width:"100%",
        marginTop:20,
    },

    rangeInput:{
        paddingBottom:10,
        fontSize:16,
        height:50,
        borderBottomWidth:1,
        borderBottomColor:"#E7E7E7"
    }
})

export default PriceFilter;