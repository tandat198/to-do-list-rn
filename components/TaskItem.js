import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Text, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default class TaskList extends PureComponent {
    render() {
        const { item, index } = this.props;

        return (
            <View style={styles.listItem}>
                <View style={styles.leftItem}>
                    <CheckBox
                        onPress={() => submitUpdateStatus(item.id, index, !item.isDone)}
                        style={styles.checkBox}
                        checked={item.isDone}
                    />
                    <Text style={{ textAlignVertical: "center" }} h4>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.rightItem}>
                    <Icon name='times' size={15} color='black' />
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
        width: "95%",
        flexDirection: "row",
    },
    rightItem: {
        width: "5%",
    },
});
