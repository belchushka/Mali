import {AsyncStorage, LogBox, Platform, TextInput, View, StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import store from "./src/store";
import NavigationComponent from "./src/components/NavigationComponent";
import {StatusBar} from "expo-status-bar";
import {useAlert} from "./src/hooks/useAlert";
TextInput.defaultProps.selectionColor = '#777777'
LogBox.ignoreAllLogs();

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
    </View>
);
export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={{flex: 1}}>
                <MyStatusBar backgroundColor="rgba(242,242,242,0.56)" barStyle="light-content" />
                <NavigationComponent />
            </SafeAreaView>
        </Provider>

    );
}
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: '#33373B',
    },
});

