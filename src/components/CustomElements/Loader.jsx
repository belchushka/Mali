
import React from "react";
import {View, Animated, Easing } from "react-native";
import loader from "../../media/Icons/Loader.png";
export const Loader = ({style}) => {
    let spinValue = new Animated.Value(0);

    // First set up animation
    Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
    }).start();

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",...style }}>
            <Animated.Image
                style={{ transform: [{ rotate: spin }], width: 30, height: 30 }}
                source={loader}
            />
        </View>
    );
};