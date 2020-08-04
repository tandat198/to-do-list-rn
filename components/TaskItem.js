import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
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
        const { item, index } = this.props;

        return (
            <View style={styles.listItem}>
                <View style={styles.leftItem}>
                    <CheckBox
                        onPress={() => this.submitUpdateStatus(item.id, index, !item.isDone)}
                        style={styles.checkBox}
                        checked={item.isDone}
                    />
                    <Text style={{ textAlignVertical: "center" }} h4>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.rightItem}>
                    <Button
                        type='clear'
                        icon={<Icon name='times' size={15} color='black' />}
                        onPress={() => this.submitDelTask(item.id)}
                    />
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
    },
    rightItem: {
        width: "10%",
    },
});

const mapDispatchToProps = (dispatch) => ({
    updateTaskReq: (id, index, data) => dispatch(updateTask(id, index, data)),
    deleteTaskReq: (id) => dispatch(deleteTask(id)),
});

export default connect(null, mapDispatchToProps)(TaskList);
