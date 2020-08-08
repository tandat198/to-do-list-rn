import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, clearErrors } from "../../../../redux/actions";

export default function ChangePassword({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState("");
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

    const isSuccess = useSelector((state) => state.isSuccess);
    const errors = useSelector((state) => state.errors);
    const isLoading = useSelector((state) => state.isLoading);
    const dispatch = useDispatch();

    const submitUpdate = () => {
        dispatch(changePassword({ currentPassword, newPassword, confirmPassword }));
    };

    useEffect(() => {
        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch]);

    useEffect(() => {
        if (errors.currentPassword?.includes("required")) {
            setCurrentPasswordErrorMessage("Current Password is required");
        } else if (errors.currentPassword?.includes("not correct")) {
            setCurrentPasswordErrorMessage("Current Password is not correct");
        } else {
            setCurrentPasswordErrorMessage("");
        }
    }, [errors.currentPassword]);

    useEffect(() => {
        if (errors.newPassword?.includes("required")) {
            setNewPasswordErrorMessage("New Password is required");
        } else if (errors.newPassword?.includes("at least 8")) {
            setNewPasswordErrorMessage("New Password must have at least 8 characters");
        } else {
            setNewPasswordErrorMessage("");
        }
    }, [errors.newPassword]);

    useEffect(() => {
        if (errors.confirmPassword?.includes("required")) {
            setConfirmPasswordErrorMessage("Confirm Password is required");
        } else if (errors.confirmPassword?.includes("does not match")) {
            setConfirmPasswordErrorMessage("Password and Confirm Password does not match");
        } else {
            setConfirmPasswordErrorMessage("");
        }
    }, [errors.confirmPassword]);

    useEffect(() => {
        if (isSuccess) {
            navigation.goBack();
            Alert.alert("Success", "You changed password successfully!", [{ text: "OK" }]);
        }
    }, [isSuccess]);

    return (
        <View style={styles.container}>
            <View style={styles.passwordInput}>
                <Input
                    label='Current Password'
                    placeholder='Current Password'
                    renderErrorMessage={currentPasswordErrorMessage ? true : false}
                    errorMessage={currentPasswordErrorMessage}
                    maxLength={20}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(text) => setCurrentPassword(text)}
                    value={currentPassword}
                />
            </View>
            <View style={styles.passwordInput}>
                <Input
                    label='New Password'
                    placeholder='New Password'
                    renderErrorMessage={newPasswordErrorMessage ? true : false}
                    errorMessage={newPasswordErrorMessage}
                    maxLength={20}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(text) => setNewPassword(text)}
                    value={newPassword}
                />
            </View>
            <View>
                <Input
                    label='Confirm Password'
                    placeholder='Confirm Password'
                    renderErrorMessage={confirmPasswordErrorMessage ? true : false}
                    errorMessage={confirmPasswordErrorMessage}
                    maxLength={20}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
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
                    title='Change'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        flex: 1,
    },
    passwordInput: {
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
