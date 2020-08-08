// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-elements";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navigator from "./components/Navigator";
import { AsyncStorage } from "react-native";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import CustomThemeProvider from "./components/CustomThemeProvider";

export default function App() {
    const theme = {
        colors: {
            primary: "#1462c7",
        },
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <Navigator />
                </NavigationContainer>
            </ThemeProvider>
        </Provider>
    );
}
