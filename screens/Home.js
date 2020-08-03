import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { Text, Button, Overlay, Input, CheckBox, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, clearErrors, updateTask } from "../redux/actions";
import TaskItem from "../components/TaskItem";

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
    const isUpdating = useSelector((state) => state.isUpdating);

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

    const submitUpdateStatus = (id, index, isDone) => {
        dispatch(updateTask(id, index, { isDone }));
    };

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
            <Divider style={{ marginVertical: 10 }} />
            <View style={{ paddingHorizontal: 20 }}>
                <Button
                    onPress={toggleOverlayCreate}
                    icon={<Icon name='plus' size={15} color='white' />}
                    title='Add Task  '
                    iconRight
                />
            </View>
            {isLoading ? <Text style={{ textAlign: "center" }}>Loading...</Text> : null}
            <SafeAreaView style={styles.list}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={tasks}
                    renderItem={({ item, index }) => <TaskItem item={item} index={index} />}
                />
            </SafeAreaView>
            {errors.getDataFail ? (
                <View>
                    <Button onPress={() => dispatch(getTasks())} title='Reload' />
                </View>
            ) : null}
            {isUpdating ? (
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        backgroundColor: "#2089DC",
                        paddingVertical: 10,
                        width: "100%",
                    }}
                >
                    <Text style={{ textAlign: "center" }}>Updating...</Text>
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
                        <Button type='outline' onPress={toggleOverlayCreate} title='Cancel' />
                        <Button
                            raised
                            onPress={submitCreateTask}
                            title='Add Task'
                            disabled={isCreating}
                            loading={isCreating}
                            iconRight
                            loadingStyle={{ paddingHorizontal: 20 }}
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
        flex: 1,
    },
    listItem: {
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        marginRight: 20,
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
    leftItem: {
        width: "95%",
        flexDirection: "row",
    },
    rightItem: {
        width: "5%",
    },
});
