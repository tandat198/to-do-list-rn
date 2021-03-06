import * as actionTypes from "./actionTypes";

const INITIAL_STATE = {
    currentUser: {},
    isAuthenticated: false,
    tasks: [],
    isLoading: false,
    loaded: false,
    isRefreshing: false,
    isCreating: false,
    errors: {},
    isSuccess: false,
    isUpdating: {},
    isDeleting: {},
    checkedUser: false,
    theme: "#2089dc",
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_TODOS_START:
            return {
                ...state,
                [action.payload.isRefreshing ? "isRefreshing" : "isLoading"]: true,
                loaded: false,
                tasks: action.payload.isRefreshing ? state.tasks : [],
            };
        case actionTypes.GET_TODOS_SUCCESS:
            return {
                ...state,
                [action.payload.isRefreshing ? "isRefreshing" : "isLoading"]: false,
                loaded: true,
                tasks: action.payload.data,
            };
        case actionTypes.GET_TODOS_FAILURE:
            return {
                ...state,
                [action.payload.isRefreshing ? "isRefreshing" : "isLoading"]: false,
                loaded: true,
                errors: { getDataFail: true },
            };
        case actionTypes.CREATE_TODO_START:
            return {
                ...state,
                isCreating: true,
                isSuccess: false,
                errors: {},
            };
        case actionTypes.CREATE_TODO_SUCCESS:
            return {
                ...state,
                isCreating: false,
                isSuccess: true,
                tasks: state.tasks.concat([action.payload]),
                errors: {},
            };
        case actionTypes.CREATE_TODO_FAILURE:
            return {
                ...state,
                isCreating: false,
                errors: action.payload,
            };
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
                isLoading: false,
                isSuccess: false,
            };
        case actionTypes.UPDATE_TODO_START:
            return {
                ...state,
                isUpdating: {
                    ...state.isUpdating,
                    [action.payload]: true,
                },
            };
        case actionTypes.UPDATE_TODO_SUCCESS:
            const tasks = state.tasks;
            const { data, index, id } = action.payload;

            tasks[index] = {
                ...tasks[index],
                isDone: data.isDone,
            };

            return {
                ...state,
                tasks: tasks.concat([]),
                isUpdating: {
                    ...state.isUpdating,
                    [id]: false,
                },
            };
        case actionTypes.DELETE_TODO_START:
            return {
                ...state,
                isDeleting: {
                    ...state.isDeleting,
                    [action.payload]: true,
                },
            };
        case actionTypes.DELETE_TODO_SUCCESS:
            return {
                ...state,
                isDeleting: {
                    ...state.isDeleting,
                    [action.payload]: false,
                },
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case actionTypes.DELETE_TODO_FAILURE:
            return {
                ...state,
                isDeleting: {
                    ...state.isDeleting,
                    [action.payload.id]: false,
                },
                errors: action.payload.errors,
            };
        case actionTypes.SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
                errors: {},
            };
        case actionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.SIGN_OUT_START:
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false,
            };
        case actionTypes.SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
                checkedUser: true,
            };
        case actionTypes.SET_USER_FAIL:
            return {
                ...state,
                checkedUser: true,
            };
        case actionTypes.UPDATE_USER_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isSuccess: true,
            };
        case actionTypes.UPDATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.SET_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        case actionTypes.CHANGE_PASSWORD_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            };
        case actionTypes.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        default:
            return state;
    }
}
