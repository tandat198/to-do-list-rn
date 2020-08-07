import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, View, ScrollView } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateUserInfo } from "../redux/actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

export default function UpdateUserInfo({ navigation }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [pickedDate, setPickedDate] = useState(false);
    const [tel, setTel] = useState("");
    const [showPickerDate, setShowPickerDate] = useState(false);

    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [telErrorMessage, setTelErrorMessage] = useState("");

    const currentUser = useSelector((state) => state.currentUser);
    const isSuccess = useSelector((state) => state.isSuccess);
    const errors = useSelector((state) => state.errors);
    const isLoading = useSelector((state) => state.isLoading);
    const dispatch = useDispatch();

    const setBirthDate = (e, date) => {
        setShowPickerDate(false);
        if (date && pickedDate) {
            setDate(date);
        } else if (date && !pickedDate) {
            setDate(date);
            setPickedDate(true);
        }
    };

    const submitUpdate = () => {
        if (name.length >= 2) {
            dispatch(updateUserInfo({ name, phoneNumber: tel, dateOfBirth: pickedDate ? date : null }));
            setTelErrorMessage("");
        } else {
            if (name.length < 2) {
                setNameErrorMessage("Name is required");
            } else {
                setNameErrorMessage("");
            }
        }
    };

    useEffect(() => {
        setName(currentUser.name);
        setTel(currentUser.phoneNumber);
        if (currentUser.dateOfBirth) {
            setBirthDate(currentUser.dateOfBirth);
        }
    }, []);

    useEffect(() => {
        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch]);

    useEffect(() => {
        if (errors.phoneNumber?.includes("invalid")) {
            setTelErrorMessage("Phone Number is invalid");
        }
    }, [errors.phoneNumber]);

    if (isSuccess) {
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.nameInput}>
                <Input
                    autoCompleteType='name'
                    label='Name'
                    placeholder='Your Name'
                    renderErrorMessage={nameErrorMessage ? true : false}
                    errorMessage={nameErrorMessage}
                    maxLength={30}
                    autoCapitalize='words'
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
            </View>
            <Text style={{ marginLeft: 10, fontSize: 16, color: "#86939e", fontWeight: "bold" }}>Date of Birth</Text>
            <Button
                titleStyle={{
                    color: "black",
                    width: "95%",
                    textAlign: "left",
                    marginLeft: 10,
                    fontSize: 18,
                }}
                title={currentUser.dateOfBirth || pickedDate ? dayjs(date).format("DD-MM-YYYY") : " "}
                onFocus={{ backgroundColor: "none" }}
                type='clear'
                icon={<MaterialCommunityIcons name='today' size={25} color='black' />}
                onPress={() => setShowPickerDate(true)}
                style={{
                    marginBottom: 20,
                    width: "100%",
                }}
                containerStyle={{
                    marginHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            />

            {showPickerDate ? (
                <DateTimePicker
                    testID='dateTimePicker'
                    mode='date'
                    display='default'
                    maximumDate={new Date(new Date().getFullYear() - 10, new Date().getMonth(), new Date().getDate())}
                    value={date}
                    onChange={setBirthDate}
                />
            ) : null}
            <View style={styles.telInput}>
                <Input
                    keyboardType='phone-pad'
                    autoCompleteType='tel'
                    label='Phone Number'
                    placeholder='Your Phone Number'
                    maxLength={10}
                    renderErrorMessage={telErrorMessage ? true : false}
                    errorMessage={telErrorMessage}
                    value={tel}
                    onChangeText={(text) => setTel(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    disabled={isLoading}
                    loading={isLoading}
                    loadingStyle={{ height: 26 }}
                    loadingProps={{ size: "large" }}
                    onPress={submitUpdate}
                    titleStyle={styles.buttonTitleStyle}
                    title='Update'
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        flex: 1,
    },
    nameInput: {
        marginBottom: 20,
    },
    telInput: {
        marginBottom: 20,
    },
    buttonContainer: {
        marginHorizontal: 10,
        marginTop: 20,
    },
    buttonTitleStyle: {
        fontSize: 20,
    },
});
