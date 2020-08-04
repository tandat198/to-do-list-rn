import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { signUp, clearErrors } from "../redux/actions";

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const errors = useSelector((state) => state.errors);
    const isLoading = useSelector((state) => state.isLoading);
    const dispatch = useDispatch();

    const submitSignUp = () => {
        if (email.length > 0 && password.length > 0 && name.length >= 2 && confirmPassword.length > 0) {
            dispatch(signUp({ email, password, confirmPassword, name }));
        } else {
            if (email.length === 0) {
                setEmailErrorMessage("Email is required");
            }
            if (password.length === 0) {
                setPasswordErrorMessage("Password is required");
            }
            if (name.length < 2) {
                setNameErrorMessage("Name is required");
            }
            if (confirmPassword.length === 0) {
                setConfirmPasswordErrorMessage("Confirm Password is required");
            }
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch]);

    useEffect(() => {
        if (errors.email?.includes("exists")) {
            setEmailErrorMessage("Email already exists");
        } else if (errors.email?.includes("invalid")) {
            setEmailErrorMessage("Email is invalid");
        } else {
            setEmailErrorMessage("");
        }
    }, [errors.email]);

    useEffect(() => {
        if (errors.password?.includes("too weak")) {
            setPasswordErrorMessage("Password must have at least 8 characters");
        } else {
            setPasswordErrorMessage("");
        }
    }, [errors.password]);

    useEffect(() => {
        if (errors.confirmPassword?.includes("does not match")) {
            setConfirmPasswordErrorMessage("Password and Confirm Password do not match");
        } else {
            setConfirmPasswordErrorMessage("");
        }
    }, [errors.confirmPassword]);

    if (isAuthenticated) {
        navigation.navigate("Home");
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.emailInput}>
                <Input
                    autoCompleteType='email'
                    label='Email'
                    placeholder='Your Email'
                    renderErrorMessage={emailErrorMessage ? true : false}
                    errorMessage={emailErrorMessage}
                    maxLength={30}
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text.trimEnd())}
                    value={email}
                />
            </View>

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

            <View style={styles.passwordInput}>
                <Input
                    label='Password'
                    placeholder='Password'
                    renderErrorMessage={passwordErrorMessage ? true : false}
                    errorMessage={passwordErrorMessage}
                    maxLength={20}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
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
                    onPress={submitSignUp}
                    titleStyle={styles.buttonTitleStyle}
                    title='Sign Up'
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                }}
            >
                <Text>You have an account?</Text>
                <Button onPress={() => navigation.navigate("Sign In")} title='Sign In' type='clear'></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        flex: 1,
    },
    emailInput: {
        marginBottom: 20,
    },
    nameInput: {
        marginBottom: 20,
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
