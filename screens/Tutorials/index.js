import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import { ScrollView, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";

const data = [
    {
        imageUrl: "http://via.placeholder.com/160x160",
        title: "somethingsomethingsomethingsomsom...",
    },
    {
        imageUrl: "http://via.placeholder.com/160x160",
        title: "something two",
    },
    {
        imageUrl: "http://via.placeholder.com/160x160",
        title: "something three",
    },
    {
        imageUrl: "http://via.placeholder.com/160x160",
        title: "something four",
    },
    {
        imageUrl: "http://via.placeholder.com/160x160",
        title: "something five",
    },
    {
        imageUrl: "http://via.placeholder.com/160x160",
        title: "something six",
    },
];

export default function Tutorials({ navigation }) {
    const [overlay, setOverlay] = useState(-1);

    const toggleOverlay = (i) => {
        if (overlay >= 0) {
            setOverlay(-1);
        } else {
            setOverlay(i);
        }
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View>
                <Text h4 h4Style={{ fontWeight: "400", fontSize: 20 }} style={{ marginLeft: 15 }}>
                    Recent Tutorials
                </Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data}
                    renderItem={({ item: rowData, index }) => {
                        return (
                            <Card
                                title={null}
                                image={{ uri: rowData.imageUrl }}
                                imageStyle={{ width: "100%", height: 220 }}
                                containerStyle={{
                                    padding: 0,
                                    width: 220,
                                    height: 380,

                                    borderBottomColor: "red",
                                }}
                            >
                                <Text style={{ marginBottom: 10 }}>{rowData.title}</Text>
                                <Text>DescriptionDescriptionDescription</Text>
                                <TouchableHighlight
                                    onShowUnderlay={() => toggleOverlay(index)}
                                    onHideUnderlay={() => toggleOverlay(index)}
                                    activeOpacity={1}
                                    onPress={() => navigation.navigate("Home")}
                                    underlayColor='#1462c7'
                                    style={styles.btn}
                                >
                                    <Text
                                        selectionColor='#fff'
                                        style={index === overlay ? styles.pressText : styles.text}
                                    >
                                        Read More
                                    </Text>
                                </TouchableHighlight>
                            </Card>
                        );
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text h4 h4Style={{ fontWeight: "400", fontSize: 20 }} style={{ marginLeft: 15 }}>
                    Newest Tutorials
                </Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data}
                    renderItem={({ item: rowData, index }) => {
                        return (
                            <Card
                                title={null}
                                image={{ uri: rowData.imageUrl }}
                                imageStyle={{ width: "100%", height: 220 }}
                                containerStyle={{
                                    padding: 0,
                                    width: 220,
                                    height: 380,

                                    borderBottomColor: "red",
                                }}
                            >
                                <Text style={{ marginBottom: 10 }}>{rowData.title}</Text>
                                <Text>DescriptionDescriptionDescription</Text>
                                <TouchableHighlight
                                    onShowUnderlay={() => toggleOverlay(index)}
                                    onHideUnderlay={() => toggleOverlay(index)}
                                    activeOpacity={1}
                                    onPress={() => navigation.navigate("Home")}
                                    underlayColor='#1462c7'
                                    style={styles.btn}
                                >
                                    <Text
                                        selectionColor='#fff'
                                        style={index === overlay ? styles.pressText : styles.text}
                                    >
                                        Read More
                                    </Text>
                                </TouchableHighlight>
                            </Card>
                        );
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingBottom: 20,
    },
    btn: {
        width: 100,
        marginTop: 10,
        backgroundColor: "white",
        borderColor: "#1462c7",
        borderWidth: 1,
        borderRadius: 30,
        overflow: "hidden",
        padding: 8,
    },
    pressText: { textAlign: "center", color: "#fff" },
    text: { textAlign: "center", color: "#1462c7" },
});
