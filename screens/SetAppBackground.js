import React, { useEffect } from "react";
import { AsyncStorage, View } from "react-native";
import { ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import { setTheme } from "../redux/actions";

export default function SetAppBackground({ navigation }) {
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const list = [
        {
            title: "Default",
            hexCode: "#2089dc",
        },
        {
            title: "Grey",
            hexCode: "#616161",
        },
        {
            title: "Pirple",
            hexCode: "#c80afc",
        },
        {
            title: "Pink",
            hexCode: "#ff40b6",
        },
        {
            title: "Green",
            hexCode: "#009e32",
        },
        {
            title: "Orange",
            hexCode: "#ffab3d",
        },
    ];

    const setBackground = async (hexCode) => {
        await AsyncStorage.setItem("theme", hexCode);
        dispatch(setTheme(hexCode));
        navigation.navigate("Setting");
    };

    return (
        <View>
            {list.map((l, i) => (
                <ListItem
                    onPress={() => setBackground(l.hexCode)}
                    key={i}
                    title={l.title}
                    leftElement={<View style={{ width: 20, height: 20, backgroundColor: l.hexCode }} />}
                    checkmark={theme === l.hexCode}
                />
            ))}
        </View>
    );
}
