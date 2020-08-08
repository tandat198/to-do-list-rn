import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator, RefreshControl } from "react-native";
import { Text, Button, Overlay, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, clearErrors } from "../../redux/actions";
import TaskItem from "../../components/TaskItem";
import BottomToTopView from "../../components/BottomToTopView";

export default function Home() {
    const [visibleCreateOverlay, setVisibleCreateOverlay] = useState(false);
    const [visibleUpdateOverlay, setVisibleUpdateOverlay] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [activeTask, setActiveTask] = useState({});

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const isLoading = useSelector((state) => state.isLoading);
    const loaded = useSelector((state) => state.loaded);
    const isCreating = useSelector((state) => state.isCreating);
    const isSuccess = useSelector((state) => state.isSuccess);
    const isRefreshing = useSelector((state) => state.isRefreshing);
    const isUpdating = useSelector((state) => state.isUpdating);
    const errors = useSelector((state) => state.errors);
    const theme = useSelector((state) => state.theme);

    const toggleOverlayCreate = () => {
        if (visibleCreateOverlay) {
            dispatch(clearErrors());
            setTaskName("");
        }
        setVisibleCreateOverlay(!visibleCreateOverlay);
    };

    const toggleOverlayUpdate = (item) => {
        if (visibleUpdateOverlay) {
            dispatch(clearErrors());
            setTaskName("");
        } else {
            setActiveTask(item);
            setTaskName(item.name);
        }
        setVisibleUpdateOverlay(!visibleUpdateOverlay);
    };

    const submitCreateTask = () => {
        dispatch(createTask({ name: taskName }));
    };

    const getTasksReq = (isRefreshing) => {
        dispatch(getTasks(isRefreshing));
    };

    useEffect(() => {
        getTasksReq();
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            toggleOverlayCreate();
        }
    }, [isSuccess]);

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
                        <ActivityIndicator size={60} color={theme} />
                    </View>
                ) : tasks.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                tintColor={theme}
                                colors={[theme]}
                                refreshing={isRefreshing}
                                onRefresh={() => getTasksReq(true)}
                            />
                        }
                        keyExtractor={(item) => item.id}
                        data={tasks}
                        renderItem={({ item, index }) => (
                            <TaskItem toggleOverlayUpdate={toggleOverlayUpdate} item={item} index={index} />
                        )}
                    />
                ) : loaded ? (
                    <Text style={{ textAlign: "center", fontSize: 18 }}>You don't have any task</Text>
                ) : null}
            </SafeAreaView>
            {errors.getDataFail ? (
                <View>
                    <Button onPress={getTasksReq} title='Reload' />
                </View>
            ) : null}
            <Overlay
                isVisible={visibleCreateOverlay}
                onBackdropPress={toggleOverlayCreate}
                overlayStyle={styles.overlay}
            >
                <View>
                    <View style={styles.inputContainer}>
                        <Input placeholder='Your Task' value={taskName} onChangeText={(text) => setTaskName(text)} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button type='outline' onPress={toggleOverlayCreate} title='Cancel' />
                        <Button
                            raised
                            onPress={submitCreateTask}
                            title='Add'
                            titleStyle={{ marginRight: 10 }}
                            disabled={isCreating || taskName.length === 0}
                            loading={isCreating}
                            iconRight
                            icon={<Icon name='plus' size={18} color='white' />}
                            loadingStyle={{ paddingHorizontal: 20 }}
                        />
                    </View>
                </View>
            </Overlay>

            <Overlay
                isVisible={visibleUpdateOverlay}
                onBackdropPress={toggleOverlayUpdate}
                overlayStyle={styles.overlay}
            >
                <View>
                    <View style={styles.inputContainer}>
                        <Input value={taskName} placeholder='Your Task' onChangeText={(text) => setTaskName(text)} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button type='outline' onPress={toggleOverlayUpdate} title='Cancel' />
                        <Button
                            raised
                            onPress={submitCreateTask}
                            title='Edit'
                            titleStyle={{ marginRight: 10 }}
                            disabled={isUpdating[activeTask.id] || taskName.length === 0}
                            loading={isUpdating[activeTask.id]}
                            loadingStyle={{ paddingHorizontal: 20 }}
                            iconRight
                            icon={<Icon name='edit' size={18} color='white' />}
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
        paddingTop: 10,
        paddingBottom: 20,
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
