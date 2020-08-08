import React, { useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screens/Home";
import Account from "../screens/Account";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import AccountInfo from "../screens/Account/AccountInfo";
import UpdateUserInfo from "../screens/Account/AccountInfo/UpdateUserInfo";
import Setting from "../screens/Account/Setting";
import SetAppBackground from "../screens/Account/Setting/SetAppBackground";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { checkUser, setTheme } from "../redux/actions";
import { AppLoading } from "expo";
import { AsyncStorage } from "react-native";
import ChangePassword from "../screens/Account/Setting/ChangePassword";
import Tutorials from "../screens/Tutorials";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigator() {
    const theme = useSelector((state) => state.theme);
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const currentUser = useSelector((state) => state.currentUser);
    const checkedUser = useSelector((state) => state.checkedUser);
    const dispatch = useDispatch();

    const SplashScreen = () => {
        return <AppLoading />;
    };

    const HomeTabs = () => (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Account") {
                        iconName = focused ? "account" : "account-outline";
                    } else if (route.name === "Tutorials") {
                        iconName = focused ? "book" : "book-outline";
                    }

                    // You can return any component that you like here!
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: theme,
                inactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name='Tutorials' component={Tutorials} />
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Account' component={Account} />
        </Tab.Navigator>
    );

    useEffect(() => {
        async function checkTheme() {
            const theme = await AsyncStorage.getItem("theme");
            if (theme) {
                dispatch(setTheme(theme));
            }
        }
        dispatch(checkUser());
        checkTheme();
    }, [dispatch]);

    if (!checkedUser) return <SplashScreen />;

    return isAuthenticated ? (
        <Stack.Navigator>
            <Stack.Screen
                component={HomeTabs}
                name='Home'
                options={({ route }) => {
                    const routeNames = route.state?.routeNames;
                    const routeIndex = route.state?.index;
                    let title;
                    let headerShown =
                        (route.state && routeNames[routeIndex] === "Home") || (!route.state && route.name === "Home")
                            ? false
                            : true;

                    if (route.state && routeNames[routeIndex] === "Account") {
                        title = currentUser.name;
                    } else if (route.state) {
                        title = routeNames[routeIndex];
                    } else {
                        title = route.name;
                    }

                    return {
                        title,
                        headerShown,
                        headerStyle: { backgroundColor: theme },
                    };
                }}
            />
            <Stack.Screen component={AccountInfo} name='Account Info' />
            <Stack.Screen component={Setting} name='Setting' />
            <Stack.Screen component={UpdateUserInfo} name='Update User Info' />
            <Stack.Screen component={SetAppBackground} name='Set App Background' />
            <Stack.Screen component={ChangePassword} name='Change Password' />
        </Stack.Navigator>
    ) : (
        <Stack.Navigator>
            <Stack.Screen name='Sign In' component={SignIn} />
            <Stack.Screen name='Sign Up' component={SignUp} />
        </Stack.Navigator>
    );
}
