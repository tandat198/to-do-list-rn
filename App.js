import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import store from "./redux/store";
import Navigator from "./components/Navigator";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Navigator />
            </NavigationContainer>
        </Provider>
    );
}
