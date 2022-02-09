import React from 'react';
import {Dimensions, ScrollView} from "react-native";
import ContentView from "./ContentView";

function ContentWrapper({children, stretch = false,stretchType="nav"},props) {
    return (
        <ContentView style={[{flex: 1}, stretch && (stretchType==="nav" ? {height:Dimensions.get("window").height-108} :{height:Dimensions.get("window").height-60}) ]}>
            <ScrollView>
                {children}
            </ScrollView>
        </ContentView>
    );
}

export default ContentWrapper;