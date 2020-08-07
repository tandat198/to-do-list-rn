import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, View, ScrollView } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { signUp, clearErrors } from "../redux/actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [pickedDate, setPickedDate] = useState(false);
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPickerDate, setShowPickerDate] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [telErrorMessage, setTelErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
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

    const submitSignUp = () => {
        if (email.length > 0 && password.length > 0 && name.length >= 2 && confirmPassword.length > 0) {
            dispatch(
                signUp({
                    email,
                    password,
                    confirmPassword,
                    name,
                    phoneNumber: tel,
                    dateOfBirth: pickedDate ? date : null,
                })
            );
            setEmailErrorMessage("");
            setPasswordErrorMessage("");
            setConfirmPasswordErrorMessage("");
            setTelErrorMessage("");
        } else {
            if (email.length === 0) {
                setEmailErrorMessage("Email is required");
            } else {
                setEmailErrorMessage("");
            }
            if (password.length === 0) {
                setPasswordErrorMessage("Password is required");
            } else {
                setPasswordErrorMessage("");
            }
            if (name.length < 2) {
                setNameErrorMessage("Name is required");
            } else {
                setNameErrorMessage("");
            }
            if (confirmPassword.length === 0) {
                setConfirmPasswordErrorMessage("Confirm Password is required");
            } else {
                setConfirmPasswordErrorMessage("");
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
        } else if (errors.email?.includes("is not valid")) {
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

    useEffect(() => {
        if (errors.phoneNumber?.includes("invalid")) {
            setTelErrorMessage("Phone Number is invalid");
        }
    }, [errors.phoneNumber]);

    if (isAuthenticated) {
        navigation.navigate("Home");
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.emailInput}>
                <Input
                    keyboardType='email-address'
                    autoCompleteType='email'
                    label='Email'
                    placeholder='Your Email'
                    renderErrorMessage={emailErrorMessage ? true : false}
                    errorMessage={emailErrorMessage}
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
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
            <Text style={{ marginLeft: 10, fontSize: 16, color: "#86939e", fontWeight: "bold" }}>Date of Birth</Text>
            <Button
                titleStyle={{
                    color: "black",
                    width: "95%",
                    textAlign: "left",
                    marginLeft: 10,
                    fontSize: 18,
                }}
                title={pickedDate ? dayjs(date).format("DD-MM-YYYY") : " "}
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
                    loadingStyle={{ height: 26 }}
                    loadingProps={{ size: "large" }}
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
        </ScrollView>
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
    telInput: {
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
