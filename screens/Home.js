import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { Text, Button, Overlay, Input, Divider, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, clearErrors } from "../redux/actions";
import TaskItem from "../components/TaskItem";

export default function Home() {
    const [visibleCreateOverlay, setVisibleCreateOverlay] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [bottomMessage, setBottomMessage] = useState("");

    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.tasks);
    const isLoading = useSelector((state) => state.isLoading);
    const isCreating = useSelector((state) => state.isCreating);
    const isSuccess = useSelector((state) => state.isSuccess);
    const errors = useSelector((state) => state.errors);
    const isUpdating = useSelector((state) => state.isUpdating);
    const isDeleting = useSelector((state) => state.isDeleting);
    const [imgUrl, setImgUrl] = useState("");

    const toggleOverlayCreate = () => {
        if (visibleCreateOverlay) {
            dispatch(clearErrors());
        }
        setVisibleCreateOverlay(!visibleCreateOverlay);
    };

    const submitCreateTask = () => {
        if (taskName.length >= 5) {
            dispatch(createTask({ name: taskName }));
            setTaskName("");
            setNameErrorMessage("");
        } else if (taskName.length === 0) {
            setNameErrorMessage("Task name is required");
        } else {
            setNameErrorMessage("Task name is too short");
        }
    };

    useEffect(() => {
        dispatch(getTasks());
        setTimeout(() => {
            setImgUrl("https://tutorial-dnt.s3.amazonaws.com/images/a0fa6ad2-59dd-4e6f-815b-5303853f87d3.png");
        }, 1500);
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            setVisibleCreateOverlay(false);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (errors.name && errors.name.includes("required")) {
            setNameErrorMessage("Task name is required");
        } else if (errors.name && errors.name.includes("invalid")) {
            setNameErrorMessage("Task name is invalid");
        } else {
            setNameErrorMessage("");
        }
    }, [errors.name]);

    useEffect(() => {
        if (isDeleting) {
            setBottomMessage("Removing ...");
        } else if (isUpdating) {
            setBottomMessage("Updating ...");
        } else {
            setBottomMessage("");
        }
    }, [isDeleting, isUpdating]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title} h2>
                    My Tasks
                </Text>
            </View>
            <Divider style={{ marginVertical: 10, marginHorizontal: 20 }} />
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
            {isUpdating || isDeleting ? (
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        backgroundColor: "#2089DC",
                        paddingVertical: 10,
                        width: "100%",
                    }}
                >
                    <Text style={{ textAlign: "center" }}>{bottomMessage}</Text>
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
                            renderErrorMessage={nameErrorMessage ? true : false}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
    title: {
        marginLeft: 20,
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
