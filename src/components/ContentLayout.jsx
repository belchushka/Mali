import React from 'react';
import CustomHeader from "./CustomElements/CustomHeader";
import {Dimensions, ScrollView, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ContentView from "./ContentView";

function ContentLayout({children, style},props) {
    return (
        <View style={[{flex:1, backgroundColor:"white"}, style]}>
            <KeyboardAwareScrollView>
                {children}
            </KeyboardAwareScrollView>
        </View>
    );
}

export default ContentLayout;