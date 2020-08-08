import React, { PureComponent } from "react";
import { ActivityIndicator, Animated, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text, CheckBox, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../redux/actions";

class TaskList extends PureComponent {
    submitUpdateStatus = (id, index, isDone) => {
        this.props.updateTaskReq(id, index, { isDone });
    };
    submitDelTask = (id) => {
        this.props.deleteTaskReq(id);
    };

    render() {
        const { item, index, isUpdating, isDeleting, toggleOverlayUpdate } = this.props;

        return (
            <View style={styles.listItem}>
                <View style={styles.leftItem}>
                    {isUpdating[item.id] ? (
                        <View style={styles.loadingIcon}>
                            <ActivityIndicator size={24} color='#1462c7' />
                        </View>
                    ) : (
                        <CheckBox
                            onPress={() => this.submitUpdateStatus(item.id, index, !item.isDone)}
                            style={styles.checkBox}
                            checked={item.isDone}
                        />
                    )}
                    <TouchableWithoutFeedback onPress={() => toggleOverlayUpdate(item)}>
                        <View style={{ width: "90%", justifyContent: "center" }}>
                            <Text style={{ textAlignVertical: "center" }} h4>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.rightItem}>
                    {isDeleting[item.id] ? (
                        <View style={styles.loadingIcon}>
                            <ActivityIndicator size={24} color='#000' />
                        </View>
                    ) : (
                        <Button
                            type='clear'
                            icon={<Icon name='times' size={15} color='black' />}
                            onPress={() => this.submitDelTask(item.id)}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkBox: {
        marginRight: 10,
    },

    listItem: {
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        marginRight: 20,
    },

    leftItem: {
        width: "90%",
        flexDirection: "row",
        paddingRight: 30,
    },
    rightItem: {
        width: "10%",
    },
    loadingIcon: { marginVertical: 5, marginHorizontal: 10, padding: 10 },
});

const mapStateToProps = (state) => ({
    isUpdating: state.isUpdating,
    isDeleting: state.isDeleting,
});

const mapDispatchToProps = (dispatch) => ({
    updateTaskReq: (id, index, data) => dispatch(updateTask(id, index, data)),
    deleteTaskReq: (id) => dispatch(deleteTask(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
