import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import { Input, Button, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signIn } from "../../redux/actions";

export default function SignIn({ navigation }) {
    const [visibilityPass, setVisibilityPass] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const errors = useSelector((state) => state.errors);
    const isLoading = useSelector((state) => state.isLoading);
    const dispatch = useDispatch();

    const submitSignIn = () => {
        if (email.length > 0 && password.length > 0) {
            dispatch(signIn({ email, password }));
        } else {
            if (email.length === 0) {
                setEmailErrorMessage("Email is required");
            }
            if (password.length === 0) {
                setPasswordErrorMessage("Password is required");
            }
        }
    };

    const navigateToSignUp = () => {
        setEmailErrorMessage("");
        setPasswordErrorMessage("");
        navigation.navigate("Sign Up");
    };

    useEffect(() => {
        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch]);

    useEffect(() => {
        if (errors.email?.includes("exist")) {
            setEmailErrorMessage("Email does not exist");
        } else {
            setEmailErrorMessage("");
        }
    }, [errors.email]);

    useEffect(() => {
        if (errors.password?.includes("does not match")) {
            setPasswordErrorMessage("Password is not correct");
        } else {
            setPasswordErrorMessage("");
        }
    }, [errors.password]);

    if (isAuthenticated) {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons style={styles.logo} name='account-circle' size={70} color='black' />
            <View style={styles.emailInput}>
                <Input
                    autoCompleteType='email'
                    keyboardType='email-address'
                    label='Email'
                    placeholder='Your Email'
                    renderErrorMessage={emailErrorMessage ? true : false}
                    errorMessage={emailErrorMessage}
                    maxLength={30}
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>

            <View>
                <Input
                    label='Password'
                    placeholder='Password'
                    rightIcon={
                        <MaterialCommunityIcons
                            onPress={() => setVisibilityPass(!visibilityPass)}
                            name={visibilityPass ? "visibility-off" : "visibility"}
                            size={24}
                            color='black'
                        />
                    }
                    secureTextEntry={!visibilityPass}
                    renderErrorMessage={passwordErrorMessage ? true : false}
                    errorMessage={passwordErrorMessage}
                    maxLength={20}
                    autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    disabled={isLoading}
                    loading={isLoading}
                    loadingStyle={{ height: 26 }}
                    loadingProps={{ size: "large" }}
                    titleStyle={styles.buttonTitleStyle}
                    title='Sign In'
                    onPress={submitSignIn}
                    style={styles.buttonStyle}
                />
            </View>
            <View style={styles.navigateContainer}>
                <Text>You don't have an account?</Text>
                <Button onPress={navigateToSignUp} title='Sign Up Now' type='clear'></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        flex: 1,
    },
    logo: {
        textAlign: "center",
    },
    emailInput: {
        marginBottom: 20,
    },
    buttonContainer: {
        marginHorizontal: 10,
        marginTop: 20,
    },
    buttonStyle: {
        height: 25,
    },
    buttonTitleStyle: {
        fontSize: 20,
    },
    navigateContainer: {
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
});
