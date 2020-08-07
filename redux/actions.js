import * as actionTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import BaseApi from "../api";

const api = BaseApi();

export const getTasks = () => async (dispatch) => {
    dispatch({
        type: actionTypes.GET_TODOS_START,
    });

    const res = await api.get("/tasks");

    if (res.status === 200) {
        dispatch({
            type: actionTypes.GET_TODOS_SUCCESS,
            payload: res.data,
        });
    } else {
        dispatch({ type: actionTypes.GET_TODOS_FAILURE });
    }
};

export const createTask = (task) => async (dispatch) => {
    dispatch({
        type: actionTypes.CREATE_TODO_START,
    });

    const res = await api.post("/tasks", task);

    if (res.status === 201) {
        dispatch({
            type: actionTypes.CREATE_TODO_SUCCESS,
            payload: res.data,
        });
    } else {
        dispatch({
            type: actionTypes.CREATE_TODO_FAILURE,
            payload: res.data,
        });
    }
};

export const clearErrors = () => ({ type: actionTypes.CLEAR_ERRORS });

export const updateTask = (id, index, data) => async (dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_TODO_START,
        payload: id,
    });

    const res = await api.patch(`/tasks/${id}`, data);

    if (res.status === 200) {
        dispatch({
            type: actionTypes.UPDATE_TODO_SUCCESS,
            payload: {
                data,
                index,
                id,
            },
        });
    } else {
        dispatch({ type: actionTypes.UPDATE_TODO_FAILURE, payload: { data: res.data, id } });
    }
};

export const deleteTask = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_TODO_START, payload: id });

    const res = await api.delete(`/tasks/${id}`);

    if (res.status === 200) {
        dispatch({
            type: actionTypes.DELETE_TODO_SUCCESS,
            payload: id,
        });
    } else {
        dispatch({
            type: actionTypes.DELETE_TODO_FAILURE,
            payload: {
                errors: res.data,
                id,
            },
        });
    }
};

export const signIn = (user) => async (dispatch) => {
    dispatch({
        type: actionTypes.SIGN_IN_START,
    });

    const res = await api.post("/auth/sign-in", user);

    if (res.status === 200) {
        const token = res.data.token;
        const decodedUser = jwt_decode(token);

        await AsyncStorage.setItem("token", token);

        dispatch({
            type: actionTypes.SIGN_IN_SUCCESS,
            payload: decodedUser,
        });
    } else {
        dispatch({
            type: actionTypes.SIGN_IN_FAILURE,
            payload: res.data,
        });
    }
};

export const signOut = () => async (dispatch) => {
    dispatch({ type: actionTypes.SIGN_OUT_START });

    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (user) => async (dispatch) => {
    dispatch({
        type: actionTypes.SIGN_UP_START,
    });

    const res = await api.post("/auth/sign-up", user);

    if (res.status === 201) {
        const token = res.data.token;
        const decodedUser = jwt_decode(token);

        await AsyncStorage.setItem("token", token);

        dispatch({
            type: actionTypes.SIGN_UP_SUCCESS,
            payload: decodedUser,
        });
    } else {
        dispatch({ type: actionTypes.SIGN_UP_FAILURE, payload: res.data });
    }
};

export const checkUser = () => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem("token");

        if (token && jwt_decode(token).exp > Date.now() / 1000) {
            const user = jwt_decode(token);
            dispatch({ type: actionTypes.SET_USER, payload: user });
        } else {
            await AsyncStorage.removeItem("token");
            dispatch({ type: actionTypes.SET_USER_FAIL });
        }
    } catch (error) {
        await AsyncStorage.removeItem("token");
        dispatch({ type: actionTypes.SET_USER_FAIL });
    }
};
