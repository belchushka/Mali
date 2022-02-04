import {AsyncStorage, LogBox, TextInput} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import store from "./src/store";
import NavigationComponent from "./src/components/NavigationComponent";
TextInput.defaultProps.selectionColor = '#777777'
LogBox.ignoreAllLogs();
export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={{flex: 1}}>
                <NavigationComponent />
            </SafeAreaView>
        </Provider>

    );
}

