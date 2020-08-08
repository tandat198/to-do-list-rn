import React from "react";
import { AsyncStorage, View } from "react-native";
import { ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import { setTheme } from "../../../../redux/actions";

export default function SetAppBackground({ navigation }) {
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const list = [
        {
            title: "Default",
            hexCode: "#1462c7",
        },
        {
            title: "Moonlit Blue",
            hexCode: "#586e8b",
        },
        {
            title: "Lavender Pirple",
            hexCode: "#967bb6",
        },
        {
            title: "Venus Pink",
            hexCode: "#f9c3c3",
        },
        {
            title: "Emerald Green",
            hexCode: "#50c878",
        },
        {
            title: "Burnt Orange",
            hexCode: "#ff7034",
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
