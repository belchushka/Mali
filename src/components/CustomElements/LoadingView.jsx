import React from 'react';
import {ActivityIndicator, View} from "react-native";

function LoadingView(props) {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator size={"large"} color={"#F6A405"} />
        </View>
    );
}

export default LoadingView;