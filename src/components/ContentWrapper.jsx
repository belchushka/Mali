import React from 'react';
import {Dimensions, ScrollView} from "react-native";
import ContentView from "./ContentView";

function ContentWrapper({children, stretch = false},props) {
    return (
        <ContentView style={[{flex: 1}, stretch && {height:Dimensions.get("window").height-108}]}>
            <ScrollView>
                {children}
            </ScrollView>
        </ContentView>
    );
}

export default ContentWrapper;