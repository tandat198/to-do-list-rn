import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Button, Overlay, Input, CheckBox } from "react-native-elements";
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

  const TaskItem = ({ item }) => (
    <View style={styles.listItem}>
      <CheckBox style={styles.checkBox} checked={item.isDone} />
      <Text h4>{item.name}</Text>
    </View>
  );

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
          icon={<Icon name="plus" size={15} color="white" />}
          title="Add Task"
        />
      </View>
      <View style={styles.list}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={tasks}
          renderItem={TaskItem}
        />
      </View>
      <Overlay
        isVisible={visibleCreateOverlay}
        onBackdropPress={toggleOverlayCreate}
        overlayStyle={styles.overlay}
      >
        <Input placeholder="Your Task" />
        <Button
          onPress={toggleOverlayCreate}
          icon={<Icon name="plus" size={15} color="white" />}
          title="Add"
        />
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
    marginRight: 5,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  overlay: {
    width: "80%",
    paddingVertical: 30,
  },
});
