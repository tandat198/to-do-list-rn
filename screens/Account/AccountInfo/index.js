import React from "react";
import { View } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function AccountInfo({ navigation }) {
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
        {
            title: "Date of Birth",
            subtitle: currentUser.dateOfBirth && dayjs(currentUser.dateOfBirth).format("DD/MM/YYYY"),
        },
        {
            title: "Phone Number",
            subtitle: currentUser.phoneNumber,
        },
    ];

    return (
        <View>
            {list.map((l, i) => (
                <ListItem key={i} title={l.title} subtitle={l.subtitle} bottomDivider />
            ))}
            <Button type='clear' title='Update Info' onPress={() => navigation.navigate("Update User Info")} />
        </View>
    );
}
