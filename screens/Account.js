import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/actions";

export default function Setting() {
    const dispatch = useDispatch();
    const list = [
        {
            title: "Account Info",
            icon: "person",
        },
        {
            title: "Setting",
            icon: "settings",
        },
    ];
    return (
        <View style={styles.container}>
            {list.map((item, i) => (
                <ListItem key={i} title={item.title} leftIcon={{ name: item.icon }} bottomDivider chevron />
            ))}
            <Button type='clear' title='Log Out' onPress={() => dispatch(signOut())} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
});
