import React from "react";
import { View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/actions";

export default function Account({ navigation }) {
    const dispatch = useDispatch();
    const list = [
        {
            title: "Account Info",
            icon: "person",
            to: "Account Info",
        },
        {
            title: "Setting",
            icon: "settings",
            to: "Setting",
        },
    ];

    return (
        <View>
            {list.map((item, i) => (
                <ListItem
                    onPress={() => navigation.navigate(item.to)}
                    key={i}
                    title={item.title}
                    leftIcon={{ name: item.icon }}
                    bottomDivider
                    chevron
                />
            ))}
            <Button type='clear' title='Log Out' onPress={() => dispatch(signOut())} />
        </View>
    );
}
