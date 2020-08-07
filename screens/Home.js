import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { Text, Button, Overlay, Input, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, clearErrors } from "../redux/actions";
import TaskItem from "../components/TaskItem";
import BottomToTopView from "../components/BottomToTopView";

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

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title} h2 h2Style={{ fontWeight: "400" }}>
                    My Tasks
                </Text>
            </View>
            <SafeAreaView style={styles.list}>
                <View
                    style={{
                        width: 70,
                        height: 70,
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        translateX: -35,
                        zIndex: 2,
                    }}
                >
                    {isLoading ? null : (
                        <BottomToTopView height={70}>
                            <Button
                                buttonStyle={{ borderRadius: 140, width: 70, height: 70 }}
                                onPress={toggleOverlayCreate}
                                icon={<Icon name='plus' size={25} color='white' />}
                                iconRight
                            />
                        </BottomToTopView>
                    )}
                </View>
                {isLoading ? (
                    <View style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size={60} color='#878787' />
                    </View>
                ) : tasks.length > 0 ? (
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={tasks}
                        renderItem={({ item, index }) => <TaskItem item={item} index={index} />}
                    />
                ) : (
                    <Text style={{ textAlign: "center", fontSize: 18 }}>You don't have any task</Text>
                )}
            </SafeAreaView>
            {errors.getDataFail ? (
                <View>
                    <Button onPress={() => dispatch(getTasks())} title='Reload' />
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
        marginTop: 40,
    },
    title: {
        marginLeft: 20,
    },
    checkBox: {
        marginRight: 10,
    },
    list: {
        flex: 1,
        marginTop: 5,
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
