import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/actions";

export default function Setting() {
    const dispatch = useDispatch();

    return (
        <View>
            <Button title='Log Out' onPress={() => dispatch(signOut())} />
        </View>
    );
}
