import React from 'react';
import {ScrollView, View} from "react-native";

function ContentView({children,style},props) {
    return (
        <View style={[{paddingLeft:12,
            paddingRight:12},style]}>
            {children}
        </View>
    );
}

export default ContentView;