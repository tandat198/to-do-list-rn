import React, { useEffect, useState } from "react";
import { ThemeProvider } from "react-native-elements";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./Navigator";

export default function CustomThemeProvider() {
    const themeColor = useSelector((state) => state.theme);
    const [theme, setTheme] = useState({
        colors: {
            primary: themeColor,
        },
    });
    useEffect(() => {
        setTheme({
            color: {
                primary: themeColor,
            },
        });
    }, [themeColor]);

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                <Navigator />
            </NavigationContainer>
        </ThemeProvider>
    );
}
