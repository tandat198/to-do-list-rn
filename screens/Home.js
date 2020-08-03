import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Home() {
    const [visibleCreateOverlay, setVisibleCreateOverlay] = useState(false);

    const tasks = [
        {
            id: 1,
            name: "Do something",
            isDone: false,
        },
        {
            id: 2,
            name: "Do Something else",
            isDone: true,
        },
    ];

    const toggleOverlayCreate = () => {
        setVisibleCreateOverlay(!visibleCreateOverlay);
    };

    const TaskItem = ({ task }) => (
        <View style={styles.listItem}>
            <CheckBox style={styles.checkBox} checked={task.isDone} />
            <Text h4>{task.name}</Text>
        </View>
    );

    return (
        <View style={style.container}>
            <View style={style.titleContainer}>
                <Text h2>My Tasks</Text>
            </View>
            <View>
                <Button
                    onPress={toggleOverlayCreate}
                    icon={<Icon name='plus' size={15} color='white' />}
                    title='Add Task'
                />
            </View>
            <View>
                <FlatList keyExtractor={(item) => item.id.toString()} data={tasks} renderItem={TaskItem} />
            </View>
            <Overlay isVisible={visibleCreateOverlay} onBackdropPress={toggleOverlayCreate}>
                <Input placeholder='Your Task' />
                <Button onPress={toggleOverlayCreate} icon={<Icon name='plus' size={15} color='white' />} title='Add' />
            </Overlay>
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
    checkBox: {
        marginRight: 5,
    },
    listItem: {
        flexDirection: "row",
        flexWrap: "nowrap",
    },
});
