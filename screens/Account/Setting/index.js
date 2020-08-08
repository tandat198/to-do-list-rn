import React from "react";
import { View } from "react-native";
import { ListItem, Text } from "react-native-elements";

export default function Setting({ navigation }) {
    const list = [
        {
            title: "Background Color",
            to: "Set App Background",
        },
        {
            title: "Change Password",
            to: "Change Password",
        },
    ];

    return (
        <View>
            {list.map((l, i) => (
                <ListItem key={i} title={l.title} bottomDivider chevron onPress={() => navigation.navigate(l.to)} />
            ))}
        </View>
    );
}
