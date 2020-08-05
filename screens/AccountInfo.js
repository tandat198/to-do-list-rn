import React from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { useSelector } from "react-redux";

export default function AccountInfo() {
    const currentUser = useSelector((state) => state.currentUser);
    const list = [
        {
            title: "Name",
            subtitle: currentUser.name,
        },
        {
            title: "Email",
            subtitle: currentUser.email,
        },
    ];

    return (
        <View>
            {list.map((l, i) => (
                <ListItem key={i} title={l.title} subtitle={l.subtitle} bottomDivider />
            ))}
        </View>
    );
}
