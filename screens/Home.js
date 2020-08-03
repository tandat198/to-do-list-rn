import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Home() {
    return (
        <View style={style.container}>
            <View style={style.titleContainer}>
                <Text h2>My Tasks</Text>
            </View>
            <View>
                <Button
                    icon={{
                        name: "plus",
                        size: 15,
                        color: "white",
                    }}
                    title='Add Task'
                />
            </View>
            <View></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        textAlign: "center",
    },
});
