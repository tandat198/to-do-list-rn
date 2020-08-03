import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { Text, Button, Overlay, Input, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, clearErrors, updateTask } from "../redux/actions";

export default function Home() {
    const [visibleCreateOverlay, setVisibleCreateOverlay] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const isLoading = useSelector((state) => state.isLoading);
    const isCreating = useSelector((state) => state.isCreating);
    const isSuccess = useSelector((state) => state.isSuccess);
    const errors = useSelector((state) => state.errors);

    const toggleOverlayCreate = () => {
        if (visibleCreateOverlay) {
            dispatch(clearErrors());
        }
        setVisibleCreateOverlay(!visibleCreateOverlay);
    };

    const submitCreateTask = () => {
        dispatch(createTask({ name: taskName }));
        setTaskName("");
    };

    const submitUpdateStatus = (id, isDone) => {
        dispatch(updateTask(id, { isDone }));
    };

    const TaskItem = ({ item }) => (
        <View style={styles.listItem}>
            <CheckBox
                onPress={() => submitUpdateStatus(item.id, !item.isDone)}
                style={styles.checkBox}
                checked={item.isDone}
            />
            <Text h4>{item.name}</Text>
        </View>
    );

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            toggleOverlayCreate();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (errors.name && errors.name.includes("required")) {
            setNameErrorMessage("Name is required");
        } else if (errors.name && errors.name.includes("invalid")) {
            setNameErrorMessage("Name is invalid");
        } else {
            setNameErrorMessage("");
        }
    }, [errors.name]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title} h2>
                    My Tasks
                </Text>
            </View>
            <View>
                <Button
                    onPress={toggleOverlayCreate}
                    icon={<Icon name='plus' size={15} color='white' />}
                    title='Add Task  '
                    iconRight
                />
            </View>
            {isLoading ? <Text style={{ textAlign: "center" }}>Loading...</Text> : null}
            <ScrollView style={styles.list}>
                <FlatList keyExtractor={(item) => item.id.toString()} data={tasks} renderItem={TaskItem} />
            </ScrollView>
            {errors.getDataFail ? (
                <View>
                    <Button title='Reload' />
                </View>
            ) : null}
            <Overlay
                isVisible={visibleCreateOverlay}
                onBackdropPress={toggleOverlayCreate}
                overlayStyle={styles.overlay}
            >
                <View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder='Your Task'
                            onChangeText={(text) => setTaskName(text)}
                            renderErrorMessage={errors.name ? true : false}
                            errorMessage={nameErrorMessage}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button raised onPress={toggleOverlayCreate} title='Cancel' />
                        <Button
                            raised
                            onPress={submitCreateTask}
                            icon={isCreating ? null : <Icon name='plus' size={15} color='white' />}
                            title={isCreating ? "Adding..." : "Add  "}
                            disabled={isCreating}
                            iconRight
                        />
                    </View>
                </View>
            </Overlay>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    title: {
        textAlign: "center",
    },
    checkBox: {
        marginRight: 10,
    },
    list: {
        marginTop: 20,
        paddingVertical: 10,
    },
    listItem: {
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "baseline",
    },
    overlay: {
        width: "80%",
        paddingVertical: 30,
    },
    inputContainer: {
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
