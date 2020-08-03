import * as actionTypes from "./actionTypes";
import axios from "axios";

// axios.create({
//     baseURL: "https://code-class.herokuapp.com/api",
// });

export const getTasks = () => async (dispatch) => {
    dispatch({
        type: actionTypes.GET_TODOS_START,
    });

    try {
        const res = await axios.get("https://code-class.herokuapp.com/api/tasks");

        dispatch({
            type: actionTypes.GET_TODOS_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({ type: actionTypes.GET_TODOS_FAILURE });
    }
};

export const createTask = (task) => async (dispatch) => {
    dispatch({
        type: actionTypes.CREATE_TODO_START,
    });
    console.log(task);
    try {
        const res = await axios.post("https://code-class.herokuapp.com/api/tasks", task);
        dispatch({
            type: actionTypes.CREATE_TODO_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_TODO_FAILURE,
            payload: error.response.data,
        });
    }
};

export const clearErrors = () => ({ type: actionTypes.CLEAR_ERRORS });

export const updateTask = (id, data) => async (dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_TODO_START,
    });

    try {
        await axios.patch(`https://code-class.herokuapp.com/api/tasks/${id}`, data);

        dispatch({
            type: actionTypes.UPDATE_TODO_SUCCESS,
            payload: {
                data,
                id,
            },
        });
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_TODO_FAILURE, payload: error.response.data });
    }
};
